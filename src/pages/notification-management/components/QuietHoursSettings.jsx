import React from 'react';
import Icon from '../../../components/AppIcon';
import NotificationToggle from './NotificationToggle';

const QuietHoursSettings = ({ settings, onUpdate }) => {
  const handleToggle = () => {
    onUpdate(prev => ({
      ...prev,
      enabled: !prev?.enabled
    }));
  };

  const handleTimeChange = (field, value) => {
    onUpdate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Moon" size={16} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quiet Hours</h3>
            <p className="text-sm text-muted-foreground">Pause non-critical notifications</p>
          </div>
        </div>
        <NotificationToggle
          enabled={settings?.enabled}
          onChange={handleToggle}
        />
      </div>
      {settings?.enabled && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={settings?.startTime}
                onChange={(e) => handleTimeChange('startTime', e?.target?.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                End Time
              </label>
              <input
                type="time"
                value={settings?.endTime}
                onChange={(e) => handleTimeChange('endTime', e?.target?.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-md p-3">
            <p className="text-xs text-muted-foreground">
              During quiet hours, only critical alerts will be delivered. All other notifications will be held until quiet hours end.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuietHoursSettings;