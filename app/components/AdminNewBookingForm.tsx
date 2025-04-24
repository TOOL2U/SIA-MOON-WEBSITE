import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaUsers, FaGlobe, FaUser, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";
import { createBooking } from "~/data/bookings";
import { getCountries } from "~/data/countries";
import { getProperties } from "~/models/property";
import { differenceInDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

interface AdminNewBookingFormProps {
  onClose: () => void;
  onBookingCreated: () => void;
}

export default function AdminNewBookingForm({ onClose, onBookingCreated }: AdminNewBookingFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [status, setStatus] = useState<"confirmed" | "pending" | "cancelled">("confirmed");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const properties = getProperties();

  const calculateTotal = () => {
    if (!startDate || !endDate || !propertyId) return 0;

    const property = properties.find(p => p.id === propertyId);
    if (!property) return 0;

    const nights = differenceInDays(endDate, startDate);
    return nights * property.price;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!propertyId) newErrors.propertyId = "Property is required";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const total = calculateTotal();
      const newBooking = createBooking({
        propertyId,
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

      // Store booking in localStorage for persistence
      try {
        // 1. Store in the main bookings collection
        const savedBookings = localStorage.getItem('userBookings') || '[]';
        const bookings = JSON.parse(savedBookings);
        bookings.push(newBooking);
        localStorage.setItem('userBookings', JSON.stringify(bookings));

        // 2. Store the individual booking by its booking number for easy lookup
        localStorage.setItem(`booking_${newBooking.bookingNumber}`, JSON.stringify(newBooking));

        // 3. Store a mapping of email to booking numbers for this user
        const userBookingsKey = `user_${email.toLowerCase()}`;
        const userBookings = JSON.parse(localStorage.getItem(userBookingsKey) || '[]');
        userBookings.push(newBooking.bookingNumber);
        localStorage.setItem(userBookingsKey, JSON.stringify(userBookings));

        // 4. Store a backup copy with a timestamp
        const timestamp = new Date().getTime();
        localStorage.setItem(`booking_backup_${newBooking.bookingNumber}_${timestamp}`, JSON.stringify(newBooking));

        console.log('Booking created successfully:', newBooking.bookingNumber);
        
        // Notify parent component that booking was created
        onBookingCreated();
        onClose();
      } catch (error) {
        console.error('Error storing booking:', error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center transition-opacity duration-500 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full mx-4 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-deep-green transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-calluna text-deep-green mb-6">Create New Booking</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="property" className="block text-gray-700 font-medium mb-2">Property</label>
            <select
              id="property"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className={`w-full p-3 border ${errors.propertyId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            >
              <option value="">Select a property</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name} - ${property.price}/night
                </option>
              ))}
            </select>
            {errors.propertyId && <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-deep-green" />
                Check-in Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  if (date && endDate && date > endDate) {
                    setEndDate(null);
                  }
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholderText="Select check-in date"
                className={`w-full p-3 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-deep-green" />
                Check-out Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ? new Date(startDate.getTime() + 86400000) : new Date()}
                placeholderText="Select check-out date"
                className={`w-full p-3 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                disabled={!startDate}
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaUser className="mr-2 text-deep-green" />
                Guest Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaEnvelope className="mr-2 text-deep-green" />
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaPhone className="mr-2 text-deep-green" />
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="(123) 456-7890"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="country" className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaGlobe className="mr-2 text-deep-green" />
                Country
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`w-full p-3 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              >
                <option value="">Select country</option>
                {getCountries().map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="guests" className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaUsers className="mr-2 text-deep-green" />
                Guests
              </label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                min="1"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Booking Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as "confirmed" | "pending" | "cancelled")}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="special-requests" className="block text-gray-700 font-medium mb-2">Special Requests</label>
            <textarea
              id="special-requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Any special requests or notes"
            ></textarea>
          </div>

          {startDate && endDate && propertyId && (
            <div className="mb-6 bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span>
                  ${properties.find(p => p.id === propertyId)?.price} x {differenceInDays(endDate, startDate)} nights
                </span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="border-t border-deep-green pt-2 mt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-deep-green text-deep-green rounded-md hover:bg-terracotta hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-deep-green text-white rounded-md hover:bg-terracotta transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Booking...
                </>
              ) : (
                "Create Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
