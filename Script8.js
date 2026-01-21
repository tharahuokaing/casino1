/**
 * 👑 SINGULARITY IMPERIAL CORE v8.0
 * Security: Imperial Login + Auto-Self-Destruct
 * PIN: 051198 (ព្រះអង្គអាចប្តូរបាននៅទីនេះ)
 */

(function() {
    const IMPERIAL_PIN = "051198"; 
    let attempts = 0;
    let isLocked = false;

    // 1. បង្កើតប្រព័ន្ធ UI & CSS
    const style = document.createElement('style');
    style.textContent = `
        :root { --accent: #3b82f6; --gold: #eab308; --danger: #ef4444; --bg: #020617; }
        body { font-family: 'Kantumruy Pro', sans-serif; background: var(--bg); color: #f8fafc; margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        
        #login-screen { background: rgba(15, 23, 42, 0.95); padding: 50px; border-radius: 25px; border: 1px solid var(--accent); text-align: center; box-shadow: 0 0 50px rgba(59, 130, 246, 0.4); backdrop-filter: blur(20px); transition: all 0.5s; }
        .pin-input { background: #000; border: 2px solid #334155; border-radius: 12px; color: var(--gold); font-size: 2.5rem; width: 250px; text-align: center; letter-spacing: 12px; outline: none; margin: 25px 0; }
        
        #main-system { display: none; width: 100%; height: 100vh; flex-direction: column; }
        .dashboard { background: #000; padding: 12px 25px; border-bottom: 2px solid var(--gold); display: flex; justify-content: space-between; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        #chat-window { flex: 1; overflow-y: auto; padding: 30px 15%; display: flex; flex-direction: column; gap: 20px; background: radial-gradient(circle at center, #1e293b 0%, #020617 100%); }
        .msg { padding: 16px; border-radius: 15px; max-width: 80%; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
        .bot { background: rgba(30, 41, 59, 0.8); border-left: 5px solid var(--gold); align-self: flex-start; }
        .user { background: var(--accent); align-self: flex-end; border-bottom-right-radius: 2px; }
        .input-area { background: #0f172a; padding: 25px 15%; border-top: 1px solid var(--accent); }
        .input-box { display: flex; background: #000; border-radius: 40px; border: 1px solid #1e40af; padding: 8px 25px; }
        input { flex: 1; background: transparent; border: none; color: white; padding: 12px; outline: none; font-size: 1.1rem; }
    `;
    document.head.appendChild(style);

    // 2. ចាក់បញ្ចូល HTML នៃប្រព័ន្ធទាំងមូល
    document.body.innerHTML = `
        <div id="login-screen">
            <h1 style="color:var(--gold); margin-bottom:5px;">🛡️ IMPERIAL VAULT</h1>
            <p id="vault-status" style="color:#94a3b8;">Security Level: High Access Required</p>
            <input type="password" id="pinInput" class="pin-input" maxlength="6" placeholder="******">
            <div id="error-msg" style="color:var(--danger); font-size:0.9rem; margin-bottom:15px; height:20px;"></div>
            <button onclick="verifyAccess()" style="background:var(--accent); color:white; border:none; padding:12px 40px; border-radius:30px; cursor:pointer; font-weight:bold; font-size:1rem; width:100%;">ACCESS SYSTEM</button>
        </div>

        <div id="main-system">
            <div class="dashboard">
                <span style="color:#10b981;">● SYSTEM SECURE</span>
                <span style="color:var(--gold); font-weight:bold;">TREASURY: <span id="balanceDisplay">$220.00</span></span>
                <span id="network-info">🌐 CONNECTED</span>
            </div>
            <div id="chat-window">
                <div class="msg bot"><b>[AUTHENTICATION SUCCESSFUL]</b><br>ថ្វាយបង្គំអង្គអធិរាជ! ស្វាគមន៍ការចូលមកកាន់មជ្ឈមណ្ឌលបញ្ជា។ ប្រព័ន្ធបាការ៉ាត់ និង AI ឆ្លាតវៃបានត្រៀមខ្លួនជាស្រេច។</div>
            </div>
            <div class="input-area">
                <div class="input-box">
                    <input type="text" id="userInput" placeholder="បញ្ចូលព្រះរាជបញ្ជា (AI / Baccarat)...">
                    <button id="sendBtn" style="background:none; border:none; color:var(--accent); cursor:pointer; font-size:1.5rem;">➔</button>
                </div>
            </div>
        </div>
    `;

    // 3. មុខងារ verifyAccess ជាមួយ Self-Destruct Logic
    window.verifyAccess = function() {
        if (isLocked) return;
        const pin = document.getElementById('pinInput').value;
        const error = document.getElementById('error-msg');

        if (pin === IMPERIAL_PIN) {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-system').style.display = 'flex';
            speak("ចូលទៅកាន់ប្រព័ន្ធបានជោគជ័យ។ ថ្វាយបង្គំអង្គអធិរាជ!");
        } else {
            attempts++;
            document.getElementById('pinInput').value = "";
            
            if (attempts >= 5) {
                isLocked = true;
                error.innerText = "🚨 SELF-DESTRUCT ACTIVATED! DATA WIPED.";
                error.style.color = "var(--danger)";
                document.getElementById('pinInput').disabled = true;
                selfDestruct();
            } else {
                error.innerText = `❌ PIN មិនត្រឹមត្រូវ! សល់ឱកាសតែ ${5 - attempts} ដងទៀតប៉ុណ្ណោះ។`;
                // បន្ថែមញ័រ (Shake effect) ពេលខុស
                const login = document.getElementById('login-screen');
                login.style.transform = "translateX(10px)";
                setTimeout(()=> login.style.transform = "translateX(0)", 100);
            }
        }
    };

    function selfDestruct() {
        console.warn("Self-destruct sequence initiated...");
        localStorage.clear();
        sessionStorage.clear();
        speak("ការបំផ្លាញទិន្នន័យត្រូវបានអនុវត្ត។ ប្រព័ន្ធត្រូវបានបិទ។");
        setTimeout(() => {
            document.body.innerHTML = "<h1 style='color:red; text-align:center;'>SYSTEM TERMINATED.</h1>";
        }, 3000);
    }

    // 4. core logic (AI & Gambling)
    const API_KEY = "AIzaSyDT1IYRoDMy9FTMO0yNZmnsVU8M0ArGz9Q";
    let balance = 220.00;

    const Game = {
        play: (bet, side) => {
            if (bet > balance) return "❌ មហានិធិមិនគ្រប់គ្រាន់!";
            const p = (Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9)) % 10;
            const b = (Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9)) % 10;
            const res = p > b ? 'player' : (b > p ? 'banker' : 'tie');
            const win = side.toLowerCase() === res;
            balance += win ? (side === 'tie' ? bet * 8 : bet) : -bet;
            document.getElementById('balanceDisplay').innerText = `$${balance.toFixed(2)}`;
            return `🃏 P(${p}) vs B(${b}) - <b>${res.toUpperCase()}</b><br>${win ? '✅ ឈ្នះ!' : '❌ ចាញ់!'} សមតុល្យ: $${balance.toFixed(2)}`;
        }
    };

    async function send() {
        const input = document.getElementById('userInput');
        const val = input.value.trim();
        if(!val) return;
        append('user', val);
        input.value = '';

        let reply;
        if(val.toLowerCase().includes("បាការ៉ាត់")) {
            const p = val.split(" ");
            reply = Game.play(parseInt(p[1]) || 10, p[2] || 'player');
        } else {
            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({contents:[{parts:[{text:`អ្នកគឺជា AI របស់អធិរាជ។ មហានិធិ: $${balance}។ \nUser: ${val}`}]}]})
                });
                const data = await res.json();
                reply = data.candidates[0].content.parts[0].text;
            } catch(e) { reply = "❌ Central Brain Error."; }
        }
        append('bot', reply);
        speak(reply.replace(/<[^>]*>/g, ''));
    }

    function append(type, txt) {
        const win = document.getElementById('chat-window');
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.innerHTML = txt;
        win.appendChild(div);
        win.scrollTop = win.scrollHeight;
    }

    function speak(text) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'km-KH';
        window.speechSynthesis.speak(utter);
    }

    document.getElementById('sendBtn').onclick = send;
    document.getElementById('userInput').onkeypress = (e) => { if(e.key==='Enter') send(); };
})();