import { Link } from "@remix-run/react";
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-deep-green text-off-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="https://i.imgur.com/ElKTTQt.png" 
              alt="Luxury Estates Logo" 
              className="h-32 w-32 invert mb-10"
            />
            <p className="text-sm max-w-xs text-center md:text-left">
              Luxury vacation rentals in the most exclusive locations worldwide. Experience the extraordinary.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl mb-4 font-arioso">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><Link to="/" className="hover:text-terracotta transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-terracotta transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-terracotta transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-terracotta transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-terracotta transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl mb-4 font-arioso">Contact Us</h3>
            <address className="not-italic text-center md:text-left">
              <p>123 Luxury Lane</p>
              <p>Beverly Hills, CA 90210</p>
              <p className="mt-2">info@luxuryestates.com</p>
              <p>+1 (800) 555-1234</p>
            </address>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="text-off-white hover:text-terracotta transition-colors" size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-off-white hover:text-terracotta transition-colors" size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="text-off-white hover:text-terracotta transition-colors" size={20} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <FaPinterest className="text-off-white hover:text-terracotta transition-colors" size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-off-white border-opacity-60 mt-8 pt-8 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Luxury Estates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
