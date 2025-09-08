import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentDistractions = () => {
  const [filter, setFilter] = useState('all');

  // Mock recent distraction data
  const recentDistractions = [
    {
      id: 1,
      source: 'Social Media',
      app: 'Twitter',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      blockDuration: 2,
      category: 'social',
      icon: 'Twitter'
    },
    {
      id: 2,
      source: 'Entertainment',
      app: 'YouTube',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      blockDuration: 5,
      category: 'entertainment',
      icon: 'Youtube'
    },
    {
      id: 3,
      source: 'News',
      app: 'Reddit',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      blockDuration: 3,
      category: 'news',
      icon: 'MessageSquare'
    },
    {
      id: 4,
      source: 'Shopping',
      app: 'Amazon',
      timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      blockDuration: 4,
      category: 'shopping',
      icon: 'ShoppingCart'
    },
    {
      id: 5,
      source: 'Social Media',
      app: 'Instagram',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      blockDuration: 6,
      category: 'social',
      icon: 'Instagram'
    },
    {
      id: 6,
      source: 'Entertainment',
      app: 'Netflix',
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      blockDuration: 8,
      category: 'entertainment',
      icon: 'Play'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Categories', icon: 'Filter' },
    { value: 'social', label: 'Social Media', icon: 'Users' },
    { value: 'entertainment', label: 'Entertainment', icon: 'Play' },
    { value: 'news', label: 'News', icon: 'Newspaper' },
    { value: 'shopping', label: 'Shopping', icon: 'ShoppingCart' }
  ];

  const filteredDistractions = filter === 'all' 
    ? recentDistractions 
    : recentDistractions?.filter(d => d?.category === filter);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      social: 'text-blue-600 bg-blue-50',
      entertainment: 'text-purple-600 bg-purple-50',
      news: 'text-orange-600 bg-orange-50',
      shopping: 'text-green-600 bg-green-50'
    };
    return colors?.[category] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Distractions</h3>
            <p className="text-sm text-muted-foreground">Blocked attempts today</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            className="hidden sm:flex"
          >
            Export Data
          </Button>
          
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e?.target?.value)}
              className="appearance-none bg-muted border border-border rounded-lg px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {filterOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>
        </div>
      </div>
      {/* Distractions List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredDistractions?.length > 0 ? (
          filteredDistractions?.map((distraction) => (
            <div
              key={distraction?.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name={distraction?.icon} size={18} className="text-error" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {distraction?.app}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(distraction?.category)}`}>
                      {distraction?.source}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Blocked for {distraction?.blockDuration} minutes
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {formatTimeAgo(distraction?.timestamp)}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Shield" size={12} className="text-accent" />
                  <span className="text-xs text-accent">Blocked</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={24} className="text-accent" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">Great Focus!</h4>
            <p className="text-sm text-muted-foreground">
              No distractions in this category today. Keep up the excellent work!
            </p>
          </div>
        )}
      </div>
      {/* Summary Stats */}
      {filteredDistractions?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{filteredDistractions?.length}</div>
              <div className="text-xs text-muted-foreground">Total Blocks</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {filteredDistractions?.reduce((sum, d) => sum + d?.blockDuration, 0)}m
              </div>
              <div className="text-xs text-muted-foreground">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {Math.round(filteredDistractions?.reduce((sum, d) => sum + d?.blockDuration, 0) / filteredDistractions?.length)}m
              </div>
              <div className="text-xs text-muted-foreground">Avg Duration</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-accent">-67%</div>
              <div className="text-xs text-muted-foreground">vs Yesterday</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentDistractions;