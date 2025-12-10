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
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold justify-center mb-4">Create Account</h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                className={`input input-bordered w-full focus:input-primary ${
                  errors.name ? "input-error" : ""
                }`}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name}</span>
                </label>
              )}
            </div>

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
            
            {/* Password Input with Rules */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
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
              {!errors.password && (
                <label className="label">
                  <span className="label-text-alt text-xs opacity-70">
                    Must contain: 6+ characters, uppercase & lowercase letters
                  </span>
                </label>
              )}
            </div>

            {/* Photo URL Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Photo URL <span className="text-xs opacity-60">(Optional)</span>
                </span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={photoURL}
                onChange={(e) => {
                  setPhotoURL(e.target.value);
                  if (errors.photoURL) setErrors({ ...errors, photoURL: null });
                }}
                className={`input input-bordered w-full focus:input-primary ${
                  errors.photoURL ? "input-error" : ""
                }`}
              />
              {errors.photoURL && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.photoURL}</span>
                </label>
              )}
            </div>

            {/* Role Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Role</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select select-bordered w-full focus:select-primary"
              >
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          
          <div className="divider">OR</div>
          
          {/* Social Signup Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignup}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <FaGoogle className="text-xl" />
              Sign up with Google
            </button>
            
            <button
              onClick={handleGithubSignup}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <FaGithub className="text-xl" />
              Sign up with GitHub
            </button>
          </div>
          
          <div className="divider"></div>
          
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
