import BlogSection from "../components/BlogSection";
import ReviewsSection from "../components/ReviewsSection";
import SubscriptionsSection from "../components/SubscriptionsSection";

const Priser = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/headers/subscriptionsHeader.png"
            alt="Priser Header"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="font-teko text-[70px] md:text-[140px] font-bold uppercase tracking-wider leading-none">
            PRISER
          </h1>
        </div>
      </section>

      <SubscriptionsSection />
      <ReviewsSection />
      <BlogSection />
    </div>
  );
};

export default Priser;
