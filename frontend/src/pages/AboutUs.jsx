import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import BlogSection from "../components/BlogSection";
import ContactSection from "../components/ContactSection";

const AboutUs = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[34vh] min-h-[220px] md:h-[50vh] md:min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/headers/aboutHeader.png"
            alt="Om Os"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center text-white pt-10 md:pt-12">
          <h1 className="font-teko text-[56px] md:text-[140px] font-bold uppercase tracking-[0.04em] leading-none">
            OM OS
          </h1>
        </div>
      </section>

      {/* 2. Velkommen til Xtreme Fitness */}
      <section className="py-14 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left: Image */}
            <div className="flex justify-center">
              <img
                src="/images/about_us2.png"
                alt="Personal Trainer"
                className="w-full max-w-[450px] object-cover drop-shadow-2xl"
              />
            </div>
            {/* Right: Text content */}
            <div className="lg:pl-8 text-center lg:text-left">
              <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-[14px] md:text-xl mb-2 uppercase">
                OM OS
              </h4>
              <h2 className="font-teko text-[52px] md:text-7xl font-bold uppercase text-xfitgray mb-5 leading-[0.9]">
                VELKOMMEN TIL
                <br />
                XTREME FITNESS
              </h2>
              <p className="font-ubuntu text-[#7a7a7a] text-[16px] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Xtreme Fitness er stedet, hvor sved, grin og god musik går hånd
                i hånd. Vi lover ikke mirakler - men vi lover, at du bliver
                stærkere, gladere og får ondt i muskler, du ikke vidste, du
                havde!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats + Video Section */}
      <section className="relative text-white text-center py-14 md:pt-20 md:pb-20 bg-gradient-to-b from-[#ef3b42] to-[#eb6a45] md:bg-none">
        <div
          className="hidden md:block absolute top-0 left-0 w-full h-[55%] z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/headers/section_background.png')" }}
        ></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-full h-[45%] bg-white z-0"></div>

        <div className="container mx-auto px-6 max-w-[1100px] relative z-10">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 md:mb-12">
            <div>
              <div className="font-teko text-[54px] md:text-[60px] font-bold leading-none mb-1">
                600+
              </div>
              <div className="font-teko text-lg md:text-xl uppercase tracking-wider font-bold">
                WORKING HOURS
              </div>
            </div>
            <div>
              <div className="font-teko text-[54px] md:text-[60px] font-bold leading-none mb-1">
                790+
              </div>
              <div className="font-teko text-lg md:text-xl uppercase tracking-wider font-bold">
                SUCCESS PROGRAM
              </div>
            </div>
            <div>
              <div className="font-teko text-[54px] md:text-[60px] font-bold leading-none mb-1">
                2560+
              </div>
              <div className="font-teko text-lg md:text-xl uppercase tracking-wider font-bold">
                HAPPY CLIENTS
              </div>
            </div>
            <div>
              <div className="font-teko text-[54px] md:text-[60px] font-bold leading-none mb-1">
                830+
              </div>
              <div className="font-teko text-lg md:text-xl uppercase tracking-wider font-bold">
                PERFECT BODIES
              </div>
            </div>
          </div>

          {/* Video player */}
          <div className="relative max-w-[850px] mx-auto overflow-hidden shadow-2xl">
            {!isPlaying && (
              <>
                <img
                  src="/video/video_img.jpg"
                  alt="Video thumbnail"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src = "/images/about_us2.png";
                  }}
                />
                <button
                  onClick={handlePlayVideo}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <FaPlay className="text-xfitorange w-4 h-4 md:w-6 md:h-6 ml-1" />
                  </div>
                </button>
              </>
            )}
            <video
              ref={videoRef}
              className={`w-full h-auto ${isPlaying ? "block" : "hidden"}`}
              controls
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/video/aboutVideo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* 4. Contact Section (shared component) */}
      <ContactSection />

      {/* 5. Blog Section (shared component) */}
      <BlogSection />
    </div>
  );
};

export default AboutUs;
