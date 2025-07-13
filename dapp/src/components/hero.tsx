// Hero.tsx (without navigation)
import React, { useState, useEffect } from "react";

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay the text visibility for a longer unblur animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // 500ms delay before starting the unblur

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Main Hero Content */}
      <div className="relative w-full h-full bg-black">
        {/* Background Image - Enhanced for mobile */}
        <div className="w-full h-full overflow-hidden sm:overflow-visible relative">
          <img
            src="/hills.png"
            alt="AI Crypto Visualization"
            className="z-10 w-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-10 z-20"></div>
          {/* Gradient fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-30"></div>
        </div>

        {/* Typography overlaid on top of the image - Improved positioning for mobile */}
        <div className="absolute inset-0 z-20 flex flex-col items-center mt-72 sm:mt-32 md:mt-64">
          <div className="mt-96 sm:mt-64 md:mt-24">
            <div className="text-center px-4 md:px-0">
              <h1
                className={`text-7xl sm:text-5xl md:text-7xl font-extralight tracking-wider leading-tight mb-6 mt-20 transition-all duration-1000 ease-out ${
                  isLoaded
                    ? "opacity-100 filter blur-0 transform translate-y-0"
                    : "opacity-0 filter blur-md transform translate-y-8"
                }`}
              >
                <span className="opacity-80 font-thin">ENGAGED</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
