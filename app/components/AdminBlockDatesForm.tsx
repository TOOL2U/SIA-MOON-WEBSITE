import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { addDays } from "date-fns";
import { addBlockedDate, removeBlockedDate, getAllBlockedDates } from "~/data/blockedDates";
import { getProperties } from "~/models/property";

import "react-datepicker/dist/react-datepicker.css";

interface AdminBlockDatesFormProps {
  onClose: () => void;
  onDatesBlocked: () => void;
}

export default function AdminBlockDatesForm({ onClose, onDatesBlocked }: AdminBlockDatesFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [propertyId, setPropertyId] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const properties = getProperties();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!propertyId) newErrors.propertyId = "Property is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (!reason.trim()) newErrors.reason = "Reason is required";

    // Validate that start date is before end date
    if (startDate && endDate && startDate >= endDate) {
      newErrors.endDate = "End date must be after start date";
    }

    // Validate that start date is not in the past
    if (startDate && startDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      newErrors.startDate = "Start date cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Add the blocked date range
      addBlockedDate({
        propertyId,
        startDate: startDate!.toISOString(),
        endDate: endDate!.toISOString(),
        reason,
        isManualBlock: true
      });

      // Notify parent component
      onDatesBlocked();
      onClose();
    } catch (error) {
      console.error('Error blocking dates:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center transition-opacity duration-500 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-deep-green transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-calluna text-deep-green mb-6">Block Dates</h2>

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
                  {property.name}
                </option>
              ))}
            </select>
            {errors.propertyId && <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-deep-green" />
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  if (date && endDate && date > endDate) {
                    setEndDate(addDays(date, 1));
                  }
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholderText="Select start date"
                className={`w-full p-3 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-deep-green" />
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ? addDays(startDate, 1) : new Date()}
                placeholderText="Select end date"
                className={`w-full p-3 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                disabled={!startDate}
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">Reason for Blocking</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`w-full p-3 border ${errors.reason ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              rows={3}
              placeholder="Enter reason for blocking these dates (e.g., maintenance, personal use, etc.)"
            ></textarea>
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
          </div>

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
                  Blocking Dates...
                </>
              ) : (
                "Block Dates"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
