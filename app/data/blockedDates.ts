export interface BlockedDate {
  id: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  reason: string;
  isManualBlock: boolean;
  createdAt: string;
}

// In a real application, this would be stored in a database
export const blockedDates: BlockedDate[] = [];

/**
 * Generate a unique ID for a blocked date
 */
function generateBlockedDateId(): string {
  const timestamp = new Date().getTime();
  const randomComponent = Math.random().toString(36).substring(2, 10);
  return `block-${timestamp}-${randomComponent}`;
}

/**
 * Add a new blocked date range
 */
export function addBlockedDate(blockedDate: Omit<BlockedDate, 'id' | 'createdAt'>): BlockedDate {
  const newBlockedDate: BlockedDate = {
    ...blockedDate,
    id: generateBlockedDateId(),
    createdAt: new Date().toISOString()
  };

  // Add to the in-memory array (this would be a database in a real app)
  blockedDates.push(newBlockedDate);

  // Also store in localStorage for persistence
  try {
    const savedBlockedDates = localStorage.getItem('blockedDates') || '[]';
    const storedBlockedDates = JSON.parse(savedBlockedDates);
    storedBlockedDates.push(newBlockedDate);
    localStorage.setItem('blockedDates', JSON.stringify(storedBlockedDates));
  } catch (error) {
    console.error('Error storing blocked date in localStorage:', error);
  }

  return newBlockedDate;
}

/**
 * Remove a blocked date range by ID
 */
export function removeBlockedDate(id: string): boolean {
  const index = blockedDates.findIndex(date => date.id === id);
  if (index === -1) return false;

  // Remove from the in-memory array
  blockedDates.splice(index, 1);

  // Also remove from localStorage
  try {
    const savedBlockedDates = localStorage.getItem('blockedDates') || '[]';
    const storedBlockedDates = JSON.parse(savedBlockedDates);
    const updatedBlockedDates = storedBlockedDates.filter((date: BlockedDate) => date.id !== id);
    localStorage.setItem('blockedDates', JSON.stringify(updatedBlockedDates));
  } catch (error) {
    console.error('Error removing blocked date from localStorage:', error);
  }

  return true;
}

/**
 * Get all blocked dates for a property
 */
export function getBlockedDatesByPropertyId(propertyId: string): BlockedDate[] {
  // First check localStorage for any stored blocked dates
  try {
    const savedBlockedDates = localStorage.getItem('blockedDates') || '[]';
    const storedBlockedDates = JSON.parse(savedBlockedDates);
    
    // Update the in-memory array with any dates from localStorage
    storedBlockedDates.forEach((date: BlockedDate) => {
      if (!blockedDates.some(d => d.id === date.id)) {
        blockedDates.push(date);
      }
    });
  } catch (error) {
    console.error('Error loading blocked dates from localStorage:', error);
  }

  return blockedDates.filter(date => date.propertyId === propertyId);
}

/**
 * Check if a date range overlaps with any blocked dates for a property
 */
export function isDateRangeBlocked(
  propertyId: string,
  startDate: string,
  endDate: string
): boolean {
  const propertyBlockedDates = getBlockedDatesByPropertyId(propertyId);
  
  const checkStartDate = new Date(startDate);
  const checkEndDate = new Date(endDate);
  
  // Check if there's any overlap with existing blocked dates
  return propertyBlockedDates.some(blockedDate => {
    const blockedStartDate = new Date(blockedDate.startDate);
    const blockedEndDate = new Date(blockedDate.endDate);
    
    // Check if the dates overlap
    return (
      (checkStartDate >= blockedStartDate && checkStartDate < blockedEndDate) ||
      (checkEndDate > blockedStartDate && checkEndDate <= blockedEndDate) ||
      (checkStartDate <= blockedStartDate && checkEndDate >= blockedEndDate)
    );
  });
}

/**
 * Get all blocked dates
 */
export function getAllBlockedDates(): BlockedDate[] {
  // First check localStorage for any stored blocked dates
  try {
    const savedBlockedDates = localStorage.getItem('blockedDates') || '[]';
    const storedBlockedDates = JSON.parse(savedBlockedDates);
    
    // Update the in-memory array with any dates from localStorage
    storedBlockedDates.forEach((date: BlockedDate) => {
      if (!blockedDates.some(d => d.id === date.id)) {
        blockedDates.push(date);
      }
    });
  } catch (error) {
    console.error('Error loading blocked dates from localStorage:', error);
  }

  return blockedDates;
}

/**
 * Block dates for a booking
 */
export function blockDatesForBooking(
  propertyId: string,
  startDate: string,
  endDate: string,
  bookingNumber: string
): BlockedDate {
  return addBlockedDate({
    propertyId,
    startDate,
    endDate,
    reason: `Booking: ${bookingNumber}`,
    isManualBlock: false
  });
}
