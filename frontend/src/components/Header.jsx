import { useState } from "react";
import { Menu, X } from "lucide-react";
import AeroxLogo from "../assets/AeroxLogo.jpg";
import ploutonLogo from "../assets/ploutonLogo.png";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 bg-[#0a0e1f] border-b border-white/5 text-white z-50">
      {/* Logo */}
    <div className="flex items-center gap-3">
  <div className="flex flex-col items-center">
    <img src={AeroxLogo} alt="Aerox ERP" className="h-6 md:h-9" />
    <span className="text-[10px] text-gray-400 mt-1">Aerox ERP</span>
  </div>
  <span className="text-gray-500">×</span>
  <div className="flex flex-col items-center">
    <img src={ploutonLogo} alt="Plouton AI" className="h-6 md:h-9" />
    <span className="text-[10px] text-gray-400 mt-1">Plouton AI</span>
  </div>
</div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-10 text-sm text-gray-300">
        <a
          href="#problems"
          className="hover:text-white transition-colors"
        >
          Problems
        </a>

        <a
          href="#solutions"
          className="hover:text-white transition-colors"
        >
          Solutions
        </a>

        <a
          href="#control-center"
          className="hover:text-white transition-colors"
        >
          Control Center
        </a>

        <a
          href="#impact"
          className="hover:text-white transition-colors"
        >
          Impact
        </a>
      </nav>

      {/* Desktop Button */}
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=aeroxerp@gmail.com&su=Lets%20Discuss%20-%20Plouton%20AI%20Proposal"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
      >
        Lets Discuss
      </a>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden"
        aria-label="Toggle Menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#0a0e1f] border-b border-white/10 flex flex-col gap-4 px-6 py-6 md:hidden shadow-xl">
          <a
            href="#problems"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Problems
          </a>

          <a
            href="#solutions"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Solutions
          </a>

          <a
            href="#control-center"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Control Center
          </a>

          <a
            href="#impact"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Impact
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=aeroxerp@gmail.com&su=Lets%20Discuss%20-%20Plouton%20AI%20Proposal"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg text-center transition-colors"
          >
            Lets Discuss
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;