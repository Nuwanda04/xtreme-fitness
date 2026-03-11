import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const formatBlogDate = (dateStr) => {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  return { day, month: months[d.getMonth()] };
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3042/blogs/");
        const json = await response.json();
        if (json.data) setBlogs(json.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-24 bg-white text-center">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <h4 className="font-teko text-xfitorange font-bold tracking-[0.3em] text-lg md:text-xl mb-2 uppercase">VORES NYHEDER</h4>
        <h2 className="font-teko text-3xl md:text-5xl font-bold uppercase text-xfitgray mb-10 md:mb-16">
          SENESTE BLOGINDLÆG
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
                  Læs mere
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
