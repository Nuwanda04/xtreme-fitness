import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-white pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Column 1: Logo & Name */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="flex flex-col items-center md:items-start group mb-6">
            <img src="/icons/logo.png" alt="Logo" className="w-16 h-16 object-contain mb-2" onError={(e) => {e.target.style.display='none'}} />
            <div className="flex items-baseline">
              <span className="font-teko tracking-wider text-2xl font-bold leading-none text-white transition-opacity group-hover:opacity-80">XTREME</span>
              <span className="font-teko tracking-wider text-2xl font-bold leading-none text-xfitorange ml-1 transition-opacity group-hover:opacity-80">FITNESS</span>
            </div>
          </Link>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-xfitorange hover:text-white hover:border-xfitorange transition-all duration-300">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-xfitorange hover:text-white hover:border-xfitorange transition-all duration-300">
              <FaYoutube size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-xfitorange hover:text-white hover:border-xfitorange transition-all duration-300">
              <FaTwitter size={16} />
            </a>
          </div>
        </div>

        {/* Column 2: Opening Hours */}
        <div className="text-center md:text-left lg:ml-8">
          <h3 className="font-teko text-2xl uppercase font-bold text-white mb-6">ÅBNINGSTIDER</h3>
          <ul className="font-ubuntu text-sm space-y-3 text-gray-400">
            <li className="flex justify-between md:justify-start md:gap-8 border-b border-gray-800 pb-2">
              <span className="w-20 text-left">Mandag - Fredag</span>
              <span className="text-white">05:30 - 24:00</span>
            </li>
            <li className="flex justify-between md:justify-start md:gap-8 border-b border-gray-800 pb-2">
              <span className="w-20 text-left">Lørdag - Søndag</span>
              <span className="text-white">06:00 - 22:00</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="text-center md:text-left lg:ml-12">
          <h3 className="font-teko text-2xl uppercase font-bold text-white mb-6">INFORMATION</h3>
          <ul className="font-ubuntu text-sm space-y-4 text-gray-400 flex flex-col items-center md:items-start">
            <Link to="/om-os" className="hover:text-xfitorange transition-colors relative group w-max">
              Om os
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-xfitorange transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/tjenester" className="hover:text-xfitorange transition-colors relative group w-max">
              Tjenester
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-xfitorange transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/priser" className="hover:text-xfitorange transition-colors relative group w-max">
              Priser
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-xfitorange transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/kontakt" className="hover:text-xfitorange transition-colors relative group w-max">
              Kontakt
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-xfitorange transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="text-center md:text-left">
          <h3 className="font-teko text-2xl uppercase font-bold text-white mb-6">KONTAKT OS</h3>
          <ul className="font-ubuntu text-sm space-y-4 text-gray-400">
            <li className="flex flex-col md:flex-row md:items-start gap-2 items-center">
              <span className="text-xfitorange mt-1 hidden md:block">📍</span>
              <span className="hover:text-white transition-colors cursor-pointer">
                Nygade 24, st. t.h<br/>8600 Silkeborg
              </span>
            </li>
            <li className="flex flex-col md:flex-row md:items-center gap-2 items-center border-t border-gray-800/50 pt-3">
              <span className="text-xfitorange hidden md:block">📞</span>
              <a href="tel:+4520304050" className="hover:text-white transition-colors">
                +45 20 30 40 50
              </a>
            </li>
            <li className="flex flex-col md:flex-row md:items-center gap-2 items-center border-t border-gray-800/50 pt-3">
              <span className="text-xfitorange hidden md:block">✉️</span>
              <a href="mailto:info@xtremefitness.dk" className="hover:text-white transition-colors">
                info@xtremefitness.dk
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="container mx-auto px-6 max-w-7xl mt-16 pt-8 border-t border-gray-800/80">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-ubuntu">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} XTREME FITNESS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link to="/terms" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
