/**
 * 🎭 HUOKAING THARA: CORE-98 (DYNAMIC LOADER)
 * Feature: Interactive Loading & Lore Delivery
 * Version: 4.0.0
 */

(function(Imperial) {
    const _lore = [
        "The Imperial Vault was built in the Age of Gold.",
        "Legend says the High Command never sleeps.",
        "Tip: Use the Spacebar to spin faster on Desktop!",
        "Did you know? The Plaza rewards the consistent."
    ];

    const Entertainer = {
        _progress: 0,
        _loreInterval: null,

        init: function() {
            this._createStage();
            this._startLoreCycle();
            
            // Listen for real loading progress from Core-32
            Imperial.Events.on('ASSET_PROGRESS', (pct) => this.update(pct));
            Imperial.Events.on('ASSET_COMPLETE', () => this.dismiss());
        },

        _createStage: function() {
            const overlay = document.createElement('div');
            overlay.id = 'imp-loader-stage';
            overlay.innerHTML = `
                <div class="loader-content">
                    <div id="loader-spinner"></div>
                    <p id="loader-lore">${_lore[0]}</p>
                    <div class="progress-bar"><div id="progress-fill"></div></div>
                </div>
            `;
            document.body.appendChild(overlay);
        },

        _startLoreCycle: function() {
            this._loreInterval = setInterval(() => {
                const text = _lore[Math.floor(Math.random() * _lore.length)];
                document.getElementById('loader-lore').innerText = text;
            }, 3500);
        },

        update: function(pct) {
            this._progress = pct;
            const fill = document.getElementById('progress-fill');
            if (fill) fill.style.width = `${pct}%`;
        },

        dismiss: function() {
            clearInterval(this._loreInterval);
            const stage = document.getElementById('imp-loader-stage');
            if (stage) {
                stage.classList.add('fade-out');
                setTimeout(() => stage.remove(), 1000);
            }
            Imperial.Logger.log("UI", "Entertainer takes a bow. Game start.");
        }
    };

    Imperial.Loader = Entertainer;
    Imperial.Kernel.registerModule("core98_dynamic_loader");

    Entertainer.init();

})(window.Imperial);
