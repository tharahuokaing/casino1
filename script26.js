/**
 * 👑 SINGULARITY IMPERIAL CORE v24.0
 * Feature: Live Baccarat Simulation (Visual Cards & Dealer Voice)
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់តុបាការ៉ាត់ Live
    const style = document.createElement('style');
    style.textContent = `
        .casino-table {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 90%; max-width: 800px; height: 500px;
            background: radial-gradient(circle, #065f46 0%, #064e3b 100%);
            border: 15px solid #3d2b1f; border-radius: 150px 150px 20px 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8), inset 0 0 100px rgba(0,0,0,0.5);
            display: none; flex-direction: column; align-items: center; z-index: 9500;
        }
        .card-area { display: flex; gap: 50px; margin-top: 80px; }
        .hand { display: flex; gap: 10px; min-width: 150px; justify-content: center; }
        .playing-card {
            width: 70px; height: 100px; background: white; border-radius: 5px;
            color: black; display: flex; align-items: center; justify-content: center;
            font-size: 1.5rem; font-weight: bold; border: 2px solid #ccc;
            animation: dealCard 0.5s ease-out; position: relative;
        }
        @keyframes dealCard {
            from { transform: translateY(-500px) rotate(20deg); opacity: 0; }
            to { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        .score-badge {
            background: rgba(0,0,0,0.7); color: var(--gold);
            padding: 5px 15px; border-radius: 20px; margin-top: 10px; font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);

    // 2. បង្កើត HTML នៃតុបាការ៉ាត់
    const tableDiv = document.createElement('div');
    tableDiv.id = 'live-baccarat';
    tableDiv.className = 'casino-table';
    tableDiv.innerHTML = `
        <div style="color:rgba(255,255,255,0.2); font-size:2rem; margin-top:20px; font-weight:bold;">IMPERIAL LIVE CASINO</div>
        <div class="card-area">
            <div>
                <div style="text-align:center; color:white;">PLAYER</div>
                <div id="player-hand" class="hand"></div>
                <div id="player-score" class="score-badge">0</div>
            </div>
            <div>
                <div style="text-align:center; color:white;">BANKER</div>
                <div id="banker-hand" class="hand"></div>
                <div id="banker-score" class="score-badge">0</div>
            </div>
        </div>
        <div id="game-status" style="margin-top:40px; font-size:1.5rem; color:var(--gold); text-shadow: 0 0 10px var(--gold);"></div>
    `;
    document.body.appendChild(tableDiv);

    // 3. មុខងារចែកបៀ (Live Dealing Logic)
    window.startLiveBaccarat = function(bet, side) {
        document.getElementById('live-baccarat').style.display = 'flex';
        const pHand = document.getElementById('player-hand');
        const bHand = document.getElementById('banker-hand');
        pHand.innerHTML = ''; bHand.innerHTML = '';
        
        speak("ការភ្នាល់ត្រូវបានបិទ។ ចាប់ផ្តើមចែកបៀ។");

        setTimeout(() => deal('player', pHand), 500);
        setTimeout(() => deal('banker', bHand), 1000);
        setTimeout(() => deal('player', pHand), 1500);
        setTimeout(() => deal('banker', bHand), 2000);

        // Logic គណនាលទ្ធផល (ដូច Version មុនតែបន្ថែម Animation)
        setTimeout(() => {
            const pScore = Math.floor(Math.random() * 10);
            const bScore = Math.floor(Math.random() * 10);
            document.getElementById('player-score').innerText = pScore;
            document.getElementById('banker-score').innerText = bScore;

            const win = (side === 'player' && pScore > bScore) || (side === 'banker' && bScore > pScore);
            const resultMsg = pScore > bScore ? "Player ឈ្នះ!" : (bScore > pScore ? "Banker ឈ្នះ!" : "ស្មើ!");
            
            document.getElementById('game-status').innerHTML = resultMsg;
            speak(resultMsg + (win ? " អបអរសាទរអង្គអធិរាជ!" : ""));
            
            if(win) balance += bet; else balance -= bet;
            document.getElementById('balanceDisplay').innerText = `$${balance.toFixed(2)}`;
            
            setTimeout(() => { document.getElementById('live-baccarat').style.display = 'none'; }, 4000);
        }, 3000);
    };

    function deal(target, element) {
        const card = document.createElement('div');
        card.className = 'playing-card';
        card.innerText = Math.floor(Math.random() * 9) + 1;
        element.appendChild(card);
        // សំឡេងចែកបៀ
        new Audio('https://www.soundjay.com/misc/sounds/card-shuffling-1.mp3').play();
    }
})();