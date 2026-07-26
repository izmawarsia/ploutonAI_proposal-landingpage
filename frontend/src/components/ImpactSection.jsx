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

const revenueChartData = [
  { year: "2022", revenue: 0.25 },
  { year: "2023", revenue: 0.9 },
  { year: "2024", revenue: 2.5 },
  { year: "2025", revenue: 6.0 },
  { year: "2026", revenue: 12.5 },
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
  <div className="flex justify-between items-center mb-2">
    <p className="text-sm font-semibold text-slate-700">Estimated Revenue Growth (USD, Millions)</p>
    <span className="text-[10px] bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
      Estimated Data
    </span>
  </div>
  <div className="w-full h-56 md:h-72">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={revenueChartData} barSize={36}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748b" }} />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
        <Tooltip formatter={(value) => [`$${value}M`, "Revenue"]} />
        <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
  <p className="text-[10px] text-slate-400 mt-4">
    * These figures are not official financial data. They are a reasonable
    estimate for financial modeling purposes only, as Plouton AI has not
    released audited revenue numbers.
  </p>
</motion.div>
    </section>
  )
}

export default ImpactSection