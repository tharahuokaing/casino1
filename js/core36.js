/**
 * 📡 HUOKAING THARA: CORE-37 (NETWORK GATEWAY)
 * Feature: API Integration & WebSocket Management
 * Version: 4.0.0
 */

(function(Imperial) {
    const _config = {
        apiBase: "https://api.imperial-empire.com/v1",
        wsEndpoint: "wss://socket.imperial-empire.com",
        timeout: 5000
    };

    const NetworkGateway = {
        /**
         * request: Standard HTTP/API call with automatic auth headers
         */
        request: async function(endpoint, options = {}) {
            const url = `${_config.apiBase}${endpoint}`;
            const defaultHeaders = {
                'Content-Type': 'application/json',
                'X-Imperial-Token': localStorage.getItem('IMP_SESSION_TOKEN')
            };

            try {
                const response = await fetch(url, {
                    ...options,
                    headers: { ...defaultHeaders, ...options.headers }
                });

                if (!response.ok) throw new Error(`Network error: ${response.status}`);
                
                return await response.json();
            } catch (error) {
                Imperial.Logger.log("ERROR", `API Request Failed: ${error.message}`);
                Imperial.Events.emit('NETWORK_OFFLINE');
                throw error;
            }
        },

        /**
         * syncWithServer: Pushes local state to the cloud
         */
        syncWithServer: async function() {
            const payload = {
                balance: Imperial.Security.getBalance(),
                stats: Imperial.Stats ? Imperial.Stats.getWinRate() : null,
                timestamp: Date.now()
            };

            return await this.request('/sync', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
        }
    };

    // Attach to Global Namespace
    Imperial.Network = NetworkGateway;

    // Register with Kernel
    Imperial.Kernel.registerModule("core37_network_gateway");

    // Integration: Periodically sync balance to server every 5 minutes
    setInterval(() => {
        if (Imperial.Security.isDirty) NetworkGateway.syncWithServer();
    }, 300000);

})(window.Imperial);
