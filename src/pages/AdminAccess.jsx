import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const AdminAccess = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
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
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md border border-base-200">
        <div className="card-body">
          {/* Admin Header */}
          <div className="text-center mb-4">
            <span className="text-4xl">🛡️</span>
            <h2 className="card-title text-2xl font-bold justify-center mt-2 text-base-content">
              Superadmin Access
            </h2>
            <p className="text-sm text-base-content/70">
              Highest level access only
            </p>
          </div>

          {/* Info Box */}
          <div className="alert alert-info shadow-sm mb-4">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wide opacity-70">
                Credentials
              </h3>
              <div className="text-sm space-y-1 mt-1">
                <p>
                  <strong>Email:</strong> super@insideboard.com
                </p>
                <p>
                  <strong>Password:</strong> superadmin123
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Admin Email
                </span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full focus:input-primary"
                placeholder="admin@insightboard.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Admin Password
                </span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full focus:input-primary"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Logging in...
                </>
              ) : (
                "Login as Admin"
              )}
            </button>
          </form>

          {/* Warning */}
          <div className="mt-4 p-3 alert alert-warning shadow-sm rounded-lg text-center flex flex-col items-center">
             <p className="text-xs font-medium">
               ⚠️ Change default password after first login
             </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="link link-hover text-sm text-base-content/70"
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
