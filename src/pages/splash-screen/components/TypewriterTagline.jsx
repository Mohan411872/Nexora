import React, { useState, useEffect } from 'react';

const TypewriterTagline = ({ delay = 1000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const fullText = "Focus. Achieve. Excel.";
  const typingSpeed = 100;

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsVisible(true);
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= fullText?.length) {
          setDisplayText(fullText?.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <p className="text-lg md:text-xl text-muted-foreground text-center font-medium tracking-wide">
        {displayText}
        <span className="animate-pulse text-primary">|</span>
      </p>
      {/* Subtitle */}
      <div className={`mt-4 transition-all duration-700 delay-1000 ${
        displayText?.length >= fullText?.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        <p className="text-sm md:text-base text-muted-foreground/80 text-center">
          Next-generation focus enhancement with predictive distraction management
        </p>
      </div>
    </div>
  );
};

export default TypewriterTagline;