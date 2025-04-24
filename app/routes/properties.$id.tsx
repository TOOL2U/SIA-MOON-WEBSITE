import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { FaBed, FaBath, FaRulerCombined, FaUsers, FaMapMarkerAlt, FaMapPin, FaTimes, FaDirections, FaCalendarAlt } from "react-icons/fa";
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

  useEffect(() => {
    // Dynamically import components only on client
    import("~/components/PropertyGallery").then(mod => setPropertyGallery(() => mod.default));
    import("~/components/BookingForm").then(mod => setBookingForm(() => mod.default));
    import("~/components/AvailabilityCalendar").then(mod => setAvailabilityCalendar(() => mod.default));
  }, []);

  // Function to handle date selection from the calendar popup
  const handleDateSelect = (startDate: Date, endDate: Date) => {
    // Store the selected dates in localStorage for the booking form to use
    const bookingDetails = {
      propertyId: property.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    // Scroll to the booking form section
    document.getElementById('booking-form-section')?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="w-full h-[310px] flex items-center justify-center bg-off-white pb-10">
        <div className="text-center" data-aos="fade-up" data-aos-duration="800">
          <h1 className="text-6xl md:text-1xl font-calluna text-deep-green mb-4 mt-0">{property.name}</h1>
          <div className="flex items-center justify-center text-deep-green border-b border-black pb-8">
            <FaMapMarkerAlt className="mr-2 text-terracotta" />
            <span>{property.location}</span>
          </div>
        </div>
      </div>

      {/* Property Overview Section */}
      <div className="w-full h-[800px] bg-off-white items-center">
        <div className="max-w-5xl w-[1000px] bg-off-white h-[550px] mx-auto flex flex-col items-center justify-center" data-aos="fade-up" data-aos-delay="200">
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-black">
            <div className="flex items-center gap-2">
              <FaBed className="text-deep-green text-4xl" />
              <div>
                <p className="font-medium text-lg">{property.bedrooms}</p>
                <p className="text-xl font-calluna text-black">Bedrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaBath className="text-deep-green text-2xl" />
              <div>
                <p className="font-medium text-lg">{property.bathrooms}</p>
                <p className="text-xl font-calluna text-black">Bathrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-deep-green text-2xl" />
              <div>
                <p className="font-medium text-lg">{property.maxGuests}</p>
                <p className="text-xl font-calluna text-black">Guests</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaRulerCombined className="text-deep-green text-2xl" />
              <div>
                <p className="font-medium text-lg">{property.squareFeet.toLocaleString()}</p>
                <p className="text-xl font-calluna text-black">Sq Ft</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-calluna text-deep-green mb-14 text-center">About this property</h2>
          <p className="text-deep-green text-xl mb-10 whitespace-pre-line leading-relaxed">
            {property.description}
          </p>

          <h3 className="text-3xl font-calluna text-deep-green mb-14 text-center" data-aos="fade-up" data-aos-delay="300">Amenities</h3>
          <ul className="grid grid-cols-1 md:grid-cols-4 gap-3 text-deep-green font-calluna max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="400">
            {property.amenities.map((amenity, index) => (
              <li key={index} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta" viewBox="0 0 20 20" fill="currentColor">
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
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center transition-opacity duration-500 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-3xl font-calluna text-deep-green">Location</h2>
              <button
                onClick={() => setShowLocationMap(false)}
                className="text-deep-green hover:text-terracotta transition-colors"
                aria-label="Close location map"
              >
                <FaTimes size={24} />
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
            <div className="mt-4 text-center text-deep-green">
              <p className="font-calluna text-lg mb-4">{property.location}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(property.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-deep-green text-white rounded-md hover:bg-terracotta transition-colors duration-300 font-calluna text-lg"
              >
                <FaDirections />
                <span>GET DIRECTIONS</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Policies Section */}
      <div className="w-full h-[450px] flex items-center justify-center bg-off-white mb-0 pb-[250px]">
        <div className="max-w-5xl mx-auto p-14" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-3xl font-calluna text-deep-green mb-10 text-center">Policies</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-calluna text-deep-green mb-3 text-2xl">Check-in & Check-out</h3>
              <ul className="space-y-2 text-deep-green text-xl">
                <li>Check-in: 4:00 PM - 8:00 PM</li>
                <li>Check-out: 11:00 AM</li>
                <li>Early check-in available upon request</li>
                <li>Self check-in with smart lock</li>
              </ul>
            </div>

            <div>
              <h3 className="font-calluna text-deep-green mb-3 text-2xl">House Rules</h3>
              <ul className="space-y-2 text-deep-green text-xl">
                <li>No smoking</li>
                <li>No pets</li>
                <li>No parties or events</li>
                <li>Quiet hours: 10:00 PM - 8:00 AM</li>
              </ul>
            </div>

            <div>
              <h3 className="font-calluna text-deep-green mb-3 text-2xl">Cancellation Policy</h3>
              <p className="text-deep-green text-xl leading-relaxed">
                Free cancellation up to 30 days before check-in. Cancel within 30 days of check-in and receive a 50% refund, minus the service fee.
              </p>
            </div>

            <div>
              <h3 className="font-calluna text-deep-green mb-3 text-xl">Additional Notes</h3>
              <p className="text-deep-green text-xl leading-relaxed">
                Security deposit of $1,000 required. This will be returned within 7 days of check-out, provided no damages are reported.
              </p>
            </div>

          </div>
          <div className="flex justify-center pt-14">
            <button
              onClick={() => setShowLocationMap(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-deep-green text-white hover:bg-terracotta transition-colors duration-300 font-calluna text-sm w-[200px] h-[50px]"
            >
              <FaMapPin />
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

      {/* Check Availability Button */}
      <div className="bg-off-white w-full py-10 flex justify-center">
        <button
          onClick={() => setShowAvailabilityCalendar(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-deep-green text-white hover:bg-terracotta transition-colors duration-300 font-calluna text-sm w-[200px] h-[50px]"
        >
          <FaCalendarAlt className="text-xl" />
          <span>CHECK AVAILABILITY</span>
        </button>
      </div>

      {/* Booking Form Section */}
      <div id="booking-form-section" className="bg-off-white w-full h-[1090px]">
        <div className="w-[3790px] h-[1000px] bg-off-white p-8 flex flex-col justify-center items-center" data-aos="fade-up" data-aos-delay="300">
          <BookingForm property={property} />
        </div>
      </div>
    </div>
  );
}
