import { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface FullScreenGalleryProps {
  images: string[];
  propertyName: string;
  autoplaySpeed?: number; // in milliseconds
  onClose?: () => void;
}

export default function FullScreenGallery({
  images,
  propertyName,
  autoplaySpeed = 5000, // Default to 5 seconds per image
  onClose
}: FullScreenGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showLeftCursor, setShowLeftCursor] = useState(false);
  const [showRightCursor, setShowRightCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const transitionDuration = 3000; // 3 seconds for ultra-smooth transition

  // Function to go to the next image
  const goToNext = useCallback(() => {
    if (isTransitioning || !images || images.length <= 1) return;

    try {
      setIsTransitioning(true);
      const nextIdx = (currentIndex + 1) % images.length;
      setNextIndex(nextIdx);

      // After transition completes, update current index
      setTimeout(() => {
        setCurrentIndex(nextIdx);
        setIsTransitioning(false);
      }, transitionDuration);
    } catch (error) {
      console.error('Error in goToNext:', error);
      setIsTransitioning(false);
    }
  }, [currentIndex, images, images?.length, isTransitioning, transitionDuration]);

  // Function to go to the previous image
  const goToPrev = useCallback(() => {
    if (isTransitioning || !images || images.length <= 1) return;

    try {
      setIsTransitioning(true);
      const prevIdx = (currentIndex - 1 + images.length) % images.length;
      setNextIndex(prevIdx);

      // After transition completes, update current index
      setTimeout(() => {
        setCurrentIndex(prevIdx);
        setIsTransitioning(false);
      }, transitionDuration);
    } catch (error) {
      console.error('Error in goToPrev:', error);
      setIsTransitioning(false);
    }
  }, [currentIndex, images, images?.length, isTransitioning, transitionDuration]);

  // Handle autoplay
  useEffect(() => {
    if (isPaused || !images || images.length <= 1) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer for the next slide
    timerRef.current = setTimeout(() => {
      goToNext();
    }, autoplaySpeed);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isPaused, autoplaySpeed, goToNext, images.length]);

  // Handle mouse movement to show cursor indicators
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const { width } = containerRef.current.getBoundingClientRect();
    const halfWidth = width / 2;

    setMousePosition({ x: clientX, y: clientY });

    // Show left/right cursor based on which half of the screen the mouse is on
    setShowLeftCursor(clientX < halfWidth);
    setShowRightCursor(clientX >= halfWidth);
  }, []);

  // Handle click to navigate
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { clientX } = e;
    const { width } = containerRef.current.getBoundingClientRect();
    const halfWidth = width / 2;

    if (clientX < halfWidth) {
      goToPrev();
    } else {
      goToNext();
    }
  }, [goToNext, goToPrev]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNext, goToPrev, onClose]);

  // Enhanced preloading for smoother transitions
  useEffect(() => {
    if (!images || images.length === 0) return;

    // Preload all images with higher priority for adjacent images
    const preloadImages = async () => {
      try {
        // Create a copy of the current loaded state
        const loadedState = { ...imagesLoaded };

        // First preload the current and next images with high priority
        const criticalImages = [
          images[currentIndex],
          images[nextIndex],
          images[(currentIndex + 1) % images.length],
          images[(currentIndex - 1 + images.length) % images.length]
        ].filter(Boolean); // Filter out any undefined values

      // Create promises for critical images
      const criticalPromises = criticalImages.map(src => {
        if (loadedState[src]) return Promise.resolve(true);

        return new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => {
            loadedState[src] = true;
            resolve(true);
          };
          img.onerror = () => {
            loadedState[src] = false;
            resolve(false);
          };
          img.src = src;
        });
      });

      // Wait for critical images to load
      await Promise.all(criticalPromises);

      // Then preload the rest of the images
      images.forEach(src => {
        if (!criticalImages.includes(src) && !loadedState[src]) {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => ({ ...prev, [src]: true }));
          };
          img.src = src;
        }
      });

      setImagesLoaded(loadedState);
      } catch (error) {
        console.error('Error in preloadImages:', error);
      }
    };

    preloadImages();
  }, [images, currentIndex, nextIndex, imagesLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Images Container */}
      <div className="absolute inset-0">
        {/* Current Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: isTransitioning ? 0 : 1 }}
        >
          <img
            src={images && images[currentIndex]}
            alt={`${propertyName} - Image ${currentIndex + 1}`}
            className="w-full h-full object-contain transform-gpu"
            style={{
              transition: `opacity ${transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
              opacity: isTransitioning ? 0 : 1,
              willChange: 'opacity',
            }}
          />
        </div>

        {/* Next Image (for transition) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: isTransitioning ? 1 : 0 }}
        >
          <img
            src={images && images[nextIndex]}
            alt={`${propertyName} - Image ${nextIndex + 1}`}
            className="w-full h-full object-contain transform-gpu"
            style={{
              transition: `opacity ${transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
              opacity: isTransitioning ? 1 : 0,
              willChange: 'opacity',
            }}
          />
        </div>
      </div>

      {/* Custom cursor indicators */}
      {showLeftCursor && (
        <div
          className="fixed z-20 pointer-events-none transition-opacity duration-300"
          style={{
            left: `${mousePosition.x - 25}px`,
            top: `${mousePosition.y - 25}px`,
            opacity: 0.8
          }}
        >
          <div className="bg-white bg-opacity-50 rounded-full p-3">
            <FaChevronLeft className="text-black text-2xl" />
          </div>
        </div>
      )}

      {showRightCursor && (
        <div
          className="fixed z-20 pointer-events-none transition-opacity duration-300"
          style={{
            left: `${mousePosition.x - 25}px`,
            top: `${mousePosition.y - 25}px`,
            opacity: 0.8
          }}
        >
          <div className="bg-white bg-opacity-50 rounded-full p-3">
            <FaChevronRight className="text-black text-2xl" />
          </div>
        </div>
      )}

      {/* Navigation buttons (visible on hover) */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-50 hover:bg-opacity-80 p-3 rounded-full text-black transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
        aria-label="Previous image"
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-50 hover:bg-opacity-80 p-3 rounded-full text-black transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        aria-label="Next image"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Close button */}
      {onClose && (
        <button
          className="absolute top-4 right-4 z-30 bg-white bg-opacity-50 hover:bg-opacity-80 p-3 rounded-full text-black transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close gallery"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Image counter */}
      {images && images.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnail navigation */}
      {images && images.length > 0 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (isTransitioning || index === currentIndex) return;

                try {
                  setIsTransitioning(true);
                  setNextIndex(index);

                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, transitionDuration);
                } catch (error) {
                  console.error('Error in thumbnail navigation:', error);
                  setIsTransitioning(false);
                }
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
