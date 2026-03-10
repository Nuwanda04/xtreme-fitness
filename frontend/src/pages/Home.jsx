import { useEffect, useState } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaFacebookF, FaInstagram, FaPlay, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [services, setServices] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const ITEMS_PER_PAGE = 3;

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

    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3042/services/");
        const json = await response.json();
        if (json.data) setServices(json.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("http://localhost:3042/subscriptions/");
        const json = await response.json();
        if (json.data) setSubscriptions(json.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3042/reviews/");
        const json = await response.json();
        if (json.data) setReviews(json.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3042/employees/");
        const json = await response.json();
        if (json.data) setEmployees(json.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3042/blogs/");
        const json = await response.json();
        if (json.data) setBlogs(json.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchExercises();
    fetchServices();
    fetchSubscriptions();
    fetchReviews();
    fetchEmployees();
    fetchBlogs();
  }, []);

  // Exercise slider navigation
  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? Math.max(exercises.length - ITEMS_PER_PAGE, 0) : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev >= exercises.length - ITEMS_PER_PAGE ? 0 : prev + 1));
  };

  const visibleExercises = exercises.slice(slideIndex, slideIndex + ITEMS_PER_PAGE);

  // Reviews slider navigation
  const handleReviewPrev = () => {
    setReviewIndex((prev) => (prev === 0 ? Math.max(reviews.length - 1, 0) : prev - 1));
  };

  const handleReviewNext = () => {
    setReviewIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[reviewIndex];

  // Format blog date
  const formatBlogDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    return { day, month: months[d.getMonth()] };
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/headers/mainHeader.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6 w-full max-w-7xl mx-auto flex flex-col items-center md:items-start mt-20">
          <div className="flex items-center gap-6 mb-2 text-white">
            <div className="w-1 h-16 bg-white"></div>
            <h3 className="font-teko text-3xl md:text-4xl font-bold uppercase tracking-widest leading-none">
              XTREME FITNESS
            </h3>
          </div>
          <h1 className="font-teko text-[120px] md:text-[180px] font-bold uppercase tracking-wider leading-none mb-6">
            BLIV <span className="text-white">ST&#198;RK</span>
          </h1>
          <p className="font-ubuntu text-xl md:text-2xl text-white font-medium mb-12 max-w-xl md:text-left text-center leading-relaxed">
            Det bedste fitnesscenter &#8212; hvor styrke og sundhed vokser sammen.
          </p>
          <div className="flex gap-4">
            <Link
              to="/tjenester"
              className="inline-flex items-center gap-6 border border-white/30 bg-black/40 backdrop-blur-sm text-white font-ubuntu font-bold tracking-wide px-2 py-2 pl-8 rounded-[40px] hover:bg-black/60 transition-all group"
            >
              Tilmeld dig nu
              <span className="w-12 h-12 bg-gradient-to-r from-[#e37452] to-[#de5d37] rounded-full flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-lg shadow-orange-900/50">
                <FaArrowRight className="rotate-0 text-white w-4 h-4"/>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DETTE TILBYDER VI - Exercise Slider (API) */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-2xl mb-2 uppercase">DETTE TILBYDER VI</h4>
          <h2 className="font-teko text-5xl font-bold uppercase text-xfitgray mb-16">
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

      {/* 3. OM OS - About Preview */}
      <section className="relative py-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/about_us_background.jpg" alt="About Us Background" className="w-full h-full object-cover opacity-50" onError={(e) => { e.target.src = '/images/about_us.png' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative flex justify-center lg:justify-end">
               <div className="absolute w-[450px] h-[450px] border-[40px] border-xfitorange rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 hidden md:block"></div>
               <img src="/images/about_us.png" alt="Personal Trainer" className="relative z-10 rounded-lg w-full max-w-[500px] object-cover drop-shadow-2xl" />
            </div>
            <div className="lg:pl-8">
              <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-xl mb-2 uppercase">OM OS</h4>
              <h2 className="font-teko text-5xl md:text-7xl font-bold uppercase mb-6 leading-[0.9]">
                VELKOMMEN TIL<br/>XTREME FITNESS
              </h2>
              <p className="font-ubuntu text-gray-300 mb-12 text-[17px] leading-relaxed max-w-lg">
                Xtreme Fitness er stedet, hvor sved, grin og god musik g&#229;r h&#229;nd i h&#229;nd. Vi lover ikke mirakler - men vi lover, at du bliver st&#230;rkere, gladere og f&#229;r ondt i muskler, du ikke vidste, du havde!
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-12">
                <div>
                  <div className="font-teko text-[60px] text-xfitorange font-bold leading-none mb-1">600K+</div>
                  <div className="font-teko text-2xl uppercase tracking-wider font-bold text-white">ARBEJDSTIMER</div>
                </div>
                <div>
                  <div className="font-teko text-[60px] text-xfitorange font-bold leading-none mb-1">790+</div>
                  <div className="font-teko text-2xl uppercase tracking-wider font-bold text-white">PROGRAMMER</div>
                </div>
                <div>
                  <div className="font-teko text-[60px] text-xfitorange font-bold leading-none mb-1">2560+</div>
                  <div className="font-teko text-2xl uppercase tracking-wider font-bold text-white">GLADE KUNDER</div>
                </div>
                <div>
                  <div className="font-teko text-[60px] text-xfitorange font-bold leading-none mb-1">2560+</div>
                  <div className="font-teko text-2xl uppercase tracking-wider font-bold text-white">SUNDERE KROPPE</div>
                </div>
              </div>
              <Link
                to="/om-os"
                className="inline-flex items-center gap-6 border border-white/30 bg-black/40 backdrop-blur-sm text-white font-ubuntu font-bold tracking-wide px-2 py-2 pl-8 rounded-[40px] hover:bg-black/60 transition-all group w-max"
              >
                L&#230;s mere
                <span className="w-12 h-12 bg-gradient-to-r from-[#e37452] to-[#de5d37] rounded-full flex items-center justify-center text-xl group-hover:scale-105 transition-transform shadow-lg shadow-orange-900/50">
                  <FaPlay className="text-white w-3 h-3 ml-0.5"/>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VORES TJENESTER (API-driven services) */}
      <section className="bg-gradient-to-b from-[#e86c4a] to-[#d44e2e] text-white text-center pt-24 pb-8 relative">
        <div className="container mx-auto px-6 max-w-[1100px]">
           <h4 className="font-teko text-white font-bold tracking-[0.3em] text-xl mb-2 uppercase">VORES TJENESTER</h4>
           <h2 className="font-teko text-5xl md:text-6xl font-bold uppercase mb-16 leading-[1.1] max-w-3xl mx-auto">
             L&#216;SNINGER TIL AT BEV&#198;GE SIG BEDRE<br/>OG F&#216;LE SIG SUNDERE
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10 -mb-48">
              {services.map((service) => (
                <div key={service._id} className="relative h-[360px] overflow-hidden group">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/about_us2.png' }} />
                  <div className="absolute inset-x-0 bottom-0 p-6 pb-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-left">
                    <div className="w-10 h-10 mb-3">
                      <img src={service.icon} alt={`${service.title} icon`} className="w-full h-full object-contain brightness-0 invert" onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                    <h3 className="font-teko text-2xl font-bold text-white uppercase mb-2 leading-none">{service.title}</h3>
                    <p className="font-ubuntu text-[13px] text-gray-300 leading-relaxed">{service.teaser}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <div className="bg-white h-64 w-full"></div>

      <div className="bg-white text-center pb-24">
         <Link to="/tjenester" className="inline-flex items-center gap-4 bg-[#e56b46] hover:bg-[#d45a35] text-white font-ubuntu font-bold tracking-wide px-1 py-1 pl-8 rounded-[40px] transition-all group">
            Tilmeld dig nu
            <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              <FaPlay className="text-[#e56b46] w-3 h-3 ml-0.5"/>
            </span>
          </Link>
      </div>

      {/* 5. UDTALELSER (API-driven reviews slider) */}
      <section className="relative py-32 bg-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/reviews_background.jpg" alt="Reviews Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:pr-12">
              <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-xl mb-2 uppercase">UDTALELSER</h4>
              <h2 className="font-teko text-5xl md:text-7xl font-bold uppercase mb-12 leading-[0.9]">
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

      {/* 6. PRISER (API-driven subscriptions) */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-xl mb-2 uppercase">PRISER</h4>
          <h2 className="font-teko text-5xl font-bold uppercase text-xfitgray mb-16">
            VORES ABONNEMENTER
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptions.map((sub) => (
              <div key={sub._id} className="text-center">
                <div className="relative mb-10">
                  <div className="h-[260px] overflow-hidden rounded-lg">
                    <img src={sub.image} alt={sub.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/about_us2.png' }} />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[100px] h-[100px] bg-xfitorange rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                    <span className="font-teko text-[24px] font-bold leading-none">{sub.price} DKK</span>
                    <span className="font-ubuntu text-[11px] opacity-80">Mdr</span>
                  </div>
                </div>
                <h3 className="font-teko text-3xl font-bold text-xfitgray uppercase mb-6 leading-none">{sub.title}</h3>
                <ul className="space-y-3 mb-8 inline-block text-left">
                  {sub.list?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 font-ubuntu text-[13px] text-[#555]">
                      <span className="text-xfitorange mt-0.5">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div>
                  <Link to="/priser" className="inline-flex items-center gap-3 bg-[#e56b46] hover:bg-[#d45a35] text-white font-ubuntu font-bold text-sm tracking-wide px-1 py-1 pl-6 rounded-[40px] transition-all group">
                    Tilmeld dig nu
                    <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FaPlay className="text-[#e56b46] w-2.5 h-2.5 ml-0.5"/>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TR&#198;NERE (API-driven employees) */}
      <section className="bg-gradient-to-b from-[#e86c4a] to-[#d44e2e] text-white text-center py-24">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h4 className="font-teko text-white font-bold tracking-[0.3em] text-xl mb-2 uppercase">TR&#198;NERE</h4>
          <h2 className="font-teko text-5xl font-bold uppercase mb-16">
            VORES HOLD AF EKSPERTER
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {employees.slice(0, 3).map((emp) => (
              <div key={emp._id} className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/30 mb-8 shadow-lg">
                  <img src={emp.image} alt={emp.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/about_us.png' }} />
                </div>
                <h3 className="font-teko text-2xl uppercase tracking-wider font-bold mb-1">{emp.name}</h3>
                <p className="font-ubuntu text-white/80 text-sm mb-6">{emp.area}</p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#e56b46] transition-colors">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#e56b46] transition-colors">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#e56b46] transition-colors">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. KONTAKT OS (Contact Form with image) */}
      <section className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/contact_us_background.jpg" alt="Contact Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with orange circle */}
          <div className="relative flex justify-center">
            <div className="absolute w-[400px] h-[400px] border-[35px] border-xfitorange rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 hidden md:block"></div>
            <img src="/images/contact_us.png" alt="Contact" className="relative z-10 w-full max-w-[450px] object-contain drop-shadow-2xl" />
          </div>
          {/* Right: Form */}
          <div>
            <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-xl mb-2 uppercase">KONTAKT OS</h4>
            <h2 className="font-teko text-4xl md:text-5xl font-bold uppercase mb-10 leading-[0.95]">
              SEND OS EN BESKED OG VI SVARER HURTIGST MULIGT
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Navn" className="bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange" />
                <input type="text" placeholder="Telefon" className="bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" placeholder="Email" className="bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange" />
                <input type="text" placeholder="Emne" className="bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange" />
              </div>
              <textarea rows="5" placeholder="Besked" className="w-full bg-white text-xfitgray font-ubuntu px-6 py-4 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-xfitorange resize-none"></textarea>
              <div className="text-center pt-2">
                <button type="submit" className="inline-flex items-center gap-3 bg-[#e56b46] hover:bg-[#d45a35] text-white font-ubuntu font-bold text-sm tracking-wide px-1 py-1 pl-6 rounded-[40px] transition-all group">
                  Send
                  <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FaPlay className="text-[#e56b46] w-2.5 h-2.5 ml-0.5"/>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 9. BLOG / NYHEDER (API-driven blogs) */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-xl mb-2 uppercase">VORES NYHEDER</h4>
          <h2 className="font-teko text-5xl font-bold uppercase text-xfitgray mb-16">
            SENESTE BLOGINDL&#198;G
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const { day, month } = formatBlogDate(blog.createdAt);
              return (
                <div key={blog._id} className="text-center">
                  <div className="relative mb-8">
                    <div className="h-[260px] overflow-hidden rounded-lg">
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/about_us2.png' }} />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70px] h-[70px] bg-xfitorange rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                      <span className="font-teko text-[24px] font-bold leading-none">{day}</span>
                      <span className="font-ubuntu text-[11px] opacity-80">{month}</span>
                    </div>
                  </div>
                  <h3 className="font-teko text-2xl font-bold text-xfitgray uppercase mb-4 leading-none">{blog.title}</h3>
                  <p className="font-ubuntu text-[13px] text-[#7a7a7a] leading-relaxed mb-6 px-2">
                    {blog.teaser}
                  </p>
                  <Link to={`/blog/${blog._id}`} className="font-ubuntu text-xfitorange font-bold text-sm hover:underline">
                    L&#230;s mere
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#0d0d0d] text-white pt-20 pb-8 relative overflow-hidden">
        {/* Background decorative dumbbells */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
          <img src="/images/dumbbell_left.png" alt="" className="w-48" onError={(e) => { e.target.style.display = 'none' }} />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
          <img src="/images/dumbbell_right.png" alt="" className="w-48" onError={(e) => { e.target.style.display = 'none' }} />
        </div>

        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Logo & Tagline */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/xtreme_fitness_logo.png" alt="Xtreme Fitness" className="w-16 h-16 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
              </div>
              <h3 className="font-teko text-xl font-bold uppercase mb-2">
                XTREME <span className="text-xfitorange">FITNESS</span>
              </h3>
              <p className="font-ubuntu text-[13px] text-gray-400 leading-relaxed mb-6">
                Hos os handler tr&#230;ning om gl&#230;de, kvalitet og resultater
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-xfitorange hover:border-xfitorange hover:text-white transition-colors">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-xfitorange hover:border-xfitorange hover:text-white transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-xfitorange hover:border-xfitorange hover:text-white transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* &#197;bningstider */}
            <div>
              <h3 className="font-teko text-xl font-bold uppercase mb-6">&#197;BNINGSTIDER</h3>
              <div className="space-y-4 font-ubuntu text-sm">
                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Mandag - fredag</span>
                  <span className="text-white font-bold">12.00 - 14.00</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-400">L&#248;rdag</span>
                  <span className="text-white font-bold">17.30 - 00.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">S&#248;ndag</span>
                  <span className="text-white font-bold">17.30 - 00.00</span>
                </div>
              </div>
            </div>

            {/* Hurtige Links */}
            <div>
              <h3 className="font-teko text-xl font-bold uppercase mb-6">HURTIGE LINKS</h3>
              <ul className="space-y-3 font-ubuntu text-sm text-gray-400">
                <li><Link to="/om-os" className="hover:text-xfitorange transition-colors flex items-center gap-2"><span className="text-xfitorange">&#9654;</span> Om</Link></li>
                <li><Link to="/tjenester" className="hover:text-xfitorange transition-colors flex items-center gap-2"><span className="text-xfitorange">&#9654;</span> Tjenester</Link></li>
                <li><Link to="/traenere" className="hover:text-xfitorange transition-colors flex items-center gap-2"><span className="text-xfitorange">&#9654;</span> Tr&#230;nere</Link></li>
                <li><Link to="/priser" className="hover:text-xfitorange transition-colors flex items-center gap-2"><span className="text-xfitorange">&#9654;</span> Priser</Link></li>
                <li><Link to="/kontakt" className="hover:text-xfitorange transition-colors flex items-center gap-2"><span className="text-xfitorange">&#9654;</span> Kontakt</Link></li>
              </ul>
            </div>

            {/* Kontakt Os */}
            <div>
              <h3 className="font-teko text-xl font-bold uppercase mb-6">KONTAKT OS</h3>
              <div className="space-y-4 font-ubuntu text-sm text-gray-400">
                <div>
                  <div className="text-white font-bold mb-1">Adresse:</div>
                  <div>N&#248;rregade 42, 9000 Aalborg</div>
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Email:</div>
                  <div>info@xtremefitness.dk</div>
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Telefon:</div>
                  <div>+ 45 99751642</div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="font-ubuntu text-xs text-gray-500">
              Copyright {new Date().getFullYear()} xtremefitness.dk - All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
