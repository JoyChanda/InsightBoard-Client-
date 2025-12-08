import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { 
  auth,
  registerWithEmail, 
  loginWithEmail, 
  loginWithGoogle, 
  loginWithGithub,
  logoutUser 
} from '../services/firebaseAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
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
      const result = await registerWithEmail(payload);
      setUser(result.user);
      toast.success('Account created successfully!');
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
      const result = await loginWithEmail(email, password);
      setUser(result.user);
      toast.success('Logged in successfully!');
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
      setUser(result.user);
      toast.success('Logged in with Google!');
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
      setUser(result.user);
      toast.success('Logged in with GitHub!');
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
      await logoutUser();
      setUser(null);
      toast.success('Logged out successfully!');
    } catch (err) {
      toast.error('Logout failed');
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
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper function to get user-friendly error messages
const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed';
    case 'auth/cancelled-popup-request':
      return 'Only one popup request is allowed at a time';
    case 'auth/popup-blocked':
      return 'Popup was blocked by browser. Please allow popups for this site';
    default:
      return error.message || 'Authentication failed';
  }
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
