/**
 * 💰 HUOKAING THARA: CORE-19 (PAYOUT ENGINE)
 * Feature: Multiplier Tables & Payout Validation
 * Version: 4.0.0
 */

(function(Imperial) {
    // Standardized payout table for different game modes
    const _payoutTable = {
        'SINGLE_MATCH': 2.0,   // 1:1 profit
        'TRIPLE_MATCH': 10.0,  // 9:1 profit
        'JACKPOT': 100.0,      // Massive win
        'SIDE_BET': 1.5,       // Low risk
        'BACCARAT_BANKER': 1.95, // 5% commission applied
        'ROULETTE_STRAIGHT': 36.0
    };

    const PayoutEngine = {
        /**
         * calculate: Returns the total amount to be returned to the player
         * @param {number} wager - The initial bet
         * @param {string} mode - The key from the payout table
         */
        calculate: function(wager, mode) {
            const multiplier = _payoutTable[mode] || 0;
            const result = Imperial.Math.multiply(wager, multiplier);
            
            Imperial.Logger.log("TRANSACTION", `Payout Calc: $${wager} @ x${multiplier} = $${result}`);
            return result;
        },

        /**
         * getMultiplier: Simply checks the table for UI display
         */
        getMultiplier: function(mode) {
            return _payoutTable[mode] || 0;
        },

        /**
         * validateBet: Ensures the bet is within house limits
         */
        isBetValid: function(amount, min = 1, max = 10000) {
            const currentBalance = Imperial.Security.getBalance();
            if (amount < min) return { valid: false, reason: "BET_TOO_LOW" };
            if (amount > max) return { valid: false, reason: "BET_TOO_HIGH" };
            if (amount > currentBalance) return { valid: false, reason: "INSUFFICIENT_FUNDS" };
            
            return { valid: true };
        }
    };

    // Attach to Global Namespace
    Imperial.Payouts = PayoutEngine;

    // Register with Kernel
    Imperial.Kernel.registerModule("core19_payout_engine");

    // Command Console Integration
    if (Imperial.Console) {
        Imperial.Console.register('check_odds', (mode) => {
            const odds = PayoutEngine.getMultiplier(mode);
            return odds > 0 ? `Odds for ${mode}: x${odds}` : "Invalid game mode.";
        });
    }

})(window.Imperial);
