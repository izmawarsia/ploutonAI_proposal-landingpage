import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { RefreshCw, Gauge, FileSearch, ShieldCheck, TrendingUp } from "lucide-react"

const impactCards = [
  { icon: RefreshCw, title: "Reliability", description: "More resilient automation against interface changes." },
  { icon: Gauge, title: "Operational Efficiency", description: "Less manual monitoring and exception handling." },
  { icon: FileSearch, title: "Auditability", description: "Better visibility into agent actions and historical runs." },
  { icon: ShieldCheck, title: "Enterprise Control", description: "Human checkpoints and role-based control over sensitive workflows." },
  { icon: TrendingUp, title: "Scalability", description: "A structured control layer as workflows and ERP environments grow." },
]

const comparisonData = [
  { metric: "Interface Reliability", plouton: 60, aerox: 92 },
  { metric: "Exception Handling", plouton: 45, aerox: 88 },
  { metric: "Audit Visibility", plouton: 70, aerox: 95 },
  { metric: "Session Security", plouton: 65, aerox: 90 },
]

function ImpactSection() {
  return (
    <section id="impact" className="px-6 md:px-10 py-20 md:py-24 bg-white">
      <span className="inline-block text-xs uppercase tracking-widest text-slate-700 border border-slate-300 rounded-full px-4 py-1.5 mb-6">
        Business Impact
      </span>
      <h2 className="text-2xl md:text-4xl font-bold text-slate-900 max-w-2xl mb-3">
        How this strengthens enterprise finance automation
      </h2>
      <p className="text-slate-400 max-w-2xl mb-12 text-sm md:text-base">
        Directional value the proposed work is intended to deliver.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mb-14">
        {impactCards.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-slate-50 rounded-xl p-5 border border-slate-100"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Icon size={16} className="text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          )
        })}
      </div>

{/* Chart */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5 }}
  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 md:p-8 max-w-6xl"
>
  <p className="text-sm font-semibold text-slate-700 mb-2">
    Plouton (Current) vs. Plouton + Aerox (Enhanced)
  </p>
  <div className="flex gap-4 mb-4">
    <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
      <span className="w-2 h-2 rounded-full bg-slate-400"></span> Plouton Today
    </span>
    <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
      <span className="w-2 h-2 rounded-full bg-blue-600"></span> With Aerox Enhancements
    </span>
  </div>
  <div className="w-full h-56 md:h-72">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={comparisonData} barGap={6}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="metric" tick={{ fontSize: 10, fill: "#64748b" }} />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} unit="%" />
        <Tooltip formatter={(value) => [`${value}%`, ""]} />
        <Bar dataKey="plouton" fill="#cbd5e1" name="Plouton Today" radius={[4, 4, 0, 0]} />
        <Bar dataKey="aerox" fill="#2563eb" name="With Aerox Enhancements" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</motion.div>
    </section>
  )
}

export default ImpactSection