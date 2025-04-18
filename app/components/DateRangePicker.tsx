import { useState, useEffect } from 'react';

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  disabledDates?: string[];
}

export default function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  disabledDates = []
}: DateRangePickerProps) {
  const [minCheckOutDate, setMinCheckOutDate] = useState<string>('');

  // Format date to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Get tomorrow's date
  const getTomorrow = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  };

  // Set minimum check-in date to today
  const today = formatDate(new Date());
  
  // Update minimum check-out date when check-in changes
  useEffect(() => {
    if (checkIn) {
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setMinCheckOutDate(formatDate(nextDay));
      
      // If check-out is before new min date, update it
      if (checkOut && new Date(checkOut) <= new Date(checkIn)) {
        onCheckOutChange(formatDate(nextDay));
      }
    } else {
      setMinCheckOutDate(getTomorrow());
    }
  }, [checkIn, checkOut, onCheckOutChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="check-in" className="block text-gray-700 mb-1">
          Check-in Date
        </label>
        <input
          type="date"
          id="check-in"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
          min={today}
          value={checkIn}
          onChange={(e) => onCheckInChange(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="check-out" className="block text-gray-700 mb-1">
          Check-out Date
        </label>
        <input
          type="date"
          id="check-out"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
          min={minCheckOutDate}
          value={checkOut}
          onChange={(e) => onCheckOutChange(e.target.value)}
          disabled={!checkIn}
        />
      </div>
    </div>
  );
}
