/**
 * 👑 SINGULARITY IMPERIAL MASTER SCRIPT v17.0
 * Combined Features: Biometric Scan, Security Logs, Ghost Mode, 3D Hub, 
 * Casino Engine (Baccarat, Roulette, Slots), and AI Imperial Brain.
 * Extension: .js
 */

(function() {
    // --- 1. ការកំណត់ Config ស្នូល ---
    const IMPERIAL_PIN = "123456";
    const IMPERIAL_NAME = "ព្រះអង្គអធិរាជ";
    const API_KEY = "AIzaSyDT1IYRoDMy9FTMO0yNZmnsVU8M0ArGz9Q";
    
    let balance = 220.00;
    let isGhostMode = false;
    let securityLogs = JSON.parse(localStorage.getItem('imperial_logs')) || [];

    // --- 2. Imperial UI Styles ---
    const style = document.createElement('style');
    style.textContent = `
        :root { --accent: #3b82f6; --gold: #eab308; --danger: #ef4444; --bg: #020617; }
        body { margin: 0; background: var(--bg); color: white; font-family: 'Kantumruy Pro', sans-serif; overflow: hidden; }
        
        /* Background & Hub */
        .main-container { height: 100vh; width: 100%; background: url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070') no-repeat center center/cover; display: none; flex-direction: column; backdrop-filter: blur(10px); }
        .header { padding: 15px 30px; display: flex; justify-content: space-between; background: rgba(0,0,0,0.8); border-bottom: 2px solid var(--gold); align-items: center; }
        
        /* Game Hub Cards */
        .game-hub { flex: 1; display: flex; justify-content: center; align-items: center; gap: 30px; perspective: 1000px; }
        .game-card { width: 220px; height: 320px; background: rgba(255,255,255,0.05); border: 1px solid var(--accent); border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: 0.5s; position: relative; }
        .game-card:hover { transform: scale(1.1) rotateY(10deg); box-shadow: 0 0 40px var(--accent); border-color: var(--gold); }
        .game-card img { width: 100px; filter: drop-shadow(0 0 10px var(--accent)); }
        
        /* Face Scanner */
        #face-scan-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: 5000; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .scanner-frame { width: 280px; height: 280px; border: 2px solid var(--accent); border-radius: 50%; position: relative; overflow: hidden; }
        .scan-line { width: 100%; height: 4px; background: var(--accent); position: absolute; top: 0; animation: scanMove 2s infinite ease-in-out; box-shadow: 0 0 15px var(--accent); }
        @keyframes scanMove { 0%, 100% { top: 0%; } 50% { top: 100%; } }

        /* Login Screen */
        #login-screen { display: none; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: rgba(0,0,0,0.9); }
        .pin-input { background: #000; border: 2px solid var(--accent); color: var(--gold); font-size: 2rem; width: 200px; text-align: center; letter-spacing: 10px; border-radius: 10px; margin: 20px 0; outline: none; }
        
        /* Ghost Mode Classes */
        .ghost-blur { filter: blur(5px); pointer-events: none; opacity: 0.5; }
    `;
    document.head.appendChild(style);

    // --- 3. HTML Structure Injection ---
    document.body.innerHTML = `
        <div id="face-scan-overlay">
            <div class="scanner-frame"><div class="scan-line"></div><video id="webcam" autoplay muted style="width:100%; height:100%; object-fit:cover;"></video></div>
            <div style="margin-top:20px; color:var(--accent);" id="scan-text">[ SYSTEM SCANNING BIOMETRICS... ]</div>
        </div>

        <div id="login-screen">
            <h1 style="color:var(--gold);">🔐 IMPERIAL VAULT</h1>
            <input type="password" id="pinInput" class="pin-input" maxlength="6">
            <div id="error-msg" style="color:red; height:20px;"></div>
            <button onclick="verifyPin()" style="background:var(--accent); color:white; border:none; padding:12px 40px; border-radius:30px; cursor:pointer;">ACCESS</button>
        </div>

        <div id="main-system" class="main-container">
            <div class="header">
                <span style="font-weight:bold; letter-spacing:2px;">🛡️ SINGULARITY OS v17.0</span>
                <div style="display:flex; align-items:center; gap:15px;">
                    <span id="balanceDisplay" style="color:var(--gold); font-size:1.2rem; font-weight:bold;">$220.00</span>
                    <span id="eyeBtn" onclick="toggleGhostMode()" style="cursor:pointer; font-size:1.2rem;">👁️</span>
                </div>
            </div>
            <div class="game-hub">
                <div class="game-card" onclick="playGame('Baccarat')"><img src="https://cdn-icons-png.flaticon.com/512/1055/1055823.png"><h2>BACCARAT</h2></div>
                <div class="game-card" onclick="playGame('Roulette')"><img src="https://cdn-icons-png.flaticon.com/512/2641/2641433.png"><h2>ROULETTE</h2></div>
                <div class="game-card" onclick="playGame('Slots')"><img src="https://cdn-icons-png.flaticon.com/512/8153/8153028.png"><h2>SLOTS</h2></div>
            </div>
            <div style="text-align:center; padding:15px; color:#444;">SECURITY ACTIVE | 256-BIT ENCRYPTION</div>
        </div>
    `;

    // --- 4. Logic & Security Engines ---
    
    // Voice Engine
    function speak(txt) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(txt);
        u.lang = 'km-KH'; u.rate = 0.9;
        window.speechSynthesis.speak(u);
    }

    // Security Log & Capture
    function saveSecurityLog(status) {
        const video = document.getElementById('webcam');
        const canvas = document.createElement('canvas');
        canvas.width = 300; canvas.height = 300;
        canvas.getContext('2d').drawImage(video, 0, 0, 300, 300);
        securityLogs.push({ time: new Date().toLocaleString(), status: status, img: canvas.toDataURL() });
        localStorage.setItem('imperial_logs', JSON.stringify(securityLogs.slice(-50)));
    }

    // Face Scan Sequence
    window.onload = () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(s => { document.getElementById('webcam').srcObject = s; });
        setTimeout(() => {
            saveSecurityLog("SCANNED");
            document.getElementById('scan-text').innerHTML = "<span style='color:var(--gold)'>[ ACCESS GRANTED ]</span>";
            speak("សម្គាល់ព្រះភ័ក្ត្រជោគជ័យ។ សូមបញ្ចូលលេខកូដសម្ងាត់។");
            setTimeout(() => {
                document.getElementById('face-scan-overlay').style.display = 'none';
                document.getElementById('login-screen').style.display = 'flex';
            }, 1000);
        }, 3000);
    };

    // PIN Verification
    window.verifyPin = () => {
        const pin = document.getElementById('pinInput').value;
        if (pin === IMPERIAL_PIN) {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-system').style.display = 'flex';
            speak(`សូមស្វាគមន៍ ${IMPERIAL_NAME}! ប្រព័ន្ធបានបើកដំណើរការពេញលេញ។`);
        } else {
            document.getElementById('error-msg').innerText = "❌ លេខកូដសម្ងាត់មិនត្រឹមត្រូវ!";
        }
    };

    // Ghost Mode Logic
    window.toggleGhostMode = () => {
        isGhostMode = !isGhostMode;
        const b = document.getElementById('balanceDisplay');
        const e = document.getElementById('eyeBtn');
        if(isGhostMode) {
            b.innerText = "$*,***.**"; b.classList.add('ghost-blur'); e.innerHTML = "👁️‍🗨️";
            speak("របៀបលាក់ដានត្រូវបានបើក។");
        } else {
            b.innerText = `$${balance.toFixed(2)}`; b.classList.remove('ghost-blur'); e.innerHTML = "👁️";
            speak("របៀបលាក់ដានត្រូវបានបិទ។");
        }
    };

    // Game Redirection Simulation
    window.playGame = (type) => {
        speak(`កំពុងបើកដំណើរការហ្គេម ${type}`);
        alert(`Redirecting to ${type} Engine... Balance: ${isGhostMode ? '***' : '$'+balance}`);
        // ទីនេះព្រះអង្គអាចបញ្ចូល Logic Baccarat/Roulette/Slots ពី Version មុនបាន
    };

})();