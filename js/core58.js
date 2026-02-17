/**
 * 📦 HUOKAING THARA: CORE-58 (BUNDLE OPTIMIZER)
 * Feature: Adaptive Asset Loading & Bandwidth Detection
 * Version: 4.0.0
 */

(function(Imperial) {
    const _config = {
        THRESHOLD_LOW: 1.5, // Mbps
        THRESHOLD_HIGH: 10,  // Mbps
        BASE_PATH: '/assets/bundles/'
    };

    const BundleOptimizer = {
        /**
         * determineQuality: Analyzes network conditions
         */
        determineQuality: function() {
            // Use Network Information API if available
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            
            if (conn) {
                const speed = conn.downlink; // Megabits per second
                if (speed < _config.THRESHOLD_LOW) return 'low';
                if (speed > _config.THRESHOLD_HIGH) return 'ultra';
            }
            return 'medium';
        },

        /**
         * getOptimizedPath: Re-routes asset requests to the correct quality folder
         */
        getOptimizedPath: function(assetName) {
            const quality = this.determineQuality();
            Imperial.Logger.log("SYSTEM", `Optimizing for ${quality} bandwidth.`);
            
            return `${_config.BASE_PATH}${quality}/${assetName}`;
        },

        /**
         * prefetchNext: Strategically loads assets for the "next" likely game
         */
        prefetchNext: function(gameId) {
            const quality = this.determineQuality();
            const nextAssets = [`${gameId}_bg.webp`, `${gameId}_sprites.json`];
            
            nextAssets.forEach(file => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = `${_config.BASE_PATH}${quality}/${file}`;
                document.head.appendChild(link);
            });
        }
    };

    Imperial.Optimizer = BundleOptimizer;
    Imperial.Kernel.registerModule("core58_bundle_optimizer");

    // Integration: Intercept Asset Preloader (Core 32)
    Imperial.Events.on('ASSET_REQUEST', (data) => {
        data.url = BundleOptimizer.getOptimizedPath(data.filename);
    });

})(window.Imperial);
