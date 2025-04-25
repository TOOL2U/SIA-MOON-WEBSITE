import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import PropertyCard from "~/components/PropertyCard";
import { getProperties } from "~/models/property";
import { FaArrowRight } from "react-icons/fa";
import { getCloudinaryUrl } from "~/utils/cloudinary";
import CloudinaryGallery from "~/components/CloudinaryGallery";
import '~/styles/animations.css';

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
  const con1 = getCloudinaryUrl(  "9b5fe0cc-ae65-4225-b90b-a7d563e925db_2_ts54t8",);
  const con2 = getCloudinaryUrl('2f31ecd7-f736-4473-9b74-0293ed14faa6_lxs0gm');
  const phangan = getCloudinaryUrl('best-island-in-Thailand_yknta2');
  const box1 = getCloudinaryUrl('68adbec2-1e8f-41e6-b888-e0520a80bf64_2_ycca8m');
  const box2 = getCloudinaryUrl('7fa422a4-a5a2-49b5-9cde-6b1fe91c7d2e_2_ysfvar');
  const box3 = getCloudinaryUrl('e1261b8a-4301-40b2-85ca-36ab3b670059_1_zbxee1');
  const box4 = getCloudinaryUrl('174f6ab9-d902-462a-b7c1-b2513a3e3781_1_b4otgj');
  const plogo = getCloudinaryUrl('Parents_logo_oycq6z');
  const llogo = getCloudinaryUrl('df4fcfd7-0fc7-4ac8-bd34-5a80255ce3af_zer8c7');
  const alogo = getCloudinaryUrl('5_smrtgn');
  const sialogo = getCloudinaryUrl('Logo-black-vector_n9te6g');
  const bed1 = getCloudinaryUrl('bedroom1_mtpspt');
  const hero = getCloudinaryUrl(  "8453f772-29b5-45bd-9292-f8e20501f735_ewzhvd",);



  return (
     <div>
  <div className="w-full min-h-screen bg-deep-green">
    {/* Centered Section - Hidden on mobile, visible on larger screens */}
    <section className="hidden md:flex absolute md:relative md:top-[380px] md:left-[calc(50%-150px)] lg:left-[1400px] w-[300px] h-[50px] animate-fade-in z-50 bg-terracotta/20 text-white border-2 border-terracotta/50 transition-all duration-500 items-center justify-center">
      <h2 className="text-off-white text-xl font-berling-nova">COMING SOON</h2>
    </section>
    <section className="hidden md:flex absolute md:relative md:top-[330px] md:left-[calc(75%-150px)] lg:left-[2400px] w-[300px] h-[50px] z-50 animate-fade-in bg-terracotta/20 text-white border-2 border-terracotta/50 transition-all duration-500 items-center justify-center">
      <h2 className="text-off-white text-xl font-berling-nova">COMING SOON</h2>
    </section>
      {/* Three-container Section */}
      <section className="py-4 sm:py-6 md:py-8 mx-auto bg-deep-green mt-24 sm:mt-16 md:mt-[100px]">
        <div className="flex flex-col md:flex-row flex-wrap w-full max-w-[3000px] mx-auto">

          {/* 1 container - Image + Centered Text */}
          <Link
            to="/properties/alesia-house"
            className="w-full md:w-1/3 h-[300px] sm:h-[400px] md:h-[600px] lg:h-[1000px] relative overflow-hidden md:mt-[250px]"
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            {/* Image */}
            <img
              src={con2}
              alt="Luxury Villa Exterior"
              className="w-full h-full object-cover transition duration-300 transform brightness-50 hover:brightness-110 hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              <img
                src={alogo}
                alt="Alesia House Logo"
                className="w-[200px] sm:w-[300px] md:w-[500px] lg:w-[700px] h-auto object-contain"
              />
            </div>
          </Link>

          {/* 2 container - Image */}
          <Link
            to="/properties/alesia-house"
            className="w-full md:w-1/3 h-[300px] sm:h-[400px] md:h-[600px] lg:h-[1000px] relative overflow-hidden md:mt-[250px] mt-0"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <img
              src={bed1}
              alt="Luxury Villa Interior"
              className="w-full h-full object-cover transition duration-300 transform brightness-50 hover:brightness-110 hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              <img
                src={plogo}
                alt="Parents House Logo"
                className="w-[200px] sm:w-[300px] md:w-[500px] lg:w-[800px] h-auto object-contain"
              />
            </div>
          </Link>

          {/* 3 container - Image */}
          <Link
            to="/properties/alesia-house"
            className="w-full md:w-1/3 h-[300px] sm:h-[400px] md:h-[600px] lg:h-[1000px] relative overflow-hidden md:mt-[250px] mt-0"
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <img
              src={hero}
              alt="Oceanfront Property View"
              className="w-full h-full object-cover transition duration-300 transform brightness-50 hover:brightness-110 hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              <img
                src={llogo}
                alt="Lanna House Logo"
                className="w-[200px] sm:w-[300px] md:w-[500px] lg:w-[800px] h-auto object-contain"
              />
            </div>
          </Link>

        </div>
      </section>
    </div>
    </div>
  );
}


