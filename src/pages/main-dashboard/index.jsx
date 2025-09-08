import React, { useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import SmartProfilingCard from './components/SmartProfilingCard';
import QuickAccessGrid from './components/QuickAccessGrid';
import MetricsPanel from './components/MetricsPanel';
import Icon from '../../components/AppIcon';

const MainDashboard = () => {
  useEffect(() => {
    // Update user's last active date for streak tracking
    const updateLastActive = () => {
      const today = new Date()?.toISOString();
      localStorage.setItem('nexora_last_active', today);
    };

    updateLastActive();

    // Set page title
    document.title = 'Dashboard - Nexora';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back to Nexora
              </h1>
              <p className="text-muted-foreground">
                Your personalized focus management dashboard
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden lg:block">
              <ProgressIndicator variant="compact" />
            </div>
          </div>
          
          {/* Mobile Progress Indicator */}
          <div className="lg:hidden mb-6">
            <ProgressIndicator />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Smart Profiling */}
          <div className="xl:col-span-1">
            <SmartProfilingCard />
          </div>
          
          {/* Right Column - Quick Access & Metrics */}
          <div className="xl:col-span-2 space-y-8">
            {/* Quick Access Navigation */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Zap" size={20} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
              </div>
              <QuickAccessGrid />
            </div>
            
            {/* Metrics Panel */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="BarChart3" size={20} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Your Analytics</h2>
              </div>
              <MetricsPanel />
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tips Card */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Lightbulb" size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Daily Tip</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Try the 2-minute rule: If a task takes less than 2 minutes, do it immediately instead of adding it to your focus session.
            </p>
            <div className="flex items-center space-x-2 text-xs text-accent">
              <Icon name="Clock" size={14} />
              <span>Updated daily</span>
            </div>
          </div>

          {/* Upcoming Features */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Rocket" size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Coming Soon</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-sm text-muted-foreground">Team collaboration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-sm text-muted-foreground">Advanced analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-sm text-muted-foreground">Mobile app</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-primary">
              <Icon name="Calendar" size={14} />
              <span>Q2 2025</span>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="HelpCircle" size={20} className="text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Need Help?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get the most out of Nexora with our comprehensive guides and support resources.
            </p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors">
                <Icon name="Book" size={14} />
                <span>Guide</span>
              </button>
              <button className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors">
                <Icon name="MessageCircle" size={14} />
                <span>Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;