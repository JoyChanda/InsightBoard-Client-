import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Must be set in Vercel Env Vars
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor for adding auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor for handling errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors globally
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

export default API;
