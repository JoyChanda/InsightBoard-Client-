import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, updateProfileInfo } = useAuth();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    },
  });

  useEffect(() => {
    reset({
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    });
  }, [user, reset]);

  const onSubmit = (data) => {
    if (!user) return;
    setSaving(true);
    updateProfileInfo({
      displayName: data.displayName?.trim() || user.displayName,
      photoURL: data.photoURL?.trim() || user.photoURL || null,
    })
      .catch(() => {})
      .finally(() => setSaving(false));
  };

  return (
    <div className="max-w-4xl mx-auto text-base-content">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-base-content">
        My Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ================= LEFT COLUMN ================= */}
        <div className="bg-base-100 dark:bg-gray-800 shadow-lg border border-base-200 dark:border-gray-700 rounded-2xl p-6 text-center">
          {/* Profile Avatar */}
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-purple-100 dark:border-gray-600 shadow bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl text-white font-bold">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : null}
              {!user?.photoURL && (
                <span>{user?.displayName?.[0]?.toUpperCase() || "U"}</span>
              )}
            </div>

            {/* Online Dot */}
            <div
              className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-green-500 border-2 
              border-white dark:border-gray-800"
              title="Active"
            />
          </div>

          {/* Name */}
          <h2 className="mt-4 text-xl font-bold text-base-content">
            {user?.displayName || "User"}
          </h2>

          {/* Email */}
          <p className="text-base-content/70 text-sm">
            {user?.email}
          </p>

          {/* Role Badge */}
          <div className="mt-3">
            <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 capitalize">
              {user?.role || "user"}
            </span>
          </div>

          {/* Suspended Alert */}
          {user?.status === "suspended" && (
            <div className="mt-4 text-sm py-2 px-3 bg-red-100 text-red-700 border border-red-300 rounded-lg dark:bg-red-900/30 dark:text-red-300 dark:border-red-700">
              ⚠️ Account Suspended
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="md:col-span-2 bg-base-100 dark:bg-gray-800 shadow-lg border border-base-200 dark:border-gray-700 rounded-2xl p-8">
          {/* Heading */}
          <h3 className="text-xl font-semibold mb-6 text-base-content flex items-center gap-2">
            <span>⚙️</span> Edit Profile
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium text-base-content">
                Full Name
              </label>
              <input
                type="text"
                {...register("displayName")}
                className="input input-bordered w-full"
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block mb-1 font-medium text-base-content">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                disabled
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">
                Email cannot be changed.
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-1 font-medium text-base-content">
                Profile Image URL
              </label>
              <input
                type="url"
                {...register("photoURL")}
                placeholder="https://example.com/avatar.jpg"
                className="input input-bordered w-full"
              />
            </div>

            {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full md:w-auto"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
