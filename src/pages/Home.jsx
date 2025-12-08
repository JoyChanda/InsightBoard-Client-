import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="text-6xl mb-4">
          🚢
        </div>
        
        {/* Brand Name */}
        <h1 className="text-5xl md:text-6xl font-bold">
          InsightBoard
        </h1>
        
        {/* Welcome Text with Padding */}
        <div className="py-8">
          <p className="text-2xl md:text-3xl font-light opacity-90">
            Welcome to InsightBoard
          </p>
          <p className="text-lg md:text-xl mt-4 opacity-70">
            Your powerful analytics and campaign management platform
          </p>
        </div>

        {/* CTA Buttons */}
        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/login" className="btn btn-primary btn-lg px-8">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-lg px-8">
              Create Account
            </Link>
          </div>
        )}

        {user && (
          <div className="space-y-4 pt-4">
            <p className="text-xl">
              Welcome back, <span className="font-bold text-primary">{user.displayName}</span>! 👋
            </p>
            <Link to="/dashboard" className="btn btn-primary btn-lg px-8">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
