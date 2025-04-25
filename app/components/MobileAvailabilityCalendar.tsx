import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaTimes } from "~/utils/icons";
import { addMonths, eachDayOfInterval, isSameDay, format } from "date-fns";
import { isPropertyAvailable } from "~/data/bookings";
import { isDateRangeBlocked } from "~/data/blockedDates";
import type { Property } from "~/models/property";

import "react-datepicker/dist/react-datepicker.css";

interface MobileAvailabilityCalendarProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onDateSelect?: (startDate: Date, endDate: Date) => void;
}

export default function MobileAvailabilityCalendar({
  property,
  isOpen,
  onClose,
  onDateSelect
}: MobileAvailabilityCalendarProps) {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate available and unavailable dates
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);

      // Generate dates for the next 6 months
      const today = new Date();
      const sixMonthsLater = addMonths(today, 6);

      // Create an array of all dates in the range
      const dateRange = eachDayOfInterval({
        start: today,
        end: sixMonthsLater
      });

      const available: Date[] = [];
      const unavailable: Date[] = [];

      // Check each date for availability
      dateRange.forEach(date => {
        // Format date to ISO string for the isPropertyAvailable function
        const dateStr = date.toISOString();
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        const nextDayStr = nextDay.toISOString();

        // Check if the property is available for a one-night stay on this date
        // First check if there are any bookings that overlap with this date
        const isAvailableForBooking = isPropertyAvailable(property.id, dateStr, nextDayStr);

        // Then check if there are any manually blocked dates that overlap with this date
        const isBlocked = isDateRangeBlocked(property.id, dateStr, nextDayStr);

        // The date is available only if it's available for booking AND not manually blocked
        const isAvailable = isAvailableForBooking && !isBlocked;

        if (isAvailable) {
          available.push(date);
        } else {
          unavailable.push(date);
        }
      });

      setAvailableDates(available);
      setUnavailableDates(unavailable);
      setIsLoading(false);
    }
  }, [isOpen, property.id]);

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
      // Store the selected dates in localStorage for the booking form to use
      const bookingDetails = {
        propertyId: property.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      // First remove any existing booking details to ensure the event is triggered
      localStorage.removeItem('bookingDetails');

      // Then set the new booking details
      localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

      // Also dispatch a custom event to notify components that may not catch the storage event
      window.dispatchEvent(new CustomEvent('bookingDetailsUpdated', {
        detail: bookingDetails
      }));

      // Call the onDateSelect callback if provided
      if (onDateSelect) {
        onDateSelect(startDate, endDate);
      }

      onClose();
    }
  };

  // Custom day rendering to highlight available/unavailable dates
  const renderDayContents = (day: number, date: Date) => {
    const isUnavailable = unavailableDates.some(unavailableDate =>
      isSameDay(unavailableDate, date)
    );

    return (
      <div
        className={`
          w-full h-full flex items-center justify-center
          ${isUnavailable ? 'text-gray-300 line-through' : 'text-deep-green'}
        `}
      >
        {day}
      </div>
    );
  };

  // Filter out unavailable dates
  const filterDate = (date: Date) => {
    return !unavailableDates.some(unavailableDate =>
      isSameDay(unavailableDate, date)
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`mobile-availability-calendar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      ></div>

      {/* Mobile Calendar Dropdown */}
      <div className={`mobile-availability-calendar-dropdown mobile-availability-calendar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-availability-calendar-dropdown-header">
          <div className="mobile-availability-calendar-dropdown-title">Check Availability</div>
          <button
            className="mobile-availability-calendar-dropdown-close"
            onClick={onClose}
            aria-label="Close calendar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mobile-availability-calendar-dropdown-content">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-deep-green"></div>
            </div>
          ) : (
            <>
              <div className="mb-4 text-center">
                <div className="text-lg font-calluna text-black mb-1">Check-in Date</div>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  filterDate={filterDate}
                  renderDayContents={renderDayContents}
                  placeholderText="Select check-in date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  monthsShown={1}
                  inline
                />
              </div>

              {startDate && (
                <div className="mb-4 text-center">
                  <div className="text-lg font-calluna text-black mb-1">Check-out Date</div>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    filterDate={filterDate}
                    renderDayContents={renderDayContents}
                    placeholderText="Select check-out date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    monthsShown={1}
                    inline
                    disabled={!startDate}
                  />
                </div>
              )}

              <div className="flex items-center justify-center space-x-4 mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-deep-green rounded-full mr-1"></div>
                  <span className="text-xs text-gray-600">Available</span>
                </div>

                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-600">Unavailable</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mobile-availability-calendar-dropdown-buttons">
          <button
            onClick={onClose}
            className="mobile-availability-calendar-dropdown-button mobile-availability-calendar-dropdown-button-cancel"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            className="mobile-availability-calendar-dropdown-button mobile-availability-calendar-dropdown-button-apply"
            disabled={!startDate || !endDate}
          >
            Apply Dates
          </button>
        </div>
      </div>
    </>
  );
}
