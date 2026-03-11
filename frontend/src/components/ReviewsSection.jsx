import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3042/reviews/");
        const json = await response.json();
        if (json.data) setReviews(json.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewPrev = () => {
    setReviewIndex((prev) => (prev === 0 ? Math.max(reviews.length - 1, 0) : prev - 1));
  };

  const handleReviewNext = () => {
    setReviewIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[reviewIndex];

  return (
    <section className="relative py-16 md:py-32 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/reviews_background.jpg" alt="Reviews Background" className="w-full h-full object-cover opacity-20" />
      </div>
      <div className="relative z-10 container mx-auto px-6 max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="lg:pr-12">
            <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-lg md:text-xl mb-2 uppercase">UDTALELSER</h4>
            <h2 className="font-teko text-4xl md:text-7xl font-bold uppercase mb-8 md:mb-12 leading-[0.9]">
              DET SIGER VORES<br/>KUNDER OM OS
            </h2>
            {currentReview && (
              <>
                <div className="relative pl-12 mb-10">
                  <span className="absolute top-0 left-0 text-6xl text-xfitorange font-teko leading-none">&#8220;</span>
                  <p className="font-ubuntu text-[16px] text-gray-300 leading-relaxed italic">
                    {currentReview.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 mb-12 pl-12 border-l-2 border-white/20">
                   <div>
                     <div className="font-teko text-2xl uppercase tracking-wider font-bold text-white leading-none mb-1">{currentReview.author}</div>
                     <div className="font-ubuntu text-xs text-gray-500 uppercase tracking-wider">{currentReview.position}</div>
                   </div>
                </div>
              </>
            )}
            <div className="flex gap-4 pl-12">
              <button onClick={handleReviewPrev} className="w-12 h-12 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors text-lg">
                <FaChevronLeft />
              </button>
              <button onClick={handleReviewNext} className="w-12 h-12 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors text-lg">
                <FaChevronRight />
              </button>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute w-[450px] h-[450px] border-[40px] border-xfitorange rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 hidden md:block"></div>
            <img src="/images/reviews.png" alt="Happy Customer" className="relative z-10 w-full max-w-[500px] object-contain drop-shadow-2xl" />
          </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
