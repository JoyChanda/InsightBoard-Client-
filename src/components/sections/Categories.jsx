import { FaLock, FaTasks, FaShoppingCart } from "react-icons/fa";

const categories = [
  {
    role: "Admin",
    title: "System Oversight",
    features: ["Global Statistics", "User Moderation", "System Health Monitoring"],
    icon: FaLock,
    color: "from-blue-600 to-indigo-700",
  },
  {
    role: "Manager",
    title: "Production Control",
    features: ["Inventory Management", "Order Tracking", "Quality Approval"],
    icon: FaTasks,
    color: "from-purple-600 to-fuchsia-700",
  },
  {
    role: "Buyer",
    title: "Procurement",
    features: ["Browse Catalogue", "Bulk Ordering", "Delivery Tracking"],
    icon: FaShoppingCart,
    color: "from-emerald-600 to-teal-700",
  },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((cat, idx) => {
        const Icon = cat.icon;
        return (
          <div key={idx} className="card bg-base-100 overflow-hidden border border-base-300 shadow-lg group">
            <div className={`h-2 bg-gradient-to-r ${cat.color}`}></div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-xl text-primary font-bold">
                  <Icon />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary opacity-80">{cat.role}</span>
                  <h3 className="text-xl font-bold">{cat.title}</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {cat.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-base-content/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
