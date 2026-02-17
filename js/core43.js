/**
 * 🎰 HUOKAING THARA: CORE-43 (SLOT ENGINE)
 * Feature: Weighted Reels & Payline Logic
 * Version: 4.0.0
 */

(function(Imperial) {
    const _config = {
        symbols: ['7', 'BAR', 'BELL', 'CHERRY', 'LEMON'],
        // Weighting: Higher number = more common
        weights: { '7': 1, 'BAR': 3, 'BELL': 6, 'CHERRY': 10, 'LEMON': 15 }
    };

    const SlotEngine = {
        /**
         * spin: Returns a result array for X number of reels
         */
        spin: async function(reelCount = 3) {
            const result = [];
            for (let i = 0; i < reelCount; i++) {
                const stop = await this._getWeightedSymbol();
                result.push(stop);
            }
            
            Imperial.Logger.log("GAME", `Slot Spin Result: ${result.join(' | ')}`);
            return result;
        },

        /**
         * _getWeightedSymbol: Logic to map 0.0-1.0 RNG to specific symbols
         */
        _getWeightedSymbol: async function() {
            const totalWeight = Object.values(_config.weights).reduce((a, b) => a + b, 0);
            let random = (await Imperial.RNG.generateResult()) * totalWeight;
            
            for (const [symbol, weight] of Object.entries(_config.weights)) {
                if (random < weight) return symbol;
                random -= weight;
            }
            return _config.symbols[_config.symbols.length - 1];
        },

        /**
         * checkWin: Simple logic to detect matches
         */
        checkWin: function(result) {
            const unique = [...new Set(result)];
            if (unique.length === 1) {
                return { type: 'JACKPOT', multiplier: 50 };
            } else if (unique.length === 2 && result.length > 2) {
                return { type: 'MINI_WIN', multiplier: 5 };
            }
            return { type: 'LOSS', multiplier: 0 };
        }
    };

    Imperial.Slots = SlotEngine;
    Imperial.Kernel.registerModule("core43_slot_engine");

})(window.Imperial);
