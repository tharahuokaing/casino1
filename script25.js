/**
 * 👑 SINGULARITY IMPERIAL CORE v23.0
 * Feature: NFC Contactless Simulation (Digital Tap-to-Pay)
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់ចលនា NFC Radar
    const style = document.createElement('style');
    style.textContent = `
        .nfc-container {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); z-index: 10000; flex-direction: column;
            align-items: center; justify-content: center; backdrop-filter: blur(10px);
        }
        .nfc-ring {
            width: 150px; height: 150px; border-radius: 50%;
            border: 4px solid var(--accent); position: relative;
            display: flex; align-items: center; justify-content: center;
        }
        .nfc-wave {
            position: absolute; width: 100%; height: 100%;
            border: 2px solid var(--accent); border-radius: 50%;
            animation: nfc-pulse 2s infinite; opacity: 0;
        }
        @keyframes nfc-pulse {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(2); opacity: 0; }
        }
        .nfc-icon { font-size: 50px; color: white; filter: drop-shadow(0 0 10px var(--accent)); }
    `;
    document.head.appendChild(style);

    // 2. មុខងារដំណើរការ NFC (NFC Processing)
    window.activateNFC = function(actionType, amount) {
        const nfcDiv = document.createElement('div');
        nfcDiv.className = 'nfc-container';
        nfcDiv.id = 'nfc-screen';
        nfcDiv.innerHTML = `
            <div class="nfc-ring">
                <div class="nfc-wave"></div>
                <div class="nfc-wave" style="animation-delay: 0.5s"></div>
                <div class="nfc-icon">📱</div>
            </div>
            <h2 style="color:var(--gold); margin-top:40px;">HOLD PHONE NEAR READER</h2>
            <p style="color:#94a3b8;">NFC Simulation Active...</p>
        `;
        document.body.appendChild(nfcDiv);
        nfcDiv.style.display = 'flex';
        
        speak("សូមដាក់ទូរស័ព្ទរបស់ព្រះអង្គនៅជិតឧបករណ៍ស្កេន។");

        // បន្លំការស្កេនរយៈពេល ២.៥ វិនាទី
        setTimeout(() => {
            // សំឡេង Beep ជោគជ័យ
            const beep = new Audio('https://www.soundjay.com/buttons/button-37.mp3');
            beep.play();

            if(actionType === 'payment') {
                balance -= amount;
                speak(`ទូទាត់ប្រាក់ចំនួន ${amount} ដុល្លារតាម NFC រួចរាល់។`);
            } else {
                balance += amount;
                speak(`បញ្ចូលមហានិធិចំនួន ${amount} ដុល្លារតាម NFC ជោគជ័យ។`);
            }

            document.getElementById('balanceDisplay').innerText = `$${balance.toFixed(2)}`;
            nfcDiv.innerHTML = `<h1 style="color:#10b981;">✅ SUCCESSFUL</h1>`;
            
            setTimeout(() => {
                document.body.removeChild(nfcDiv);
            }, 1000);
        }, 3000);
    };

})();