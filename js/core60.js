/**
 * 🌍 HUOKAING THARA: CORE-60 (i18n BRIDGE)
 * Feature: Multi-Language Support & Currency Formatting
 * Version: 4.0.0
 */

(function(Imperial) {
    const _dictionary = new Map();
    let _currentLang = 'en';
    let _currencyCode = 'USD';

    const LocalizationBridge = {
        /**
         * loadLanguage: Ingests a JSON translation bundle
         */
        loadLanguage: async function(langCode) {
            try {
                const bundle = await Imperial.Network.request(`/locales/${langCode}.json`);
                _dictionary.set(langCode, bundle);
                _currentLang = langCode;
                
                // Toggle RTL support for specific languages
                document.dir = ['ar', 'he'].includes(langCode) ? 'rtl' : 'ltr';
                
                Imperial.Events.emit('LOCALE_CHANGED', { lang: langCode });
                Imperial.Logger.log("SYSTEM", `Imperial Language set to: ${langCode}`);
            } catch (err) {
                Imperial.Logger.log("ERROR", `Failed to load language: ${langCode}`);
            }
        },

        /**
         * t: The "Translate" function. Handles keys and variables.
         * Usage: Imperial.i18n.t('GREETING', { name: 'Xenon' })
         */
        t: function(key, params = {}) {
            const langData = _dictionary.get(_currentLang) || {};
            let text = langData[key] || key;

            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(`{{${k}}}`, v);
            });

            return text;
        },

        /**
         * formatCurrency: Formats numbers based on local standards
         */
        formatCurrency: function(amount) {
            return new Intl.NumberFormat(_currentLang, {
                style: 'currency',
                currency: _currencyCode
            }).format(amount);
        },

        setCurrency: (code) => { _currencyCode = code; }
    };

    Imperial.i18n = LocalizationBridge;
    Imperial.Kernel.registerModule("core60_i18n_bridge");

    // Integration: Listen for user profile updates
    Imperial.Events.on('USER_PROFILE_LOADED', (data) => {
        if (data.lang) LocalizationBridge.loadLanguage(data.lang);
        if (data.currency) LocalizationBridge.setCurrency(data.currency);
    });

})(window.Imperial);
