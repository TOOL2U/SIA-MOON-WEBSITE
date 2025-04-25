import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays, differenceInDays, format, isSameDay, isWithinInterval } from "date-fns";
import { FaCalendarAlt, FaUsers, FaGlobe, FaCheck, FaTimes, FaCopy } from "react-icons/fa";
import { Link } from "@remix-run/react";
import type { Property } from "~/models/property";
import { getCountries } from "~/data/countries";
import { createBooking, isPropertyAvailable } from "~/data/bookings";
import { blockDatesForBooking, getBlockedDatesByPropertyId, isDateRangeBlocked } from "~/data/blockedDates";
import { sendBookingToMakeWebhook } from "~/utils/webhooks";
import MobileBookingCalendar from "./MobileBookingCalendar";

import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  property: Property;
}

export default function BookingForm({ property }: BookingFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingNumber, setBookingNumber] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calendar popup state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // State to track if booking details were auto-filled
  const [detailsAutoFilled, setDetailsAutoFilled] = useState(false);

  // Function to check for and load booking details from localStorage
  const loadBookingDetailsFromStorage = () => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      try {
        const savedBookingDetails = localStorage.getItem('bookingDetails');

        if (savedBookingDetails) {
          const bookingDetails = JSON.parse(savedBookingDetails);

          // Only apply if the property ID matches
          if (bookingDetails.propertyId === property.id) {
            let wasAutoFilled = false;

            // Set start date if available
            if (bookingDetails.startDate) {
              setStartDate(new Date(bookingDetails.startDate));
              wasAutoFilled = true;
            }

            // Set end date if available
            if (bookingDetails.endDate) {
              setEndDate(new Date(bookingDetails.endDate));
              wasAutoFilled = true;
            }

            // Set number of guests if available
            if (bookingDetails.adults && bookingDetails.adults <= property.maxGuests) {
              setGuests(bookingDetails.adults);
              wasAutoFilled = true;
            } else if (bookingDetails.guests && bookingDetails.guests <= property.maxGuests) {
              // For backward compatibility with existing code that might use 'guests' instead of 'adults'
              setGuests(bookingDetails.guests);
              wasAutoFilled = true;
            }

            // Set the auto-filled flag if any data was applied
            if (wasAutoFilled) {
              setDetailsAutoFilled(true);

              // Hide the auto-filled notification after 5 seconds
              setTimeout(() => {
                setDetailsAutoFilled(false);
              }, 5000);
            }

            // Don't clear localStorage immediately, as other components might need this data
            // We'll clear it after a short delay to ensure all components have had a chance to read it
            setTimeout(() => {
              localStorage.removeItem('bookingDetails');
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Error loading booking details:', error);
      }
    }
  };

  // Load booking details from localStorage when component mounts
  useEffect(() => {
    loadBookingDetailsFromStorage();
  }, [property.id, property.maxGuests]);

  // Set up event listeners to detect changes to booking details
  useEffect(() => {
    // Function to handle storage events
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'bookingDetails') {
        // If bookingDetails was changed in localStorage, load the new data
        loadBookingDetailsFromStorage();
      }
    };

    // Function to handle custom event
    const handleCustomEvent = (event: Event) => {
      console.log('Received bookingDetailsUpdated event', event);
      // Load the booking details when the custom event is fired
      loadBookingDetailsFromStorage();
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('bookingDetailsUpdated', handleCustomEvent);

    // Also check for changes every second (as a fallback)
    const intervalId = setInterval(() => {
      loadBookingDetailsFromStorage();
    }, 1000);

    // Immediately try to load booking details when the component mounts
    loadBookingDetailsFromStorage();

    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bookingDetailsUpdated', handleCustomEvent);
      clearInterval(intervalId);
    };
  }, [property.id, property.maxGuests]);

  // These handlers are used by the calendar popup
  // They're kept here for reference but are now handled in the CalendarPopup component

  // Open calendar popup
  const openCalendar = () => {
    setIsCalendarOpen(true);
  };

  // Close calendar popup
  const onClose = () => {
    setIsCalendarOpen(false);
  };

  // This function is no longer needed as we're using the new approach
  // with temporary dates in the calendar popup

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;

    const nights = differenceInDays(endDate, startDate);
    return nights * property.price;
  };

  // Check if a date is blocked (either by a booking or manually)
  const isDateBlocked = (date: Date) => {
    // Format date to ISO string for checking
    const dateStr = date.toISOString();
    const nextDayStr = addDays(date, 1).toISOString();

    // Check if the property is available for a one-night stay on this date
    const isAvailableForBooking = isPropertyAvailable(property.id, dateStr, nextDayStr);

    // Check if there are any manually blocked dates that overlap with this date
    const isBlocked = isDateRangeBlocked(property.id, dateStr, nextDayStr);

    // The date is blocked if it's either not available for booking OR manually blocked
    return !isAvailableForBooking || isBlocked;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!startDate) newErrors.startDate = "Check-in date is required";
    if (!endDate) newErrors.endDate = "Check-out date is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!country) newErrors.country = "Country is required";

    // Validate that check-in date is before check-out date
    if (startDate && endDate && startDate >= endDate) {
      newErrors.endDate = "Check-out date must be after check-in date";
    }

    // Validate that check-in date is not in the past
    if (startDate && startDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      newErrors.startDate = "Check-in date cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to copy booking number to clipboard
  const copyBookingNumber = () => {
    if (bookingNumber) {
      navigator.clipboard.writeText(bookingNumber)
        .then(() => {
          setIsCopied(true);
          // Reset the copied state after 2 seconds
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy booking number: ', err);
        });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Create a new booking with a slight delay to simulate API call
    setTimeout(async () => {
      try {
        const total = calculateTotal();
        const newBooking = createBooking({
          propertyId: property.id,
          checkIn: startDate!.toISOString(),
          checkOut: endDate!.toISOString(),
          guests,
          name,
          email,
          phone,
          country,
          specialRequests,
          total
        });

        setBookingNumber(newBooking.bookingNumber);
        setIsSubmitting(false);
        setIsSuccess(true);

        // Store booking in localStorage for persistence between page refreshes
        // In a real app, this would be stored in a database
        try {
          // 1. Store in the main bookings collection
          const savedBookings = localStorage.getItem('userBookings') || '[]';
          const bookings = JSON.parse(savedBookings);
          bookings.push(newBooking);
          localStorage.setItem('userBookings', JSON.stringify(bookings));

          // 2. Store the individual booking by its booking number for easy lookup
          // This is the primary storage method for individual bookings
          localStorage.setItem(`booking_${newBooking.bookingNumber}`, JSON.stringify(newBooking));

          // 3. Store a mapping of email to booking numbers for this user
          // This allows users to look up all their bookings by email
          const userBookingsKey = `user_${email.toLowerCase()}`;
          const userBookings = JSON.parse(localStorage.getItem(userBookingsKey) || '[]');
          userBookings.push(newBooking.bookingNumber);
          localStorage.setItem(userBookingsKey, JSON.stringify(userBookings));

          // 4. Store a backup copy with a timestamp to ensure data isn't lost
          // This provides redundancy in case other storage methods fail
          const timestamp = new Date().getTime();
          localStorage.setItem(`booking_backup_${newBooking.bookingNumber}_${timestamp}`, JSON.stringify(newBooking));

          console.log('Booking stored successfully:', newBooking.bookingNumber);

          // 5. Verify storage was successful by reading back the data
          const verifyBooking = localStorage.getItem(`booking_${newBooking.bookingNumber}`);
          if (!verifyBooking) {
            console.error('Booking verification failed - attempting backup storage');
            // Try one more time with a different key if the first attempt failed
            localStorage.setItem(`booking_emergency_${newBooking.bookingNumber}`, JSON.stringify(newBooking));
          }

          // 6. Block the dates in the availability calendar
          // This ensures the dates are shown as unavailable in the calendar
          blockDatesForBooking(
            newBooking.propertyId,
            newBooking.checkIn,
            newBooking.checkOut,
            newBooking.bookingNumber
          );

          // Send booking data to Make.com webhook
          try {
            await sendBookingToMakeWebhook({
              id: newBooking.id,
              propertyId: newBooking.propertyId,
              propertyName: property.name,
              customerName: newBooking.name,
              checkInDate: newBooking.checkIn,
              checkOutDate: newBooking.checkOut,
              guestCount: newBooking.guests,
              totalPrice: newBooking.total,
              customerEmail: newBooking.email,
              customerPhone: newBooking.phone,
              specialRequests: newBooking.specialRequests
            });
            console.log('Booking data sent to webhook successfully');
          } catch (webhookError) {
            // Log the error but don't affect the user experience
            console.error('Error sending booking to webhook:', webhookError);
          }
        } catch (error) {
          console.error('Error storing booking:', error);
        }

        // Don't reset the form immediately so user can see their booking number
      } catch (error) {
        console.error('Error creating booking:', error);
        setIsSubmitting(false);
      }
    }, 1500);
  };

  // Calendar popup component
  const CalendarPopup = () => {
    // For check-in/check-out calendar, we need to track both dates
    const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate);
    const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate);

    // Reset temp dates when popup opens
    useEffect(() => {
      if (isCalendarOpen) {
        setTempStartDate(startDate);
        setTempEndDate(endDate);
      }
    }, [isCalendarOpen, startDate, endDate]);

    const handleStartDateChange = (date: Date | null) => {
      setTempStartDate(date);
      if (date && tempEndDate && date > tempEndDate) {
        setTempEndDate(null);
      }
    };

    const handleEndDateChange = (date: Date | null) => {
      setTempEndDate(date);
    };

    const handleApply = () => {
      if (tempStartDate) {
        setStartDate(tempStartDate);
      }
      if (tempEndDate) {
        setEndDate(tempEndDate);
      }
      onClose();
    };

    if (!isCalendarOpen) return null;

    return (
      <div className=" absolute left-[-110%] fixed w-[190vh] h-full inset-0 z-50 flex flex-col items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
    ></div>

        {/* Calendar container */}
        <div className="availability-calendar-popup relative border-2 border-black rounded-lg shadow-xl p-4 sm:p-6 max-w-3xl w-[90%] sm:w-full mx-4 z-10 popup-container-mobile">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-deep-green transition-colors"
            aria-label="Close calendar"
          >
            <FaTimes size={20} />
          </button>

          <h2 className="text-2xl font-calluna text-deep-green mb-4 text-center">
            Select Dates
          </h2>

          <p className="text-gray-600 mb-6 text-center">
            Select your check-in and check-out dates for {property.name}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 text-center">
            <div>
              <label className="block text-black text-xl font-calluna mb-2">Check-in Date</label>
              <div className="relative">
                <DatePicker
                  selected={tempStartDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={tempStartDate}
                  endDate={tempEndDate}
                  minDate={new Date()}
                  placeholderText="Select check-in date"
                  className="w-full p-3 border border-black rounded-md"
                  monthsShown={1}
                  inline
                  filterDate={date => !isDateBlocked(date)}
                />
              </div>
            </div>

            <div>
              <label className="block text-black text-xl font-calluna mb-2">Check-out Date</label>
              <div className="relative">
                <DatePicker
                  selected={tempEndDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={tempStartDate}
                  endDate={tempEndDate}
                  minDate={tempStartDate ? addDays(tempStartDate, 1) : new Date()}
                  placeholderText="Select check-out date"
                  className="w-full p-3 border border-black rounded-md"
                  monthsShown={1}
                  inline
                  disabled={!tempStartDate}
                  filterDate={date => !isDateBlocked(date)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-deep-green text-deep-green rounded-md hover:bg-terracotta/50 hover:text-white transition-colors duration-1000"
            >
              Cancel
            </button>

            <button
              onClick={handleApply}
              className="px-4 py-2 bg-deep-green text-white rounded-md hover:bg-terracotta transition-colors duration-1000"
              disabled={!tempStartDate || !tempEndDate}
            >
              Apply Dates
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-10 relative top-0 md:left-[-20px] left-0 w-full md:w-[1000px] h-auto md:h-[1200px] booking-form-container">
      <h3 className="text-3xl font-calluna text-deep-green mb-14 text-center">Book Your Stay</h3>

      {/* Calendar Popup - Desktop */}
      <CalendarPopup />

      {/* Calendar Popup - Mobile */}
      <MobileBookingCalendar
        property={property}
        isOpen={isCalendarOpen}
        onClose={onClose}
        onDateSelect={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
        initialStartDate={startDate}
        initialEndDate={endDate}
      />

      {detailsAutoFilled && (
        <div className="bg-off-white border border-deep-green text-deep-green p-4  animate-fade-out text-center">
          <p className="font-medium">Your booking details have been auto-filled!</p>
          <p className="text-sm mt-1">We've applied the dates and guest count you selected.</p>
        </div>
      )}

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 md:p-8 rounded-md mb-6 text-center booking-confirmation-container">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <FaCheck className="text-green-600 text-3xl" />
            </div>
          </div>
          <h4 className="text-xl font-calluna mb-2">Booking Confirmed!</h4>
          <p className="font-medium mb-2">Your booking has been successfully submitted.</p>
          <p className="text-sm text-gray-600 mb-4">A confirmation email has been sent to your email address.</p>

          {bookingNumber && (
            <div className="mb-4 p-4 bg-white border flex flex-col justify-center items-center border-green-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Your Booking Number</p>
              <div className="flex flex-col md:flex-row items-center md:relative md:right-[-40px] booking-number-container">
                <p className="text-xl font-bold font-calluna text-deep-green mb-2 md:mb-0">{bookingNumber}</p>
                <div className="md:relative md:top-0 md:right-[-200px] mt-2 md:mt-0">
                <button
                  type="button"
                  onClick={copyBookingNumber}
                  className="flex items-center gap-1 text-deep-green hover:text-terracotta transition-colors duration-300 px-3 py-1 border border-deep-green rounded-md"
                  title="Copy booking number to clipboard"
                >
                  <FaCopy />
                  <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
                </div>
              </div>
              <p className="text-sm mt-2 text-gray-600">Please save this number for your records.</p>
              <p className="text-sm mt-3 text-deep-green font-medium">
                You can access your booking details at any time by visiting the "My Bookings" page and entering your booking number and email address.
              </p>
            </div>
          )}

          <div className="flex flex-col space-y-3 mt-6">
            <Link
              to="/my-bookings"
              className="bg-deep-green text-white py-2 px-4 rounded hover:bg-terracotta transition-colors duration-300"
            >
              View My Booking
            </Link>
            <button
              onClick={() => {
                setIsSuccess(false);
                setStartDate(null);
                setEndDate(null);
                setGuests(1);
                setName("");
                setEmail("");
                setPhone("");
                setCountry("");
                setSpecialRequests("");
                setBookingNumber(null);
              }}
              className="text-deep-green underline hover:text-terracotta transition-colors duration-300"
            >
              Make Another Booking
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <label htmlFor="price" className="block text-deep-green text-xl font-calluna">Price</label>
              <span className="text-deep-green text-xl font-calluna">${property.price} / night</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 mb-4 w-full md:w-[1050px] h-full booking-form-grid">
            <div>
              <label htmlFor="check-in" className="block text-deep-green font-calluna mb-1">Check-in</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={openCalendar}
                  className={`w-full md:w-[430px] h-full p-2 border flex items-center justify-between ${errors.startDate ? 'border-red-500' : 'border-gray-300'} bg-white booking-date-button`}
                >
                  <span className={`${!startDate ? 'text-gray-400' : 'text-deep-green'}`}>
                    {startDate ? format(startDate, 'MMM dd, yyyy') : 'Select date'}
                  </span>
                  <FaCalendarAlt className="text-deep-green" />
                </button>
              </div>
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="check-out" className="block text-deep-green font-calluna mb-1">Check-out</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={openCalendar}
                  className={`w-full md:w-[470px] h-full p-2 border flex items-center justify-between ${errors.endDate ? 'border-red-500' : 'border-gray-300'} bg-white ${!startDate ? 'opacity-50 cursor-not-allowed' : ''} booking-date-button`}
                  disabled={!startDate}
                >
                  <span className={`${!endDate ? 'text-gray-400' : 'text-deep-green'}`}>
                    {endDate ? format(endDate, 'MMM dd, yyyy') : 'Select date'}
                  </span>
                  <FaCalendarAlt className="text-deep-green" />
                </button>
              </div>
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="guests" className="block text-gray-700 font-medium mb-1">Guests</label>
            <div className="relative">
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 appearance-none"
              >
                {[...Array(property.maxGuests)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
              <FaUsers className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="(123) 456-7890"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 font-medium mb-1">Country</label>
            <div className="relative">
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`w-full p-2 border appearance-none ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select your country</option>
                {getCountries().map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <FaGlobe className="absolute right-3 top-3 text-gray-400" />
            </div>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="special-requests" className="block text-gray-700 font-medium mb-1">Special Requests</label>
            <textarea
              id="special-requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full p-2 border border-gray-300"
              rows={3}
              placeholder="Any special requests or questions?"
            ></textarea>
          </div>

          {startDate && endDate && (
            <div className="mb-6 bg-gray-50 p-4">
              <div className="flex justify-between mb-2">
                <span>
                  ${property.price} x {differenceInDays(endDate, startDate)} nights
                </span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="border-t border-deep-green pt-2 mt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-deep-green hover:bg-terracotta text-white font-calluna py-3 sm:py-4 px-4 sm:px-6 transition-colors duration-1000 flex justify-center items-center text-base sm:text-lg md:text-xl booking-form-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Book Now'
            )}
          </button>
        </form>
      )}

    </div>

  );
}
