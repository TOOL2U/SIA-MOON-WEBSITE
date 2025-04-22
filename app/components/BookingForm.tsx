import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays, differenceInDays } from "date-fns";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import type { Property } from "~/models/property";

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
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

    // Simulate API call
    setTimeout(() => {
      console.log({
        property: property.id,
        startDate,
        endDate,
        guests,
        name,
        email,
        phone,
        specialRequests,
        total: calculateTotal()
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setStartDate(null);
        setEndDate(null);
        setGuests(1);
        setName("");
        setEmail("");
        setPhone("");
        setSpecialRequests("");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 sticky top-24">
      <h3 className="text-3xl font-arioso text-deep-green mb-6 text-center">Book Your Stay</h3>

      {detailsAutoFilled && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-md mb-6 animate-fade-out text-center">
          <p className="font-medium">Your booking details have been auto-filled!</p>
          <p className="text-sm mt-1">We've applied the dates and guest count you selected.</p>
        </div>
      )}

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6 text-center">
          <p className="font-medium">Booking request submitted successfully!</p>
          <p className="text-sm mt-1">We'll contact you shortly to confirm your reservation.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <label htmlFor="price" className="block text-gray-700 font-medium">Price</label>
              <span className="text-deep-green font-bold">${property.price} / night</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="check-in" className="block text-gray-700 font-medium mb-1">Check-in</label>
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
                  className={`w-full p-2 border rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
              </div>
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="check-out" className="block text-gray-700 font-medium mb-1">Check-out</label>
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
                  className={`w-full p-2 border rounded-md ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
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
                className="w-full p-2 border border-gray-300 rounded-md appearance-none"
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
              className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="(123) 456-7890"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="special-requests" className="block text-gray-700 font-medium mb-1">Special Requests</label>
            <textarea
              id="special-requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Any special requests or questions?"
            ></textarea>
          </div>

          {startDate && endDate && (
            <div className="mb-6 bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span>
                  ${property.price} x {differenceInDays(endDate, startDate)} nights
                </span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-deep-green hover:bg-terracotta text-white font-medium py-4 px-6 rounded-md transition-colors duration-300 flex justify-center items-center text-lg"
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
