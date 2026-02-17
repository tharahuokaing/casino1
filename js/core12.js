/**
 * 📦 💰 HUOKAING THARA: CORE-12 (ASSETS & VAULT)
 * Feature: Preloading, Caching & 230,000 Credit Ledger
 * Version: 4.1.0 (Hybrid Revision)
 */

(function(Imperial) {
    const _cache = {
        images: {},
        audio: {}
    };

    // 💎 Imperial Credit Ledger: Initialized at 230,000
    let _balance = 230000.00;

    const AssetVault = {
        totalItems: 0,
        loadedItems: 0,

        /**
         * init: Bootstraps the Vault and UI Display
         */
        init: function() {
            // Push the 230,000 credits to the HUD immediately
            this.syncBalance();

            // Listen for Spin Results from Core-01 to update funds
            Imperial.Events.on('SPIN_COMPLETE', (data) => {
                if (data && data.winAmount) {
                    this.addFunds(data.winAmount);
                }
            });

            Imperial.Logger.log("SYSTEM", "Core-12: Asset Vault Active. Balance: 230,000.00");
        },

        /**
         * syncBalance: Updates the HTML element and broadcasts state
         */
        syncBalance: function() {
            const display = document.getElementById('credit-count');
            if (display) {
                // Formats number with commas: 230,000.00
                display.innerText = _balance.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                });
            }
            // Broadcast update to other registered modules
            Imperial.Events.emit('BALANCE_UPDATE', _balance);
        },

        /**
         * addFunds: Increases the vault balance
         */
        addFunds: function(amount) {
            _balance += parseFloat(amount);
            this.syncBalance();
            Imperial.Logger.log("VAULT", `Credits added: ${amount}. New Total: ${_balance}`);
        },

        /**
         * load: Existing Asset Loader Logic
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
    Imperial.Assets = AssetVault;

    // Register with Kernel
    Imperial.Kernel.registerModule("core12_asset_vault");

    // Initialize the Vault state
    AssetVault.init();

})(window.Imperial);
