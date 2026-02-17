/**
 * 📦 💰 HUOKAING THARA: CORE-12 (ASSETS & VAULT)
 * Feature: Resource Management + Financial Ledger
 * Version: 4.1.0 (Hybrid Edition)
 */

(function(Imperial) {
    const _cache = { images: {}, audio: {} };
    let _balance = 230000.00; // 💎 YOUR 230,000.00 CREDITS

    const AssetLoader = {
        totalItems: 0,
        loadedItems: 0,

        init: function() {
            // Immediately sync the 230,000 credits to the UI
            this.syncBalance();
            
            // Listen for successful spins to update the vault
            Imperial.Events.on('SPIN_COMPLETE', (data) => {
                if (data && data.winAmount) this.updateBalance(data.winAmount);
            });

            Imperial.Logger.log("SYSTEM", "Core-12: Assets & Vault initialized.");
        },

        syncBalance: function() {
            // Update the HTML display using the Kernel Event Bus
            const display = document.getElementById('credit-count');
            if (display) {
                display.innerText = _balance.toLocaleString('en-US', { minimumFractionDigits: 2 });
            }
            Imperial.Events.emit('BALANCE_UPDATE', _balance);
        },

        updateBalance: function(amount) {
            _balance += parseFloat(amount);
            this.syncBalance();
        },

        /* --- YOUR EXISTING ASSET LOGIC --- */
        load: async function(manifest) {
            this.totalItems = (manifest.images?.length || 0) + (manifest.audio?.length || 0);
            this.loadedItems = 0;
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
                img.onerror = () => resolve(null);
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
            Imperial.Events.emit('ASSET_PROGRESS', { url: url, percent: percent });
        },

        getImg: function(name) { return _cache.images[name]; },
        getSnd: function(name) { return _cache.audio[name]; }
    };

    // Attach and Register
    Imperial.Assets = AssetLoader;
    Imperial.Kernel.registerModule("core12_asset_vault");
    
    // Start the Vault logic
    AssetLoader.init();

})(window.Imperial);
