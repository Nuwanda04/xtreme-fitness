import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiUrl, resolveApiAssetUrl } from "../services/api";

const ServicesSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(apiUrl("services/"));
        const json = await response.json();
        if (json.data) setServices(json.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <section className="text-white text-center pt-24 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[260px] md:h-[320px] bg-[#ef5f44]" />
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h4 className="relative z-10 font-teko text-white font-bold tracking-[0.3em] text-lg md:text-xl mb-2 uppercase">
            VORES TJENESTER
          </h4>
          <h2 className="relative z-10 font-teko text-3xl md:text-6xl font-bold uppercase mb-10 md:mb-16 leading-[1.1] max-w-3xl mx-auto">
            L&#216;SNINGER TIL AT BEV&#198;GE SIG BEDRE
            <br />
            OG F&#216;LE SIG SUNDERE
          </h2>
          <div className="mt-10 md:mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="relative h-[420px] md:h-[500px] overflow-hidden group"
                >
                  <img
                    src={resolveApiAssetUrl(service.image)}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/about_us2.png";
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 pb-8 bg-gradient-to-t from-black/75 via-black/35 to-transparent text-left">
                    <div className="w-10 h-10 mb-3">
                      <img
                        src={resolveApiAssetUrl(service.icon)}
                        alt={`${service.title} icon`}
                        className="w-full h-full object-contain brightness-0 invert"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <h3 className="font-teko text-2xl font-bold text-white uppercase mb-2 leading-none">
                      {service.title}
                    </h3>
                    <p className="font-ubuntu text-[13px] text-gray-300 leading-relaxed">
                      {service.teaser}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white h-20 md:h-40 w-full"></div>

      <div className="bg-white text-center pb-24">
        <Link
          to="/priser"
          className="inline-flex items-center gap-4 bg-[#e56b46] hover:bg-[#d45a35] text-white font-ubuntu font-bold tracking-wide px-1 py-1 pl-8 rounded-[40px] transition-all group"
        >
          Tilmeld dig nu
          <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            <FaPlay className="text-[#e56b46] w-3 h-3 ml-0.5" />
          </span>
        </Link>
      </div>
    </>
  );
};

export default ServicesSection;
