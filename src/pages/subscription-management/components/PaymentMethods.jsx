import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2027',
      isDefault: true,
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '5555',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(prev => prev?.map(method => ({
      ...method,
      isDefault: method?.id === id
    })));
  };

  const handleRemove = (id) => {
    setPaymentMethods(prev => prev?.filter(method => method?.id !== id));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-minimal">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="CreditCard" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
        </div>
        <Button
          size="sm"
          variant="outline"
          iconName="Plus"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add Card
        </Button>
      </div>

      <div className="space-y-4">
        {paymentMethods?.map((method) => (
          <div key={method?.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={getCardIcon(method?.type)} size={16} className="text-primary" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    •••• •••• •••• {method?.last4}
                  </span>
                  {method?.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  Expires {method?.expiryMonth}/{method?.expiryYear}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {!method?.isDefault && (
                <button
                  onClick={() => handleSetDefault(method?.id)}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  Set Default
                </button>
              )}
              <button
                onClick={() => handleRemove(method?.id)}
                className="text-xs text-destructive hover:text-destructive/80"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button size="sm" iconName="Plus">
                Add Card
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;