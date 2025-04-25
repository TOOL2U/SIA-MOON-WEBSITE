import { useState } from "react";
import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { FaSearch, FaTicketAlt, FaEnvelope, FaCopy } from "~/utils/icons";
import { getBookingByNumberAndEmail } from "~/data/bookings";
import type { Booking } from "~/data/bookings";
import { getProperty } from "~/models/property";
import { format } from "date-fns";

export const meta: MetaFunction = () => {
  return [
    { title: "My Bookings | Sia Moon" },
    { name: "description", content: "View and manage your bookings at Sia Moon properties." },
  ];
};

export default function MyBookings() {
  const [bookingNumber, setBookingNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Function to copy booking number to clipboard
  const copyBookingNumber = (bookingNumber: string) => {
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
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bookingNumber.trim()) newErrors.bookingNumber = "Booking number is required";
    if (!email.trim()) newErrors.email = "Email is required";
    // Simple email validation - just check for @ and .
    else if (!email.includes('@') || !email.includes('.')) newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSearching(true);
    setNotFound(false);
    setBooking(null);

    // Simulate API call with a delay
    setTimeout(() => {
      // First check localStorage for bookings (this is just for demo purposes)
      // In a real app, this would be a server-side check
      try {
        // 1. Try to find the booking directly by booking number (primary method)
        const directBooking = localStorage.getItem(`booking_${bookingNumber}`);
        if (directBooking) {
          try {
            const parsedBooking = JSON.parse(directBooking);
            if (parsedBooking.email.toLowerCase() === email.toLowerCase()) {
              setBooking(parsedBooking);
              setIsSearching(false);

              // Store this successful lookup to improve future searches
              try {
                const recentLookups = JSON.parse(localStorage.getItem('recentBookingLookups') || '[]');
                if (!recentLookups.includes(bookingNumber)) {
                  recentLookups.unshift(bookingNumber);
                  // Keep only the 10 most recent lookups
                  if (recentLookups.length > 10) recentLookups.pop();
                  localStorage.setItem('recentBookingLookups', JSON.stringify(recentLookups));
                }
              } catch (e) {
                console.error("Error storing recent lookup:", e);
              }

              return;
            }
          } catch (parseError) {
            console.error("Error parsing booking data:", parseError);
            // Continue to other methods if parsing fails
          }
        }

        // 2. Check if this email has any associated bookings
        const userBookingsKey = `user_${email.toLowerCase()}`;
        const userBookings = localStorage.getItem(userBookingsKey);
        if (userBookings) {
          try {
            const bookingNumbers = JSON.parse(userBookings);
            if (bookingNumbers.includes(bookingNumber)) {
              const bookingData = localStorage.getItem(`booking_${bookingNumber}`);
              if (bookingData) {
                setBooking(JSON.parse(bookingData));
                setIsSearching(false);
                return;
              }
            }
          } catch (parseError) {
            console.error("Error parsing user bookings:", parseError);
            // Continue to other methods if parsing fails
          }
        }

        // 3. Check for emergency backup storage
        const emergencyBooking = localStorage.getItem(`booking_emergency_${bookingNumber}`);
        if (emergencyBooking) {
          try {
            const parsedBooking = JSON.parse(emergencyBooking);
            if (parsedBooking.email.toLowerCase() === email.toLowerCase()) {
              setBooking(parsedBooking);

              // Restore the primary storage since we found it in emergency backup
              localStorage.setItem(`booking_${bookingNumber}`, emergencyBooking);

              setIsSearching(false);
              return;
            }
          } catch (parseError) {
            console.error("Error parsing emergency booking data:", parseError);
          }
        }

        // 4. Check for timestamped backups
        const allKeys = Object.keys(localStorage);
        const backupKeys = allKeys.filter(key =>
          key.startsWith(`booking_backup_${bookingNumber}_`)
        );

        if (backupKeys.length > 0) {
          // Sort by timestamp (newest first)
          backupKeys.sort().reverse();

          for (const key of backupKeys) {
            try {
              const backupData = localStorage.getItem(key);
              if (backupData) {
                const parsedBooking = JSON.parse(backupData);
                if (parsedBooking.email.toLowerCase() === email.toLowerCase()) {
                  setBooking(parsedBooking);

                  // Restore the primary storage since we found it in backup
                  localStorage.setItem(`booking_${bookingNumber}`, backupData);

                  setIsSearching(false);
                  return;
                }
              }
            } catch (parseError) {
              console.error(`Error parsing backup booking data from ${key}:`, parseError);
              // Try the next backup
            }
          }
        }

        // 5. Fall back to checking the full bookings list
        const savedBookings = localStorage.getItem('userBookings');
        if (savedBookings) {
          try {
            const bookings = JSON.parse(savedBookings);
            const foundBooking = bookings.find((b: Booking) =>
              b.bookingNumber.toLowerCase() === bookingNumber.toLowerCase() &&
              b.email.toLowerCase() === email.toLowerCase()
            );

            if (foundBooking) {
              setBooking(foundBooking);

              // Restore the primary storage since we found it in the full list
              localStorage.setItem(`booking_${bookingNumber}`, JSON.stringify(foundBooking));

              setIsSearching(false);
              return;
            }
          } catch (parseError) {
            console.error("Error parsing saved bookings:", parseError);
          }
        }

        // 6. If not found in localStorage, check the server-side data
        // In a real app, this would all be done server-side
        const serverBooking = getBookingByNumberAndEmail(bookingNumber, email);
        if (serverBooking) {
          setBooking(serverBooking);

          // Store this server booking in localStorage for future access
          localStorage.setItem(`booking_${serverBooking.bookingNumber}`, JSON.stringify(serverBooking));

          // Also update the email mapping
          try {
            const userBookingsKey = `user_${email.toLowerCase()}`;
            const userBookings = JSON.parse(localStorage.getItem(userBookingsKey) || '[]');
            if (!userBookings.includes(serverBooking.bookingNumber)) {
              userBookings.push(serverBooking.bookingNumber);
              localStorage.setItem(userBookingsKey, JSON.stringify(userBookings));
            }
          } catch (e) {
            console.error("Error updating user bookings mapping:", e);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error searching for booking:", error);
        setNotFound(true);
      }

      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="bg-off-white min-h-screen py-16 sm:py-20 md:py-24 pt-16 sm:pt-20 md:pt-24 mt-24 sm:mt-28 md:mt-32 my-bookings-page">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-calluna text-deep-green text-center mb-6 sm:mb-8" data-aos="fade-up" data-aos-duration="800">My Bookings</h1>

          {!booking ? (
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8" data-aos="fade-up" data-aos-delay="200">
              <h2 className="text-xl sm:text-2xl font-calluna text-deep-green mb-3 sm:mb-4 text-center">Find Your Booking</h2>

              <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
                Enter your booking number and email address to access your booking details at any time.
                <br className="hidden sm:block" />
                All bookings are securely stored and will remain accessible for future reference.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="bookingNumber" className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 flex items-center">
                    <FaTicketAlt className="mr-2 text-deep-green" />
                    Booking Number
                  </label>
                  <input
                    type="text"
                    id="bookingNumber"
                    value={bookingNumber}
                    onChange={(e) => setBookingNumber(e.target.value)}
                    className={`w-full p-2 sm:p-3 border text-sm sm:text-base ${errors.bookingNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    placeholder="e.g. SIA-12345"
                  />
                  {errors.bookingNumber && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.bookingNumber}</p>}
                </div>

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="email" className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 flex items-center">
                    <FaEnvelope className="mr-2 text-deep-green" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-2 sm:p-3 border text-sm sm:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    placeholder="Enter the email used for booking"
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-deep-green hover:bg-terracotta text-white font-medium py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-md transition-colors duration-300 flex justify-center items-center"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch className="mr-2" />
                      Find My Booking
                    </>
                  )}
                </button>
              </form>

              {notFound && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-center">
                  <p className="font-medium text-sm sm:text-base">Booking not found</p>
                  <p className="text-xs sm:text-sm mt-1">Please check your booking number and email address and try again.</p>
                </div>
              )}
            </div>
          ) : (
            <div
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8"
              data-aos="fade-up"
              data-aos-delay="200"
              data-print-date={new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
                <h2 className="text-xl sm:text-2xl font-calluna text-deep-green mb-2 sm:mb-0">Booking Details</h2>
                <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {booking.status === 'confirmed' ? 'Confirmed' : booking.status === 'pending' ? 'Pending' : 'Cancelled'}
                </span>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-md mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Booking Number</p>
                  <div className="flex items-center justify-between">
                    <p className="text-base sm:text-xl font-bold font-calluna text-deep-green">{booking.bookingNumber}</p>
                    <button
                      type="button"
                      onClick={() => copyBookingNumber(booking.bookingNumber)}
                      className="flex items-center gap-1 text-deep-green hover:text-terracotta transition-colors duration-300 px-2 sm:px-3 py-1 border border-deep-green rounded-md text-xs sm:text-sm"
                      title="Copy booking number to clipboard"
                    >
                      <FaCopy />
                      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-deep-green mb-2 sm:mb-3">Property</h3>
                    <p className="text-gray-700 text-sm sm:text-base">{getProperty(booking.propertyId)?.name || booking.propertyId}</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">{getProperty(booking.propertyId)?.location}</p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-deep-green mb-2 sm:mb-3">Dates</h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {format(new Date(booking.checkIn), "MMM d, yyyy")} - {format(new Date(booking.checkOut), "MMM d, yyyy")}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-deep-green mb-2 sm:mb-3">Guest Information</h3>
                    <p className="text-gray-700 text-sm sm:text-base">{booking.name}</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">{booking.email}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{booking.phone}</p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-deep-green mb-2 sm:mb-3">Payment</h3>
                    <p className="text-gray-700 font-bold text-sm sm:text-base">${booking.total.toLocaleString()}</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">Paid in full</p>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-medium text-deep-green mb-2 sm:mb-3">Special Requests</h3>
                    <p className="text-gray-700 text-sm sm:text-base">{booking.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 sm:pt-6 mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <button
                  onClick={() => {
                    setBooking(null);
                    setBookingNumber("");
                    setEmail("");
                  }}
                  className="text-deep-green hover:text-terracotta transition-colors duration-300 text-sm sm:text-base"
                >
                  ← Back to search
                </button>

                <button
                  onClick={() => {
                    // Set up print-specific styles before printing
                    const originalTitle = document.title;
                    document.title = `Booking ${booking.bookingNumber} - Sia Moon`;

                    // Print the page
                    window.print();

                    // Reset the title after printing
                    setTimeout(() => {
                      document.title = originalTitle;
                    }, 100);
                  }}
                  className="bg-deep-green hover:bg-terracotta text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition-colors duration-300 w-full sm:w-auto"
                >
                  Print Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
