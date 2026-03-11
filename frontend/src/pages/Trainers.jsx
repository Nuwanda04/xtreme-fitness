import BlogSection from "../components/BlogSection";
import ContactSection from "../components/ContactSection";
import TrainersSection from "../components/TrainersSection";

const Trainers = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/headers/employeesHeader.jpg"
            alt="Trainers Header"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="font-teko text-[70px] md:text-[140px] font-bold uppercase tracking-wider leading-none">
            TR&#198;NERE
          </h1>
        </div>
      </section>

      {/* 2. Trainers Grid */}
      <TrainersSection />

      {/* 3. Contact */}
      <ContactSection />

      {/* 4. Blog */}
      <BlogSection />
    </div>
  );
};

export default Trainers;
