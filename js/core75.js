/**
 * 🎁 HUOKAING THARA: CORE-75 (REWARD ANIMATOR)
 * Feature: Mystery Box Logic & High-Impact Prize Reveals
 * Version: 4.0.0
 */

(function(Imperial) {
    const _sequences = {
        SHAKE: { duration: 800, intensity: 5 },
        BURST: { particles: 100, scale: 2.5 },
        GLOW: { color: '#d4af37', duration: 1500 }
    };

    const RewardAnimator = {
        /**
         * playReveal: The main orchestrator for prize openings
         */
        playReveal: async function(rewardData) {
            Imperial.Logger.log("UI", `Starting reveal for: ${rewardData.type}`);

            // 1. Shake the container (using Core 28 and Core 61)
            this._applyShake(rewardData.elementId);
            
            // 2. Trigger Haptics (Core 72)
            if (Imperial.Haptics) Imperial.Haptics.trigger('HEARTBEAT');

            // 3. The "Big Burst"
            return new Promise(resolve => {
                setTimeout(() => {
                    this._triggerBurst(rewardData);
                    
                    // Update Balance with a "Counting" effect
                    if (Imperial.Finance) {
                        Imperial.Finance.animateDeposit(rewardData.value);
                    }

                    Imperial.Events.emit('REWARD_REVEALED', rewardData);
                    resolve();
                }, _sequences.SHAKE.duration);
            });
        },

        _applyShake: function(id) {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.add('imp-reward-shaking');
            // Logic to remove class after duration...
        },

        _triggerBurst: function(reward) {
            if (Imperial.FX) {
                // Spawn golden particles at the center of the reveal
                Imperial.FX.spawnBurst(window.innerWidth / 2, window.innerHeight / 2, 80, '#FFD700');
            }
            
            if (Imperial.Audio) {
                Imperial.Audio.play('CHIME_JACKPOT');
            }
        }
    };

    Imperial.Rewards = RewardAnimator;
    Imperial.Kernel.registerModule("core75_reward_engine");

    // Integration: Listen for Quest completions (Core 41)
    Imperial.Events.on('QUEST_COMPLETED', (quest) => {
        RewardAnimator.playReveal({
            type: 'QUEST_REWARD',
            value: quest.rewardAmount,
            elementId: 'quest-modal'
        });
    });

})(window.Imperial);
