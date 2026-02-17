/**
 * ⚡ HUOKAING THARA: CORE-14 (PERFORMANCE)
 * Feature: FPS Tracking, Latency Monitoring & Auto-Optimization
 * Version: 4.0.0
 */

(function(Imperial) {
    let _frameCount = 0;
    let _lastTime = performance.now();
    let _fps = 60;
    let _monitorActive = false;

    const PerformanceMonitor = {
        /**
         * start: Begins the frame tracking loop
         */
        start: function() {
            if (_monitorActive) return;
            _monitorActive = true;
            this.loop();
            Imperial.Kernel.registerModule("core14_performance_active");
        },

        loop: function() {
            if (!_monitorActive) return;

            _frameCount++;
            const now = performance.now();
            const delta = now - _lastTime;

            if (delta >= 1000) {
                _fps = Math.round((_frameCount * 1000) / delta);
                _frameCount = 0;
                _lastTime = now;

                this.evaluate();
            }

            requestAnimationFrame(() => this.loop());
        },

        /**
         * evaluate: Decides if the system needs to optimize
         */
        evaluate: function() {
            if (_fps < 30) {
                Imperial.Events.emit('PERF_LOW', { fps: _fps });
                if (Imperial.Logger) Imperial.Logger.log("WARN", `Low Performance Detected: ${_fps} FPS`);
            } else if (_fps >= 55) {
                Imperial.Events.emit('PERF_HIGH', { fps: _fps });
            }
        },

        getFPS: function() {
            return _fps;
        },

        /**
         * getLatency: Measures the time it takes for a "round-trip" in the engine
         */
        checkLatency: async function() {
            const start = performance.now();
            // Simulate a core logic cycle
            return new Promise(resolve => {
                setTimeout(() => {
                    const end = performance.now();
                    resolve(end - start);
                }, 0);
            });
        }
    };

    // Attach to Global Namespace
    Imperial.Performance = PerformanceMonitor;

    // Register with Kernel
    Imperial.Kernel.registerModule("core14_performance");

    // Auto-start on load
    window.addEventListener('load', () => PerformanceMonitor.start());

})(window.Imperial);
