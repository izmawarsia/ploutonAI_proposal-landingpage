import AeroxLogo from "../assets/AeroxLogo.jpg"
import ploutonLogo from "../assets/ploutonLogo.png"
function Footer() {
  return (
    <footer className="px-6 md:px-10 py-14 bg-white border-t border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
        
        {/* Brand */}
        <div>
         <div className="flex items-center gap-3 mb-3">
  <div className="flex flex-col items-center">
    <img src={AeroxLogo} alt="Aerox ERP" className="h-10 md:h-12" />
    <span className="text-[11px] text-slate-500 mt-1">Aerox ERP</span>
  </div>
  <span className="text-slate-300 text-lg">×</span>
  <div className="flex flex-col items-center">
    <img src={ploutonLogo} alt="Plouton AI" className="h-10 md:h-12" />
    <span className="text-[11px] text-slate-500 mt-1">Plouton AI</span>
  </div>
</div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            A custom proposal for strengthening AI-powered finance operations.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-semibold text-slate-800 mb-4 tracking-wide">NAVIGATION</p>
          <div className="flex flex-col gap-3">
            <a href="#problems" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Problems</a>
            <a href="#solutions" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Solutions</a>
            <a href="#control-center" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Control Center</a>
            <a href="#impact" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Impact</a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold text-slate-800 mb-4 tracking-wide">CONTACT</p>
          <div className="flex flex-col gap-3">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aeroxerp@gmail.com&su=Plouton%20AI%20Proposal%20Inquiry"
             target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-blue-600 text-sm transition-colors"
            >
             Aerox ERP Team
</a>
            <span className="text-slate-400 text-sm">Proposal · Partnership</span>
            <span className="text-slate-400 text-sm">Confidential</span>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-100 mt-10 pt-6 max-w-6xl">
        <p className="text-slate-400 text-xs">
          © 2026 Aerox ERP. Confidential proposal prepared for Plouton AI.
        </p>
      </div>
    </footer>
  )
}

export default Footer