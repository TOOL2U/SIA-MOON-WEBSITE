import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { FaBars, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import CloudinaryGallery from "~/components/CloudinaryGallery";
import { getCloudinaryUrl } from "~/utils/cloudinary";


export const fonts = {
  elaSans: "/fonts/Ela Sans Regular.ttf",
  arioso: "/fonts/Arioso Regular.ttf"
};
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const logo = getCloudinaryUrl(  "logo-white-vector-3svg_dmz2pf",);


  useEffect(() => {
    // Slight delay to ensure animation is visible
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-10 w-full">
      <div className="container mx-auto px-4 md:px-9 flex justify-between items-center">
        {/* Left positioned hamburger menu */}
        <div className="absolute z-50 top-10 right-[130px]">
          <button
            onClick={toggleDropdown}
            className={`flex flex-col gap-1.5 p-2 focus:outline-none transition-opacity duration-3000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Toggle dropdown menu"
          >
            <span className="w-10 h-[3px] hover:animate-bounce bg-off-white"></span>
            <span className="w-10 h-[3px] hover:animate-bounce bg-off-white"></span>
            <span className="w-10 h-[3px] hover:animate-bounce bg-off-white"></span>
          </button>
        </div>

        {/* Logo with reveal animation */}
        <div className="flex items-center overflow-hidden">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Luxury Estates Logo"
              className={`absolute top-[-3rem] left-[5rem] w-[12rem] h-auto object-contain z-50 transition-opacity duration-3000 ease-in ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </Link>
        </div>

        {/* Navigation links with staggered reveal */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-16 font-berling-nova text-1xl text-custom-black pt-4 z-50">
          <NavLink to="/" delay={3} loaded={loaded}>HOME</NavLink>
          <NavLink to="/properties" delay={100} loaded={loaded}>PROPERTIES</NavLink>
          <NavLink to="/about" delay={200} loaded={loaded}>ABOUT</NavLink>
          <NavLink to="/my-bookings" delay={250} loaded={loaded}>MY BOOKINGS</NavLink>
          <NavLink to="/contact" delay={300} loaded={loaded}>ENQUIRE NOW</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden text-white focus:outline-none transition-opacity duration-3000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Dropdown menu with fade-in animation - centered vertically */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ease-in-out ${
          isDropdownOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
        onClick={toggleDropdown} // Close when clicking outside
      >
        {/* Semi-transparent backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

        {/* Menu container */}
        <div
          className={`relative w-[600px] h-[500px] shadow-xl rounded-md p-10 border-2 border-transparent fixed flex items-center justify-center bg-black transition-all duration-500 hover:shadow-2xl hover:bg-terracotta/5 hover:border-terracotta/20 group transform ${
            isDropdownOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking menu
        >
          {/* Close button */}
          <button
            onClick={toggleDropdown}
            className="absolute top-4 right-4 text-off-white hover:text-terracotta transition-colors duration-300"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="text-center">
            <span className="font-berling-nova text-off-white text-2xl group-hover:text-terracotta transition-colors duration-300 block mb-12">
            THE SIA MOON COLLECTION
            </span>
            <ul className="space-y-12">
              <li>
                <Link
                  to="/properties/alesia-house"
                  onClick={toggleDropdown}
                  className="text-off-white text-2xl hover:text-terracotta transition-colors duration-300 flex items-center justify-center font-berling-nova"
                >
                  <span className="inline-block w-0 h-0.5 bg-terracotta mr-0 group-hover:w-3 group-hover:mr-3 transition-all duration-300"></span>
                  ALESIA HOUSE
                </Link>
              </li>
              <li>
                <Link
                  to="/properties/alpine-retreat"
                  onClick={toggleDropdown}
                  className="text-off-white text-2xl hover:text-terracotta transition-colors duration-300 flex items-center justify-center font-berling-nova"
                >
                  <span className="inline-block w-0 h-0.5 bg-terracotta mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                  PARENTS HOUSE
                </Link>
              </li>
              <li>
                <Link
                  to="/properties/tropical-haven"
                  onClick={toggleDropdown}
                  className="text-off-white text-2xl hover:text-terracotta transition-colors duration-300 flex items-center justify-center font-berling-nova"
                >
                  <span className="inline-block w-0 h-0.5 bg-terracotta mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                  LANNA HOUSE
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-0 bg-deep-green bg-opacity-95 z-50 flex flex-col items-center justify-center transition-all duration-3000 md:hidden",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <button
          className="absolute top-5 right-5 text-off-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col space-y-6 text-center">
          <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
          <MobileNavLink to="/properties" onClick={toggleMenu}>Properties</MobileNavLink>
          <MobileNavLink to="/about" onClick={toggleMenu}>About</MobileNavLink>
          <MobileNavLink to="/my-bookings" onClick={toggleMenu}>My Bookings</MobileNavLink>
          <MobileNavLink to="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
          <div className="pt-4 border-t border-white/20 mt-4">
            <h3 className="text-white text-xl mb-4 font-berling-nova">Our Properties</h3>
            <MobileNavLink to="/properties/alesia-house" onClick={toggleMenu}>Alesia House</MobileNavLink>
            <MobileNavLink to="/properties/alpine-retreat" onClick={toggleMenu}>Alpine Retreat</MobileNavLink>
            <MobileNavLink to="/properties/tropical-haven" onClick={toggleMenu}>Tropical Haven</MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  to,
  children,
  delay,
  loaded
}: {
  to: string;
  children: React.ReactNode;
  delay: number;
  loaded: boolean;
}) {
  return (
    <Link
      to={to}
      className="relative text-white hover:text-terracotta transition-colors duration-200 font-berling-nova group overflow-hidden"
      style={{
        transform: loaded ? 'translateY(0)' : 'translateY(100%)',
        opacity: loaded ? 1 : 0,
        transition: `transform 800ms cubic-bezier(0.25, 1, 0.5, 1), opacity 800ms ease-out`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({
  to,
  children,
  onClick
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      className="text-off-white text-2xl font-berling-nova hover:text-terracotta transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
