/**
 * 👑 HUOKAING THARA - GLOBAL UI ENHANCER v33.0
 * Feature: Sidebar Nav, Floating Jackpot, & Smooth Transitions
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់សោភ័ណភាពកម្រិតពិភពលោក
    const style = document.createElement('style');
    style.textContent = `
        /* Sidebar Navigation */
        .side-nav {
            position: fixed; left: 0; top: 80px; width: 70px; height: calc(100% - 80px);
            background: rgba(0,0,0,0.8); border-right: 1px solid var(--gold);
            display: flex; flex-direction: column; align-items: center; padding-top: 20px;
            gap: 25px; z-index: 999; transition: 0.3s;
        }
        .side-nav:hover { width: 200px; }
        .nav-item { 
            color: #64748b; cursor: pointer; display: flex; align-items: center; 
            gap: 15px; width: 100%; padding-left: 25px; transition: 0.3s;
        }
        .nav-item:hover { color: var(--gold); }
        .nav-text { display: none; font-size: 0.9rem; font-weight: bold; }
        .side-nav:hover .nav-text { display: block; }

        /* Floating Progressive Jackpot */
        .jackpot-banner {
            position: fixed; top: 90px; right: 20px;
            background: linear-gradient(90deg, #1e293b, #b45309);
            padding: 10px 20px; border-radius: 50px; border: 2px solid var(--gold);
            box-shadow: 0 0 20px rgba(234, 179, 8, 0.5); z-index: 1000;
            display: flex; flex-direction: column; align-items: center;
        }
        .jackpot-amount { font-family: 'Courier New', monospace; font-size: 1.5rem; color: #fff; text-shadow: 0 0 10px #fff; }

        /* Game Card Hover Effect */
        .main-stage { overflow: visible !important; }
        .table-3d { transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .table-3d:hover { transform: scale(1.02) rotateX(2deg); }
    `;
    document.head.appendChild(style);

    // 2. បញ្ចូល Sidebar និង Jackpot HTML
    const uiOverlay = document.createElement('div');
    uiOverlay.innerHTML = `
        <div class="side-nav">
            <div class="nav-item" onclick="location.reload()"><span>🏠</span><span class="nav-text">HOME</span></div>
            <div class="nav-item" onclick="openVault()"><span>🗝️</span><span class="nav-text">VAULT</span></div>
            <div class="nav-item" onclick="toggleAutoBet()"><span>🤖</span><span class="nav-text">AUTO-BOT</span></div>
            <div class="nav-item" onclick="alert('Coming Soon')"><span>🎁</span><span class="nav-text">PROMO</span></div>
        </div>

        <div class="jackpot-banner">
            <div style="font-size: 0.7rem; color: var(--gold); font-weight: bold;">SOMA'S LEGACY JACKPOT</div>
            <div id="jackpot-val" class="jackpot-amount">$1,250,850.00</div>
        </div>
    `;
    document.body.appendChild(uiOverlay);

    // 3. Jackpot Animation Engine (រត់លេខឡើងរហូត)
    let currentJackpot = 1250850.00;
    setInterval(() => {
        currentJackpot += Math.random() * 5.5;
        document.getElementById('jackpot-val').innerText = `$${currentJackpot.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    }, 100);

    // 4. បន្ថែម Sound Effects ពេល Hover លើប៊ូតុង
    const buttons = document.querySelectorAll('button, .nav-item');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            new Audio('https://www.soundjay.com/buttons/button-35.mp3').play().catch(()=>{});
        });
    });

})();