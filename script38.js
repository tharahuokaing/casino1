/**
 * 👑 HUOKAING THARA - MULTI-LANGUAGE ENGINE v35.0
 * Languages: Khmer, Thai, English, Chinese, Lao, Singapore Mandarin
 */

(function() {
    // 1. មូលដ្ឋានទិន្នន័យភាសា (Translation Dictionary)
    const translations = {
        km: { title: "អាណាចក្រ ហួខៃ ធារ៉ា", treasury: "មហានិធិ", player: "អ្នកលេង", banker: "មេបៀ", auto: "ស្វ័យប្រវត្តិ", vault: "បន្ទប់សម្ងាត់", theme: "ប្តូរពន្លឺ", welcome: "សូមស្វាគមន៍ព្រះអង្គអធិរាជ" },
        en: { title: "HUOKAING THARA EMPIRE", treasury: "TREASURY", player: "PLAYER", banker: "BANKER", auto: "AUTO-BET", vault: "VAULT", theme: "THEME", welcome: "Welcome, Your Majesty" },
        th: { title: "อาณาจักร หัวไข่ ธารา", treasury: "คลังสมบัติ", player: "ผู้เล่น", banker: "เจ้ามือ", auto: "บอทพนัน", vault: "ห้องลับ", theme: "เปลี่ยนโหมด", welcome: "ยินดีต้อนรับองค์จักรพรรดิ" },
        zh: { title: "火凯泰拉帝国", treasury: "国库", player: "闲家", banker: "庄家", auto: "自动投注", vault: "保险库", theme: "切换主题", welcome: "欢迎，陛下" },
        lo: { title: "ອານາຈັກ ຫົວໄຂ່ ທາຣາ", treasury: "ຄັງສົມບັດ", player: "ຜູ້ຫຼິ້ນ", banker: "ເຈົ້າມື", auto: "ບັອດພະນັນ", vault: "ຫ້ອງລັບ", theme: "ປ່ຽນໂໝດ", welcome: "ຍິນດີຕ້ອນຮັບອົງຈັກກະພັດ" },
        sg: { title: "HUOKAING THARA (SG)", treasury: "WALLET", player: "PLAYER", banker: "BANKER", auto: "SMART-BET", vault: "VAULT", theme: "MODE", welcome: "Welcome, Boss" }
    };

    // 2. CSS សម្រាប់ Language Selector លើ Header
    const style = document.createElement('style');
    style.textContent = `
        .lang-container { display: flex; gap: 8px; margin-left: 15px; }
        .lang-flag { 
            width: 25px; height: 18px; cursor: pointer; border-radius: 2px; 
            border: 1px solid rgba(255,255,255,0.2); transition: 0.3s;
        }
        .lang-flag:hover { transform: scale(1.2); border-color: var(--gold); }
        .lang-flag.active { border: 2px solid var(--gold); box-shadow: 0 0 10px var(--gold); }
    `;
    document.head.appendChild(style);

    // 3. មុខងារប្តូរភាសា
    window.setLanguage = function(langCode) {
        const t = translations[langCode];
        if(!t) return;

        // ប្តូរអត្ថបទលើ UI
        document.querySelector('.header-panel div:first-child').innerText = `🏛️ ${t.title}`;
        document.querySelector('.side-panel h3').innerText = `💰 ${t.treasury}`;
        document.querySelectorAll('.nav-text')[0].innerText = "HOME"; // Base on index
        document.querySelectorAll('.nav-text')[1].innerText = t.vault;
        document.querySelectorAll('.nav-text')[2].innerText = t.auto;
        document.querySelector('.theme-btn').innerText = `🌓 ${t.theme}`;
        
        // ប្តូរភាសាសំឡេងអ្នកចែកបៀ
        const voiceLangs = { km: 'km-KH', en: 'en-US', th: 'th-TH', zh: 'zh-CN', lo: 'lo-LA', sg: 'zh-SG' };
        window.currentVoiceLang = voiceLangs[langCode];
        
        // កត់ចំណាំភាសាដែលបានជ្រើសរើស
        localStorage.setItem('imperial_lang', langCode);
        
        // Highlight ទង់ជាតិ
        document.querySelectorAll('.lang-flag').forEach(el => el.classList.remove('active'));
        document.getElementById(`flag-${langCode}`).classList.add('active');
        
        speak(t.welcome);
    };

    // 4. បញ្ចូល Language Selector ទៅក្នុង Header
    setTimeout(() => {
        const header = document.querySelector('.header-panel > div:last-child');
        const langDiv = document.createElement('div');
        langDiv.className = 'lang-container';
        langDiv.innerHTML = `
            <img src="https://flagcdn.com/w40/kh.png" class="lang-flag" id="flag-km" onclick="setLanguage('km')" title="Khmer">
            <img src="https://flagcdn.com/w40/th.png" class="lang-flag" id="flag-th" onclick="setLanguage('th')" title="Thai">
            <img src="https://flagcdn.com/w40/us.png" class="lang-flag" id="flag-en" onclick="setLanguage('en')" title="English">
            <img src="https://flagcdn.com/w40/cn.png" class="lang-flag" id="flag-zh" onclick="setLanguage('zh')" title="Chinese">
            <img src="https://flagcdn.com/w40/la.png" class="lang-flag" id="flag-lo" onclick="setLanguage('lo')" title="Lao">
            <img src="https://flagcdn.com/w40/sg.png" class="lang-flag" id="flag-sg" onclick="setLanguage('sg')" title="SG Mandarin">
        `;
        header.prepend(langDiv);
        
        // ចងចាំភាសាចុងក្រោយ
        const savedLang = localStorage.getItem('imperial_lang') || 'km';
        setLanguage(savedLang);
    }, 1000);

})();