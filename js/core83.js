/**
 * 💓 HUOKAING THARA: CORE-83 (HEARTBEAT)
 * Feature: Ping-Pong Logic & Latency Interpolation
 * Version: 4.0.0
 */

(function(Imperial) {
    let _pingInterval = null;
    let _lastPingTime = 0;
    let _latency = 0;

    const ConnectionHeartbeat = {
        init: function() {
            Imperial.Events.on('WS_CONNECTED', () => this.start());
            Imperial.Events.on('WS_PONG', () => this._onPong());
        },

        start: function() {
            if (_pingInterval) clearInterval(_pingInterval);
            
            _pingInterval = setInterval(() => {
                _lastPingTime = performance.now();
                Imperial.Network.send({ type: 'PING', ts: _lastPingTime });
            }, 5000); // Heartbeat every 5 seconds
        },

        _onPong: function() {
            _latency = performance.now() - _lastPingTime;
            Imperial.Logger.log("NET", `Latency: ${_latency.toFixed(0)}ms`);
            
            // Adjust Game Speed if latency is too high
            this._adjustCompensation();
        },

        /**
         * _adjustCompensation: Informs the Animator (Core 25) to interpolate frames
         */
        _adjustCompensation: function() {
            const factor = _latency > 200 ? 1.2 : 1.0; 
            // If laggy, speed up internal animations slightly to "catch up" 
            // to the server's authoritative state.
            Imperial.Events.emit('LATENCY_ADJUST', { factor, ms: _latency });
        },

        getLatency: () => _latency,

        /**
         * predictState: Extrapolates the next state during a dropout
         */
        predictNextFrame: function(currentData) {
            // Logic to continue reel rotation or particle drift 
            // even if the server hasn't sent the 'STOP' command yet.
            return currentData + (currentData * (_latency / 1000));
        }
    };

    Imperial.Heartbeat = ConnectionHeartbeat;
    Imperial.Kernel.registerModule("core83_heartbeat");

    ConnectionHeartbeat.init();

})(window.Imperial);
