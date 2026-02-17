/**
 * 📡 HUOKAING THARA: CORE-62 (FAILOVER LOGIC)
 * Feature: Resilient WebSockets & Exponential Backoff
 * Version: 4.0.0
 */

(function(Imperial) {
    let _socket = null;
    let _reconnectAttempts = 0;
    const _MAX_ATTEMPTS = 5;
    const _BASE_DELAY = 1000; // 1 second

    const FailoverManager = {
        /**
         * connect: Establishes the real-time bridge
         */
        connect: function(url) {
            _socket = new WebSocket(url);

            _socket.onopen = () => {
                _reconnectAttempts = 0;
                Imperial.Logger.log("NETWORK", "Imperial Bridge established.");
                Imperial.Events.emit('SOCKET_CONNECTED');
            };

            _socket.onclose = () => {
                Imperial.Logger.log("WARN", "Imperial Bridge lost. Attempting recovery...");
                this._attemptReconnect(url);
            };

            _socket.onerror = (err) => {
                Imperial.Events.emit('SOCKET_ERROR', err);
            };

            _socket.onmessage = (msg) => {
                const data = JSON.parse(msg.data);
                Imperial.Events.emit(`WS_${data.type}`, data.payload);
            };
        },

        /**
         * _attemptReconnect: Logic to prevent server hammering
         */
        _attemptReconnect: function(url) {
            if (_reconnectAttempts < _MAX_ATTEMPTS) {
                // Exponential Backoff: 1s, 2s, 4s, 8s, 16s
                const delay = _BASE_DELAY * Math.pow(2, _reconnectAttempts);
                
                setTimeout(() => {
                    _reconnectAttempts++;
                    Imperial.Logger.log("NETWORK", `Reconnecting... Attempt ${_reconnectAttempts}`);
                    this.connect(url);
                }, delay);
            } else {
                Imperial.Events.emit('CONNECTION_FATAL');
                Imperial.Logger.log("CRITICAL", "Maximum reconnection attempts reached.");
            }
        },

        send: function(type, payload) {
            if (_socket && _socket.readyState === WebSocket.OPEN) {
                _socket.send(JSON.stringify({ type, payload, ts: Date.now() }));
            }
        }
    };

    Imperial.Network.Socket = FailoverManager;
    Imperial.Kernel.registerModule("core62_failover_logic");

})(window.Imperial);
