import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressIndicator = ({ className = '', variant = 'default' }) => {
  const location = useLocation();
  const [progressData, setProgressData] = useState({
    currentStreak: 0,
    totalPoints: 0,
    todayFocusTime: 0,
    weeklyGoal: 1800, // 30 hours in minutes
    dailyGoal: 240, // 4 hours in minutes
    level: 1,
    nextLevelPoints: 1000,
    achievements: []
  });

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loadProgressData = () => {
      try {
        const savedProgress = localStorage.getItem('nexora_user_progress');
        const savedSession = localStorage.getItem('nexora_current_session');
        
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          let updatedProgress = { ...progressData, ...progress };

          // Add current session time if active
          if (savedSession) {
            const session = JSON.parse(savedSession);
            if (session?.isActive && session?.startTime) {
              const currentTime = new Date()?.getTime();
              const sessionDuration = Math.floor((currentTime - session?.startTime) / 60000);
              updatedProgress.todayFocusTime += sessionDuration;
            }
          }

          setProgressData(updatedProgress);
        }
      } catch (error) {
        console.error('Failed to load progress data:', error);
      }
    };

    loadProgressData();

    // Update progress every minute during active sessions
    const interval = setInterval(loadProgressData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Hide on authentication pages
  useEffect(() => {
    const hideOnRoutes = ['/splash-screen', '/user-authentication'];
    setIsVisible(!hideOnRoutes?.includes(location?.pathname));
  }, [location?.pathname]);

  if (!isVisible) return null;

  const calculateProgress = () => {
    const dailyProgress = Math.min((progressData?.todayFocusTime / progressData?.dailyGoal) * 100, 100);
    const levelProgress = Math.min((progressData?.totalPoints / progressData?.nextLevelPoints) * 100, 100);
    return { dailyProgress, levelProgress };
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const { dailyProgress, levelProgress } = calculateProgress();

  // Compact variant for mobile/small spaces
  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Flame" size={16} className="text-accent" />
          </div>
          <span className="text-sm font-medium text-foreground">{progressData?.currentStreak}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Star" size={16} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">{progressData?.totalPoints}</span>
        </div>
      </div>
    );
  }

  // Default variant with full progress display
  return (
    <div className={`bg-card rounded-lg border border-border p-4 shadow-minimal ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Today's Progress</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Level {progressData?.level}</span>
        </div>
      </div>
      {/* Daily Focus Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Focus Time</span>
          <span className="text-xs font-medium text-foreground">
            {formatTime(progressData?.todayFocusTime)} / {formatTime(progressData?.dailyGoal)}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300 ease-out"
            style={{ width: `${dailyProgress}%` }}
          />
        </div>
      </div>
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Current Streak */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Flame" size={16} className="text-accent" />
          </div>
          <div className="text-lg font-semibold text-foreground">{progressData?.currentStreak}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>

        {/* Total Points */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Star" size={16} className="text-primary" />
          </div>
          <div className="text-lg font-semibold text-foreground">{progressData?.totalPoints}</div>
          <div className="text-xs text-muted-foreground">Points</div>
        </div>

        {/* Achievements */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Trophy" size={16} className="text-warning" />
          </div>
          <div className="text-lg font-semibold text-foreground">{progressData?.achievements?.length}</div>
          <div className="text-xs text-muted-foreground">Badges</div>
        </div>
      </div>
      {/* Level Progress */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Level Progress</span>
          <span className="text-xs font-medium text-foreground">
            {progressData?.totalPoints} / {progressData?.nextLevelPoints}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-accent to-primary rounded-full h-2 transition-all duration-300 ease-out"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Hook for progress management
export const useProgress = () => {
  const [progress, setProgress] = useState(null);

  const updateProgress = (updates) => {
    try {
      const currentProgress = JSON.parse(localStorage.getItem('nexora_user_progress') || '{}');
      const updatedProgress = { ...currentProgress, ...updates };
      
      localStorage.setItem('nexora_user_progress', JSON.stringify(updatedProgress));
      setProgress(updatedProgress);
      
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('progressUpdated', { detail: updatedProgress }));
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const addFocusSession = (duration, mode = 'pomodoro') => {
    const points = Math.floor(duration / 5); // 1 point per 5 minutes
    const currentProgress = JSON.parse(localStorage.getItem('nexora_user_progress') || '{}');
    
    const updates = {
      todayFocusTime: (currentProgress?.todayFocusTime || 0) + duration,
      totalPoints: (currentProgress?.totalPoints || 0) + points,
      totalSessions: (currentProgress?.totalSessions || 0) + 1,
      lastSessionDate: new Date()?.toISOString(),
      sessionHistory: [
        ...(currentProgress?.sessionHistory || []),
        {
          duration,
          mode,
          points,
          date: new Date()?.toISOString()
        }
      ]?.slice(-50) // Keep last 50 sessions
    };

    updateProgress(updates);
    return points;
  };

  const updateStreak = () => {
    const currentProgress = JSON.parse(localStorage.getItem('nexora_user_progress') || '{}');
    const today = new Date()?.toDateString();
    const lastActive = currentProgress?.lastActiveDate ? new Date(currentProgress.lastActiveDate)?.toDateString() : null;
    
    let newStreak = currentProgress?.currentStreak || 0;
    
    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday?.setDate(yesterday?.getDate() - 1);
      
      if (lastActive === yesterday?.toDateString()) {
        newStreak += 1;
      } else if (lastActive !== today) {
        newStreak = 1;
      }
      
      updateProgress({
        currentStreak: newStreak,
        lastActiveDate: new Date()?.toISOString()
      });
    }
    
    return newStreak;
  };

  const getProgress = () => {
    try {
      return JSON.parse(localStorage.getItem('nexora_user_progress') || '{}');
    } catch (error) {
      console.error('Failed to get progress:', error);
      return {};
    }
  };

  useEffect(() => {
    setProgress(getProgress());
    
    const handleProgressUpdate = (event) => {
      setProgress(event?.detail);
    };
    
    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, []);

  return {
    progress,
    updateProgress,
    addFocusSession,
    updateStreak,
    getProgress
  };
};

export default ProgressIndicator;