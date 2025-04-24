import { Link } from "@remix-run/react";
import { FaBed, FaBath, FaRulerCombined, FaUsers } from "react-icons/fa";
import type { Property } from "~/models/property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link 
      to={`/properties/${property.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-white font-medium text-lg">${property.price} / night</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-2xl font-arioso text-deep-green mb-1">{property.name}</h3>
        <p className="text-gray-600 mb-3">{property.location}</p>
        
        <p className="text-gray-700 mb-4 line-clamp-2">{property.shortDescription}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaBed className="text-deep-green" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-deep-green" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-deep-green" />
            <span>{property.maxGuests} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-deep-green" />
            <span>{property.squareFeet.toLocaleString()} sq ft</span>
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-200">
          <span className="inline-block bg-deep-green text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 hover:bg-terracotta">
            View Property
          </span>
        </div>
      </div>
    </Link>
  );
}
