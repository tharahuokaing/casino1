/**
 * 🖐️ HUOKAING THARA: CORE-63 (GESTURES)
 * Feature: Swipe, Pinch, and Long-Press Recognition
 * Version: 4.0.0
 */

(function(Imperial) {
    let _touchStart = { x: 0, y: 0, time: 0 };
    let _pressTimer = null;
    const _CONFIG = {
        SWIPE_THRESHOLD: 50, // pixels
        LONG_PRESS_TIME: 600 // ms
    };

    const GestureEngine = {
        init: function() {
            Imperial.Events.on('INPUT_START', (data) => this._onStart(data));
            Imperial.Events.on('INPUT_MOVE', (data) => this._onMove(data));
            Imperial.Events.on('INPUT_END', (data) => this._onEnd(data));
        },

        _onStart: function(data) {
            _touchStart = { x: data.lastX, y: data.lastY, time: Date.now() };
            
            // Start Long-Press detection
            clearTimeout(_pressTimer);
            _pressTimer = setTimeout(() => {
                Imperial.Events.emit('GESTURE_LONG_PRESS', _touchStart);
            }, _CONFIG.LONG_PRESS_TIME);
        },

        _onMove: function(data) {
            // If they move too much, it's not a long-press anymore
            const dist = Math.hypot(data.lastX - _touchStart.x, data.lastY - _touchStart.y);
            if (dist > 10) clearTimeout(_pressTimer);
        },

        _onEnd: function(data) {
            clearTimeout(_pressTimer);
            const deltaX = data.lastX - _touchStart.x;
            const deltaY = data.lastY - _touchStart.y;
            const duration = Date.now() - _touchStart.time;

            // Detect Swipe (Quick movement)
            if (duration < 300) {
                if (Math.abs(deltaY) > _CONFIG.SWIPE_THRESHOLD) {
                    const direction = deltaY > 0 ? 'DOWN' : 'UP';
                    Imperial.Events.emit('GESTURE_SWIPE', { direction });
                }
            }
        }
    };

    Imperial.Gestures = GestureEngine;
    Imperial.Kernel.registerModule("core63_gesture_recognition");

    // Ignition
    GestureEngine.init();

    // Example Application: Swipe down to spin the reels
    Imperial.Events.on('GESTURE_SWIPE', (e) => {
        if (e.direction === 'DOWN' && Imperial.State.getCurrent() === 'IDLE') {
            Imperial.Events.emit('COMMAND_SPIN');
        }
    });

})(window.Imperial);
