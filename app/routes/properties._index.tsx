import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";

import PropertyCard from "~/components/PropertyCard";
import { getProperties } from "~/models/property";

export const loader = async () => {
  const properties = getProperties();
  return json({ properties });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Our Properties | Luxury Estates" },
    { name: "description", content: "Browse our collection of luxury vacation rentals in the world's most coveted destinations." },
  ];
};

export default function Properties() {
  const { properties } = useLoaderData<typeof loader>();

  return (
    <div className="bg-off-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-arioso text-deep-green mb-4">Our Luxury Properties</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of extraordinary homes in the world's most desirable locations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
