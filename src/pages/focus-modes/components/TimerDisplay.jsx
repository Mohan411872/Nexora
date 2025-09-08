import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimerDisplay = ({ 
  mode, 
  isActive, 
  onStart, 
  onPause, 
  onStop, 
  onComplete,
  className = '' 
}) => {
  const [timeLeft, setTimeLeft] = useState(mode?.totalMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('focus'); // 'focus' or 'break'
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            handlePhaseComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handlePhaseComplete = () => {
    setIsRunning(false);
    
    if (currentPhase === 'focus') {
      setCompletedSessions(prev => prev + 1);
      
      // Start break phase for Pomodoro
      if (mode?.type === 'pomodoro') {
        setCurrentPhase('break');
        setTimeLeft(5 * 60); // 5 minute break
        // Auto-start break
        setTimeout(() => setIsRunning(true), 1000);
      } else {
        onComplete();
      }
    } else {
      // Break completed, back to focus
      setCurrentPhase('focus');
      setTimeLeft(mode?.totalMinutes * 60);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    onStart();
  };

  const handlePause = () => {
    setIsRunning(false);
    onPause();
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(mode?.totalMinutes * 60);
    setCurrentPhase('focus');
    setCompletedSessions(0);
    onStop();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalSeconds = currentPhase === 'focus' ? mode?.totalMinutes * 60 : 5 * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const getPhaseColor = () => {
    if (currentPhase === 'break') return 'text-green-500';
    switch (mode?.type) {
      case 'pomodoro': return 'text-red-500';
      case 'deepwork': return 'text-blue-500';
      case 'custom': return 'text-purple-500';
      default: return 'text-primary';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-8 text-center ${className}`}>
      {/* Mode Header */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Icon name={mode?.type === 'pomodoro' ? 'Timer' : mode?.type === 'deepwork' ? 'Brain' : 'Settings'} 
              size={24} 
              className={getPhaseColor()} />
        <h2 className="text-xl font-semibold text-foreground">{mode?.name}</h2>
      </div>
      {/* Phase Indicator */}
      <div className="mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          currentPhase === 'focus' ?'bg-primary/10 text-primary' :'bg-green-100 text-green-700'
        }`}>
          <Icon name={currentPhase === 'focus' ? 'Focus' : 'Coffee'} size={16} className="mr-1" />
          {currentPhase === 'focus' ? 'Focus Time' : 'Break Time'}
        </span>
      </div>
      {/* Timer Circle */}
      <div className="relative w-64 h-64 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
            className={getPhaseColor()}
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        
        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-4xl font-bold ${getPhaseColor()}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {currentPhase === 'focus' ? 'Focus' : 'Break'}
          </div>
        </div>
      </div>
      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {!isRunning ? (
          <Button
            variant="default"
            size="lg"
            iconName="Play"
            iconPosition="left"
            onClick={handleStart}
            className="px-8"
          >
            {timeLeft === mode?.totalMinutes * 60 ? 'Start' : 'Resume'}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="lg"
            iconName="Pause"
            iconPosition="left"
            onClick={handlePause}
            className="px-8"
          >
            Pause
          </Button>
        )}
        
        <Button
          variant="destructive"
          size="lg"
          iconName="Square"
          iconPosition="left"
          onClick={handleStop}
          className="px-8"
        >
          Stop
        </Button>
      </div>
      {/* Session Stats */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{completedSessions}</div>
          <div className="text-sm text-muted-foreground">Sessions Today</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {Math.floor((mode?.totalMinutes * completedSessions) / 60)}h {(mode?.totalMinutes * completedSessions) % 60}m
          </div>
          <div className="text-sm text-muted-foreground">Total Focus Time</div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;