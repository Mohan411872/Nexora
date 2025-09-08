import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import Icon from '../../components/AppIcon';
import NotificationToggle from './components/NotificationToggle';
import QuietHoursSettings from './components/QuietHoursSettings';
import SoundSettings from './components/SoundSettings';
import NotificationHistory from './components/NotificationHistory';

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState({
    focusSessionAlerts: true,
    breakReminders: true,
    achievementNotifications: true,
    distractionWarnings: false,
    criticalAlerts: true,
  });

  const [quietHours, setQuietHours] = useState({
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
  });

  const [soundSettings, setSoundSettings] = useState({
    enabled: true,
    volume: 70,
    soundType: 'default',
  });

  useEffect(() => {
    document.title = 'Notification Management - Nexora';
  }, []);

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const notificationCategories = [
    {
      key: 'focusSessionAlerts',
      title: 'Focus Session Alerts',
      description: 'Get notified when your focus session starts, ends, or reaches milestones',
      icon: 'Target',
    },
    {
      key: 'breakReminders',
      title: 'Break Reminders',
      description: 'Gentle reminders to take healthy breaks during extended focus sessions',
      icon: 'Coffee',
    },
    {
      key: 'achievementNotifications',
      title: 'Achievement Notifications',
      description: 'Celebrate your progress with badges, streaks, and goal completions',
      icon: 'Award',
    },
    {
      key: 'distractionWarnings',
      title: 'Distraction Warnings',
      description: 'Real-time alerts when potentially distracting activities are detected',
      icon: 'AlertTriangle',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Bell" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Notification Management
              </h1>
              <p className="text-muted-foreground">
                Customize your focus experience with personalized notification preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Settings - Left Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Critical Alerts Section */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertCircle" size={16} className="text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Critical Alerts</h3>
                    <p className="text-sm text-muted-foreground">Always delivered regardless of other settings</p>
                  </div>
                </div>
                <NotificationToggle
                  enabled={notifications?.criticalAlerts}
                  onChange={() => handleToggle('criticalAlerts')}
                  disabled
                />
              </div>
              <div className="bg-accent/5 border border-accent/20 rounded-md p-4">
                <p className="text-sm text-muted-foreground">
                  Emergency notifications and system alerts will always be delivered regardless of other settings.
                  This ensures you never miss critical information about your account or urgent system updates.
                </p>
              </div>
            </div>

            {/* Notification Categories */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Settings" size={20} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Notification Categories</h2>
              </div>
              
              <div className="space-y-6">
                {notificationCategories?.map((category) => (
                  <div key={category?.key} className="flex items-start justify-between p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                        <Icon name={category?.icon} size={16} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-foreground mb-1">
                          {category?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {category?.description}
                        </p>
                        {notifications?.[category?.key] && (
                          <div className="mt-2 flex items-center space-x-4">
                            <select className="text-xs bg-background border border-border rounded px-2 py-1">
                              <option>Immediately</option>
                              <option>Every 5 minutes</option>
                              <option>Every 15 minutes</option>
                              <option>Every 30 minutes</option>
                            </select>
                            <button className="text-xs text-primary hover:text-primary/80">
                              Preview
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <NotificationToggle
                      enabled={notifications?.[category?.key]}
                      onChange={() => handleToggle(category?.key)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuietHoursSettings 
                settings={quietHours}
                onUpdate={setQuietHours}
              />
              <SoundSettings 
                settings={soundSettings}
                onUpdate={setSoundSettings}
              />
            </div>
          </div>

          {/* Right Column - History & Preview */}
          <div className="xl:col-span-1">
            <NotificationHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;