/**
 * 👑 SINGULARITY IMPERIAL MASTER v31.0
 * Feature: Secret Vault (Dealer Gallery & Multimedia Storage)
 */

(function() {
    // 1. បង្កើតអារេសម្រាប់រក្សាទុកបណ្ណាល័យរូបភាព
    let dealerGallery = JSON.parse(localStorage.getItem('imperial_vault')) || [];

    // 2. CSS សម្រាប់ផ្ទាំង Secret Vault
    const style = document.createElement('style');
    style.textContent = `
        #secret-vault-ui {
            display: none; position: fixed; inset: 0;
            background: rgba(0,0,0,0.95); z-index: 11000;
            padding: 50px; overflow-y: auto; backdrop-filter: blur(20px);
        }
        .vault-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px; margin-top: 30px;
        }
        .vault-item {
            border: 2px solid #333; border-radius: 10px; cursor: pointer;
            transition: 0.3s; position: relative; overflow: hidden;
        }
        .vault-item:hover { border-color: var(--gold); transform: scale(1.05); }
        .vault-item img { width: 100%; height: 200px; object-fit: cover; }
    `;
    document.head.appendChild(style);

    // 3. មុខងារបន្ថែមរូបភាពទៅក្នុង Vault
    window.addToVault = function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = e => {
            const reader = new FileReader();
            reader.onload = event => {
                dealerGallery.push(event.target.result);
                localStorage.setItem('imperial_vault', JSON.stringify(dealerGallery));
                renderVault();
                speak("បានបញ្ចូលរូបភាពទៅក្នុងបន្ទប់សម្ងាត់រួចរាល់។");
            };
            reader.readAsDataURL(e.target.files[0]);
        };
        input.click();
    };

    // 4. មុខងារបង្ហាញ Vault
    window.openSecretVault = function() {
        const vaultUI = document.getElementById('secret-vault-ui');
        vaultUI.style.display = 'block';
        renderVault();
        speak("កំពុងបើកបន្ទប់សម្ងាត់អធិរាជ។");
    };

    function renderVault() {
        const grid = document.getElementById('vault-grid');
        grid.innerHTML = dealerGallery.map((img, index) => `
            <div class="vault-item" onclick="setDealerFromVault(${index})">
                <img src="${img}">
                <div style="font-size:10px; text-align:center; padding:5px;">DEALER #${index+1}</div>
            </div>
        `).join('') + `<div class="vault-item" onclick="addToVault()" style="display:flex; align-items:center; justify-content:center; height:200px; background:#111; font-size:2rem;">+</div>`;
    }

    window.setDealerFromVault = function(index) {
        const dealerContainer = document.querySelector('.dealer-container');
        dealerContainer.style.backgroundImage = `url('${dealerGallery[index]}')`;
        document.getElementById('secret-vault-ui').style.display = 'none';
        speak("អ្នកចែកបៀត្រូវបានផ្លាស់ប្តូរ។");
    };

    // បញ្ចូល HTML នៃ Vault
    document.body.insertAdjacentHTML('beforeend', `
        <div id="secret-vault-ui">
            <h1 style="color:var(--gold); text-align:center;">🗝️ IMPERIAL SECRET VAULT</h1>
            <div id="vault-grid" class="vault-grid"></div>
            <button onclick="document.getElementById('secret-vault-ui').style.display='none'" style="margin-top:30px; width:100%; padding:15px; background:var(--danger); border:none; color:white; font-weight:bold; cursor:pointer;">ចាកចេញពីបន្ទប់សម្ងាត់</button>
        </div>
    `);
})();