import React from 'react';
import Icon from '../../../components/AppIcon';

const DistractionCounter = ({ blockedCount, focusTime, sessionActive }) => {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Blocked Distractions Counter */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={24} className="text-error" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Blocked Distractions</h3>
              <p className="text-sm text-muted-foreground">Current session</p>
            </div>
          </div>
          {sessionActive && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs text-accent font-medium">Active</span>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-error mb-2">{blockedCount}</div>
          <p className="text-sm text-muted-foreground">Distractions prevented today</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="TrendingDown" size={16} className="text-accent" />
            <span className="text-sm text-accent font-medium">-23% from yesterday</span>
          </div>
        </div>
      </div>

      {/* Focus Time Counter */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Total Focus Time</h3>
              <p className="text-sm text-muted-foreground">Today's progress</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Goal: 4h</div>
            <div className="w-16 bg-muted rounded-full h-1 mt-1">
              <div 
                className="bg-primary rounded-full h-1 transition-all duration-300"
                style={{ width: `${Math.min((focusTime / 240) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">{formatTime(focusTime)}</div>
          <p className="text-sm text-muted-foreground">Deep work accomplished</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <span className="text-sm text-accent font-medium">+15% from yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistractionCounter;