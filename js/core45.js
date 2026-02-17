/**
 * 🤖 HUOKAING THARA: CORE-45 (AI CONTROLLER)
 * Feature: NPC Behavior Trees & Dealer Logic
 * Version: 4.0.0
 */

(function(Imperial) {
    const _botNames = ['Xenon', 'Nova', 'Atlas', 'Vesta', 'Kratos'];
    
    const AIController = {
        /**
         * createDealer: Initializes a dealer for a table game
         */
        createDealer: function(gameType) {
            return {
                name: "Imperial Dealer",
                shouldHit: (handValue) => {
                    // Standard Casino Rule: Hit on 16, Stand on 17
                    return handValue < 17;
                },
                speak: (msgKey) => {
                    const text = Imperial.Locale ? Imperial.Locale.t(msgKey) : msgKey;
                    Imperial.Notify.send(this.name, text, 'info');
                }
            };
        },

        /**
         * simulateReactionTime: Adds a delay to make actions feel human
         */
        think: function(min = 500, max = 2000) {
            return new Promise(resolve => {
                const delay = Math.floor(Math.random() * (max - min) + min);
                setTimeout(resolve, delay);
            });
        },

        /**
         * spawnBot: Creates a simulated player with a specific "personality"
         */
        spawnBot: function() {
            return {
                name: _botNames[Math.floor(Math.random() * _botNames.length)],
                riskTolerance: Math.random(), // 0 = Safe, 1 = Aggressive
                decideBet: function(balance) {
                    return Math.floor(balance * (this.riskTolerance * 0.1));
                }
            };
        }
    };

    Imperial.AI = AIController;
    Imperial.Kernel.registerModule("core45_ai_controller");

    // Integration: Auto-respond to player joining
    Imperial.Events.on('PLAYER_JOINED', async (data) => {
        await AIController.think(1000, 1500);
        Imperial.Notify.send("System", `Opponent ${AIController.spawnBot().name} has joined.`, "info");
    });

})(window.Imperial);
