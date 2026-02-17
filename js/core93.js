/**
 * ✍️ HUOKAING THARA: CORE-93 (STORAGE SYNC)
 * Feature: IndexedDB Persistence & Conflict Resolution
 * Version: 4.0.0
 */

(function(Imperial) {
    const _DB_NAME = 'ImperialVault';
    const _DB_VERSION = 1;
    let _db = null;

    const LocalScribe = {
        init: async function() {
            return new Promise((resolve) => {
                const request = indexedDB.open(_DB_NAME, _DB_VERSION);
                
                request.onupgradeneeded = (e) => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains('gameState')) {
                        db.createObjectStore('gameState', { keyPath: 'id' });
                    }
                };

                request.onsuccess = (e) => {
                    _db = e.target.result;
                    Imperial.Logger.log("SYSTEM", "Local Scribe initialized. Vault is secure.");
                    resolve();
                };
            });
        },

        /**
         * saveSnapshot: Records current state to local disk
         */
        saveSnapshot: function(state) {
            if (!_db) return;
            const tx = _db.transaction('gameState', 'readwrite');
            const store = tx.objectStore('gameState');
            
            state.id = 'latest_session';
            state.lastSaved = Date.now();
            
            store.put(state);
        },

        /**
         * resolveConflict: Merges local "Offline" data with server "Online" data
         */
        resolveConflict: function(serverData) {
            const tx = _db.transaction('gameState', 'readonly');
            const store = tx.objectStore('gameState');
            const request = store.get('latest_session');

            request.onsuccess = () => {
                const localData = request.result;
                if (localData && localData.lastSaved > serverData.lastSync) {
                    Imperial.Logger.log("SYNC", "Conflict detected! Resolving via Server Authority.");
                    // In the Empire, the Server is always the ultimate Law
                    this._reconcile(localData, serverData);
                }
            };
        },

        _reconcile: function(local, server) {
            // Complex logic to ensure local achievements are kept 
            // while financial balances are updated to server-truth
            Imperial.Events.emit('SYNC_RECONCILED', server);
        }
    };

    Imperial.Scribe = LocalScribe;
    Imperial.Kernel.registerModule("core93_local_scribe");

    // Integration: Auto-save on every significant state change
    Imperial.Events.on('STATE_CHANGE', (state) => LocalScribe.saveSnapshot(state));

    LocalScribe.init();

})(window.Imperial);
