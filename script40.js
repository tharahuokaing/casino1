/**
 * 👑 HUOKAING THARA - GUARDIAN UPLOAD SYSTEM v39.0
 * Feature: Local Image Upload & Terminal Overlay
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់ Terminal Overlay (លេខកូដរត់)
    const style = document.createElement('style');
    style.textContent = `
        .terminal-overlay {
            position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(rgba(0,0,0,0) 50%, rgba(0,255,255,0.1) 50%);
            background-size: 100% 4px; z-index: 2; opacity: 0.3;
        }
        .matrix-text {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            font-family: monospace; font-size: 8px; color: var(--accent);
            overflow: hidden; white-space: nowrap; z-index: 1;
        }
        .upload-btn {
            background: var(--accent); color: white; border: none;
            padding: 10px 15px; border-radius: 5px; cursor: pointer;
            font-size: 0.7rem; margin-top: 10px; transition: 0.3s;
        }
        .upload-btn:hover { filter: brightness(1.2); box-shadow: 0 0 15px var(--accent); }
    `;
    document.head.appendChild(style);

    // 2. មុខងារសម្រាប់ប្តូររូបភាពតាមរយៈ Upload
    window.handleGuardianUpload = function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                const imageData = event.target.result;
                // រក្សាទុកក្នុង LocalStorage
                localStorage.setItem('imperial_guardian_img', imageData);
                // ប្តូររូបភាពភ្លាមៗ
                document.getElementById('dealer-img').style.backgroundImage = `url('${imageData}')`;
                speak("ការបញ្ចូលរូបភាពអ្នកការពារថ្មីទទួលបានជោគជ័យ។");
            };
            reader.readAsDataURL(file);
        };
        input.click();
    };

    // 3. បញ្ចូល Terminal Overlay ទៅក្នុង Dealer Box
    setTimeout(() => {
        const dealerBox = document.getElementById('dealer-img');
        if (dealerBox) {
            // បញ្ចូល Terminal Effect
            const overlay = document.createElement('div');
            overlay.className = 'terminal-overlay';
            const matrix = document.createElement('div');
            matrix.className = 'matrix-text';
            matrix.id = 'matrix-code';
            dealerBox.appendChild(overlay);
            dealerBox.appendChild(matrix);

            // បន្ថែមប៊ូតុង Upload ក្នុង Panel បញ្ជាការ
            const ctrlPanel = document.querySelector('.panel:nth-child(4)');
            const uploadBtn = document.createElement('button');
            uploadBtn.className = 'upload-btn';
            uploadBtn.innerHTML = '📤 UPLOAD GUARDIAN';
            uploadBtn.onclick = handleGuardianUpload;
            ctrlPanel.appendChild(uploadBtn);

            // ឆែកមើលថាតើមានរូបភាពចាស់ក្នុង Storage ដែរឬទេ
            const savedImg = localStorage.getItem('imperial_guardian_img');
            if (savedImg) {
                dealerBox.style.backgroundImage = `url('${savedImg}')`;
            }

            // ដំណើរការលេខកូដរត់ (Matrix Loop)
            setInterval(() => {
                const code = Math.random().toString(2).substring(2, 15);
                matrix.innerHTML += code + "<br>";
                if (matrix.innerHTML.length > 500) matrix.innerHTML = code;
            }, 100);
        }
    }, 2000);
})();
