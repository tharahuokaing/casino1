/**
 * 📳 HUOKAING THARA: CORE-92 (HAPTIC ORCHESTRATOR)
 * Feature: Tactile Feedback & Rhythmic Vibration
 * Version: 4.0.0
 */

(function(Imperial) {
    const _PATTERNS = {
        TICK: 10,                 // Subtle mechanical feel
        CLICK: [15, 5, 15],       // Double-tap tactile
        BIG_WIN: [100, 50, 100, 50, 300], // Explosive celebration
        HEARTBEAT: [50, 500, 50, 500],    // Tension/Anticipation
        ERROR: [200, 100, 200]    // Warning feedback
    };

    const HapticOrchestrator = {
        _enabled: true,

        init: function() {
            // Check for hardware support
            if (!("vibrate" in navigator)) {
                Imperial.Logger.log("SYSTEM", "Haptics not supported on this device.");
                this._enabled = false;
            }
        },

        /**
         * trigger: Executes a haptic pattern
         */
        trigger: function(type) {
            if (!this._enabled || !Imperial.Settings.isHapticOn()) return;

            const pattern = _PATTERNS[type] || type;
            navigator.vibrate(pattern);
        },

        /**
         * rhythmicPulse: Creates a continuous pulse (e.g., during a "Bonus Chase")
         */
        startTension: function() {
            this._tensionInterval = setInterval(() => {
                this.trigger('HEARTBEAT');
            }, 1100);
        },

        stopTension: function() {
            if (this._tensionInterval) clearInterval(this._tensionInterval);
        }
    };

    Imperial.Haptics = HapticOrchestrator;
    Imperial.Kernel.registerModule("core92_haptic_orchestrator");

    // Integration: Hook into game events
    Imperial.Events.on('UI_CLICK', () => HapticOrchestrator.trigger('CLICK'));
    Imperial.Events.on('REEL_STOP', () => HapticOrchestrator.trigger('TICK'));
    Imperial.Events.on('JACKPOT_STRIKE', () => HapticOrchestrator.trigger('BIG_WIN'));

    HapticOrchestrator.init();

})(window.Imperial);
