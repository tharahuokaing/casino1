/**
 * 🛠️ HUOKAING THARA: CORE-86 (PROFILER)
 * Feature: Real-time FPS Monitoring & Auto-Throttling
 * Version: 4.0.0
 */

(function(Imperial) {
    let _frames = 0;
    let _lastTime = performance.now();
    let _fpsHistory = [];

    const Profiler = {
        metrics: { fps: 60, drawCalls: 0, cpuTime: 0 },

        init: function() {
            this.measure();
            Imperial.Logger.log("SYSTEM", "Performance Profiler active.");
        },

        /**
         * measure: Core loop to calculate FPS and detect "jank"
         */
        measure: function() {
            const now = performance.now();
            _frames++;

            if (now >= _lastTime + 1000) {
                this.metrics.fps = Math.round((_frames * 1000) / (now - _lastTime));
                _fpsHistory.push(this.metrics.fps);
                if (_fpsHistory.length > 10) _fpsHistory.shift();

                this._checkHealth();

                _frames = 0;
                _lastTime = now;
            }

            requestAnimationFrame(() => this.measure());
        },

        /**
         * _checkHealth: Decides if the engine needs to "Downshift"
         */
        _checkHealth: function() {
            const avgFps = _fpsHistory.reduce((a, b) => a + b) / _fpsHistory.length;

            if (avgFps < 30) {
                Imperial.Logger.log("CRITICAL", `Performance Drop Detected: ${avgFps} FPS. Throttling...`);
                Imperial.Events.emit('PERFORMANCE_CRISIS', { severity: 'HIGH' });
                
                // Command Core-28 to cut particle density by 50%
                if (Imperial.FX) Imperial.FX.setQuality('LOW');
            }
        },

        getReport: () => ({
            ...Profiler.metrics,
            history: _fpsHistory,
            ua: navigator.userAgent
        })
    };

    Imperial.Profiler = Profiler;
    Imperial.Kernel.registerModule("core86_performance_profiler");

    Profiler.init();

})(window.Imperial);
