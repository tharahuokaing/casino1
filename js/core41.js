/**
 * 🎖️ HUOKAING THARA: CORE-41 (QUEST ENGINE)
 * Feature: Achievement Tracking & Progression Rewards
 * Version: 4.0.0
 */

(function(Imperial) {
    const _quests = new Map();
    const _progress = Imperial.Storage.get('QUEST_PROGRESS') || {};

    const QuestEngine = {
        /**
         * registerQuest: Defines a goal (e.g., "Spin 50 times")
         */
        registerQuest: function(id, goal, reward) {
            _quests.set(id, { goal, reward, current: _progress[id] || 0 });
        },

        /**
         * track: Updates progress based on an event
         */
        track: function(action, amount = 1) {
            _quests.forEach((quest, id) => {
                if (id.includes(action)) {
                    quest.current += amount;
                    _progress[id] = quest.current;
                    
                    this._checkCompletion(id, quest);
                }
            });
            Imperial.Storage.save('QUEST_PROGRESS', _progress);
        },

        _checkCompletion: function(id, quest) {
            if (quest.current >= quest.goal && !quest.claimed) {
                quest.claimed = true;
                this._award(id, quest.reward);
            }
        },

        _award: function(id, reward) {
            Imperial.Logger.log("ACHIEVEMENT", `Unlocked: ${id}`);
            
            // Integrate with Security to add balance
            if (reward.type === 'currency') {
                Imperial.Security.updateBalance(reward.value);
            }

            // Integrate with Notifications (Core 38)
            if (Imperial.Notify) {
                Imperial.Notify.send("ACHIEVEMENT UNLOCKED", `You earned ${reward.value} for ${id}!`, "success");
            }

            // Integrate with FX (Core 28)
            if (Imperial.FX) {
                Imperial.FX.spawnBurst(window.innerWidth / 2, window.innerHeight / 2, 30, '#00ffcc');
            }
        }
    };

    Imperial.Quests = QuestEngine;
    Imperial.Kernel.registerModule("core41_quest_engine");

    // Integration: Automatically track bets
    Imperial.Events.on('BET_PLACED', (data) => {
        QuestEngine.track('spin_count', 1);
        QuestEngine.track('total_wagered', data.amount);
    });

})(window.Imperial);
