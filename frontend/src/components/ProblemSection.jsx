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
  { name: "Integration", severity: 60, fill: "#3b82f6" },
  { name: "Exceptions", severity: 65, fill: "#3b82f6" },
  { name: "Trust & Control", severity: 85, fill: "#f59e0b" },
  { name: "Credential Sec.", severity: 90, fill: "#f59e0b" },
]

function ProblemSection() {
  return (
    <section id="problems" className="px-4 sm:px-6 md:px-10 py-16 md:py-24 bg-[#dce6f9]">
      <span className="inline-block text-xs uppercase tracking-widest text-slate-700 border border-slate-400 rounded-full px-4 py-1.5 mb-6">
        The Problem
      </span>
      <h2 className="text-2xl md:text-4xl font-bold max-w-2xl mb-4">
        <span className="text-slate-900">Key Operational Bottlenecks</span>{" "}
        <span className="text-blue-600">& Risk Areas</span>
      </h2>
      <p className="text-slate-500 max-w-2xl mb-10 md:mb-14 leading-relaxed text-sm md:text-base">
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
            className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default flex flex-col justify-between"
          >
            <div>
              {/* Flexible Header for Badge & Title */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <h3 className="text-base font-bold text-slate-900 flex-1 min-w-[180px]">
                  {item.title}
                </h3>
                {item.badge && (
                  <span className="shrink-0 text-[10px] font-medium bg-red-50 text-red-500 border border-red-100 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {item.badge}
                  </span>
                )}
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                {item.description}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className={`flex items-center gap-1.5 text-xs font-medium ${item.tagColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`}></span>
                {item.tag}
              </span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, b) => (
                  <span
                    key={b}
                    className={`w-3.5 sm:w-4 h-1 rounded-full ${b < item.bars ? "bg-slate-700" : "bg-slate-200"}`}
                  ></span>
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
        className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 max-w-6xl overflow-hidden"
      >
        <div className="mb-2">
          <p className="text-sm font-semibold text-slate-700">Risk Severity Overview</p>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Risk Area
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Operational Challenge
          </span>
        </div>

        <div className="w-full h-48 md:h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskChartData} barSize={24} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#94a3b8" }} interval={0} />
              <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", fontSize: "12px", padding: "6px 10px" }}
              />
              <Bar dataKey="severity" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  )
}

export default ProblemSection