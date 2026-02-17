/**
 * 📦 💰 HUOKAING THARA: CORE-12 (ASSETS & VAULT)
 * Feature: Resource Management + 230,000 Credit Ledger
 * Version: 4.1.0
 */

(function(Imperial) {
    const _cache = { images: {}, audio: {} };
    let _balance = 230000.00; // 💎 Initialized with 230,000.00

    const AssetVault = {
        init: function() {
            // Update the UI immediately so it doesn't show 0.00
            this.syncBalance();
            
            // Listen for Spin Wins from Core-01
            Imperial.Events.on('SPIN_COMPLETE', (data) => {
                if (data && data.winAmount) this.addFunds(data.winAmount);
            });

            Imperial.Logger.log("SYSTEM", "Core-12 Vault Live. Balance: 230,000");
        },

        syncBalance: function() {
            const display = document.getElementById('credit-count');
            if (display) {
                // Formats as 230,000.00 for the holographic display
                display.innerText = _balance.toLocaleString('en-US', { minimumFractionDigits: 2 });
            }
            // Broadcast to other cores
            Imperial.Events.emit('BALANCE_UPDATE', _balance);
        },

        addFunds: function(amount) {
            _balance += parseFloat(amount);
            this.syncBalance();
        },

        /* ASSET LOADING LOGIC */
        load: async function(manifest) {
            this.totalItems = (manifest.images?.length || 0) + (manifest.audio?.length || 0);
            this.loadedItems = 0;
            const imagePromises = (manifest.images || []).map(src => this._loadImage(src));
            const audioPromises = (manifest.audio || []).map(src => this._loadAudio(src));
            return Promise.all([...imagePromises, ...audioPromises]).then(() => {
                Imperial.Events.emit('ASSETS_READY', _cache);
            });
        },
        _loadImage: function(src) { /* ... existing logic ... */ },
        _loadAudio: function(src) { /* ... existing logic ... */ }
    };

    Imperial.Assets = AssetVault;
    Imperial.Kernel.registerModule("core12_asset_vault");
    AssetVault.init();

})(window.Imperial);
