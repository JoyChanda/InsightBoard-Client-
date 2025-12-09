import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-4xl font-bold mb-4 text-error">Unauthorized Access</h1>
        <p className="text-lg mb-6 text-base-content opacity-70">
          You don't have permission to access this page.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
          <Link to="/dashboard" className="btn btn-outline">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
