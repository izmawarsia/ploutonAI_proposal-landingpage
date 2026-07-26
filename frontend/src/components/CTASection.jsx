import { useState } from "react"
import { motion } from "framer-motion"

function CTASection() {
  const [form, setForm] = useState({ name: "", email: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

 const handleSubmit = (e) => {
  e.preventDefault()
  const subject = encodeURIComponent("Meeting Request - Plouton AI Proposal")
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\nI'd like to request a meeting to discuss the Plouton AI proposal.`
  )
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=aeroxerp@gmail.com&su=${subject}&body=${body}`,
    "_blank"
  )
}

  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-gradient-to-br from-[#0a0e1f] via-[#0e1530] to-blue-700 text-white text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-block text-xs uppercase tracking-widest text-gray-300 border border-white/20 rounded-full px-4 py-1.5 mb-6"
      >
        Next Step
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl md:text-4xl font-bold max-w-2xl mx-auto mb-4"
      >
        Ready to Strengthen Enterprise Finance Automation?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-gray-300 max-w-md mx-auto mb-8 text-sm md:text-base"
      >
        Walk through the proposed control center and technical direction with
        the Aerox ERP team.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex justify-center gap-4 mb-10"
      >
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aeroxerp@gmail.com&su=Schedule%20a%20Discussion%20-%20Plouton%20AI%20Proposal"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
        >
  Schedule a Discussion
</a>
        <a href="#solutions" className="border border-white/25 hover:border-white/50 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors">
          Explore the Solution
        </a>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-sm mx-auto"
      >
        <p className="text-xs text-gray-400 mb-4">Or send a meeting request directly:</p>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 mb-3 outline-none focus:border-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="your@company.com"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 mb-4 outline-none focus:border-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          Request Meeting
        </button>
        <p className="text-[10px] text-gray-500 mt-3">No commitment. We'll respond within one business day.</p>
      </motion.form>
    </section>
  )
}

export default CTASection