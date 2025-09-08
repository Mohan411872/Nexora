import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BadgeCollection = ({ badges, className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState(null);

  const categories = [
    { id: 'all', label: 'All Badges', icon: 'Grid3X3' },
    { id: 'focus', label: 'Focus Master', icon: 'Target' },
    { id: 'streak', label: 'Consistency', icon: 'Flame' },
    { id: 'time', label: 'Time Warrior', icon: 'Clock' },
    { id: 'milestone', label: 'Milestones', icon: 'Trophy' }
  ];

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges?.filter(badge => badge?.category === selectedCategory);

  const earnedBadges = filteredBadges?.filter(badge => badge?.earned);
  const lockedBadges = filteredBadges?.filter(badge => !badge?.earned);

  const getBadgeIcon = (badge) => {
    const iconMap = {
      'First Focus': 'Play',
      'Focus Streak': 'Flame',
      'Time Master': 'Clock',
      'Deep Work': 'Brain',
      'Consistency King': 'Calendar',
      'Pomodoro Pro': 'Timer',
      'Distraction Slayer': 'Shield',
      'Weekly Warrior': 'Zap',
      'Monthly Master': 'Crown',
      'Focus Legend': 'Star'
    };
    return iconMap?.[badge?.name] || 'Award';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-accent';
    if (progress >= 50) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-minimal ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Badge Collection</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Award" size={16} />
            <span>{earnedBadges?.length} of {badges?.length} earned</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-focus ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={14} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {/* Earned Badges */}
        {earnedBadges?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
              <Icon name="CheckCircle" size={18} className="text-accent" />
              <span>Earned Badges ({earnedBadges?.length})</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {earnedBadges?.map((badge) => (
                <div
                  key={badge?.id}
                  onClick={() => setSelectedBadge(badge)}
                  className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-lg p-4 cursor-pointer hover:shadow-card transition-all duration-200 hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-minimal">
                      <Icon name={getBadgeIcon(badge)} size={24} color="white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{badge?.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{badge?.earnedDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {lockedBadges?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
              <Icon name="Lock" size={18} className="text-muted-foreground" />
              <span>Locked Badges ({lockedBadges?.length})</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lockedBadges?.map((badge) => (
                <div
                  key={badge?.id}
                  onClick={() => setSelectedBadge(badge)}
                  className="bg-muted/30 border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center relative">
                      <Icon name={getBadgeIcon(badge)} size={24} className="text-muted-foreground opacity-50" />
                      <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                        <Icon name="Lock" size={16} className="text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-muted-foreground text-sm">{badge?.name}</h4>
                      <div className="mt-2">
                        <div className="w-full bg-border rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              badge?.progress >= 80 ? 'bg-accent' : 
                              badge?.progress >= 50 ? 'bg-warning' : 'bg-muted-foreground'
                            }`}
                            style={{ width: `${badge?.progress}%` }}
                          />
                        </div>
                        <p className={`text-xs mt-1 ${getProgressColor(badge?.progress)}`}>
                          {badge?.progress}% complete
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Badge Details</h3>
              <button
                onClick={() => setSelectedBadge(null)}
                className="p-2 hover:bg-muted rounded-lg transition-focus"
              >
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                selectedBadge?.earned 
                  ? 'bg-accent shadow-minimal' 
                  : 'bg-muted relative'
              }`}>
                <Icon 
                  name={getBadgeIcon(selectedBadge)} 
                  size={32} 
                  color={selectedBadge?.earned ? "white" : "currentColor"}
                  className={!selectedBadge?.earned ? "text-muted-foreground opacity-50" : ""}
                />
                {!selectedBadge?.earned && (
                  <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                    <Icon name="Lock" size={20} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">{selectedBadge?.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedBadge?.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-foreground mb-2">Requirements</h5>
                <p className="text-sm text-muted-foreground">{selectedBadge?.requirements}</p>
              </div>

              {selectedBadge?.earned ? (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-accent">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-sm font-medium">Earned on {selectedBadge?.earnedDate}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/50 border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className={`text-sm font-medium ${getProgressColor(selectedBadge?.progress)}`}>
                      {selectedBadge?.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        selectedBadge?.progress >= 80 ? 'bg-accent' : 
                        selectedBadge?.progress >= 50 ? 'bg-warning' : 'bg-muted-foreground'
                      }`}
                      style={{ width: `${selectedBadge?.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => setSelectedBadge(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeCollection;