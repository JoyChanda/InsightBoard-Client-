import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserAvatar = () => {
  const { user, logout } = useAuth();
  const [imageError, setImageError] = useState(false);

  // Get display name or fallback
  const displayName = user?.displayName || user?.email?.split('@')[0] || "User";
  const initials = displayName.charAt(0).toUpperCase();

  // Check if we should show the image
  const showImage = user?.photoURL && !imageError;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500 ring-offset-2 ring-offset-base-100">
          {showImage ? (
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
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <li className="menu-title px-4 py-2 text-gray-500 dark:text-gray-400">
          {displayName}
        </li>
        <li>
          <a className="justify-between">
            Profile
            <span className="badge badge-sm">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
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


