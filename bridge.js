/**
 * 🌉 HUOKAING THARA: UI BRIDGE (ULTRA-SECURITY EDITION)
 * Purpose: Connects UI to Core-02 TMI, Core-12 Vault & Core-100 Recovery
 * Version: 5.2.0
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

    let _securityAttempts = 0;
    const _MAX_ATTEMPTS = 3;

    const init = () => {
        Imperial.Logger.log("BRIDGE", "Establishing High-Security TMI & Recovery Links...");

        // --- 1. OWNER AUTHENTICATION ---
        UI.btnSystem.addEventListener('click', () => {
            const username = prompt("ENTER OWNER NAME:");
            const pin = prompt("ENTER 4-DIGIT PIN (8888):");
            
            if (Imperial.Auth && Imperial.Auth.login(username, pin)) {
                UI.playerName.innerText = username.toUpperCase();
                UI.displayMessage.innerText = "OWNER AUTHENTICATED";
                if(Imperial.Security) Imperial.Security.resetDeadManSwitch();
            }
        });

        // --- 2. SPIN COMMAND (TMI PROTECTED) ---
        UI.btnSpin.addEventListener('click', () => {
            if (Imperial.Auth && !Imperial.Auth.hasAccess(1)) {
                UI.displayMessage.innerText = "OWNER LOGIN REQUIRED";
                return;
            }

            if (Imperial.Security) {
                if (!Imperial.Security.authorizeVaultAccess()) {
                    _securityAttempts++;
                    UI.displayMessage.innerText = `SECURITY DENIED (${_securityAttempts}/${_MAX_ATTEMPTS})`;
                    
                    if (_securityAttempts >= _MAX_ATTEMPTS) {
                        Imperial.Security.triggerPanic("SELF_DESTRUCT_INITIATED");
                    }
                    return;
                }
                _securityAttempts = 0;
            }

            UI.displayMessage.innerText = "ACCESSING VAULT...";
            Imperial.Events.emit('CMD_SPIN');
            if(Imperial.Security) Imperial.Security.resetDeadManSwitch();
        });

        // --- 3. MANUAL PANIC TRIGGER ---
        UI.btnSystem.addEventListener('dblclick', () => {
            if(Imperial.Security) Imperial.Security.triggerPanic("MANUAL_PANIC_ENGAGED");
        });

        // --- 4. HUD & SECURITY EVENT LISTENERS ---
        
        // Listen for balance updates
        Imperial.Events.on('BALANCE_UPDATE', (newBalance) => {
            if (UI.displayCredits) {
                UI.displayCredits.innerText = newBalance.toLocaleString('en-US', { 
                    minimumFractionDigits: 2 
                });
            }
        });

        // Listen for Security Panic (Lockdown)
        Imperial.Events.on('SYSTEM_PANIC', (reason) => {
            UI.displayMessage.innerText = `LOCKED: ${reason}`;
            UI.displayMessage.style.color = "#ff0000";
            UI.displayMessage.classList.add("panic-blink");
            if (UI.displayCredits) UI.displayCredits.innerText = "0.00";
        });

        // ⭐ NEW: Listen for Emergency Restore (Core-100 Override)
        Imperial.Events.on('SYSTEM_RESTORED', () => {
            UI.displayMessage.innerText = "SYSTEM RESTORED";
            UI.displayMessage.style.color = "#00ff00";
            UI.displayMessage.classList.remove("panic-blink");
            _securityAttempts = 0; // Reset fail counter
            
            // Re-sync balance display from Core-12
            if (Imperial.Assets) Imperial.Assets.syncBalance(); 
        });

        // Result handling
        Imperial.Events.on('SPIN_COMPLETE', (data) => {
            if (data.winAmount > 0) {
                UI.displayMessage.innerText = `WIN: +${data.winAmount}`;
                UI.displayMessage.style.color = "#ffd700";
            } else {
                UI.displayMessage.innerText = "NO RETURN";
                UI.displayMessage.style.color = "#ffffff";
            }
        });
    };

    window.addEventListener('load', () => {
        if (window.Imperial) {
            init();
            Imperial.Logger.log("SYSTEM", "=== SECURITY BRIDGE V5.2 ONLINE ===");
        }
    });

})(window.Imperial);
