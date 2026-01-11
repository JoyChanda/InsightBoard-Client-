import { useEffect, useState } from "react";
import API from "../../../api";

const TeamPerformance = () => {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoading(true);
                // We'll reuse listUsers but specifically for managers
                const res = await API.get("/users?role=manager");
                setManagers(res.data.users || []);
            } catch (err) {
                console.error("Failed to fetch team data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <span className="loading loading-spinner loading-lg text-secondary"></span>
        </div>
    );

    return (
        <div className="p-6 space-y-8">
            <div className="bg-gradient-to-r from-secondary/10 to-transparent p-8 rounded-3xl border border-secondary/20">
                <h1 className="text-3xl font-black text-base-content mb-2 flex items-center gap-3">
                    <span className="bg-secondary p-2 rounded-xl text-white">🤝</span>
                    Team Performance
                </h1>
                <p className="opacity-60">Overview of all active managers and their operational status.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden">
                    <div className="p-6 border-b border-base-200 bg-base-200/50 flex justify-between items-center">
                        <h3 className="font-black">Active Managers</h3>
                        <div className="badge badge-secondary">{managers.length} Members</div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-base-100">
                                    <th className="font-bold uppercase text-xs opacity-50">Manager</th>
                                    <th className="font-bold uppercase text-xs opacity-50">Contact</th>
                                    <th className="font-bold uppercase text-xs opacity-50">Status</th>
                                    <th className="font-bold uppercase text-xs opacity-50">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {managers.map((mgr) => (
                                    <tr key={mgr._id} className="hover:bg-base-200/30 transition-colors">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                        {mgr.photoURL ? (
                                                            <img src={mgr.photoURL} alt={mgr.name} referrerPolicy="no-referrer" />
                                                        ) : (
                                                            <span>{mgr.name[0]}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{mgr.name}</div>
                                                    <div className="text-xs opacity-50">ID: {mgr._id.slice(-6)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm font-medium">{mgr.email}</div>
                                        </td>
                                        <td>
                                            <span className={`badge ${mgr.status === 'active' ? 'badge-success' : 'badge-warning'} badge-sm font-bold`}>
                                                {mgr.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="text-xs opacity-60">
                                                {new Date(mgr.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="card bg-primary text-primary-content shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title font-black uppercase text-xs opacity-80">Quick Tip</h2>
                        <p className="text-sm">Collaboration is key in production management. Reach out to other managers for batch cross-referencing.</p>
                    </div>
                 </div>
                 <div className="card bg-base-100 border border-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title font-black uppercase text-xs opacity-50">Operational Goal</h2>
                        <p className="text-sm font-medium">Currently maintaining <span className="text-success font-bold">100% Active</span> status across the team. Keep up the high responsiveness!</p>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default TeamPerformance;
