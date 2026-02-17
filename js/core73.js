/**
 * 📼 HUOKAING THARA: CORE-73 (REPLAY RECORDER)
 * Feature: State-based Session Recording & Error Reconstruction
 * Version: 4.0.0
 */

(function(Imperial) {
    const _logLimit = 500; // Keep the last 500 events
    let _sessionLog = [];

    const ReplayRecorder = {
        /**
         * record: Pushes a snapshot of an event into the buffer
         */
        record: function(type, data) {
            const entry = {
                t: performance.now(),
                type: type,
                payload: JSON.stringify(data),
                state: Imperial.State ? Imperial.State.getCurrent() : 'UNKNOWN'
            };

            _sessionLog.push(entry);

            // Maintain sliding window to save memory
            if (_sessionLog.length > _logLimit) {
                _sessionLog.shift();
            }
        },

        /**
         * export: Bundles the log for transmission to support/devs
         */
        exportLog: function() {
            return {
                metadata: {
                    ua: navigator.userAgent,
                    ts: Date.now(),
                    res: `${window.innerWidth}x${window.innerHeight}`
                },
                events: _sessionLog
            };
        },

        /**
         * triggerEmergencyDump: Automatically sends log on crash
         */
        dump: async function(reason) {
            const logData = this.exportLog();
            logData.reason = reason;

            Imperial.Logger.log("CRITICAL", "Sending Emergency Session Dump...");
            
            if (Imperial.Network) {
                await Imperial.Network.request('/debug/dump', {
                    method: 'POST',
                    body: JSON.stringify(logData)
                });
            }
        }
    };

    Imperial.Recorder = ReplayRecorder;
    Imperial.Kernel.registerModule("core73_replay_recorder");

    // Integration: Listen to everything
    Imperial.Events.on('INPUT_START', (d) => ReplayRecorder.record('INPUT', d));
    Imperial.Events.on('STATE_CHANGE', (s) => ReplayRecorder.record('STATE', s));
    Imperial.Events.on('WS_MESSAGE_RECEIVED', (m) => ReplayRecorder.record('NET', m));
    
    // Auto-dump on unhandled errors
    window.onerror = (msg) => ReplayRecorder.dump(msg);

})(window.Imperial);
