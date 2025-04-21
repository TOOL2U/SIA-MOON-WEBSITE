import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { FaBed, FaBath, FaRulerCombined, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
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

  useEffect(() => {
    // Dynamically import components only on client
    import("~/components/PropertyGallery").then(mod => setPropertyGallery(() => mod.default));
    import("~/components/BookingForm").then(mod => setBookingForm(() => mod.default));
  }, []);

  if (!PropertyGallery || !BookingForm) {
    // Optionally show a loading spinner or skeleton
    return <div className="min-h-screen flex items-center justify-center text-deep-green">Loading...</div>;
  }

  return (
    <div className="bg-deep-green pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-arioso text-deep-green mb-2">{property.name}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <FaMapMarkerAlt className="mr-2 text-terracotta" />
            <span>{property.location}</span>
          </div>
          
          <PropertyGallery images={property.images} propertyName={property.name} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-wrap gap-6 mb-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <FaBed className="text-deep-green text-xl" />
                  <div>
                    <p className="font-medium">{property.bedrooms}</p>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="text-deep-green text-xl" />
                  <div>
                    <p className="font-medium">{property.bathrooms}</p>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-deep-green text-xl" />
                  <div>
                    <p className="font-medium">{property.maxGuests}</p>
                    <p className="text-sm text-gray-500">Guests</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaRulerCombined className="text-deep-green text-xl" />
                  <div>
                    <p className="font-medium">{property.squareFeet.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Sq Ft</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-arioso text-deep-green mb-4">About this property</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {property.description}
              </p>
              
              <h3 className="text-xl font-arioso text-deep-green mb-3">Amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
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
            
            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-arioso text-deep-green mb-4">Location</h2>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title={`Map showing location of ${property.name}`}
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            {/* Policies */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-arioso text-deep-green mb-4">Policies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Check-in & Check-out</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>Check-in: 4:00 PM - 8:00 PM</li>
                    <li>Check-out: 11:00 AM</li>
                    <li>Early check-in available upon request</li>
                    <li>Self check-in with smart lock</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">House Rules</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>No smoking</li>
                    <li>No pets</li>
                    <li>No parties or events</li>
                    <li>Quiet hours: 10:00 PM - 8:00 AM</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Cancellation Policy</h3>
                  <p className="text-gray-700">
                    Free cancellation up to 30 days before check-in. Cancel within 30 days of check-in and receive a 50% refund, minus the service fee.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Additional Notes</h3>
                  <p className="text-gray-700">
                    Security deposit of $1,000 required. This will be returned within 7 days of check-out, provided no damages are reported.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Form */}
          <div>
            <BookingForm property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
