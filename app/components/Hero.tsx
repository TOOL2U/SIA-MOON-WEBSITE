import { useEffect, useState, useRef } from "react";
import { Link } from "@remix-run/react";
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaTimes, FaExclamationTriangle } from "~/utils/icons";
import { addDays, format, isBefore, isAfter, isSameDay, eachDayOfInterval } from "date-fns";
import { getProperties } from "~/models/property";
import { ClientOnly } from "./ClientOnly";
import { getCloudinaryUrl } from '~/utils/cloudinary';
import { isPropertyAvailable } from "~/data/bookings";
import { isDateRangeBlocked } from "~/data/blockedDates";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "~/styles/calendar-custom.css";

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

  const imageUrl = getCloudinaryUrl('_DSF2751_howmzr',);

  // Booking navigation bar states
  const [selectedProperty, setSelectedProperty] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAdultsOpen, setIsAdultsOpen] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [isLoadingDates, setIsLoadingDates] = useState(false);

  // Function to check if a date is blocked (either by a booking or manually)
  const isDateBlocked = (date: Date, propertyId: string) => {
    // Format date to ISO string for checking
    const dateStr = date.toISOString();
    const nextDayStr = addDays(date, 1).toISOString();

    // Check if the property is available for a one-night stay on this date
    const isAvailableForBooking = isPropertyAvailable(propertyId, dateStr, nextDayStr);

    // Check if there are any manually blocked dates that overlap with this date
    const isBlocked = isDateRangeBlocked(propertyId, dateStr, nextDayStr);

    // The date is blocked if it's either not available for booking OR manually blocked
    return !isAvailableForBooking || isBlocked;
  };

  // Function to validate selected dates
  const validateDates = () => {
    // Reset any previous errors
    setDateError(null);

    // Check if dates are selected
    if (!startDate || !endDate) {
      setDateError("Please select both check-in and check-out dates");
      return false;
    }

    // Check if start date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isBefore(startDate, today)) {
      setDateError("Check-in date cannot be in the past");
      return false;
    }

    // Check if end date is before start date
    if (isBefore(endDate, startDate)) {
      setDateError("Check-out date must be after check-in date");
      return false;
    }

    // Check if any of the selected dates are blocked
    const propertyId = selectedProperty || "alesia-house";
    const currentDate = new Date(startDate);

    while (isBefore(currentDate, endDate) || currentDate.getTime() === endDate.getTime()) {
      if (isDateBlocked(currentDate, propertyId)) {
        setDateError(`${format(currentDate, 'MMM dd, yyyy')} is not available for booking`);
        return false;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return true;
  };

  // No longer needed as we're using DatePicker directly

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

  // Function to load blocked dates for the selected property
  const loadBlockedDates = () => {
    setIsLoadingDates(true);
    const propertyId = selectedProperty || "alesia-house";

    // Generate dates for the next 6 months
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sixMonthsLater = addDays(today, 180);

    // Create an array of all dates in the range
    const dateRange = eachDayOfInterval({
      start: today,
      end: sixMonthsLater
    });

    // Check each date for availability
    const blocked: Date[] = [];

    dateRange.forEach(date => {
      if (isDateBlocked(date, propertyId)) {
        blocked.push(date);
      }
    });

    setBlockedDates(blocked);
    setIsLoadingDates(false);
  };

  // Load blocked dates when the calendar opens
  useEffect(() => {
    if (isCalendarOpen) {
      loadBlockedDates();
    }
  }, [isCalendarOpen, selectedProperty]);

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
    <div className="relative h-screen w-full flex justify-center overflow-hidden " style={{ marginTop: 0, marginBottom: 0 }}>
      {/* Background mask removed to allow for clean fade-in */}
      <div
        className={`absolute inset-0 bg-deep-green z-10 transition-opacity duration-[2000ms] ${
          animationState.imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Main hero image with slow fade-in */}
      <div className="flex items-center justify-center w-[2500px] object-contain  ">
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Hero background"
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity mt-0 duration-[5000ms] ease-in opacity-90 ${
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

      {/* Booking Navigation Bar - Hidden on mobile */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-deep-green z-20 transition-all duration-1000 ease-out hidden sm:block ${
          animationState.overlayReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
            {/* Destination Button */}
            <div className="w-full md:w-1/4">
              <button
                onClick={() => setIsDestinationOpen(true)}
                className={`w-full flex items-center justify-between p-4 font-berling-nova text-white ${!selectedProperty ? 'bg-deep-green/80 border-l-4 border-off-white' : 'bg-deep-green'}`}
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className={`mr-2 ${!selectedProperty ? 'text-off-white' : ''}`} />
                  <span>{selectedProperty ? properties.find(p => p.id === selectedProperty)?.name : "SELECT YOUR DESTINATION"}</span>
                  {!selectedProperty && <span className="ml-2 text-xs text-off-white"></span>}
                </div>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Check-in/Check-out Calendar Button */}
            <div className={`w-full md:w-1/3 flex overflow-hidden ${(!startDate || !endDate) ? 'bg-deep-green/80 border-l-2 border-off-white' : 'bg-deep-green'}`}>
              <button
                className="w-full flex items-center justify-between p-0"
                onClick={() => setIsCalendarOpen(true)}
              >
                <div className="w-1/2 border-r border-white p-4">
                  <div className="relative">
                    <label className="block text-xs text-white font-berling-nova uppercase mb-1">
                      CHECK IN {!startDate && <span className="text-off-white"></span>}
                    </label>
                    <div className="w-full font-berling-nova text-white bg-transparent uppercase flex justify-between items-center">
                      <span>{startDate ? startDate.toLocaleDateString() : 'SELECT DATE'}</span>
                      <FaCalendarAlt className={`${!startDate ? 'text-off-white' : 'text-white'}`} />
                    </div>
                  </div>
                </div>
                <div className="w-1/2 p-4">
                  <div className="relative">
                    <label className="block text-xs text-white font-berling-nova uppercase mb-1">
                      CHECK OUT {!endDate && <span className="text-off-white"></span>}
                    </label>
                    <div className="w-full font-berling-nova text-white bg-transparent uppercase flex justify-between items-center">
                      <span>{endDate ? endDate.toLocaleDateString() : 'SELECT DATE'}</span>
                      <FaCalendarAlt className={`${!endDate ? 'text-off-white' : 'text-white'}`} />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Adults Button */}
            <div className="w-full md:w-1/6">
              <button
                onClick={() => setIsAdultsOpen(true)}
                className="w-full flex items-center justify-between bg-deep-green border-l-2 border-off-white p-6 font-berling-nova text-white"
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
            {startDate && endDate && selectedProperty ? (
              <Link
                to={`/properties/${selectedProperty}`}
                className="w-full md:w-[170px] h-[60px] md:h-[90px] bg-off-white hover:bg-terracotta/80 text-black text-lg hover:text-black animate-fade-in border-2 border-off-white font-berling-nova transition-colors duration-300 uppercase text-center flex items-center justify-center w-fixed-adjust"
                onClick={() => {
                  // Save booking details to localStorage
                  const bookingDetails = {
                    propertyId: selectedProperty,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    adults: adults
                  };

                  // First remove any existing booking details to ensure the event is triggered
                  localStorage.removeItem('bookingDetails');

                  // Then set the new booking details
                  localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

                  // Also dispatch a custom event to notify components that may not catch the storage event
                  // Use a more reliable approach with a slight delay to ensure localStorage is updated first
                  setTimeout(() => {
                    console.log('Dispatching bookingDetailsUpdated event from BOOK NOW', bookingDetails);
                    window.dispatchEvent(new CustomEvent('bookingDetailsUpdated', {
                      detail: bookingDetails
                    }));
                  }, 100);
                }}
              >
                BOOK NOW
              </Link>
            ) : (
              <div className="relative">
                <div
                  className="w-full md:w-[170px] h-[60px] md:h-[90px] bg-off-white text-black text-lg border-2 border-off-white font-berling-nova uppercase text-center flex flex-col items-center justify-center cursor-not-allowed w-fixed-adjust"
                  title={!selectedProperty ? "Please select a property" : !startDate || !endDate ? "Please select check-in and check-out dates" : ""}
                >
                  <span>BOOK NOW</span>
                  <span className="text-xs mt-1 text-red-500">
                    {!selectedProperty
                      ? ""
                      : !startDate
                        ? "Select check-in date"
                        : !endDate
                          ? "Select check-out date"
                          : ""}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Destination Popup */}
      {isDestinationOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-start pt-[400px] sm:pt-[200px] md:pt-[400px] transition-opacity duration-500 animate-fade-in popup-pt-adjust">
    <div className="bg-black border-2 border-off-white/50 rounded-lg shadow-xl p-4 sm:p-6 md:p-10 w-[90%] sm:w-[80%] md:w-[600px] h-auto md:h-[600px] max-h-[80vh] md:max-h-[600px] overflow-y-auto animate-fadeIn hover:border-terracotta/20 transition-all duration-500 hover:shadow-2xl hover:bg-terracotta/5 hover:border-terracotta/20 group transform popup-container-mobile">
            <div className="flex flex-wrap justify-center items-center p-8 border-b border-white/50">
              <h3 className="text-xl font-berling-nova text-off-white">SELECT YOUR DESTINATION</h3>
              <button
                onClick={() => setIsDestinationOpen(false)}
                className=" absolute top-8 right-8 text-off-white hover:text-terracotta transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="max-h-[100vh] overflow-y-auto p-8 rounded-b-lg">
            <div className="flex flex-wrap gap-6 justify-center">
              {properties.map((property) => (
                <button
                  key={property.id}
                  className="w-full sm:w-[300px] md:w-[400px] h-[80px] md:h-[100px] text-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 border-2 rounded-lg text-off-white hover:bg-terracotta hover:text-off-white hover:scale-105 md:hover:scale-110 font-berling-nova text-lg sm:text-xl md:text-2xl transition-colors duration-200 border-b border-transparent hover:border-terracotta/20 transition-all duration-500 hover:shadow-2xl hover:bg-terracotta/5 hover:border-terracotta/20 group transform w-fixed-adjust"
                  onClick={() => {
                    setSelectedProperty(property.id);

                    // Save booking details to localStorage
                    const bookingDetails = {
                      propertyId: property.id,
                      startDate: startDate ? startDate.toISOString() : null,
                      endDate: endDate ? endDate.toISOString() : null,
                      adults: adults
                    };

                    // First remove any existing booking details to ensure the event is triggered
                    localStorage.removeItem('bookingDetails');

                    // Then set the new booking details
                    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

                    // Also dispatch a custom event to notify components that may not catch the storage event
                    // Use a more reliable approach with a slight delay to ensure localStorage is updated first
                    setTimeout(() => {
                      console.log('Dispatching bookingDetailsUpdated event', bookingDetails);
                      window.dispatchEvent(new CustomEvent('bookingDetailsUpdated', {
                        detail: bookingDetails
                      }));
                    }, 100);

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
         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-start pt-[200px] sm:pt-[300px] md:pt-[400px] transition-opacity duration-500 animate-fade-in popup-pt-adjust">
    <div className="bg-black/20 border-2 border-off-white/50 rounded-lg shadow-xl p-4 w-[90%] sm:w-[80%] md:w-[600px] h-auto md:h-[600px] max-h-[80vh] md:max-h-[600px] overflow-y-auto animate-fadeIn hover:border-terracotta/20 transition-all duration-500 hover:shadow-2xl hover:bg-terracotta/5 hover:border-terracotta/20 group transform popup-container-mobile">
    <div className="flex justify-center items-center p-10 mb-2 border-b border-off-white">
              <h3 className="text-xl font-berling-nova text-off-white">SELECT DATES</h3>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className=" absolute top-8 right-8 text-off-white hover:text-terracotta transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              {isLoadingDates ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div>
                    <label className="block text-xl font-berling-nova text-off-white mb-2">CHECK IN</label>
                    <div className="relative">
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => {
                          setStartDate(date);
                          setDateError(null);
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        placeholderText="Select check-in date"
                        className="w-full sm:w-[250px] md:w-[300px] text-center h-[40px] sm:h-[45px] md:h-[50px] p-1 border-2 border-white text-base sm:text-lg md:text-xl font-berling-nova focus:outline-none focus:ring-2 focus:ring-terracotta w-fixed-adjust"
                        monthsShown={1}
                        inline
                        excludeDates={blockedDates}
                        dayClassName={(date: Date) => {
                          // Check if the date is blocked
                          const isBlocked = blockedDates.some(blockedDate =>
                            isSameDay(blockedDate, date)
                          );

                          // Apply different classes based on whether the date is blocked
                          if (isBlocked) {
                            return "bg-red-200 text-gray-400 line-through cursor-not-allowed";
                          }
                          return "";
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xl font-berling-nova text-off-white mb-2">CHECK OUT</label>
                    <div className="relative">
                      <DatePicker
                        selected={endDate}
                        onChange={(date: Date) => {
                          setEndDate(date);
                          setDateError(null);
                        }}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate ? addDays(startDate, 1) : new Date()}
                        placeholderText="Select check-out date"
                        className="w-full sm:w-[250px] md:w-[300px] text-center h-[40px] sm:h-[45px] md:h-[50px] p-1 border-2 border-white text-base sm:text-lg md:text-xl font-berling-nova focus:outline-none focus:ring-2 focus:ring-terracotta w-fixed-adjust"
                        monthsShown={1}
                        inline
                        excludeDates={blockedDates}
                        dayClassName={(date: Date) => {
                          // Check if the date is blocked
                          const isBlocked = blockedDates.some(blockedDate =>
                            isSameDay(blockedDate, date)
                          );

                          // Apply different classes based on whether the date is blocked
                          if (isBlocked) {
                            return "bg-red-200 text-gray-400 line-through cursor-not-allowed";
                          }
                          return "";
                        }}
                        disabled={!startDate}
                      />
                    </div>
                  </div>
                  {/* Calendar Legend */}
                  <div className="col-span-2 flex justify-center items-center space-x-6 mt-0">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm mr-2"></div>
                      <span className="text-off-white text-sm">Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-200 border border-gray-300 rounded-sm mr-2 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-gray-500 transform rotate-45"></div>
                        </div>
                      </div>
                      <span className="text-off-white text-sm">Unavailable/Booked</span>
                    </div>
                  </div>
                </div>
              )}
              {/* Error message display */}
              {dateError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                  <FaExclamationTriangle className="mr-2 text-red-500" />
                  <span>{dateError}</span>
                </div>
              )}

              <div className="mb-0 flex flex-col items-center justify-center p-1">
              <button
                className="w-full sm:w-[250px] md:w-[300px] text-center h-[45px] md:h-[50px] bg-deep-green text-white hover:scale-102 font-berling-nova py-2 md:py-3 hover:bg-terracotta hover:text-black transition-colors duration-300 w-fixed-adjust"
                onClick={() => {
                  // Validate dates before confirming
                  if (!validateDates()) {
                    return;
                  }

                  // Save booking details to localStorage
                  const bookingDetails = {
                    propertyId: selectedProperty || "alesia-house",
                    startDate: startDate ? startDate.toISOString() : null,
                    endDate: endDate ? endDate.toISOString() : null,
                    adults: adults
                  };

                  // First remove any existing booking details to ensure the event is triggered
                  localStorage.removeItem('bookingDetails');

                  // Then set the new booking details
                  localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

                  // Also dispatch a custom event to notify components that may not catch the storage event
                  // Use a more reliable approach with a slight delay to ensure localStorage is updated first
                  setTimeout(() => {
                    console.log('Dispatching bookingDetailsUpdated event', bookingDetails);
                    window.dispatchEvent(new CustomEvent('bookingDetailsUpdated', {
                      detail: bookingDetails
                    }));
                  }, 100);

                  setIsCalendarOpen(false);
                }}
                disabled={!startDate || !endDate || dateError !== null}
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
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-start pt-[200px] sm:pt-[300px] md:pt-[400px] transition-opacity duration-500 animate-fade-in popup-pt-adjust">
                <div className="bg-black border-2 border-off-white/50 rounded-lg shadow-xl p-4 w-[90%] sm:w-[80%] md:w-[600px] h-auto md:h-[600px] max-h-[80vh] md:max-h-[600px] overflow-y-auto animate-fadeIn hover:border-terracotta/20 transition-all duration-500 hover:shadow-2xl hover:bg-terracotta/5 hover:border-terracotta/20 group transform popup-container-mobile">

            <div className="flex justify-center items-center p-4 mb-4 border-b border-white/50">
              <h3 className="text-xl font-berling-nova text-off-white">SELECT NUMBER OF ADULTS</h3>
              <button
                onClick={() => setIsAdultsOpen(false)}
                className=" absolute top-8 right-8 text-off-white hover:text-terracotta transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8,].map((num) => (
                <button
                  key={num}
                  className="w-full text-center px-6 py-4 hover:bg-terracotta hover:text-white font-berling-nova text-xl text-off-white transition-colors duration-200  border-off-white/50"
                  onClick={() => {
                    setAdults(num);

                    // Save booking details to localStorage
                    const bookingDetails = {
                      propertyId: selectedProperty || "alesia-house",
                      startDate: startDate ? startDate.toISOString() : null,
                      endDate: endDate ? endDate.toISOString() : null,
                      adults: num
                    };

                    // First remove any existing booking details to ensure the event is triggered
                    localStorage.removeItem('bookingDetails');

                    // Then set the new booking details
                    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

                    // Also dispatch a custom event to notify components that may not catch the storage event
                    // Use a more reliable approach with a slight delay to ensure localStorage is updated first
                    setTimeout(() => {
                      console.log('Dispatching bookingDetailsUpdated event', bookingDetails);
                      window.dispatchEvent(new CustomEvent('bookingDetailsUpdated', {
                        detail: bookingDetails
                      }));
                    }, 100);

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
