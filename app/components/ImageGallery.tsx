import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  propertyName: string;
}

export default function ImageGallery({ images, propertyName }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Main large image */}
        <div className="md:col-span-2 lg:col-span-2 h-96 md:h-[500px] rounded-lg overflow-hidden">
          <img 
            src={images[0]} 
            alt={`${propertyName} - Main view`}
            className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => openModal(0)}
          />
        </div>

        {/* Smaller images grid */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-4">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="h-[242px] rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt={`${propertyName} - View ${index + 2}`}
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openModal(index + 1)}
              />
            </div>
          ))}
        </div>

        {/* Mobile gallery (only first 3 images) */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {images.slice(1, 3).map((image, index) => (
            <div key={index} className="h-44 rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt={`${propertyName} - View ${index + 2}`}
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => openModal(index + 1)}
              />
            </div>
          ))}
        </div>

        {/* View all photos button */}
        <button 
          className="mt-4 md:mt-0 btn btn-outline w-full md:w-auto"
          onClick={() => openModal(0)}
        >
          View All Photos
        </button>
      </div>

      {/* Full screen modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%' }}>
          <button 
            className="absolute top-4 right-4 text-white hover:text-terracotta"
            onClick={closeModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-terracotta"
            onClick={prevImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="w-full max-w-5xl max-h-[80vh] flex items-center justify-center">
            <img 
              src={images[currentImageIndex]} 
              alt={`${propertyName} - Gallery view`}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>

          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-terracotta"
            onClick={nextImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-black bg-opacity-50 px-4 py-2 rounded-full text-white">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
