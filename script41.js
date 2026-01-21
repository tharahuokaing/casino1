/**
 * 👑 HUOKAING THARA - THE GRAND HUB v40.0
 * Feature: 10-Feature Dashboard Navigation
 */

(function() {
    // 1. បង្កើត CSS សម្រាប់ Dashboard Grid
    const style = document.createElement('style');
    style.textContent = `
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 15px; padding: 20px;
            background: rgba(0,0,0,0.5); border-radius: 15px;
            margin-top: 20px;
        }
        .feature-item {
            background: var(--card-bg); border: 1px solid var(--border);
            border-radius: 12px; padding: 15px; text-align: center;
            cursor: pointer; transition: 0.3s;
        }
        .feature-item:hover {
            border-color: var(--gold); transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(234, 179, 8, 0.3);
        }
        .feature-icon { font-size: 2rem; margin-bottom: 8px; display: block; }
        .feature-name { font-size: 0.75rem; font-weight: bold; color: var(--gold); }
    `;
    document.head.appendChild(style);

    // 2. មូលដ្ឋានទិន្នន័យនៃមុខងារទាំង ១០
    const features = [
        { name: "LIVE CASINO", icon: "🃏", action: "alert('Entering Live Arena...')" },
        { name: "VAULT", icon: "🗝️", action: "openSecretVault()" },
        { name: "AI GUARDIAN", icon: "🛡️", action: "handleGuardianUpload()" },
        { name: "AUTO-BET", icon: "🤖", action: "toggleAutoBet()" },
        { name: "ANALYTICS", icon: "📈", action: "renderPortfolio()" },
        { name: "SECURITY", icon: "🔒", action: "alert('System Secure.')" },
        { name: "CURRENCY", icon: "💱", action: "alert('Currency Menu')" },
        { name: "THEME", icon: "🌓", action: "toggleTheme()" },
        { name: "LANGUAGE", icon: "🌐", action: "alert('Change Language')" },
        { name: "JACKPOT", icon: "💰", action: "alert('Jackpot Status')" }
    ];

    // 3. មុខងារត្រឡប់ទៅ Home Dashboard
    window.goHome = function() {
        const stage = document.getElementById('game-stage');
        stage.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <h2 style="color:var(--gold); letter-spacing: 2px;">THE EMPIRE OF SOMA'S LEGACY</h2>
                <div class="feature-grid">
                    ${features.map(f => `
                        <div class="feature-item" onclick="${f.action}">
                            <span class="feature-icon">${f.icon}</span>
                            <span class="feature-name">${f.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        speak("ត្រឡប់មកកាន់បញ្ជាការដ្ឋានកណ្តាល។");
    };

    // 4. កែសម្រួលប៊ូតុង Home នៅក្នុង Sidebar
    setTimeout(() => {
        const homeBtn = document.querySelector('.nav-item');
        if (homeBtn) {
            homeBtn.setAttribute('onclick', 'goHome()');
        }
    }, 2000);
})();
