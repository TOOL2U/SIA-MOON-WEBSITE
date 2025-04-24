import { useEffect, useState, useRef } from "react";
import { Link } from "@remix-run/react";
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
// import { addDays } from "date-fns"; // Uncomment when implementing date picker
import { getProperties } from "~/models/property";
import { ClientOnly } from "./ClientOnly";
import { getCloudinaryUrl } from '~/utils/cloudinary';

// We'll use a simple date input for server-side rendering
// and replace it with DatePicker on the client

export const fonts = {
  elaSans: "/fonts/Ela Sans Regular.ttf",
  arioso: "/fonts/Arioso Regular.ttf"
};
export const heroImageWebp = "/images/IMG_8545 (1).webp";
export default function Hero() {
  const [animationState, setAnimationState] = useState({
    imageLoaded: false,
    overlayReady: false
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const imageUrl = getCloudinaryUrl('8453f772-29b5-45bd-9292-f8e20501f735_ewzhvd',);

  // Booking navigation bar states
  const [selectedProperty, setSelectedProperty] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAdultsOpen, setIsAdultsOpen] = useState(false);

  // These setters will be used when implementing the date picker functionality
  // For now, we're just showing placeholder inputs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateDates = (checkIn: Date, checkOut: Date) => {
    setStartDate(checkIn);
    setEndDate(checkOut);
  };

  const destinationRef = useRef<HTMLDivElement>(null);
  const adultsRef = useRef<HTMLDivElement>(null);

  // Get properties for dropdown
  const properties = getProperties();

  // These state setters will be used when implementing the full DatePicker functionality
  // For now, we're just showing placeholder inputs

  useEffect(() => {
    // Sequential animations with longer delay for slow fade-in
    const imageTimer = setTimeout(() => {
      setAnimationState(prev => ({ ...prev, imageLoaded: true }));
    }, 100); // Start fade-in sooner

    const overlayTimer = setTimeout(() => {
      setAnimationState(prev => ({ ...prev, overlayReady: true }));
    }, 2000); // Delay overlay to allow image to fade in more

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(overlayTimer);
    };
  }, []);

  // Handle body scroll lock when popups are open
  useEffect(() => {
    if (isDestinationOpen || isCalendarOpen || isAdultsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDestinationOpen, isCalendarOpen, isAdultsOpen]);

  return (
    <div className="relative h-screen w-full flex justify-center overflow-hidden" style={{ marginTop: 0 }}>
      {/* Background mask removed to allow for clean fade-in */}
      <div
        className={`absolute inset-0 bg-deep-green z-10 transition-opacity duration-[2000ms] ${
          animationState.imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Main hero image with slow fade-in */}
      <div className="flex items-center justify-center w-[2500px] h-max-screen">
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Hero background"
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity mt-[10px] duration-[5000ms] ease-in ${
            animationState.imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Overlay image with fade-in and floating animation */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ease-out ${
          animationState.overlayReady ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >

      </div>

      {/* Booking Navigation Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-deep-green z-20 transition-all duration-1000 ease-out ${
          animationState.overlayReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto ">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
            {/* Destination Button */}
            <div className="w-full md:w-1/4">
              <button
                onClick={() => setIsDestinationOpen(true)}
                className="w-full flex items-center justify-between bg-deep-green p-4 font-berling-nova text-white"
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{selectedProperty ? properties.find(p => p.id === selectedProperty)?.name : "SELECT YOUR DESTINATION"}</span>
                </div>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Check-in/Check-out Calendar Button */}
            <div className="w-full md:w-1/3 flex bg-deep-green overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-0"
                onClick={() => setIsCalendarOpen(true)}
              >
                <div className="w-1/2 border-r border-white p-4">
                  <div className="relative">
                    <label className="block text-xs text-white font-berling-nova uppercase mb-1">CHECK IN</label>
                    <div className="w-full font-berling-nova text-white bg-deep-green uppercase flex justify-between items-center">
                      <span>{startDate ? startDate.toLocaleDateString() : 'SELECT DATE'}</span>
                      <FaCalendarAlt className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="w-1/2 p-4">
                  <div className="relative">
                    <label className="block text-xs text-white font-berling-nova uppercase mb-1">CHECK OUT</label>
                    <div className="w-full font-berling-nova text-white bg-deep-green uppercase flex justify-between items-center">
                      <span>{endDate ? endDate.toLocaleDateString() : 'SELECT DATE'}</span>
                      <FaCalendarAlt className="text-white" />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Adults Button */}
            <div className="w-full md:w-1/6">
              <button
                onClick={() => setIsAdultsOpen(true)}
                className="w-full flex items-center justify-between bg-deep-green p-4 font-berling-nova text-white"
              >
                <div className="flex items-center">
                  <FaUsers className="mr-2" />
                  <span>ADULTS: {adults}</span>
                </div>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Book Now Button */}
            <Link
              to={selectedProperty ? `/properties/${selectedProperty}` : "/properties/alesia-house"}
              className="w-[170px] h-[90px] bg-off-white hover:bg-terracotta/80 text-black text-lg hover:text-black hover:animate-fade-in border-2 border-off-white font-berling-nova  transition-colors duration-1000 uppercase text-center uppercase flex items-center justify-center"

              onClick={() => {
                // Save booking details to localStorage
                const bookingDetails = {
                  propertyId: selectedProperty || "alesia-house",
                  startDate: startDate ? startDate.toISOString() : null,
                  endDate: endDate ? endDate.toISOString() : null,
                  adults: adults
                };
                localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
              }}
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </div>
      {/* Destination Popup */}
      {isDestinationOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center transition-opacity duration-500 animate-fade-in">
    <div className="bg-black border-2 border-off-white/50 rounded-lg shadow-xl p-10 w-[600px] h-[600px] overflow-y-auto animate-fadeIn hover:border-terracotta/20 transition-all duration-500 hover:shadow-2xl hover:bg-terracotta/5 hover:border-terracotta/20 group transform">
            <div className="flex flex-wrap justify-center items-center p-8 border-b border-white/50">
              <h3 className="text-xl font-berling-nova text-off-white">SELECT YOUR DESTINATION</h3>
              <button
                onClick={() => setIsDestinationOpen(false)}
                className=" absolute top-8 right-8 text-off-white hover:text-terracotta transition-colors duration-1000"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="max-h-[100vh] overflow-y-auto p-8 rounded-b-lg">
            <div className="flex flex-wrap gap-6 justify-center">
              {properties.map((property) => (
                <button
                  key={property.id}
                  className="w-[400px] h-[100px] text-center px-8 py-8  border-2  rounded-lg text-off-white hover:bg-terracotta hover:text-off-white hover:scale-110 font-berling-nova text-2xl transition-colors duration-1000 border-b border-transparent hover:border-terracotta/20 transition-all duration-1000 hover:shadow-2xl hover:bg-terracotta/5 hover:border-terracotta/20 group transform"
                  onClick={() => {
                    setSelectedProperty(property.id);
                    setIsDestinationOpen(false);
                  }}
                >
                  {property.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Calendar Popup */}
      {isCalendarOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center transition-opacity duration-500 animate-fade-in">
    <div className="bg-black border-2 border-off-white/50 rounded-lg shadow-xl p-4 w-[600px] h-[600px] overflow-y-auto animate-fadeIn hover:border-terracotta/20 transition-all duration-500 hover:shadow-2xl hover:bg-terracotta/5 hover:border-terracotta/20 group transform">
    <div className="flex justify-center items-center p-10 mb-2 border-b border-off-white">
              <h3 className="text-xl font-berling-nova text-off-white">SELECT DATES</h3>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className=" absolute top-8 right-8 text-off-white hover:text-terracotta transition-colors duration-1000"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="mb-0 flex flex-col items-center justify-center p-2">
                <label className="block text-xl font-berling-nova text-off-white mb-2">CHECK IN</label>
                <input
                  type="date"
                  className="w-[300px] text-center h-[50px] p-1 border-2 border-white text-xl font-berling-nova focus:outline-none focus:ring-2 focus:ring-terracotta"
                  onChange={(e) => {
                    if (e.target.value) {
                      setStartDate(new Date(e.target.value));
                    }
                  }}
                />
              </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
              <div className="mb-2 flex flex-col items-center justify-center p-4">

              <label className="block text-xl font-berling-nova text-off-white mb-4">CHECK IN</label>
              <input
                  type="date"
                  className="w-[300px] text-center h-[50px] p-1 border-2 border-white text-xl font-berling-nova focus:outline-none focus:ring-2 focus:ring-terracotta"
                  onChange={(e) => {
                    if (e.target.value) {
                      setEndDate(new Date(e.target.value));
                    }
                  }}
                />
              </div>
              <div className="mb-0 flex flex-col items-center justify-center p-8">

              <button
                className="w-[300px] text-center h-[50px] bg-deep-green text-white hover:scale-102 font-berling-nova py-3 hover:bg-terracotta hover:text-black transition-colors duration-1000"
                onClick={() => setIsCalendarOpen(false)}
              >
                CONFIRM DATES
              </button>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Adults Popup */}
      {isAdultsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center transition-opacity duration-500 animate-fade-in">
                <div className="bg-black border-2 border-off-white/50 rounded-lg shadow-xl p-4 w-[600px] h-[600px] overflow-y-auto animate-fadeIn hover:border-terracotta/20 transition-all duration-500 hover:shadow-2xl hover:bg-terracotta/5 hover:border-terracotta/20 group transform">

            <div className="flex justify-center items-center p-4 mb-4 border-b border-white/50">
              <h3 className="text-xl font-berling-nova text-off-white">SELECT NUMBER OF ADULTS</h3>
              <button
                onClick={() => setIsAdultsOpen(false)}
                className=" absolute top-8 right-8 text-off-white hover:text-terracotta transition-colors duration-1000"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8,].map((num) => (
                <button
                  key={num}
                  className="w-full text-center px-6 py-4 hover:bg-terracotta hover:text-white font-berling-nova text-xl text-off-white transition-colors duration-1000  border-off-white/50"
                  onClick={() => {
                    setAdults(num);
                    setIsAdultsOpen(false);
                  }}
                >
                  {num} {num === 1 ? 'Adult' : 'Adults'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
