/**
 * ✍️ HUOKAING THARA: CORE-71 (TYPOGRAPHY)
 * Feature: Crisp Font Rendering & Dynamic Text Effects
 * Version: 4.0.0
 */

(function(Imperial) {
    const _loadedFonts = new Set();
    const _textEffects = {
        GOLD_GLINT: 'linear-gradient(to bottom, #cf9d30 0%, #fff 50%, #cf9d30 100%)',
        DANGER_GLOW: '0 0 10px #ff0000'
    };

    const FontEngine = {
        /**
         * load: Injects custom Imperial fonts into the DOM
         */
        load: async function(fontFamily, url) {
            if (_loadedFonts.has(fontFamily)) return;

            const font = new FontFace(fontFamily, `url(${url})`);
            try {
                const loadedFace = await font.load();
                document.fonts.add(loadedFace);
                _loadedFonts.add(fontFamily);
                Imperial.Logger.log("ASSET", `Imperial Font [${fontFamily}] active.`);
            } catch (err) {
                Imperial.Logger.log("ERROR", `Failed to load font: ${fontFamily}`);
            }
        },

        /**
         * styleJackpot: Applies high-end CSS/Canvas styling to winning numbers
         */
        applyEffect: function(element, effectType) {
            if (effectType === 'GOLD') {
                element.style.backgroundImage = _textEffects.GOLD_GLINT;
                element.style.webkitBackgroundClip = 'text';
                element.style.webkitTextFillColor = 'transparent';
                element.style.filter = 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))';
            }
        },

        /**
         * getSDFConfig: Returns parameters for WebGL-based font rendering
         */
        getSDFConfig: () => ({
            smoothing: 0.1,
            outline: 0.4,
            thickness: 0.5
        })
    };

    Imperial.Typography = FontEngine;
    Imperial.Kernel.registerModule("core71_typography_engine");

    // Integration: Listen for localization shifts
    Imperial.Events.on('LOCALE_CHANGED', (data) => {
        if (data.lang === 'zh') FontEngine.load('NotoSansSC', '/fonts/chinese_reg.woff2');
        if (data.lang === 'ar') FontEngine.load('Amiri', '/fonts/arabic_reg.woff2');
    });

})(window.Imperial);
