import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const SubscriptionCard = ({ plan, currentPlan, billingCycle, onUpgrade }) => {
  const isActive = currentPlan === plan?.id;
  const displayPrice = billingCycle === 'yearly' ? plan?.currentPrice * 10 : plan?.currentPrice;
  const originalDisplayPrice = billingCycle === 'yearly' ? plan?.originalPrice * 10 : plan?.originalPrice;
  
  return (
    <div className={cn(
      "relative bg-card rounded-lg border p-6 shadow-minimal transition-all hover:shadow-sm",
      plan?.popular && "border-primary/50 ring-2 ring-primary/20",
      isActive && "border-success/50 bg-success/5"
    )}>
      {plan?.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </div>
        </div>
      )}
      {isActive && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={14} className="text-success-foreground" />
          </div>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{plan?.name}</h3>
        <div className="text-3xl font-bold text-foreground mb-1">
          ${displayPrice}
          {billingCycle === 'yearly' && (
            <span className="text-base font-normal text-muted-foreground ml-1">/year</span>
          )}
        </div>
        {plan?.originalPrice > plan?.currentPrice && (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-muted-foreground line-through">
              ${originalDisplayPrice}
            </span>
            <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">
              Save ${(originalDisplayPrice - displayPrice)?.toFixed(2)}
            </span>
          </div>
        )}
        <p className="text-sm text-muted-foreground mt-2">{plan?.duration} of enhanced focus</p>
      </div>
      <div className="space-y-3 mb-6">
        {plan?.features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center mt-0.5 flex-shrink-0">
              <Icon name="Check" size={10} className="text-success" />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {isActive ? (
          <div className="flex items-center justify-center space-x-2 p-3 bg-success/10 rounded-md">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Current Plan</span>
          </div>
        ) : (
          <Button 
            onClick={onUpgrade}
            className="w-full"
            variant={plan?.popular ? "default" : "outline"}
            iconName="ArrowUp"
          >
            Upgrade Now
          </Button>
        )}
        
        <div className="text-center">
          <button className="text-xs text-primary hover:text-primary/80">
            Learn more about this plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;