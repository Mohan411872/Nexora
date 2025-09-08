import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightsPanel = () => {
  // Mock insights data
  const insights = [
    {
      id: 1,
      type: 'streak',
      title: 'Focus Streak Achievement',
      description: 'You\'ve maintained focus for 3 consecutive days! Your longest streak this month.',
      icon: 'Flame',
      color: 'text-accent bg-accent/10',
      action: 'View Rewards',
      actionIcon: 'Trophy'
    },
    {
      id: 2,
      type: 'pattern',
      title: 'Peak Focus Hours',
      description: 'Your most productive time is 9-11 AM with 85% fewer distractions. Schedule important work during this window.',
      icon: 'Clock',
      color: 'text-primary bg-primary/10',
      action: 'Set Reminder',
      actionIcon: 'Bell'
    },
    {
      id: 3,
      type: 'improvement',
      title: 'Social Media Progress',
      description: 'Social media distractions decreased by 45% this week. Consider extending your focus sessions.',
      icon: 'TrendingDown',
      color: 'text-success bg-success/10',
      action: 'Extend Sessions',
      actionIcon: 'Plus'
    },
    {
      id: 4,
      type: 'suggestion',
      title: 'Weekend Focus Challenge',
      description: 'Your weekend focus drops by 30%. Try shorter 15-minute sessions to maintain consistency.',
      icon: 'Target',
      color: 'text-warning bg-warning/10',
      action: 'Try Challenge',
      actionIcon: 'Play'
    }
  ];

  const weeklyStats = {
    totalBlocked: 127,
    timesSaved: 485, // in minutes
    improvementRate: 23,
    consistencyScore: 87
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Weekly Summary Card */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Weekly Summary</h3>
              <p className="text-sm text-muted-foreground">Sep 1 - Sep 7, 2025</p>
            </div>
          </div>
          <Button variant="ghost" iconName="ExternalLink" iconPosition="right">
            View Details
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-error mb-1">{weeklyStats?.totalBlocked}</div>
            <div className="text-xs text-muted-foreground">Distractions Blocked</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent mb-1">{formatTime(weeklyStats?.timesSaved)}</div>
            <div className="text-xs text-muted-foreground">Time Saved</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">+{weeklyStats?.improvementRate}%</div>
            <div className="text-xs text-muted-foreground">Improvement</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{weeklyStats?.consistencyScore}%</div>
            <div className="text-xs text-muted-foreground">Consistency</div>
          </div>
        </div>
      </div>
      {/* Insights & Suggestions */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Lightbulb" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Smart Insights</h3>
              <p className="text-sm text-muted-foreground">Personalized recommendations</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {insights?.map((insight) => (
            <div
              key={insight?.id}
              className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${insight?.color}`}>
                <Icon name={insight?.icon} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground mb-1">{insight?.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{insight?.description}</p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={insight?.actionIcon}
                  iconPosition="left"
                  className="text-xs"
                >
                  {insight?.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Export Weekly Report
          </Button>
          
          <Button
            variant="outline"
            iconName="Settings"
            iconPosition="left"
            fullWidth
          >
            Adjust Block Settings
          </Button>
          
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            fullWidth
          >
            Schedule Focus Time
          </Button>
          
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            fullWidth
          >
            Share Progress
          </Button>
        </div>
      </div>
      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-border p-6">
        <div className="text-center">
          <Icon name="Quote" size={24} className="text-primary mx-auto mb-3" />
          <blockquote className="text-lg font-medium text-foreground mb-2">
            "The successful warrior is the average person with laser-like focus."
          </blockquote>
          <cite className="text-sm text-muted-foreground">— Bruce Lee</cite>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;