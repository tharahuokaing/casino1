/**
 * 👑 SINGULARITY IMPERIAL MASTER v26.0
 * Sequence: Face Scan Security -> Direct Live Baccarat Entrance
 */

(function() {
    // --- ១. ការកំណត់សមតុល្យ និងសន្តិសុខ ---
    let balance = 5000.00; // សមតុល្យដំបូងរបស់អធិរាជ
    const IMPERIAL_PIN = "123456";

    // --- ២. រចនាបថ UI (Security & Casino Table) ---
    const style = document.createElement('style');
    style.textContent = `
        :root { --accent: #3b82f6; --gold: #eab308; --table-green: #065f46; }
        body { margin: 0; background: #000; color: white; font-family: 'Kantumruy Pro', sans-serif; overflow: hidden; }
        
        /* Security Screen */
        #security-layer { position: fixed; inset: 0; background: #000; z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .scanner-box { width: 280px; height: 280px; border: 2px solid var(--accent); border-radius: 50%; position: relative; overflow: hidden; box-shadow: 0 0 30px var(--accent); }
        .laser { position: absolute; width: 100%; height: 4px; background: var(--accent); top: 0; animation: scan 2s infinite ease-in-out; box-shadow: 0 0 15px var(--accent); }
        @keyframes scan { 0%, 100% { top: 0%; } 50% { top: 100%; } }

        /* Live Baccarat Table */
        #baccarat-arena { display: none; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
        .table { width: 85%; max-width: 900px; height: 500px; background: radial-gradient(circle, var(--table-green) 0%, #042f24 100%); border: 12px solid #3d2b1f; border-radius: 150px 150px 30px 30px; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.9); }
        
        .card-slot { width: 80px; height: 115px; background: #eee; border-radius: 8px; color: #000; font-weight: bold; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; border: 2px solid #999; animation: deal 0.4s ease-out; }
        @keyframes deal { from { transform: translateY(-400px); opacity: 0; } }
        
        .hud { position: absolute; top: 20px; right: 30px; color: var(--gold); font-size: 1.5rem; font-weight: bold; }
    `;
    document.head.appendChild(style);

    // --- ៣. ការចាក់បញ្ចូល HTML ---
    document.body.innerHTML = `
        <div id="security-layer">
            <div class="scanner-box"><div class="laser"></div><video id="cam" autoplay muted style="width:100%; height:100%; object-fit:cover;"></video></div>
            <h2 id="status-text" style="margin-top:20px; color:var(--accent);">INITIALIZING BIOMETRIC SCAN...</h2>
        </div>

        <div id="baccarat-arena">
            <div class="hud">TREASURY: $<span id="bal-text">5000.00</span></div>
            <div class="table">
                <div style="display:flex; justify-content: space-around; margin-top: 100px;">
                    <div style="text-align:center;"><h3>PLAYER</h3><div id="p-cards" style="display:flex; gap:10px;"></div></div>
                    <div style="text-align:center;"><h3>BANKER</h3><div id="b-cards" style="display:flex; gap:10px;"></div></div>
                </div>
                <div id="result-overlay" style="text-align:center; margin-top:50px; font-size:2rem; color:var(--gold);"></div>
            </div>
            <div style="margin-top:30px; display:flex; gap:20px;">
                <button onclick="playRound(100, 'player')" style="padding:15px 30px; background:blue; color:white; border:none; border-radius:10px; cursor:pointer;">BET PLAYER $100</button>
                <button onclick="playRound(100, 'banker')" style="padding:15px 30px; background:red; color:white; border:none; border-radius:10px; cursor:pointer;">BET BANKER $100</button>
            </div>
        </div>
    `;

    // --- ៤. Security Logic & Transition ---
    window.onload = () => {
        const video = document.getElementById('cam');
        navigator.mediaDevices.getUserMedia({ video: true }).then(s => video.srcObject = s);
        
        setTimeout(() => {
            document.getElementById('status-text').innerHTML = "<span style='color:var(--gold)'>IDENTITY CONFIRMED: IMPERIAL SOVEREIGN</span>";
            speak("សម្គាល់ព្រះភ័ក្ត្រជោគជ័យ។ សូមស្វាគមន៍មកកាន់តុបាការ៉ាត់អធិរាជ។");
            
            setTimeout(() => {
                document.getElementById('security-layer').style.display = 'none';
                document.getElementById('baccarat-arena').style.display = 'flex';
            }, 1500);
        }, 3500);
    };

    // --- ៥. Live Baccarat Logic ---
    window.playRound = function(bet, side) {
        if(balance < bet) return speak("មហានិធិមិនគ្រប់គ្រាន់!");
        
        const pCards = document.getElementById('p-cards');
        const bCards = document.getElementById('b-cards');
        const resDiv = document.getElementById('result-overlay');
        
        pCards.innerHTML = ''; bCards.innerHTML = ''; resDiv.innerHTML = 'ចាក់បៀ...';
        speak("ការភ្នាល់ត្រូវបានបិទ។");

        setTimeout(() => {
            // បង្កើតសន្លឹកបៀ (Simulated Live)
            const pVal = Math.floor(Math.random() * 9) + 1;
            const bVal = Math.floor(Math.random() * 9) + 1;
            
            pCards.innerHTML = `<div class="card-slot">${pVal}</div><div class="card-slot">${Math.floor(Math.random()*9)+1}</div>`;
            bCards.innerHTML = `<div class="card-slot">${bVal}</div><div class="card-slot">${Math.floor(Math.random()*9)+1}</div>`;

            const winner = pVal > bVal ? 'player' : (bVal > pVal ? 'banker' : 'tie');
            const win = side === winner;
            
            if(winner === 'tie') balance += 0;
            else if(win) balance += bet;
            else balance -= bet;

            document.getElementById('bal-text').innerText = balance.toFixed(2);
            resDiv.innerText = winner.toUpperCase() + " WINS!";
            speak(winner === 'tie' ? "លទ្ធផលស្មើ" : winner + " ឈ្នះ!" + (win ? " ព្រះអង្គទទួលបានមហាឡាប!" : ""));
        }, 2000);
    };

    function speak(t) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(t); u.lang = 'km-KH';
        window.speechSynthesis.speak(u);
    }
})();