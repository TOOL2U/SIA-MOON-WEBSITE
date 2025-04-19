import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { FaBars, FaTimes } from "react-icons/fa";
import clsx from "clsx";

export const fonts = {
  elaSans: "/fonts/Ela Sans Regular.ttf",
  arioso: "/fonts/Arioso Regular.ttf"
};
export const logo = "/images/1.png";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            <span className="w-10 h-[3px] bg-white"></span>
            <span className="w-10 h-[3px] bg-white"></span>
            <span className="w-10 h-[3px] bg-white"></span>
          </button>
          
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="mt-2 w-48 bg-white shadow-xl rounded-md p-6">
              <ul className="flex flex-col text-lg gap-6 text-black">
                <li><Link to="/" onClick={toggleDropdown}>Home</Link></li>
                <li><Link to="/properties" onClick={toggleDropdown}>Properties</Link></li>
                <li><Link to="/about" onClick={toggleDropdown}>About</Link></li>
                <li><Link to="/contact" onClick={toggleDropdown}>Contact</Link></li>
              </ul>
            </div>
          )}
        </div>

        {/* Logo with reveal animation */}
        <div className="flex items-center overflow-hidden">
          <Link to="/" className="flex items-center">
            <img 
              src="https://i.imgur.com/9obrP60.png" 
              alt="Luxury Estates Logo" 
              className={`absolute top-[-3rem] left-[5rem] w-[12rem] h-auto object-contain z-50 transition-transform duration-3000 ease-in-out ${loaded ? 'translate-y-[-0px] rotate-[-360deg]' : 'translate-y-20 rotate-0'}`}
            />
          </Link>
        </div>
        
        {/* Navigation links with staggered reveal */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-20 font-arioso text-4xl text-custom-black z-50">
          <NavLink to="/" delay={3} loaded={loaded}>Home</NavLink>
          <NavLink to="/properties" delay={100} loaded={loaded}>Properties</NavLink>
          <NavLink to="/about" delay={200} loaded={loaded}>About</NavLink>
          <NavLink to="/contact" delay={300} loaded={loaded}>Contact</NavLink>
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
          <MobileNavLink to="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
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
      className="relative text-white hover:text-terracotta transition-colors duration-200 font-arioso group overflow-hidden"
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
      className="text-off-white text-2xl font-elaSans hover:text-terracotta transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
