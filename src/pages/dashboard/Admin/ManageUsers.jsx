import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import API from "../../../api/index";
import { useAuth } from "../../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, 
  FaFilter, 
  FaUserShield, 
  FaUserEdit, 
  FaBan, 
  FaCheckCircle, 
  FaEnvelope, 
  FaTrashAlt,
  FaArrowLeft,
  FaShieldAlt
} from "react-icons/fa";

const ManageUsers = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    
    // For Suspend Modal
    const [selectedUser, setSelectedUser] = useState(null);
    const [suspendReason, setSuspendReason] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            // Construct query parameters
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (roleFilter) params.append("role", roleFilter);

            const res = await API.get(`/users?${params.toString()}`);
            setUsers(res.data.users || []);
        } catch (err) {
            console.error("Fetch users error:", err);
            toast.error("Failed to load users. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }, [search, roleFilter]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 500); // Debounce search

        return () => clearTimeout(delayDebounceFn);
    }, [search, roleFilter, fetchUsers]);

    const handleRoleChange = async (userId, newRole) => {
        if(!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
        try {
            await API.patch(`/users/${userId}/role`, { role: newRole });
            toast.success("User role updated successfully!");
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update role");
        }
    };

    const openSuspendModal = (user) => {
        setSelectedUser(user);
        setSuspendReason(user.suspendReason || "");
        setIsModalOpen(true);
    };

    const handleSuspend = async () => {
        try {
            const status = selectedUser.status === 'suspended' ? 'active' : 'suspended';
            await API.patch(`/users/${selectedUser._id}/role`, { 
                status: status,
                suspendReason: status === 'suspended' ? suspendReason : "" 
            });

            toast.success(`User ${status === 'suspended' ? 'Suspended' : 'Activated'} Successfully`);
            setIsModalOpen(false);
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-base-content">User Management</h1>
                    <p className="text-base-content/50 font-medium mt-1">
                        Review, update roles, and manage access permissions for all system users.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="badge badge-lg bg-primary/10 border-none text-primary font-black py-4 px-6 rounded-2xl">
                        {users.length} TOTAL USERS
                    </div>
                </div>
            </motion.div>

            {/* Filters Bar */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 items-center">
                <div className="md:col-span-8 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-50" />
                    <input 
                        type="text" 
                        placeholder="Search by name, email or UID..." 
                        className="w-full p-4 pl-12 rounded-2xl bg-base-100 border-2 border-transparent focus:border-primary/30 transition-all outline-none font-medium shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="md:col-span-4 relative">
                    <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-50" />
                    <select 
                        className="w-full p-4 pl-12 rounded-2xl bg-base-100 border-2 border-transparent focus:border-primary/30 transition-all outline-none font-black text-base-content shadow-sm appearance-none"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Account Roles</option>
                        <option value="buyer">Buyer / Orderer</option>
                        <option value="manager">Production Manager</option>
                        <option value="admin">Platform Administrator</option>
                        <option value="superadmin">Super Administrator</option>
                    </select>
                </div>
            </motion.div>

            {/* Users Table */}
            <motion.div variants={itemVariants} className="bg-base-100 rounded-[2.5rem] border border-base-300/50 shadow-xl overflow-hidden overflow-x-auto mx-4">
                <table className="table w-full">
                    <thead>
                        <tr className="border-b border-base-200">
                            <th className="bg-transparent py-6 font-black text-[10px] uppercase tracking-widest text-base-content/30 pl-8">User Identity</th>
                            <th className="bg-transparent py-6 font-black text-[10px] uppercase tracking-widest text-base-content/30">Account Role</th>
                            <th className="bg-transparent py-6 font-black text-[10px] uppercase tracking-widest text-base-content/30">System Status</th>
                            <th className="bg-transparent py-6 font-black text-[10px] uppercase tracking-widest text-base-content/30">Action Center</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-200/50">
                        {users.map(u => (
                            <tr key={u._id} className="hover:bg-base-200/30 transition-colors group">
                                <td className="py-6 pl-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary font-black shadow-inner border border-primary/5">
                                            {u.photoURL ? (
                                                <img src={u.photoURL} alt="" className="w-full h-full object-cover rounded-2xl" />
                                            ) : u.name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <div className="font-black text-base-content">{u.name || 'Anonymous'}</div>
                                            <div className="text-xs font-bold text-base-content/40 flex items-center gap-1">
                                                <FaEnvelope className="text-[10px]" /> {u.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className={`badge badge-lg border-none px-4 py-3 font-black text-[10px] rounded-xl tracking-tighter
                                        ${u.role === 'superadmin' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 
                                          u.role === 'admin' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 
                                          u.role === 'manager' ? 'bg-accent text-accent-content' : 'bg-base-200 text-base-content/60'}`}>
                                        {u.role?.toUpperCase()}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        {u.status === 'suspended' ? (
                                            <span className="flex items-center gap-2 text-error font-black text-xs uppercase tracking-tight">
                                                <FaBan className="text-[10px]" /> Suspended
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 text-success font-black text-xs uppercase tracking-tight">
                                                <FaCheckCircle className="text-[10px]" /> Active Access
                                            </span>
                                        )}
                                        {u.suspendReason && <p className="text-[10px] text-error/60 italic max-w-[150px] truncate">{u.suspendReason}</p>}
                                    </div>
                                </td>
                                <td>
                                    {u.role !== 'superadmin' ? (
                                        <div className="flex items-center gap-3">
                                            <select 
                                                className="select select-sm select-bordered rounded-xl font-black bg-base-200 border-none transition-all focus:ring-2 ring-primary/20"
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                disabled={u.role === 'superadmin' && currentUser?.role !== 'superadmin'}
                                            >
                                                <option value="buyer">Buyer</option>
                                                <option value="manager">Manager</option>
                                                <option value="admin">Admin</option>
                                                {currentUser?.role === 'superadmin' && <option value="superadmin">Superadmin</option>}
                                            </select>

                                            <button 
                                                className={`btn btn-sm rounded-xl px-4 font-black transition-all hover:scale-105 active:scale-95
                                                    ${u.status === 'suspended' ? 'btn-success text-white' : 'btn-error btn-outline border-2'}`}
                                                onClick={() => openSuspendModal(u)}
                                            >
                                                {u.status === 'suspended' ? 'RESTORE' : 'BLOCK'}
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] font-black uppercase tracking-widest text-base-content/20 flex items-center gap-2">
                                            <FaShieldAlt /> Immutable Role
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {loading && (
                    <div className="p-20 text-center space-y-4">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="text-sm font-black text-base-content/30 uppercase tracking-widest">Hydrating Users...</p>
                    </div>
                )}
                
                {!loading && users.length === 0 && (
                    <div className="p-20 text-center opacity-30 flex flex-col items-center">
                        <FaUserShield className="text-6xl mb-4" />
                        <h2 className="text-2xl font-black uppercase tracking-widest">No Matches Found</h2>
                        <p className="max-w-xs mt-2 font-medium">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </motion.div>

            {/* Suspend Modal */}
            <AnimatePresence>
                {isModalOpen && selectedUser && (
                    <div className="modal modal-open backdrop-blur-sm">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="modal-box bg-base-100 dark:bg-base-200 rounded-[2.5rem] p-10 border border-base-300 shadow-2xl relative"
                        >
                            <div className={`w-20 h-20 rounded-3xl mb-6 flex items-center justify-center text-4xl shadow-xl mx-auto
                                ${selectedUser.status === 'suspended' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                                {selectedUser.status === 'suspended' ? <FaCheckCircle /> : <FaBan />}
                            </div>

                            <h3 className="font-black text-2xl mb-4 text-center">
                                {selectedUser.status === 'suspended' ? 'Restore User Access' : 'Block User Access'}
                            </h3>
                            
                            <p className="text-center font-medium opacity-60 mb-8">
                                You are about to change system access for <span className="font-black text-base-content">{selectedUser.name}</span>.
                            </p>
                            
                            {selectedUser.status !== 'suspended' && (
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-base-content/40 pl-1">Suspension Briefing</label>
                                    <textarea 
                                        className="textarea textarea-bordered h-32 w-full rounded-2xl bg-base-200/50 border-2 border-transparent focus:border-error/30 transition-all font-medium"
                                        placeholder="Enter the official reason for this action..."
                                        value={suspendReason}
                                        onChange={(e) => setSuspendReason(e.target.value)}
                                    ></textarea>
                                </div>
                            )}

                            <div className="modal-action flex gap-4">
                                <button className="btn btn-ghost rounded-2xl px-6 flex-1 font-bold" onClick={() => setIsModalOpen(false)}>Abort Action</button>
                                <button 
                                    className={`btn rounded-2xl px-8 flex-1 font-black shadow-lg
                                        ${selectedUser.status === 'suspended' ? 'btn-success text-white shadow-success/20' : 'btn-error text-white shadow-error/20'}`}
                                    onClick={handleSuspend}
                                >
                                    Confirm Update
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ManageUsers;

