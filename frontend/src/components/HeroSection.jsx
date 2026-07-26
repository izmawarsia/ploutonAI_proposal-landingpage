import { motion } from "framer-motion"

const agents = [
  { name: "Agent-01", task: "Invoice Extraction", time: "0:42", status: "Running", color: "text-blue-400", dot: "bg-blue-400" },
  { name: "Agent-02", task: "Bank Reconciliation", time: "1:18", status: "Completed", color: "text-green-400", dot: "bg-green-400" },
  { name: "Agent-03", task: "Month-End Close", time: "2:05", status: "Review", color: "text-amber-400", dot: "bg-amber-400" },
  { name: "Agent-04", task: "AP Payment Run", time: "0:11", status: "Running", color: "text-blue-400", dot: "bg-blue-400" },
]

const auditEvents = [
  "10:31 · Agent-02 · Invoice matched · ✓",
  "10:28 · Agent-03 · Missing entry flagged · ⚠",
  "10:24 · Agent-01 · PDF extracted · ✓",
]

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center px-10 pt-24 pb-16 bg-gradient-to-br from-[#0a0e1f] via-[#0e1530] to-blue-700 text-white">
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">
        
        {/* Left */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-xs uppercase tracking-widest text-gray-300 border border-white/20 rounded-full px-4 py-1.5 mb-6"
          >
            Aerox ERP × Plouton AI
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          >
            Strengthening AI-Powered Finance Operations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-gray-300 mb-8 max-w-md leading-relaxed"
          >
            Aerox ERP proposes improving agent resilience, exception
            intelligence, auditability, and enterprise control — layered
            directly onto Plouton's existing stack.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex gap-4"
          >
            <a href="#control-center" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-1">
              View Control Center <span>›</span>
            </a>
            <a href="#solutions" className="border border-white/25 hover:border-white/50 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-1">
              Explore Solutions <span>›</span>
            </a>
          </motion.div>
        </div>

        {/* Right - Agent Monitor card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-[#0f1530]/70 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase tracking-widest text-gray-400">Agent Monitor</span>
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Live
            </span>
          </div>

          <div className="space-y-2 mb-5">
            {agents.map((a, i) => (
              <div key={i} className="flex justify-between items-center bg-white/5 rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`}></span>
                  <div>
                    <p className="text-sm font-medium">{a.name}</p>
                    <p className="text-xs text-gray-500">{a.task}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{a.time}</p>
                  <p className={`text-xs font-medium ${a.color}`}>{a.status}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Recent Audit Events</p>
          <div className="space-y-1">
            {auditEvents.map((e, i) => (
              <p key={i} className="text-xs text-gray-500">{e}</p>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection