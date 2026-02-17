/**
 * 🛰️ HUOKAING THARA: CORE-17 (NETWORK BRIDGE)
 * Feature: Secure HTTP Requests & API Communication
 * Version: 4.0.0
 */

(function(Imperial) {
    const _config = {
        apiBase: "https://api.your-empire.com/v1",
        timeout: 8000,
        headers: {
            "Content-Type": "application/json",
            "X-Imperial-Token": "KEY_PENDING"
        }
    };

    const NetworkBridge = {
        /**
         * request: Standardized wrapper for all outgoing calls
         */
        request: async function(endpoint, options = {}) {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), _config.timeout);

            const config = {
                ...options,
                headers: { ..._config.headers, ...options.headers },
                signal: controller.signal
            };

            try {
                const response = await fetch(`${_config.apiBase}${endpoint}`, config);
                clearTimeout(id);

                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

                const data = await response.json();
                Imperial.Events.emit('NET_SUCCESS', { endpoint, data });
                return data;

            } catch (error) {
                clearTimeout(id);
                const errorMsg = error.name === 'AbortError' ? "Request Timed Out" : error.message;
                
                Imperial.Logger.log("ERROR", `Network: ${errorMsg} at ${endpoint}`);
                Imperial.Events.emit('NET_FAILURE', { endpoint, error: errorMsg });
                
                return null;
            }
        },

        /**
         * ping: Health check to see if the server is alive
         */
        ping: async function() {
            return await this.request('/status', { method: 'GET' });
        }
    };

    // Attach to Global Namespace
    Imperial.Network = NetworkBridge;

    // Register with Kernel
    Imperial.Kernel.registerModule("core17_network_bridge");

    // Command Console Integration
    if (Imperial.Console) {
        Imperial.Console.register('net_ping', () => {
            NetworkBridge.ping().then(res => {
                console.log("[NET]: Server response received.", res);
            });
            return "Pinging server...";
        });
    }

})(window.Imperial);
