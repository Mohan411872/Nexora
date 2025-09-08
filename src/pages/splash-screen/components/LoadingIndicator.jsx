import React, { useState, useEffect } from 'react';

const LoadingIndicator = ({ progress = 0, isComplete = false }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingStages = [
    { progress: 20, text: 'Loading components...' },
    { progress: 45, text: 'Setting up workspace...' },
    { progress: 70, text: 'Preparing focus modes...' },
    { progress: 90, text: 'Almost ready...' },
    { progress: 100, text: 'Welcome to Nexora!' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    // Update loading text based on progress
    const currentStage = loadingStages?.find(stage => progress >= stage?.progress);
    if (currentStage) {
      setLoadingText(currentStage?.text);
    }

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        
        {/* Progress Glow Effect */}
        <div 
          className="absolute top-0 h-2 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full blur-sm transition-all duration-500"
          style={{ width: `${animatedProgress}%` }}
        />
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground font-medium">
          {loadingText}
        </p>
        
        {/* Animated Dots */}
        {!isComplete && (
          <div className="flex justify-center items-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="text-center animate-fade-in">
          <p className="text-sm text-accent font-medium">
            ✨ Ready to boost your productivity!
          </p>
        </div>
      )}
    </div>
  );
};

export default LoadingIndicator;