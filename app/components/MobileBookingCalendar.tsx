import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { FaTimes } from "~/utils/icons";
import { addDays, format } from "date-fns";
import type { Property } from "~/models/property";
import { isPropertyAvailable } from "~/data/bookings";
import { isDateRangeBlocked } from "~/data/blockedDates";

import "react-datepicker/dist/react-datepicker.css";

interface MobileBookingCalendarProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (startDate: Date, endDate: Date) => void;
  initialStartDate: Date | null;
  initialEndDate: Date | null;
}

export default function MobileBookingCalendar({
  property,
  isOpen,
  onClose,
  onDateSelect,
  initialStartDate,
  initialEndDate
}: MobileBookingCalendarProps) {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  // Reset dates when the component opens
  useEffect(() => {
    if (isOpen) {
      setStartDate(initialStartDate);
      setEndDate(initialEndDate);
    }
  }, [isOpen, initialStartDate, initialEndDate]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onDateSelect(startDate, endDate);
      onClose();
    }
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`mobile-calendar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      ></div>

      {/* Mobile Calendar Dropdown */}
      <div className={`mobile-calendar-dropdown mobile-booking-calendar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-calendar-dropdown-header">
          <div className="mobile-calendar-dropdown-title text-white text-lg font-calluna">Select Dates</div>
          <button
            className="mobile-calendar-dropdown-close"
            onClick={onClose}
            aria-label="Close calendar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mobile-calendar-dropdown-content">
          <div className="mb-4 relative text-center">
            <div className="text-lg font-calluna text-black mb-1">Check-in Date</div>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              placeholderText="Select check-in date"
              className="w-full p-2 border border-gray-300 rounded-md"
              monthsShown={1}
              inline
              filterDate={date => !isDateBlocked(date)}
            />
          </div>

          {startDate && (
            <div className="mb-4 relative text-center">
              <div className="text-lg font-calluna text-black mb-1">Check-out Date</div>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ? addDays(startDate, 1) : new Date()}
                placeholderText="Select check-out date"
                className="w-full p-2 border border-gray-300 rounded-md"
                monthsShown={1}
                inline
                disabled={!startDate}
                filterDate={date => !isDateBlocked(date)}
              />
            </div>
          )}
        </div>

        <div className="mobile-calendar-dropdown-buttons">
          <button
            onClick={onClose}
            className="mobile-calendar-dropdown-button mobile-calendar-dropdown-button-cancel"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            className="mobile-calendar-dropdown-button mobile-calendar-dropdown-button-apply"
            disabled={!startDate || !endDate}
          >
            Apply Dates
          </button>
        </div>
      </div>
    </>
  );
}
