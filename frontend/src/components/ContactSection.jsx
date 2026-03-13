import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiUrl } from "../services/api";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

const ContactSection = () => {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Udfyld venligst navn, email og besked.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl("message"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke sende beskeden.");
      }

      toast.success("Tak! Din besked er sendt. Vi vender tilbage hurtigst muligt.");
      setFormData(initialForm);
    } catch (error) {
      toast.error(error.message || "Der opstod en fejl. Proev igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative py-10 md:py-24 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/contact_us_background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/45 md:bg-black/30" aria-hidden="true" />

      <div className="relative container mx-auto px-3 md:px-6 max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Empty column to let background image show */}
        <div className="hidden lg:block"></div>

        {/* Right: Form */}
        <div className="max-w-[560px] w-full mx-auto lg:mx-0 text-center lg:text-left px-2 md:px-0">
          <div className="md:hidden relative h-40 mb-2 flex items-start justify-center overflow-hidden">
            <div className="absolute top-5 w-32 h-32 rounded-full border-[12px] border-[#ef3b42]/95" />
            <img
              src="/images/contact_us.png"
              alt="Kontakt"
              className="relative z-10 h-40 object-contain"
            />
          </div>

          <h4 className="font-teko text-xfitorange font-bold tracking-[0.36em] text-[10px] md:text-xl mb-1 md:mb-2 uppercase">KONTAKT OS</h4>
          <h2 className="font-teko text-[39px] md:text-5xl font-bold uppercase mb-5 md:mb-10 leading-[0.95] max-w-[330px] md:max-w-none mx-auto lg:mx-0">
            SEND OS EN BESKED OG VI SVARER HURTIGST MULIGT
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Navn"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#ececec] text-xfitgray font-ubuntu text-[15px] md:text-base px-5 py-3.5 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange"
              />
              <input
                type="text"
                name="phone"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#ececec] text-xfitgray font-ubuntu text-[15px] md:text-base px-5 py-3.5 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#ececec] text-xfitgray font-ubuntu text-[15px] md:text-base px-5 py-3.5 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange"
              />
              <input
                type="text"
                name="subject"
                placeholder="Emne"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#ececec] text-xfitgray font-ubuntu text-[15px] md:text-base px-5 py-3.5 rounded-full focus:outline-none focus:ring-2 focus:ring-xfitorange"
              />
            </div>
            <textarea
              rows="5"
              name="message"
              placeholder="Besked"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-[#ececec] text-xfitgray font-ubuntu text-[15px] md:text-base px-5 py-4 rounded-[24px] min-h-[118px] md:min-h-[140px] focus:outline-none focus:ring-2 focus:ring-xfitorange resize-none"
            ></textarea>
            <div className="text-center pt-1.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 bg-black/70 border border-white/45 hover:bg-black/80 text-white font-ubuntu font-bold text-sm tracking-wide px-1 py-1 pl-9 rounded-[40px] transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sender..." : "Send"}
                <span className="w-9 h-9 bg-gradient-to-r from-[#ef3b42] to-[#f08a42] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FaPlay className="text-white w-2.5 h-2.5 ml-0.5"/>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
