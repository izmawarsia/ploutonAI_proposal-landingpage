import { motion } from "framer-motion"
import controlCenterImg from "../assets/central_hub_dashabord.jpeg"

function ControlCenter() {
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
        className="max-w-6xl overflow-hidden rounded-2xl bg-white p-2 md:p-3 shadow-lg border border-slate-200"
      >
        <img
          src={controlCenterImg}
          alt="Aerox AI Central Control Hub Dashboard Preview"
          className="w-full h-auto rounded-xl object-cover"
        />
      </motion.div>
    </section>
  )
}

export default ControlCenter