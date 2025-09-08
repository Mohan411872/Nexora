import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SubscriptionCard from './components/SubscriptionCard';
import AccountProtection from './components/AccountProtection';
import PaymentMethods from './components/PaymentMethods';
import SubscriptionHistory from './components/SubscriptionHistory';

const SubscriptionManagement = () => {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [billingCycle, setBillingCycle] = useState('monthly');

  useEffect(() => {
    document.title = 'Subscription Management - Nexora';
  }, []);

  const subscriptionPlans = [
    {
      id: 'focus-boost',
      name: '20-Day Focus Boost',
      duration: '20 Days',
      originalPrice: 29.99,
      currentPrice: 19.99,
      features: [
        'Extended focus sessions up to 4 hours',
        'Advanced analytics and progress tracking',
        'Premium background sounds and themes',
        'Distraction blocking tools',
        'Priority customer support',
        'Export focus reports'
      ],
      popular: false,
      color: 'primary',
    },
    {
      id: 'premium-focus',
      name: '30-Day Premium Focus',
      duration: '30 Days',
      originalPrice: 49.99,
      currentPrice: 34.99,
      features: [
        'All 20-Day Focus Boost features',
        'AI-powered focus recommendations',
        'Team collaboration tools',
        'Advanced goal setting and tracking',
        'White-label focus sessions',
        'Unlimited focus session history',
        'Premium integrations (Calendars, Task managers)',
        'Early access to new features'
      ],
      popular: true,
      color: 'success',
    },
  ];

  const currentSubscription = {
    plan: currentPlan,
    renewalDate: '2025-02-15',
    remainingDays: 23,
    totalSessions: 142,
    avgSessionLength: '28 minutes',
    streakDays: 12,
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Subscription Management
              </h1>
              <p className="text-muted-foreground">
                Enhance your focus experience with premium features and advanced analytics
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Current Subscription Status */}
            {currentPlan !== 'free' && (
              <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Current Subscription</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-accent/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">Next Renewal</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{currentSubscription?.renewalDate}</p>
                    <p className="text-xs text-muted-foreground">{currentSubscription?.remainingDays} days remaining</p>
                  </div>
                  
                  <div className="bg-accent/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Target" size={16} className="text-success" />
                      <span className="text-sm font-medium text-foreground">Usage Stats</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{currentSubscription?.totalSessions}</p>
                    <p className="text-xs text-muted-foreground">focus sessions completed</p>
                  </div>
                  
                  <div className="bg-accent/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Clock" size={16} className="text-warning" />
                      <span className="text-sm font-medium text-foreground">Average Session</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{currentSubscription?.avgSessionLength}</p>
                    <p className="text-xs text-muted-foreground">{currentSubscription?.streakDays} day streak</p>
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Plans */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Premium Plans</h2>
                <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      billingCycle === 'monthly' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      billingCycle === 'yearly' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Yearly (20% off)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscriptionPlans?.map((plan) => (
                  <SubscriptionCard
                    key={plan?.id}
                    plan={plan}
                    currentPlan={currentPlan}
                    billingCycle={billingCycle}
                    onUpgrade={() => setCurrentPlan(plan?.id)}
                  />
                ))}
              </div>
            </div>

            {/* Feature Comparison */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
              <h3 className="text-lg font-semibold text-foreground mb-4">Feature Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground">Feature</th>
                      <th className="text-center py-2 text-foreground">Free</th>
                      <th className="text-center py-2 text-foreground">20-Day Boost</th>
                      <th className="text-center py-2 text-foreground">30-Day Premium</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Focus sessions</td>
                      <td className="text-center py-2">Basic (25 min)</td>
                      <td className="text-center py-2">Extended (4 hrs)</td>
                      <td className="text-center py-2">Unlimited</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Analytics & Reports</td>
                      <td className="text-center py-2">Basic</td>
                      <td className="text-center py-2">Advanced</td>
                      <td className="text-center py-2">Premium + AI</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Customer Support</td>
                      <td className="text-center py-2">Community</td>
                      <td className="text-center py-2">Priority</td>
                      <td className="text-center py-2">Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Methods & History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PaymentMethods />
              <SubscriptionHistory />
            </div>
          </div>

          {/* Right Column - Account Protection & Settings */}
          <div className="xl:col-span-1 space-y-6">
            <AccountProtection />
            
            {/* Cancel Subscription */}
            {currentPlan !== 'free' && (
              <div className="bg-card rounded-lg border border-destructive/20 p-6 shadow-minimal">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={16} className="text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Cancel Subscription</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Canceling will downgrade your account to the free plan at the end of your current billing period.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-destructive/20 text-destructive hover:bg-destructive/5"
                    iconName="X"
                  >
                    Cancel Subscription
                  </Button>
                  
                  <div className="text-center">
                    <button className="text-xs text-primary hover:text-primary/80">
                      Tell us why you're leaving
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;