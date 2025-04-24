import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { addMonths, eachDayOfInterval, isSameDay, format } from "date-fns";
import { isPropertyAvailable } from "~/data/bookings";
import type { Property } from "~/models/property";

import "react-datepicker/dist/react-datepicker.css";

interface AvailabilityCalendarProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onDateSelect?: (startDate: Date, endDate: Date) => void;
}

export default function AvailabilityCalendar({ 
  property, 
  isOpen, 
  onClose,
  onDateSelect 
}: AvailabilityCalendarProps) {
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
        const isAvailable = isPropertyAvailable(property.id, dateStr, nextDayStr);
        
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
    if (startDate && endDate && onDateSelect) {
      onDateSelect(startDate, endDate);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Calendar container */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full mx-4 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-deep-green transition-colors"
          aria-label="Close calendar"
        >
          <FaTimes size={20} />
        </button>
        
        <h2 className="text-2xl font-calluna text-deep-green mb-4 text-center">
          Check Availability
        </h2>
        
        <p className="text-gray-600 mb-6 text-center">
          Select your check-in and check-out dates to see availability for {property.name}
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-green"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-calluna mb-2">Check-in Date</label>
                <div className="relative">
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
                    className="w-full p-3 border border-gray-300 rounded-md"
                    monthsShown={2}
                    inline
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-calluna mb-2">Check-out Date</label>
                <div className="relative">
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
                    className="w-full p-3 border border-gray-300 rounded-md"
                    monthsShown={2}
                    inline
                    disabled={!startDate}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-deep-green rounded-full"></div>
                <span className="text-sm text-gray-600">Available</span>
                
                <div className="w-4 h-4 bg-gray-300 rounded-full ml-4"></div>
                <span className="text-sm text-gray-600">Unavailable</span>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-deep-green text-deep-green rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleApply}
                  className="px-4 py-2 bg-deep-green text-white rounded-md hover:bg-terracotta transition-colors"
                  disabled={!startDate || !endDate}
                >
                  Apply Dates
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
