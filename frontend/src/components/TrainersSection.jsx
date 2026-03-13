import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { apiUrl, resolveApiAssetUrl } from "../services/api";

const TrainersSection = () => {
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
    <section className="py-14 md:py-24 bg-white text-center">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-[14px] md:text-xl mb-2 uppercase">
          TR&#198;NERE
        </h4>
        <h2 className="font-teko text-[44px] md:text-5xl font-bold uppercase text-xfitgray mb-9 md:mb-16 leading-[0.95]">
          VORES HOLD AF EKSPERTER
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16">
          {employees.map((emp) => (
            <div key={emp._id} className="flex flex-col items-center">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 shadow-lg">
                <img
                  src={resolveApiAssetUrl(emp.image)}
                  alt={emp.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/about_us.png";
                  }}
                />
              </div>
              <h3 className="font-teko text-[30px] md:text-2xl uppercase tracking-[0.03em] font-bold text-xfitgray mb-1 leading-none">
                {emp.name}
              </h3>
              <p className="font-ubuntu text-gray-500 text-[13px] mb-5">
                {emp.area}
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-[#e37452] to-[#de5d37] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  <FaFacebookF className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-[#e37452] to-[#de5d37] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  <FaTwitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-[#e37452] to-[#de5d37] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
