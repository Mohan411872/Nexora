import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessGrid = ({ className = '' }) => {
  const quickAccessItems = [
    {
      id: 'focus-modes',
      title: 'Focus Modes',
      description: 'Start Pomodoro, Deep Work, or Custom timers',
      icon: 'Timer',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      route: '/focus-modes',
      stats: '3 modes available',
      features: ['Pomodoro Timer', 'Deep Work Sessions', 'Custom Duration']
    },
    {
      id: 'distraction-tracking',
      title: 'Distraction Tracking',
      description: 'Monitor and analyze your focus patterns',
      icon: 'BarChart3',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      route: '/distraction-tracking',
      stats: 'Real-time analytics',
      features: ['Block Counter', 'Focus Analytics', 'Weekly Reports']
    },
    {
      id: 'rewards-achievements',
      title: 'Rewards & Achievements',
      description: 'View your progress and unlock new badges',
      icon: 'Trophy',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      route: '/rewards-and-achievements',
      stats: '12 badges available',
      features: ['Progress Tracking', 'Badge Collection', 'Streak Rewards']
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {quickAccessItems?.map((item) => (
        <Link
          key={item?.id}
          to={item?.route}
          className="group block"
        >
          <div className={`bg-card rounded-lg border ${item?.borderColor} p-6 shadow-minimal hover:shadow-card transition-all duration-200 group-hover:scale-[1.02] group-hover:border-primary/30`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={item?.icon} size={24} className={item?.iconColor} />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="ArrowRight" size={20} className="text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {item?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {item?.description}
              </p>
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{item?.stats}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {item?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span className="text-xs text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Hover Effect Indicator */}
            <div className="mt-4 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center justify-center space-x-2 text-primary">
                <span className="text-sm font-medium">Get Started</span>
                <Icon name="ChevronRight" size={16} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickAccessGrid;