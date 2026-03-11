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
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/headers/aboutHeader.png"
            alt="Om Os"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="font-teko text-[70px] md:text-[140px] font-bold uppercase tracking-wider leading-none">
            OM OS
          </h1>
        </div>
      </section>

      {/* 2. Velkommen til Xtreme Fitness */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="flex justify-center">
              <img
                src="/images/about_us2.png"
                alt="Personal Trainer"
                className="w-full max-w-[450px] object-cover drop-shadow-2xl"
              />
            </div>
            {/* Right: Text content */}
            <div className="lg:pl-8">
              <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-lg md:text-xl mb-2 uppercase">OM OS</h4>
              <h2 className="font-teko text-4xl md:text-7xl font-bold uppercase text-xfitgray mb-6 leading-[0.9]">
                VELKOMMEN TIL<br/>XTREME FITNESS
              </h2>
              <p className="font-ubuntu text-[#7a7a7a] text-[16px] leading-relaxed max-w-lg">
                Xtreme Fitness er stedet, hvor sved, grin og god musik går hånd i hånd. Vi lover ikke mirakler - men vi lover, at du bliver stærkere, gladere og får ondt i muskler, du ikke vidste, du havde!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats + Video Section */}
      <section className="relative text-white text-center pt-20 pb-20">
        {/* Half orange, half white background */}
        <div className="absolute top-0 left-0 w-full h-[55%] bg-gradient-to-b from-[#e86c4a] to-[#d44e2e] z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-[45%] bg-white z-0"></div>

        <div className="container mx-auto px-6 max-w-[1100px] relative z-10">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="font-teko text-[50px] md:text-[60px] font-bold leading-none mb-1">600+</div>
              <div className="font-teko text-lg md:text-xl uppercase tracking-wider font-bold">ARBEJDSTIMER</div>
            </div>
            <div>
              <div className="font-teko text-[50px] md:text-[60px] font-bold leading-none mb-1">790+</div>
              <div className="font-teko text-lg md:text-xl uppercase tracking-wider font-bold">PROGRAMMER</div>
            </div>
            <div>
              <div className="font-teko text-[50px] md:text-[60px] font-bold leading-none mb-1">2560+</div>
              <div className="font-teko text-lg md:text-xl uppercase tracking-wider font-bold">GLADE KUNDER</div>
            </div>
            <div>
              <div className="font-teko text-[50px] md:text-[60px] font-bold leading-none mb-1">2560+</div>
              <div className="font-teko text-lg md:text-xl uppercase tracking-wider font-bold">SUNDERE KROPPE</div>
            </div>
          </div>

          {/* Video player */}
          <div className="relative max-w-[850px] mx-auto rounded-lg overflow-hidden shadow-2xl">
            {!isPlaying && (
              <>
                <img
                  src="/video/video_img.jpg"
                  alt="Video thumbnail"
                  className="w-full h-auto object-cover"
                  onError={(e) => { e.target.src = '/images/about_us2.png'; }}
                />
                <button
                  onClick={handlePlayVideo}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <FaPlay className="text-xfitorange w-6 h-6 ml-1" />
                  </div>
                </button>
              </>
            )}
            <video
              ref={videoRef}
              className={`w-full h-auto ${isPlaying ? 'block' : 'hidden'}`}
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
