import { useEffect, useRef, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FaArrowRight } from "react-icons/fa";

import Hero from "~/components/Hero";
import PropertyCard from "~/components/PropertyCard";
import { getProperties } from "~/models/property";

export const fonts = {
  elaSans: "/fonts/Ela Sans Regular.ttf",
  arioso: "/fonts/Arioso Regular.ttf"
};

export const meta: MetaFunction = () => {
  return [
    { title: "Luxury Estates - Exceptional Vacation Rentals" },
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
      <section className="py-0 bg-deep-green mt-[-80px]">
      <div className="flex flex-wrap items-center justify-center w-[2500px] h-[1500px] mx-auto bg-off-white overflow-hidden">
      <div className="flex flex-col items-center gap-8 relative top-[-90px]">
      <img 
          src="https://i.imgur.com/fabpVdt.png" 
          alt="Luxury Estate Villa Paradiso" 
          className="w-[200px]"
          data-aos="fade-down"
          data-aos-delay="100"
          />
          <h2 className="text-6xl font-arioso text-custom-black"
             data-aos="fade-up"
             data-aos-delay="300">
            Unparalleled Luxury
          </h2>
          <p className="text-2xl text-custom-black mb-6 max-w-xl text-center"
             data-aos="fade-up"
             data-aos-delay="500">
          Sia Moon is a serene brand rooted in traditional Thai elegance, blending heritage, nature, and feminine energy into a sanctuary of calm. Inspired by slow living and the cycles of the moon, it honors family, memory, and wellness through hand-built spaces that nurture connection and reflection. With a deep respect for Thai wood architecture and a name born from legacy, Sia Moon is a sacred place — a heritage sanctuary under the moonlight.
            </p>
            <a 
        href="https://www.instagram.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="min-w-[20] px-10 py-3 flex items-centre justify-center text-xl bg-black border 2 hover:text-custom-black border-custom-black text-white rounded-lg hover:bg-off-white transition "
        data-aos="fade-up"
        data-aos-delay="700"
      >
        Discover More
      </a>
          </div>
        </div>
        </section>

      {/* Four-container Section */}
      <section className="py-0 mx-auto bg-deep-green">
        <div className="flex flex-wrap w-[2500px] h-[3200px] mx-auto">
          {/* First container - Text */}
          <div className="w-1/2 h-1/2 bg-[#FFA07A] p-16 flex flex-col justify-center items-start" 
               data-aos="fade-right"
               data-aos-duration="1000">
           <h2 className="text-7xl font-arioso text-custom-black mb-8"
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-anchor-placement="top-bottom">
              Unparalleled Luxury
            </h2>
            <p className="text-2xl text-custom-black mb-6"
               data-aos="fade-right"
               data-aos-delay="400"
               data-aos-anchor-placement="top-bottom">
              Immerse yourself in the epitome of luxury living with our handpicked estates. Each property is meticulously curated to provide an extraordinary experience that transcends the ordinary.
            </p>
            <p className="text-2xl text-custom-black mb-10"
               data-aos="fade-right"
               data-aos-delay="600"
               data-aos-anchor-placement="top-bottom">
              From breathtaking ocean views to secluded mountain retreats, our collection offers the perfect backdrop for creating lasting memories with loved ones.
            </p>
             {/* Buttons container with flex row */}
  <div className="flex gap-4"
       data-aos="fade-right"
       data-aos-delay="800"
       data-aos-anchor-placement="left to right">
    <Link 
      to="/contact"
      className="inline-flex items-center gap-2 bg-deep-green text-off-white hover:bg-terracotta border-2 border-deep-green hover:text-custom-black font-medium px-8 py-4 rounded-md transition-colors duration-300 text-xl"
    >
      Contact Us
    </Link>
    
    <Link 
      to="/properties"
      className="inline-flex items-center gap-2 bg-deep-green text-off-white border-2 border-deep-green hover:bg-terracotta hover:text-custom-black font-medium px-8 py-4 rounded-md transition-colors duration-300 text-xl"
    >
      Explore Our Collection
    </Link>
  </div>
          </div>
          
          {/* Second container - Image */}
          <Link to="/contact" className="w-1/2 h-1/2 overflow-hidden"
               data-aos="fade-left"
               data-aos-duration="1000">
            <img 
              src="https://i.imgur.com/fTdUmnD.jpeg" 
              alt="Luxury Villa Exterior" 
              className="w-full h-full object-cover transition duration-300 transform brightness-100 hover:brightness-110 hover:scale-105"
            />
         
          </Link>
          
          {/* Third container - Image */}
          <Link to="/contact" className="w-1/2 h-1/2 overflow-hidden "
               data-aos="fade-right"
               data-aos-duration="1000">
            <img 
              src="https://i.imgur.com/c5bs0s2.jpeg" 
              alt="Oceanfront Property View" 
              className="w-full h-full object-cover transition duration-300 transform brightness-100 hover:brightness-110 hover:scale-105"
            />
          </Link>
          
          {/* Fourth container - Text */}
          <div className="w-1/2 h-1/2 bg-terracotta p-16 flex flex-col justify-center items-start"
               data-aos="fade-left"
               data-aos-duration="1000">
            <h2 className="text-7xl font-arioso text-off-custom-black mb-8"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-anchor-placement="top-bottom">
              Curated Experiences
            </h2>
            <p className="text-2xl text-off-custom-black/90 mb-6"
               data-aos="fade-left"
               data-aos-delay="400"
               data-aos-anchor-placement="top-bottom">
              Beyond just providing exceptional accommodations, we craft unique experiences tailored to your preferences. Our concierge team is dedicated to ensuring every detail of your stay exceeds expectations.
            </p>
            <p className="text-2xl text-off-custom-black/90 mb-10"
               data-aos="fade-left"
               data-aos-delay="600"
               data-aos-anchor-placement="top-bottom">
              From private chefs and spa treatments to exclusive excursions and personal guides, we transform ordinary vacations into extraordinary journeys.
            </p>
            {/* Buttons container with flex row */}
  <div className="flex gap-4"
       data-aos="top-bottom"
       data-aos-delay="800"
       data-aos-anchor-placement="left-right">
    <Link 
      to="/contact"
      className="inline-flex items-center gap-2 bg-deep-green text-off-white hover:bg-terracotta border-2 border-deep-green hover:text-custom-black font-medium px-8 py-4 rounded-md transition-colors duration-300 text-xl"
    >
      Contact Us
    </Link>
    
    <Link 
      to="/properties"
      className="inline-flex items-center gap-2 bg-deep-green text-off-white border-2 border-deep-green hover:bg-terracotta hover:text-custom-black font-medium px-8 py-4 rounded-md transition-colors duration-300 text-xl"
    >
      Explore Our Collection
 
    </Link>
  </div> 
          </div>
        </div>
      </section>
       {/* Middle-container Section */}
       <section className="py-0 bg-deep-green">
      <div className="flex flex-wrap items-center justify-cente w-[2500px] h-[1000px] mx-auto bg-off-white overflow-hidden">
      <div className="flex flex-col items-center gap-8 relative top-[-90px]" >
      <img 
          src="https://i.imgur.com/PQOqGPw.jpeg" 
          alt="Luxury Estate Villa Paradiso" 
          className="w-[2500px] h-[1500px] object-cover transition duration-300 transform brightness-50 hover:brightness-100 mt-[-150px] flex flex-wrap items-center justify-cente"
          data-aos="fade-down"
          data-aos-delay="100"
          />
         </div>
        </div>
        </section>
{/* bottom-container Section */}
<section className="py-0 bg-deep-green">
      <div className="flex flex-wrap items-center justify-center w-[2500px] h-[1500px] mx-auto bg-off-white overflow-hidden">
      <div className="flex flex-col items-center gap-8 relative top-[-90px]">
      <img 
          src="https://i.imgur.com/PLsqx6Q.png" 
          alt="Luxury Estate Villa Paradiso" 
          className="w-[200px]"
          data-aos="fade-down"
          data-aos-delay="100"
          />
          <h2 className="text-6xl font-arioso text-custom-black"
             data-aos="fade-up"
             data-aos-delay="300">
            Sustainability & Wellness
          </h2>
          <p className="text-2xl text-custom-black mb-6 max-w-xl text-center"
             data-aos="fade-up"
             data-aos-delay="500">
          At the heart of our philosophy is a commitment to holistic wellness and sustainable living. We believe true luxury is found in harmony — with nature, with self, and with community. Through mindful design, natural materials, and eco-conscious practices, we create spaces that nurture well-being while honoring and preserving the beauty of the environment.
            </p>
       
          </div>
        </div>
        </section>
       
          {/* Four-container Section */}
      <section className="py-0 mx-auto bg-deep-green">
        <div className="flex flex-wrap w-[2500px] h-[2500px] mx-auto">
     {/* 1 container - Image */}
     <Link to="/contact" className="w-1/2 h-1/2 overflow-hidden"
               data-aos="fade-left"
               data-aos-duration="1000">
            <img 
              src="https://i.imgur.com/2wf7eDP.jpeg" 
              alt="Luxury Villa Exterior" 
              className="w-full h-full object-cover transition duration-300 transform brightness-80 hover:brightness-110 hover:scale-105"></img>
          
            <p className="text-2xl text-off-custom-black mb-100 z-50"
               data-aos="fade-left"
               data-aos-delay="600"
               data-aos-anchor-placement="top-bottom">
              From private chefs and spa treatments to exclusive excursions and personal guides, we transform ordinary vacations into extraordinary journeys.
            </p>
         
          </Link>
          
          {/* 2 container - Image */}
          <Link to="/contact" className="w-1/2 h-1/2 overflow-hidden"
               data-aos="fade-left"
               data-aos-duration="1000">
            <img 
              src="https://i.imgur.com/Rbk9Y2P.jpeg" 
              alt="Luxury Villa Exterior" 
              className="w-full h-full object-cover transition duration-300 transform brightness-80 hover:brightness-110 hover:scale-105"
            />
         
          </Link>
          
          {/* 3 container - Image */}
          <Link to="/contact" className="w-1/2 h-1/2 overflow-hidden "
               data-aos="fade-right"
               data-aos-duration="1000">
            <img 
              src="https://i.imgur.com/0r9AezF.jpeg" 
              alt="Oceanfront Property View" 
              className="w-full h-full object-cover transition duration-300 transform brightness-80 hover:brightness-110 hover:scale-105"
            />
          </Link>
          
          {/* 4 container - Image */}
          <Link to="/contact" className="w-1/2 h-1/2 overflow-hidden"
               data-aos="fade-left"
               data-aos-duration="1000">
            <img 
              src="https://i.imgur.com/TzrqOm8.png" 
              alt="Luxury Villa Exterior" 
              className="w-full h-full object-cover transition duration-300 transform brightness-80 hover:brightness-110 hover:scale-105"
            />
         
          </Link>
          
  
          </div>
         </section>
  
      {/* Testimonials */}
      <section className="py-16 bg-deep-green text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12"
               data-aos="fade-up"
               data-aos-duration="800">
            <h2 className="text-6xl font-arioso mb-4">What Our Guests Say</h2>
            <p className="text-off-white mx-auto text-xl">
              Hear from guests who have experienced the exceptional service and luxury of our properties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
                 data-aos="fade-up"
                 data-aos-delay="100"
                 data-aos-duration="800">
              <div className="flex items-center gap-2 text-terracotta mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic">
                "Our stay at Villa Paradiso exceeded all expectations. The views were breathtaking, the home was immaculate, and the concierge service made everything effortless. Truly a once-in-a-lifetime experience."
              </p>
              <div>
                <p className="font-medium">Sarah & James</p>
                <p className="text-sm text-off-white/70">New York, NY</p>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
                 data-aos="fade-up"
                 data-aos-delay="300"
                 data-aos-duration="800">
              <div className="flex items-center gap-2 text-terracotta mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic">
                "Alpine Retreat was the perfect setting for our family reunion. The attention to detail in the home was remarkable, and having ski-in/ski-out access made our vacation truly special. We're already planning our return."
              </p>
              <div>
                <p className="font-medium">The Thompson Family</p>
                <p className="text-sm text-off-white/70">Chicago, IL</p>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
                 data-aos="fade-up"
                 data-aos-delay="500"
                 data-aos-duration="800">
              <div className="flex items-center gap-2 text-terracotta mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic">
                "Tropical Haven was pure paradise. Waking up to the sound of waves and having direct beach access was magical. The property manager went above and beyond to make our honeymoon unforgettable."
              </p>
              <div>
                <p className="font-medium">Michael & Emma</p>
                <p className="text-sm text-off-white/70">London, UK</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="bg-terracotta rounded-xl p-8 md:p-12 text-black text-center"
               data-aos="zoom-in"
               data-aos-duration="1000">
            <h2 className="text-3xl md:text-5xl font-arioso mb-4">Ready to Experience Luxury?</h2>
            <p className="max-w-3xl mx-auto mb-8 text-black">
              Book your dream vacation today and discover why our guests return year after year
            </p>
            <Link 
              to="/properties"
              className="inline-block bg-white text-[1.1rem] text-deep-green hover:bg-terracotta hover:text-black hover:border-white border-2 font-medium px-10 py-3 rounded-md transition-colors duration-300"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
