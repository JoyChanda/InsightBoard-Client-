import { motion } from "framer-motion";

const metrics = [
  { label: "Production Efficiency", value: 92, color: "bg-blue-500" },
  { label: "Order Accuracy", value: 99, color: "bg-emerald-500" },
  { label: "System Uptime", value: 99.9, color: "bg-purple-500" },
  { label: "Growth Rate", value: 15, color: "bg-amber-500" },
];

const Statistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        {metrics.map((m, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-base-content">{m.label}</span>
              <span className="text-primary font-bold">{m.value}%</span>
            </div>
            <div className="w-full h-3 bg-base-300 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${m.value}%` }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className={`h-full ${m.color}`}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="hidden md:block relative">
        <div className="aspect-square rounded-full border-8 border-primary/10 flex items-center justify-center relative">
             <div className="text-center">
                 <div className="text-6xl font-black text-primary">15k+</div>
                 <div className="text-base-content/60 font-bold uppercase">Monthly Reports</div>
             </div>
             {/* Decorative orbits */}
             <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
             <div className="absolute -top-4 left-1/2 w-8 h-8 bg-secondary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
