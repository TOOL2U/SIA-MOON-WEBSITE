import { Link } from "@remix-run/react";
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from "~/utils/icons";

export default function Footer() {
  return (
    <footer className="bg-deep-green text-off-white py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="https://i.imgur.com/ElKTTQt.png"
              alt="Luxury Estates Logo"
              className="h-24 sm:h-28 md:h-32 w-32 sm:w-36 md:w-40 invert mb-6 sm:mb-8 md:mb-10"
            />
            <p className="text-sm max-w-xs text-center md:text-left">
              Luxury vacation rentals in the most exclusive locations worldwide. Experience the extraordinary.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 font-calluna">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-center md:text-left text-sm sm:text-base">
              <li><Link to="/" className="hover:text-terracotta transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-terracotta transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-terracotta transition-colors">About Us</Link></li>
              <li><Link to="/my-bookings" className="hover:text-terracotta transition-colors">My Bookings</Link></li>
              <li><Link to="/contact" className="hover:text-terracotta transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-terracotta transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start sm:col-span-2 md:col-span-1">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 font-calluna">Contact Us</h3>
            <address className="not-italic text-center md:text-left text-sm sm:text-base">
              <p>50/2 Moo 6</p>
              <p>Koh Phangan, Thailan</p>
              <p className="mt-2">shaun@siamoon.com</p>
              <p>+66 9338 0630</p>
            </address>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="text-off-white hover:text-terracotta transition-colors" size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-off-white hover:text-terracotta transition-colors" size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="text-off-white hover:text-terracotta transition-colors" size={18} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <FaPinterest className="text-off-white hover:text-terracotta transition-colors" size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-off-white border-opacity-60 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm">© {new Date().getFullYear()} Sia Moon Company Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
