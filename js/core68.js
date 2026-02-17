/**
 * ⏳ HUOKAING THARA: CORE-68 (LOADING MANAGER)
 * Feature: Progress Interpolation & Engagement Lore
 * Version: 4.0.0
 */

(function(Imperial) {
    const _lore = [
        "The Emperor's Vault holds over 1,000,000 credits.",
        "Did you know? Swiping down can trigger a Quick Spin.",
        "Legend says the Golden Dragon appears every 100 spins.",
        "Imperial Gold is optimized for 120Hz displays."
    ];

    const LoadingManager = {
        _currentProgress: 0,
        _targetProgress: 0,

        init: function() {
            Imperial.Events.on('ASSET_PROGRESS', (percent) => {
                this._targetProgress = percent;
            });

            // Smoothly interpolate the bar (no jumping)
            this._startHeartbeat();
        },

        _startHeartbeat: function() {
            const step = () => {
                if (this._currentProgress < this._targetProgress) {
                    this._currentProgress += (this._targetProgress - this._currentProgress) * 0.1;
                    this._updateUI();
                }
                if (this._currentProgress < 100) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        },

        _updateUI: function() {
            const bar = document.querySelector('#imp-loader-bar');
            const text = document.querySelector('#imp-loader-text');
            const loreField = document.querySelector('#imp-lore-field');

            if (bar) bar.style.width = `${this._currentProgress}%`;
            if (text) text.textContent = `${Math.floor(this._currentProgress)}%`;
            
            // Cycle lore every 25%
            if (Math.floor(this._currentProgress) % 25 === 0) {
                const index = Math.floor(this._currentProgress / 25) % _lore.length;
                if (loreField) loreField.textContent = _lore[index];
            }
        },

        complete: function() {
            Imperial.Logger.log("UI", "Loading Complete. Transitioning to Empire Plaza.");
            Imperial.Events.emit('LOADING_FINISHED');
        }
    };

    Imperial.Loader = LoadingManager;
    Imperial.Kernel.registerModule("core68_loading_manager");

    // Start listening immediately
    LoadingManager.init();

})(window.Imperial);
