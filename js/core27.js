/**
 * 🧱 HUOKAING THARA: CORE-27 (UI FACTORY)
 * Feature: Dynamic Component Generation & Mounting
 * Version: 4.0.0
 */

(function(Imperial) {
    const UIBridge = {
        /**
         * createButton: Returns a themed, sound-mapped button element
         */
        createButton: function(label, action, type = 'primary') {
            const btn = document.createElement('button');
            btn.className = `imp-btn imp-btn-${type}`;
            btn.innerHTML = `<span>${label}</span>`;
            
            btn.onclick = (e) => {
                if (Imperial.Sound) Imperial.Sound.playSFX('ui_click');
                action(e);
            };

            return btn;
        },

        /**
         * createModal: Spawns a window over the game state
         */
        spawnModal: function(title, content) {
            const overlay = document.createElement('div');
            overlay.className = 'imp-modal-overlay';
            
            const modal = document.createElement('div');
            modal.className = 'imp-modal-window';
            modal.innerHTML = `
                <div class="modal-header"><h3>${title}</h3></div>
                <div class="modal
