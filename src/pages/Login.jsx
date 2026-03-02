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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6">
      {/* Background with Mesh Gradient Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-700/20"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/10 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass relative z-10 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
      >
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl shadow-xl mx-auto mb-6">
              🚢
            </div>
            <h2 className="text-4xl font-black text-base-content tracking-tight">Login</h2>
            <p className="text-base-content/50 text-sm mt-2 font-medium">Welcome back to InsightBoard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className={`w-full p-4 rounded-2xl bg-base-200/50 border-2 transition-all outline-none font-medium ${
                  errors.email ? "border-error/50" : "border-transparent focus:border-primary/30"
                }`}
              />
              {errors.email && (
                <p className="text-[10px] font-bold text-error uppercase tracking-wide px-1">{errors.email}</p>
              )}
            </div>
            
            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase tracking-widest text-base-content/40">Password</label>
                <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                className={`w-full p-4 rounded-2xl bg-base-200/50 border-2 transition-all outline-none font-medium ${
                  errors.password ? "border-error/50" : "border-transparent focus:border-primary/30"
                }`}
              />
              {errors.password && (
                <p className="text-[10px] font-bold text-error uppercase tracking-wide px-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : "Login to Board"}
            </motion.button>
          </form>
          
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-base-300/30"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-4 text-base-content/30 font-black tracking-widest">Or continue with</span></div>
          </div>
          
          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-base-200/50 border border-base-300/30 hover:bg-base-200 transition-all font-bold text-sm"
              disabled={isLoading}
            >
              <FaGoogle className="text-red-500" /> Google
            </button>
            
            <button
              onClick={handleGithubLogin}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-base-200/50 border border-base-300/30 hover:bg-base-200 transition-all font-bold text-sm"
              disabled={isLoading}
            >
              <FaGithub /> GitHub
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-base-300/30">
            <p className="text-center text-sm font-medium text-base-content/60">
              New to InsightBoard?{" "}
              <Link to="/register" className="text-primary font-black hover:underline ml-1">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
