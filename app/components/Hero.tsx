import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [animationState, setAnimationState] = useState({
    imageLoaded: false,
    overlayReady: false
  });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Sequential animations
    const imageTimer = setTimeout(() => {
      setAnimationState(prev => ({ ...prev, imageLoaded: true }));
    }, 300);
    
    const overlayTimer = setTimeout(() => {
      setAnimationState(prev => ({ ...prev, overlayReady: true }));
    }, 1200);
    
    return () => {
      clearTimeout(imageTimer);
      clearTimeout(overlayTimer);
    };
  }, []);

  return (
    <div className="relative h-screen w-full flex justify-center overflow-hidden" style={{ marginTop: 0 }}>
      {/* Background mask that reveals the image */}
      <div 
        className={`absolute inset-0 bg-deep-green z-10 transition-transform duration-1500 ease-out ${
          animationState.imageLoaded ? 'translate-y-full' : 'translate-y-0'
        }`}
      />
      
      {/* Main hero image with subtle zoom */}
      <div className="relative w-[2500px] h-full mt-[-80px]">
        <img 
          ref={imageRef}
          src="public/images/IMG_8545 (1).webp" 
          alt="Glowing image" 
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-3000 ease-out border-2 border-off-white ${
            animationState.imageLoaded ? 'scale-100' : 'scale-75'
          }`}
        />
      </div>
      
      {/* Overlay image with fade-in and floating animation */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ease-out ${
          animationState.overlayReady ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <img 
          src="g" 
          alt="" 
          className="w-[900px] h-auto object-contain mx-auto animate-gentle-float"
        />
      </div>
    </div>
  );
}
