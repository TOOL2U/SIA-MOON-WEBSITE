import { useEffect, useRef, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FaArrowRight } from "~/utils/icons";

import Hero from "~/components/Hero";
import PropertyCard from "~/components/PropertyCard";
import { getProperties } from "~/models/property";
import { getCloudinaryUrl } from '~/utils/cloudinary';
import CloudinaryGallery from "~/components/CloudinaryGallery";

export const fonts = {
  elaSans: "/fonts/Ela Sans Regular.ttf",
  arioso: "/fonts/Arioso Regular.ttf"
};
const con1 = getCloudinaryUrl(  "_DSF2784_1_vlxfnu",);
const con2 = getCloudinaryUrl('DSCF2261_lnxtqk');
const phangan = getCloudinaryUrl('best-island-in-Thailand_yknta2_c_crop_w_2650_h_1050_uag884');
const box1 = getCloudinaryUrl('_DSF2809_zkrc5u');
const box2 = getCloudinaryUrl('_DSF2791_kzbwuy');
const box3 = getCloudinaryUrl('_DSF2770_ngsiug');
const box4 = getCloudinaryUrl('DSCF2518_igv9h9');
const plogo = getCloudinaryUrl('Parents_logo_oycq6z');
const llogo = getCloudinaryUrl('df4fcfd7-0fc7-4ac8-bd34-5a80255ce3af_zer8c7');
const alogo = getCloudinaryUrl('5_smrtgn');
const sialogo = getCloudinaryUrl('Logo-black-vector_n9te6g');





export const meta: MetaFunction = () => {
  return [
    { title: "Sia Moon Sanctuary - Exceptional Vacation Rentals" },
    { name: "description", content: "Discover our curated collection of luxury vacation rentals in the world's most coveted destinations." },
  ];
};

export default function Index() {
  const properties = getProperties();

  // Refs for sections that will be animated on scroll
  const topSectionRef = useRef<HTMLDivElement>(null);
  const firstContainerRef = useRef<HTMLDivElement>(null);
  const secondContainerRef = useRef<HTMLDivElement>(null);
  const thirdContainerRef = useRef<HTMLDivElement>(null);
  const fourthContainerRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Track scroll direction
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection Observer configuration
    const options = {
      root: null, // using the viewport
      rootMargin: '0px',
      threshold: 0.1 // trigger when 10% of the element is visible
    };

    // Callback function when elements intersect viewport
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        // Get all elements with data-animation attributes inside the target
        const animatedElements = entry.target.querySelectorAll('[data-animation]');

        if (entry.isIntersecting) {
          // Add animation class to the container
          entry.target.classList.add('animate-in');

          // Reset animation state for all animated elements
          animatedElements.forEach(el => {
            // Remove previous animation classes
            el.classList.remove('animation-complete');
            // Force a reflow to restart the animation
            void (el as HTMLElement).offsetWidth; // Trigger reflow
            // Add animation classes with current direction info
            el.setAttribute('data-scroll-direction', scrollDirection || 'down');
          });
        } else {
          // When element leaves viewport, prepare it for the next animation
          entry.target.classList.remove('animate-in');

          // Mark animations as complete but ready for next scroll
          animatedElements.forEach(el => {
            el.classList.add('animation-complete');
          });
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(handleIntersect, options);

    // Observe all section refs
    const elements = [
      topSectionRef.current,
      firstContainerRef.current,
      secondContainerRef.current,
      thirdContainerRef.current,
      fourthContainerRef.current,
      testimonialsRef.current,
      ctaRef.current
    ];

    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    // Cleanup observer and scroll event on component unmount
    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollDirection]); // Add scrollDirection as dependency to rerun effect

  return (
    <div>
      <Hero />
      {/* Top-container Section */}
      <section className="py-0 sm:py- md:py- bg-deep-green mt-0">
      <div className="flex flex-wrap items-center justify-center w-full max-w-[2500px] min-h-[500px] sm:min-h-[700px] md:min-h-[900px] lg:min-h-[1200px] xl:min-h-[1500px] mx-auto bg-off-white overflow-hidden px-4 sm:px-6">
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 py-12 sm:py-16 md:relative md:top-[-90px]">
      <img
          src={sialogo}
          alt="Alesia House"
          className="w-[120px] sm:w-[150px] md:w-[200px]"
          data-aos="fade-down"
          data-aos-delay="100"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-calluna text-custom-black text-center"
             data-aos="fade-up"
             data-aos-delay="300">
            Unparalleled Luxury
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-calluna text-custom-black mb-4 sm:mb-6 max-w-xl text-center px-4 sm:px-6"
             data-aos="fade-up"
             data-aos-delay="500">
          Sia Moon is a serene brand rooted in traditional Thai elegance, blending heritage, nature, and feminine energy into a sanctuary of calm. Inspired by slow living and the cycles of the moon, it honors family, memory, and wellness through hand-built spaces that nurture connection and reflection. With a deep respect for Thai wood architecture and a name born from legacy, Sia Moon is a sacred place — a heritage sanctuary under the moonlight.
            </p>
            <Link
        to="/about"
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-[20px] px-4 sm:px-6 py-2 sm:py-3 flex font-berling-nova items-center justify-center text-xs sm:text-sm bg-black border-2 hover:text-custom-black border-custom-black text-white hover:bg-off-white transition transition-colors duration-1000"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        DISCOVER MORE
     </Link>
          </div>
        </div>
        </section>

      {/* Four-container Section */}
      <section className="py-0 mx-auto bg-deep-green">
        <div className="flex flex-wrap w-full max-w-[2500px] mx-auto">
          {/* First container - Text */}
          <div className="w-full md:w-1/2 bg-terracotta p-0 sm:p-2 md:p-2 lg:p-4 h-[800px] md:h-auto flex flex-col justify-center items-start relative"
               data-aos="fade-left"
               data-aos-duration="1000">
            {/* Image positioned absolutely for free movement - hidden on mobile */}
            <div className="hidden md:block absolute w-[300px] md:w-[500px] lg:w-[700px]" style={{ top: '220px', left: '-50px' }}>
              <img
                  src={alogo}
                  alt="Lanna House"
                  data-aos="fade-left"
                  data-aos-delay="200"
                  data-aos-anchor-placement="top-bottom"
              />
            </div>
            {/* Mobile version of the logo */}
            <div className="block md:hidden w-full mb-6">
              <img
                  src={alogo}
                  alt="Lanna House"
                  className="w-[400px] mx-auto"
                  data-aos="fade-up"
                  data-aos-delay="200"
              />
            </div>
            {/* Spacer div - smaller on mobile */}
            <div className="h-[20px] sm:h-[40px] md:h-[60px] lg:h-[80px] mb-4 sm:mb-6 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl font-calluna text-off-custom-black mb-4 sm:mb-6"
               data-aos="fade-left"
               data-aos-delay="400"
               data-aos-anchor-placement="top-bottom">
              Beyond just providing exceptional accommodations, we craft unique experiences tailored to your preferences. Our concierge team is dedicated to ensuring every detail of your stay exceeds expectations.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-calluna text-off-custom-black mb-6 sm:mb-8 md:mb-10"
               data-aos="fade-left"
               data-aos-delay="600"
               data-aos-anchor-placement="top-bottom">
              From private chefs and spa treatments to exclusive excursions and personal guides, we transform ordinary vacations into extraordinary journeys.
            </p>
            {/* Buttons container with flex column on mobile, row on larger screens */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                data-aos="top-bottom"
                data-aos-delay="800"
                data-aos-anchor-placement="left-right">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 z-50 text-black hover:bg-deep-green border-2 border-deep-green hover:text-white font-berling-nova px-4 sm:px-6 md:px-8 py-3 md:py-4 transition-colors duration-1000 text-xs sm:text-sm md:text-base"
              >
                ENQUIRE NOW
              </Link>

              <Link
                to="/properties/alesia-house"
                className="inline-flex items-center justify-center gap-2 z-50 bg-deep-green font-berling-nova font-bold text-white border-2 border-deep-green hover:bg-terracotta hover:text-custom-black px-4 sm:px-6 md:px-8 py-3 md:py-4 transition-colors duration-1000 text-xs sm:text-sm md:text-base"
              >
                BOOK NOW
              </Link>
            </div>
          </div>

          {/* Second container - Image */}
          <Link to="/contact" className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-auto overflow-hidden"
               data-aos="fade-left"
               data-aos-duration="1000">
            <img
              src={con1}
              alt="Luxury Villa Exterior"
              className="w-full h-full object-cover transition duration-300 transform brightness-100 hover:brightness-110 hover:scale-105"
            />
          </Link>

          {/* Third container - Image */}
          <Link to="/contact" className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-auto overflow-hidden"
               data-aos="fade-right"
               data-aos-duration="1000">
            <img
              src={con2}
              alt="Oceanfront Property View"
              className="w-full h-full object-cover transition duration-300 transform brightness-100 hover:brightness-110 hover:scale-105"
            />
          </Link>

          {/* Fourth container - Text */}
          <div className="w-full md:w-1/2 bg-terracotta p-0 sm:p-2 md:p-2 lg:p-4 h-[800px] md:h-auto flex flex-col justify-center items-start relative"
               data-aos="fade-left"
               data-aos-duration="1000">
            {/* Image positioned absolutely for free movement - hidden on mobile */}
            <div className="hidden md:block relative">
              <div className="absolute w-[300px] md:w-[500px] lg:w-[800px]" style={{ top: '-380px', left: '-200px' }}>
                <img
                    src={llogo}
                    alt="Lanna House"
                    data-aos="fade-left"
                    data-aos-delay="200"
                    data-aos-anchor-placement="top-bottom"
                />
              </div>
            </div>
            {/* Mobile version of the logo */}
            <div className="block md:hidden w-full mb-6">
              <img
                  src={llogo}
                  alt="Lanna House"
                  className="w-[600px] mx-auto"
                  data-aos="fade-up"
                  data-aos-delay="200"
              />
            </div>
            {/* Spacer div - smaller on mobile */}
            <div className="h-[20px] sm:h-[40px] md:h-[60px] lg:h-[80px] mb-4 sm:mb-6 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl font-calluna text-off-custom-black mb-4 sm:mb-6"
               data-aos="fade-left"
               data-aos-delay="400"
               data-aos-anchor-placement="top-bottom">
              Beyond just providing exceptional accommodations, we craft unique experiences tailored to your preferences. Our concierge team is dedicated to ensuring every detail of your stay exceeds expectations.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-calluna text-off-custom-black/90 mb-6 sm:mb-8 md:mb-10"
               data-aos="fade-left"
               data-aos-delay="600"
               data-aos-anchor-placement="top-bottom">
              From private chefs and spa treatments to exclusive excursions and personal guides, we transform ordinary vacations into extraordinary journeys.
            </p>
            {/* Buttons container with flex column on mobile, row on larger screens */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                data-aos="top-bottom"
                data-aos-delay="800"
                data-aos-anchor-placement="left-right">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 z-50 text-black hover:bg-deep-green border-2 border-deep-green hover:text-white font-berling-nova px-4 sm:px-6 md:px-8 py-3 md:py-4 transition-colors duration-1000 text-xs sm:text-sm md:text-base"
              >
                ENQUIRE NOW
              </Link>

              <Link
                to="/properties/alesia-house"
                className="inline-flex items-center justify-center gap-2 z-50 bg-deep-green font-berling-nova font-bold text-white border-2 border-deep-green hover:bg-terracotta hover:text-custom-black px-4 sm:px-6 md:px-8 py-3 md:py-4 transition-colors duration-1000 text-xs sm:text-sm md:text-base"
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        </div>
      </section>
       {/* Middle-container Section */}
       <section className="py-0 bg-deep-green">
      <div className="flex flex-wrap items-center justify-center w-full max-w-[2500px] min-h-[0px] sm:min-h-[0px] md:min-h-[0px] lg:min-h-[0px] mx-auto bg-off-white overflow-hidden">
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap- w-full h-full [relative md:top-[-0px]" >
      <img
          src={phangan}
          alt="Luxury Estate Alesia House"
          className="w-full h-full object-cover transition duration-300 transform brightness-50 hover:brightness-100 md:mt-[0px]"
          data-aos="fade-up"
          data-aos-delay="100"
          />
         </div>
        </div>
        </section>
{/* bottom-container Section */}
<section className="py- sm:py- md:py- bg-deep-green">
      <div className="flex flex-wrap items-center justify-center w-full max-w-[2500px] min-h-[500px] sm:min-h-[700px] md:min-h-[900px] lg:min-h-[1200px] xl:min-h-[1500px] mx-auto bg-off-white overflow-hidden px-4 sm:px-6">
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 py-12 sm:py-16 md:relative md:top-[-90px]">
      <img
          src="https://i.imgur.com/PLsqx6Q.png"
          alt="Luxury Estate Alesia House"
          className="w-[120px] sm:w-[150px] md:w-[200px]"
          data-aos="fade-down"
          data-aos-delay="100"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-calluna text-custom-black text-center"
             data-aos="fade-up"
             data-aos-delay="300">
            Sustainability & Wellness
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-custom-black mb-4 sm:mb-6 font-calluna max-w-xl text-center px-4 sm:px-6"
             data-aos="fade-up"
             data-aos-delay="500">
          At the heart of our philosophy is a commitment to holistic wellness and sustainable living. We believe true luxury is found in harmony — with nature, with self, and with community. Through mindful design, natural materials, and eco-conscious practices, we create spaces that nurture well-being while honoring and preserving the beauty of the environment.
            </p>

          </div>
        </div>
        </section>

          {/* Four-container Section */}
      <section className="py-0 mx-auto bg-deep-green">
        <div className="flex flex-wrap w-full max-w-[2500px] mx-auto">
          {/* 1 container - Image */}
          <Link to="/properties/alesia-house" className="w-full sm:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto overflow-hidden relative"
               data-aos="fade-left"
               data-aos-duration="1000">
            <img
              src={box1}
              alt="Luxury Villa Exterior"
              className="w-full h-full object-cover transition duration-300 transform brightness-80 hover:brightness-110 hover:scale-105"></img>

          </Link>

          {/* 2 container - Image */}
          <Link to="/properties/alesia-house" className="w-full sm:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto overflow-hidden"
               data-aos="fade-left"
               data-aos-duration="1000">
            <img
              src={box2}
              alt="Luxury Villa Exterior"
              className="w-full h-full object-cover transition duration-300 transform brightness-80 hover:brightness-110 hover:scale-105"
            />
          </Link>

          {/* 3 container - Image */}
          <Link to="/properties/alesia-house" className="w-full sm:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto overflow-hidden"
               data-aos="fade-right"
               data-aos-duration="1000">
            <img
              src={box3}
              alt="Oceanfront Property View"
              className="w-full h-full object-cover transition duration-300 transform brightness-80 hover:brightness-110 hover:scale-105"
            />
          </Link>

          {/* 4 container - Image */}
          <Link to="/properties/alesia-house" className="w-full sm:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto overflow-hidden"
               data-aos="fade-left"
               data-aos-duration="1000">
            <img
              src={box4}
              alt="Luxury Villa Exterior"
              className="w-full h-full object-cover transition duration-300 transform brightness-80 hover:brightness-110 hover:scale-105"
            />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-off-white rounded-xl p-6 sm:p-8 md:p-12 text-black text-center"
               data-aos="zoom-in"
               data-aos-duration="1000">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-calluna mb-3 sm:mb-4">Ready to experience the Sia Moon Properties?</h2>
            <p className="text-base sm:text-lg md:text-xl mx-auto mb-6 sm:mb-8 text-black font-calluna">
              Book your dream vacation today and discover why our guests return year after year
            </p>
            <Link
              to="/properties"
              className="inline-block bg-black text-xs sm:text-sm text-white hover:bg-off-white border-2 hover:border-black hover:text-black hover:border-black font-berling-nova px-4 sm:px-6 py-2 sm:py-3 transition-colors duration-1000"
            >
              BROWSE PROPERTIES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
