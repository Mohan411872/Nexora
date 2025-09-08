import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import DistractionCounter from './components/DistractionCounter';
import AnalyticsCharts from './components/AnalyticsCharts';
import RecentDistractions from './components/RecentDistractions';
import InsightsPanel from './components/InsightsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DistractionTracking = () => {
  const [trackingData, setTrackingData] = useState({
    blockedCount: 23,
    focusTime: 187,
    sessionActive: true,
    lastUpdated: new Date()
  });

  const [viewMode, setViewMode] = useState('overview');

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('nexora_distraction_tracking');
      if (savedData) {
        setTrackingData(prev => ({ ...prev, ...JSON.parse(savedData) }));
      }
    } catch (error) {
      console.error('Failed to load tracking data:', error);
    }

    const interval = setInterval(() => {
      if (trackingData?.sessionActive) {
        setTrackingData(prev => ({
          ...prev,
          lastUpdated: new Date()
        }));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [trackingData?.sessionActive]);

  const handleExportData = () => {
    const exportData = {
      date: new Date()?.toISOString(),
      blockedDistractions: trackingData?.blockedCount,
      focusTime: trackingData?.focusTime,
      sessionActive: trackingData?.sessionActive
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexora-tracking-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    link?.click();
    URL.revokeObjectURL(url);
  };

  const quickActions = [
    {
      title: 'Start Focus Session',
      description: 'Begin a new focused work session',
      icon: 'Play',
      color: 'text-primary bg-primary/10',
      path: '/focus-modes'
    },
    {
      title: 'View Rewards',
      description: 'Check your achievements and badges',
      icon: 'Trophy',
      color: 'text-warning bg-warning/10',
      path: '/rewards-and-achievements'
    },
    {
      title: 'Dashboard',
      description: 'Return to main dashboard',
      icon: 'LayoutDashboard',
      color: 'text-accent bg-accent/10',
      path: '/main-dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Distraction Tracking</h1>
            <p className="text-muted-foreground">
              Monitor your focus patterns and blocked distractions to improve concentration habits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  viewMode === 'overview'
                    ? 'bg-card text-foreground shadow-minimal'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  viewMode === 'detailed'
                    ? 'bg-card text-foreground shadow-minimal'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Detailed
              </button>
            </div>

            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={handleExportData}
            >
              Export Data
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Weekly Summary - full width */}
          <div className="col-span-12">
            <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
              <h2 className="text-lg font-semibold mb-2">Weekly Summary</h2>
              <p className="text-sm text-muted-foreground">
                Overview of your weekly focus trends and distractions.
              </p>
            </div>
          </div>

          {/* Distraction Counters - full width */}
          <div className="col-span-12">
            <DistractionCounter
              blockedCount={trackingData?.blockedCount}
              focusTime={trackingData?.focusTime}
              sessionActive={trackingData?.sessionActive}
            />
          </div>

          {/* Analytics Overview - full width */}
          <div className="col-span-12">
            <AnalyticsCharts />
          </div>

          {/* Progress Indicator */}
          <div className="col-span-12">
            <ProgressIndicator />
          </div>

          {/* Smart Insights - full width */}
          <div className="col-span-12">
            <InsightsPanel />
          </div>

          {/* Quick Actions - full width */}
          <div className="col-span-12">
            <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {quickActions.map((action, i) => (
                  <Link
                    key={i}
                    to={action.path}
                    className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                      <Icon name={action.icon} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground">{action.title}</h4>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Distractions - full width */}
          <div className="col-span-12">
            <RecentDistractions />
          </div>

          {/* Bruce Lee Quote - full width */}
          <div className="col-span-12">
            <div className="bg-card rounded-lg border border-border p-6 shadow-minimal text-center">
              <p className="text-lg italic text-foreground">
                "The successful warrior is the average person with laser-like focus."
              </p>
              <p className="mt-2 text-sm text-muted-foreground">— Bruce Lee</p>
            </div>
          </div>
        </div>

        {/* Session status bar */}
        {trackingData?.sessionActive && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card border border-border rounded-lg p-4 shadow-card z-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-foreground">Focus Session Active</p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {trackingData?.lastUpdated?.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <Link to="/focus-modes">
                <Button variant="ghost" size="sm" iconName="ExternalLink">
                  View
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistractionTracking;
