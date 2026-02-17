/**
 * 🛡️ HUOKAING THARA: CORE-65 (ANTI-DEBUG)
 * Feature: DevTools Detection & Execution Integrity
 * Version: 4.0.0
 */

(function(Imperial) {
    let _isInspecting = false;

    const SecurityShield = {
        init: function() {
            // 1. Threshold Detection (Detects slowdowns caused by breakpoints)
            setInterval(() => this._checkExecutionSpeed(), 2000);

            // 2. Window Dimension Check (Commonly shifts when DevTools opens)
            window.addEventListener('resize', () => this._detectDevTools());

            // 3. Trap: Debugger keyword to pause unauthorized inspection
            this._deployTraps();
        },

        _checkExecutionSpeed: function() {
            const start = performance.now();
            // This is a no-op loop to measure speed
            for(let i = 0; i < 1000000; i++) { Math.sqrt(i); }
            const end = performance.now();

            if (end - start > 100) { // If it takes >100ms, a debugger is likely attached
                this._onViolation("EXECUTION_DELAY_DETECTED");
            }
        },

        _detectDevTools: function() {
            const threshold = 160;
            const widthCheck = window.outerWidth - window.innerWidth > threshold;
            const heightCheck = window.outerHeight - window.innerHeight > threshold;

            if (widthCheck || heightCheck) {
                this._onViolation("DEVTOOLS_OPENED");
            }
        },

        _deployTraps: function() {
            // Self-invoking function that triggers 'debugger' in a loop
            // making the console nearly unusable for casual inspectors
            const trap = function() {
                (function(c) {
                    (function(a) {
                        if (a === 'custom') { return; }
                        // debugger; // Uncomment to aggressively lock console
                    })('custom');
                })('trap');
            };
            setInterval(trap, 5000);
        },

        _onViolation: function(reason) {
            if (_isInspecting) return;
            _isInspecting = true;
            
            Imperial.Logger.log("SECURITY", `Violation: ${reason}`);
            Imperial.Events.emit('SECURITY_VIOLATION', { reason });

            // Send signal to High Command via Core-37
            if (Imperial.Network) {
                Imperial.Network.request('/security/alert', {
                    method: 'POST',
                    body: JSON.stringify({ type: reason, ts: Date.now() })
                });
            }
        }
    };

    Imperial.Security.Shield = SecurityShield;
    Imperial.Kernel.registerModule("core65_anti_debug");

    // Ignition
    SecurityShield.init();

})(window.Imperial);
