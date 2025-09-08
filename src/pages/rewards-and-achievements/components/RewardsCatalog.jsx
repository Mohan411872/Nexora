import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RewardsCatalog = ({ rewards, userPoints, onRedeem, className = '' }) => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Rewards', icon: 'Gift' },
    { id: 'themes', label: 'Themes', icon: 'Palette' },
    { id: 'features', label: 'Features', icon: 'Zap' },
    { id: 'customization', label: 'Customization', icon: 'Settings' },
    { id: 'premium', label: 'Premium', icon: 'Crown' }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards?.filter(reward => reward?.category === selectedCategory);

  const availableRewards = filteredRewards?.filter(reward => reward?.available && !reward?.redeemed);
  const redeemedRewards = filteredRewards?.filter(reward => reward?.redeemed);

  const getRewardIcon = (reward) => {
    const iconMap = {
      'Dark Theme': 'Moon',
      'Ocean Theme': 'Waves',
      'Forest Theme': 'Trees',
      'Extended Timer': 'Clock',
      'Custom Sounds': 'Volume2',
      'Priority Support': 'Headphones',
      'Avatar Frames': 'User',
      'Custom Badges': 'Award',
      'Profile Themes': 'Palette',
      'Premium Analytics': 'BarChart3'
    };
    return iconMap?.[reward?.name] || 'Gift';
  };

  const canAfford = (cost) => userPoints >= cost;

  const handleRedeem = (reward) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const confirmRedeem = () => {
    if (selectedReward && canAfford(selectedReward?.cost)) {
      onRedeem(selectedReward);
      setShowRedeemModal(false);
      setSelectedReward(null);
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-minimal ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Rewards Catalog</h2>
          <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
            <Icon name="Coins" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">{userPoints?.toLocaleString()} Points</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-5 p-5">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-focus ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={14} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">

        {/* Redeemed Rewards */}
        {redeemedRewards?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
              <Icon name="CheckCircle" size={18} className="text-accent" />
              <span>Redeemed Rewards ({redeemedRewards?.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {redeemedRewards?.map((reward) => (
                <div
                  key={reward?.id}
                  className="bg-accent/10 border border-accent/20 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={getRewardIcon(reward)} size={20} color="white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm mb-1">{reward?.name}</h4>
                      <p className="text-xs text-muted-foreground">{reward?.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-accent">
                      <Icon name="CheckCircle" size={14} />
                      <span className="text-xs font-medium">Redeemed</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{reward?.redeemedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {availableRewards?.length === 0 && redeemedRewards?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Gift" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No rewards available</h3>
            <p className="text-sm text-muted-foreground">Check back later for new rewards in this category!</p>
          </div>
        )}
      </div>
      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-6 shadow-card">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={getRewardIcon(selectedReward)} size={24} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Confirm Redemption</h3>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to redeem "{selectedReward?.name}" for {selectedReward?.cost?.toLocaleString()} points?
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current Points:</span>
                <span className="text-sm font-medium text-foreground">{userPoints?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Reward Cost:</span>
                <span className="text-sm font-medium text-error">-{selectedReward?.cost?.toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Remaining Points:</span>
                  <span className="text-sm font-semibold text-foreground">
                    {(userPoints - selectedReward?.cost)?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowRedeemModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                fullWidth
                onClick={confirmRedeem}
                iconName="ShoppingCart"
                iconSize={16}
              >
                Redeem Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsCatalog;