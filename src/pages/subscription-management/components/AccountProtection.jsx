import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountProtection = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={16} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Account Protection</h3>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-md p-4 mb-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Premium Subscriber Protection
            </p>
            <p className="text-xs text-muted-foreground">
              Account deletion protection: Premium subscribers receive 30-day grace period before permanent deletion with full data recovery options.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-background/50 rounded-md">
          <div className="flex items-center space-x-3">
            <Icon name="Database" size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Data Backup</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-success">Active</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-background/50 rounded-md">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Recovery Window</span>
          </div>
          <span className="text-xs text-muted-foreground">30 days</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-background/50 rounded-md">
          <div className="flex items-center space-x-3">
            <Icon name="Download" size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Export Data</span>
          </div>
          <button className="text-xs text-primary hover:text-primary/80">
            Download
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="HelpCircle" size={14} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Need Help?</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Contact our support team for assistance with account recovery or data exports.
        </p>
        <button className="text-xs text-primary hover:text-primary/80">
          Contact Support →
        </button>
      </div>
    </div>
  );
};

export default AccountProtection;