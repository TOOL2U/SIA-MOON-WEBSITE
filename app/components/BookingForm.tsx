import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays, differenceInDays } from "date-fns";
import { FaCalendarAlt, FaUsers, FaGlobe, FaCheck } from "react-icons/fa";
import { Link } from "@remix-run/react";
import type { Property } from "~/models/property";
import { getCountries } from "~/data/countries";
import { createBooking } from "~/data/bookings";
import { sendBookingToMakeWebhook } from "~/utils/webhooks";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State to track if booking details were auto-filled
  const [detailsAutoFilled, setDetailsAutoFilled] = useState(false);

  // Load booking details from localStorage when component mounts
  useEffect(() => {
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
            }

            // Set the auto-filled flag if any data was applied
            if (wasAutoFilled) {
              setDetailsAutoFilled(true);

              // Hide the auto-filled notification after 5 seconds
              setTimeout(() => {
                setDetailsAutoFilled(false);
              }, 5000);
            }

            // Clear localStorage after using the data
            localStorage.removeItem('bookingDetails');
          }
        }
      } catch (error) {
        console.error('Error loading booking details:', error);
      }
    }
  }, [property.id, property.maxGuests]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(addDays(date, 1));
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;

    const nights = differenceInDays(endDate, startDate);
    return nights * property.price;
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
          const savedBookings = localStorage.getItem('userBookings') || '[]';
          const bookings = JSON.parse(savedBookings);
          bookings.push(newBooking);
          localStorage.setItem('userBookings', JSON.stringify(bookings));

          // Also store the individual booking by its booking number for easy lookup
          localStorage.setItem(`booking_${newBooking.bookingNumber}`, JSON.stringify(newBooking));

          // Store a mapping of email to booking numbers for this user
          const userBookingsKey = `user_${email.toLowerCase()}`;
          const userBookings = JSON.parse(localStorage.getItem(userBookingsKey) || '[]');
          userBookings.push(newBooking.bookingNumber);
          localStorage.setItem(userBookingsKey, JSON.stringify(userBookings));

          console.log('Booking stored successfully:', newBooking.bookingNumber);

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
              customerPhone: newBooking.phone
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

  return (
    <div className="pb-10 relative top-0 left-[-300px]  w-[1000px] h-[1200px]">
      <h3 className="text-3xl font-calluna text-deep-green mb-14 text-center">Book Your Stay</h3>

      {detailsAutoFilled && (
        <div className="bg-off-white border border-deep-green text-deep-green p-4 mb-6 animate-fade-out text-center">
          <p className="font-medium">Your booking details have been auto-filled!</p>
          <p className="text-sm mt-1">We've applied the dates and guest count you selected.</p>
        </div>
      )}

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-md mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <FaCheck className="text-green-600 text-3xl" />
            </div>
          </div>
          <h4 className="text-xl font-calluna mb-2">Booking Confirmed!</h4>
          <p className="font-medium mb-2">Your booking has been successfully submitted.</p>
          <p className="text-sm text-gray-600 mb-4">A confirmation email has been sent to your email address.</p>

          {bookingNumber && (
            <div className="mb-4 p-4 bg-white border border-green-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Your Booking Number</p>
              <p className="text-xl font-bold font-calluna text-deep-green">{bookingNumber}</p>
              <p className="text-sm mt-2 text-gray-600">Please save this number for your records.</p>
            </div>
          )}

          <div className="flex flex-col space-y-3 mt-6">
            <Link
              to="/my-bookings"
              className="bg-deep-green text-white py-2 px-4 rounded hover:bg-terracotta transition-colors duration-1000"
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
              className="text-deep-green underline hover:text-terracotta transition-colors duration-1000"
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

          <div className="grid grid-cols-2 gap-0 mb-4 w-[1050px] h-full">
            <div>
              <label htmlFor="check-in" className="block text-deep-green font-calluna mb-1">Check-in</label>
              <div className="relative">
                <DatePicker
                  id="check-in"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  placeholderText="Select date"
                  className={`w-[430px] h-full p-2 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FaCalendarAlt className="absolute right-16 top-3 text-deep-green" />
              </div>
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="check-out" className="block text-deep-green font-calluna mb-1">Check-out</label>
              <div className="relative">
                <DatePicker
                  id="check-out"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate ? addDays(startDate, 1) : new Date()}
                  placeholderText="Select date"
                  className={`w-[430px] h-full p-2 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FaCalendarAlt className="absolute right-16 top-3 text-deep-green" />
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
            className="w-full bg-deep-green hover:bg-terracotta text-white font-calluna py-4 px-6 transition-colors duration-1000 flex justify-center items-center text-xl"
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
