/**
 * 👑 SINGULARITY IMPERIAL CORE v7.0
 * Security Level: Imperial Login (6-Digit PIN)
 */

(function() {
    // 1. ការកំណត់លេខកូដសម្ងាត់ (ព្រះអង្គអាចប្តូរ PIN នៅទីនេះ)
    const IMPERIAL_PIN = "123456"; 
    let loginAttempts = 0;

    // 2. ការកំណត់រចនាបថ UI
    const style = document.createElement('style');
    style.textContent = `
        :root { --accent: #3b82f6; --gold: #eab308; --bg: #020617; }
        body { font-family: 'Kantumruy Pro', sans-serif; background: var(--bg); color: #f8fafc; margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        
        /* ផ្ទាំង Login */
        #login-screen { background: rgba(15, 23, 42, 0.9); padding: 40px; border-radius: 20px; border: 1px solid var(--accent); text-align: center; box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); backdrop-filter: blur(15px); }
        .pin-input { background: #000; border: 2px solid #334155; border-radius: 10px; color: var(--gold); font-size: 2rem; width: 200px; text-align: center; letter-spacing: 10px; outline: none; margin: 20px 0; }
        .pin-input:focus { border-color: var(--gold); }
        
        /* ផ្ទាំង Main System (លាក់ទុកសិន) */
        #main-system { display: none; width: 100%; height: 100vh; flex-direction: column; }
        .dashboard { background: #000; padding: 10px 20px; border-bottom: 2px solid var(--gold); display: flex; justify-content: space-between; font-size: 0.8rem; }
        #chat-window { flex: 1; overflow-y: auto; padding: 20px 10%; display: flex; flex-direction: column; gap: 15px; background: radial-gradient(circle at bottom, #1e293b 0%, #020617 100%); }
        .msg { padding: 15px; border-radius: 12px; max-width: 85%; line-height: 1.6; }
        .bot { background: rgba(30, 41, 59, 0.7); border-left: 5px solid var(--gold); align-self: flex-start; }
        .user { background: var(--accent); align-self: flex-end; }
        .input-area { background: #0f172a; padding: 20px 10%; border-top: 1px solid var(--accent); }
        .input-box { display: flex; background: #000; border-radius: 30px; border: 1px solid #1e40af; padding: 5px 20px; align-items: center; }
        input { flex: 1; background: transparent; border: none; color: white; padding: 12px; outline: none; }
    `;
    document.head.appendChild(style);

    // 3. ចាក់បញ្ចូល HTML សម្រាប់ទាំង Login និង System
    document.body.innerHTML = `
        <div id="login-screen">
            <h2 style="color:var(--gold); margin:0;">👑 IMPERIAL LOGIN</h2>
            <p style="font-size:0.8rem; color:#94a3b8;">សូមបញ្ចូលលេខកូដសម្ងាត់ដើម្បីបើកមហានិធិ</p>
            <input type="password" id="pinInput" class="pin-input" maxlength="6" placeholder="******">
            <div id="error-msg" style="color:#ef4444; font-size:0.8rem; height:20px;"></div>
            <button onclick="checkPin()" style="background:var(--accent); color:white; border:none; padding:10px 30px; border-radius:8px; cursor:pointer; font-weight:bold;">បើកប្រព័ន្ធ</button>
        </div>

        <div id="main-system">
            <div class="dashboard">
                <span>🛡️ SECURITY: ENCRYPTED</span>
                <span style="color:var(--gold);">💰 មហានិធិ: <span id="balance">$220.00</span></span>
                <span>🟢 Online</span>
            </div>
            <div id="chat-window">
                <div class="msg bot"><b>[ACCESS GRANTED]</b><br>ថ្វាយបង្គំអង្គអធិរាជ! ប្រព័ន្ធត្រូវបានដោះសោរជោគជ័យ។ ទូលព្រះបង្គំរង់ចាំបញ្ជាពីព្រះអង្គ។</div>
            </div>
            <div class="input-area">
                <div class="input-box">
                    <input type="text" id="userInput" placeholder="បញ្ជា AI ឬ លេងបាការ៉ាត់...">
                    <button id="sendBtn" style="background:none; border:none; color:var(--accent); cursor:pointer; font-size:1.2rem;">➔</button>
                </div>
            </div>
        </div>
    `;

    // 4. Logic ត្រួតពិនិត្យ PIN
    window.checkPin = function() {
        const pinField = document.getElementById('pinInput');
        const errorMsg = document.getElementById('error-msg');
        
        if (pinField.value === IMPERIAL_PIN) {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-system').style.display = 'flex';
            speak("ចូលទៅកាន់ប្រព័ន្ធបានជោគជ័យ");
        } else {
            loginAttempts++;
            pinField.value = "";
            if (loginAttempts >= 3) {
                errorMsg.innerText = "❌ ប្រព័ន្ធត្រូវបានចាក់សោរ! សូមព្យាយាមម្តងទៀតក្រោយ។";
                pinField.disabled = true;
            } else {
                errorMsg.innerText = `❌ លេខកូដខុស! អាចសាកល្បងបាន ${3 - loginAttempts} ដងទៀត។`;
            }
        }
    };

    // --- (Logic បាការ៉ាត់ និង AI រក្សាទុកដដែលដូច Version មុន) ---
    // ... (បញ្ចូលកូដ Baccarat.play និង askAI ពី v6.0 ចូលទីនេះ) ...
    
    // ចំណាំ៖ ដើម្បីឱ្យកូដខ្លីងាយអាន ទូលព្រះបង្គំបង្ហាញតែផ្នែក Login ថ្មី
    // ព្រះអង្គអាចបញ្ចូលមុខងារ execute() និង append() ពី v6.0 ចូលខាងក្រោមនេះបាន។
    
    const API_KEY = "AIzaSyDT1IYRoDMy9FTMO0yNZmnsVU8M0ArGz9Q";
    let balance = 220.00;

    window.execute = async function() {
        const input = document.getElementById('userInput');
        const val = input.value.trim();
        if(!val) return;

        append('user', val);
        input.value = '';
        
        // AI & Game logic goes here...
        // (ដូច v6.0)
    };

    function append(type, txt) {
        const win = document.getElementById('chat-window');
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.innerText = txt;
        win.appendChild(div);
        win.scrollTop = win.scrollHeight;
    }

    function speak(text) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'km-KH';
        window.speechSynthesis.speak(utter);
    }
})();