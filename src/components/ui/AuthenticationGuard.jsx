import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const publicRoutes = ['/splash-screen', '/user-authentication'];
  const isPublicRoute = publicRoutes?.includes(location?.pathname);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const authToken = localStorage.getItem('nexora_auth_token');
        const userSession = localStorage.getItem('nexora_user_session');
        
        if (authToken && userSession) {
          const sessionData = JSON.parse(userSession);
          const currentTime = new Date()?.getTime();
          
          // Check if session is still valid (24 hours)
          if (sessionData?.expiresAt && currentTime < sessionData?.expiresAt) {
            setIsAuthenticated(true);
          } else {
            // Session expired, clear storage
            localStorage.removeItem('nexora_auth_token');
            localStorage.removeItem('nexora_user_session');
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkAuthStatus();

    // Listen for storage changes (multi-tab support)
    const handleStorageChange = (e) => {
      if (e?.key === 'nexora_auth_token' || e?.key === 'nexora_user_session') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-pulse">
            <Icon name="Focus" size={24} color="white" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm text-muted-foreground">Loading Nexora...</p>
        </div>
      </div>
    );
  }

  // Handle authentication redirects
  if (isAuthenticated === false && !isPublicRoute) {
    // User is not authenticated and trying to access protected route
    return <Navigate to="/user-authentication" state={{ from: location }} replace />;
  }

  if (isAuthenticated === true && isPublicRoute) {
    // User is authenticated and trying to access public route
    const from = location?.state?.from?.pathname || '/main-dashboard';
    return <Navigate to={from} replace />;
  }

  // Render children for valid routes
  return children;
};

// Hook for authentication utilities
export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (userData, token) => {
    const expiresAt = new Date()?.getTime() + (24 * 60 * 60 * 1000); // 24 hours
    const sessionData = {
      ...userData,
      expiresAt,
      loginTime: new Date()?.getTime()
    };

    localStorage.setItem('nexora_auth_token', token);
    localStorage.setItem('nexora_user_session', JSON.stringify(sessionData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('nexora_auth_token');
    localStorage.removeItem('nexora_user_session');
    localStorage.removeItem('nexora_user_preferences');
    setUser(null);
    window.location.href = '/user-authentication';
  };

  const getUser = () => {
    try {
      const userSession = localStorage.getItem('nexora_user_session');
      if (userSession) {
        const sessionData = JSON.parse(userSession);
        const currentTime = new Date()?.getTime();
        
        if (sessionData?.expiresAt && currentTime < sessionData?.expiresAt) {
          return sessionData;
        }
      }
    } catch (error) {
      console.error('Failed to get user data:', error);
    }
    return null;
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('nexora_auth_token');
    const user = getUser();
    return !!(token && user);
  };

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUser(userData);
    }
  }, []);

  return {
    user,
    login,
    logout,
    getUser,
    isAuthenticated
  };
};

export default AuthenticationGuard;