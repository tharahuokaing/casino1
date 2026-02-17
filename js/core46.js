/**
 * 📊 HUOKAING THARA: CORE-46 (ANALYTICS)
 * Feature: Event Tracking & Heatmap Telemetry
 * Version: 4.0.0
 */

(function(Imperial) {
    const _eventBuffer = [];
    const _MAX_BUFFER = 10;

    const AnalyticsEngine = {
        /**
         * trackEvent: Records a specific user action
         */
        logAction: function(category, action, label = null, value = 0) {
            const entry = {
                category,
                action,
                label,
                value,
                timestamp: Date.now(),
                url: window.location.href
            };

            _eventBuffer.push(entry);
            this._checkBuffer();
        },

        /**
         * trackClick: Logs X/Y coordinates for heatmap generation
         */
        logClick: function(e) {
            const clickData = {
                x: e.clientX,
                y: e.clientY,
                target: e.target.id || e.target.className,
                timestamp: Date.now()
            };
            this.logAction('UX', 'CLICK', JSON.stringify(clickData));
        },

        /**
         * _checkBuffer: Batches data to save network requests
         */
        _checkBuffer: function() {
            if (_eventBuffer.length >= _MAX_BUFFER) {
                this._flush();
            }
        },

        _flush: async function() {
            if (_eventBuffer.length === 0) return;

            const dataToSync = [..._eventBuffer];
            _eventBuffer.length = 0; // Clear buffer

            try {
                await Imperial.Network.request('/analytics/collect', {
                    method: 'POST',
                    body: JSON.stringify({ events: dataToSync })
                });
            } catch (err) {
                // If it fails, put data back to try again later
                _eventBuffer.push(...dataToSync);
            }
        }
    };

    Imperial.Analytics = AnalyticsEngine;
    Imperial.Kernel.registerModule("core46_analytics_collector");

    // Global Listeners for Heatmap Data
    window.addEventListener('click', (e) => AnalyticsEngine.logClick(e));

    // Listen for Game Events
    Imperial.Events.on('GAME_START', (data) => {
        AnalyticsEngine.logAction('GAMEPLAY', 'START', data.gameId);
    });

})(window.Imperial);
