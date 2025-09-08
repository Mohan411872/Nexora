import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressStats = ({ stats, className = '' }) => {
  const {
    totalFocusTime,
    completedSessions,
    averageSessionLength,
    longestStreak,
    currentLevel,
    nextLevelProgress,
    weeklyGoal,
    weeklyProgress
  } = stats;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatLargeNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000)?.toFixed(1)}k`;
    }
    return num?.toString();
  };

  const progressPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);
  const levelProgressPercentage = Math.min(nextLevelProgress, 100);

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-minimal ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Progress Overview</h2>
        <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
          <Icon name="TrendingUp" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Level {currentLevel}</span>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Clock" size={20} color="white" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{formatTime(totalFocusTime)}</div>
          <div className="text-xs text-muted-foreground">Total Focus Time</div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg border border-accent/20">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={20} color="white" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{formatLargeNumber(completedSessions)}</div>
          <div className="text-xs text-muted-foreground">Sessions Completed</div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-warning/5 to-warning/10 rounded-lg border border-warning/20">
          <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Flame" size={20} color="white" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{longestStreak}</div>
          <div className="text-xs text-muted-foreground">Longest Streak</div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg border border-secondary/20">
          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="BarChart3" size={20} color="white" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{formatTime(averageSessionLength)}</div>
          <div className="text-xs text-muted-foreground">Avg Session</div>
        </div>
      </div>

      {/* Weekly Goal Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span>Weekly Goal</span>
          </h3>
          <span className="text-sm text-muted-foreground">
            {formatTime(weeklyProgress)} / {formatTime(weeklyGoal)}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-accent rounded-full h-3 transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">0%</span>
          <span className="text-xs font-medium text-foreground">{Math.round(progressPercentage)}%</span>
          <span className="text-xs text-muted-foreground">100%</span>
        </div>
      </div>

      {/* Level Progress */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Icon name="Star" size={16} className="text-warning" />
            <span>Level Progress</span>
          </h3>
          <span className="text-sm text-muted-foreground">
            Level {currentLevel} → {currentLevel + 1}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-warning to-accent rounded-full h-3 transition-all duration-500 ease-out"
            style={{ width: `${levelProgressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">Level {currentLevel}</span>
          <span className="text-xs font-medium text-foreground">{Math.round(levelProgressPercentage)}%</span>
          <span className="text-xs text-muted-foreground">Level {currentLevel + 1}</span>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={18} color="white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm mb-1">Keep it up!</h4>
            <p className="text-xs text-muted-foreground">
              You're {Math.round(100 - progressPercentage)}% away from reaching your weekly goal. 
              Stay focused and you'll get there!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;