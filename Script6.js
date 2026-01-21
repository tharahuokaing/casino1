/**
 * 👑 SINGULARITY IMPERIAL CORE v6.0
 * The ultimate gambling system integration.
 */

(function() {
    // 1. បង្កើត UI ប្រកបដោយអំណាច
    const style = document.createElement('style');
    style.textContent = `
        :root { --neon-blue: #3b82f6; --neon-red: #ef4444; --neon-gold: #f59e0b; --dark-bg: #020617; }
        body { font-family: 'Kantumruy Pro', sans-serif; background: var(--dark-bg); color: #f8fafc; margin: 0; height: 100vh; display: flex; flex-direction: column; }
        .dashboard { background: rgba(0,0,0,0.9); padding: 10px 20px; border-bottom: 2px solid var(--neon-gold); display: flex; justify-content: space-between; font-size: 0.8rem; letter-spacing: 1px; }
        #chat-window { flex: 1; overflow-y: auto; padding: 20px 15%; display: flex; flex-direction: column; gap: 15px; background: radial-gradient(circle at bottom, #1e293b 0%, #020617 100%); }
        .msg { padding: 15px; border-radius: 12px; max-width: 85%; position: relative; line-height: 1.6; border: 1px solid rgba(255,255,255,0.1); }
        .bot { background: rgba(30, 41, 59, 0.7); border-left: 5px solid var(--neon-gold); align-self: flex-start; }
        .user { background: var(--neon-blue); align-self: flex-end; border-bottom-right-radius: 2px; }
        .roadmap { display: flex; gap: 5px; margin-top: 10px; background: #000; padding: 10px; border-radius: 8px; border: 1px solid #333; }
        .input-area { background: #0f172a; padding: 25px 15%; border-top: 1px solid var(--neon-blue); }
        .input-box { display: flex; background: #000; border-radius: 30px; border: 1px solid #1e40af; padding: 5px 20px; align-items: center; }
        input { flex: 1; background: transparent; border: none; color: white; padding: 12px; outline: none; }
        .dot { height: 10px; width: 10px; border-radius: 50%; display: inline-block; margin-right: 5px; }
    `;
    document.head.appendChild(style);

    document.body.innerHTML = `
        <div class="dashboard">
            <span>⚔️ IMPERIAL SECURITY: LEVEL 7</span>
            <span style="color:var(--neon-gold);">💰 មហានិធិ: <span id="balance">$220.00</span></span>
            <span><span id="dot" class="dot"></span> <span id="status">Checking...</span></span>
        </div>
        <div id="chat-window">
            <div class="msg bot">
                <b>[SYSTEM INITIALIZED]</b><br>
                ថ្វាយបង្គំអង្គអធិរាជ! ប្រព័ន្ធល្បែងភ្នាល់អនាគតត្រូវបានដំឡើងរួចរាល់។<br>
                - <b>AI:</b> Gemini 1.5 Pro (Multilingual)<br>
                - <b>Casino:</b> Baccarat Module Active<br>
                - <b>Stats:</b> Roadmap tracking enabled.
            </div>
        </div>
        <div class="input-area">
            <div class="input-box">
                <input type="text" id="userInput" placeholder="បញ្ជា AI ឬ ភ្នាល់បាការ៉ាត់ (ឧ៖ លេងបាការ៉ាត់ 20 player)..." autofocus>
                <button id="sendBtn" style="background:none; border:none; color:var(--neon-blue); cursor:pointer; font-size:1.5rem;">➔</button>
            </div>
        </div>
    `;

    // 2. ការកំណត់ Configuration & State
    const API_KEYS = ["AIzaSyDT1IYRoDMy9FTMO0yNZmnsVU8M0ArGz9Q"]; // អាចបន្ថែម Key បម្រុងក្នុង Array នេះ
    let balance = 220.00;
    const history = [];

    // 3. ម៉ាស៊ីនបាការ៉ាត់ (Baccarat Imperial Engine)
    const Game = {
        play: (bet, side) => {
            if (bet > balance) return "❌ មហានិធិមិនគ្រប់គ្រាន់!";
            const p = (Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9)) % 10;
            const b = (Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9)) % 10;
            const res = p > b ? 'player' : (b > p ? 'banker' : 'tie');
            const win = side.toLowerCase() === res;
            
            balance += win ? (side === 'tie' ? bet * 8 : bet) : -bet;
            history.push({r: res.charAt(0).toUpperCase(), p, b});
            if(history.length > 8) history.shift();

            document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;
            
            let roadmapHTML = `<div class="roadmap">`;
            history.forEach(h => {
                const color = h.r === 'P' ? 'var(--neon-blue)' : (h.r === 'B' ? 'var(--neon-red)' : 'var(--neon-gold)');
                roadmapHTML += `<span style="color:${color}; border:1px solid ${color}; padding:2px 6px; border-radius:4px;">${h.r}</span>`;
            });
            roadmapHTML += `</div>`;

            return `🃏 P(${p}) vs B(${b}) - <b>${res.toUpperCase()}</b><br>${win ? '✅ ឈ្នះ!' : '❌ ចាញ់!'} សមតុល្យ: $${balance.toFixed(2)} ${roadmapHTML}`;
        }
    };

    // 4. ការវិភាគ AI (Multi-Language)
    async function askAI(prompt) {
        if(!navigator.onLine) return "🚫 Offline: ទូលព្រះបង្គំដំណើរការតែ Local Game ប៉ុណ្ណោះ។";
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEYS[0]}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({contents:[{parts:[{text:`អ្នកគឺជាអធិរាជ AI។ មហានិធិ: $${balance}។ \nUser: ${prompt}`}]}]})
            });
            const data = await res.json();
            return data.candidates[0].content.parts[0].text;
        } catch (e) { return "❌ Central Brain Error: សូមពិនិត្យ API Key ឬការភ្ជាប់អ៊ីនធឺណិត។"; }
    }

    // 5. សំឡេង និងការបង្ហាញ
    function speak(text) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
        utter.lang = text.match(/[ក-អ]/) ? 'km-KH' : (text.match(/[ก-ហ]/) ? 'th-TH' : 'en-US');
        window.speechSynthesis.speak(utter);
    }

    async function execute() {
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
            reply = await askAI(val);
        }

        append('bot', reply);
        speak(reply);
    }

    function append(type, txt) {
        const win = document.getElementById('chat-window');
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.innerHTML = txt;
        win.appendChild(div);
        win.scrollTop = win.scrollHeight;
    }

    // Event Listeners
    document.getElementById('sendBtn').onclick = execute;
    document.getElementById('userInput').onkeypress = (e) => { if(e.key==='Enter') execute(); };
    window.addEventListener('online', () => { document.getElementById('dot').style.backgroundColor = '#10b981'; document.getElementById('status').innerText = 'Online'; });
    window.addEventListener('offline', () => { document.getElementById('dot').style.backgroundColor = '#ef4444'; document.getElementById('status').innerText = 'Offline'; });
    
    // Initial Status
    const isOnline = navigator.onLine;
    document.getElementById('dot').style.backgroundColor = isOnline ? '#10b981' : '#ef4444';
    document.getElementById('status').innerText = isOnline ? 'Online' : 'Offline';

})();