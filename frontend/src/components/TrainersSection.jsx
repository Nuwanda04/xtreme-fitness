import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const TrainersSection = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3042/employees/");
        const json = await response.json();
        if (json.data) setEmployees(json.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <section className="py-24 bg-white text-center">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-lg md:text-xl mb-2 uppercase">TR&#198;NERE</h4>
        <h2 className="font-teko text-3xl md:text-5xl font-bold uppercase text-xfitgray mb-10 md:mb-16">
          VORES HOLD AF EKSPERTER
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {employees.map((emp) => (
            <div key={emp._id} className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-8 shadow-lg">
                <img src={emp.image} alt={emp.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/about_us.png' }} />
              </div>
              <h3 className="font-teko text-2xl uppercase tracking-wider font-bold text-xfitgray mb-1">{emp.name}</h3>
              <p className="font-ubuntu text-gray-500 text-sm mb-6">{emp.area}</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e37452] to-[#de5d37] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e37452] to-[#de5d37] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e37452] to-[#de5d37] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <FaInstagram className="w-4 h-4" />
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
