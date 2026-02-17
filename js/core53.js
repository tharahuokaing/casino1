/**
 * 🖱️ HUOKAING THARA: CORE-53 (INPUT NORMALIZER)
 * Feature: Unified Pointer, Touch & Gesture Mapping
 * Version: 4.0.0
 */

(function(Imperial) {
    const _state = {
        isDown: false,
        lastX: 0,
        lastY: 0,
        target: null
    };

    const InputNormalizer = {
        init: function() {
            // Use PointerEvents (Modern standard for Mouse/Touch/Pen)
            window.addEventListener('pointerdown', (e) => this._handleStart(e));
            window.addEventListener('pointermove', (e) => this._handleMove(e));
            window.addEventListener('pointerup', (e) => this._handleEnd(e));
            window.addEventListener('pointercancel', (e) => this._handleEnd(e));
            
            Imperial.Logger.log("INPUT", "Unified Input Normalizer Active.");
        },

        _handleStart: function(e) {
            _state.isDown = true;
            this._updateState(e);
            Imperial.Events.emit('INPUT_START', _state);
            
            // Trigger Haptic Feedback (Core 14) if supported
            if (Imperial.Haptics) Imperial.Haptics.vibrate(10);
        },

        _handleMove: function(e) {
            if (!_state.isDown) return;
            this._updateState(e);
            Imperial.Events.emit('INPUT_MOVE', _state);
        },

        _handleEnd: function(e) {
            if (!_state.isDown) return;
            _state.isDown = false;
            Imperial.Events.emit('INPUT_END', _state);
        },

        _updateState: function(e) {
            // Adjust coordinates based on the Global Scale (Core 52)
            const scale = Imperial.Viewport ? Imperial.Viewport.getScale() : 1;
            const rect = document.body.getBoundingClientRect();

            _state.lastX = (e.clientX - rect.left) / scale;
            _state.lastY = (e.clientY - rect.top) / scale;
            _state.target = e.target;
        },

        getPointer: () => ({ ..._state })
    };

    Imperial.Input = InputNormalizer;
    Imperial.Kernel.registerModule("core53_input_normalizer");

    // Ignition
    InputNormalizer.init();

})(window.Imperial);
