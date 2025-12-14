/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../services/firebaseAuth";

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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                headers: { "Content-Type": "application/json" },
                credentials: "include" 
            });
            if (res.ok) {
                const userBackend = await res.json();
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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                headers: { "Content-Type": "application/json" },
                credentials: "include" 
            });
            if (res.ok) {
                const userBackend = await res.json();
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
        const res = await signInWithEmailAndPassword(auth, email, password);
        await syncWithBackend(res.user);
        toast.success("Logged in successfully");
    } catch (err) {
        console.error(err);
        toast.error(err.message);
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
        await syncWithBackend(res.user);
        toast.success(`Logged in with ${providerName}`);
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

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/social-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include", // Valid for cookie-based auth
      });
      
      const data = await response.json();
      
      if (data.user) {
          // Update local state with role from backend
          setUser(prev => ({ ...prev, ...data.user }));
      }
      
    } catch (err) {
      console.error("Failed to sync with backend:", err);
    }
  };

  const logout = async () => {
    try {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });
    } catch (e) {
        console.error("Backend logout failed", e);
    }
    await signOut(auth);
    setUser(null);
    toast.info("Logged out");
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    googleLogin,
    githubLogin,
    loginWithProvider,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
