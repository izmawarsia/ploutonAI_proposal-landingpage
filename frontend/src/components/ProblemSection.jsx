import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

const problems = [
  { title: "ERP Interface Drift", description: "Browser-based workflows depend on visual interfaces that can change without notice, silently breaking automated runs.", tag: "Risk Area", tagColor: "text-amber-500", dot: "bg-amber-500", bars: 4 },
  { title: "Integration & Adaption Challenges", description: "Connecting multiple ERP environments requires significant coordination. Each integration point is a potential failure surface for agents in production.", tag: "Operational Challenge", tagColor: "text-blue-500", dot: "bg-blue-500", bars: 3 },
  { title: "Automation Exceptions", description: "When agents encounter unexpected data or workflow states, there is no structured exception routing. Errors stall silently without human notification.", tag: "Operational Challenge", tagColor: "text-blue-500", dot: "bg-blue-500", bars: 3 },
  { title: "Trust & Control Requirements", description: "Finance operations require full traceability of every automated action. Without a dedicated audit layer, agent decisions cannot be reviewed or replayed.", tag: "Risk Area", tagColor: "text-amber-500", dot: "bg-amber-500", bars: 4 },
  { title: "Credential & Session Security", description: "Each client entrusts real login credentials to the agents — storage, session isolation, and access scope are business-critical.", tag: "Risk Area", tagColor: "text-amber-500", dot: "bg-amber-500", bars: 4, badge: "Security Concern" },
]

const riskChartData = [
  { name: "Interface Drift", severity: 80, fill: "#f59e0b" },
  { name: "Integration Challenges", severity: 60, fill: "#3b82f6" },
  { name: "Exceptions", severity: 65, fill: "#3b82f6" },
  { name: "Trust & Control", severity: 85, fill: "#f59e0b" },
  { name: "Credential Security", severity: 90, fill: "#f59e0b" },
]

function ProblemSection() {
  return (
    <section id="problems" className="px-6 md:px-10 py-20 md:py-24 bg-[#dce6f9]">
      <span className="inline-block text-xs uppercase tracking-widest text-slate-700 border border-slate-400 rounded-full px-4 py-1.5 mb-6">
        The Problem
      </span>
      <h2 className="text-2xl md:text-4xl font-bold max-w-2xl mb-4">
        <span className="text-slate-900">Key Operational Bottlenecks</span>{" "}
        <span className="text-blue-600">& Risk Areas</span>
      </h2>
      <p className="text-slate-500 max-w-2xl mb-14 leading-relaxed text-sm md:text-base">
        Targeted friction points in browser-based AI execution that impact enterprise reliability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mb-8">
        {problems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            {item.badge && (
              <span className="absolute top-4 right-4 text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
            <h3 className="text-base font-bold text-slate-900 mb-3 pr-8">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className={`flex items-center gap-1.5 text-xs font-medium ${item.tagColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`}></span>
                {item.tag}
              </span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, b) => (
                  <span key={b} className={`w-4 h-1 rounded-full ${b < item.bars ? "bg-slate-700" : "bg-slate-200"}`}></span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-slate-200 rounded-2xl p-5 max-w-6xl"
      >
     <div className="mb-2">
      <p className="text-sm font-semibold text-slate-700">Risk Severity Overview</p>
      </div>

        <div className="flex gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Risk Area
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Operational Challenge
          </span>
        </div>

        <div className="w-full h-44 md:h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskChartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <Tooltip />
              <Bar dataKey="severity" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  )
}

export default ProblemSection