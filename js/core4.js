/**
 * 📡 HUOKAING THARA: CORE-4 (EVENT BUS)
 * Feature: Pub/Sub Messaging System
 * Version: 4.0.0
 */

(function(Imperial) {
    const _events = {};

    const EventBus = {
        /**
         * subscribe: Listen for a specific event
         * @param {string} eventName - e.g., 'VAULT_UPDATED'
         * @param {function} callback - Function to run when event happens
         */
        on: function(eventName, callback) {
            if (!_events[eventName]) {
                _events[eventName] = [];
            }
            _events[eventName].push(callback);
        },

        /**
         * publish: Trigger an event and send data to all listeners
         * @param {string} eventName - e.g., 'GAME_WIN'
         * @param {object} data - The data to pass along
         */
        emit: function(eventName, data) {
            if (!_events[eventName]) return;
            
            console.log(`%c [BUS]: Event Triggered -> ${eventName} `, "color: #f1c40f;");
            
            _events[eventName].forEach(callback => {
                try {
                    callback(data);
                } catch (e) {
                    console.error(`[BUS]: Error in listener for ${eventName}`, e);
                }
            });
        },

        /**
         * unsubscribe: Remove a listener
         */
        off: function(eventName, callback) {
            if (!_events[eventName]) return;
            _events[eventName] = _events[eventName].filter(cb => cb !== callback);
        }
    };

    // Attach to Global Namespace
    Imperial.Events = EventBus;

    // Register with Kernel
    Imperial.Kernel.registerModule("core4_event_bus");

})(window.Imperial);
