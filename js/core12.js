/**
 * 📦 HUOKAING THARA: CORE-12 (ASSET LOADER)
 * Feature: Preloading, Caching & Resource Management
 * Version: 4.0.0
 */

(function(Imperial) {
    const _cache = {
        images: {},
        audio: {}
    };

    const AssetLoader = {
        totalItems: 0,
        loadedItems: 0,

        /**
         * queue: Add items to the loading list
         */
        load: async function(manifest) {
            this.totalItems = (manifest.images?.length || 0) + (manifest.audio?.length || 0);
            this.loadedItems = 0;

            console.log(`[ASSETS]: Starting load of ${this.totalItems} items...`);

            const imagePromises = (manifest.images || []).map(src => this._loadImage(src));
            const audioPromises = (manifest.audio || []).map(src => this._loadAudio(src));

            return Promise.all([...imagePromises, ...audioPromises]).then(() => {
                Imperial.Events.emit('ASSETS_READY', _cache);
                Imperial.Logger.log("INFO", "All assets cached and ready.");
            });
        },

        _loadImage: function(src) {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    const name = src.split('/').pop().split('.')[0];
                    _cache.images[name] = img;
                    this._onProgress(src);
                    resolve(img);
                };
                img.onerror = () => {
                    console.error(`[ASSETS]: Failed to load image: ${src}`);
                    resolve(null);
                };
            });
        },

        _loadAudio: function(src) {
            return new Promise((resolve) => {
                const audio = new Audio();
                audio.src = src;
                audio.oncanplaythrough = () => {
                    const name = src.split('/').pop().split('.')[0];
                    _cache.audio[name] = audio;
                    this._onProgress(src);
                    resolve(audio);
                };
                audio.onerror = () => resolve(null);
            });
        },

        _onProgress: function(url) {
            this.loadedItems++;
            const percent = Math.floor((this.loadedItems / this.totalItems) * 100);
            
            Imperial.Events.emit('ASSET_PROGRESS', {
                url: url,
                percent: percent
            });
        },

        getImg: function(name) { return _cache.images[name]; },
        getSnd: function(name) { return _cache.audio[name]; }
    };

    // Attach to Global Namespace
    Imperial.Assets = AssetLoader;

    // Register with Kernel
    Imperial.Kernel.registerModule("core12_asset_loader");

})(window.Imperial);
