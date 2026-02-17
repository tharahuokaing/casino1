/**
 * 🌉 HUOKAING THARA: UI BRIDGE
 * Purpose: Connects HTML Interface to Core Imperial Logic
 * Version: 4.2.0
 */

(function(Imperial) {
    // 1. DOM Element Cache
    const UI = {
        btnSpin: document.getElementById('btn-spin'),
        btnVault: document.getElementById('btn-vault'),
        btnSystem: document.getElementById('btn-menu'),
        displayCredits: document.getElementById('credit-count'),
        displayMessage: document.querySelector('#message-pod h2'),
        playerName: document.getElementById('player-name')
    };

    /**
     * INITIALIZE BRIDGE CONNECTIONS
     */
    const init = () => {
        Imperial.Logger.log("BRIDGE", "Connecting UI to Imperial Cores...");

        // --- AUTHENTICATION (Core-10) ---
        UI.btnSystem.addEventListener('click', () => {
            const username = prompt("ENTER CITIZEN NAME:");
            const pin = prompt("ENTER SECURITY PIN:");
            
            if (Imperial.Auth && Imperial.Auth.login(username, pin)) {
                UI.playerName.innerText = username.toUpperCase();
                UI.displayMessage.innerText = "ACCESS GRANTED";
            }
        });

        // --- SPIN LOGIC (Core-01 + Core-12) ---
        UI.btnSpin.addEventListener('click', () => {
            // Check clearance first via Core-10
            if (Imperial.Auth && !Imperial.Auth.hasAccess(1)) {
                UI.displayMessage.innerText = "AUTHENTICATION REQUIRED";
                return;
            }

            // Trigger Spin Command
            UI.displayMessage.innerText = "COMMAND SENT...";
            Imperial.Events.emit('CMD_SPIN');
        });

        // --- LOCALIZATION (Core-11) ---
        UI.btnVault.addEventListener('click', () => {
            // Toggle Language between English and Khmer
            if (Imperial.Locale) {
                const newLang = Imperial.Locale.getCurrentLang() === 'en' ? 'kh' : 'en';
                Imperial.Locale.setLanguage(newLang);
                
                // Update specific HUD labels manually if data-i18n isn't used
                UI.displayMessage.innerText = Imperial.Locale.t('welcome');
            }
        });

        // --- GLOBAL EVENT LISTENERS ---
        
        // Listen for balance updates from Core-12
        Imperial.Events.on('BALANCE_UPDATE', (newBalance) => {
            if (UI.displayCredits) {
                UI.displayCredits.innerText = newBalance.toLocaleString('en-US', { 
                    minimumFractionDigits: 2 
                });
            }
        });

        // Listen for Spin Results from Core-01
        Imperial.Events.on('SPIN_COMPLETE', (data) => {
            if (data.winAmount > 0) {
                UI.displayMessage.className = "glow-text win-pulse";
                UI.displayMessage.innerText = `WIN: +${data.winAmount}`;
            } else {
                UI.displayMessage.innerText = "TRY AGAIN, CITIZEN";
            }
        });
    };

    // Ensure all Cores are registered before booting Bridge
    window.addEventListener('load', () => {
        if (window.Imperial) {
            init();
            Imperial.Logger.log("SYSTEM", "=== IMPERIAL INTERFACE V4 ONLINE ===");
        }
    });

})(window.Imperial);
