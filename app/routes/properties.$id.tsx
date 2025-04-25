import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { FaBed, FaBath, FaRulerCombined, FaUsers, FaMapMarkerAlt, FaMapPin, FaTimes, FaDirections, FaCalendarAlt } from "~/utils/icons";
import { useEffect, useState } from "react";

import { getProperty } from "~/models/property";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const propertyId = params.id;

  if (!propertyId) {
    return redirect("/properties");
  }

  const property = getProperty(propertyId);

  if (!property) {
    throw new Response("Property not found", { status: 404 });
  }

  return json({ property });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data || !data.property) {
    return [
      { title: "Property Not Found | Luxury Estates" },
      { name: "description", content: "The requested property could not be found." },
    ];
  }

  return [
    { title: `${data.property.name} | Luxury Estates` },
    { name: "description", content: data.property.shortDescription },
  ];
};

export default function PropertyDetail() {
  const { property } = useLoaderData<typeof loader>();
  const [PropertyGallery, setPropertyGallery] = useState<any>(null);
  const [BookingForm, setBookingForm] = useState<any>(null);
  const [AvailabilityCalendar, setAvailabilityCalendar] = useState<any>(null);
  const [showLocationMap, setShowLocationMap] = useState(false);
  const [showAvailabilityCalendar, setShowAvailabilityCalendar] = useState(false);

  // Function to smoothly scroll to the booking section
  const scrollToBookingSection = () => {
    const bookingSection = document.getElementById('booking-form-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Dynamically import components only on client
    import("~/components/PropertyGallery").then(mod => setPropertyGallery(() => mod.default));
    import("~/components/BookingForm").then(mod => setBookingForm(() => mod.default));
    import("~/components/AvailabilityCalendar").then(mod => setAvailabilityCalendar(() => mod.default));
  }, []);

  // Function to handle date selection from the calendar popup
  const handleDateSelect = (_startDate: Date, _endDate: Date) => {
    // The dates are already stored in localStorage by the AvailabilityCalendar component
    // Just scroll to the booking form section
    scrollToBookingSection();
  };

  if (!PropertyGallery || !BookingForm || !AvailabilityCalendar) {
    // Optionally show a loading spinner or skeleton
    return <div className="min-h-screen flex items-center justify-center text-deep-green">Loading...</div>;
  }

  return (
    <div className="bg-black/50 pb-0">
      {/* Full-width gallery section */}
      <div className="w-full">
        <PropertyGallery images={property.images} propertyName={property.name} />
      </div>

      {/* Property Title Section */}
      <div className="w-full min-h-[250px] sm:min-h-[300px] md:min-h-[380px] flex items-center justify-center bg-off-white pb-6 sm:pb-10 px-4 sm:px-6">
        <div className="text-center" data-aos="fade-up" data-aos-duration="800">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-calluna text-deep-green mb-3 sm:mb-4 mt-0">{property.name}</h1>
          <div className="flex items-center justify-center text-deep-green border-b border-black pb-4 sm:pb-6 md:pb-8">
            <FaMapMarkerAlt className="mr-2 text-terracotta" />
            <span className="text-sm sm:text-base">{property.location}</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 md:pt-8">
            {/* Check Availability Button */}
            <div className="w-full sm:w-auto flex justify-center">
              <button
                onClick={() => setShowAvailabilityCalendar(true)}
                className="flex items-center justify-center gap-1 sm:gap-2 px-4 py-2 sm:py-0 bg-deep-green text-white hover:bg-terracotta transition-colors duration-1000 font-calluna text-xs sm:text-sm w-full sm:w-[180px] md:w-[200px] h-[40px] sm:h-[45px] md:h-[50px]"
              >
                <FaCalendarAlt className="text-base sm:text-xl" />
                <span>CHECK AVAILABILITY</span>
              </button>
            </div>

            {/* Book Now Button */}
            <div className="w-full sm:w-auto flex justify-center">
              <button
                onClick={scrollToBookingSection}
                className="flex items-center justify-center gap-1 sm:gap-2 px-4 py-2 sm:py-0 bg-deep-green text-white hover:bg-terracotta transition-colors duration-1000 font-calluna text-xs sm:text-sm w-full sm:w-[180px] md:w-[200px] h-[40px] sm:h-[45px] md:h-[50px]"
              >
                <FaCalendarAlt className="text-base sm:text-xl" />
                <span>BOOK NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Overview Section */}
      <div className="w-full bg-off-white py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-5xl px-4 sm:px-6 mx-auto flex flex-col items-center justify-center" data-aos="fade-up" data-aos-delay="200">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 text-black">
            <div className="flex items-center gap-1 sm:gap-2">
              <FaBed className="text-deep-green text-2xl sm:text-3xl md:text-4xl" />
              <div>
                <p className="font-medium text-base sm:text-lg">{property.bedrooms}</p>
                <p className="text-base sm:text-lg md:text-xl font-calluna text-black">Bedrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <FaBath className="text-deep-green text-xl sm:text-2xl" />
              <div>
                <p className="font-medium text-base sm:text-lg">{property.bathrooms}</p>
                <p className="text-base sm:text-lg md:text-xl font-calluna text-black">Bathrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <FaUsers className="text-deep-green text-xl sm:text-2xl" />
              <div>
                <p className="font-medium text-base sm:text-lg">{property.maxGuests}</p>
                <p className="text-base sm:text-lg md:text-xl font-calluna text-black">Guests</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <FaRulerCombined className="text-deep-green text-xl sm:text-2xl" />
              <div>
                <p className="font-medium text-base sm:text-lg">{property.squareFeet.toLocaleString()}</p>
                <p className="text-base sm:text-lg md:text-xl font-calluna text-black">Sq Ft</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-calluna text-deep-green mb-6 sm:mb-10 md:mb-14 text-center">About this property</h2>
          <p className="text-deep-green text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 whitespace-pre-line leading-relaxed px-4 sm:px-6">
            {property.description}
          </p>

          <h3 className="text-2xl sm:text-3xl font-calluna text-deep-green mb-6 sm:mb-10 md:mb-14 text-center" data-aos="fade-up" data-aos-delay="300">Amenities</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 text-deep-green font-calluna max-w-6xl mx-auto px-4 sm:px-6" data-aos="fade-up" data-aos-delay="400">
            {property.amenities.map((amenity, index) => (
              <li key={index} className="flex items-center gap-2 text-sm sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-terracotta" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Location Map Popup */}
      {showLocationMap && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center transition-opacity duration-500 animate-fade-in p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full sm:w-[90%] max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-3 sm:mb-4 border-b border-gray-200 pb-3 sm:pb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-calluna text-deep-green">Location</h2>
              <button
                onClick={() => setShowLocationMap(false)}
                className="text-deep-green hover:text-terracotta transition-colors"
                aria-label="Close location map"
              >
                <FaTimes size={20} className="sm:text-2xl" />
              </button>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title={`Map showing location of ${property.name}`}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`}
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-3 sm:mt-4 text-center text-deep-green">
              <p className="font-calluna text-sm sm:text-base md:text-lg mb-3 sm:mb-4">{property.location}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(property.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-deep-green text-white rounded-md hover:bg-terracotta transition-colors duration-300 font-calluna text-sm sm:text-base md:text-lg"
              >
                <FaDirections />
                <span>GET DIRECTIONS</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Policies Section */}
      <div className="w-full bg-off-white py-8 sm:py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-14" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-2xl sm:text-3xl font-calluna text-deep-green mb-6 sm:mb-8 md:mb-10 text-center">Policies</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="font-calluna text-deep-green mb-2 sm:mb-3 text-xl sm:text-2xl">Check-in & Check-out</h3>
              <ul className="space-y-1 sm:space-y-2 text-deep-green text-base sm:text-lg md:text-xl">
                <li>Check-in: 4:00 PM - 8:00 PM</li>
                <li>Check-out: 11:00 AM</li>
                <li>Early check-in available upon request</li>
                <li>Self check-in with smart lock</li>
              </ul>
            </div>

            <div>
              <h3 className="font-calluna text-deep-green mb-2 sm:mb-3 text-xl sm:text-2xl">House Rules</h3>
              <ul className="space-y-1 sm:space-y-2 text-deep-green text-base sm:text-lg md:text-xl">
                <li>No smoking</li>
                <li>No pets</li>
                <li>No parties or events</li>
                <li>Quiet hours: 10:00 PM - 8:00 AM</li>
              </ul>
            </div>

            <div>
              <h3 className="font-calluna text-deep-green mb-2 sm:mb-3 text-xl sm:text-2xl">Cancellation Policy</h3>
              <p className="text-deep-green text-base sm:text-lg md:text-xl leading-relaxed">
                Free cancellation up to 30 days before check-in. Cancel within 30 days of check-in and receive a 50% refund, minus the service fee.
              </p>
            </div>

            <div>
              <h3 className="font-calluna text-deep-green mb-2 sm:mb-3 text-xl sm:text-2xl">Additional Notes</h3>
              <p className="text-deep-green text-base sm:text-lg md:text-xl leading-relaxed">
                Security deposit of $1,000 required. This will be returned within 7 days of check-out, provided no damages are reported.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8 sm:mt-10 md:mt-14">
            <button
              onClick={() => setShowLocationMap(true)}
              className="flex items-center justify-center gap-1 sm:gap-2 px-4 py-2 sm:py-0 bg-deep-green text-white hover:bg-terracotta transition-colors duration-1000 font-calluna text-xs sm:text-sm w-full sm:w-[180px] md:w-[200px] h-[40px] sm:h-[45px] md:h-[50px]"
            >
              <FaMapPin className="text-base sm:text-xl" />
              <span>VIEW LOCATION</span>
            </button>
          </div>
        </div>
      </div>



      {/* Calendar Popup */}
      <AvailabilityCalendar
        property={property}
        isOpen={showAvailabilityCalendar}
        onClose={() => setShowAvailabilityCalendar(false)}
        onDateSelect={handleDateSelect}
      />

      {/* Booking Form Section */}
      <div id="booking-form-section" className="bg-off-white w-full py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 bg-off-white flex flex-col justify-center items-center" data-aos="fade-up" data-aos-delay="300">
          <BookingForm property={property} />
        </div>
      </div>
    </div>
  );
}
