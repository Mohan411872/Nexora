import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SessionStats = ({ className = '' }) => {
  const [stats, setStats] = useState({
    todaySessions: 0,
    totalFocusTime: 0,
    currentStreak: 0,
    weeklyGoal: 1800, // 30 hours in minutes
    completedToday: 0,
    averageSession: 0,
    bestStreak: 0,
    totalSessions: 0
  });

  useEffect(() => {
    // Load stats from localStorage
    const loadStats = () => {
      try {
        const savedStats = localStorage.getItem('nexora_focus_stats');
        if (savedStats) {
          const parsedStats = JSON.parse(savedStats);
          setStats(prevStats => ({ ...prevStats, ...parsedStats }));
        }
      } catch (error) {
        console.error('Failed to load focus stats:', error);
      }
    };

    loadStats();

    // Listen for stats updates
    const handleStatsUpdate = (event) => {
      if (event?.detail) {
        setStats(prevStats => ({ ...prevStats, ...event?.detail }));
      }
    };

    window.addEventListener('focusStatsUpdated', handleStatsUpdate);
    return () => window.removeEventListener('focusStatsUpdated', handleStatsUpdate);
  }, []);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getWeeklyProgress = () => {
    return Math.min((stats?.totalFocusTime / stats?.weeklyGoal) * 100, 100);
  };

  const statItems = [
    {
      icon: 'Target',
      label: 'Today\'s Sessions',
      value: stats?.todaySessions,
      color: 'text-primary'
    },
    {
      icon: 'Clock',
      label: 'Total Focus Time',
      value: formatTime(stats?.totalFocusTime),
      color: 'text-blue-500'
    },
    {
      icon: 'Flame',
      label: 'Current Streak',
      value: `${stats?.currentStreak} days`,
      color: 'text-orange-500'
    },
    {
      icon: 'TrendingUp',
      label: 'Average Session',
      value: formatTime(stats?.averageSession),
      color: 'text-green-500'
    }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Session Statistics</h3>
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
      </div>
      {/* Weekly Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Weekly Goal Progress</span>
          <span className="text-sm text-muted-foreground">
            {formatTime(stats?.totalFocusTime)} / {formatTime(stats?.weeklyGoal)}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-blue-500 rounded-full h-3 transition-all duration-500 ease-out"
            style={{ width: `${getWeeklyProgress()}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {Math.round(getWeeklyProgress())}% completed
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
            <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center mx-auto mb-2 ${item?.color}`}>
              <Icon name={item?.icon} size={20} />
            </div>
            <div className="text-lg font-semibold text-foreground mb-1">{item?.value}</div>
            <div className="text-xs text-muted-foreground">{item?.label}</div>
          </div>
        ))}
      </div>
      {/* Quick Insights */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Insights</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Best Streak</span>
            <span className="font-medium text-foreground">{stats?.bestStreak} days</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Sessions</span>
            <span className="font-medium text-foreground">{stats?.totalSessions}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This Week</span>
            <span className="font-medium text-foreground">{stats?.completedToday} sessions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionStats;