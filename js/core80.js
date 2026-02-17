/**
 * 📊 HUOKAING THARA: CORE-80 (HEATMAPPER)
 * Feature: Coordinate Tracking & Behavioral Analytics
 * Version: 4.0.0
 */

(function(Imperial) {
    let _dataPoints = [];
    const _BATCH_LIMIT = 100; // Send data every 100 interactions
    const _SAMPLE_RATE = 0.5; // Track 50% of movements to save bandwidth

    const Heatmapper = {
        init: function() {
            // 1. Track Clicks (High Priority)
            Imperial.Events.on('INPUT_START', (data) => this._record('CLICK', data.lastX, data.lastY));

            // 2. Track Movement (Sampled for efficiency)
            Imperial.Events.on('INPUT_MOVE', (data) => {
                if (Math.random() < _SAMPLE_RATE) {
                    this._record('MOVE', data.lastX, data.lastY);
                }
            });

            Imperial.Logger.log("ANALYTICS", "Heatmapper active. Optimizing for player flow.");
        },

        /**
         * _record: Logs the interaction with context
         */
        _record: function(type, x, y) {
            const point = {
                t: Date.now(),
                type: type,
                x: Math.round(x),
                y: Math.round(y),
                view: Imperial.Viewport ? Imperial.Viewport.getOrientation() : 'UNKNOWN'
            };

            _dataPoints.push(point);

            if (_dataPoints.length >= _BATCH_LIMIT) {
                this._sync();
            }
        },

        /**
         * _sync: Offloads data to the server via Core-37
         */
        _sync: async function() {
            const payload = [..._dataPoints];
            _dataPoints = []; // Clear local buffer immediately

            if (Imperial.Network) {
                Imperial.Network.request('/analytics/heatmap', {
                    method: 'POST',
                    body: JSON.stringify({
                        sessionId: Imperial.Session ? Imperial.Session.getId() : 'anon',
                        points: payload
                    })
                }).catch(() => {
                    // If sync fails, put data back to try again later
                    _dataPoints = [...payload, ..._dataPoints];
                });
            }
        },

        /**
         * debugOverlay: Visualizes the heatmap on the current screen (Dev Only)
         */
        showDebug: function() {
            // Logic to draw semi-transparent red "blobs" over the canvas...
            Imperial.Logger.log("DEBUG", "Visualizing interaction density...");
        }
    };

    Imperial.Analytics = Heatmapper;
    Imperial.Kernel.registerModule("core80_heatmapper");

    // Ignition
    Heatmapper.init();

})(window.Imperial);
