import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const AnalyticsCharts = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [chartType, setChartType] = useState('distractions');

  // Mock data for weekly view
  const weeklyData = [
    { day: 'Mon', distractions: 12, focusTime: 180, date: '2025-09-01' },
    { day: 'Tue', distractions: 8, focusTime: 220, date: '2025-09-02' },
    { day: 'Wed', distractions: 15, focusTime: 160, date: '2025-09-03' },
    { day: 'Thu', distractions: 6, focusTime: 240, date: '2025-09-04' },
    { day: 'Fri', distractions: 10, focusTime: 200, date: '2025-09-05' },
    { day: 'Sat', distractions: 4, focusTime: 120, date: '2025-09-06' },
    { day: 'Sun', distractions: 7, focusTime: 150, date: '2025-09-07' }
  ];

  // Mock data for monthly view
  const monthlyData = [
    { week: 'Week 1', distractions: 45, focusTime: 1200, period: 'Sep 1-7' },
    { week: 'Week 2', distractions: 38, focusTime: 1350, period: 'Sep 8-14' },
    { week: 'Week 3', distractions: 42, focusTime: 1180, period: 'Sep 15-21' },
    { week: 'Week 4', distractions: 35, focusTime: 1420, period: 'Sep 22-28' }
  ];

  const currentData = activeTab === 'weekly' ? weeklyData : monthlyData;
  const xAxisKey = activeTab === 'weekly' ? 'day' : 'week';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="text-sm font-medium text-foreground mb-2">
            {activeTab === 'weekly' ? `${label} - ${data?.date}` : `${label} (${data?.period})`}
          </p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name === 'distractions' ? 'Blocked Distractions' : 'Focus Time'}: {entry?.value}
              {entry?.name === 'focusTime' ? 'm' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatFocusTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-minimal mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 sm:mb-0">Analytics Overview</h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Time Period Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'weekly' ?'bg-card text-foreground shadow-minimal' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'monthly' ?'bg-card text-foreground shadow-minimal' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setChartType('distractions')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                chartType === 'distractions' ?'bg-card text-foreground shadow-minimal' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Distractions
            </button>
            <button
              onClick={() => setChartType('focus')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                chartType === 'focus' ?'bg-card text-foreground shadow-minimal' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Focus Time
            </button>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'distractions' ? (
            <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey={xAxisKey} 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="distractions" 
                fill="var(--color-error)" 
                radius={[4, 4, 0, 0]}
                name="distractions"
              />
            </BarChart>
          ) : (
            <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey={xAxisKey} 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatFocusTime}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="focusTime" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                name="focusTime"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          {chartType === 'distractions' ? (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-sm" />
              <span className="text-sm text-muted-foreground">Blocked Distractions</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-sm" />
              <span className="text-sm text-muted-foreground">Focus Time</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;