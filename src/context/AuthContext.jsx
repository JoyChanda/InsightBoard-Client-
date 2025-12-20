/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../services/firebaseAuth";
import API from "../api/index";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        // Default minimal user from Firebase
        const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: "user" // temporary
        };
        
        // Try to get role from backend if cookie exists
        try {
            const res = await API.get('/auth/me');
            if (res.status === 200) {
                const userBackend = res.data;
                if (userBackend) {
                   // Merge backend data (role, id) with firebase data
                   userData.role = userBackend.role;
                   userData._id = userBackend._id;
                   userData.status = userBackend.status;
                }
            }
        } catch (e) {
            console.log("Auth persistence check failed", e);
        }

        // We will stick to the user's simple sync logic in login flow, 
        // but for persistence we need to fetch info or trust firebase.
        // For now, let's just set what we have.
        setUser(userData);
      } else {
        // No Firebase user? Check if we have a valid Backend Cookie (e.g. Superadmin)
        try {
            const res = await API.get('/auth/me');
            if (res.status === 200) {
                const userBackend = res.data;
                setUser(userBackend);
            } else {
                setUser(null);
            }
        } catch (e) {
            setUser(null);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  // Email/Password Login
  const login = async (email, password) => {
    try {
        // 1. Try Firebase Login
        let firebaseUser;
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            firebaseUser = res.user;
        } catch (firebaseError) {
            // If Firebase fails (e.g. user not found), we will try backend directly
            // only if the error code suggests the user might exist in our DB but not Firebase
            // OR we just try backend as a fallback for everything except maybe network errors
            console.log("Firebase login failed, trying backend...", firebaseError.code);
        }

        if (firebaseUser) {
            // Firebase login successful
            const mergedUser = await syncWithBackend(firebaseUser);
            toast.success("Logged in successfully");
            return mergedUser || {
                uid: firebaseUser.uid, 
                email: firebaseUser.email, 
                role: 'user' // default
            }; 
        } else {
            // 2. Try Backend Login Directly (Legacy/Admin workaround)
            const res = await API.post('/auth/login', { email, password });
            
            if (res.data && res.data.user) {
                setUser(res.data.user);
                toast.success("Logged in successfully");
                return res.data.user;
            } else {
                 throw new Error("Login failed");
            }
        }
    } catch (err) {
        console.error(err);
        // Extract meaningful error message
        const message = err.response?.data?.message || err.message || "Invalid credentials";
        toast.error(message);
        throw err;
    }
  };

  // Social Login
  const loginWithProvider = async (providerName) => {
    try {
        let provider;
        if (providerName === "google") provider = new GoogleAuthProvider();
        if (providerName === "github") provider = new GithubAuthProvider();

        const res = await signInWithPopup(auth, provider);
        const user = await syncWithBackend(res.user);
        toast.success(`Logged in with ${providerName}`);
        return user;
    } catch (err) {
        console.error(err);
        toast.error(err.message);
        throw err;
    }
  };

  const googleLogin = () => loginWithProvider("google");
  const githubLogin = () => loginWithProvider("github");

  // Sync Firebase user with MongoDB backend
  const syncWithBackend = async (firebaseUser) => {
    try {
      const userData = {
        displayName: firebaseUser.displayName || "User",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      };

      const response = await API.post('/auth/social-login', userData);
      
      const data = response.data;
      
      if (data.user) {
          // Update local state with role from backend
          setUser(prev => ({ ...prev, ...data.user }));
          return data.user;
      }
      
    } catch (err) {
      console.error("Failed to sync with backend:", err);
    }
  };

  const logout = async () => {
    try {
        await API.post('/auth/logout');
    } catch (e) {
        console.error("Backend logout failed", e);
    }
    await signOut(auth);
    setUser(null);
    toast.info("Logged out");
  };

  // Register with Backend (Supports Role)
  const register = async (userData) => {
    try {
        const res = await API.post('/auth/register', userData);
        if (res.data && res.data.user) {
            setUser(res.data.user);
            toast.success("Registration successful");
            return res.data.user;
        }
    } catch (err) {
        console.error("Registration failed", err);
        const message = err.response?.data?.message || err.message || "Registration failed";
        toast.error(message);
        throw err;
    }
  };

  // Update Profile Info
  const updateProfileInfo = async (profileData) => {
    try {
        // 1. Update Firebase (if linked)
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: profileData.displayName,
                photoURL: profileData.photoURL
            });
        }

        // 2. Update Backend
        const res = await API.patch('/auth/profile', profileData);

        // 3. Update Local State
        if (res.data && res.data.user) {
             setUser(prev => ({ ...prev, ...res.data.user }));
             toast.success("Profile updated!");
        }
        return res.data;
    } catch (err) {
        console.error("Update profile failed", err);
        toast.error("Failed to update profile");
        throw err;
    }
  };

  // Safety timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
        if (loading) {
            console.warn("Auth initialization timed out, forcing render.");
            setLoading(false);
        }
    }, 2500); // 2.5s timeout
    return () => clearTimeout(timer);
  }, [loading]);

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    googleLogin,
    githubLogin,
    loginWithProvider,
    logout,
    updateProfileInfo
  };

  if (loading) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-base-100">
              <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
      );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
