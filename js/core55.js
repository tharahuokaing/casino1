/**
 * 🎨 HUOKAING THARA: CORE-55 (THEME LOADER)
 * Feature: Real-time CSS Variable Injection & Asset Skinning
 * Version: 4.0.0
 */

(function(Imperial) {
    const _themes = {
        imperial_gold: {
            '--primary': '#d4af37',
            '--bg-main': '#1a1a1a',
            '--text': '#ffffff',
            '--accent': '#ffcc00',
            'suffix': '_gold'
        },
        neon_night: {
            '--primary': '#00ffcc',
            '--bg-main': '#0a0b1e',
            '--text': '#e0e0e0',
            '--accent': '#ff00ff',
            'suffix': '_neon'
        }
    };

    const ThemeLoader = {
        /**
         * apply: Changes the visual identity of the empire
         */
        apply: function(themeId) {
            const theme = _themes[themeId];
            if (!theme) return Imperial.Logger.log("ERROR", "Theme not found.");

            // 1. Inject CSS Variables into Root
            const root = document.documentElement;
            Object.entries(theme).forEach(([key, value]) => {
                if (key.startsWith('--')) root.style.setProperty(key, value);
            });

            // 2. Update Global Asset Suffix
            // This tells Core-32 to look for 'icon_gold.png' instead of 'icon.png'
            Imperial.Assets.setSkinSuffix(theme.suffix);

            // 3. Notify the Engine
            Imperial.Events.emit('THEME_CHANGED', { id: themeId, colors: theme });
            Imperial.Logger.log("UI", `Empire Theme updated to: ${themeId}`);
            
            // 4. Persistence (Core 09)
            Imperial.Storage.save('IMP_USER_THEME', themeId);
        },

        getCurrentTheme: () => Imperial.Storage.get('IMP_USER_THEME') || 'imperial_gold'
    };

    Imperial.Themes = ThemeLoader;
    Imperial.Kernel.registerModule("core55_theme_loader");

    // Initialize with stored preference
    window.addEventListener('load', () => ThemeLoader.apply(ThemeLoader.getCurrentTheme()));

})(window.Imperial);
