import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import { useAuth } from "../../../context/AuthContext";

const ManageUsers = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    
    // For Suspend Modal
    const [selectedUser, setSelectedUser] = useState(null);
    const [suspendReason, setSuspendReason] = useState("");
    const [isvModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            let url = `${import.meta.env.VITE_API_URL}/users?`;
            if (search) url += `search=${search}&`;
            if (roleFilter) url += `role=${roleFilter}`;

            const res = await axios.get(url, { withCredentials: true }); // Ensure cookie is sent
             // Or use header if auth implemented that way. Assuming cookie for now based on server setup.
            setUsers(res.data.users);
        } catch {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    }, [search, roleFilter]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleRoleChange = async (userId, newRole) => {
        if(!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}/role`, { role: newRole }, { withCredentials: true });
            toast.success("User role updated");
            fetchUsers();
        } catch {
            toast.error("Failed to update role");
        }
    };

    const openSuspendModal = (user) => {
        setSelectedUser(user);
        setSuspendReason(user.suspendReason || ""); // Pre-fill if exists
        setIsModalOpen(true);
    };

    const handleSuspend = async () => {
        try {
            const status = selectedUser.status === 'suspended' ? 'active' : 'suspended';
            // Use the same endpoint as role change based on my controller update
            await axios.patch(`${import.meta.env.VITE_API_URL}/users/${selectedUser._id}/role`, { 
                status: status,
                suspendReason: status === 'suspended' ? suspendReason : "" 
            }, { withCredentials: true });

            toast.success(`User ${status === 'suspended' ? 'Suspended' : 'Activated'} Successfully`);
            setIsModalOpen(false);
            fetchUsers();
        } catch {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="p-6 min-h-full">
            <h1 className="text-3xl font-bold mb-6 text-base-content">Manage Users</h1>
            
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    className="input input-bordered w-full md:w-1/3 bg-base-100 text-base-content border-gray-300 dark:bg-base-200 dark:border-gray-600"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    className="select select-bordered w-full md:w-1/4 bg-base-100 text-base-content border-gray-300 dark:bg-base-200 dark:border-gray-600"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">All Roles</option>
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <div className="overflow-x-auto bg-base-100 dark:bg-base-200 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content dark:bg-base-300">
                            <th className="font-bold">Name</th>
                            <th className="font-bold">Email</th>
                            <th className="font-bold">Role</th>
                            <th className="font-bold">Status</th>
                            <th className="font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-base-200 dark:hover:bg-base-300 transition">
                                <td className="font-semibold text-base-content">{user.name}</td>
                                <td className="text-base-content/70">{user.email}</td>
                                <td>
                                    <div className="badge badge-outline uppercase text-xs font-bold">
                                        {user.role}
                                    </div>
                                </td>
                                <td>
                                    {user.status === 'suspended' ? (
                                        <span className="badge badge-error gap-2">
                                            Suspended
                                        </span>
                                    ) : (
                                        <span className="badge badge-success gap-2">
                                            Active
                                        </span>
                                    )}
                                </td>
                                <td className="flex gap-2">
                                    {user.role !== 'superadmin' && (
                                        <>
                                            <select 
                                                className="select select-bordered select-xs"
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                disabled={user.role === 'superadmin' && currentUser?.role !== 'superadmin'}
                                            >
                                                <option value="buyer">Buyer</option>
                                                <option value="manager">Manager</option>
                                                <option value="admin">Admin</option>
                                                {currentUser?.role === 'superadmin' && <option value="superadmin">Superadmin</option>}
                                            </select>

                                            <button 
                                                className={`btn btn-xs ${user.status === 'suspended' ? 'btn-success' : 'btn-error'}`}
                                                onClick={() => openSuspendModal(user)}
                                            >
                                                {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {loading && <tr><td colSpan="5"><Spinner size="sm" message="Loading users..." /></td></tr>}
                        {!loading && users.length === 0 && <tr><td colSpan="5" className="text-center py-8 text-base-content/70">No users found.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Suspend Modal */}
            {isvModalOpen && selectedUser && (
                <div className="modal modal-open">
                    <div className="modal-box bg-base-100 dark:bg-base-200 text-base-content">
                        <h3 className="font-bold text-lg mb-4">
                            {selectedUser.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                        </h3>
                        
                        {selectedUser.status !== 'suspended' && (
                            <div className="form-control">
                                <label className="label">Reason for Suspension</label>
                                <textarea 
                                    className="textarea textarea-bordered h-24"
                                    placeholder="e.g. Violation of terms..."
                                    value={suspendReason}
                                    onChange={(e) => setSuspendReason(e.target.value)}
                                ></textarea>
                            </div>
                        )}

                        {selectedUser.status === 'suspended' && (
                            <p>Are you sure you want to reactivate <strong>{selectedUser.name}</strong>?</p>
                        )}

                        <div className="modal-action">
                            <button className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button 
                                className={`btn ${selectedUser.status === 'suspended' ? 'btn-success' : 'btn-error'}`}
                                onClick={handleSuspend}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
