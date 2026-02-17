/**
 * 🎰 HUOKAING THARA: CORE-20 (GAME CONTROLLER)
 * Feature: Main Loop Coordination & Transaction Flow
 * Version: 4.0.0
 */

(function(Imperial) {
    const GameController = {
        /**
         * placeWager: Initiates the game cycle
         */
        initiateRound: function(amount, gameMode) {
            // 1. Check if we are in the correct state
            if (!Imperial.State.is('IDLE') && !Imperial.State.is('BETTING')) return;

            // 2. Validate the bet
            const check = Imperial.Payouts.isBetValid(amount);
            if (!check.valid) {
                Imperial.Notify.send("Bet Failed", Imperial.Locale.t(check.reason), "error");
                return false;
            }

            // 3. Deduct funds & Lock State
            Imperial.State.transition('BETTING');
            Imperial.Security.updateBalance(-amount);
            Imperial.State.transition('LOCKED');

            // 4. Start the "Processing" phase (Animation/Logic)
            this.processRound(amount, gameMode);
            return true;
        },

        /**
         * processRound: The internal logic for determining win/loss
         */
        processRound: async function(wager, mode) {
            Imperial.State.transition('PROCESSING');
            
            // Artificial delay to simulate "Thinking/Dealing" (e.g., 2 seconds)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate a random outcome (e.g., 40% win chance for demo)
            const isWin = Imperial.Math.getSecureRandom() > 0.6;
            
            this.resolveRound(wager, mode, isWin);
        },

        /**
         * resolveRound: Finalizes the transaction and returns to IDLE
         */
        resolveRound: function(wager, mode, isWin) {
            Imperial.State.transition('RESULT');

            if (isWin) {
                const payout = Imperial.Payouts.calculate(wager, mode);
                Imperial.Security.updateBalance(payout);
                Imperial.Notify.send("Winner", `${Imperial.Locale.t('win')} +$${payout}`, "gold");
                Imperial.Sound.playSFX('win_fanfare');
            } else {
                Imperial.Notify.send("Result", Imperial.Locale.t('loss'), "error");
                Imperial.Sound.playSFX('loss_thud');
            }

            // Small delay so user can see the result before resetting
            setTimeout(() => {
                Imperial.State.transition('IDLE');
                Imperial.Storage.saveState(); // Auto-save after every round
            }, 1500);
        }
    };

    // Attach to Global Namespace
    Imperial.Game = GameController;

    // Register with Kernel
    Imperial.Kernel.registerModule("core20_game_controller");

})(window.Imperial);
