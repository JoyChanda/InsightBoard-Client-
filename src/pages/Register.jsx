import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [role, setRole] = useState("buyer");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation with rules
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const passwordErrors = [];
      
      if (password.length < 6) {
        passwordErrors.push("at least 6 characters");
      }
      if (!/[A-Z]/.test(password)) {
        passwordErrors.push("one uppercase letter");
      }
      if (!/[a-z]/.test(password)) {
        passwordErrors.push("one lowercase letter");
      }

      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain ${passwordErrors.join(", ")}`;
      }
    }

    // Photo URL validation (optional but must be valid if provided)
    if (photoURL && !/^https?:\/\/.+\..+/.test(photoURL)) {
      newErrors.photoURL = "Please enter a valid URL (starting with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
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
      await register({ 
        name, 
        email, 
        password,
        photoURL: photoURL || undefined,
        role,
        status: "pending" // Default status as per requirements
      });
      toast.success("Account created successfully! Welcome aboard!");
      navigate("/"); // Redirect to home after successful registration
    } catch (error) {
      // Error toast is already shown by AuthContext
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      await googleLogin();
      navigate("/");
    } catch (error) {
      console.error("Google signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    try {
      setIsLoading(true);
      await githubLogin();
      navigate("/");
    } catch (error) {
      console.error("GitHub signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6 py-20">
      {/* Background with Mesh Gradient Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-blue-700/20"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass relative z-10 w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
      >
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl shadow-xl mx-auto mb-6">
              🚢
            </div>
            <h2 className="text-4xl font-black text-base-content tracking-tight">Create Account</h2>
            <p className="text-base-content/50 text-sm mt-2 font-medium">Join the InsightBoard ecosystem</p>
          </div>
          
          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                className={`w-full p-4 rounded-2xl bg-base-200/50 border-2 transition-all outline-none font-medium ${
                  errors.name ? "border-error/50" : "border-transparent focus:border-primary/30"
                }`}
              />
              {errors.name && (
                <p className="text-[10px] font-bold text-error uppercase tracking-wide px-1">{errors.name}</p>
              )}
            </div>

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
              <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1">Password</label>
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
              {!errors.password && (
                <p className="text-[9px] font-bold text-base-content/30 uppercase tracking-tighter px-1">6+ chars, Mixed Case</p>
              )}
              {errors.password && (
                <p className="text-[10px] font-bold text-error uppercase tracking-wide px-1">{errors.password}</p>
              )}
            </div>

            {/* Role Select */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-4 rounded-2xl bg-base-200/50 border-2 border-transparent focus:border-primary/30 transition-all outline-none font-bold text-base-content"
              >
                <option value="buyer">Buyer / Orderer</option>
                <option value="manager">Production Manager</option>
              </select>
            </div>

            {/* Photo URL Input */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1">Avatar URL (Optional)</label>
              <input
                type="url"
                placeholder="https://images.com/avatar.jpg"
                value={photoURL}
                onChange={(e) => {
                  setPhotoURL(e.target.value);
                  if (errors.photoURL) setErrors({ ...errors, photoURL: null });
                }}
                className={`w-full p-4 rounded-2xl bg-base-200/50 border-2 transition-all outline-none font-medium ${
                  errors.photoURL ? "border-error/50" : "border-transparent focus:border-primary/30"
                }`}
              />
              {errors.photoURL && (
                <p className="text-[10px] font-bold text-error uppercase tracking-wide px-1">{errors.photoURL}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="md:col-span-2 w-full py-4 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : "Create My Account"}
            </motion.button>
          </form>
          
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-base-300/30"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-4 text-base-content/30 font-black tracking-widest">Or sign up with</span></div>
          </div>
          
          {/* Social Icons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleSignup}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-base-200/50 border border-base-300/30 hover:bg-base-200 transition-all font-bold text-sm"
              disabled={isLoading}
            >
              <FaGoogle className="text-red-500" /> Google
            </button>
            
            <button
              onClick={handleGithubSignup}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-base-200/50 border border-base-300/30 hover:bg-base-200 transition-all font-bold text-sm"
              disabled={isLoading}
            >
              <FaGithub /> GitHub
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-base-300/30">
            <p className="text-center text-sm font-medium text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-black hover:underline ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
