import React from 'react';
import Icon from '../../../components/AppIcon';

const PointsDashboard = ({ userStats, className = '' }) => {
  const { currentPoints, totalEarned, currentStreak, bestStreak, recentEarnings } = userStats;

  const formatPoints = (points) => {
    return points?.toLocaleString();
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-minimal ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Points Dashboard</h2>
        <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
          <Icon name="Star" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">{formatPoints(currentPoints)} Points</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Current Balance */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Coins" size={20} color="white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold text-foreground">{formatPoints(currentPoints)}</p>
            </div>
          </div>
        </div>

        {/* Total Earned */}
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg p-4 border border-accent/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <p className="text-2xl font-bold text-foreground">{formatPoints(totalEarned)}</p>
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-gradient-to-br from-warning/5 to-warning/10 rounded-lg p-4 border border-warning/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
              <Icon name="Flame" size={20} color="white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold text-foreground">{currentStreak} days</p>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Earnings */}
      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Earnings</h3>
        <div className="space-y-2">
          {recentEarnings?.map((earning, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={earning?.icon} size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{earning?.activity}</p>
                  <p className="text-xs text-muted-foreground">{earning?.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-accent">+{earning?.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsDashboard;