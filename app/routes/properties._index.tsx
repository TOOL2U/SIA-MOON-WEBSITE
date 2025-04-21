import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import PropertyCard from "~/components/PropertyCard";
import { getProperties } from "~/models/property";  
import { FaArrowRight } from "react-icons/fa";

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
     <div>
      <div className="w-screen min-h-screen bg-deep-green">
  {/* Page content here */}

      {/* Three-container Section */}
      <section className="py-0 mx-auto bg-deep-green mt-[100px]">
        <div className="flex flex-wrap w-[3000px] h-[1300px] mx-auto">

        {/* 1 container - Image + Centered Text */}

<Link
  to="/contact"
  className="w-1/3 h-[1000px] relative overflow-hidden mt-[250px]"
  data-aos="fade-right"
  data-aos-duration="2000"
>

  {/* Image */}
  <img
    src="https://i.imgur.com/XQMJwt2.jpeg"
    alt="Luxury Villa Exterior"
    className="w-full h-full object-cover transition duration-300 transform brightness-50 hover:brightness-110 hover:scale-105"
  />
 <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
  <img
    src="https://i.imgur.com/QOZHMAz.png"
    alt="Luxury Villa Exterior"
    className="w-1/2 h-auto object-contain"
  />
  </div>
 
</Link>
          {/* 2 container - Image */}
          <Link to="/contact" 
          className="w-1/3 h-[1000px] overflow-hidden mt-[250px]"
                data-aos="fade-up"
                data-aos-duration="2000">
            <img 
              src="https://i.imgur.com/B7pTquw.jpeg" 
              alt="Luxury Villa Exterior" 
              className="w-full h-full object-cover transition duration-300 transform brightness-50 hover:brightness-110 hover:scale-105"
            />
             <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none ">
  <img
    src="https://i.imgur.com/eSLl6pw.png"
    alt="Luxury Villa Exterior"
    className="w-1/2 h-auto object-contain w-[800px]"
  />
  </div>
          </Link>
          {/* 3 container - Image */}
          <Link to="/contact" 
          className="w-1/3 h-[1000px] overflow-hidden mt-[250px]"
                data-aos="fade-left"
                data-aos-duration="2000">
            <img 
              src="https://i.ibb.co/kVLh9RYc/IMG-8545-1.webp" 
              alt="Oceanfront Property View" 
              className="w-full h-full object-cover transition duration-300 transform brightness-50 hover:brightness-110 hover:scale-105"
            />
             <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
  <img
    src="https://i.imgur.com/Ta545ZG.png"
    alt="Luxury Villa Exterior"
    className="w-1/2 h-auto object-contain w-[800px]"
  />
  </div>
          </Link>
         
        </div>
      </section>
    </div>
    </div>
  );
}


