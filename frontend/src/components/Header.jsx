import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Forside", path: "/" },
  { name: "Tjenester", path: "/tjenester" },
  { name: "Trænere", path: "/traenere" },
  { name: "Priser", path: "/priser" },
  { name: "Om os", path: "/om-os" },
  { name: "Kontakt", path: "/kontakt" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  let authPath = "/login";
  let authLabel = "Log ind";

  try {
    const rawUser = localStorage.getItem("userData");
    if (rawUser) {
      const parsedUser = JSON.parse(rawUser);
      if (parsedUser?.role === "admin") {
        authPath = "/backoffice";
        authLabel = "Backoffice";
      }
    }
  } catch {
    authPath = "/login";
    authLabel = "Log ind";
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-xfitgray/95 backdrop-blur-sm shadow-md py-2"
            : "bg-transparent py-4"
        } text-white`}
      >
        <div className="w-full px-3 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex flex-col items-center">
              <img
                src="/icons/logo.png"
                alt="Xtreme Fitness Logo"
                className="w-[100px] md:w-[132px] h-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-ubuntu text-base tracking-wide uppercase transition-colors hover:text-xfitorange ${
                  location.pathname === item.path
                    ? "text-xfitorange"
                    : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to={authPath}
              className="ml-4 font-ubuntu text-base tracking-wide uppercase text-white hover:text-xfitorange transition-colors"
            >
              {authLabel}
            </Link>
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden text-3xl text-white focus:outline-none"
            onClick={handleDrawerToggle}
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col items-end justify-center pr-12">
          <button
            className="absolute top-8 right-8 text-4xl text-white focus:outline-none"
            onClick={handleDrawerToggle}
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <ul className="flex flex-col items-end gap-6 w-full">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={handleDrawerToggle}
                  className="font-ubuntu text-2xl tracking-wide font-medium text-white hover:text-xfitorange transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={authPath}
                onClick={handleDrawerToggle}
                className="font-ubuntu text-2xl tracking-wide font-medium text-white hover:text-xfitorange transition-colors"
              >
                {authLabel}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
