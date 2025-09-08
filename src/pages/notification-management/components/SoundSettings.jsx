import React from 'react';
import Icon from '../../../components/AppIcon';
import NotificationToggle from './NotificationToggle';

const SoundSettings = ({ settings, onUpdate }) => {
  const soundOptions = [
    { value: 'default', label: 'Default' },
    { value: 'chime', label: 'Soft Chime' },
    { value: 'ping', label: 'Gentle Ping' },
    { value: 'bell', label: 'Notification Bell' },
    { value: 'silent', label: 'Silent' },
  ];

  const handleToggle = () => {
    onUpdate(prev => ({
      ...prev,
      enabled: !prev?.enabled
    }));
  };

  const handleVolumeChange = (volume) => {
    onUpdate(prev => ({
      ...prev,
      volume: parseInt(volume)
    }));
  };

  const handleSoundTypeChange = (soundType) => {
    onUpdate(prev => ({
      ...prev,
      soundType
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Volume2" size={16} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sound Settings</h3>
            <p className="text-sm text-muted-foreground">Customize notification sounds</p>
          </div>
        </div>
        <NotificationToggle
          enabled={settings?.enabled}
          onChange={handleToggle}
        />
      </div>
      {settings?.enabled && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Sound Type
            </label>
            <select
              value={settings?.soundType}
              onChange={(e) => handleSoundTypeChange(e?.target?.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {soundOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Volume: {settings?.volume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings?.volume}
              onChange={(e) => handleVolumeChange(e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <button className="w-full px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-md text-sm transition-colors flex items-center justify-center space-x-2">
            <Icon name="Play" size={14} />
            <span>Test Sound</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SoundSettings;