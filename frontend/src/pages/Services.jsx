import BlogSection from "../components/BlogSection";
import ExercisesSection from "../components/ExercisesSection";
import ReviewsSection from "../components/ReviewsSection";
import ServicesSection from "../components/ServicesSection";

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[34vh] min-h-[220px] md:h-[40vh] md:min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/headers/servicesHeader.png"
            alt="Services Header"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center text-white pt-10 md:pt-12">
          <h1 className="font-teko text-[56px] md:text-[140px] font-bold uppercase tracking-[0.04em] leading-none">
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
