import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModeCard = ({ 
  mode, 
  isSelected, 
  onSelect, 
  className = '' 
}) => {
  const getModeIcon = (type) => {
    switch (type) {
      case 'pomodoro':
        return 'Timer';
      case 'deepwork':
        return 'Brain';
      case 'custom':
        return 'Settings';
      default:
        return 'Clock';
    }
  };

  const getModeColor = (type) => {
    switch (type) {
      case 'pomodoro':
        return 'text-red-500';
      case 'deepwork':
        return 'text-blue-500';
      case 'custom':
        return 'text-purple-500';
      default:
        return 'text-primary';
    }
  };

  return (
    <div 
      className={`bg-card rounded-lg border border-border p-6 transition-all duration-200 hover:shadow-card cursor-pointer ${
        isSelected ? 'ring-2 ring-primary shadow-card' : ''
      } ${className}`}
      onClick={() => onSelect(mode)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${getModeColor(mode?.type)}`}>
          <Icon name={getModeIcon(mode?.type)} size={24} />
        </div>
        {isSelected && (
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{mode?.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mode?.description}</p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{mode?.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{mode?.popularity}</span>
        </div>
      </div>
      <Button 
        variant={isSelected ? "default" : "outline"} 
        fullWidth
        iconName="Play"
        iconPosition="left"
        onClick={(e) => {
          e?.stopPropagation();
          onSelect(mode);
        }}
      >
        {isSelected ? 'Start Session' : 'Select Mode'}
      </Button>
    </div>
  );
};

export default ModeCard;