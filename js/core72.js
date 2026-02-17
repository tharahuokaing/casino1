/**
 * 📳 HUOKAING THARA: CORE-72 (HAPTICS)
 * Feature: Tactile Feedback & Pattern Vibration
 * Version: 4.0.0
 */

(function(Imperial) {
    const _patterns = {
        TICK: [10],                // Light mechanical click
        THUMP: [40],               // Reel stopping
        HEARTBEAT: [100, 50, 100], // Bonus tension
        JACKPOT: [100, 30, 200, 30, 500], // Massive celebration
        ERROR: [50, 50, 50, 50]    // Rejection / Insufficient funds
    };

    const HapticBridge = {
        /**
         * trigger: Executes a haptic pulse if supported
         */
        trigger: function(type) {
            if (!("vibrate" in navigator)) return;

            const pattern = _patterns[type] || [50];
            
            // Respect 'Power Saver' (Core 69) - disable haptics if battery is low
            if (Imperial.Power && Imperial.Power.isLowMode()) return;

            navigator.vibrate(pattern);
        },

        /**
         * custom: Allows the FX engine (Core 28) to send raw pulse sequences
         */
        custom: function(sequence) {
            if (navigator.vibrate) navigator.vibrate(sequence);
        }
    };

    Imperial.Haptics = HapticBridge;
    Imperial.Kernel.registerModule("core72_haptic_bridge");

    // Integration: Hook into game events
    Imperial.Events.on('UI_CLICK', () => HapticBridge.trigger('TICK'));
    Imperial.Events.on('REEL_STOP', () => HapticBridge.trigger('THUMP'));
    Imperial.Events.on('PLAYER_WINS_BIG', () => HapticBridge.trigger('JACKPOT'));
    Imperial.Events.on('BALANCE_INSUFFICIENT', () => HapticBridge.trigger('ERROR'));

})(window.Imperial);
