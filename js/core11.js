/**
 * 🌐 HUOKAING THARA: CORE-11 (LOCALIZATION)
 * Feature: Multi-language Support (Khmer/English)
 * Version: 4.0.0
 */

(function(Imperial) {
    let _currentLang = "kh"; // Default to Khmer

    const _dictionary = {
        "en": {
            "welcome": "Welcome, Commander",
            "balance": "Balance",
            "bet": "Place Bet",
            "win": "YOU WIN!",
            "loss": "YOU LOSE",
            "insufficient": "Insufficient Funds",
            "rank_up": "RANK INCREASED!"
        },
        "kh": {
            "welcome": "សូមស្វាគមន៍ មេបញ្ជាការ",
            "balance": "សមតុល្យ",
            "bet": "ភ្នាល់",
            "win": "អ្នកឈ្នះ!",
            "loss": "អ្នកចាញ់",
            "insufficient": "ថវិកាមិនគ្រប់គ្រាន់",
            "rank_up": "ឡើងចំណាត់ថ្នាក់!"
        }
    };

    const LocaleEngine = {
        /**
         * setLanguage: Switches the active dictionary
         */
        setLanguage: function(langCode) {
            if (_dictionary[langCode]) {
                _currentLang = langCode;
                Imperial.Events.emit('LANG_CHANGED', langCode);
                Imperial.Logger.log("INFO", `Language switched to: ${langCode.toUpperCase()}`);
                return true;
            }
            return false;
        },

        /**
         * translate: Translates a key based on current language
         * @param {string} key - The dictionary key
         */
        t: function(key) {
            return (_dictionary[_currentLang] && _dictionary[_currentLang][key]) 
                ? _dictionary[_currentLang][key] 
                : key; // Return key itself if translation is missing
        },

        getCurrentLang: function() {
            return _currentLang;
        }
    };

    // Attach to Global Namespace
    Imperial.Locale = LocaleEngine;

    // Register with Kernel
    Imperial.Kernel.registerModule("core11_localization");

    // Integration with UI Bridge: Auto-translate elements with 'data-i18n' attribute
    Imperial.Events.on('LANG_CHANGED', () => {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerText = LocaleEngine.t(key);
        });
    });

})(window.Imperial);
