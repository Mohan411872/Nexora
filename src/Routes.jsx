import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DistractionTracking from './pages/distraction-tracking';
import MainDashboard from './pages/main-dashboard';
import FocusModes from './pages/focus-modes';
import RewardsAndAchievements from './pages/rewards-and-achievements';
import SplashScreen from './pages/splash-screen';
import UserAuthentication from './pages/user-authentication';
import NotificationManagement from './pages/notification-management';
import SubscriptionManagement from './pages/subscription-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/distraction-tracking" element={<DistractionTracking />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/focus-modes" element={<FocusModes />} />
        <Route path="/rewards-and-achievements" element={<RewardsAndAchievements />} />
        <Route path="/splash-screen" element={<SplashScreen />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/notification-management" element={<NotificationManagement />} />
        <Route path="/subscription-management" element={<SubscriptionManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;