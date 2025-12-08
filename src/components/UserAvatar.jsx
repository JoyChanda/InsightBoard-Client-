import { useAuth } from "../context/AuthContext";

const UserAvatar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full border border-gray-300 dark:border-gray-600">
          <img
            alt="User Avatar"
            src={user?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <li className="menu-title px-4 py-2 text-gray-500 dark:text-gray-400">
             {user?.displayName || "User"}
        </li>
        <li>
            <a className="justify-between">
            Profile
            <span className="badge">New</span>
            </a>
        </li>
        <li><a>Settings</a></li>
        <li><button onClick={logout} className="text-red-500">Logout</button></li>
      </ul>
    </div>
  );
};

export default UserAvatar;
