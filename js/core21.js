/**
 * 🎖️ HUOKAING THARA: CORE-21 (XP & RANKING)
 * Feature: Leveling Logic & Milestone Rewards
 * Version: 4.0.0
 */

(function(Imperial) {
    const _progression = {
        xp: 0,
        level: 1,
        rankName: "RECRUIT"
    };

    const RANKS = [
        { minXp: 0, name: "RECRUIT" },
        { minXp: 1000, name: "SOLDIER" },
        { minXp: 5000, name: "COMMANDER" },
        { minXp: 25000, name: "GENERAL" },
        { minXp: 100000, name: "OVERLORD" }
    ];

    const XPEngine = {
        /**
         * addXp: Calculates XP gain based on wager and outcome
         */
        reward: function(wager, isWin) {
            // Earn more XP for winning, but still gain some for participating
            const gain = isWin ? Math.floor(wager * 0.5) : Math.floor(wager * 0.1);
            const totalGain = Math.max(1, gain); // Minimum 1 XP per play

            _progression.xp += totalGain;
            this.checkRankUp();
            
            Imperial.Events.emit('XP_GAINED', { gained: totalGain, total: _progression.xp });
        },

        /**
         * checkRankUp: Compares current XP against the rank table
         */
        checkRankUp: function() {
            const currentRankIndex = RANKS.findIndex(r => r.name === _progression.rankName);
            const nextRank = RANKS[currentRankIndex + 1];

            if (nextRank && _progression.xp >= nextRank.minXp) {
                _progression.rankName = nextRank.name;
                _progression.level++;
                
                this.handleMilestone(nextRank.name);
            }
        },

        handleMilestone: function(rankName) {
            Imperial.Logger.log("INFO", `RANK UP: User promoted to ${rankName}`);
            Imperial.Notify.send("Promotion", `You are now a ${rankName}!`, "gold");
            Imperial.Sound.playSFX('rank_up_stinger');
            
            Imperial.Events.emit('RANK_UP', { rank: rankName, level: _progression.level });
        },

        getStats: function() {
            return { ..._progression };
        }
    };

    // Attach to Global Namespace
    Imperial.Progression = XPEngine;

    // Register with Kernel
    Imperial.Kernel.registerModule("core21_progression");

    // Integration: Automatically listen for game results to reward XP
    window.addEventListener('load', () => {
        if (Imperial.Events) {
            // Listen for the state machine or game controller outcomes
            Imperial.Events.on('STATE_CHANGE', (data) => {
                // If we hit 'RESULT', we check the controller for the last outcome
                // (In a full build, the outcome data is passed through the event)
            });
        }
    });

})(window.Imperial);
