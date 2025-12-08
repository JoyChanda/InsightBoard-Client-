import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      return;
    }

    try {
      setIsLoading(true);
      await register({ 
        name, 
        email, 
        password,
        photoURL: photoURL || undefined // Optional field
      });
      navigate("/"); // Redirect to home after successful registration
    } catch (error) {
      // Error toast is already shown by AuthContext
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google signup with Firebase
    console.log("Google signup clicked");
  };

  const handleGithubSignup = () => {
    // TODO: Implement GitHub signup with Firebase
    console.log("GitHub signup clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold justify-center mb-4">Create Account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full focus:input-primary"
                required
                minLength={6}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL <span className="text-xs opacity-60">(Optional)</span></span>
              </label>
              <input
                type="url"
                placeholder="Enter profile photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input input-bordered w-full focus:input-primary"
              />
            </div>

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
            >
              <FaGoogle className="text-xl" />
              Sign up with Google
            </button>
            
            <button
              onClick={handleGithubSignup}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
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
