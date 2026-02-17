/**
 * ⚡ HUOKAING THARA: CORE-33 (PERFORMANCE MONITOR)
 * Feature: FPS Tracking & Dynamic Quality Scaling
 * Version: 4.0.0
 */

(function(Imperial) {
    let _frameCount = 0;
    let _lastTime = performance.now();
    let _fps = 60;
    let _lowPerfCount = 0;

    const PerformanceMonitor = {
        init: function() {
            this.measure();
            Imperial.Logger.log("INFO", "Performance Monitor engaged.");
        },

        measure: function() {
            const now = performance.now();
            _frameCount++;

            if (now >= _lastTime + 1000) {
                _fps = _frameCount;
                _frameCount = 0;
                _lastTime = now;
                this.analyze();
            }

            requestAnimationFrame(() => this.measure());
        },

        analyze: function() {
            // If FPS drops below 30 for 5 consecutive checks
            if (_fps < 30) {
                _lowPerfCount++;
                if (_lowPerfCount >= 5) {
                    this.triggerPowerSaver();
                }
            } else {
                _lowPerfCount = 0;
            }
        },

        triggerPowerSaver: function() {
            Imperial.Logger.log("WARN", "Low performance detected. Entering Power Saver.");
            Imperial.Events.emit('PERFORMANCE_CRITICAL', { fps: _fps });
            
            // Example action: Tell the FX engine to stop spawning particles
            if (Imperial.FX) {
                Imperial.Notify.send("System", "Graphics reduced for performance.", "info");
            }
        },

        getFPS: function() {
            return _fps;
        }
    };

    // Attach to Global Namespace
    Imperial.Monitor = PerformanceMonitor;

    // Register with Kernel
    Imperial.Kernel.registerModule("core33_performance_monitor");

    window.addEventListener('load', () => PerformanceMonitor.init());

})(window.Imperial);
