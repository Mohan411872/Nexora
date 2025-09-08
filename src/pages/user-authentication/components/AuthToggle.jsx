import React from 'react';

const AuthToggle = ({ isLogin, onToggle }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      <button
        onClick={() => onToggle(true)}
        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
          isLogin
            ? 'bg-card text-foreground shadow-minimal'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Login
      </button>
      <button
        onClick={() => onToggle(false)}
        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
          !isLogin
            ? 'bg-card text-foreground shadow-minimal'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Register
      </button>
    </div>
  );
};

export default AuthToggle;