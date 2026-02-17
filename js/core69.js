/**
 * 🔋 HUOKAING THARA: CORE-69 (POWER SAVER)
 * Feature: Battery-Aware Performance Scaling
 * Version: 4.0.0
 */

(function(Imperial) {
    let _battery = null;

    const PowerSaver = {
        init: async function() {
            if ('getBattery' in navigator) {
                _battery = await navigator.getBattery();
                _battery.addEventListener('levelchange', () => this.evaluate());
                _battery.addEventListener('chargingchange', () => this.evaluate());
                this.evaluate();
            }
        },

        /**
         * evaluate: Adjusts engine intensity based on power state
         */
        evaluate: function() {
            if (!_battery) return;

            const isLow = _battery.level < 0.20 && !_battery.charging;
            const isCritical = _battery.level < 0.10 && !_battery.charging;

            if (isCritical) {
                this._setMode('ULTRA_LOW');
            } else if (isLow) {
                this._setMode('ECONOMY');
            } else {
                this._setMode('PERFORMANCE');
            }
        },

        /**
         * _setMode: Signals other cores to throttle back
         */
        _setMode: function(mode) {
            Imperial.Logger.log("SYSTEM", `Power Mode switched to: ${mode}`);
            
            const settings = {
                ULTRA_LOW: { fps: 30, shaders: false, particles: 0.2 },
                ECONOMY: { fps: 45, shaders: true, particles: 0.5 },
                PERFORMANCE: { fps: 60, shaders: true, particles: 1.0 }
            };

            const target = settings[mode];

            // 1. Throttle Frame Rate (Core 21)
            if (Imperial.Render) Imperial.Render.setMaxFPS(target.fps);

            // 2. Disable Post-Processing (Core 61)
            if (Imperial.Shaders) {
                target.shaders ? Imperial.Shaders.enable() : Imperial.Shaders.disable();
            }

            // 3. Notify Particle Systems (Core 28)
            Imperial.Events.emit('POWER_MODE_CHANGED', target);
        }
    };

    Imperial.Power = PowerSaver;
    Imperial.Kernel.registerModule("core69_power_saver");

    // Ignition
    PowerSaver.init();

})(window.Imperial);
