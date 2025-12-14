import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserAvatar = () => {
  const { user, logout } = useAuth();
  const [imageError, setImageError] = useState(false);

  // Get display name or fallback
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName.charAt(0).toUpperCase();

  // Filter out invalid image URLs (e.g., Unsplash webpages instead of direct image links)
  const isValidPhoto = (url) => {
      if (!url) return false;
      if (url.includes("unsplash.com/photos/")) return false; // This is a webpage, not an image
      return true;
  };

  // Check if we should show the image
  const showImage = isValidPhoto(user?.photoURL) && !imageError;
  const avatarEl = showImage ? (
    <img
      alt={displayName}
      src={user.photoURL}
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => setImageError(true)}
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
      {initials}
    </div>
  );

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer outline-none transition-transform active:scale-95"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500 ring-offset-2 ring-offset-base-100 dark:ring-offset-gray-900 shadow-md">
          {avatarEl}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-56 p-3 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <li className="px-2 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold flex items-center justify-center">
              {avatarEl}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
        </li>
        <li className="menu-title px-2 text-gray-500 dark:text-gray-400">
          Account
        </li>
        <li>
          <Link to="/dashboard/profile" className="justify-between">
            Profile
            <span className="badge badge-sm">Edit</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/profile">Settings</Link>
        </li>
        <li>
          <button onClick={logout} className="text-red-500 hover:text-red-600">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserAvatar;
