import BlogSection from "../components/BlogSection";
import ExercisesSection from "../components/ExercisesSection";
import ReviewsSection from "../components/ReviewsSection";
import ServicesSection from "../components/ServicesSection";

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/headers/servicesHeader.png"
            alt="Services Header"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="font-teko text-[70px] md:text-[140px] font-bold uppercase tracking-wider leading-none">
            TJENESTER
          </h1>
        </div>
      </section>

      {/* 2. Exercises Slider */}
      <ExercisesSection />

      {/* 3. Services Grid */}
      <ServicesSection />

      {/* 4. Reviews */}
      <ReviewsSection />

      {/* 5. Blog */}
      <BlogSection />
    </div>
  );
};

export default Services;
