/**
 * 🎬 HUOKAING THARA: CORE-26 (ANIMATION ENGINE)
 * Feature: Linear & Cubic Interpolation for UI Elements
 * Version: 4.0.0
 */

(function(Imperial) {
    const AnimationEngine = {
        /**
         * lerp: Linear Interpolation formula
         * Used for smooth transitions between two values.
         */
        lerp: function(start, end, t) {
            return start * (1 - t) + end * t;
        },

        /**
         * tween: Moves an object property over time
         */
        animateValue: function(start, end, duration, callback) {
            const startTime = performance.now();

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Use a basic easing function (EaseOutCubic)
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const value = this.lerp(start, end, easedProgress);

                callback(value);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    Imperial.Events.emit('ANIMATION_COMPLETE');
                }
            };

            requestAnimationFrame(step);
        }
    };

    Imperial.Animate = AnimationEngine;
    Imperial.Kernel.registerModule("core26_animation_engine");

})(window.Imperial);
