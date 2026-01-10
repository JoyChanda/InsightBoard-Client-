import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, googleLogin, githubLogin, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }

    try {
      setIsLoading(true);
      const loggedInUser = await login(email, password);
      handleRedirect(loggedInUser);
    } catch (error) {
      // Error toast is already shown by AuthContext
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = (loggedInUser) => {
    // If there's a specific origin, go there (unless it's root)
    if (from && from !== "/") {
      navigate(from, { replace: true });
      return;
    }

    // Role-based redirection
    const role = loggedInUser?.role || "user";
    switch (role) {
      case "superadmin":
      case "admin":
        navigate("/dashboard/analytics", { replace: true });
        break;
      case "manager":
        navigate("/dashboard/manage-products", { replace: true });
        break;
      case "buyer":
        navigate("/dashboard/my-orders", { replace: true });
        break;
      default:
        navigate("/dashboard", { replace: true });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const loggedInUser = await googleLogin();
      handleRedirect(loggedInUser);
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setIsLoading(true);
      const loggedInUser = await githubLogin();
      handleRedirect(loggedInUser);
    } catch (error) {
      console.error("GitHub login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    let demoEmail = "";
    let demoPass = "";

    switch (role) {
      case "admin":
        demoEmail = "super@insideboard.com";
        demoPass = "superadmin123";
        break;
      case "manager":
        demoEmail = "testmanager@gmail.com";
        demoPass = "Abc123456";
        break;
      case "buyer":
        demoEmail = "abc2@gmail.com";
        demoPass = "Abc123456";
        break;
      default:
        return;
    }

    setEmail(demoEmail);
    setPassword(demoPass);
    setErrors({});
    
    try {
      setIsLoading(true);
      const loggedInUser = await login(demoEmail, demoPass);
      handleRedirect(loggedInUser);
    } catch (error) {
      console.error("Demo login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold justify-center mb-4">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className={`input input-bordered w-full focus:input-primary ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </label>
              )}
            </div>
            
            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                className={`input input-bordered w-full focus:input-primary ${
                  errors.password ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password}</span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          
          <div className="divider">OR</div>
          
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <FaGoogle className="text-xl" />
              Continue with Google
            </button>
            
            <button
              onClick={handleGithubLogin}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <FaGithub className="text-xl" />
              Continue with GitHub
            </button>
          </div>

          <div className="divider text-xs opacity-50 uppercase tracking-widest font-bold">Demo Access</div>
          
          {/* Demo Login Buttons */}
          <div className="grid grid-cols-1 gap-3">
             <button 
                onClick={() => handleDemoLogin("buyer")}
                className="btn btn-outline btn-sm h-12 border-base-300 hover:border-primary hover:bg-primary/5"
                disabled={isLoading}
             >
                Login as User
             </button>
             <button 
                onClick={() => handleDemoLogin("manager")}
                className="btn btn-outline btn-sm h-12 border-base-300 hover:border-secondary hover:bg-secondary/5"
                disabled={isLoading}
             >
                Login as Manager
             </button>
             <button 
                onClick={() => handleDemoLogin("admin")}
                className="btn btn-outline btn-sm h-12 border-base-300 hover:border-warning hover:bg-warning/5"
                disabled={isLoading}
             >
                Login as Admin
             </button>
          </div>
          
          <div className="divider"></div>
          
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
