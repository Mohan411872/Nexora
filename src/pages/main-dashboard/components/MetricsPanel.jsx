import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MetricsPanel = ({ className = '' }) => {
  const [metrics, setMetrics] = useState({
    todayFocusTime: 0,
    currentStreak: 0,
    totalPoints: 0,
    weeklyGoal: 1800, // 30 hours in minutes
    completedSessions: 0,
    blockedDistractions: 0,
    recentAchievements: []
  });

  const [expandedMetric, setExpandedMetric] = useState(null);

  // Mock data for demonstration
  const mockMetrics = {
    todayFocusTime: 145, // 2h 25m
    currentStreak: 7,
    totalPoints: 2340,
    weeklyGoal: 1800,
    completedSessions: 12,
    blockedDistractions: 23,
    recentAchievements: [
      {
        id: 1,
        title: 'Focus Master',
        description: 'Completed 10 focus sessions',
        icon: 'Target',
        earnedAt: '2025-01-05',
        points: 100
      },
      {
        id: 2,
        title: 'Streak Champion',
        description: '7-day focus streak',
        icon: 'Flame',
        earnedAt: '2025-01-06',
        points: 150
      },
      {
        id: 3,
        title: 'Distraction Blocker',
        description: 'Blocked 20+ distractions',
        icon: 'Shield',
        earnedAt: '2025-01-06',
        points: 75
      }
    ]
  };

  useEffect(() => {
    // Load metrics from localStorage or use mock data
    const loadMetrics = () => {
      try {
        const savedProgress = localStorage.getItem('nexora_user_progress');
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          setMetrics({ ...mockMetrics, ...progress });
        } else {
          setMetrics(mockMetrics);
        }
      } catch (error) {
        console.error('Failed to load metrics:', error);
        setMetrics(mockMetrics);
      }
    };

    loadMetrics();

    // Update metrics every minute
    const interval = setInterval(loadMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const calculateWeeklyProgress = () => {
    return Math.min((metrics?.todayFocusTime * 7 / metrics?.weeklyGoal) * 100, 100);
  };

  const metricCards = [
    {
      id: 'focus-time',
      title: 'Today\'s Focus',
      value: formatTime(metrics?.todayFocusTime),
      icon: 'Clock',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+25m from yesterday',
      details: [
        `Total sessions: ${metrics?.completedSessions}`,
        `Average session: ${Math.floor(metrics?.todayFocusTime / Math.max(metrics?.completedSessions, 1))}m`,
        `Weekly goal: ${formatTime(metrics?.weeklyGoal)}`
      ]
    },
    {
      id: 'streak',
      title: 'Current Streak',
      value: `${metrics?.currentStreak} days`,
      icon: 'Flame',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: 'Personal best!',
      details: [
        'Longest streak: 12 days',
        'Average streak: 4.2 days',
        'Next milestone: 10 days'
      ]
    },
    {
      id: 'points',
      title: 'Total Points',
      value: metrics?.totalPoints?.toLocaleString(),
      icon: 'Star',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+180 today',
      details: [
        'This week: 890 points',
        'This month: 2,340 points',
        'Next level: 3,000 points'
      ]
    },
    {
      id: 'distractions',
      title: 'Blocked Today',
      value: `${metrics?.blockedDistractions}`,
      icon: 'Shield',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '-12% from yesterday',
      details: [
        'Most blocked: Social media',
        'Peak time: 2-4 PM',
        'Weekly total: 156 blocks'
      ]
    }
  ];

  const toggleExpanded = (metricId) => {
    setExpandedMetric(expandedMetric === metricId ? null : metricId);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards?.map((metric) => (
          <div
            key={metric?.id}
            className="bg-card rounded-lg border border-border p-4 shadow-minimal cursor-pointer hover:shadow-card transition-all duration-200"
            onClick={() => toggleExpanded(metric?.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${metric?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <Icon 
                name={expandedMetric === metric?.id ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground" 
              />
            </div>
            
            <div className="mb-2">
              <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
              <div className="text-xs text-muted-foreground">{metric?.title}</div>
            </div>
            
            <div className="text-xs text-accent">{metric?.change}</div>
            
            {/* Expanded Details */}
            {expandedMetric === metric?.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                {metric?.details?.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-xs text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Weekly Progress */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Weekly Progress</h3>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <span className="text-sm text-accent">{Math.round(calculateWeeklyProgress())}% complete</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Focus Time Goal</span>
            <span className="text-sm font-medium text-foreground">
              {formatTime(metrics?.todayFocusTime * 7)} / {formatTime(metrics?.weeklyGoal)}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-accent rounded-full h-3 transition-all duration-500 ease-out"
              style={{ width: `${calculateWeeklyProgress()}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']?.map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">{day}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                index < 6 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {index < 6 ? '✓' : '?'}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
          <Button variant="ghost" size="sm" iconName="Trophy" iconPosition="left">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {metrics?.recentAchievements?.slice(0, 3)?.map((achievement) => (
            <div key={achievement?.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name={achievement?.icon} size={20} className="text-warning" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{achievement?.title}</div>
                <div className="text-xs text-muted-foreground">{achievement?.description}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-accent">+{achievement?.points}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;