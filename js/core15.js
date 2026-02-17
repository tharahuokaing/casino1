/**
 * 🎨 HUOKAING THARA: CORE-15 (THEME ENGINE)
 * Feature: Dynamic CSS Variable Swapping & Branding
 * Version: 4.0.0
 */

(function(Imperial) {
    const _themes = {
        "imperial_dark": {
            "--primary": "#5C6AC4",
            "--secondary": "#1a1a1a",
            "--accent": "#ffd700",
            "--bg-main": "#0a0a0a",
            "--text-main": "#ffffff",
            "--surface": "#151515",
            "--border": "#333333"
        },
        "royal_gold": {
            "--primary": "#d4af37",
            "--secondary": "#2c1e10",
            "--accent": "#ffffff",
            "--bg-main": "#1a120b",
            "--text-main": "#f4e4bc",
            "--surface": "#3d2b1f",
            "--border": "#d4af37"
        },
        "cyber_neon": {
            "--primary": "#00ff41",
            "--secondary": "#0d0208",
            "--accent": "#00ffff",
            "--bg-main": "#000000",
            "--text-main": "#00ff41",
            "--surface": "#0a0a0a",
            "--border": "#00ff41"
        }
    };

    const ThemeEngine = {
        currentTheme: "imperial_dark",

        /**
         * apply: Injects theme variables into the document root
         */
        apply: function(themeName) {
            const theme = _themes[themeName];
            if (!theme) return false;

            const root = document.documentElement;
            Object.keys(theme).forEach(key => {
                root.style.setProperty(key, theme[key]);
            });

            this.currentTheme = themeName;
            localStorage.setItem("IMPERIAL_THEME", themeName);
            
            Imperial.Events.emit('THEME_CHANGED', themeName);
            Imperial.Logger.log("INFO", `Visual Identity switched to: ${themeName}`);
            return true;
        },

        /**
         * init: Recalls last saved theme or defaults to imperial_dark
         */
        init: function() {
            const saved = localStorage.getItem("IMPERIAL_THEME") || "imperial_dark";
            this.apply(saved);
            Imperial.Kernel.registerModule("core15_theme_engine_active");
        },

        getAvailableThemes: function() {
            return Object.keys(_themes);
        }
    };

    // Attach to Global Namespace
    Imperial.Theme = ThemeEngine;

    // Register with Kernel
    Imperial.Kernel.registerModule("core15_theme_engine");

    // Auto-init on load
    window.addEventListener('load', () => ThemeEngine.init());

})(window.Imperial);
