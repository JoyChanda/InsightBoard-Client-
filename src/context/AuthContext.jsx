/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import axios from "axios";
import {
  auth,
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  loginWithGithub,
  logoutUser,
  updateUserProfile,
} from "../services/firebaseAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  // Listen to Firebase auth state changes AND check backend auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let role = firebaseUser.role || "user";

        // Attempt to fetch authoritative role from backend
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                withCredentials: true
            });
            if (res.data.user) {
                role = res.data.user.role;
            }
        } catch (error) {
            console.warn("Backend auth verification failed, using default/firebase role:", error);
        }

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register with Email/Password
  const register = async (payload) => {
    try {
      // Step 1: Register with Firebase
      const result = await registerWithEmail(payload);
      
      // Step 2: Sync with backend MongoDB to store role
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          role: payload.role || "buyer"
        }, {
          withCredentials: true
        });
      } catch (backendError) {
        // Backend registration failed (user might already exist in MongoDB)
        console.warn("Backend sync warning:", backendError.response?.data?.message);
      }

      // Step 3: Set user in context with role from payload
      setUser({ 
        uid: result.user.uid,
        email: result.user.email,
        displayName: payload.name,
        photoURL: payload.photoURL || result.user.photoURL,
        role: payload.role || "buyer" 
      });
      
      toast.success("Account created successfully!");
      return result;
    } catch (err) {
      const message = getFirebaseErrorMessage(err);
      toast.error(message);
      throw err;
    }
  };

  // Login with Email/Password
  const login = async (email, password) => {
    try {
      // Step 1: Login with Firebase
      const result = await loginWithEmail(email, password);
      console.log("✅ Firebase login successful:", email);
      
      // Step 2: Fetch role from backend MongoDB
      let userRole = "buyer"; // default
      let userName = result.user.displayName;
      
      try {
        console.log("🔄 Attempting backend login to fetch role...");
        const backendRes = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
          email,
          password
        }, {
          withCredentials: true
        });
        
        console.log("✅ Backend login response:", backendRes.data);
        
        if (backendRes.data.user) {
          userRole = backendRes.data.user.role;
          userName = backendRes.data.user.name || userName;
          console.log(`✅ Role fetched from backend: ${userRole}`);
        }
      } catch (backendError) {
        console.error("❌ Backend login failed:", backendError.response?.data || backendError.message);
        // Continue with Firebase login even if backend fails
      }

      // Step 3: Set user with role from backend
      const userObj = { 
        uid: result.user.uid,
        email: result.user.email,
        displayName: userName,
        photoURL: result.user.photoURL,
        role: userRole
      };
      
      console.log("🎯 Setting user in AuthContext:", userObj);
      setUser(userObj);
      
      toast.success("Logged in successfully!");
      return result;
    } catch (err) {
      const message = getFirebaseErrorMessage(err);
      toast.error(message);
      throw err;
    }
  };

  // Google OAuth
  const googleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const firebaseUser = result.user;
      // Properly extract photoURL from Firebase user object
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        role: "user",
      });
      toast.success("Logged in with Google!");
      return result;
    } catch (err) {
      const message = getFirebaseErrorMessage(err);
      toast.error(message);
      throw err;
    }
  };

  // GitHub OAuth
  const githubLogin = async () => {
    try {
      const result = await loginWithGithub();
      const firebaseUser = result.user;
      // Properly extract photoURL from Firebase user object
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        role: "user",
      });
      toast.success("Logged in with GitHub!");
      return result;
    } catch (err) {
      const message = getFirebaseErrorMessage(err);
      toast.error(message);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      // Step 1: Sign out from Firebase
      await logoutUser();
      
      // Step 2: Clear backend session/cookies (for superadmin)
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
          withCredentials: true
        });
      } catch (backendError) {
        console.warn("Backend logout warning:", backendError);
        // Continue with logout even if backend fails
      }
      
      // Step 3: Clear any localStorage items
      localStorage.clear();
      
      // Step 4: Clear any sessionStorage items
      sessionStorage.clear();
      
      // Step 5: Clear user from context
      setUser(null);
      
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed");
      throw err;
    }
  };

  // Update profile (name / photo)
  const updateProfileInfo = async ({ displayName, photoURL }) => {
    try {
      const updated = await updateUserProfile({ displayName, photoURL });
      // keep existing role while refreshing other fields
      setUser((prev) => ({
        ...(prev || {}),
        ...updated,
        role: prev?.role || "user",
      }));
      toast.success("Profile updated");
      return updated;
    } catch (err) {
      const message = getFirebaseErrorMessage(err);
      toast.error(message);
      throw err;
    }
  };

  const value = {
    user,
    setUser,
    login,
    register,
    googleLogin,
    githubLogin,
    logout,
    updateProfileInfo,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Helper function to get user-friendly error messages
const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-credential":
      return "Invalid email or password. Please check your credentials and try again.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed";
    case "auth/cancelled-popup-request":
      return "Only one popup request is allowed at a time";
    case "auth/popup-blocked":
      return "Popup was blocked by browser. Please allow popups for this site";
    default:
      return error.message || "Authentication failed";
  }
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
