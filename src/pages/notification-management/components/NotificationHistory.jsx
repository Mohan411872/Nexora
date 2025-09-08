import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationHistory = () => {
  const recentNotifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'Focus Streak Achievement',
      message: 'Congratulations! You\'ve maintained a 7-day focus streak.',
      timestamp: '2 hours ago',
      read: true,
    },
    {
      id: 2,
      type: 'break',
      title: 'Break Reminder',
      message: 'Time for a healthy break after 45 minutes of focused work.',
      timestamp: '4 hours ago',
      read: true,
    },
    {
      id: 3,
      type: 'focus',
      title: 'Focus Session Complete',
      message: 'Great job! You completed a 25-minute deep focus session.',
      timestamp: '1 day ago',
      read: false,
    },
    {
      id: 4,
      type: 'distraction',
      title: 'Distraction Alert',
      message: 'Social media detected. Stay focused on your current task.',
      timestamp: '2 days ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement':
        return 'Award';
      case 'break':
        return 'Coffee';
      case 'focus':
        return 'Target';
      case 'distraction':
        return 'AlertTriangle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'achievement':
        return 'text-success';
      case 'break':
        return 'text-warning';
      case 'focus':
        return 'text-primary';
      case 'distraction':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Recent Notifications</h2>
        </div>
        <button className="text-sm text-primary hover:text-primary/80">
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {recentNotifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`p-4 rounded-lg border transition-colors ${
              notification?.read 
                ? 'border-border/50 bg-background/50' :'border-primary/20 bg-primary/5'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                notification?.read ? 'bg-muted' : 'bg-primary/10'
              }`}>
                <Icon 
                  name={getNotificationIcon(notification?.type)} 
                  size={12} 
                  className={getNotificationColor(notification?.type)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium text-foreground">
                    {notification?.title}
                  </h4>
                  {!notification?.read && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {notification?.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {notification?.timestamp}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="text-xs text-primary hover:text-primary/80">
                      Mark Read
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-destructive">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full px-4 py-2 text-sm text-primary hover:text-primary/80 hover:bg-primary/5 rounded-md transition-colors">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationHistory;