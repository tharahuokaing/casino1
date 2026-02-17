/**
 * 🕵️ HUOKAING THARA: CORE-97 (INTERACTION TRACKER)
 * Feature: Click Heatmaps & Behavior Analytics
 * Version: 4.0.0
 */

(function(Imperial) {
    let _dataBuffer = [];
    const _MAX_BUFFER = 50; // Send data in batches to save bandwidth

    const AnalyticsSpy = {
        init: function() {
            window.addEventListener('mousedown', (e) => this._record(e, 'click'));
            window.addEventListener('touchstart', (e) => this._record(e.touches[0], 'touch'));
            
            Imperial.Logger.log("SYSTEM", "Analytics Spy is observing interactions.");
        },

        /**
         * _record: Captures coordinate data relative to screen size
         */
        _record: function(e, type) {
            const entry = {
                t: type,
                x: Math.round((e.clientX / window.innerWidth) * 1000), // Normalized 0-1000
                y: Math.round((e.clientY / window.innerHeight) * 1000),
                ts: Date.now(),
                ui: e.target.id || e.target.className || 'unknown'
            };

            _dataBuffer.push(entry);

            if (_dataBuffer.length >= _MAX_BUFFER) {
                this.flush();
            }
        },

        /**
         * flush: Dispatches the gathered intelligence to the High Command
         */
        flush: function() {
            if (_dataBuffer.length === 0) return;

            Imperial.Network.send({
                type: 'ANALYTICS_BATCH',
                payload: _dataBuffer,
                resolution: { w: window.innerWidth, h: window.innerHeight }
            });

            _dataBuffer = [];
        }
    };

    Imperial.Spy = AnalyticsSpy;
    Imperial.Kernel.registerModule("core97_analytics_spy");

    AnalyticsSpy.init();

})(window.Imperial);
