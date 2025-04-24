import { useState } from "react";
import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { FaSearch, FaTicketAlt, FaEnvelope } from "react-icons/fa";
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
        // Try to find the booking directly by booking number
        const directBooking = localStorage.getItem(`booking_${bookingNumber}`);
        if (directBooking) {
          const parsedBooking = JSON.parse(directBooking);
          if (parsedBooking.email.toLowerCase() === email.toLowerCase()) {
            setBooking(parsedBooking);
            setIsSearching(false);
            return;
          }
        }

        // Check if this email has any associated bookings
        const userBookingsKey = `user_${email.toLowerCase()}`;
        const userBookings = localStorage.getItem(userBookingsKey);
        if (userBookings) {
          const bookingNumbers = JSON.parse(userBookings);
          if (bookingNumbers.includes(bookingNumber)) {
            const bookingData = localStorage.getItem(`booking_${bookingNumber}`);
            if (bookingData) {
              setBooking(JSON.parse(bookingData));
              setIsSearching(false);
              return;
            }
          }
        }

        // Fall back to checking the full bookings list
        const savedBookings = localStorage.getItem('userBookings');
        if (savedBookings) {
          const bookings = JSON.parse(savedBookings);
          const foundBooking = bookings.find((b: Booking) =>
            b.bookingNumber.toLowerCase() === bookingNumber.toLowerCase() &&
            b.email.toLowerCase() === email.toLowerCase()
          );

          if (foundBooking) {
            setBooking(foundBooking);
            setIsSearching(false);
            return;
          }
        }

        // If not found in localStorage, check the server-side data
        // In a real app, this would all be done server-side
        const serverBooking = getBookingByNumberAndEmail(bookingNumber, email);
        if (serverBooking) {
          setBooking(serverBooking);
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
    <div className="bg-off-white min-h-screen py-24 pt-24 mt-32 my-bookings-page">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-calluna text-deep-green text-center mb-8" data-aos="fade-up" data-aos-duration="800">My Bookings</h1>

          {!booking ? (
            <div className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up" data-aos-delay="200">
              <h2 className="text-2xl font-calluna text-deep-green mb-6 text-center">Find Your Booking</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="bookingNumber" className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaTicketAlt className="mr-2 text-deep-green" />
                    Booking Number
                  </label>
                  <input
                    type="text"
                    id="bookingNumber"
                    value={bookingNumber}
                    onChange={(e) => setBookingNumber(e.target.value)}
                    className={`w-full p-3 border ${errors.bookingNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    placeholder="e.g. SIA-12345"
                  />
                  {errors.bookingNumber && <p className="text-red-500 text-sm mt-1">{errors.bookingNumber}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaEnvelope className="mr-2 text-deep-green" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    placeholder="Enter the email used for booking"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-deep-green hover:bg-terracotta text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 flex justify-center items-center"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-center">
                  <p className="font-medium">Booking not found</p>
                  <p className="text-sm mt-1">Please check your booking number and email address and try again.</p>
                </div>
              )}
            </div>
          ) : (
            <div
              className="bg-white rounded-lg shadow-md p-8"
              data-aos="fade-up"
              data-aos-delay="200"
              data-print-date={new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            >
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-calluna text-deep-green">Booking Details</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {booking.status === 'confirmed' ? 'Confirmed' : booking.status === 'pending' ? 'Pending' : 'Cancelled'}
                </span>
              </div>

              <div className="mb-6">
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-gray-600 mb-1">Booking Number</p>
                  <p className="text-xl font-bold font-calluna text-deep-green">{booking.bookingNumber}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-deep-green mb-3">Property</h3>
                    <p className="text-gray-700">{getProperty(booking.propertyId)?.name || booking.propertyId}</p>
                    <p className="text-gray-500 text-sm mt-1">{getProperty(booking.propertyId)?.location}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-deep-green mb-3">Dates</h3>
                    <p className="text-gray-700">
                      {format(new Date(booking.checkIn), "MMM d, yyyy")} - {format(new Date(booking.checkOut), "MMM d, yyyy")}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-deep-green mb-3">Guest Information</h3>
                    <p className="text-gray-700">{booking.name}</p>
                    <p className="text-gray-500 text-sm mt-1">{booking.email}</p>
                    <p className="text-gray-500 text-sm">{booking.phone}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-deep-green mb-3">Payment</h3>
                    <p className="text-gray-700 font-bold">${booking.total.toLocaleString()}</p>
                    <p className="text-gray-500 text-sm mt-1">Paid in full</p>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-deep-green mb-3">Special Requests</h3>
                    <p className="text-gray-700">{booking.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6 flex justify-between">
                <button
                  onClick={() => {
                    setBooking(null);
                    setBookingNumber("");
                    setEmail("");
                  }}
                  className="text-deep-green hover:text-terracotta transition-colors duration-300"
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
                  className="bg-deep-green hover:bg-terracotta text-white font-medium py-2 px-4 rounded transition-colors duration-300"
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
