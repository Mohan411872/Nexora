import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MainNavigation from '../../components/ui/MainNavigation';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ModeCard from './components/ModeCard';
import TimerDisplay from './components/TimerDisplay';
import SessionStats from './components/SessionStats';
import CustomTimerModal from './components/CustomTimerModal';

const FocusModes = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);

  const focusModes = [
    {
      type: 'pomodoro',
      name: 'Pomodoro',
      description: 'Classic 25-minute focus sessions with 5-minute breaks. Perfect for maintaining consistent productivity throughout the day.',
      duration: '25 + 5 min',
      totalMinutes: 25,
      popularity: 'Most Popular'
    },
    {
      type: 'deepwork',
      name: 'Deep Work',
      description: 'Extended 60-90 minute sessions for complex tasks requiring sustained concentration and minimal interruptions.',
      duration: '60-90 min',
      totalMinutes: 75,
      popularity: 'Recommended'
    },
    {
      type: 'custom',
      name: 'Custom Timer',
      description: 'Create personalized focus sessions with your preferred duration. Ideal for specific tasks or unique workflow requirements.',
      duration: 'Your Choice',
      totalMinutes: 30,
      popularity: 'Flexible'
    }
  ];

  useEffect(() => {
    // Load session history from localStorage
    const loadSessionHistory = () => {
      try {
        const savedHistory = localStorage.getItem('nexora_session_history');
        if (savedHistory) {
          setSessionHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Failed to load session history:', error);
      }
    };

    loadSessionHistory();
  }, []);

  const handleModeSelect = (mode) => {
    if (mode?.type === 'custom') {
      setShowCustomModal(true);
    } else {
      setSelectedMode(mode);
      setIsTimerActive(true);
    }
  };

  const handleCustomModeConfirm = (customMode) => {
    setSelectedMode(customMode);
    setIsTimerActive(true);
  };

  const handleTimerStart = () => {
    // Update progress and stats
    const currentTime = new Date()?.toISOString();
    const sessionData = {
      mode: selectedMode?.type,
      startTime: currentTime,
      isActive: true
    };
    
    localStorage.setItem('nexora_current_session', JSON.stringify(sessionData));
  };

  const handleTimerPause = () => {
    // Update session data
    const currentSession = JSON.parse(localStorage.getItem('nexora_current_session') || '{}');
    currentSession.isActive = false;
    localStorage.setItem('nexora_current_session', JSON.stringify(currentSession));
  };

  const handleTimerStop = () => {
    // Clear current session
    localStorage.removeItem('nexora_current_session');
    setIsTimerActive(false);
    setSelectedMode(null);
  };

  const handleTimerComplete = () => {
    // Save completed session
    const completedSession = {
      id: Date.now(),
      mode: selectedMode?.type,
      name: selectedMode?.name,
      duration: selectedMode?.totalMinutes,
      completedAt: new Date()?.toISOString(),
      points: Math.floor(selectedMode?.totalMinutes / 5)
    };

    const updatedHistory = [completedSession, ...sessionHistory]?.slice(0, 50);
    setSessionHistory(updatedHistory);
    localStorage.setItem('nexora_session_history', JSON.stringify(updatedHistory));

    // Update progress
    const progressEvent = new CustomEvent('focusStatsUpdated', {
      detail: {
        todaySessions: updatedHistory.filter(s => 
          new Date(s.completedAt).toDateString() === new Date().toDateString()
        ).length,
        totalFocusTime: updatedHistory.reduce((total, s) => total + s.duration, 0)
      }
    });
    window.dispatchEvent(progressEvent);

    setIsTimerActive(false);
    setSelectedMode(null);
  };

  const getRecentSessions = () => {
    return sessionHistory?.filter(session => {
        const sessionDate = new Date(session.completedAt);
        const today = new Date();
        return sessionDate?.toDateString() === today?.toDateString();
      })?.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Focus Modes</h1>
            <p className="text-muted-foreground">
              Choose your preferred focus method and start a productive session
            </p>
          </div>
          
          <div className="hidden lg:block">
            <ProgressIndicator variant="compact" />
          </div>
        </div>

        {!isTimerActive ? (
          <>
            {/* Mode Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {focusModes?.map((mode) => (
                <ModeCard
                  key={mode?.type}
                  mode={mode}
                  isSelected={selectedMode?.type === mode?.type}
                  onSelect={handleModeSelect}
                />
              ))}
            </div>

            {/* Recent Sessions */}
            {getRecentSessions()?.length > 0 && (
              <div className="bg-card rounded-lg border border-border p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Today's Sessions</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="BarChart3"
                    onClick={() => navigate('/distraction-tracking')}
                  >
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {getRecentSessions()?.map((session) => (
                    <div key={session?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          session?.mode === 'pomodoro' ? 'bg-red-100 text-red-500' :
                          session?.mode === 'deepwork'? 'bg-blue-100 text-blue-500' : 'bg-purple-100 text-purple-500'
                        }`}>
                          <Icon name={
                            session?.mode === 'pomodoro' ? 'Timer' :
                            session?.mode === 'deepwork' ? 'Brain' : 'Settings'
                          } size={16} />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{session?.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {session?.duration} minutes • {new Date(session.completedAt)?.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Star" size={16} className="text-primary" />
                        <span className="text-sm font-medium text-foreground">+{session?.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Quick Start</h3>
                    <p className="text-sm text-muted-foreground">Jump into your last used mode</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Play"
                  iconPosition="left"
                  onClick={() => handleModeSelect(focusModes?.[0])}
                >
                  Start Pomodoro (25 min)
                </Button>
              </div>

              <SessionStats />
            </div>
          </>
        ) : (
          /* Timer Interface */
          (<div className="max-w-2xl mx-auto">
            <TimerDisplay
              mode={selectedMode}
              isActive={isTimerActive}
              onStart={handleTimerStart}
              onPause={handleTimerPause}
              onStop={handleTimerStop}
              onComplete={handleTimerComplete}
            />
          </div>)
        )}

        {/* Custom Timer Modal */}
        <CustomTimerModal
          isOpen={showCustomModal}
          onClose={() => setShowCustomModal(false)}
          onConfirm={handleCustomModeConfirm}
        />
      </div>
    </div>
  );
};

export default FocusModes;