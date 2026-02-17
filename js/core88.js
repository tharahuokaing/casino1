/**
 * 🕹️ HUOKAING THARA: CORE-88 (INPUT REMAPPER)
 * Feature: Custom Keybinding & Ergonomic Mirroring
 * Version: 4.0.0
 */

(function(Imperial) {
    const _map = {
        ' ': 'CMD_SPIN',
        'Enter': 'CMD_SPIN',
        'm': 'CMD_TOGGLE_MUTE',
        'v': 'CMD_OPEN_VAULT'
    };

    const InputRemapper = {
        _isLeftHanded: false,

        init: function() {
            window.addEventListener('keydown', (e) => this._handleKey(e));
            Imperial.Logger.log("SYSTEM", "Input Remapper active. Awaiting commands.");
        },

        /**
         * remapUI: Physically repositions interactive elements for ergonomics
         */
        setHandedness: function(mode) {
            this._isLeftHanded = (mode === 'LEFT');
            const root = document.documentElement;
            
            if (this._isLeftHanded) {
                root.style.setProperty('--imp-flex-direction', 'row-reverse');
                root.classList.add('imp-mirrored');
            } else {
                root.style.setProperty('--imp-flex-direction', 'row');
                root.classList.remove('imp-mirrored');
            }
            
            Imperial.Events.emit('UI_LAYOUT_REFRESH');
        },

        _handleKey: function(event) {
            // Prevent scrolling when pressing Space
            if (event.key === ' ' && event.target === document.body) {
                event.preventDefault();
            }

            const command = _map[event.key];
            if (command) {
                Imperial.Logger.log("INPUT", `Key [${event.key}] mapped to ${command}`);
                Imperial.Events.emit(command);
            }
        },

        /**
         * bind: Allows the user to set custom hotkeys in the settings menu
         */
        bind: function(key, action) {
            _map[key] = action;
        }
    };

    Imperial.Controls = InputRemapper;
    Imperial.Kernel.registerModule("core88_input_remapper");

    InputRemapper.init();

})(window.Imperial);
