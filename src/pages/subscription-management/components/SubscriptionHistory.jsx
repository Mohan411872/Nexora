import React from 'react';
import Icon from '../../../components/AppIcon';

const SubscriptionHistory = () => {
  const transactions = [
    {
      id: 1,
      date: '2025-01-15',
      description: '30-Day Premium Focus',
      amount: 34.99,
      status: 'completed',
      invoice: 'INV-2025-001',
    },
    {
      id: 2,
      date: '2024-12-15',
      description: '20-Day Focus Boost',
      amount: 19.99,
      status: 'completed',
      invoice: 'INV-2024-012',
    },
    {
      id: 3,
      date: '2024-11-20',
      description: '30-Day Premium Focus',
      amount: 34.99,
      status: 'completed',
      invoice: 'INV-2024-011',
    },
    {
      id: 4,
      date: '2024-10-22',
      description: '20-Day Focus Boost',
      amount: 19.99,
      status: 'refunded',
      invoice: 'INV-2024-010',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'refunded':
        return 'text-muted-foreground bg-muted/50';
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'refunded':
        return 'RotateCcw';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Receipt" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80">
          Download All
        </button>
      </div>
      <div className="space-y-4">
        {transactions?.map((transaction) => (
          <div key={transaction?.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center">
                <Icon 
                  name={getStatusIcon(transaction?.status)} 
                  size={14} 
                  className={getStatusColor(transaction?.status)?.split(' ')?.[0]} 
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    {transaction?.description}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction?.status)}`}>
                    {transaction?.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {new Date(transaction?.date)?.toLocaleDateString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {transaction?.invoice}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                ${transaction?.amount?.toFixed(2)}
              </div>
              <button className="text-xs text-primary hover:text-primary/80">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Showing recent transactions
          </span>
          <button className="text-primary hover:text-primary/80">
            View All History →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionHistory;