/**
 * 📦 HUOKAING THARA: CORE-32 (ASSET PRELOADER)
 * Feature: Resource Queue & Progress Tracking
 * Version: 4.0.0
 */

(function(Imperial) {
    const _queue = {
        total: 0,
        loaded: 0,
        assets: new Map()
    };

    const AssetLoader = {
        /**
         * enqueue: Add files to the loading list
         */
        enqueue: function(type, key, url) {
            _queue.total++;
            this._load(type, key, url);
        },

        _load: function(type, key, url) {
            let element;

            if (type === 'image') {
                element = new Image();
                element.src = url;
            } else if (type === 'audio') {
                element = new Audio();
                element.src = url;
                element.preload = 'auto';
            }

            element.onload = element.oncanplaythrough = () => {
                _queue.loaded++;
                _queue.assets.set(key, element);
                this._checkProgress();
            };

            element.onerror = () => {
                Imperial.Logger.log("ERROR", `Failed to load asset: ${url}`);
                _queue.loaded++; // Count as "done" to avoid hanging the loader
                this._checkProgress();
            };
        },

        _checkProgress: function() {
            const percent = Math.floor((_queue.loaded / _queue.total) * 100);
            
            Imperial.Events.emit('LOADING_PROGRESS', { 
                percent, 
                loaded: _queue.loaded, 
                total: _queue.total 
            });

            if (_queue.loaded === _queue.total) {
                Imperial.Logger.log("INFO", "All assets deployed to cache.");
                Imperial.Events.emit('LOADING_COMPLETE');
            }
        },

        get: function(key) {
            return _queue.assets.get(key);
        }
    };

    // Attach to Global Namespace
    Imperial.Assets = AssetLoader;

    // Register with Kernel
    Imperial.Kernel.registerModule("core32_asset_preloader");

    // Integration: Listen for progress to update a loading bar
    Imperial.Events.on('LOADING_PROGRESS', (data) => {
        const bar = document.getElementById('imp-loading-bar');
        if (bar) bar.style.width = `${data.percent}%`;
    });

})(window.Imperial);
