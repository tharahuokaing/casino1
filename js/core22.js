/**
 * 🎁 HUOKAING THARA: CORE-22 (DAILY REWARDS)
 * Feature: Time-based Bonus & Streak Tracking
 * Version: 4.0.0
 */

(function(Imperial) {
    const _rewardConfig = {
        dailyAmount: 500,
        streakMultiplier: 1.2, // 20% extra per consecutive day
        cooldownMS: 86400000    // 24 hours in milliseconds
    };

    const RewardsEngine = {
        /**
         * checkDaily: Determines if a reward is ready to be claimed
         */
        checkDaily: function() {
            const lastClaim = localStorage.getItem('IMP_LAST_CLAIM') || 0;
            const now = Date.now();
            const timePassed = now - lastClaim;

            if (timePassed >= _rewardConfig.cooldownMS) {
                this.grantBonus(lastClaim, now);
                return true;
            } else {
                const remaining = _rewardConfig.cooldownMS - timePassed;
                this.logNextReward(remaining);
                return false;
            }
        },

        /**
         * grantBonus: Updates balance and saves the new timestamp
         */
        grantBonus: function(last, now) {
            let amount = _rewardConfig.dailyAmount;
            
            // Logic for a "Streak" (if last claim was less than 48 hours ago)
            if (now - last < (_rewardConfig.cooldownMS * 2)) {
                amount = Math.floor(amount * _rewardConfig.streakMultiplier);
                Imperial.Notify.send("Streak Bonus!", "Your loyalty earns you 20% extra!", "gold");
            }

            Imperial.Security.updateBalance(amount);
            localStorage.setItem('IMP_LAST_CLAIM', now);
            
            Imperial.Notify.
