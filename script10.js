/**
 * 👑 SINGULARITY IMPERIAL CORE v10.0
 * Feature: European Roulette Engine
 */

(function() {
    // 1. ការកំណត់ពណ៌ និងលេខសម្រាប់ European Roulette
    const ROULETTE_NUMBERS = [
        {n: 0, c: 'green'}, {n: 32, c: 'red'}, {n: 15, c: 'black'}, {n: 19, c: 'red'}, {n: 4, c: 'black'},
        {n: 21, c: 'red'}, {n: 2, c: 'black'}, {n: 25, c: 'red'}, {n: 17, c: 'black'}, {n: 34, c: 'red'},
        {n: 6, c: 'black'}, {n: 27, c: 'red'}, {n: 13, c: 'black'}, {n: 36, c: 'red'}, {n: 11, c: 'black'},
        {n: 30, c: 'red'}, {n: 8, c: 'black'}, {n: 23, c: 'red'}, {n: 10, c: 'black'}, {n: 5, c: 'red'},
        {n: 24, c: 'black'}, {n: 16, c: 'red'}, {n: 33, c: 'black'}, {n: 1, c: 'red'}, {n: 20, c: 'black'},
        {n: 14, c: 'red'}, {n: 31, c: 'black'}, {n: 9, c: 'red'}, {n: 22, c: 'black'}, {n: 18, c: 'red'},
        {n: 29, c: 'black'}, {n: 7, c: 'red'}, {n: 28, c: 'black'}, {n: 12, c: 'red'}, {n: 35, c: 'black'},
        {n: 3, c: 'red'}, {n: 26, c: 'black'}
    ];

    // 2. ម៉ាស៊ីន Roulette (Roulette Engine)
    const Roulette = {
        spin: (betAmount, type, value) => {
            if (betAmount > balance) return "❌ មហានិធិមិនគ្រប់គ្រាន់!";
            
            // បង្វិលរកលទ្ធផល (Random 0-36)
            const result = ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)];
            let win = false;
            let multiplier = 0;

            // Logic គណនាការឈ្នះ
            if (type === 'number' && parseInt(value) === result.n) {
                win = true; multiplier = 35; // ឈ្នះលេខចំ សង ៣៥ ដង
            } else if (type === 'color' && value.toLowerCase() === result.c) {
                win = true; multiplier = 1; // ឈ្នះពណ៌ សង ១ ដង
            } else if (type === 'parity') {
                const isEven = result.n % 2 === 0 && result.n !== 0;
                if ((value === 'even' && isEven) || (value === 'odd' && !isEven && result.n !== 0)) {
                    win = true; multiplier = 1; // ឈ្នះ គូ/សេស សង ១ ដង
                }
            }

            if (win) {
                const prize = betAmount * multiplier;
                balance += prize;
                updateAnalytics(true, prize, 'roulette');
            } else {
                balance -= betAmount;
                updateAnalytics(false, betAmount, 'roulette');
            }

            document.getElementById('balanceDisplay').innerText = `$${balance.toFixed(2)}`;
            
            return `🎡 កង់វិលឈប់ត្រង់លេខ: <b style="color:${result.c}">${result.n} (${result.c.toUpperCase()})</b><br>` +
                   `${win ? '✅ អបអរសាទរ! ឈ្នះ: $' + (betAmount * multiplier) : '❌ មិនបានជោគជ័យទេលើកនេះ'} <br>` +
                   `សមតុល្យបច្ចុប្បន្ន: $${balance.toFixed(2)}`;
        }
    };

    // 3. ការកែសម្រួលមុខងារ Execute ដើម្បីទទួលបញ្ជា Roulette
    async function execute() {
        const input = document.getElementById('userInput');
        const val = input.value.trim().toLowerCase();
        if(!val) return;
        append('user', val);
        input.value = '';

        let reply;
        if(val.includes("បាការ៉ាត់")) {
            const p = val.split(" ");
            reply = Game.play(parseInt(p[1]) || 10, p[2] || 'player');
        } 
        else if(val.includes("រ៉ូឡែត")) {
            // បញ្ជា៖ "រ៉ូឡែត 50 color red" ឬ "រ៉ូឡែត 10 number 17"
            const p = val.split(" ");
            const amount = parseInt(p[1]) || 10;
            const type = p[2]; // number, color, parity
            const target = p[3];
            reply = Roulette.spin(amount, type, target);
        }
        else {
            reply = await askAI(val);
        }
        append('bot', reply);
        speak(reply);
    }

    // 4. CSS បន្ថែមសម្រាប់ Roulette Table (Visual Feedback)
    const style = document.createElement('style');
    style.textContent = `
        .roulette-board { display: flex; flex-wrap: wrap; width: 100%; max-width: 400px; margin-top: 10px; border: 1px solid #444; }
        .r-cell { width: 40px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; border: 0.5px solid #222; }
    `;
    document.head.appendChild(style);

    // (Logic ផ្សេងៗទៀតរក្សានៅដដែល)
})();