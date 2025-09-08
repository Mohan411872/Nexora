import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-pulse" />
      <div className="absolute top-40 right-16 w-16 h-16 bg-accent/5 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-warning/5 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-32 w-24 h-24 bg-success/5 rounded-lg animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 30s linear infinite'
        }} />
      </div>
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20" />
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/30 rounded-full animate-ping" style={{ animationDelay: '5s' }} />
      <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-warning/20 rounded-full animate-ping" style={{ animationDelay: '7s' }} />
      
      {/* Subtle Light Rays */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/20 to-transparent animate-pulse" />
      <div className="absolute bottom-0 right-1/3 w-px h-24 bg-gradient-to-t from-accent/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default BackgroundEffects;