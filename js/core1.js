/**
 * 🎰 HUOKAING THARA: CORE-01 (REEL LOGIC)
 * Feature: RNG & Win Calculation
 */

(function(Imperial) {
    const ReelLogic = {
        init: function() {
            // Listen for the SPIN command from the UI
            Imperial.Events.on('CMD_SPIN', () => this.spin());
            Imperial.Logger.log("GAME", "Reel Logic Core-01 Online.");
        },

        spin: function() {
            Imperial.Logger.log("GAME", "RNG Sequence Initiated...");
            
            // Simulate a 2-second spin
            setTimeout(() => {
                const winAmount = (Math.random() > 0.7) ? (Math.random() * 100).toFixed(2) : 0;
                
                // Tell the system the spin is finished
                Imperial.Events.emit('SPIN_COMPLETE', {
                    winAmount: winAmount,
                    symbols: [1, 5, 2]
                });

                // Update the balance if there's a win
                if (winAmount > 0) {
                    Imperial.Events.emit('BALANCE_UPDATE', parseFloat(winAmount));
                }
            }, 2000);
        }
    };

    Imperial.Reels = ReelLogic;
    Imperial.Kernel.registerModule("core01_reel_logic");
    ReelLogic.init();

})(window.Imperial);