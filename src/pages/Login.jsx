import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate("/"); // Redirect to home after successful login
    } catch (error) {
      // Error toast is already shown by AuthContext
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login with Firebase
    console.log("Google login clicked");
  };

  const handleGithubLogin = () => {
    // TODO: Implement GitHub login with Firebase
    console.log("GitHub login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold justify-center mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full focus:input-primary"
                required
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
            >
              <FaGoogle className="text-xl" />
              Continue with Google
            </button>
            
            <button
              onClick={handleGithubLogin}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
            >
              <FaGithub className="text-xl" />
              Continue with GitHub
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
