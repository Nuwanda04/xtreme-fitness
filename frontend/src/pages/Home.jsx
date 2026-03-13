import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import BlogSection from "../components/BlogSection";
import ContactSection from "../components/ContactSection";
import ExercisesSection from "../components/ExercisesSection";
import HomeAboutSection from "../components/HomeAboutSection";
import ReviewsSection from "../components/ReviewsSection";
import ServicesSection from "../components/ServicesSection";
import SubscriptionsSection from "../components/SubscriptionsSection";
import { apiUrl, resolveApiAssetUrl } from "../services/api";

const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(apiUrl("employees/"));
        const json = await response.json();
        if (json.data) setEmployees(json.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[52vh] min-h-[320px] md:h-screen md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/headers/mainHeader.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center md:text-left text-white px-6 w-full max-w-7xl mx-auto flex flex-col items-center md:items-start mt-16 md:mt-20">
          <div className="flex items-start gap-6 mb-4 md:mb-6 text-white">
            <div className="hidden md:block w-1 h-[126px] md:h-[220px] bg-white mt-1"></div>
            <div>
              <h3 className="font-teko text-[12px] md:text-4xl font-medium uppercase tracking-[0.45em] md:tracking-widest leading-none mb-2">
                XTREME FITNESS
              </h3>
              <h1 className="font-teko text-[56px] md:text-[180px] font-bold uppercase tracking-[0.03em] md:tracking-wider leading-none">
                BLIV <span className="text-white">ST&#198;RK</span>
              </h1>
            </div>
          </div>
          <p className="font-ubuntu text-[13px] md:text-2xl text-white font-medium mb-6 md:mb-12 max-w-[290px] md:max-w-xl text-center md:text-left leading-relaxed">
            Det bedste fitnesscenter &#8212; hvor styrke og sundhed vokser
            sammen.
          </p>
          <div className="flex gap-4">
            <Link
              to="/tjenester"
              className="inline-flex items-center gap-4 md:gap-6 border border-white/30 bg-black/40 backdrop-blur-sm text-white font-ubuntu font-bold tracking-wide px-1.5 md:px-2 py-1.5 md:py-2 pl-6 md:pl-8 rounded-[40px] hover:bg-black/60 transition-all group text-[12px] md:text-base"
            >
              Tilmeld dig nu
              <span className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-[#e37452] to-[#de5d37] rounded-full flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-lg shadow-orange-900/50">
                <FaArrowRight className="rotate-0 text-white w-3 h-3 md:w-4 md:h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DETTE TILBYDER VI - Exercise Slider (shared component) */}
      <ExercisesSection />

      <HomeAboutSection />

      {/* 4. VORES TJENESTER (shared component) */}
      <ServicesSection />

      {/* 5. UDTALELSER (shared component) */}
      <ReviewsSection />

      {/* 6. PRISER (shared component) */}
      <SubscriptionsSection />

      {/* 7. TR&#198;NERE (API-driven employees) */}
      <section
        className="text-white text-center py-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/headers/section_background.png')" }}
      >
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h4 className="font-teko text-white font-bold tracking-[0.3em] text-lg md:text-xl mb-2 uppercase">
            TR&#198;NERE
          </h4>
          <h2 className="font-teko text-3xl md:text-5xl font-bold uppercase mb-10 md:mb-16">
            VORES HOLD AF EKSPERTER
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {employees.slice(0, 3).map((emp) => (
              <div key={emp._id} className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/30 mb-8 shadow-lg">
                  <img
                    src={resolveApiAssetUrl(emp.image)}
                    alt={emp.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/about_us.png";
                    }}
                  />
                </div>
                <h3 className="font-teko text-2xl uppercase tracking-wider font-bold mb-1">
                  {emp.name}
                </h3>
                <p className="font-ubuntu text-white/80 text-sm mb-6">
                  {emp.area}
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#e56b46] transition-colors"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#e56b46] transition-colors"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#e56b46] transition-colors"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. KONTAKT OS (shared component) */}
      <ContactSection />

      {/* 9. BLOG / NYHEDER (shared component) */}
      <BlogSection />
    </div>
  );
};

export default Home;
