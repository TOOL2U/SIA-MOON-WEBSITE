import { useEffect, useState, useRef } from "react";

export const fonts = {
  elaSans: "/fonts/Ela Sans Regular.ttf",
  arioso: "/fonts/Arioso Regular.ttf"
};
export const heroImageWebp = "/images/IMG_8545 (1).webp";
export default function Hero() {
  const [animationState, setAnimationState] = useState({
    imageLoaded: false,
    overlayReady: false
  });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Sequential animations with longer delay for slow fade-in
    const imageTimer = setTimeout(() => {
      setAnimationState(prev => ({ ...prev, imageLoaded: true }));
    }, 100); // Start fade-in sooner

    const overlayTimer = setTimeout(() => {
      setAnimationState(prev => ({ ...prev, overlayReady: true }));
    }, 2000); // Delay overlay to allow image to fade in more

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(overlayTimer);
    };
  }, []);

  return (
    <div className="relative h-screen w-full flex justify-center overflow-hidden" style={{ marginTop: 0 }}>
      {/* Background mask removed to allow for clean fade-in */}
      <div
        className={`absolute inset-0 bg-deep-green z-10 transition-opacity duration-[2000ms] ${
          animationState.imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Main hero image with slow fade-in */}
      <div className="relative w-[2500px] h-full mt-[-80px]">
        <img
          ref={imageRef}
          src="https://i.ibb.co/0Vq2T6Yy/8453f772-29b5-45bd-9292-f8e20501f735.webp"
          alt="Hero background"
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-[5000ms] ease-in ${
            animationState.imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Overlay image with fade-in and floating animation */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ease-out ${
          animationState.overlayReady ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >

      </div>
    </div>
  );
}
