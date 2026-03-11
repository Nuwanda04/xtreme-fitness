import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const useItemsPerPage = () => {
  const [items, setItems] = useState(window.innerWidth >= 768 ? 3 : 1);
  useEffect(() => {
    const handler = () => setItems(window.innerWidth >= 768 ? 3 : 1);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return items;
};

const ExercisesSection = () => {
  const [exercises, setExercises] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const ITEMS_PER_PAGE = useItemsPerPage();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:3042/exercises/");
        const json = await response.json();
        if (json.data) setExercises(json.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? Math.max(exercises.length - ITEMS_PER_PAGE, 0) : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev >= exercises.length - ITEMS_PER_PAGE ? 0 : prev + 1));
  };

  const visibleExercises = exercises.slice(slideIndex, slideIndex + ITEMS_PER_PAGE);

  return (
    <section className="py-24 bg-white text-center">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-lg md:text-2xl mb-2 uppercase">DETTE TILBYDER VI</h4>
        <h2 className="font-teko text-3xl md:text-5xl font-bold uppercase text-xfitgray mb-10 md:mb-16">
          VI TILBYDER EKSKLUSIVE &#216;VELSER
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleExercises.map((exercise) => (
             <div key={exercise._id} className="bg-white border border-gray-100 rounded-[20px] px-8 py-12 shadow-[0_4px_30px_rgba(0,0,0,0.06)] flex flex-col items-center text-center">
               <div className="w-28 h-28 mb-8 flex items-center justify-center">
                 <img
                   src={exercise.image}
                   alt={exercise.title}
                   className="w-full h-full object-contain"
                   onError={(e) => { e.target.src = '/icons/no-image.png' }}
                 />
               </div>
               <h3 className="font-teko text-[28px] font-bold text-xfitgray uppercase mb-4 leading-none">{exercise.title}</h3>
               <p className="font-ubuntu text-[#7a7a7a] text-[14px] leading-relaxed">
                 {exercise.teaser}
               </p>
             </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-14">
          <button
            onClick={handlePrev}
            className="w-14 h-14 rounded-full bg-xfitgray text-white flex items-center justify-center hover:bg-xfitorange transition-colors text-lg"
          >
           <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full bg-xfitgray text-white flex items-center justify-center hover:bg-xfitorange transition-colors text-lg"
          >
           <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExercisesSection;
