import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MainNavigation = ({ className = '' }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/main-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and progress tracking'
    },
    {
      label: 'Focus',
      path: '/focus-modes',
      icon: 'Timer',
      tooltip: 'Start focus sessions and timers'
    },
    {
      label: 'Tracking',
      path: '/distraction-tracking',
      icon: 'BarChart3',
      tooltip: 'View analytics and insights'
    },
    {
      label: 'Rewards',
      path: '/rewards-and-achievements',
      icon: 'Trophy',
      tooltip: 'Achievements and progress rewards'
    },
    {
      label: 'Notifications',
      path: '/notification-management',
      icon: 'Bell',
      tooltip: 'Manage notification preferences and settings'
    },
    {
      label: 'Subscription',
      path: '/subscription-management',
      icon: 'CreditCard',
      tooltip: 'Manage your subscription and billing'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Focus" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">Nexora</span>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-card border-b border-border ${className}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/main-dashboard" className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-focus hover:scale-98 ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-minimal'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-focus"
              aria-label="Toggle navigation menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border shadow-card">
            <div className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-focus ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-minimal'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-focus ${
                isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={isActive(item?.path) ? 'text-primary' : ''} 
              />
              <span className={`text-xs font-medium mt-1 truncate ${
                isActive(item?.path) ? 'text-primary' : ''
              }`}>
                {item?.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
      {/* Spacer for fixed navigation */}
      <div className="h-16 md:block hidden" />
      <div className="h-18 md:hidden block" />
    </>
  );
};

export default MainNavigation;