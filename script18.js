/**
 * 👑 SINGULARITY IMPERIAL CORE v17.0
 * Feature: Ghost Mode (Privacy Shield)
 */

(function() {
    // 1. បន្ថែម State សម្រាប់ Ghost Mode
    let isGhostMode = false;
    const realBalance = 220.00; // តួអក្សរតំណាងសមតុល្យពិត

    // 2. បន្ថែម CSS សម្រាប់ Ghost Mode UI
    const style = document.createElement('style');
    style.textContent = `
        .ghost-active {
            filter: blur(4px);
            user-select: none;
            color: #475569 !important;
        }
        .eye-toggle {
            cursor: pointer;
            margin-left: 10px;
            font-size: 1.1rem;
            transition: transform 0.3s;
        }
        .eye-toggle:hover { transform: scale(1.2); }
    `;
    document.head.appendChild(style);

    // 3. មុខងារផ្លាស់ប្តូររបៀបលាក់ដាន (Toggle Ghost Mode)
    window.toggleGhostMode = function() {
        isGhostMode = !isGhostMode;
        const balanceDisplay = document.getElementById('balanceDisplay');
        const eyeBtn = document.getElementById('eyeBtn');
        const status = document.getElementById('vault-status');

        if (isGhostMode) {
            // បើករបៀបលាក់ដាន
            balanceDisplay.innerText = "$*,***.**";
            balanceDisplay.classList.add('ghost-active');
            eyeBtn.innerHTML = "👁️‍🗨️"; // ភ្នែកបិទ
            status.innerText = "Security Level: GHOST MODE ACTIVE";
            status.style.color = "#94a3b8";
            speak("របៀបលាក់ដានត្រូវបានបើក។");
        } else {
            // បិទរបៀបលាក់ដាន
            balanceDisplay.innerText = `$${balance.toFixed(2)}`;
            balanceDisplay.classList.remove('ghost-active');
            eyeBtn.innerHTML = "👁️"; // ភ្នែកបើក
            status.innerText = "Security Level: ROYAL ACCESS";
            status.style.color = "var(--gold)";
            speak("របៀបលាក់ដានត្រូវបានបិទ។");
        }
    };

    // 4. ចាក់បញ្ចូលប៊ូតុងទៅក្នុង Dashboard
    // ព្រះអង្គត្រូវបន្ថែម <span id="eyeBtn" class="eye-toggle" onclick="toggleGhostMode()">👁️</span> 
    // ទៅក្បែរ balanceDisplay ក្នុង HTML Structure របស់ព្រះអង្គ។

    // 5. កែសម្រួល Game Engine ដើម្បីគោរព Ghost Mode
    const originalUpdateUI = window.updateAnalytics;
    window.updateAnalytics = function(win, amount, type) {
        // ប្រសិនបើកំពុងស្ថិតក្នុង Ghost Mode វានឹងមិនបង្ហាញចំនួនឈ្នះពិតលើ Screen ឡើយ
        if (isGhostMode) {
            console.log("Analytics updated in background.");
        } else {
            // ដំណើរការ Update UI ធម្មតា
            // ... (កូដចាស់) ...
        }
    };

})();