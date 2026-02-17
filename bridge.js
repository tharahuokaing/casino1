/**
 * ⚡ HUOKAING THARA: REVISED BRIDGE
 * Ensures buttons talk to the Imperial Cores correctly.
 */
window.addEventListener('load', () => {
    const btnSpin = document.getElementById('btn-spin');
    const btnVault = document.getElementById('btn-vault');
    const statusText = document.querySelector('#message-pod h2');

    if (btnSpin) {
        btnSpin.onclick = () => {
            // Check if Core00 is actually ready
            if (window.Imperial) {
                statusText.innerText = "INITIATING SPIN...";
                statusText.classList.add('flicker'); // Visual effect
                
                // Signal Core-01 to start RNG
                Imperial.Events.emit('CMD_SPIN');
            } else {
                console.error("Imperial Kernel Not Found!");
            }
        };
    }

    // Listen for when the spin finishes (from Core-01)
    if (window.Imperial) {
        Imperial.Events.on('SPIN_COMPLETE', (data) => {
            statusText.innerText = data.winAmount > 0 
                ? `WIN: ${data.winAmount} CREDITS` 
                : "TRY AGAIN, CITIZEN";
        });
    }
});
