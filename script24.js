/**
 * 👑 SINGULARITY IMPERIAL CORE v22.0
 * Feature: Virtual Wallet & Digital Cash Integration (FinTech Style)
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់កាត Virtual Card បែបទំនើប
    const style = document.createElement('style');
    style.textContent = `
        .virtual-card {
            width: 320px; height: 190px;
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.2);
            border-radius: 20px; padding: 20px; position: relative;
            box-shadow: 0 15px 35px rgba(0,0,0,0.5); overflow: hidden;
            margin: 20px auto; transition: 0.3s;
        }
        .virtual-card:hover { transform: translateY(-5px); border-color: var(--gold); }
        .card-chip { width: 45px; height: 35px; background: linear-gradient(90deg, #d4af37, #f1c40f); border-radius: 5px; margin-bottom: 20px; }
        .card-number { font-size: 1.2rem; letter-spacing: 3px; font-family: 'OCR A Std', monospace; color: white; }
        .wallet-stats { display: flex; justify-content: space-around; margin-top: 20px; }
        .digital-cash-badge {
            background: var(--gold); color: black; padding: 2px 8px;
            border-radius: 5px; font-weight: bold; font-size: 0.7rem;
        }
    `;
    document.head.appendChild(style);

    // 2. មុខងារបង្ហាញ Virtual Wallet (Digital Cash Interface)
    window.showImperialWallet = function() {
        const walletOverlay = document.createElement('div');
        walletOverlay.id = 'wallet-interface';
        walletOverlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9000; display:flex; align-items:center; justify-content:center; flex-direction:column;";
        
        walletOverlay.innerHTML = `
            <div style="text-align:center; margin-bottom:20px;">
                <h2 style="color:var(--gold);">IMPERIAL DIGITAL WALLET</h2>
                <p style="font-size:0.8rem; color:#94a3b8;">SECURE VIRTUAL ASSETS</p>
            </div>
            
            <div class="virtual-card">
                <div style="display:flex; justify-content:space-between;">
                    <div class="card-chip"></div>
                    <div style="font-style:italic; font-weight:bold; color:rgba(255,255,255,0.5);">PLATINUM</div>
                </div>
                <div class="card-number">**** **** **** 8888</div>
                <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:flex-end;">
                    <div>
                        <div style="font-size:0.6rem; color:#94a3b8;">CARD HOLDER</div>
                        <div style="font-size:0.9rem;">${IMPERIAL_NAME.toUpperCase()}</div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-size:0.6rem; color:#94a3b8;">DIGITAL CASH</div>
                        <div style="font-size:1.1rem; color:var(--gold); font-weight:bold;">$${balance.toFixed(2)}</div>
                    </div>
                </div>
            </div>

            <div style="width:320px; display:flex; gap:10px;">
                <button onclick="depositDigital()" style="flex:1; padding:12px; border-radius:10px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer;">TOP UP</button>
                <button onclick="document.body.removeChild(document.getElementById('wallet-interface'))" style="flex:1; padding:12px; border-radius:10px; border:none; background:#334155; color:white; font-weight:bold; cursor:pointer;">CLOSE</button>
            </div>
        `;
        document.body.appendChild(walletOverlay);
        speak("កំពុងបើកកាបូបលុយឌីជីថលអធិរាជ។");
    };

    // 3. មុខងារ Top Up (Simulated Digital Transaction)
    window.depositDigital = function() {
        const amount = prompt("សូមបញ្ចូលចំនួនទឹកប្រាក់ដែលត្រូវបញ្ចូលក្នុង Virtual Wallet ($):");
        if (amount && !isNaN(amount)) {
            balance += parseFloat(amount);
            document.getElementById('balanceDisplay').innerText = `$${balance.toFixed(2)}`;
            speak(`បានបញ្ចូលទឹកប្រាក់ចំនួន ${amount} ដុល្លារ ទៅក្នុងកាបូបលុយឌីជីថលដោយជោគជ័យ។`);
            document.body.removeChild(document.getElementById('wallet-interface'));
            showImperialWallet();
        }
    };

})();