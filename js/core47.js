/**
 * 🧹 HUOKAING THARA: CORE-47 (GARBAGE COLLECTOR)
 * Feature: Memory Leak Prevention & Cache Pruning
 * Version: 4.0.0
 */

(function(Imperial) {
    const _usageMap = new Map();
    const _IDLE_THRESHOLD = 300000; // 5 minutes in ms

    const GarbageCollector = {
        /**
         * touch: Updates the last-used timestamp for an asset
         */
        touch: function(key) {
            _usageMap.set(key, Date.now());
        },

        /**
         * collect: Scans the asset cache and removes stale data
         */
        runSweep: function() {
            const now = Date.now();
            let purgedCount = 0;

            Imperial.Assets.getCacheKeys().forEach(key => {
                const lastUsed = _usageMap.get(key) || 0;
                
                // If asset hasn't been used in 5 minutes, delete it
                if (now - lastUsed > _IDLE_THRESHOLD) {
                    this._purge(key);
                    purgedCount++;
                }
            });

            if (purgedCount > 0) {
                Imperial.Logger.log("SYSTEM", `GC Sweep: Cleared ${purgedCount} stale assets.`);
            }
        },

        _purge: function(key) {
            const asset = Imperial.Assets.get(key);
            if (asset) {
                // Remove reference to allow browser JS engine to free RAM
                asset.src = ""; 
                Imperial.Assets.remove(key);
                _usageMap.delete(key);
            }
        },

        /**
         * forceClear: Emergency wipe if Core-33 detects critical memory
         */
        emergencyWipe: function() {
            Imperial.Logger.log("CRITICAL", "Memory Low! Forcing emergency cache purge.");
            this.runSweep(); 
        }
    };

    Imperial.GC = GarbageCollector;
    Imperial.Kernel.registerModule("core47_garbage_collector");

    // Integration: Hook into the Performance Monitor (Core 33)
    Imperial.Events.on('PERFORMANCE_CRITICAL', () => {
        GarbageCollector.emergencyWipe();
    });

    // Run a routine sweep every 60 seconds
    setInterval(() => GarbageCollector.runSweep(), 60000);

})(window.Imperial);
