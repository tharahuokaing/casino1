/**
 * 👑 SINGULARITY IMPERIAL CORE v9.0
 * Feature: Advanced Betting Analytics + Visual Stats
 */

(function() {
    // --- Configuration ថ្មីសម្រាប់ Analytics ---
    let stats = {
        totalGames: 0,
        wins: 0,
        losses: 0,
        maxWin: 0,
        betHistory: [], // រក្សាទុក [Balance] ដើម្បីគូរ Graph
        cardFrequency: { player: 0, banker: 0, tie: 0 }
    };

    // 1. បន្ថែម CSS សម្រាប់ Dashboard ស្ថិតិ
    const style = document.createElement('style');
    style.textContent = `
        #analytics-panel { 
            position: fixed; top: 60px; right: 20px; width: 280px; 
            background: rgba(15, 23, 42, 0.9); border: 1px solid var(--gold);
            border-radius: 15px; padding: 15px; font-size: 0.8rem;
            backdrop-filter: blur(10px); z-index: 100; display: none;
        }
        .stat-row { display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px dashed #334155; padding-bottom: 4px; }
        .win-bar { height: 8px; background: #334155; border-radius: 4px; overflow: hidden; margin: 10px 0; }
        .win-progress { height: 100%; background: #10b981; transition: width 0.5s; }
        .chart-mini { height: 40px; display: flex; align-items: flex-end; gap: 2px; margin-top: 10px; }
        .chart-bar { flex: 1; background: var(--accent); min-height: 2px; }
    `;
    document.head.appendChild(style);

    // 2. បញ្ចូល HTML Panel ទៅក្នុងប្រព័ន្ធ
    const analyticsDiv = document.createElement('div');
    analyticsDiv.id = 'analytics-panel';
    analyticsDiv.innerHTML = `
        <h3 style="margin-top:0; color:var(--gold); font-size:0.9rem;">📊 IMPERIAL ANALYTICS</h3>
        <div class="stat-row"><span>ហ្គេមសរុប:</span> <span id="stat-total">0</span></div>
        <div class="stat-row"><span>អត្រាឈ្នះ:</span> <span id="stat-winrate">0%</span></div>
        <div class="win-bar"><div id="stat-progress" class="win-progress" style="width: 0%"></div></div>
        <div class="stat-row"><span>ឈ្នះខ្ពស់បំផុត:</span> <span id="stat-maxwin" style="color:#10b981;">$0</span></div>
        <div class="stat-row"><span>P | B | T:</span> <span id="stat-frequency">0 | 0 | 0</span></div>
        <div style="font-size:0.7rem; color:#94a3b8; margin-top:10px;">និន្នាការមហានិធិ (Trend):</div>
        <div id="mini-chart" class="chart-mini"></div>
    `;
    document.body.appendChild(analyticsDiv);

    // 3. មុខងារ Update Analytics (ហៅប្រើក្នុង Game.play)
    function updateAnalytics(win, betAmount, resultSide) {
        stats.totalGames++;
        if (win) {
            stats.wins++;
            if (betAmount > stats.maxWin) stats.maxWin = betAmount;
        } else {
            stats.losses++;
        }
        stats.cardFrequency[resultSide]++;
        stats.betHistory.push(balance); // រក្សាសមតុល្យក្នុង Array
        if(stats.betHistory.length > 20) stats.betHistory.shift();

        // បង្ហាញ Panel នៅពេលចាប់ផ្តើមលេង
        document.getElementById('analytics-panel').style.display = 'block';

        // Update UI
        const winRate = ((stats.wins / stats.totalGames) * 100).toFixed(1);
        document.getElementById('stat-total').innerText = stats.totalGames;
        document.getElementById('stat-winrate').innerText = winRate + "%";
        document.getElementById('stat-progress').style.width = winRate + "%";
        document.getElementById('stat-maxwin').innerText = "$" + stats.maxWin;
        document.getElementById('stat-frequency').innerText = `${stats.cardFrequency.player} | ${stats.cardFrequency.banker} | ${stats.cardFrequency.tie}`;
        
        // គូរ Graph បង្ហាញនិន្នាការ
        const chart = document.getElementById('mini-chart');
        chart.innerHTML = "";
        const maxVal = Math.max(...stats.betHistory);
        stats.betHistory.forEach(val => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = (val / maxVal * 100) + "%";
            chart.appendChild(bar);
        });
    }

    // 4. កែសម្រួល Game Engine (កន្លែង Game.play)
    // ព្រះអង្គគ្រាន់តែបន្ថែម updateAnalytics(win, bet, res) ចូលក្នុង Logic បាការ៉ាត់
    const Game = {
        play: (bet, side) => {
            if (bet > balance) return "❌ មហានិធិមិនគ្រប់គ្រាន់!";
            const p = (Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9)) % 10;
            const b = (Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9)) % 10;
            const res = p > b ? 'player' : (b > p ? 'banker' : 'tie');
            const win = side.toLowerCase() === res;
            
            balance += win ? (side === 'tie' ? bet * 8 : bet) : -bet;
            
            // ហៅមុខងារវិភាគ
            updateAnalytics(win, bet, res);

            document.getElementById('balanceDisplay').innerText = `$${balance.toFixed(2)}`;
            return `🃏 P(${p}) vs B(${b}) - <b>${res.toUpperCase()}</b><br>${win ? '✅ ឈ្នះ!' : '❌ ចាញ់!'} សមតុល្យ: $${balance.toFixed(2)}`;
        }
    };

    // ... (កូដ Login និង AI រក្សាទុកដូច v8.0) ...
})();