import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeAboutSection = () => {
  return (
    <section
      className="relative py-14 md:py-24 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/about_us_background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 container mx-auto px-6 max-w-[860px] text-center">
        <div className="flex justify-center mb-6 md:mb-8 md:hidden">
          <img
            src="/images/about_us2.png"
            alt="Om os"
            className="w-full max-w-[310px] md:max-w-[460px] object-contain"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-[13px] md:text-xl mb-2 uppercase">
          OM OS
        </h4>
        <h2 className="font-teko text-[46px] md:text-7xl font-bold uppercase mb-5 md:mb-6 leading-[0.95]">
          VELKOMMEN TIL XTREME
          <br />
          FITNESS
        </h2>

        <p className="font-ubuntu text-[#e3e3e3] mb-8 md:mb-12 text-[15px] md:text-[17px] leading-relaxed max-w-[620px] mx-auto">
          Xtreme Fitness er stedet, hvor sved, grin og god musik g&#229;r h&#229;nd
          i h&#229;nd. Vi lover ikke mirakler - men vi lover, at du bliver
          st&#230;rkere, gladere og f&#229;r ondt i muskler, du ikke vidste, du
          havde!
        </p>

        <div className="grid grid-cols-2 gap-x-5 gap-y-6 mb-8 md:mb-12">
          <div>
            <div className="font-teko text-[44px] md:text-[60px] text-xfitorange font-bold leading-none mb-1">
              600K+
            </div>
            <div className="font-teko text-[24px] md:text-2xl uppercase tracking-[0.03em] font-bold text-white leading-none">
              ARBEJDSTIMER
            </div>
          </div>
          <div>
            <div className="font-teko text-[44px] md:text-[60px] text-xfitorange font-bold leading-none mb-1">
              790+
            </div>
            <div className="font-teko text-[24px] md:text-2xl uppercase tracking-[0.03em] font-bold text-white leading-none">
              PROGRAMMER
            </div>
          </div>
          <div>
            <div className="font-teko text-[44px] md:text-[60px] text-xfitorange font-bold leading-none mb-1">
              2560+
            </div>
            <div className="font-teko text-[24px] md:text-2xl uppercase tracking-[0.03em] font-bold text-white leading-none">
              GLADE KUNDER
            </div>
          </div>
          <div>
            <div className="font-teko text-[44px] md:text-[60px] text-xfitorange font-bold leading-none mb-1">
              2560+
            </div>
            <div className="font-teko text-[24px] md:text-2xl uppercase tracking-[0.03em] font-bold text-white leading-none">
              SUNDERE KROPPE
            </div>
          </div>
        </div>

        <Link
          to="/om-os"
          className="inline-flex items-center gap-3 bg-black/45 border border-white/60 hover:bg-black/65 text-white font-ubuntu font-bold text-sm tracking-wide px-1 py-1 pl-7 rounded-[40px] transition-all group"
        >
          L&#230;s mere
          <span className="w-9 h-9 bg-gradient-to-r from-[#ef3b42] to-[#f08a42] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
            <FaPlay className="text-white w-2.5 h-2.5 ml-0.5" />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default HomeAboutSection;