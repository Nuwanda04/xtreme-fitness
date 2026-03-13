import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden pt-10 md:pt-12">
      <img
        src="/icons/footer_left_icon.png"
        alt=""
        className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 w-[230px] opacity-55 mix-blend-screen brightness-125 contrast-125 drop-shadow-[0_0_14px_rgba(255,255,255,0.22)] pointer-events-none"
      />
      <img
        src="/icons/footer_right_icon.png"
        alt=""
        className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-[230px] opacity-55 mix-blend-screen brightness-125 contrast-125 drop-shadow-[0_0_14px_rgba(255,255,255,0.22)] pointer-events-none"
      />

      <div className="container mx-auto px-6 max-w-[1160px] grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-10 md:gap-14 pb-12">
        <div className="text-center md:text-left">
          <Link
            to="/"
            className="inline-flex flex-col items-center md:items-start"
          >
            <img
              src="/icons/logo.png"
              alt="Xtreme Fitness"
              className="w-[162px] h-auto mb-2 object-contain"
            />
          </Link>
          <p className="font-ubuntu text-[#8e8e8e] text-[13px] leading-[1.35] mb-5 max-w-[200px] mx-auto md:mx-0">
            Hos os handler træning om glæde, kvalitet og resultater
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-[#3b3b3b] flex items-center justify-center text-white hover:bg-[#525252] transition-colors"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-[#3b3b3b] flex items-center justify-center text-white hover:bg-[#525252] transition-colors"
            >
              <FaTwitter size={16} />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-[#3b3b3b] flex items-center justify-center text-white hover:bg-[#525252] transition-colors"
            >
              <FaYoutube size={16} />
            </a>
          </div>
        </div>

        <div className="hidden md:block text-center md:text-left">
          <h3 className="font-teko text-[42px] uppercase leading-none mb-5 whitespace-nowrap">
            ÅBNINGSTIDER
          </h3>
          <div className="font-ubuntu text-[14px] leading-7 text-[#8f8f8f] space-y-1">
            <div className="mb-1">
              <div className="text-white">Mandag - fredag</div>
              <div>12.00 - 14.00</div>
            </div>
            <div className="mb-1">
              <div className="text-white">Lørdag</div>
              <div>17.30 - 00.00</div>
            </div>
            <div>
              <div className="text-white">Søndag</div>
              <div>17.30 - 00.00</div>
            </div>
          </div>
        </div>

        <div className="hidden md:block text-center md:text-left">
          <h3 className="font-teko text-[42px] uppercase leading-none mb-5">
            HURTIGE
            <br />
            LINKS
          </h3>
          <ul className="font-ubuntu text-[14px] text-[#8f8f8f] space-y-2">
            <li>
              <Link
                to="/om-os"
                className="inline-flex items-center gap-3 hover:text-white transition-colors"
              >
                <span className="text-white text-[10px]">▶</span>Om
              </Link>
            </li>
            <li>
              <Link
                to="/tjenester"
                className="inline-flex items-center gap-3 hover:text-white transition-colors"
              >
                <span className="text-white text-[10px]">▶</span>Tjenester
              </Link>
            </li>
            <li>
              <Link
                to="/traenere"
                className="inline-flex items-center gap-3 hover:text-white transition-colors"
              >
                <span className="text-white text-[10px]">▶</span>Trænere
              </Link>
            </li>
            <li>
              <Link
                to="/priser"
                className="inline-flex items-center gap-3 hover:text-white transition-colors"
              >
                <span className="text-white text-[10px]">▶</span>Priser
              </Link>
            </li>
            <li>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-3 hover:text-white transition-colors"
              >
                <span className="text-white text-[10px]">▶</span>Kontakt
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-teko text-[42px] uppercase leading-none mb-5">
            KONTAKT
            <br />
            OS
          </h3>
          <div className="font-ubuntu text-[14px] leading-7 text-[#8f8f8f] space-y-1">
            <div className="mb-1">
              <div className="text-white">Adresse:</div>
              <div>Nørregade 42, 9000 Aalborg</div>
            </div>
            <div className="mb-1">
              <div className="text-white">Email:</div>
              <div>info@xtremefitness.dk</div>
            </div>
            <div>
              <div className="text-white">Telefon:</div>
              <div>+ 45 99751642</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2b2b2b] py-7">
        <p className="font-ubuntu text-center text-[12px] text-[#777] tracking-[0.01em]">
          Copyright {new Date().getFullYear()} xtremefitness.dk - All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
