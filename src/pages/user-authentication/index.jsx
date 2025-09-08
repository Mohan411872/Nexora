import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';

const UserAuthentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in the form
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (loginMode) => {
    setIsLogin(loginMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className={`
        relative w-full max-w-md transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/splash-screen" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Icon name="Focus" size={24} color="white" />
            </div>
            <span className="text-2xl font-semibold text-foreground">Nexora</span>
          </Link>
          
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Sign in to continue your focus journey' :'Join thousands improving their productivity'
            }
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6">
          {/* Toggle */}
          <AuthToggle isLogin={isLogin} onToggle={handleToggle} />

          {/* Forms */}
          <div className="relative overflow-hidden">
            <div className={`
              transition-all duration-300 ease-in-out
              ${isLogin ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute inset-0'}
            `}>
              {isLogin && <LoginForm />}
            </div>
            
            <div className={`
              transition-all duration-300 ease-in-out
              ${!isLogin ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute inset-0'}
            `}>
              {!isLogin && <RegisterForm />}
            </div>
          </div>

          {/* Social Authentication */}
          <div className="mt-6">
            <SocialAuth isLogin={isLogin} />
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">Terms of Service</button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">Support</button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex items-center justify-center space-x-6 opacity-60">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">256-bit Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;