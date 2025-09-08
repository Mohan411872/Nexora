import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from './components/AnimatedLogo';
import TypewriterTagline from './components/TypewriterTagline';
import LoadingIndicator from './components/LoadingIndicator';
import BackgroundEffects from './components/BackgroundEffects';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsLoadingComplete(true);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random increment between 5-20
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Navigate after both animation and loading are complete
    if (isAnimationComplete && isLoadingComplete) {
      const timer = setTimeout(() => {
        // Check if user is already authenticated
        const authToken = localStorage.getItem('nexora_auth_token');
        const userSession = localStorage.getItem('nexora_user_session');
        
        if (authToken && userSession) {
          try {
            const sessionData = JSON.parse(userSession);
            const currentTime = new Date()?.getTime();
            
            // Check if session is still valid
            if (sessionData?.expiresAt && currentTime < sessionData?.expiresAt) {
              navigate('/main-dashboard', { replace: true });
              return;
            }
          } catch (error) {
            console.error('Session validation failed:', error);
          }
        }
        
        // Navigate to authentication if not logged in or session expired
        navigate('/user-authentication', { replace: true });
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isAnimationComplete, isLoadingComplete, navigate]);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* Logo and Branding Section */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-2xl mx-auto text-center">
          {/* Animated Logo */}
          <AnimatedLogo onAnimationComplete={handleAnimationComplete} />
          
          {/* Typewriter Tagline */}
          <TypewriterTagline delay={1200} />
          
          {/* Feature Highlights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl opacity-0 animate-fade-in" style={{ animationDelay: '3s', animationFillMode: 'forwards' }}>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <div className="w-6 h-6 bg-primary rounded-full" />
              </div>
              <p className="text-sm font-medium text-foreground">Smart Focus</p>
              <p className="text-xs text-muted-foreground">AI-powered distraction blocking</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <div className="w-6 h-6 bg-accent rounded-full" />
              </div>
              <p className="text-sm font-medium text-foreground">Gamification</p>
              <p className="text-xs text-muted-foreground">Rewards and achievements</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto">
                <div className="w-6 h-6 bg-warning rounded-full" />
              </div>
              <p className="text-sm font-medium text-foreground">Analytics</p>
              <p className="text-xs text-muted-foreground">Detailed progress tracking</p>
            </div>
          </div>
        </div>
        
        {/* Loading Section */}
        <div className="w-full max-w-md mx-auto mt-8">
          <LoadingIndicator 
            progress={loadingProgress} 
            isComplete={isLoadingComplete} 
          />
        </div>
        
        {/* Version Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground/60">
            Version 1.0.0 • {new Date()?.getFullYear()} Nexora
          </p>
        </div>
      </div>
      {/* Subtle Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default SplashScreen;