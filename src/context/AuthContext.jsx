import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  const fetchMe = async () => {
    try {
      setLoading(true);
      const res = await API.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
      // Don't show error toast on mount - user might not be logged in
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      setUser(res.data.user);
      
      // Store token if provided
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      toast.success('Logged in successfully!');
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      toast.error(message);
      throw err;
    }
  };

  // Register function
  const register = async (payload) => {
    try {
      const res = await API.post('/auth/register', payload);
      setUser(res.data.user);
      
      // Store token if provided
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      toast.success('Registration successful!');
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await API.post('/auth/logout');
      setUser(null);
      localStorage.removeItem('token');
      toast.success('Logged out successfully!');
    } catch (err) {
      // Even if API call fails, clear local state
      setUser(null);
      localStorage.removeItem('token');
      toast.info('Logged out');
    }
  };

  const value = {
    user,
    setUser,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
