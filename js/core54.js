/**
 * 💾 HUOKAING THARA: CORE-54 (STATE PERSISTENCE)
 * Feature: Session Restoration & Mid-Game Recovery
 * Version: 4.0.0
 */

(function(Imperial) {
    const PERSIST_KEY = 'IMP_SESSION_RECOVERY';

    const PersistenceBridge = {
        /**
         * snapshot: Saves the current game context
         */
        snapshot: function(gameContext = {}) {
            const state = {
                machine: Imperial.State.getCurrent(),
                balance: Imperial.Security.getBalance(),
                context: gameContext, // e.g., { currentHand: [...], multiplier: 2 }
                timestamp: Date.now(),
                ledgerNonce: Imperial.RNG ? Imperial.RNG.getNonce() : 0
            };

            Imperial.Storage.save(PERSIST_KEY, state);
            Imperial.Logger.log("SYSTEM", "State Snapshot captured.");
        },

        /**
         * recover: Attempts to reconstruct the game flow
         */
        recover: function() {
            const saved = Imperial.Storage.get(PERSIST_KEY);
            if (!saved) return null;

            // Only recover if session is less than 1 hour old
            const ONE_HOUR = 3600000;
            if (Date.now() - saved.timestamp > ONE_HOUR) {
                this.clear();
                return null;
            }

            Imperial.Logger.log("SYSTEM", "Initiating Session Recovery...");
            return saved;
        },

        clear: function() {
            localStorage.removeItem(PERSIST_KEY);
        }
    };

    Imperial.Persistence = PersistenceBridge;
    Imperial.Kernel.registerModule("core54_persistence_bridge");

    // Integration: Auto-snapshot on critical state changes
    Imperial.Events.on('STATE_TRANSITION', (data) => {
        // Only snapshot during active gameplay states
        if (['SPINNING', 'DEALING', 'BONUS_ROUND'].includes(data.to)) {
            PersistenceBridge.snapshot(data.context);
        }
    });

})(window.Imperial);
