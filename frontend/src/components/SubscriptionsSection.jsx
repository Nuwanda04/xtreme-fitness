import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiUrl, resolveApiAssetUrl } from "../services/api";

const SubscriptionsSection = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(apiUrl("subscriptions/"));
        const json = await response.json();
        if (json.data) setSubscriptions(json.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <section className="py-24 bg-white text-center">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-lg md:text-xl mb-2 uppercase">
          PRISER
        </h4>
        <h2 className="font-teko text-3xl md:text-5xl font-bold uppercase text-xfitgray mb-10 md:mb-16">
          VORES ABONNEMENTER
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptions.map((sub) => (
            <div key={sub._id} className="text-center">
              <div className="relative mb-10">
                <div className="h-[260px] overflow-hidden rounded-lg">
                  <img
                    src={resolveApiAssetUrl(sub.image)}
                    alt={sub.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/about_us2.png";
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[100px] h-[100px] bg-xfitorange rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                  <span className="font-teko text-[24px] font-bold leading-none">
                    {sub.price} DKK
                  </span>
                  <span className="font-ubuntu text-[11px] opacity-80">
                    Mdr
                  </span>
                </div>
              </div>
              <h3 className="font-teko text-3xl font-bold text-xfitgray uppercase mb-6 leading-none">
                {sub.title}
              </h3>
              <ul className="space-y-3 mb-8 inline-block text-left">
                {sub.list?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 font-ubuntu text-[13px] text-[#555]"
                  >
                    <span className="text-xfitorange mt-0.5">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <Link
                  to="/priser"
                  className="inline-flex items-center gap-3 bg-[#e56b46] hover:bg-[#d45a35] text-white font-ubuntu font-bold text-sm tracking-wide px-1 py-1 pl-6 rounded-[40px] transition-all group"
                >
                  Tilmeld dig nu
                  <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FaPlay className="text-[#e56b46] w-2.5 h-2.5 ml-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionsSection;
