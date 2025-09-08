import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomTimerModal = ({ isOpen, onClose, onConfirm, className = '' }) => {
  const [duration, setDuration] = useState({
    hours: 1,
    minutes: 0
  });
  const [sessionName, setSessionName] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const totalMinutes = duration?.hours * 60 + duration?.minutes;

    if (totalMinutes < 5) {
      newErrors.duration = 'Minimum session duration is 5 minutes';
    }
    if (totalMinutes > 480) {
      newErrors.duration = 'Maximum session duration is 8 hours';
    }
    if (!sessionName?.trim()) {
      newErrors.sessionName = 'Please enter a session name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      const totalMinutes = duration?.hours * 60 + duration?.minutes;
      const customMode = {
        type: 'custom',
        name: sessionName?.trim(),
        description: `Custom focus session for ${totalMinutes} minutes`,
        duration: `${duration?.hours}h ${duration?.minutes}m`,
        totalMinutes: totalMinutes,
        popularity: 'Custom'
      };
      onConfirm(customMode);
      handleClose();
    }
  };

  const handleClose = () => {
    setDuration({ hours: 1, minutes: 0 });
    setSessionName('');
    setErrors({});
    onClose();
  };

  const presetDurations = [
    { label: '15 min', hours: 0, minutes: 15 },
    { label: '30 min', hours: 0, minutes: 30 },
    { label: '45 min', hours: 0, minutes: 45 },
    { label: '1 hour', hours: 1, minutes: 0 },
    { label: '1.5 hours', hours: 1, minutes: 30 },
    { label: '2 hours', hours: 2, minutes: 0 }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`bg-card rounded-lg border border-border shadow-card max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={20} className="text-purple-500" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Custom Timer</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Session Name */}
          <div>
            <Input
              label="Session Name"
              type="text"
              placeholder="e.g., Deep Work, Study Session, Writing"
              value={sessionName}
              onChange={(e) => setSessionName(e?.target?.value)}
              error={errors?.sessionName}
              required
            />
          </div>

          {/* Duration Controls */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Session Duration
            </label>
            
            {/* Time Inputs */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <Input
                  label="Hours"
                  type="number"
                  min="0"
                  max="8"
                  value={duration?.hours}
                  onChange={(e) => setDuration(prev => ({ 
                    ...prev, 
                    hours: Math.max(0, Math.min(8, parseInt(e?.target?.value) || 0))
                  }))}
                />
              </div>
              <div className="flex items-center justify-center pt-6">
                <span className="text-muted-foreground">:</span>
              </div>
              <div className="flex-1">
                <Input
                  label="Minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={duration?.minutes}
                  onChange={(e) => setDuration(prev => ({ 
                    ...prev, 
                    minutes: Math.max(0, Math.min(59, parseInt(e?.target?.value) || 0))
                  }))}
                />
              </div>
            </div>

            {errors?.duration && (
              <p className="text-sm text-error mt-1">{errors?.duration}</p>
            )}

            {/* Preset Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {presetDurations?.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setDuration({ hours: preset?.hours, minutes: preset?.minutes })}
                  className="text-xs"
                >
                  {preset?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Total Duration Display */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {duration?.hours * 60 + duration?.minutes} minutes
            </div>
            <div className="text-sm text-muted-foreground">
              Total session duration
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Pro Tips:</p>
                <ul className="text-xs space-y-1">
                  <li>• 25-50 minutes are ideal for most focus tasks</li>
                  <li>• Longer sessions (60-90 min) work well for creative work</li>
                  <li>• Take breaks every 90 minutes to maintain focus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            iconName="Play"
            iconPosition="left"
          >
            Start Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomTimerModal;