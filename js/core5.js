/**
 * 🔑 HUOKAING THARA: CORE-5 (SESSION)
 * Feature: Identity Assignment & Session Lifespan
 * Version: 4.0.0
 */

(function(Imperial) {
    const _sessionData = {
        id: null,
        startTime: null,
        user: "GUEST",
        isActive: false
    };

    const SessionManager = {
        /**
         * startSession: Generates a unique ID and marks the timeline
         */
        start: function(username = "GUEST") {
            _sessionData.id = `TS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            _sessionData.startTime = Date.now();
            _sessionData.user = username;
            _sessionData.isActive = true;

            // Notify the system that a session has begun
            Imperial.Events.emit('SESSION_STARTED', {
                user: _sessionData.user,
                sid: _sessionData.id
            });

            Imperial.Kernel.registerModule("core5_session_active");
            console.log(`[SESSION]: Identity assigned as ${_sessionData.id}`);
        },

        /**
         * getDuration: Calculates how long the user has been in the empire (in seconds)
         */
        getDuration: function() {
            if (!_sessionData.startTime) return 0;
            return Math.floor((Date.now() - _sessionData.startTime) / 1000);
        },

        getSessionID: function() {
            return _sessionData.id;
        },

        getCurrentUser: function() {
            return _sessionData.user;
        },

        /**
         * endSession: Flushes session data and prepares for logout/shutdown
         */
        terminate: function() {
            _sessionData.isActive = false;
            Imperial.Events.emit('SESSION_TERMINATED', { id: _sessionData.id });
        }
    };

    // Attach to Global Namespace
    Imperial.Session = SessionManager;

    // Register with Kernel
    Imperial.Kernel.registerModule("core5_session");

    // Auto-start a guest session on load
    SessionManager.start();

})(window.Imperial);
