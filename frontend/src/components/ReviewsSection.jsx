import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { apiUrl } from "../services/api";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(apiUrl("reviews/"));
        const json = await response.json();
        if (json.data) setReviews(json.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewPrev = () => {
    setReviewIndex((prev) =>
      prev === 0 ? Math.max(reviews.length - 1, 0) : prev - 1,
    );
  };

  const handleReviewNext = () => {
    setReviewIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[reviewIndex];

  return (
    <section className="relative py-14 md:py-24 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/reviews_background.png"
          alt="Reviews Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 container mx-auto px-6 max-w-[1280px]">
        <div className="w-full max-w-[560px] lg:ml-8 text-center lg:text-left">
          <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-[13px] md:text-xl mb-2 uppercase">
            UDTALELSER
          </h4>
          <h2 className="font-teko text-[46px] md:text-6xl font-bold uppercase mb-7 md:mb-10 leading-[0.9]">
            DET SIGER VORES
            <br />
            KUNDER OM OS
          </h2>
          {currentReview && (
            <>
              <div className="relative pl-8 lg:pl-10 mb-7 md:mb-8 text-left">
                <img
                  src="/icons/testimonials_apostrophy.png"
                  alt="Quote"
                  className="absolute top-[2px] left-0 w-5 h-5 object-contain"
                />
                <p className="font-ubuntu text-[14px] md:text-[16px] text-gray-100 leading-relaxed italic">
                  {currentReview.content}
                </p>
              </div>
              <div className="inline-flex items-center gap-4 mb-8 md:mb-10 pl-4 border-l-2 border-white/60">
                <div>
                  <div className="font-teko text-[32px] md:text-2xl uppercase tracking-wider font-bold text-white leading-none mb-1">
                    {currentReview.author}
                  </div>
                  <div className="font-ubuntu text-xs text-gray-300 uppercase tracking-wider">
                    {currentReview.position}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="flex gap-4 pl-1 justify-center lg:justify-start">
            <button
              onClick={handleReviewPrev}
              className="w-12 h-12 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors text-lg"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleReviewNext}
              className="w-12 h-12 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors text-lg"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <img
              src="/images/reviews.png"
              alt="Athlete"
              className="w-[230px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
