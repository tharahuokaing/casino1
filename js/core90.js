/**
 * 🛡️ HUOKAING THARA: CORE-90 (ANTI-TAMPER)
 * Feature: Memory Protection & Cheat Detection
 * Version: 4.0.0
 */

(function(Imperial) {
    let _lastTick = performance.now();
    let _tamperCount = 0;

    const PalaceGuard = {
        init: function() {
            // 1. Detect Speed Hacks (Time dilation)
            setInterval(() => this._checkClockDrift(), 2000);

            // 2. Protect Core Variables using Getters/Setters
            this._secureBalance();

            // 3. Detect DevTools Opening
            this._detectInspector();

            Imperial.Logger.log("SECURITY", "Palace Guard is watching the gates.");
        },

        _checkClockDrift: function() {
            const now = performance.now();
            const delta = now - _lastTick;
            
            // If more than 2.5s passed in a 2s interval, or less than 1.5s, 
            // someone is likely messing with the browser clock/CPU.
            if (delta > 2500 || delta < 1500) {
                this._flagInfection("CLOCK_TAMPER");
            }
            _lastTick = now;
        },

        _secureBalance: function() {
            // Shadowing the balance so it cannot be simply changed via console
            let _hiddenValue = 0;
            Object.defineProperty(Imperial.Player, 'balance', {
                get: () => _hiddenValue,
                set: (val) => {
                    // Check if the update comes from a signed server packet
                    if (Imperial.Network.isLastPacketValid()) {
                        _hiddenValue = val;
                    } else {
                        this._flagInfection("MEMORY_MUTATION_ATTEMPT");
                    }
                }
            });
        },

        _detectInspector: function() {
            const devtools = /./;
            devtools.toString = () => {
                this._flagInfection("INSPECTOR_OPENED");
                return '';
            };
            // Triggered if the user logs the object or opens certain console panels
            console.log('%c', devtools);
        },

        _flagInfection: function(reason) {
            _tamperCount++;
            Imperial.Logger.log("CRITICAL", `Security Breach: ${reason}`);
            
            if (_tamperCount > 1) {
                Imperial.Events.emit('SECURITY_TERMINATE', { reason });
                window.location.reload(); // Force kick
            }
        }
    };

    Imperial.Guard = PalaceGuard;
    Imperial.Kernel.registerModule("core90_anti_tamper");

    PalaceGuard.init();

})(window.Imperial);
