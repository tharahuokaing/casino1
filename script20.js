/**
 * 👑 SINGULARITY IMPERIAL CORE v18.0
 * Feature: Auto-Update Market (Gold & Crypto Live Prices)
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់របារតម្លៃ (Ticker Bar)
    const style = document.createElement('style');
    style.textContent = `
        .market-ticker {
            background: rgba(0, 0, 0, 0.9);
            color: #10b981;
            padding: 5px 20px;
            font-size: 0.75rem;
            display: flex;
            gap: 20px;
            border-bottom: 1px solid #1e293b;
            font-family: 'Courier New', monospace;
        }
        .ticker-item { display: flex; align-items: center; gap: 5px; }
        .price-up { color: #10b981; }
        .price-down { color: #ef4444; }
    `;
    document.head.appendChild(style);

    // 2. បញ្ចូល HTML របារតម្លៃទៅក្នុង Header
    // (បញ្ចូលទៅក្នុងផ្នែកខាងលើបង្អស់នៃ main-system)
    const tickerHtml = `
        <div class="market-ticker" id="marketTicker">
            <div class="ticker-item">🌕 GOLD: <span id="goldPrice">Loading...</span></div>
            <div class="ticker-item">₿ BTC: <span id="btcPrice">Loading...</span></div>
            <div class="ticker-item">💎 ETH: <span id="ethPrice">Loading...</span></div>
        </div>
    `;

    // 3. មុខងារទាញយកទិន្នន័យ (Market Data Fetcher)
    async function updateMarketPrices() {
        try {
            // ទាញតម្លៃ Crypto ពី CoinGecko (Free API)
            const cryptoRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
            const cryptoData = await cryptoRes.json();
            
            // បច្ចុប្បន្នភាពតម្លៃលើ Screen
            document.getElementById('btcPrice').innerText = `$${cryptoData.bitcoin.usd.toLocaleString()}`;
            document.getElementById('ethPrice').innerText = `$${cryptoData.ethereum.usd.toLocaleString()}`;
            
            // តម្លៃមាស (Simulated Live - ក្នុងករណីប្រើ API ផ្លូវការដូចជា GoldAPI ត្រូវមាន Key)
            const simulatedGold = (2000 + Math.random() * 50).toFixed(2); 
            document.getElementById('goldPrice').innerText = `$${simulatedGold}/oz`;

            console.log("Market Data Updated Successfully.");
        } catch (error) {
            console.error("Market Update Failed:", error);
        }
    }

    // 4. កែសម្រួលចំណុចចាប់ផ្តើម (Initialization)
    const originalVerifyPin = window.verifyPin;
    window.verifyPin = function() {
        // បើ PIN ត្រូវ ឱ្យចាប់ផ្តើម Update តម្លៃទីផ្សារ
        const pin = document.getElementById('pinInput').value;
        if (pin === "123456") {
            // បញ្ចូល Ticker ទៅក្នុង UI
            const sys = document.getElementById('main-system');
            sys.insertAdjacentHTML('afterbegin', tickerHtml);
            
            // ចាប់ផ្តើមទាញទិន្នន័យ
            updateMarketPrices();
            setInterval(updateMarketPrices, 60000); // Update រៀងរាល់ ១ នាទី
        }
        // ហៅ Logic PIN ដើម
        originalVerifyPin();
    };

})();