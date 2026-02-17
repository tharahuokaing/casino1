/**
 * 🌉 HUOKAING THARA: UI BRIDGE (ULTRA-SECURITY EDITION)
 * Purpose: Connects UI to Core-02 TMI & Core-12 Vault
 * Version: 5.0.0
 */

(function(Imperial) {
    const UI = {
        btnSpin: document.getElementById('btn-spin'),
        btnVault: document.getElementById('btn-vault'),
        btnSystem: document.getElementById('btn-menu'),
        displayCredits: document.getElementById('credit-count'),
        displayMessage: document.querySelector('#message-pod h2'),
        playerName: document.getElementById('player-name')
    };

    const init = () => {
        Imperial.Logger.log("BRIDGE", "Establishing High-Security Links...");

        // --- 1. LOGIN & PANIC (Core-10 & Core-02) ---
        UI.btnSystem.addEventListener('click', () => {
            const username = prompt("ENTER COMMANDER NAME:");
            const pin = prompt("ENTER 4-DIGIT PIN (8888):");
            
            if (Imperial.Auth && Imperial.Auth.login(username, pin)) {
                UI.playerName.innerText = username.toUpperCase();
                UI.displayMessage.innerText = "COMMANDER AUTHENTICATED";
                // Reset Dead Man's Switch on successful login
                if(Imperial.Security) Imperial.Security.resetDeadManSwitch();
            }
        });

        // --- 2. SPIN WITH TMI VERIFICATION (Core-01, 02, 12) ---
        UI.btnSpin.addEventListener('click', () => {
            // First: Check basic Auth (Core-10)
            if (Imperial.Auth && !Imperial.Auth.hasAccess(1)) {
                UI.displayMessage.innerText = "LOGIN REQUIRED";
                return;
            }

            // Second: Two-Man Integrity Verification (Core-02)
            // This triggers the 8-digit backup code prompt
            if (Imperial.Security && !Imperial.Security.authorizeVaultAccess()) {
                UI.displayMessage.innerText = "SECURITY INTERCEPTED";
                return;
            }

            // Third: Execute Command
            UI.displayMessage.innerText = "ACCESSING VAULT...";
            Imperial.Events.emit('CMD_SPIN');
            
            // Reset Dead Man Switch timer because user is active
            if(Imperial.Security) Imperial.Security.resetDeadManSwitch();
        });

        // --- 3. PANIC BUTTON (Hidden/Double Click System) ---
        // Double-clicking the "System" button triggers immediate Panic Mode
        UI.btnSystem.addEventListener('dblclick', () => {
            if(Imperial.Security) Imperial.Security.triggerPanic("MANUAL_PANIC_TRIGGERED");
        });

        // --- 4. HUD UPDATES ---
        
        // Update balance display from Core-12
        Imperial.Events.on('BALANCE_UPDATE', (newBalance) => {
            if (UI.displayCredits) {
                UI.displayCredits.innerText = newBalance.toLocaleString('en-US', { 
                    minimumFractionDigits: 2 
                });
            }
        });

        // Handle System Panic visual changes
        Imperial.Events.on('SYSTEM_PANIC', (reason) => {
            UI.displayMessage.innerText = `LOCKED: ${reason}`;
            UI.displayMessage.style.color = "#ff0000";
            UI.displayMessage.classList.add("panic-blink");
        });

        // Result handling
        Imperial.Events.on('SPIN_COMPLETE', (data) => {
            if (data.winAmount > 0) {
                UI.displayMessage.innerText = `WIN: +${data.winAmount}`;
            } else {
                UI.displayMessage.innerText = "NO RETURN";
            }
        });
    };

    window.addEventListener('load', () => {
        if (window.Imperial) {
            init();
            Imperial.Logger.log("SYSTEM", "=== SECURITY BRIDGE ONLINE ===");
        }
    });

})(window.Imperial);
