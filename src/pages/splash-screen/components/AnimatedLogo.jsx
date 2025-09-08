import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AnimatedLogo = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [logoScale, setLogoScale] = useState(0.8);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
      setLogoScale(1);
    }, 300);

    // Complete animation after 2 seconds
    const completeTimer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Animated Logo Container */}
      <div 
        className={`relative transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ transform: `scale(${logoScale})` }}
      >
        {/* Logo Background Circle */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-card">
          {/* Pulsing Ring Animation */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-primary/10 animate-pulse" />
          
          {/* Logo Icon */}
          <Icon 
            name="Focus" 
            size={48} 
            color="white" 
            className="relative z-10 md:w-16 md:h-16" 
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-warning rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Brand Name */}
      <div className={`transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Nexora
        </h1>
      </div>
    </div>
  );
};

export default AnimatedLogo;