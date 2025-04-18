export interface Booking {
  id: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  createdAt: string;
}

// In a real application, this would be stored in a database
export const bookings: Booking[] = [];

export function createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const newBooking: Booking = {
    ...booking,
    id: Math.random().toString(36).substring(2, 15),
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  return newBooking;
}

export function getBookingsByPropertyId(propertyId: string): Booking[] {
  return bookings.filter(booking => booking.propertyId === propertyId);
}

export function isPropertyAvailable(
  propertyId: string,
  checkIn: string,
  checkOut: string
): boolean {
  const propertyBookings = getBookingsByPropertyId(propertyId);
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  // Check if there's any overlap with existing bookings
  return !propertyBookings.some(booking => {
    const bookingCheckIn = new Date(booking.checkIn);
    const bookingCheckOut = new Date(booking.checkOut);
    
    // Check if the dates overlap
    return (
      (checkInDate >= bookingCheckIn && checkInDate < bookingCheckOut) ||
      (checkOutDate > bookingCheckIn && checkOutDate <= bookingCheckOut) ||
      (checkInDate <= bookingCheckIn && checkOutDate >= bookingCheckOut)
    );
  });
}
