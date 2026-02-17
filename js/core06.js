/**
 * 📝 HUOKAING THARA: CORE-6 (LOGGER)
 * Feature: Chronological Audit Trail & Error Tracking
 * Version: 4.0.0
 */

(function(Imperial) {
    const _logs = [];
    const MAX_LOGS = 500; // Prevent memory leaks

    const LoggerModule = {
        /**
         * log: The primary entry point for recording system events
         * @param {string} type - 'INFO', 'WARN', 'ERROR', or 'TRANSACTION'
         * @param {string} message - Description of the event
         */
        log: function(type, message) {
            const entry = {
                timestamp: new Date().toISOString(),
                session: Imperial.Session ? Imperial.Session.getSessionID() : "N/A",
                type: type.toUpperCase(),
                message: message
            };

            _logs.push(entry);

            // Maintain log size limit
            if (_logs.length > MAX_LOGS) {
                _logs.shift();
            }

            // Style console output based on type
            const colors = {
                INFO: "#3498db",
                WARN: "#f39c12",
                ERROR: "#e74c3c",
                TRANSACTION: "#2ecc71"
            };

            console.log(`%c[${entry.type}] %c${entry.message}`, 
                `color: ${colors[entry.type] || "#fff"}; font-weight: bold;`, 
                "color: #ccc;");

            // Auto-emit for UI listeners (like a terminal or chat)
            if (Imperial.Events) {
                Imperial.Events.emit('LOG_ADDED', entry);
            }
        },

        /**
         * getHistory: Export the current log trail
         */
        getHistory: function() {
            return [..._logs];
        },

        /**
         * clear: Wipe session logs
         */
        clear: function() {
            _logs.length = 0;
            this.log("INFO", "Audit trail cleared by system.");
        }
    };

    // Attach to Global Namespace
    Imperial.Logger = LoggerModule;

    // Register with Kernel
    Imperial.Kernel.registerModule("core6_logger");

    // Listen for global session events to log them automatically
    window.addEventListener('load', () => {
        if (Imperial.Events) {
            Imperial.Events.on('SESSION_STARTED', data => {
                LoggerModule.log("INFO", `New session initialized: ${data.sid}`);
            });
            
            Imperial.Events.on('VAULT_UPDATED', data => {
                LoggerModule.log("TRANSACTION", `Vault balance modified. New balance: ${data.balance}`);
            });
        }
    });

})(window.Imperial);
