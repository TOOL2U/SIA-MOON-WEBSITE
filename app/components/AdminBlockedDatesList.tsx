import { useState, useEffect } from "react";
import { FaTrash, FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { getAllBlockedDates, removeBlockedDate } from "~/data/blockedDates";
import type { BlockedDate } from "~/data/blockedDates";
import { getProperty } from "~/models/property";

interface AdminBlockedDatesListProps {
  onRefresh: () => void;
}

export default function AdminBlockedDatesList({ onRefresh }: AdminBlockedDatesListProps) {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Load all blocked dates
  useEffect(() => {
    loadBlockedDates();
  }, []);

  const loadBlockedDates = () => {
    setIsLoading(true);
    try {
      const allBlockedDates = getAllBlockedDates();
      setBlockedDates(allBlockedDates);
    } catch (error) {
      console.error('Error loading blocked dates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters
  const filteredBlockedDates = blockedDates.filter(date => {
    // Apply property filter
    if (propertyFilter !== "all" && date.propertyId !== propertyFilter) {
      return false;
    }
    
    // Apply type filter
    if (typeFilter === "manual" && !date.isManualBlock) {
      return false;
    }
    if (typeFilter === "booking" && date.isManualBlock) {
      return false;
    }
    
    return true;
  });

  // Handle date unblocking
  const handleUnblock = (id: string) => {
    if (window.confirm("Are you sure you want to unblock these dates?")) {
      try {
        removeBlockedDate(id);
        loadBlockedDates();
        onRefresh();
      } catch (error) {
        console.error('Error unblocking dates:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-calluna text-deep-green mb-4">Blocked Dates</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="property-filter" className="block text-gray-700 font-medium mb-2">Filter by Property</label>
            <select
              id="property-filter"
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
            <label htmlFor="type-filter" className="block text-gray-700 font-medium mb-2">Filter by Type</label>
            <select
              id="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="all">All Types</option>
              <option value="manual">Manual Blocks</option>
              <option value="booking">Booking Blocks</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setPropertyFilter("all");
                setTypeFilter("all");
              }}
              className="w-full bg-deep-green hover:bg-terracotta text-white font-medium py-3 px-4 rounded-md transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-green"></div>
          </div>
        ) : filteredBlockedDates.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No blocked dates found matching your filters.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBlockedDates.map((blockedDate) => (
                <tr key={blockedDate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getProperty(blockedDate.propertyId)?.name || blockedDate.propertyId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(blockedDate.startDate), "MMM d, yyyy")} - {format(new Date(blockedDate.endDate), "MMM d, yyyy")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.ceil((new Date(blockedDate.endDate).getTime() - new Date(blockedDate.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{blockedDate.reason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      blockedDate.isManualBlock ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {blockedDate.isManualBlock ? 'Manual Block' : 'Booking Block'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{format(new Date(blockedDate.createdAt), "MMM d, yyyy")}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleUnblock(blockedDate.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Unblock dates"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
