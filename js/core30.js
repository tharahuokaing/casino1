/**
 * 🌍 HUOKAING THARA: CORE-31 (LOCALIZATION)
 * Feature: Multi-Language Support & Currency Formatting
 * Version: 4.0.0
 */

(function(Imperial) {
    const _dictionary = {
        'en': {
            'win': 'WINNER!',
            'loss': 'BET LOST',
            'balance': 'BALANCE',
            'place_bet': 'PLACE YOUR BET',
            'insufficient': 'NOT ENOUGH FUNDS'
        },
        'km': {
            'win': 'អ្នកឈ្នះ!',
            'loss': 'ចាញ់ភ្នាល់',
            'balance': 'សមតុល្យ',
            'place_bet': 'ដាក់ប្រាក់ភ្នាល់',
            'insufficient': 'ខ្វះសមតុល្យ'
        },
        'zh': {
            'win': '赢了！',
            'loss': '输了',
            'balance': '余额',
            'place_bet': '下注',
            'insufficient': '余额不足'
        }
    };

    let _currentLang = 'en';

    const LocaleEngine = {
        /**
         * setLanguage: Switches the active dictionary
         */
        setLanguage: function(langCode) {
            if (_dictionary[langCode]) {
                _currentLang = langCode;
                Imperial.Logger.log("INFO", `Language switched to: ${langCode}`);
                Imperial.Events.emit('LOCALE_CHANGED', { lang: langCode });
                return true;
            }
            return false;
        },

        /**
         * t: The Translation function
         * Usage: Imperial.Locale.t('win') -> "អ្នកឈ្នះ!" (if in 'km')
         */
        t: function(key) {
            return _dictionary[_currentLang][key] || key;
        },

        /**
         * formatCurrency: Regional currency formatting
         */
        formatCurrency: function(amount) {
            const formatters = {
                'en': () => `$${amount.toLocaleString()}`,
                'km': () => `${amount.toLocaleString()} ៛`,
                'zh': () => `¥${amount.toLocaleString()}`
            };
            return (formatters[_currentLang] || formatters['en'])();
        }
    };

    // Attach to Global Namespace
    Imperial.Locale = LocaleEngine;

    // Register with Kernel
    Imperial.Kernel.registerModule("core31_localization_engine");

    // Command Console Integration
    if (Imperial.Console) {
        Imperial.Console.register('set_lang', (code) => {
            return LocaleEngine.setLanguage(code) ? `Language: ${code}` : "Unsupported language.";
        });
    }

})(window.Imperial);
