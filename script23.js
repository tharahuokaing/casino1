/**
 * 👑 SINGULARITY IMPERIAL CORE v21.0
 * Feature: Auto-Portfolio Tracker (Total Wealth Management)
 */

(function() {
    // 1. បង្កើត Database សម្រាប់ Portfolio
    let portfolio = JSON.parse(localStorage.getItem('imperial_portfolio')) || {
        cash: 220.00,
        gold_oz: 0,
        btc_units: 0
    };

    // 2. CSS សម្រាប់ផ្ទាំង Portfolio
    const style = document.createElement('style');
    style.textContent = `
        #portfolio-panel {
            position: fixed; top: 15%; right: 20px; width: 300px;
            background: rgba(15, 23, 42, 0.95); border: 2px solid var(--gold);
            border-radius: 15px; padding: 20px; z-index: 8000; display: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .asset-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #334155; padding-bottom: 5px; }
        .net-worth { font-size: 1.4rem; color: #10b981; text-align: center; margin-top: 15px; text-shadow: 0 0 10px #10b981; }
    `;
    document.head.appendChild(style);

    // 3. មុខងារគណនាទ្រព្យសម្បត្តិសរុប (Net Worth Calculator)
    window.updatePortfolioUI = async function() {
        // ទាញតម្លៃទីផ្សារបច្ចុប្បន្នពី UI Ticker (ឬ API)
        const goldPrice = parseFloat(document.getElementById('goldPrice').innerText.replace('$', '')) || 2000;
        const btcPrice = parseFloat(document.getElementById('btcPrice').innerText.replace('$', '').replace(',', '')) || 40000;

        const goldValue = portfolio.gold_oz * goldPrice;
        const btcValue = portfolio.btc_units * btcPrice;
        const totalNetWorth = portfolio.cash + goldValue + btcValue;

        const panel = document.getElementById('portfolio-panel');
        panel.innerHTML = `
            <h3 style="color:var(--gold); margin-top:0;">🏦 កាបូបលុយអធិរាជ</h3>
            <div class="asset-row"><span>💵 សាច់ប្រាក់:</span> <span>$${portfolio.cash.toFixed(2)}</span></div>
            <div class="asset-row"><span>🌕 មាស:</span> <span>${portfolio.gold_oz} oz ($${goldValue.toFixed(2)})</span></div>
            <div class="asset-row"><span>₿ Bitcoin:</span> <span>${portfolio.btc_units} BTC ($${btcValue.toFixed(2)})</span></div>
            <div class="net-worth">
                <div style="font-size:0.8rem; color:#94a3b8;">ទ្រព្យសម្បត្តិសរុប (Net Worth)</div>
                $${totalNetWorth.toLocaleString()}
            </div>
            <button onclick="this.parentElement.style.display='none'" style="width:100%; margin-top:15px; background:transparent; border:1px solid #334155; color:white; cursor:pointer;">បិទ</button>
        `;
        
        localStorage.setItem('imperial_portfolio', JSON.stringify(portfolio));
    };

    // 4. មុខងារទិញទ្រព្យសម្បត្តិ (Simulated Transaction)
    window.buyAsset = function(type, amountUSD) {
        if (amountUSD > portfolio.cash) return speak("មហានិធិមិនគ្រប់គ្រាន់សម្រាប់ប្រតិបត្តិការនេះទេ។");

        const goldPrice = 2000; // តម្លៃគោល
        const btcPrice = 45000; 

        portfolio.cash -= amountUSD;
        if (type === 'gold') portfolio.gold_oz += (amountUSD / goldPrice);
        if (type === 'btc') portfolio.btc_units += (amountUSD / btcPrice);

        updatePortfolioUI();
        speak(`ប្រតិបត្តិការជោគជ័យ។ ព្រះអង្គបានប្តូរ ${amountUSD} ដុល្លារ ទៅជាទ្រព្យសកម្មថ្មី។`);
    };

    // ចាក់បញ្ចូល HTML Panel
    const panelDiv = document.createElement('div');
    panelDiv.id = 'portfolio-panel';
    document.body.appendChild(panelDiv);

})();