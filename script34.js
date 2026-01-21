/**
 * 👑 SINGULARITY IMPERIAL MASTER INSTALLER v31.0 (Full Version)
 * All-in-One: Security, Casino, AI Dealer, Finance, & Vault
 */

(function() {
    // --- 1. CORE DATA & STORAGE ---
    let balance = 5000.00;
    const PIN = "123456";
    let dealerGallery = JSON.parse(localStorage.getItem('imperial_vault')) || [];
    let isAutoBet = false;

    // --- 2. IMPERIAL UI STYLES ---
    const style = document.createElement('style');
    style.textContent = `
        :root { --gold: #eab308; --accent: #3b82f6; --table: #065f46; --danger: #ef4444; }
        body { margin: 0; background: #000; color: white; font-family: 'Kantumruy Pro', sans-serif; overflow: hidden; }
        
        /* Layouts */
        #security-screen, #baccarat-arena, #vault-ui { position: fixed; inset: 0; display: none; flex-direction: column; align-items: center; justify-content: center; }
        #security-screen { display: flex; z-index: 10000; background: #000; }
        
        /* Baccarat Table */
        .table-3d { width: 90%; max-width: 900px; height: 500px; background: radial-gradient(circle, var(--table) 0%, #042f24 100%); border: 15px solid #3d2b1f; border-radius: 150px 150px 30px 30px; position: relative; box-shadow: 0 30px 80px rgba(0,0,0,1); margin-top: 50px; }
        .dealer-box { width: 220px; height: 320px; background: url('https://img.freepik.com/premium-photo/beautiful-casino-dealer-woman-red-dress-holding-cards-generative-ai_175880-1436.jpg') center/cover; border-radius: 15px; position: absolute; top: -100px; left: 50%; transform: translateX(-50%); border: 2px solid var(--gold); transition: 0.5s; }
        
        /* Cards & Components */
        .card-slot { width: 70px; height: 100px; background: white; border-radius: 5px; color: black; font-weight: bold; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc; animation: deal 0.5s ease-out; }
        @keyframes deal { from { transform: translateY(-500px) rotate(20deg); } }
        
        .road-map { display: grid; grid-template-columns: repeat(12, 1fr); width: 240px; height: 120px; background: white; border: 2px solid #444; position: absolute; bottom: 20px; right: 20px; gap: 1px; }
        .dot { width: 15px; height: 15px; border-radius: 50%; }
    `;
    document.head.appendChild(style);

    // --- 3. HTML INJECTION ---
    document.body.innerHTML = `
        <div id="security-screen">
            <div style="width:280px; height:280px; border:2px solid var(--accent); border-radius:50%; overflow:hidden; position:relative;">
                <div style="position:absolute; width:100%; height:4px; background:var(--accent); animation:scan 2s infinite;"></div>
                <video id="v" autoplay muted style="width:100%; height:100%; object-fit:cover;"></video>
            </div>
            <h2 id="s-text" style="color:var(--accent); margin-top:20px;">SYSTEM SCANNING...</h2>
        </div>

        <div id="baccarat-arena">
            <div style="position:absolute; top:20px; left:30px; font-size:1.5rem; color:var(--gold);">TREASURY: $<span id="bal">5000.00</span></div>
            <div class="table-3d">
                <div id="dealer-img" class="dealer-box"></div>
                <div style="display:flex; justify-content:space-around; margin-top:150px;">
                    <div><h3>PLAYER</h3><div id="p-hand" style="display:flex; gap:10px;"></div></div>
                    <div><h3>BANKER</h3><div id="b-hand" style="display:flex; gap:10px;"></div></div>
                </div>
                <div id="road-map" class="road-map"></div>
                <div id="status" style="text-align:center; font-size:2rem; margin-top:50px; color:var(--gold);"></div>
            </div>
            <div style="margin-top:40px; display:flex; gap:15px;">
                <button onclick="play(100, 'player')" style="padding:15px 40px; background:blue; color:white; border:none; border-radius:10px; cursor:pointer;">PLAYER</button>
                <button onclick="play(100, 'banker')" style="padding:15px 40px; background:red; color:white; border:none; border-radius:10px; cursor:pointer;">BANKER</button>
                <button onclick="openVault()" style="padding:15px; background:var(--gold); border:none; border-radius:10px; cursor:pointer;">🗝️ VAULT</button>
            </div>
        </div>

        <div id="vault-ui" style="background:rgba(0,0,0,0.95); z-index:20000;">
            <h1 style="color:var(--gold);">IMPERIAL SECRET VAULT</h1>
            <div id="v-grid" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:15px;"></div>
            <button onclick="closeVault()" style="margin-top:20px; padding:10px 50px;">EXIT</button>
        </div>
    `;

    // --- 4. CORE ENGINES ---
    
    // Voice Engine
    function speak(t, emotion = 'neutral') {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(t);
        u.lang = 'km-KH';
        u.pitch = emotion === 'happy' ? 1.4 : (emotion === 'sad' ? 0.8 : 1.1);
        window.speechSynthesis.speak(u);
    }

    // Security Scan
    window.onload = () => {
        navigator.mediaDevices.getUserMedia({video: true}).then(s => document.getElementById('v').srcObject = s);
        setTimeout(() => {
            document.getElementById('s-text').innerText = "WELCOME, MY LORD.";
            speak("សូមស្វាគមន៍ព្រះអង្គអធិរាជ។ ប្រព័ន្ធត្រៀមខ្លួនជាស្រេច។");
            setTimeout(() => {
                document.getElementById('security-screen').style.display = 'none';
                document.getElementById('baccarat-arena').style.display = 'flex';
            }, 1500);
        }, 3000);
    };

    // Game Logic
    window.play = (bet, side) => {
        if(balance < bet) return speak("មហានិធិមិនគ្រប់គ្រាន់!");
        speak("ការភ្នាល់បិទ។ ចាប់ផ្តើមចែកបៀ។");
        
        setTimeout(() => {
            const p = Math.floor(Math.random()*9)+1;
            const b = Math.floor(Math.random()*9)+1;
            document.getElementById('p-hand').innerHTML = `<div class="card-slot">${p}</div>`;
            document.getElementById('b-hand').innerHTML = `<div class="card-slot">${b}</div>`;
            
            const winner = p > b ? 'player' : (b > p ? 'banker' : 'tie');
            const win = side === winner;
            
            if(win) {
                balance += bet;
                speak("អបអរសាទរព្រះអង្គ! ទូលបង្គំសប្បាយចិត្តណាស់។", 'happy');
            } else {
                balance -= bet;
                speak("សូមកុំព្រះទ័យសោកស្តាយអី លើកក្រោយនឹងឈ្នះវិញ។", 'sad');
            }
            
            document.getElementById('bal').innerText = balance.toFixed(2);
            document.getElementById('status').innerText = winner.toUpperCase() + " WINS!";
        }, 2000);
    };

    // Vault Logic
    window.openVault = () => {
        document.getElementById('vault-ui').style.display = 'flex';
        renderVault();
    };
    window.closeVault = () => document.getElementById('vault-ui').style.display = 'none';
    
    function renderVault() {
        const grid = document.getElementById('v-grid');
        grid.innerHTML = dealerGallery.map((img, i) => `<img src="${img}" style="width:100px; height:150px; cursor:pointer;" onclick="setDealer(${i})">`).join('');
    }
    window.setDealer = (i) => {
        document.getElementById('dealer-img').style.backgroundImage = `url('${dealerGallery[i]}')`;
        closeVault();
    };

})();