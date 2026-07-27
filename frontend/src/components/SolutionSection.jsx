import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import exceptionDiagram from "../assets/exceptional inteeligence.jpeg"
import docDiagram from "../assets/document_understanding.jpeg"
import performanceDiagram from "../assets/Agent Performance Analytics Architecture.jpeg"

const API_BASE = "https://plouton-ai-proposal-landingpage-hi5.vercel.app"
const NLP_API_URL = "https://nlp-audit-wsr6-git-main-aerox1.vercel.app/api/chat"

// Enterprise UI Preview Templates for Pitch Demo
const defaultOldHtml = `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 p-3 font-sans text-xs">
  <div class="max-w-xs mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-3">
    <div class="flex justify-between items-center mb-2">
      <span class="font-bold text-slate-800">ERP Workflow #204</span>
      <span id="status-badge" class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium text-[10px]">Pending Review</span>
    </div>
    <div class="space-y-1 text-slate-500 text-[11px]">
      <div class="flex justify-between"><span>Vendor:</span> <strong class="text-slate-700">Acme Corp</strong></div>
      <div class="flex justify-between"><span>Amount:</span> <strong class="text-slate-700">$14,250.00</strong></div>
    </div>
  </div>
</body>
</html>`

const defaultNewHtml = `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 p-3 font-sans text-xs">
  <div class="max-w-xs mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-3">
    <div class="flex justify-between items-center mb-2">
      <span class="font-bold text-slate-800">ERP Workflow #204</span>
      <span id="status-badge" class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium text-[10px]">Auto-Verified</span>
    </div>
    <div class="space-y-1 text-slate-500 text-[11px]">
      <div class="flex justify-between"><span>Vendor:</span> <strong class="text-slate-700">Acme Corp</strong></div>
      <div class="flex justify-between"><span>Amount:</span> <strong class="text-slate-700">$14,250.00</strong></div>
    </div>
  </div>
</body>
</html>`

const solutions = [
  { title: "Self-Healing Agents", tag: "POC", interactive: true, description: "Auto-adapts when interfaces change.", action: "Open Demo" },
  { title: "Exception Intelligence", tag: "ARCH", interactive: false, description: "Flags likely causes before human review.", action: "View Architecture", diagram: exceptionDiagram },
  { title: "Smart Document Understanding", tag: "ARCH", interactive: false, description: "Extracts invoice & remittance data.", action: "View Architecture", diagram: docDiagram },
  { title: "Natural-Language Audit Assistant", tag: "POC", interactive: true, description: "Ask questions about any agent run.", action: "Open Demo" },
  { title: "Agent Performance Analytics", tag: "ARCH", interactive: false, description: "AI summaries of accuracy & time saved.", action: "View Architecture", diagram: performanceDiagram },
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

  // Self-Healing state
  const [oldHtml, setOldHtml] = useState(defaultOldHtml)
  const [newHtml, setNewHtml] = useState(defaultNewHtml)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // NLP Chat state
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [sessionId] = useState(() => "session-" + Math.random().toString(36).slice(2))

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const formData = new FormData()
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
      console.error(err)
      setError("Could not reach the Agent Prediction service. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChatSend = async () => {
    if (!chatInput.trim()) return
    const userMessage = chatInput
    setChatMessages((prev) => [...prev, { role: "user", text: userMessage }])
    setChatInput("")
    setChatLoading(true)

    try {
      const res = await fetch(NLP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: userMessage }),
      })
      
      if (!res.ok) throw new Error(`Chat API failed with status ${res.status}`)
      
      const data = await res.json()
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.nlp_response, entities: data.query_entities },
      ])
    } catch (err) {
      console.error(err)
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, I couldn't process that. Please try again." },
      ])
    } finally {
      setChatLoading(false)
    }
  }

  const openModal = (item) => {
    setSelected(item)
    setResult(null)
    setError(null)
    setShowCodeEditor(false)
    setChatMessages([])
    setChatInput("")
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
      <h2 className="text-2xl md:text-4xl font-bold max-w-2xl mb-4">
        <span className="text-slate-900">Problem → Aerox Solution</span>{" "}
        <span className="text-blue-600">→ Technical Proof</span>
      </h2>
      <p className="text-slate-500 max-w-2xl mb-12 leading-relaxed text-sm md:text-base">
        Five targeted capabilities that strengthen Plouton's automation layer.
        Two directions already have working proofs of concept.
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
            className="bg-slate-50 rounded-xl p-6 cursor-pointer hover:bg-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100"
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
            <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">{item.description}</p>
            <span className="text-blue-600 text-xs md:text-sm font-semibold">{item.action} ›</span>
          </motion.div>
        ))}
      </div>

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
                  {/* UI Visual Comparison for Pitch */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-700">Original State (Old UI)</span>
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-medium">v1.0</span>
                      </div>
                      <iframe
                        srcDoc={oldHtml}
                        title="old-ui-preview"
                        className="w-full h-36 border border-slate-200 rounded-lg bg-white shadow-inner"
                      />
                    </div>

                    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-700 font-semibold">Drifted State (New UI)</span>
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">v2.0 Changed</span>
                      </div>
                      <iframe
                        srcDoc={newHtml}
                        title="new-ui-preview"
                        className="w-full h-36 border border-slate-200 rounded-lg bg-white shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Prediction Trigger Controls */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white text-xs md:text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                    >
                      {loading ? "Model Predicting Drift..." : "Run AI Drift & Binding Analysis"}
                    </button>

                    <button
                      onClick={() => setShowCodeEditor(!showCodeEditor)}
                      className="text-xs text-slate-500 hover:text-blue-600 underline"
                    >
                      {showCodeEditor ? "Hide Source HTML" : "View Source HTML"}
                    </button>
                  </div>

                  {/* Optional Raw HTML Code View */}
                  {showCodeEditor && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 bg-slate-900 p-3 rounded-lg">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Old HTML Source</label>
                        <textarea
                          value={oldHtml}
                          onChange={(e) => setOldHtml(e.target.value)}
                          className="w-full h-24 text-[11px] font-mono bg-transparent text-slate-200 outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">New HTML Source</label>
                        <textarea
                          value={newHtml}
                          onChange={(e) => setNewHtml(e.target.value)}
                          className="w-full h-24 text-[11px] font-mono bg-transparent text-slate-200 outline-none resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

                  {/* Model Prediction & Output Data Display */}
                  {result && result.results && (
                    <div className="border-t border-slate-200 pt-4 mt-2">
                      <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">
                        Model Predictions & Change Detection Output
                      </p>

                      {/* High Level Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        <div className="bg-slate-50 rounded-lg p-2.5 text-center border border-slate-100">
                          <p className="text-base font-bold text-slate-800">{result.results.summary.changes_detected}</p>
                          <p className="text-[10px] text-slate-500">UI Changes Detected</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2.5 text-center border border-slate-100">
                          <p className="text-base font-bold text-slate-800">{result.results.summary.text_changes}</p>
                          <p className="text-[10px] text-slate-500">Text/Binding Changes</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2.5 text-center border border-slate-100">
                          <p className="text-base font-bold text-slate-800">{result.results.summary.attribute_changes}</p>
                          <p className="text-[10px] text-slate-500">Attribute Changes</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2.5 text-center border border-slate-100">
                          <p className="text-base font-bold text-green-600">{result.results.summary.self_healing_candidates}</p>
                          <p className="text-[10px] text-slate-500">Verified Binding Candidates</p>
                        </div>
                      </div>

                      {/* Detailed AI Predictions */}
                      <div className="space-y-2">
                        {result.results.results.map((finding, i) => (
                          <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white shadow-sm text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-slate-800">{finding.change_type}</span>
                              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
                                {finding.status}
                              </span>
                            </div>
                            {finding.changes.map((c, j) => (
                              <div key={j} className="text-slate-600 my-1">
                                <span className="text-red-500 line-through mr-1">{c.old}</span> →{" "}
                                <span className="text-green-600 font-semibold ml-1">{c.new}</span>
                              </div>
                            ))}
                            <p className="text-[11px] text-blue-600 bg-blue-50 p-1.5 rounded mt-2 font-mono">
                              <strong>Agent Model Prediction:</strong> {finding.healing_action}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : selected.title === "Natural-Language Audit Assistant" ? (
                <div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 h-64 overflow-y-auto mb-3 flex flex-col gap-3">
                    {chatMessages.length === 0 && (
                      <p className="text-xs text-slate-400 text-center mt-4">
                        Try: "Why was TX-2041 flagged?"
                      </p>
                    )}
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            msg.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-700"
                          }`}
                        >
                          <p>{msg.text}</p>
                          {msg.entities && (
                            <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 space-y-0.5">
                              {msg.entities.transaction_id && <p>Transaction: {msg.entities.transaction_id}</p>}
                              {msg.entities.workflow && <p>Workflow: {msg.entities.workflow}</p>}
                              {msg.entities.transaction_status && <p>Status: {msg.entities.transaction_status}</p>}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-400">
                          Thinking...
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                      placeholder="Ask about a transaction, invoice, or workflow..."
                      className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                    />
                    <button
                      onClick={handleChatSend}
                      disabled={chatLoading}
                      className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Ask
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <img
                    src={selected.diagram}
                    alt={selected.title}
                    className="w-full rounded-lg border border-slate-200"
                  />
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