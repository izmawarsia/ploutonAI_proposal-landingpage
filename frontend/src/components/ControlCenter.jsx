import { useState } from "react"
import { motion } from "framer-motion"

const agentStatus = [
  { label: "Active", value: 4 },
  { label: "Running", value: 2 },
  { label: "Completed", value: 8 },
  { label: "Requires Review", value: 1 },
]

const workflows = [
  { name: "Accounts Payable", percent: 74, color: "bg-blue-500" },
  { name: "Bank Reconciliation", percent: 90, color: "bg-green-500" },
  { name: "Month-End Close", percent: 62, color: "bg-amber-500" },
]

const performance = [
  { label: "Successful Runs", value: "142", color: "text-green-500" },
  { label: "Exceptions", value: "3", color: "text-amber-500" },
  { label: "Failed Runs", value: "0", color: "text-slate-700" },
  { label: "Avg. Processing Time", value: "1m 24s", color: "text-slate-700" },
]

const exceptions = [
  { tx: "INV-1042", workflow: "Accounts Payable", issue: "Amount mismatch", status: "Review" },
  { tx: "TX-2041", workflow: "Bank Reconciliation", issue: "FX rate difference", status: "Review" },
  { tx: "CL-3021", workflow: "Month-End Close", issue: "Missing entry", status: "Open" },
  { tx: "INV-1058", workflow: "Accounts Payable", issue: "Duplicate invoice detected", status: "Review" },
   { tx: "TX-2058", workflow: "Bank Reconciliation", issue: "Partial payment mismatch", status: "Review" },
   { tx: "CL-3034", workflow: "Month-End Close", issue: "Account balance mismatch", status: "Review" },
  { tx: "INV-1071", workflow: "Accounts Payable", issue: "Missing vendor reference", status: "Open" },
    { tx: "TX-2077", workflow: "Bank Reconciliation", issue: "Unmatched deposit", status: "Open" },
    { tx: "CL-3045", workflow: "Month-End Close", issue: "Unreconciled ledger item", status: "Review" },
]

const auditLog = [
  { time: "10:31", agent: "Agent-02", action: "Invoice extracted", workflow: "AP", status: "Success" },
  { time: "10:28", agent: "Agent-03", action: "Missing entry flagged", workflow: "Month-End", status: "Warning" },
  { time: "10:24", agent: "Agent-01", action: "PDF parsed", workflow: "AP", status: "Success" },
  { time: "10:18", agent: "Agent-02", action: "Reconciliation completed", workflow: "Bank Recon", status: "Success" },
  { time: "10:11", agent: "Agent-04", action: "Payment run initiated", workflow: "AP", status: "Running" },
]

const statusColor = {
  Review: "bg-amber-100 text-amber-600",
  Open: "bg-red-100 text-red-600",
  Success: "bg-green-100 text-green-600",
  Warning: "bg-amber-100 text-amber-600",
  Running: "bg-blue-100 text-blue-600",
}

function ControlCenter() {
  const [activeTab, setActiveTab] = useState("All Workflows")

  const filteredWorkflows =
    activeTab === "All Workflows"
      ? workflows
      : workflows.filter((w) => w.name === activeTab)

  const filteredExceptions =
  activeTab === "All Workflows"
    ? exceptions.slice(0, 4)
    : exceptions.filter((e) => e.workflow === activeTab)

  return (
    <section id="control-center" className="px-6 md:px-10 py-20 md:py-24 bg-[#dce6f9]">
      <span className="inline-block text-xs uppercase tracking-widest text-slate-700 border border-slate-400 rounded-full px-4 py-1.5 mb-6">
        Product Direction
      </span>
      <h2 className="text-2xl md:text-4xl font-bold text-slate-900 max-w-2xl mb-3">
        Your operations, visible in one place.
      </h2>
      <p className="text-slate-500 max-w-2xl mb-10 text-sm md:text-base">
        A visual direction for the future control center. Not a functional
        production dashboard — all data below is illustrative.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl overflow-hidden max-w-5xl"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center bg-slate-900 text-white px-5 py-3 text-xs">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            All Systems Operational
          </span>
          <span className="bg-white/10 px-2 py-1 rounded-full">Demo Data</span>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 px-5 py-4 border-b border-slate-100 text-xs">
          {["All Workflows", "Accounts Payable", "Bank Reconciliation", "Month-End Close"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Agent Status */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Agent Status</p>
            <div className="grid grid-cols-2 gap-3">
              {agentStatus.map((a, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-slate-800">{a.value}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{a.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Overview */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-blue-500 mb-3">Workflow Overview</p>
            <div className="space-y-3">
              {filteredWorkflows.map((w, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{w.name}</span>
                    <span className="text-slate-500">{w.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className={`${w.color} h-1.5 rounded-full`} style={{ width: `${w.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Performance (24H)</p>
            <div className="space-y-2">
              {performance.map((p, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-slate-500">{p.label}</span>
                  <span className={`font-semibold ${p.color}`}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exception Queue */}
        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Exception Queue</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[500px]">
              <thead>
                <tr className="text-left text-slate-400">
                  <th className="pb-2 font-medium">Transaction</th>
                  <th className="pb-2 font-medium">Workflow</th>
                  <th className="pb-2 font-medium">Issue</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredExceptions.length > 0 ? (
                  filteredExceptions.map((e, i) => (
                    <tr key={i} className="border-t border-slate-50">
                      <td className="py-2 text-blue-600 font-medium">{e.tx}</td>
                      <td className="py-2 text-slate-600">{e.workflow}</td>
                      <td className="py-2 text-slate-500">{e.issue}</td>
                      <td className="py-2">
                        <span className={`text-[10px] px-2 py-1 rounded-full ${statusColor[e.status]}`}>{e.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-slate-400">
                      No exceptions for this workflow
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log */}
        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Audit Log</p>
          <div className="space-y-1.5">
            {auditLog.map((a, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <span className="text-slate-500">
                  {a.time} · <span className="text-blue-600 font-medium">{a.agent}</span> · {a.action}
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-slate-400 hidden sm:inline">{a.workflow}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColor[a.status]}`}>{a.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Replay Viewer */}
        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Agent Replay Viewer</p>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">▶</button>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
              <div className="w-2/5 h-1.5 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-xs text-slate-400">23s</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Agent-02 · Bank Reconciliation · Screen recording placeholder</p>
        </div>
      </motion.div>
    </section>
  )
}

export default ControlCenter