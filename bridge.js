/**
 * 🌉 HUOKAING THARA: UI BRIDGE (ULTRA-SECURITY EDITION)
 * Purpose: Connects UI to Core-02 TMI & Core-12 Vault
 * Version: 5.1.0
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

    // Internal tracking for Self-Destruct protocol
    let _securityAttempts = 0;
    const _MAX_ATTEMPTS = 3;

    const init = () => {
        Imperial.Logger.log("BRIDGE", "Establishing High-Security TMI Links...");

        // --- 1. LOGIN & OWNER AUTH (Core-10) ---
        UI.btnSystem.addEventListener('click', () => {
            const username = prompt("ENTER OWNER NAME:");
            const pin = prompt("ENTER 4-DIGIT PIN (8888):");
            
            if (Imperial.Auth && Imperial.Auth.login(username, pin)) {
                UI.playerName.innerText = username.toUpperCase();
                UI.displayMessage.innerText = "OWNER AUTHENTICATED";
                // Reset Dead Man's Switch on successful owner login
                if(Imperial.Security) Imperial.Security.resetDeadManSwitch();
            }
        });

        // --- 2. SPIN WITH TMI & FAIL-SAFE (Core-01, 02, 12) ---
        UI.btnSpin.addEventListener('click', () => {
            // First: Check basic Owner Auth (Core-10)
            if (Imperial.Auth && !Imperial.Auth.hasAccess(1)) {
                UI.displayMessage.innerText = "OWNER LOGIN REQUIRED";
                return;
            }

            // Second: Two-Man Integrity Verification (Core-02)
            // Checks the 8-digit backup code (88881688)
            if (Imperial.Security) {
                if (!Imperial.Security.authorizeVaultAccess()) {
                    _securityAttempts++;
                    UI.displayMessage.innerText = `SECURITY DENIED (${_securityAttempts}/${_MAX_ATTEMPTS})`;
                    
                    if (_securityAttempts >= _MAX_ATTEMPTS) {
                        Imperial.Security.triggerPanic("SELF_DESTRUCT_INITIATED");
                        UI.displayMessage.innerText = "VAULT WIPED";
                    }
                    return;
                }
                // Reset attempts on successful verification
                _securityAttempts = 0;
            }

            // Third: Execute Command if Security cleared
            UI.displayMessage.innerText = "ACCESSING VAULT...";
            Imperial.Events.emit('CMD_SPIN');
            
            // Reset Dead Man Switch timer because user is active
            if(Imperial.Security) Imperial.Security.resetDeadManSwitch();
        });

        // --- 3. EMERGENCY PANIC (Manual Trigger) ---
        UI.btnSystem.addEventListener('dblclick', () => {
            if(Imperial.Security) {
                Imperial.Security.triggerPanic("MANUAL_PANIC_ENGAGED");
            }
        });

        // --- 4. HUD & EVENT SYNC ---
        
        // Listen for 230,000 credit updates from Core-12
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
            // Visually "zero out" the credits on panic
            if (UI.displayCredits) UI.displayCredits.innerText = "0.00";
        });

        // Result handling
        Imperial.Events.on('SPIN_COMPLETE', (data) => {
            if (data.winAmount > 0) {
                UI.displayMessage.innerText = `WIN: +${data.winAmount}`;
                UI.displayMessage.style.color = "#ffd700"; // Gold color for wins
            } else {
                UI.displayMessage.innerText = "NO RETURN";
                UI.displayMessage.style.color = "#ffffff";
            }
        });
    };

    window.addEventListener('load', () => {
        if (window.Imperial) {
            init();
            Imperial.Logger.log("SYSTEM", "=== SECURITY BRIDGE V5.1 ONLINE ===");
        }
    });

})(window.Imperial);
