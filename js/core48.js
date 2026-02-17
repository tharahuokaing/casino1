/**
 * 💓 HUOKAING THARA: CORE-48 (SESSION HEARTBEAT)
 * Feature: Silent Token Refresh & Keep-Alive Logic
 * Version: 4.0.0
 */

(function(Imperial) {
    let _refreshTimer = null;
    let _lastPulse = Date.now();

    const SessionManager = {
        /**
         * init: Starts the heartbeat cycle
         */
        startHeartbeat: function() {
            this.pulse();
            // Check every 30 seconds
            _refreshTimer = setInterval(() => this.checkExpiry(), 30000);
            Imperial.Logger.log("SECURITY", "Session Heartbeat active.");
        },

        /**
         * checkExpiry: Determines if a token refresh is needed
         */
        checkExpiry: function() {
            const token = localStorage.getItem('IMP_SESSION_TOKEN');
            if (!token) return;

            // Decode payload to get 'exp' (expiry) claim
            const payload = JSON.parse(atob(token.split('.')[1]));
            const buffer = 300; // 5 minute safety buffer
            const now = Math.floor(Date.now() / 1000);

            if (payload.exp - now < buffer) {
                this.refreshToken();
            }
        },

        /**
         * refreshToken: Communicates with auth endpoint for a new token
         */
        refreshToken: async function() {
            Imperial.Logger.log("SECURITY", "Token nearing expiry. Refreshing...");
            try {
                const response = await Imperial.Network.request('/auth/refresh', {
                    method: 'POST'
                });
                
                if (response.token) {
                    localStorage.setItem('IMP_SESSION_TOKEN', response.token);
                    Imperial.Logger.log("SUCCESS", "Session extended.");
                }
            } catch (err) {
                Imperial.Logger.log("CRITICAL", "Session refresh failed. User must re-auth.");
                Imperial.Events.emit('SESSION_EXPIRED');
            }
        },

        /**
         * pulse: Notifies the server the user is still active
         */
        pulse: function() {
            _lastPulse = Date.now();
            Imperial.Network.request('/session/pulse', { method: 'GET' })
                .catch(() => Imperial.Logger.log("WARN", "Pulse failed. Check network."));
        }
    };

    Imperial.Session = SessionManager;
    Imperial.Kernel.registerModule("core48_session_handshake");

    // Integration: Refresh heartbeat on user interaction
    window.addEventListener('mousedown', () => SessionManager.pulse());

})(window.Imperial);
