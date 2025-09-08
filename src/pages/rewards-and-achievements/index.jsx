import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MainNavigation from '../../components/ui/MainNavigation';
import PointsDashboard from './components/PointsDashboard';
import BadgeCollection from './components/BadgeCollection';
import RewardsCatalog from './components/RewardsCatalog';
import RecentAchievements from './components/RecentAchievements';
import ProgressStats from './components/ProgressStats';

const RewardsAndAchievements = () => {
  const [userStats, setUserStats] = useState({
    currentPoints: 2450,
    totalEarned: 3890,
    currentStreak: 12,
    bestStreak: 28,
    recentEarnings: [
      { activity: "Completed 25-min Pomodoro", points: 50, time: "2 hours ago", icon: "Timer" },
      { activity: "7-day streak milestone", points: 100, time: "1 day ago", icon: "Flame" },
      { activity: "Deep Work session (90 min)", points: 180, time: "2 days ago", icon: "Brain" },
      { activity: "Weekly goal achieved", points: 200, time: "3 days ago", icon: "Target" }
    ]
  });

  const [badges, setBadges] = useState([
    { id: 1, name: "First Focus", description: "Complete your first focus session", requirements: "Complete 1 focus session of any duration", category: "milestone", earned: true, earnedDate: "Dec 15, 2024", progress: 100 },
    { id: 2, name: "Focus Streak", description: "Maintain a 7-day focus streak", requirements: "Complete at least one focus session daily for 7 consecutive days", category: "streak", earned: true, earnedDate: "Dec 20, 2024", progress: 100 },
    { id: 3, name: "Time Master", description: "Accumulate 10 hours of total focus time", requirements: "Complete a total of 600 minutes (10 hours)", category: "time", earned: true, earnedDate: "Dec 25, 2024", progress: 100 },
    { id: 4, name: "Deep Work", description: "Complete a 90-minute deep work session", requirements: "One uninterrupted focus session of 90+ minutes", category: "focus", earned: false, progress: 75 },
    { id: 5, name: "Consistency King", description: "Maintain a 30-day focus streak", requirements: "1 focus session daily for 30 days", category: "streak", earned: false, progress: 40 },
    { id: 6, name: "Pomodoro Pro", description: "Complete 50 Pomodoro sessions", requirements: "50 Pomodoro technique sessions (25 min each)", category: "focus", earned: false, progress: 68 },
    { id: 7, name: "Distraction Slayer", description: "Block 100 distractions in a week", requirements: "Block or avoid 100 distractions in 7 days", category: "focus", earned: false, progress: 23 },
    { id: 8, name: "Weekly Warrior", description: "Achieve weekly focus goal 4 times", requirements: "Weekly focus goal met for 4 consecutive weeks", category: "milestone", earned: false, progress: 50 },
    { id: 9, name: "Monthly Master", description: "Complete 100 hours in a month", requirements: "100 hours of focus time in one month", category: "time", earned: false, progress: 12 },
    { id: 10, name: "Focus Legend", description: "Reach 1000 total focus hours", requirements: "Lifetime total of 1000 hours of focused work", category: "milestone", earned: false, progress: 8 }
  ]);

  const [rewards, setRewards] = useState([
    { id: 1, name: "Dark Theme", description: "Unlock the sleek dark theme", cost: 500, category: "themes", available: true, redeemed: false },
    { id: 2, name: "Ocean Theme", description: "Ocean-inspired theme with gradients", cost: 750, category: "themes", available: true, redeemed: true, redeemedDate: "Dec 18, 2024" },
    { id: 3, name: "Forest Theme", description: "Green theme with forest sounds", cost: 750, category: "themes", available: true, redeemed: false },
    { id: 4, name: "Extended Timer", description: "Custom timer durations up to 4 hours", cost: 1000, category: "features", available: true, redeemed: false },
    { id: 5, name: "Custom Sounds", description: "Premium focus sounds library", cost: 800, category: "features", available: true, redeemed: false },
    { id: 6, name: "Priority Support", description: "Priority customer support", cost: 2000, category: "premium", available: true, redeemed: false },
    { id: 7, name: "Avatar Frames", description: "Decorative frames for your avatar", cost: 300, category: "customization", available: true, redeemed: false },
    { id: 8, name: "Custom Badges", description: "Create your own achievement badges", cost: 1200, category: "customization", available: true, redeemed: false },
    { id: 9, name: "Profile Themes", description: "Unique themes for your profile page", cost: 600, category: "customization", available: true, redeemed: false },
    { id: 10, name: "Premium Analytics", description: "Advanced analytics dashboard", cost: 1500, category: "premium", available: true, redeemed: false }
  ]);

  const [recentAchievements, setRecentAchievements] = useState([
    { title: "Time Master Badge Earned", description: "You've accumulated 10 hours of focus.", type: "badge", points: 100, earnedAt: "2024-12-25T10:30:00Z" },
    { title: "Weekly Goal Achieved", description: "Weekly goal of 8 hours met.", type: "milestone", points: 200, earnedAt: "2024-12-23T18:45:00Z" },
    { title: "12-Day Streak Milestone", description: "Maintained focus for 12 days.", type: "streak", points: 120, earnedAt: "2024-12-22T09:15:00Z" },
    { title: "2000 Points Milestone", description: "Earned over 2000 total points.", type: "points", points: 50, earnedAt: "2024-12-21T14:20:00Z" }
  ]);

  const [progressStats, setProgressStats] = useState({
    totalFocusTime: 1247,
    completedSessions: 89,
    averageSessionLength: 32,
    longestStreak: 28,
    currentLevel: 5,
    nextLevelProgress: 68,
    weeklyGoal: 480,
    weeklyProgress: 312
  });

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem('nexora_user_progress');
    const savedRewards = localStorage.getItem('nexora_user_rewards');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserStats(prev => ({
        ...prev,
        currentPoints: progress?.totalPoints || prev?.currentPoints,
        currentStreak: progress?.currentStreak || prev?.currentStreak
      }));
    }
    if (savedRewards) {
      const rewardsData = JSON.parse(savedRewards);
      setRewards(prev => prev?.map(r => ({
        ...r,
        redeemed: rewardsData?.redeemedRewards?.includes(r?.id) || r?.redeemed
      })));
    }

    const lastCheck = localStorage.getItem('nexora_last_achievement_check');
    const now = new Date()?.getTime();
    if (!lastCheck || now - parseInt(lastCheck) > 24 * 60 * 60 * 1000) {
      if (recentAchievements?.length > 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      localStorage.setItem('nexora_last_achievement_check', now?.toString());
    }
  }, []);

  const handleRewardRedeem = (reward) => {
    if (userStats?.currentPoints >= reward?.cost) {
      const newPoints = userStats?.currentPoints - reward?.cost;
      setUserStats(prev => ({ ...prev, currentPoints: newPoints }));
      setRewards(prev => prev?.map(r =>
        r?.id === reward?.id ? { ...r, redeemed: true, redeemedDate: new Date()?.toLocaleDateString() } : r
      ));
      const savedRewards = JSON.parse(localStorage.getItem('nexora_user_rewards') || '{}');
      const redeemedRewards = [...(savedRewards?.redeemedRewards || []), reward?.id];
      localStorage.setItem('nexora_user_rewards', JSON.stringify({ ...savedRewards, redeemedRewards }));
      const savedProgress = JSON.parse(localStorage.getItem('nexora_user_progress') || '{}');
      localStorage.setItem('nexora_user_progress', JSON.stringify({ ...savedProgress, totalPoints: newPoints }));
      alert(`Successfully redeemed ${reward?.name}! Check your settings to activate it.`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Rewards & Achievements</h1>
              <p className="text-muted-foreground">
                Track your progress, earn badges, and redeem exciting rewards for your focus journey.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/focus-modes">
                <Button variant="outline" iconName="Timer" iconPosition="left">
                  Start Focus Session
                </Button>
              </Link>
              <Link to="/main-dashboard">
                <Button variant="default" iconName="LayoutDashboard" iconPosition="left">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{userStats?.currentPoints?.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Available Points</div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1">{badges?.filter(b => b?.earned)?.length}</div>
              <div className="text-xs text-muted-foreground">Badges Earned</div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="text-2xl font-bold text-warning mb-1">{userStats?.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="text-2xl font-bold text-secondary mb-1">{rewards?.filter(r => r?.redeemed)?.length}</div>
              <div className="text-xs text-muted-foreground">Rewards Unlocked</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <PointsDashboard userStats={userStats} />
            <BadgeCollection badges={badges} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <RecentAchievements achievements={recentAchievements} />
            <RewardsCatalog 
              rewards={rewards}
              userPoints={userStats?.currentPoints}
              onRedeem={handleRewardRedeem}
            />
          </div>
        </div>

        {/* Full-width Progress Stats */}
        <div className="grid grid-cols-12 mt-8">
          <div className="col-span-12">
            <ProgressStats stats={progressStats} />
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="md:hidden fixed bottom-20 left-4 right-4 flex space-x-3">
          <Link to="/focus-modes" className="flex-1">
            <Button variant="default" fullWidth iconName="Timer" iconPosition="left">
              Start Focus
            </Button>
          </Link>
          <Link to="/main-dashboard" className="flex-1">
            <Button variant="outline" fullWidth iconName="LayoutDashboard" iconPosition="left">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-6 shadow-card text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Trophy" size={32} color="white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Congratulations! 🎉</h3>
            <p className="text-muted-foreground mb-6">
              You've earned new achievements! Keep up the amazing work on your focus journey.
            </p>
            <Button 
              variant="default" 
              fullWidth 
              onClick={() => setShowCelebration(false)}
              iconName="CheckCircle"
              iconPosition="left"
            >
              Awesome!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsAndAchievements;
