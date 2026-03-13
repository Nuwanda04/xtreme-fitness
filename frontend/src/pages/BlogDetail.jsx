import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl, resolveApiAssetUrl } from "../services/api";

const formatCreatedAt = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(apiUrl(`blog/${id}`));
        const json = await response.json();

        if (
          !response.ok ||
          json.status === "error" ||
          json.status === "not_found"
        ) {
          throw new Error(json.message || "Kunne ikke hente blogindlaeg");
        }

        setBlog(json.data || null);
      } catch (err) {
        setError(err.message || "Der opstod en fejl");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const contentParagraphs = useMemo(() => {
    const text = blog?.content || blog?.teaser || "";
    return text
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [blog]);

  const title = blog?.title || "BLOGINDLAEG";

  return (
    <div className="bg-[#efefef] min-h-screen">
      <section className="bg-[#2f2f31] text-white pt-32 pb-24 md:pb-28">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h1 className="font-teko text-[62px] md:text-[120px] leading-[0.9] uppercase tracking-[0.03em] text-center mx-auto max-w-[1100px]">
            {title}
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 max-w-[900px]">
          {isLoading && (
            <p className="font-ubuntu text-[#6a6a6a] text-lg">
              Henter blogindlaeg...
            </p>
          )}

          {!isLoading && error && (
            <p className="font-ubuntu text-red-600 text-lg">{error}</p>
          )}

          {!isLoading && !error && blog && (
            <article>
              <div className="mb-8">
                <img
                  src={resolveApiAssetUrl(blog.image)}
                  alt={blog.title}
                  className="w-full max-w-[620px] mx-auto object-cover"
                  onError={(e) => {
                    e.target.src = "/icons/no-image.png";
                  }}
                />
              </div>

              <h2 className="font-teko text-[44px] md:text-[56px] leading-[0.95] uppercase text-[#111] text-center mb-8 max-w-[760px] mx-auto">
                {blog.title}
              </h2>

              <div className="font-ubuntu text-[#7b7b7b] text-[15px] md:text-[18px] leading-[1.8] space-y-6 max-w-[760px] mx-auto">
                {contentParagraphs.length > 0 ? (
                  contentParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>Indhold ikke tilgaengeligt.</p>
                )}
              </div>

              <div className="max-w-[760px] mx-auto mt-10 text-[#666] font-ubuntu text-[14px] italic space-y-1">
                {blog.author && <p>Forfatter: {blog.author}</p>}
                {blog.createdAt && (
                  <p>Oprettet: {formatCreatedAt(blog.createdAt)}</p>
                )}
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
