/**
 * 🔄 HUOKAING THARA: CORE-96 (CONFIG HOT-SWAPPER)
 * Feature: Real-time Variable Mutation & Live-Ops
 * Version: 4.0.0
 */

(function(Imperial) {
    let _activeConfig = {};

    const ConfigDiplomat = {
        /**
         * patch: Merges new server settings into the live environment
         */
        patch: function(newSettings) {
            Imperial.Logger.log("SYSTEM", "Receiving Imperial Decree: Hot-swapping config...");

            // 1. Deep merge new settings into the active state
            const oldConfig = { ..._activeConfig };
            _activeConfig = this._deepMerge(_activeConfig, newSettings);

            // 2. Identify what changed and notify specific cores
            this._notifySubsystems(oldConfig, newSettings);

            Imperial.Events.emit('CONFIG_UPDATED', _activeConfig);
        },

        _notifySubsystems: function(oldC, newC) {
            // Did the spin speed change?
            if (newC.engine?.spinDuration !== oldC.engine?.spinDuration) {
                Imperial.Events.emit('REEL_SPEED_ADJUST', newC.engine.spinDuration);
            }

            // Is there a new Global Multiplier? (Happy Hour)
            if (newC.economy?.multiplier !== oldC.economy?.multiplier) {
                Imperial.UI.showAnnouncement(`HAPPY HOUR! ${newC.economy.multiplier}x WINS!`);
            }
        },

        _deepMerge: function(target, source) {
            for (const key in source) {
                if (source[key] instanceof Object && key in target) {
                    Object.assign(source[key], this._deepMerge(target[key], source[key]));
                }
            }
            Object.assign(target || {}, source);
            return target;
        },

        get: (path) => path.split('.').reduce((obj, key) => obj?.[key], _activeConfig)
    };

    Imperial.Config = ConfigDiplomat;
    Imperial.Kernel.registerModule("core96_config_hotswap");

    // Integration: Listen for Push Config from Socket (Core-17)
    Imperial.Events.on('WS_CONFIG_PUSH', (data) => ConfigDiplomat.patch(data));

})(window.Imperial);
