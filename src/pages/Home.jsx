import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero min-h-[80vh] bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to InsightBoard
            </h1>
            <p className="text-xl mb-8 opacity-80">
              Your powerful analytics and campaign management platform
            </p>
            {user ? (
              <p className="text-lg">
                Hello, <span className="font-semibold">{user.displayName}</span>
                ! 👋
              </p>
            ) : (
              <p className="text-lg">Please log in to get started</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
