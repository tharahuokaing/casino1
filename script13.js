/**
 * 👑 SINGULARITY IMPERIAL CORE v11.0
 * Feature: Imperial Slots Machine (Jackpot System)
 */

(function() {
    // 1. កំណត់និមិត្តសញ្ញា និងតម្លៃមេគុណ (Payout Table)
    const SLOT_SYMBOLS = ['🍒', '🔔', '💎', '🍋', '👑'];
    const PAYOUTS = {
        '👑': 50, // Jackpot: សង ៥០ ដង
        '💎': 20, // Diamond: សង ២០ ដង
        '🔔': 10, // Bell: សង ១០ ដង
        '🍒': 5,  // Cherry: សង ៥ ដង
        '🍋': 2   // Lemon: សង ២ ដង
    };

    // 2. ម៉ាស៊ីនស្លត (Slots Engine)
    const Slots = {
        spin: (betAmount) => {
            if (betAmount > balance) return "❌ មហានិធិមិនគ្រប់គ្រាន់!";
            
            balance -= betAmount; // ដកប្រាក់ភ្នាល់សិន
            
            // បង្វិលរកនិមិត្តសញ្ញា ៣ ខ្ទង់
            const reel1 = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
            const reel2 = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
            const reel3 = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];

            let resultMsg = "";
            let winAmount = 0;

            // ពិនិត្យលទ្ធផល
            if (reel1 === reel2 && reel2 === reel3) {
                // ឈ្នះ Jackpot (ដូចគ្នាទាំង ៣)
                winAmount = betAmount * PAYOUTS[reel1];
                balance += winAmount;
                resultMsg = `🎊 <b>JACKPOT!</b> ព្រះអង្គឈ្នះមហាឡាប $${winAmount}`;
                updateAnalytics(true, winAmount, 'slots');
            } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
                // ឈ្នះរង្វាន់លួងចិត្ត (ដូចគ្នា ២)
                winAmount = betAmount * 1.5;
                balance += winAmount;
                resultMsg = `✨ ឈ្នះរង្វាន់តូច $${winAmount}`;
                updateAnalytics(true, winAmount, 'slots');
            } else {
                resultMsg = "❌ មិនមានសំណាងទេលើកនេះ!";
                updateAnalytics(false, betAmount, 'slots');
            }

            document.getElementById('balanceDisplay').innerText = `$${balance.toFixed(2)}`;
            
            return `
                <div style="font-size: 2rem; background: #000; padding: 10px; border-radius: 10px; margin: 10px 0; border: 2px gold solid;">
                    [ ${reel1} | ${reel2} | ${reel3} ]
                </div>
                ${resultMsg} <br>
                សមតុល្យបច្ចុប្បន្ន: $${balance.toFixed(2)}
            `;
        }
    };

    // 3. កែសម្រួលមុខងារ Execute ឱ្យទទួលបញ្ជា "ស្លត"
    const originalExecute = window.execute; // រក្សាមុខងារចាស់
    window.execute = async function() {
        const input = document.getElementById('userInput');
        const val = input.value.trim().toLowerCase();
        if(!val) return;

        if (val.includes("ស្លត")) {
            append('user', val);
            const p = val.split(" ");
            const amount = parseInt(p[1]) || 10;
            const result = Slots.spin(amount);
            append('bot', result);
            input.value = '';
            // បើឈ្នះធំ ឱ្យ AI និយាយអបអរសាទរ
            if(result.includes("JACKPOT")) speak("អបអរសាទរអង្គអធិរាជ! ព្រះអង្គឈ្នះមហាជោគជ័យក្នុងល្បែងស្លត។");
            return;
        }
        
        // បើមិនមែនបញ្ជាស្លត ឱ្យទៅដំណើរការកូដចាស់ (AI/Baccarat/Roulette)
        // (ចំណាំ៖ ក្នុង File ជាក់ស្តែង ព្រះអង្គគ្រាន់តែបន្ថែម if else ក្នុង execute function តែមួយ)
    };

})();