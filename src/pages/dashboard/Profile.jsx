import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaImage, FaShieldAlt, FaSave } from "react-icons/fa";

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto space-y-8 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4">
        <div>
            <h1 className="text-4xl font-black tracking-tight text-base-content">My Profile</h1>
            <p className="text-base-content/50 font-medium">Manage your personal information and account settings</p>
        </div>
        <div className="badge badge-lg bg-primary/10 border-none text-primary font-black py-4 px-6 rounded-2xl">
            {user?.role?.toUpperCase()} ACCOUNT
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ================= LEFT COLUMN: INFO CARD ================= */}
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300/50 shadow-sm text-center relative overflow-hidden group">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150"></div>
                
                {/* Avatar with Ring */}
                <div className="relative inline-block mt-4">
                    <div className="w-40 h-40 rounded-[2.5rem] p-1.5 bg-gradient-to-br from-primary via-purple-500 to-accent rotate-3 transition-transform duration-500 group-hover:rotate-6 shadow-2xl">
                        <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-base-100 flex items-center justify-center -rotate-3 transition-transform duration-500 group-hover:-rotate-6">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                                    referrerPolicy="no-referrer"
                                    crossOrigin="anonymous"
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                            ) : null}
                            <span className="text-6xl font-black text-primary/20">
                                {user?.displayName?.[0]?.toUpperCase() || "U"}
                            </span>
                        </div>
                    </div>
                    {/* Active Status */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-2xl bg-success border-4 border-base-100 shadow-xl flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
                    </div>
                </div>

                <div className="mt-8 space-y-2">
                    <h2 className="text-2xl font-black text-base-content truncate">{user?.displayName || "User"}</h2>
                    <p className="text-base-content/40 font-bold truncate text-sm">{user?.email}</p>
                </div>

                <div className="mt-8 pt-8 border-t border-base-300/30 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-base-200/50 rounded-2xl">
                        <p className="text-[10px] uppercase font-black tracking-widest text-base-content/30 mb-1">Status</p>
                        <p className={`text-xs font-black uppercase ${user?.status === 'suspended' ? 'text-error' : 'text-success'}`}>
                            {user?.status || 'Active'}
                        </p>
                    </div>
                    <div className="p-4 bg-base-200/50 rounded-2xl">
                        <p className="text-[10px] uppercase font-black tracking-widest text-base-content/30 mb-1">Join Date</p>
                        <p className="text-xs font-black text-base-content/60">Mar 2024</p>
                    </div>
                </div>
            </div>

            {/* Quick Security Tip */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-[2rem] text-white overflow-hidden relative">
                <FaShieldAlt className="absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12" />
                <h4 className="font-black text-lg mb-2">Security Tip</h4>
                <p className="text-xs text-white/60 font-medium leading-relaxed">
                    Always use a strong password and enable 2FA if available to keep your insights secure.
                </p>
            </div>
        </div>

        {/* ================= RIGHT COLUMN: EDIT FORM ================= */}
        <div className="lg:col-span-8">
            <div className="bg-base-100 p-8 md:p-12 rounded-[2.5rem] border border-base-300/50 shadow-sm h-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1 flex items-center gap-2">
                                <FaUser className="text-[10px]" /> Display Name
                            </label>
                            <input
                                type="text"
                                {...register("displayName")}
                                className="w-full p-4 rounded-2xl bg-base-200/50 border-2 border-transparent focus:border-primary/30 transition-all outline-none font-bold"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1 flex items-center gap-2">
                                <FaEnvelope className="text-[10px]" /> Email Address
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                disabled
                                className="w-full p-4 rounded-2xl bg-base-300/50 border-2 border-transparent cursor-not-allowed font-bold opacity-60"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1 flex items-center gap-2">
                            <FaImage className="text-[10px]" /> Profile Image URL
                        </label>
                        <input
                            type="url"
                            {...register("photoURL")}
                            className="w-full p-4 rounded-2xl bg-base-200/50 border-2 border-transparent focus:border-primary/30 transition-all outline-none font-bold"
                            placeholder="https://images.com/avatar.jpg"
                        />
                        <p className="text-[10px] font-bold text-base-content/30 uppercase tracking-tighter px-1">
                            Paste a direct link to an image (JPEG, PNG, WEBP)
                        </p>
                    </div>

                    {/* Meta Information Display */}
                    <div className="bg-base-200/30 p-6 rounded-3xl border border-base-300/30 space-y-4">
                         <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-base-content/50">User UID</span>
                            <span className="font-mono text-[10px] bg-base-100 px-3 py-1 rounded-full border border-base-300/50">{user?.uid || 'N/A'}</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-base-content/50">Account Role</span>
                            <span className="font-black text-[10px] uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full">{user?.role}</span>
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn btn-primary btn-lg rounded-2xl px-12 font-black shadow-xl shadow-primary/20 flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
                        >
                            {saving ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <>
                                    <FaSave /> Update Settings
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;

