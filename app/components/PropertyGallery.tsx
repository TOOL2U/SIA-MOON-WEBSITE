import { useState } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-deep-green transition-all duration-300"
      onClick={onClick}
      aria-label="Next image"
    >
      <FaArrowRight size={20} />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-deep-green transition-all duration-300"
      onClick={onClick}
      aria-label="Previous image"
    >
      <FaArrowLeft size={20} />
    </button>
  );
}

export default function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const mainSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: any, next: number) => setCurrentSlide(next),
  };
  
  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: images.length > 5 ? 5 : images.length,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: images.length > 4 ? 4 : images.length,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: images.length > 3 ? 3 : images.length,
        }
      }
    ]
  };
  
  const lightboxSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="property-gallery">
      <div className="main-slider mb-2 cursor-pointer" onClick={() => setLightboxOpen(true)}>
        <Slider {...mainSettings}>
          {images.map((image, index) => (
            <div key={index} className="h-[500px]">
              <img 
                src={image} 
                alt={`${propertyName} - Image ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
      
      <div className="thumbnail-slider">
        <Slider 
          dots={thumbnailSettings.dots}
          infinite={thumbnailSettings.infinite}
          speed={thumbnailSettings.speed}
          slidesToShow={thumbnailSettings.slidesToShow}
          slidesToScroll={thumbnailSettings.slidesToScroll}
          focusOnSelect={thumbnailSettings.focusOnSelect}
          responsive={thumbnailSettings.responsive}
        >
          {images.map((image, index) => (
            <div key={index} className="px-1">
              <button 
                onClick={() => setCurrentSlide(index)}
                className={`block w-full h-24 overflow-hidden rounded-md ${currentSlide === index ? 'ring-2 ring-deep-green' : ''}`}
              >
                <img 
                  src={image} 
                  alt={`${propertyName} - Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          ))}
        </Slider>
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white hover:text-terracotta z-10"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close gallery"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-full max-w-6xl">
            <Slider 
              dots={lightboxSettings.dots}
              infinite={lightboxSettings.infinite}
              speed={lightboxSettings.speed}
              slidesToShow={lightboxSettings.slidesToShow}
              slidesToScroll={lightboxSettings.slidesToScroll}
              initialSlide={lightboxSettings.initialSlide}
              nextArrow={lightboxSettings.nextArrow}
              prevArrow={lightboxSettings.prevArrow}
            >
              {images.map((image, index) => (
                <div key={index} className="h-[80vh] flex items-center justify-center">
                  <img 
                    src={image} 
                    alt={`${propertyName} - Image ${index + 1}`} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}
