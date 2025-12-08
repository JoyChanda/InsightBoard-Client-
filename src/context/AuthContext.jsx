import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an auth token or session
    const checkAuth = async () => {
        setLoading(true);
      // Mock delay
      setTimeout(() => {
          // For now, we start with no user logged in.
          // To test "logged in" state, we can manually uncomment the line below or use a login function.
          // setUser({ displayName: "Test User", photoURL: "https://i.pravatar.cc/150", email: "test@example.com" });
          setLoading(false);
      }, 500);
    };
    checkAuth();
  }, []);

    // Mock Login function
  const login = async () => {
      // Simulate API call
      setUser({ displayName: "John Doe", photoURL: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", email: "john@example.com" });
  };

  const logout = () => {
    setUser(null);
  };

  const authInfo = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
