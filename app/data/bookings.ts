export interface Booking {
  id: string;
  bookingNumber: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
  createdAt: string;
  total: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// In a real application, this would be stored in a database
export const bookings: Booking[] = [
  // Sample bookings for testing availability calendar
  {
    id: '1',
    bookingNumber: 'SIA-12345',
    propertyId: 'alesia-house',
    checkIn: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString(),
    checkOut: new Date(new Date().getFullYear(), new Date().getMonth(), 20).toISOString(),
    guests: 2,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    country: 'US',
    createdAt: new Date().toISOString(),
    total: 6000,
    status: 'confirmed'
  },
  {
    id: '2',
    bookingNumber: 'SIA-23456',
    propertyId: 'alesia-house',
    checkIn: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(),
    checkOut: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10).toISOString(),
    guests: 4,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    country: 'UK',
    createdAt: new Date().toISOString(),
    total: 6000,
    status: 'confirmed'
  }
];

// Generate a unique booking number (format: SIA-XXXXX)
function generateBookingNumber(): string {
  const prefix = 'SIA';
  const randomDigits = Math.floor(10000 + Math.random() * 90000); // 5-digit number
  return `${prefix}-${randomDigits}`;
}

export function createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'bookingNumber' | 'status'>): Booking {
  const newBooking: Booking = {
    ...booking,
    id: Math.random().toString(36).substring(2, 15),
    bookingNumber: generateBookingNumber(),
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };

  bookings.push(newBooking);
  return newBooking;
}

export function getBookingsByPropertyId(propertyId: string): Booking[] {
  return bookings.filter(booking => booking.propertyId === propertyId);
}

export function getBookingByNumberAndEmail(bookingNumber: string, email: string): Booking | undefined {
  return bookings.find(booking =>
    booking.bookingNumber.toLowerCase() === bookingNumber.toLowerCase() &&
    booking.email.toLowerCase() === email.toLowerCase()
  );
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
