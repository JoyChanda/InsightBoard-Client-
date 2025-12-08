import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  updateProfile
} from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

// Email/Password Registration
export const registerWithEmail = async ({ name, email, password, photoURL }) => {
  try {
    // Create user with email and password
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with name and photo
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL || null
    });

    // Return user data
    return {
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: name,
        photoURL: photoURL || result.user.photoURL,
      }
    };
  } catch (error) {
    console.error("Email registration error:", error);
    throw error;
  }
};

// Email/Password Login
export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    return {
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      }
    };
  } catch (error) {
    console.error("Email login error:", error);
    throw error;
  }
};

// Google OAuth Login
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    return {
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      }
    };
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};

// GitHub OAuth Login
export const loginWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    return {
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      }
    };
  } catch (error) {
    console.error("GitHub login error:", error);
    throw error;
  }
};

// Sign Out
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Auth state observer
export { auth };
