import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentAchievements = ({ achievements, className = '' }) => {
  const getAchievementIcon = (type) => {
    const iconMap = {
      'badge': 'Award',
      'milestone': 'Trophy',
      'streak': 'Flame',
      'points': 'Star'
    };
    return iconMap?.[type] || 'CheckCircle';
  };

  const getAchievementColor = (type) => {
    const colorMap = {
      'badge': 'text-primary',
      'milestone': 'text-warning',
      'streak': 'text-accent',
      'points': 'text-secondary'
    };
    return colorMap?.[type] || 'text-primary';
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-minimal ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Recent Achievements</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last 7 days</span>
        </div>
      </div>
      {achievements?.length > 0 ? (
        <div className="space-y-3">
          {achievements?.map((achievement, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10 hover:shadow-minimal transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                achievement?.type === 'badge' ? 'bg-primary/10' :
                achievement?.type === 'milestone' ? 'bg-warning/10' :
                achievement?.type === 'streak' ? 'bg-accent/10' : 'bg-secondary/10'
              }`}>
                <Icon 
                  name={getAchievementIcon(achievement?.type)} 
                  size={20} 
                  className={getAchievementColor(achievement?.type)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm mb-1">{achievement?.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{achievement?.description}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(achievement?.earnedAt)}</span>
                  {achievement?.points && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Plus" size={10} className="text-accent" />
                      <span className="text-xs font-medium text-accent">{achievement?.points} points</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Trophy" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No recent achievements</h3>
          <p className="text-sm text-muted-foreground">
            Complete focus sessions to start earning achievements!
          </p>
        </div>
      )}
      {achievements?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center">
            <button className="text-sm text-primary hover:text-primary/80 font-medium transition-focus flex items-center space-x-1">
              <span>View all achievements</span>
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentAchievements;