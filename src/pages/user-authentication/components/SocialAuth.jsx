import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';

const SocialAuth = ({ isLogin }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-gray-800 hover:bg-gray-900'
    }
  ];

  const handleSocialAuth = async (provider) => {
    setLoadingProvider(provider?.id);
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, show alert
      alert(`${provider?.name} authentication would be implemented here. This is a demo interface.`);
    } catch (error) {
      console.error(`${provider?.name} auth failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or {isLogin ? 'sign in' : 'sign up'} with
          </span>
        </div>
      </div>
      {/* Social Auth Buttons */}
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            onClick={() => handleSocialAuth(provider)}
            disabled={loadingProvider !== null}
            className={`
              flex items-center justify-center space-x-3 w-full py-2.5 px-4 
              text-white font-medium rounded-lg transition-all duration-200
              hover:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
              disabled:opacity-50 disabled:cursor-not-allowed
              ${provider?.color}
            `}
          >
            {loadingProvider === provider?.id ? (
              <Icon name="Loader2" size={18} className="animate-spin" />
            ) : (
              <Icon name={provider?.icon} size={18} />
            )}
            <span>
              {loadingProvider === provider?.id 
                ? 'Connecting...' 
                : `Continue with ${provider?.name}`
              }
            </span>
          </button>
        ))}
      </div>
      {/* Security Notice */}
      <div className="mt-6 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Secure Authentication</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your data is protected with industry-standard encryption and security measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;