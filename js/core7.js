/**
 * 🎲 HUOKAING THARA: CORE-7 (MATH & RNG)
 * Feature: High-Precision Calculation & Seeded Randomness
 * Version: 4.0.0
 */

(function(Imperial) {
    const MathEngine = {
        /**
         * generateSeed: Creates a random hex string for "Provably Fair" logic
         */
        generateSeed: function() {
            return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        },

        /**
         * getSecureRandom: Generates a float between 0 and 1 using crypto-grade entropy
         */
        getSecureRandom: function() {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] / (Math.pow(2, 32) - 1);
        },

        /**
         * rollRange: Returns a whole number between min and max (inclusive)
         */
        roll: function(min, max) {
            return Math.floor(this.getSecureRandom() * (max - min + 1)) + min;
        },

        /**
         * preciseMultiply: Prevents floating point errors (e.g., 0.1 + 0.2 != 0.3)
         * Useful for calculating betting multipliers.
         */
        multiply: function(a, b) {
            return parseFloat((a * b).toFixed(8));
        },

        /**
         * calculateHouseEdge: Simple helper for payout reductions
         * @param {number} amount - The original win
         * @param {number} commission - Percentage (e.g., 5 for 5%)
         */
        applyCommission: function(amount, commission) {
            const fee = (amount * commission) / 100;
            return this.multiply(amount - fee, 1);
        }
    };

    // Attach to Global Namespace
    Imperial.Math = MathEngine;

    // Register with Kernel
    Imperial.Kernel.registerModule("core7_math_rng");

    // Log the initialization of the RNG seed
    if (Imperial.Logger) {
        Imperial.Logger.log("INFO", "Mathematics Engine initialized with Crypto-RNG.");
    }

})(window.Imperial);
