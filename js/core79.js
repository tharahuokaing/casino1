/**
 * 🎭 HUOKAING THARA: CORE-79 (THEME ENGINE)
 * Feature: Hot-Swappable Skins & Dynamic CSS Theming
 * Version: 4.0.0
 */

(function(Imperial) {
    const _themes = {
        DEFAULT: { primary: '#d4af37', secondary: '#1a1a1a', font: 'ImperialGold' },
        NEON: { primary: '#00f2ff', secondary: '#0d001a', font: 'CyberNeon' },
        NOIR: { primary: '#ffffff', secondary: '#000000', font: 'ClassicSerif' }
    };

    const ThemeEngine = {
        _currentTheme: 'DEFAULT',

        /**
         * apply: Changes the entire look and feel of the empire
         */
        apply: function(themeId) {
            const theme = _themes[themeId];
            if (!theme) return Imperial.Logger.log("WARN", "Theme not found.");

            this._currentTheme = themeId;

            // 1. Update CSS Custom Properties (Theming the UI)
            const root = document.documentElement;
            root.style.setProperty('--imp-primary', theme.primary);
            root.style.setProperty('--imp-bg', theme.secondary);
            root.style.setProperty('--imp-font-main', theme.font);

            // 2. Signal the Canvas Engine (Core 21) to swap sprite pointers
            Imperial.Events.emit('THEME_SWAP_REQUESTED', { 
                themeId, 
                colors: theme 
            });

            // 3. Update Audio Mood (Core 13)
            if (Imperial.Audio) {
                Imperial.Audio.setMood(themeId);
            }

            Imperial.Logger.log("UI", `Empire skin updated to: ${themeId}`);
        },

        getCurrent: () => _themes[this._currentTheme],
        
        /**
         * getThemedAsset: Returns the path for an asset based on the current theme
         */
        getThemedAsset: function(originalPath) {
            // Example: "icons/spin.png" becomes "themes/neon/icons/spin.png"
            if (this._currentTheme === 'DEFAULT') return originalPath;
            return `themes/${this._currentTheme.toLowerCase()}/${originalPath}`;
        }
    };

    Imperial.Themes = ThemeEngine;
    Imperial.Kernel.registerModule("core79_theme_engine");

    // Integration: Listen for VIP status changes
    Imperial.Events.on('PLAYER_STATUS_UPGRADE', (data) => {
        if (data.level === 'VIP') ThemeEngine.apply('NEON');
    });

})(window.Imperial);
