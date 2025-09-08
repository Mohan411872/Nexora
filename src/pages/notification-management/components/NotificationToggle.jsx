import React from 'react';
import { cn } from '../../../utils/cn';

const NotificationToggle = ({ enabled, onChange, disabled = false }) => {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        enabled ? "bg-primary" : "bg-muted",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-background transition-transform shadow-sm",
          enabled ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
};

export default NotificationToggle;