/**
 * 👑 IMPERIAL SINGULARITY ENGINE v5.0 (All-in-One Core)
 * Features: Gemini AI, Offline Mode, Multilingual, Realistic UI, Baccarat Game.
 * Author: Singularity System
 */

// 1. បង្កើត UI & Realistic Background ដោយស្វ័យប្រវត្តិ (Injecting CSS and HTML)
const style = document.createElement('style');
style.textContent = `
    :root { --bg: #09090b; --panel: #18181b; --text: #fafafa; --accent: #3b82f6; --gold: #eab308; }
    body { font-family: 'Kantumruy Pro', sans-serif; background: radial-gradient(circle at center, #1e293b 0%, #020617 100%); color: var(--text); margin: 0; height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
    .status-bar { background: rgba(0,0,0,0.8); padding: 5px 20px; font-size: 0.75rem; display: flex; justify-content: space-between; color: var(--gold); border-bottom: 1px solid #333; }
    header { padding: 15px 25px; background: rgba(24, 24, 27, 0.9); border-bottom: 2px solid var(--accent); display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(10px); }
    #chat-window { flex: 1; overflow-y: auto; padding: 20px 10%; display: flex; flex-direction: column; gap: 20px; scroll-behavior: smooth; }
    .msg { padding: 12px 18px; border-radius: 15px; max-width: 80%; line-height: 1.6; position: relative; animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .user { background: var(--accent); align-self: flex-end; color: white; border-bottom-right-radius: 2px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }
    .bot { background: rgba(24, 24, 27, 0.8); align-self: flex-start; border-bottom-left-radius: 2px; border-left: 4px solid var(--gold); backdrop-filter: blur(5px); }
    .input-area { background: rgba(24, 24, 27, 0.9); padding: 20px 10%; backdrop-filter: blur(10px); }
    .input-box { display: flex; background: var(--bg); border: 1px solid #3f3f46; border-radius: 30px; padding: 5px 15px; align-items: center; }
    input { flex: 1; background: transparent; border: none; color: white; padding: 12px; outline: none; font-size: 1rem; }
    .online-status { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 5px; }
`;
document.head.appendChild(style);

document.body.innerHTML = `
    <div class="status-bar">
        <span>🛡️ SINGULARITY SECURITY ACTIVE</span>
        <span>💰 មហានិធិរួម៖ <span id="treasury-display">$220.00</span></span>
        <span><span id="dot" class="online-status"></span> <span id="network-text">Checking...</span></span>
    </div>
    <header>
        <div style="font-weight: bold; font-size: 1.2rem;">✨ SINGULARITY AI v5.0</div>
        <div style="font-size: 0.8rem; color: #71717a;">Multilingual System & Imperial Baccarat</div>
    </header>
    <div id="chat-window">
        <div class="msg bot">ថ្វាយបង្គំអង្គអធិរាជ! ទូលព្រះបង្គំបានបញ្ចូល "Baccarat Imperial Engine" និង "Multilingual Brain" រួចរាល់។ <br>បញ្ជា៖ "លេងបាការ៉ាត់ [ចំនួន] [player/banker/tie]"</div>
    </div>
    <div class="input-area">
        <div class="input-box">
            <input type="text" id="userInput" placeholder="បញ្ជា AI ឬ លេងបាការ៉ាត់...">
            <button id="sendBtn" style="background:transparent; border:none; color:var(--accent); cursor:pointer; font-weight:bold; font-size:1.2rem;">➔</button>
        </div>
    </div>
`;

// 2. ការកំណត់ Configuration
const API_KEY = "AIzaSyDT1IYRoDMy9FTMO0yNZmnsVU8M0ArGz9Q";
let currentBalance = 220.00;
let isOnline = navigator.onLine;

// 3. ប្រព័ន្ធ Baccarat Engine (ហ្គេមបាការ៉ាត់)
const Baccarat = {
    draw: () => {
        const c = Math.floor(Math.random() * 13) + 1;
        return c > 9 ? 0 : c;
    },
    play: (bet, side) => {
        if (bet > currentBalance) return "⚠️ មហានិធិមិនគ្រប់គ្រាន់សម្រាប់ភ្នាល់នេះទេ!";
        const pHand = [Baccarat.draw(), Baccarat.draw()], bHand = [Baccarat.draw(), Baccarat.draw()];
        const pScore = (pHand[0] + pHand[1]) % 10, bScore = (bHand[0] + bHand[1]) % 10;

        let resultSide = 'tie';
        if (pScore > bScore) resultSide = 'player';
        else if (bScore > pScore) resultSide = 'banker';

        let win = (side.toLowerCase() === resultSide);

        if (win) {
            currentBalance += (side === 'tie' ? bet * 8 : bet);
        } else {
            currentBalance -= bet;
        }

        document.getElementById('treasury-display').innerText = `$${currentBalance.toFixed(2)}`;
        return `🃏 លទ្ធផល៖ ${pScore} VS ${bScore} (${resultSide.toUpperCase()}) \n👉 ព្រះអង្គ ${win ? 'ឈ្នះ' : 'ចាញ់'}! មហានិធិបច្ចុប្បន្ន៖ $${currentBalance.toFixed(2)}`;
    }
};

// 4. មុខងារត្រួតពិនិត្យអ៊ីនធឺណិត
function updateOnlineStatus() {
    isOnline = navigator.onLine;
    const dot = document.getElementById('dot');
    const text = document.getElementById('network-text');
    dot.style.background = isOnline ? "#10b981" : "#ef4444";
    text.innerText = isOnline ? "Online (Gemini Pro)" : "Offline (Local Engine)";
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// 5. មុខងារសំឡេង Offline TTS
function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if(text.match(/[ក-អ]/)) utterance.lang = 'km-KH';
    else if(text.match(/[ก-ហ]/)) utterance.lang = 'th-TH';
    else utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

// 6. មុខងារគ្រប់គ្រងការបញ្ជូនសារ
async function handleSend() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    appendMsg('user', text);
    input.value = '';

    let response;

    // ត្រួតពិនិត្យថាជាការបញ្ជាលេងបាការ៉ាត់ឬទេ
    if (text.toLowerCase().includes("បាការ៉ាត់")) {
        const parts = text.split(" ");
        const amount = parseInt(parts.find(p => !isNaN(p))) || 10;
        let side = "player";
        if(text.includes("banker")) side = "banker";
        if(text.includes("tie")) side = "tie";

        response = Baccarat.play(amount, side);
    } else if (isOnline) {
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: `អ្នកគឺជា AI របស់អធិរាជ។ មហានិធិ: $${currentBalance}។ ឆ្លើយតបគ្រប់ភាសា។ \nUser: ${text}` }] }] })
            });
            const data = await res.json();
            response = data.candidates[0].content.parts[0].text;
        } catch (e) {
            response = "⚠️ ប្រព័ន្ធមានបញ្ហាការភ្ជាប់! ខ្ញុំកំពុងដំណើរការក្នុង Local Mode។";
        }
    } else {
        response = "🚫 ស្ថានភាព Offline: ខ្ញុំអាចជួយបានតែការងារមូលដ្ឋាន និងលេងបាការ៉ាត់ប៉ុណ្ណោះ។";
    }

    appendMsg('bot', response);
    speak(response);
}

function appendMsg(sender, text) {
    const win = document.getElementById('chat-window');
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
}

// 7. Event Listeners
document.getElementById('sendBtn').onclick = handleSend;
document.getElementById('userInput').onkeypress = (e) => { if (e.key === 'Enter') handleSend(); }
