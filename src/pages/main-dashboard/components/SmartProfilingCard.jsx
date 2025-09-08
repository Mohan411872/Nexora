import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartProfilingCard = ({ className = '' }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user profiles with recommendations
  const profileTypes = {
    student: {
      type: 'Student',
      icon: 'GraduationCap',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      confidence: 87,
      description: 'Optimized for academic focus and study sessions',
      recommendations: [
        'Try 25-minute Pomodoro sessions for better retention',
        'Schedule deep work blocks during your peak hours',
        'Use distraction blocking during exam periods'
      ],
      suggestedGoals: {
        dailyFocus: 240, // 4 hours
        weeklyStreak: 5,
        preferredMode: 'Pomodoro'
      }
    },
    educator: {
      type: 'Educator',
      icon: 'Users',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      confidence: 92,
      description: 'Tailored for teaching preparation and grading',
      recommendations: [
        'Use deep work mode for lesson planning',
        'Set focused blocks for grading sessions',
        'Track preparation time for better scheduling'
      ],
      suggestedGoals: {
        dailyFocus: 180, // 3 hours
        weeklyStreak: 5,
        preferredMode: 'Deep Work'
      }
    },
    employee: {
      type: 'Professional',
      icon: 'Briefcase',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      confidence: 94,
      description: 'Designed for workplace productivity and meetings',
      recommendations: [
        'Block distractions during important calls',
        'Use custom timers for project deadlines',
        'Track focus time across different tasks'
      ],
      suggestedGoals: {
        dailyFocus: 300, // 5 hours
        weeklyStreak: 5,
        preferredMode: 'Custom'
      }
    }
  };

  useEffect(() => {
    // Simulate smart profiling analysis
    const analyzeUserProfile = () => {
      setIsLoading(true);
      
      // Mock analysis based on usage patterns
      setTimeout(() => {
        const profiles = Object.keys(profileTypes);
        const randomProfile = profiles?.[Math.floor(Math.random() * profiles?.length)];
        setUserProfile(profileTypes?.[randomProfile]);
        setIsLoading(false);
      }, 1500);
    };

    analyzeUserProfile();
  }, []);

  const handleApplyRecommendations = () => {
    if (userProfile) {
      // Save recommended settings to localStorage
      const recommendations = {
        profileType: userProfile?.type,
        dailyGoal: userProfile?.suggestedGoals?.dailyFocus,
        preferredMode: userProfile?.suggestedGoals?.preferredMode,
        appliedAt: new Date()?.toISOString()
      };
      
      localStorage.setItem('nexora_profile_recommendations', JSON.stringify(recommendations));
      
      // Show success feedback
      alert(`${userProfile?.type} recommendations applied successfully!`);
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 shadow-minimal ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
          <div>
            <div className="h-4 bg-muted rounded w-32 mb-2 animate-pulse" />
            <div className="h-3 bg-muted rounded w-24 animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="h-3 bg-muted rounded w-full animate-pulse" />
          <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
        </div>
        
        <div className="mt-6">
          <div className="h-10 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-minimal ${className}`}>
      {/* Profile Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${userProfile?.bgColor} ${userProfile?.borderColor} border-2 rounded-lg flex items-center justify-center`}>
            <Icon name={userProfile?.icon} size={24} className={userProfile?.color} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Smart Profile Analysis</h3>
            <p className="text-sm text-muted-foreground">AI-powered user type prediction</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">{userProfile?.confidence}% match</span>
          </div>
        </div>
      </div>
      {/* Profile Type */}
      <div className={`${userProfile?.bgColor} ${userProfile?.borderColor} border rounded-lg p-4 mb-6`}>
        <div className="flex items-center space-x-3 mb-2">
          <Icon name={userProfile?.icon} size={20} className={userProfile?.color} />
          <h4 className="text-lg font-semibold text-foreground">{userProfile?.type}</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{userProfile?.description}</p>
        
        {/* Suggested Goals */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {Math.floor(userProfile?.suggestedGoals?.dailyFocus / 60)}h {userProfile?.suggestedGoals?.dailyFocus % 60}m
            </div>
            <div className="text-xs text-muted-foreground">Daily Goal</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{userProfile?.suggestedGoals?.weeklyStreak}</div>
            <div className="text-xs text-muted-foreground">Week Streak</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{userProfile?.suggestedGoals?.preferredMode}</div>
            <div className="text-xs text-muted-foreground">Best Mode</div>
          </div>
        </div>
      </div>
      {/* Recommendations */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-foreground mb-3">Personalized Recommendations</h5>
        <div className="space-y-2">
          {userProfile?.recommendations?.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Action Button */}
      <Button
        variant="default"
        fullWidth
        iconName="Settings"
        iconPosition="left"
        onClick={handleApplyRecommendations}
      >
        Apply Recommendations
      </Button>
    </div>
  );
};

export default SmartProfilingCard;