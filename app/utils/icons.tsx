// This file provides a safe way to import icons from react-icons
// It handles the CommonJS/ESM compatibility issues that can occur on the server

// Import the whole modules and then destructure them
import * as FaIcons from 'react-icons/fa';
import * as SlIcons from 'react-icons/sl';

// Destructure the icons we need
const {
  FaTimes,
  FaBars,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaUsers,
  FaTrash,
  FaPlus,
  FaBan,
  FaSignOutAlt,
  FaSearch,
  FaEdit,
  FaCheck,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaDirections,
  FaMapPin,
  FaLock,
  FaTicketAlt,
  FaCopy,
  FaExclamationTriangle,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft
} = FaIcons;

// Destructure SL icons
const { SlArrowRight, SlArrowLeft } = SlIcons;

// Re-export all icons
export {
  FaTimes,
  FaBars,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaUsers,
  FaTrash,
  FaPlus,
  FaBan,
  FaSignOutAlt,
  FaSearch,
  FaEdit,
  FaCheck,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaDirections,
  FaMapPin,
  FaLock,
  FaTicketAlt,
  FaCopy,
  FaExclamationTriangle,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  SlArrowRight,
  SlArrowLeft
};
