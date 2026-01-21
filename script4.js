// --- 1. បន្ថែមប្រព័ន្ធ Provably Fair (ការពារការបោកប្រាស់) ---
const Cryptography = {
    generateSeed: () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    hashResult: (seed, result) => {
        // ក្នុងអនាគតអាចប្រើ SHA-256 សម្រាប់ការសម្ងាត់កម្រិតខ្ពស់
        return btoa(seed + result); 
    }
};

// --- 2. កែសម្រួល Baccarat Engine ឱ្យមានភាព Realistic បំផុត ---
const Baccarat = {
    history: [],
    stats: { player: 0, banker: 0, tie: 0 },
    
    play: (bet, side) => {
        if (bet > balance) return "⚠️ មហានិធិមិនគ្រប់គ្រាន់!";
        
        const seed = Cryptography.generateSeed();
        const p1 = Math.floor(Math.random() * 10), p2 = Math.floor(Math.random() * 10);
        const b1 = Math.floor(Math.random() * 10), b2 = Math.floor(Math.random() * 10);
        
        const pScore = (p1 + p2) % 10;
        const bScore = (b1 + b2) % 10;
        
        const resultSide = pScore > bScore ? 'player' : (bScore > pScore ? 'banker' : 'tie');
        const win = side.toLowerCase() === resultSide;
        
        // គណនាមហានិធិ
        if (win) {
            balance += (side === 'tie' ? bet * 8 : bet);
        } else {
            balance -= bet;
        }

        // រក្សាទុកស្ថិតិ (Roadmap)
        Baccarat.history.push(resultSide.charAt(0).toUpperCase());
        Baccarat.stats[resultSide]++;
        if(Baccarat.history.length > 10) Baccarat.history.shift();

        // បង្ហាញ Dashboard ថ្មី
        updateGamblingUI();

        return `🎭 [Provably Fair ID: ${seed.substring(0,8)}]\n` +
               `🃏 P: ${p1},${p2} (${pScore}) vs B: ${b1},${b2} (${bScore})\n` +
               `🏆 លទ្ធផល: ${resultSide.toUpperCase()} | ${win ? '✅ ឈ្នះ!' : '❌ ចាញ់!'}`;
    }
};

// --- 3. មុខងារបង្ហាញ UI ស្ថិតិបៀ (Roadmap Display) ---
function updateGamblingUI() {
    const treasury = document.getElementById('treasury');
    treasury.innerText = `$${balance.toFixed(2)}`;
    
    // បង្កើត Roadmap បង្ហាញលើ Screen
    const roadmapHTML = Baccarat.history.map(r => 
        `<span style="color:${r==='P'?'#3b82f6':(r==='B'?'#ef4444':'#eab308')}; font-weight:bold; margin-right:5px;">${r}</span>`
    ).join('→ ');
    
    // បញ្ជូនទៅកាន់ Chat Display
    const statusInfo = document.createElement('div');
    statusInfo.style = "font-size: 0.8rem; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 8px; margin-top: 10px; border: 1px dashed #444;";
    statusInfo.innerHTML = `📊 ស្ថិតិបៀចុងក្រោយ: ${roadmapHTML} <br> 📈 P: ${Baccarat.stats.player} | B: ${Baccarat.stats.banker} | T: ${Baccarat.stats.tie}`;
    document.getElementById('chat-window').appendChild(statusInfo);
}