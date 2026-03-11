import { FaPlay } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section
      className="py-24 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/contact_us.jpg')" }}
    >
      <div className="container mx-auto px-6 max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Empty column to let background image show */}
        <div className="hidden lg:block"></div>

        {/* Right: Form */}
        <div>
          <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-lg md:text-xl mb-2 uppercase">KONTAKT OS</h4>
          <h2 className="font-teko text-3xl md:text-5xl font-bold uppercase mb-8 md:mb-10 leading-[0.95]">
            SEND OS EN BESKED OG VI SVARER HURTIGST MULIGT
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Navn" className="bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange" />
              <input type="text" placeholder="Telefon" className="bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" placeholder="Email" className="bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange" />
              <input type="text" placeholder="Emne" className="bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange" />
            </div>
            <textarea rows="5" placeholder="Besked" className="w-full bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-xfitorange resize-none"></textarea>
            <div className="text-center pt-2">
              <button type="submit" className="inline-flex items-center gap-3 bg-[#e56b46] hover:bg-[#d45a35] text-white font-ubuntu font-bold text-sm tracking-wide px-1 py-1 pl-6 rounded-[40px] transition-all group border-none">
                Send
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FaPlay className="text-[#e56b46] w-2.5 h-2.5 ml-0.5"/>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
