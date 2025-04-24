import { useState, useCallback, useRef, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { getCloudinaryUrl } from "~/utils/cloudinary";
import CloudinaryGallery from "~/components/CloudinaryGallery"; 

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10  hover:bg-opacity-100 p-2 rounded-full text-off-white transition-all duration-300"
      onClick={onClick}
      aria-label="Next image"
    >
      <SlArrowRight size={40} />
    </button>
  );
}
//Index Images
const con1 = getCloudinaryUrl(  "9b5fe0cc-ae65-4225-b90b-a7d563e925db_2_ts54t8",);
const hero = getCloudinaryUrl(  "8453f772-29b5-45bd-9292-f8e20501f735_ewzhvd",);
const con2 = getCloudinaryUrl('2f31ecd7-f736-4473-9b74-0293ed14faa6_lxs0gm');
const box1 = getCloudinaryUrl('68adbec2-1e8f-41e6-b888-e0520a80bf64_2_ycca8m');
const box2 = getCloudinaryUrl('7fa422a4-a5a2-49b5-9cde-6b1fe91c7d2e_2_ysfvar');
const box3 = getCloudinaryUrl('e1261b8a-4301-40b2-85ca-36ab3b670059_1_zbxee1');
const box4 = getCloudinaryUrl('174f6ab9-d902-462a-b7c1-b2513a3e3781_1_b4otgj');
const alogo = getCloudinaryUrl('5_smrtgn');


function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10  hover:bg-opacity-100 p-2 rounded-full text-off-white transition-all duration-300"
      onClick={onClick}
      aria-label="Previous image"
    >
      <SlArrowLeft size={40} />
    </button>
  );
}

export default function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorSide, setCursorSide] = useState<"left" | "right">("left");
  const [showCursor, setShowCursor] = useState(false);

  const galleryRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);

  const mainSettings = {
    dots: false,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 700,
    speed: 700, // Slightly faster for better user experience
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: any, next: number) => setCurrentSlide(next),
    lazyLoad: 'ondemand' as const, // Changed to ondemand for better quality
    centerMode: false, // Disable center mode to prevent zooming
    centerPadding: '0', // No padding
  };

  // Update main settings when in lightbox mode
  const settings = {
    ...mainSettings,
    autoplay: !lightboxOpen, // Disable autoplay in lightbox mode
    speed: lightboxOpen ? 500 : 1500, // Faster transitions in lightbox mode
    adaptiveHeight: false, // Disable adaptive height to prevent resizing issues
    cssEase: 'ease-out', // Simpler easing function
    draggable: true, // Allow dragging for mobile users
    swipe: true, // Enable swipe for mobile users
  };

  // Handle mouse movement to update cursor position and side
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;

    const { clientX, clientY } = e;
    const { width } = galleryRef.current.getBoundingClientRect();
    const halfWidth = width / 2;

    setMousePosition({ x: clientX, y: clientY });
    setCursorSide(clientX < halfWidth ? "left" : "right");
  }, []);

  // Show/hide cursor when entering/leaving the gallery
  const handleMouseEnter = useCallback(() => {
    setShowCursor(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowCursor(false);
  }, []);

  // Handle click to navigate to next/previous slide
  const handleGalleryClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryRef.current || !sliderRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const { clientX } = e;
    const { width } = galleryRef.current.getBoundingClientRect();
    const halfWidth = width / 2;

    if (clientX < halfWidth) {
      // Click on left side - go to previous slide
      sliderRef.current.slickPrev();
    } else {
      // Click on right side - go to next slide
      sliderRef.current.slickNext();
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sliderRef.current) return;

      if (e.key === 'ArrowLeft') {
        sliderRef.current.slickPrev();
      } else if (e.key === 'ArrowRight') {
        sliderRef.current.slickNext();
      } else if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);


  return (
    <div className="property-gallery w-screen h-screen">

      {/* Slide counter */}
      <div className="absolute bottom-4 left-4 z-50 bg-white bg-opacity-70 px-3 py-1 rounded-full text-deep-green">
        {currentSlide + 1} / {images.length}
      </div>

      <div
        ref={galleryRef}
        className={`main-slider cursor-none relative ${lightboxOpen ? 'fixed inset-0 z-40 bg-black' : 'h-[90vh] w-full'}`}
        style={{ maxHeight: '90vh' }}
        onClick={handleGalleryClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Custom cursor */}
        {showCursor && (
          <div
            className="pointer-events-none fixed z-50 transition-opacity duration-300"
            style={{
              left: `${mousePosition.x - 25}px`,
              top: `${mousePosition.y - 25}px`,
              opacity: 0.8
            }}
          >
            {cursorSide === "left" ? (
              <SlArrowLeft size={40} className="text-white" />
            ) : (
              <SlArrowRight size={40} className="text-white" />
            )}
          </div>
        )}
<Slider ref={sliderRef} {...settings}>
  {images.map((image, index) => (
    <div
      key={index}
      className="w-screen h-screen flex items-center justify-center bg-black/50"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={image}
          alt={`${propertyName} - Image ${index + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover lg:object-contain transition-opacity duration-1000 ease-in-out"
          loading="eager"
          onError={(e) => {
            console.error(`Failed to load image: ${image}`);
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/1920x1080?text=Image+Not+Available';
          }}
        />

        {/* 🖼️ Logo only on first image */}
        {index === 0 && (
          <img
            src={alogo} 
            alt="Logo"
            className="flex flex-col justify-center top-10 left-100 absolute w-[800px] z-50 opacity-90 hover:opacity-100 transition duration-300"
          />
        )}
      </div>
    </div>
  ))}
</Slider>
            </div>

    </div>
  );
}
