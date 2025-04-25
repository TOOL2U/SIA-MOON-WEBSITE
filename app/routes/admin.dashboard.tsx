import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaGlobe, FaSearch, FaPlus, FaSignOutAlt, FaBan } from "~/utils/icons";
import { isAdminLoggedIn, clearAdminSession } from "~/utils/auth";
import type { Booking } from "~/data/bookings";
import { getProperty } from "~/models/property";
import { format } from "date-fns";
import AdminNewBookingForm from "~/components/AdminNewBookingForm";
import AdminBlockDatesForm from "~/components/AdminBlockDatesForm";
import AdminBlockedDatesList from "~/components/AdminBlockedDatesList";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard | Sia Moon" },
    { name: "description", content: "Admin dashboard for Sia Moon property management." },
  ];
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "pending" | "cancelled">("all");
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<"all" | "upcoming" | "past">("all");
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [showBlockDatesModal, setShowBlockDatesModal] = useState(false);
  const [showBlockedDates, setShowBlockedDates] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Load all bookings from localStorage and server
  useEffect(() => {
    const loadBookings = () => {
      setIsLoading(true);
      try {
        // Get all bookings from localStorage
        const allBookings: Booking[] = [];

        // 1. Get bookings from the main collection
        const savedBookings = localStorage.getItem('userBookings');
        if (savedBookings) {
          const parsedBookings = JSON.parse(savedBookings);
          allBookings.push(...parsedBookings);
        }

        // 2. Find any individual bookings that might not be in the main collection
        const allKeys = Object.keys(localStorage);
        const bookingKeys = allKeys.filter(key => key.startsWith('booking_') && !key.includes('backup') && !key.includes('emergency'));

        for (const key of bookingKeys) {
          const bookingData = localStorage.getItem(key);
          if (bookingData) {
            try {
              const booking = JSON.parse(bookingData);
              // Check if this booking is already in our collection
              if (!allBookings.some(b => b.id === booking.id)) {
                allBookings.push(booking);
              }
            } catch (error) {
              console.error(`Error parsing booking data from ${key}:`, error);
            }
          }
        }

        // Sort bookings by creation date (newest first)
        allBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setBookings(allBookings);
        setFilteredBookings(allBookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, []);

  // Apply filters when search term or filters change
  useEffect(() => {
    let filtered = [...bookings];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.bookingNumber.toLowerCase().includes(term) ||
        booking.name.toLowerCase().includes(term) ||
        booking.email.toLowerCase().includes(term) ||
        booking.phone.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Apply property filter
    if (propertyFilter !== "all") {
      filtered = filtered.filter(booking => booking.propertyId === propertyFilter);
    }

    // Apply date filter
    const today = new Date();
    if (dateFilter === "upcoming") {
      filtered = filtered.filter(booking => new Date(booking.checkIn) >= today);
    } else if (dateFilter === "past") {
      filtered = filtered.filter(booking => new Date(booking.checkOut) < today);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, propertyFilter, dateFilter]);

  // Handle logout
  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login");
  };

  // Handle booking status change
  const updateBookingStatus = (booking: Booking, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    try {
      // Create updated booking
      const updatedBooking = { ...booking, status: newStatus };

      // Update in memory
      const updatedBookings = bookings.map(b => b.id === booking.id ? updatedBooking : b);
      setBookings(updatedBookings);

      // Update in localStorage
      // 1. Update in main collection
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

      // 2. Update individual booking
      localStorage.setItem(`booking_${booking.bookingNumber}`, JSON.stringify(updatedBooking));

      // 3. Create a backup with timestamp
      const timestamp = new Date().getTime();
      localStorage.setItem(`booking_backup_${booking.bookingNumber}_${timestamp}`, JSON.stringify(updatedBooking));

      return true;
    } catch (error) {
      console.error('Error updating booking status:', error);
      return false;
    }
  };

  // Handle booking deletion
  const deleteBooking = (booking: Booking) => {
    try {
      // Remove from memory
      const updatedBookings = bookings.filter(b => b.id !== booking.id);
      setBookings(updatedBookings);

      // Remove from localStorage
      // 1. Update main collection
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

      // 2. Remove individual booking
      localStorage.removeItem(`booking_${booking.bookingNumber}`);

      // 3. Find and remove all backups
      const allKeys = Object.keys(localStorage);
      const backupKeys = allKeys.filter(key =>
        key.includes(`booking_backup_${booking.bookingNumber}_`) ||
        key === `booking_emergency_${booking.bookingNumber}`
      );

      for (const key of backupKeys) {
        localStorage.removeItem(key);
      }

      // 4. Update user's booking list
      try {
        const userBookingsKey = `user_${booking.email.toLowerCase()}`;
        const userBookings = JSON.parse(localStorage.getItem(userBookingsKey) || '[]');
        const updatedUserBookings = userBookings.filter((bn: string) => bn !== booking.bookingNumber);
        localStorage.setItem(userBookingsKey, JSON.stringify(updatedUserBookings));
      } catch (e) {
        console.error('Error updating user bookings mapping:', e);
      }

      setShowDeleteModal(false);
      setBookingToDelete(null);
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      return false;
    }
  };

  // Handle booking update
  const updateBooking = (updatedBooking: Booking) => {
    try {
      // Update in memory
      const updatedBookings = bookings.map(b => b.id === updatedBooking.id ? updatedBooking : b);
      setBookings(updatedBookings);

      // Update in localStorage
      // 1. Update in main collection
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

      // 2. Update individual booking
      localStorage.setItem(`booking_${updatedBooking.bookingNumber}`, JSON.stringify(updatedBooking));

      // 3. Create a backup with timestamp
      const timestamp = new Date().getTime();
      localStorage.setItem(`booking_backup_${updatedBooking.bookingNumber}_${timestamp}`, JSON.stringify(updatedBooking));

      setShowEditModal(false);
      setEditingBooking(null);
      return true;
    } catch (error) {
      console.error('Error updating booking:', error);
      return false;
    }
  };

  // Calculate total revenue
  const calculateTotalRevenue = () => {
    return bookings.reduce((total, booking) => {
      if (booking.status === 'confirmed') {
        return total + booking.total;
      }
      return total;
    }, 0);
  };

  // Calculate upcoming bookings count
  const calculateUpcomingBookings = () => {
    const today = new Date();
    return bookings.filter(booking =>
      booking.status === 'confirmed' && new Date(booking.checkIn) >= today
    ).length;
  };

  return (
    <div className="bg-off-white min-h-screen py-24 pt-24 mt-32">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-calluna text-deep-green" data-aos="fade-up" data-aos-duration="800">
            Admin Dashboard
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowNewBookingModal(true)}
              className="flex items-center gap-2 bg-deep-green hover:bg-terracotta text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              <FaPlus />
              Add New Booking
            </button>
            <button
              onClick={() => setShowBlockDatesModal(true)}
              className="flex items-center gap-2 bg-deep-green hover:bg-terracotta text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              <FaBan />
              Block Dates
            </button>
            <button
              onClick={() => setShowBlockedDates(!showBlockedDates)}
              className={`flex items-center gap-2 ${showBlockedDates ? 'bg-terracotta' : 'bg-deep-green'} hover:bg-terracotta text-white px-4 py-2 rounded-md transition-colors duration-300`}
            >
              <FaCalendarAlt />
              {showBlockedDates ? 'Hide Blocked Dates' : 'Show Blocked Dates'}
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete all past bookings? This action cannot be undone.")) {
                  // Get current date
                  const today = new Date();

                  // Filter out past bookings
                  const pastBookings = bookings.filter(booking =>
                    new Date(booking.checkOut) < today
                  );

                  // Delete each past booking
                  let deletedCount = 0;
                  pastBookings.forEach(booking => {
                    try {
                      // Remove from localStorage
                      // 1. Remove individual booking
                      localStorage.removeItem(`booking_${booking.bookingNumber}`);

                      // 2. Find and remove all backups
                      const allKeys = Object.keys(localStorage);
                      const backupKeys = allKeys.filter(key =>
                        key.includes(`booking_backup_${booking.bookingNumber}_`) ||
                        key === `booking_emergency_${booking.bookingNumber}`
                      );

                      for (const key of backupKeys) {
                        localStorage.removeItem(key);
                      }

                      // 3. Update user's booking list
                      try {
                        const userBookingsKey = `user_${booking.email.toLowerCase()}`;
                        const userBookings = JSON.parse(localStorage.getItem(userBookingsKey) || '[]');
                        const updatedUserBookings = userBookings.filter((bn: string) => bn !== booking.bookingNumber);
                        localStorage.setItem(userBookingsKey, JSON.stringify(updatedUserBookings));
                      } catch (e) {
                        console.error('Error updating user bookings mapping:', e);
                      }

                      deletedCount++;
                    } catch (error) {
                      console.error(`Error deleting booking ${booking.bookingNumber}:`, error);
                    }
                  });

                  // Update the main bookings collection
                  const remainingBookings = bookings.filter(booking =>
                    new Date(booking.checkOut) >= today
                  );
                  localStorage.setItem('userBookings', JSON.stringify(remainingBookings));

                  // Update state
                  setBookings(remainingBookings);
                  setFilteredBookings(remainingBookings);

                  // Show confirmation
                  alert(`Successfully deleted ${deletedCount} past bookings.`);
                }
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              <FaTrash />
              Delete Past Bookings
            </button>
            <button
              onClick={() => {
                if (window.confirm("⚠️ WARNING: Are you sure you want to delete ALL bookings? This action cannot be undone and will remove EVERY booking in the system.")) {
                  // Get all booking keys
                  const allKeys = Object.keys(localStorage);

                  // Find all booking-related keys
                  const bookingKeys = allKeys.filter(key =>
                    key.startsWith('booking_') ||
                    key === 'userBookings' ||
                    key.startsWith('user_')
                  );

                  // Delete all booking data
                  let deletedCount = 0;
                  bookingKeys.forEach(key => {
                    try {
                      localStorage.removeItem(key);
                      deletedCount++;
                    } catch (error) {
                      console.error(`Error deleting key ${key}:`, error);
                    }
                  });

                  // Update state
                  setBookings([]);
                  setFilteredBookings([]);

                  // Show confirmation
                  alert(`Successfully deleted all bookings and cleared ${deletedCount} storage items.`);
                }
              }}
              className="flex items-center gap-2 bg-black hover:bg-red-900 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              <FaTrash />
              Delete ALL Bookings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-deep-green hover:bg-terracotta text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-calluna text-deep-green mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-calluna text-deep-green mb-2">Upcoming Bookings</h3>
            <p className="text-3xl font-bold">{calculateUpcomingBookings()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-calluna text-deep-green mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">${calculateTotalRevenue().toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-aos="fade-up" data-aos-delay="200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-gray-700 font-medium mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search bookings..."
                  className="w-full p-3 border border-gray-300 rounded-md pl-10"
                />
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label htmlFor="property" className="block text-gray-700 font-medium mb-2">Property</label>
              <select
                id="property"
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="all">All Properties</option>
                <option value="alesia-house">Alesia House</option>
                <option value="alpine-retreat">Alpine Retreat</option>
                <option value="tropical-haven">Tropical Haven</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
              <select
                id="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="all">All Dates</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setPropertyFilter("all");
                  setDateFilter("all");
                }}
                className="w-full bg-deep-green hover:bg-terracotta text-white font-medium py-3 px-4 rounded-md transition-colors duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Blocked Dates Section */}
        {showBlockedDates && (
          <div className="mb-8" data-aos="fade-up" data-aos-delay="250">
            <AdminBlockedDatesList onRefresh={() => {
              // This will be called when a blocked date is removed
              // We don't need to do anything special here since the component handles its own state
            }} />
          </div>
        )}

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="300">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-green"></div>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No bookings found matching your filters.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Special Requests</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.bookingNumber}</div>
                        <div className="text-sm text-gray-500">{format(new Date(booking.createdAt), "MMM d, yyyy")}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getProperty(booking.propertyId)?.name || booking.propertyId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(booking.checkIn), "MMM d, yyyy")} - {format(new Date(booking.checkOut), "MMM d, yyyy")}
                        </div>
                        <div className="text-sm text-gray-500">
                          {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${booking.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {booking.specialRequests ? (
                          <div className="max-w-xs overflow-hidden">
                            <div className="truncate">{booking.specialRequests}</div>
                            {booking.specialRequests.length > 30 && (
                              <button
                                onClick={() => alert(booking.specialRequests)}
                                className="text-deep-green hover:text-terracotta text-xs mt-1"
                              >
                                View full request
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingBooking(booking);
                              setShowEditModal(true);
                            }}
                            className="text-deep-green hover:text-terracotta transition-colors"
                            title="Edit booking"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setBookingToDelete(booking);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete booking"
                          >
                            <FaTrash size={18} />
                          </button>
                          {booking.status !== 'confirmed' && (
                            <button
                              onClick={() => updateBookingStatus(booking, 'confirmed')}
                              className="text-green-600 hover:text-green-800 transition-colors"
                              title="Confirm booking"
                            >
                              <FaCheck size={18} />
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={() => updateBookingStatus(booking, 'cancelled')}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Cancel booking"
                            >
                              <FaTimes size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Edit Booking Modal */}
      {showEditModal && editingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center transition-opacity duration-500 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingBooking(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-deep-green transition-colors"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-calluna text-deep-green mb-6">Edit Booking</h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingBooking) {
                updateBooking(editingBooking);
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2 text-deep-green" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={editingBooking.checkIn.split('T')[0]}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      checkIn: new Date(e.target.value).toISOString()
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2 text-deep-green" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={editingBooking.checkOut.split('T')[0]}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      checkOut: new Date(e.target.value).toISOString()
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaUser className="mr-2 text-deep-green" />
                    Guest Name
                  </label>
                  <input
                    type="text"
                    value={editingBooking.name}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      name: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaEnvelope className="mr-2 text-deep-green" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingBooking.email}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      email: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaPhone className="mr-2 text-deep-green" />
                    Phone
                  </label>
                  <input
                    type="text"
                    value={editingBooking.phone}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      phone: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaGlobe className="mr-2 text-deep-green" />
                    Country
                  </label>
                  <input
                    type="text"
                    value={editingBooking.country}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      country: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Guests</label>
                  <input
                    type="number"
                    value={editingBooking.guests}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      guests: parseInt(e.target.value)
                    })}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Total Price</label>
                  <input
                    type="number"
                    value={editingBooking.total}
                    onChange={(e) => setEditingBooking({
                      ...editingBooking,
                      total: parseInt(e.target.value)
                    })}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Status</label>
                <select
                  value={editingBooking.status}
                  onChange={(e) => setEditingBooking({
                    ...editingBooking,
                    status: e.target.value as 'confirmed' | 'pending' | 'cancelled'
                  })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Special Requests</label>
                <textarea
                  value={editingBooking.specialRequests || ''}
                  onChange={(e) => setEditingBooking({
                    ...editingBooking,
                    specialRequests: e.target.value
                  })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingBooking(null);
                  }}
                  className="px-4 py-2 border border-deep-green text-deep-green rounded-md hover:bg-terracotta hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-deep-green text-white rounded-md hover:bg-terracotta transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && bookingToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-start pt-[400px] transition-opacity duration-500 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-calluna text-deep-green mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete booking <span className="font-bold">{bookingToDelete.bookingNumber}</span> for {bookingToDelete.name}?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setBookingToDelete(null);
                }}
                className="px-4 py-2 border border-deep-green text-deep-green rounded-md hover:bg-terracotta hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteBooking(bookingToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Booking Modal */}
      {showNewBookingModal && (
        <AdminNewBookingForm
          onClose={() => setShowNewBookingModal(false)}
          onBookingCreated={() => {
            // Reload bookings after a new booking is created
            const loadBookings = () => {
              setIsLoading(true);
              try {
                // Get all bookings from localStorage
                const allBookings: Booking[] = [];

                // 1. Get bookings from the main collection
                const savedBookings = localStorage.getItem('userBookings');
                if (savedBookings) {
                  const parsedBookings = JSON.parse(savedBookings);
                  allBookings.push(...parsedBookings);
                }

                // 2. Find any individual bookings that might not be in the main collection
                const allKeys = Object.keys(localStorage);
                const bookingKeys = allKeys.filter(key => key.startsWith('booking_') && !key.includes('backup') && !key.includes('emergency'));

                for (const key of bookingKeys) {
                  const bookingData = localStorage.getItem(key);
                  if (bookingData) {
                    try {
                      const booking = JSON.parse(bookingData);
                      // Check if this booking is already in our collection
                      if (!allBookings.some(b => b.id === booking.id)) {
                        allBookings.push(booking);
                      }
                    } catch (error) {
                      console.error(`Error parsing booking data from ${key}:`, error);
                    }
                  }
                }

                // Sort bookings by creation date (newest first)
                allBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                setBookings(allBookings);
                setFilteredBookings(allBookings);
              } catch (error) {
                console.error('Error loading bookings:', error);
              } finally {
                setIsLoading(false);
              }
            };

            loadBookings();
          }}
        />
      )}

      {/* Block Dates Modal */}
      {showBlockDatesModal && (
        <AdminBlockDatesForm
          onClose={() => setShowBlockDatesModal(false)}
          onDatesBlocked={() => {
            // If the blocked dates list is visible, refresh it
            if (showBlockedDates) {
              // The component will handle its own refresh
            }
          }}
        />
      )}
    </div>
  );
}
