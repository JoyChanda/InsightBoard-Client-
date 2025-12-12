import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const AdminAccess = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setUser, user} = useAuth();

  // If already logged in as superadmin, redirect to dashboard
  useEffect(() => {
    if (user && user.role === "superadmin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    
    setSubmitting(true);

    try {
      // Use backend API for admin login (not Firebase)
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: Include cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Check if user is superadmin
      if (data.user.role !== "superadmin") {
        toast.error("Access denied. Superadmin credentials required.");
        setSubmitting(false);
        return;
      }

      // Set user in context
      setUser(data.user);
      
      toast.success("Superadmin login successful!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-base-300 dark:via-base-200 dark:to-base-300 px-4">
      <div className="w-full max-w-md">
        {/* Admin Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400 rounded-full shadow-lg">
            <span className="text-2xl">👑</span>
            <span className="text-white font-bold text-lg">
              Superadmin Portal
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-base-100 rounded-2xl shadow-2xl p-8 border border-purple-100 dark:border-base-300">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🛡️</span>
            <div>
              <h1 className="text-2xl font-bold text-base-content">
                Superadmin Access
              </h1>
              <p className="text-sm text-base-content/70">
                Highest level access only
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <p className="text-sm text-purple-800 dark:text-purple-300 font-medium mb-2">
              👑 Superadmin Credentials
            </p>
            
            <div className="p-3 bg-white dark:bg-gray-700/50 rounded border border-purple-300 dark:border-purple-700">
              <p className="text-xs text-purple-700 dark:text-purple-400">
                <strong>Email:</strong> super@insideboard.com
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-400">
                <strong>Password:</strong> superadmin123
              </p>
            </div>

            <p className="text-xs text-purple-600 dark:text-purple-400 mt-3 italic">
              💡 Full access to all admin features
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-base-content mb-1">
                Admin Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-base-200 dark:text-white"
                placeholder="admin@insightboard.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-base-content mb-1">
                Admin Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-base-200 dark:text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "🔓 Login as Admin"
              )}
            </button>
          </form>

          {/* Warning */}
          <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-300">
              ⚠️ Change default password after first login
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;
