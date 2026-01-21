/**
 * 👑 HUOKAING THARA - CURRENCY CONVERSION ENGINE v36.0
 * Linked to: Khmer (KHR), Thai (THB), English (USD), Chinese (CNY), Lao (LAK), Singapore (SGD)
 */

(function() {
    // 1. អត្រាប្តូរប្រាក់គោល (Base: 1 USD)
    const exchangeRates = {
        km: { rate: 4100, sym: "៛", name: "KHR" }, // រៀល
        en: { rate: 1, sym: "$", name: "USD" },    // ដុល្លារ
        th: { rate: 35.5, sym: "฿", name: "THB" }, // បាត
        zh: { rate: 7.2, sym: "¥", name: "CNY" },  // យន់
        lo: { rate: 21000, sym: "₭", name: "LAK" },// គីប
        sg: { rate: 1.35, sym: "S$", name: "SGD" } // សិង្ហបុរីដុល្លារ
    };

    // 2. ការកែសម្រួលមុខងារ setLanguage ដើម (v35.0)
    const originalSetLanguage = window.setLanguage;
    window.setLanguage = function(langCode) {
        // ហៅ Logic ភាសាពី v35.0 មកប្រើសិន
        if (typeof originalSetLanguage === 'function') {
            originalSetLanguage(langCode);
        }

        // គណនាសាច់ប្រាក់តាមរូបិយប័ណ្ណថ្មី
        updateCurrencyDisplay(langCode);
    };

    // 3. មុខងារបង្ហាញសាច់ប្រាក់តាមរូបិយប័ណ្ណ
    window.updateCurrencyDisplay = function(langCode) {
        const config = exchangeRates[langCode] || exchangeRates.en;
        const convertedBalance = balance * config.rate;
        
        // បង្ហាញលើ Dashboard
        const balDisplay = document.getElementById('balance-display');
        if (balDisplay) {
            balDisplay.innerHTML = `
                <span style="font-size: 0.8rem; color: var(--gold);">${config.name}</span><br>
                ${config.sym}${convertedBalance.toLocaleString(undefined, {minimumFractionDigits: (langCode === 'en' || langCode === 'sg' ? 2 : 0)})}
            `;
        }

        // ប្រកាសជាសំឡេងអំពីសមតុល្យថ្មី (Optional)
        console.log(`Currency updated to ${config.name} at rate ${config.rate}`);
    };

    // 4. ចាប់ផ្តើមដំណើរការជាមួយភាសាដែលបានរក្សាទុក
    setTimeout(() => {
        const currentLang = localStorage.getItem('imperial_lang') || 'km';
        updateCurrencyDisplay(currentLang);
    }, 1100);

})();