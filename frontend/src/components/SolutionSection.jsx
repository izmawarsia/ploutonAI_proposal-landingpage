import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const API_BASE = "https://plouton-ai-proposal-landingpage-hi5.vercel.app"

// Sample default HTML for demo purposes
const defaultOldHtml = `<div class="app"><span class="badge">pending approval</span></div>`
const defaultNewHtml = `<div class="app"><span class="badge">verified</span></div>`

const solutions = [
  { title: "Self-Healing Agents", tag: "POC", interactive: true, description: "Detects when a target system's interface changes and adapts the agent's action sequence automatically.", action: "Open Demo" },
  { title: "Exception Intelligence", tag: "ARCH", interactive: false, description: "Flags likely causes for unmatched transactions before escalating to a human reviewer.", action: "View Architecture", flow: ["Transaction Data", "Matching / Analysis", "Anomaly Detection", "Possible Cause", "Human Review"] },
  { title: "Smart Document Understanding", tag: "ARCH", interactive: false, description: "Improved extraction of invoice numbers, remittance references, and line items from unstructured documents.", action: "View Architecture", flow: ["Document", "OCR / Document Processing", "Information Extraction", "Structured Data", "Finance Workflow"] },
  { title: "Natural-Language Audit Assistant", tag: "POC", interactive: true, description: "Lets a finance controller ask plain-language questions about a given agent run or close cycle.", action: "Open Demo" },
  { title: "Agent Performance Analytics", tag: "ARCH", interactive: false, description: "AI-generated summaries of agent accuracy, exception rates, and time saved per workflow.", action: "View Architecture", flow: ["Agent Runs", "Metrics Collection", "Analysis", "Performance Dashboard", "ROI Insights"] },
]

const complementFlow = [
  { title: "Plouton Agent Activity", sub: "Runs workflows" },
  { title: "Data / Logs / Events", sub: "Captured in real-time" },
  { title: "Aerox Intelligence Layer", sub: "Monitoring & analysis", active: true },
  { title: "AI Analysis", sub: "Exception detection" },
  { title: "Control & Human Review", sub: "Checkpoints" },
  { title: "Enterprise Dashboard", sub: "Full visibility" },
]

function SolutionSection() {
  const [selected, setSelected] = useState(null)
  const [oldHtml, setOldHtml] = useState(defaultOldHtml)
  const [newHtml, setNewHtml] = useState(defaultNewHtml)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

 const handleAnalyze = async () => {
  setLoading(true)
  setError(null)
  setResult(null)
  try {
    const formData = new FormData()

    // Convert HTML strings into file-like Blobs
    const oldBlob = new Blob([oldHtml], { type: "text/html" })
    const newBlob = new Blob([newHtml], { type: "text/html" })

    formData.append("old_page", oldBlob, "old_page.html")
    formData.append("new_page", newBlob, "new_page.html")

    const res = await fetch(`${API_BASE}/detect`, {
      method: "POST",
      body: formData,
    })
    if (!res.ok) throw new Error("API request failed")
    const data = await res.json()
    setResult(data)
  } catch (err) {
    setError("Could not reach the Self-Healing Agent service. Please try again.",err)
  } finally {
    setLoading(false)
  }
}

  const openModal = (item) => {
    setSelected(item)
    setResult(null)
    setError(null)
    if (item.title === "Self-Healing Agents") {
      setOldHtml(defaultOldHtml)
      setNewHtml(defaultNewHtml)
    }
  }

  return (
    <section id="solutions" className="px-6 md:px-10 py-20 md:py-24 bg-white">
      <span className="inline-block text-xs uppercase tracking-widest text-slate-700 border border-slate-300 rounded-full px-4 py-1.5 mb-6">
        Solutions
      </span>
      <h2 className="text-2xl md:text-4xl font-bold text-slate-900 max-w-2xl mb-4">
        Problem → Aerox Solution → Technical Proof
      </h2>
      <p className="text-slate-500 max-w-2xl mb-12 leading-relaxed text-sm md:text-base">
        Five targeted capabilities that strengthen Plouton's automation layer.
        Two directions already have working proofs of concept. The remaining
        three are proposed architecture for discussion.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mb-16">
        {solutions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => openModal(item)}
            className="bg-slate-50 rounded-xl p-6 cursor-pointer hover:bg-slate-100 transition-colors border border-slate-100"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-medium bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              {item.interactive && (
                <span className="flex items-center gap-1 text-[10px] text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Interactive
                </span>
              )}
            </div>
            <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">{item.description}</p>
            <span className="text-blue-600 text-xs md:text-sm font-medium">{item.action} ›</span>
          </motion.div>
        ))}
      </div>

      {/* How Aerox Complements Plouton */}
      <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold mb-4">
        How Aerox Complements Plouton
      </p>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 border border-slate-200 rounded-xl p-5 md:p-6 md:overflow-x-auto">
        {complementFlow.map((step, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center gap-2 md:gap-3 md:shrink-0">
            <div className={`w-full rounded-lg px-4 py-3 text-center border ${step.active ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50"} md:min-w-[140px]`}>
              <p className="text-xs md:text-sm font-semibold text-slate-800">{step.title}</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">{step.sub}</p>
            </div>
            {i < complementFlow.length - 1 && (
              <span className="text-slate-300 text-lg">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{selected.title}</h3>
              <p className="text-slate-500 text-sm mb-6">{selected.description}</p>

              {selected.title === "Self-Healing Agents" ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Old HTML</label>
                      <textarea
                        value={oldHtml}
                        onChange={(e) => setOldHtml(e.target.value)}
                        className="w-full h-24 text-xs font-mono border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">New HTML</label>
                      <textarea
                        value={newHtml}
                        onChange={(e) => setNewHtml(e.target.value)}
                        className="w-full h-24 text-xs font-mono border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors mb-4"
                  >
                    {loading ? "Analyzing..." : "Analyze / Self-Heal"}
                  </button>

                  {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

                  {result && result.results && (
                    <div>
                      {/* Summary cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <p className="text-lg font-bold text-slate-800">
                            {result.results.summary.changes_detected}
                          </p>
                          <p className="text-[10px] text-slate-400">Total Changes</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <p className="text-lg font-bold text-slate-800">
                            {result.results.summary.text_changes}
                          </p>
                          <p className="text-[10px] text-slate-400">Text Changes</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <p className="text-lg font-bold text-slate-800">
                            {result.results.summary.attribute_changes}
                          </p>
                          <p className="text-[10px] text-slate-400">Attribute Changes</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <p className="text-lg font-bold text-green-600">
                            {result.results.summary.self_healing_candidates}
                          </p>
                          <p className="text-[10px] text-slate-400">Self-Healing Candidates</p>
                        </div>
                      </div>

                      {/* Detailed findings */}
                      <div className="space-y-3">
                        {result.results.results.map((finding, i) => (
                          <div key={i} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-semibold text-slate-700">
                                {finding.change_type}
                              </span>
                              <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                {finding.status}
                              </span>
                            </div>
                            {finding.changes.map((c, j) => (
                              <p key={j} className="text-xs text-slate-500 mb-1">
                                <span className="text-red-500">{c.old}</span> → <span className="text-green-600">{c.new}</span>
                              </p>
                            ))}
                            <p className="text-[11px] text-slate-400 mt-2 italic">
                              {finding.healing_action}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : selected.interactive ? (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center text-slate-400 text-sm">
                  [ Working POC demo will render here ]
                </div>
              ) : (
               <div className="flex flex-col">
           {selected.flow.map((step, i) => (
           <div key={i}>
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 text-center">
          {step}
         </div>
          {i < selected.flow.length - 1 && (
        <div className="flex justify-center py-1">
          <span className="text-slate-300">↓</span>
        </div>
      )}
      </div>
  ))}
  <p className="text-[10px] uppercase tracking-widest text-amber-500 mt-4">
    Proposed Architecture — Solution Concept
  </p>
  </div>
              )}

              <button
                onClick={() => setSelected(null)}
                className="mt-6 text-sm text-slate-500 hover:text-slate-800"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default SolutionSection