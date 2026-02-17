/**
 * 📱 HUOKAING THARA: CORE-74 (VIEWPORT)
 * Feature: Orientation Locking & Dynamic Aspect Scaling
 * Version: 4.0.0
 */

(function(Imperial) {
    let _orientation = null;

    const ViewportHandler = {
        init: function() {
            window.addEventListener('resize', () => this.handleResize());
            window.addEventListener('orientationchange', () => this.handleResize());
            
            // Initial trigger
            this.handleResize();
        },

        handleResize: function() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const ratio = w / h;

            _orientation = (w > h) ? 'LANDSCAPE' : 'PORTRAIT';

            // Calculate the "Safe Zone" to avoid notches and home indicators
            const safeArea = {
                top: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top')) || 0,
                bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom')) || 0
            };

            const layoutData = {
                width: w,
                height: h,
                aspect: ratio,
                orientation: _orientation,
                safeArea: safeArea
            };

            Imperial.Logger.log("UI", `Viewport adapted to ${_orientation} (${w}x${h})`);
            Imperial.Events.emit('VIEWPORT_CHANGED', layoutData);

            // Apply global CSS hooks for non-canvas elements
            document.documentElement.setAttribute('data-orientation', _orientation);
        },

        /**
         * getScaleFactor: Helps Core 21 fit the canvas to the screen while maintaining 16:9 or 9:16
         */
        getScaleFactor: function(baseWidth, baseHeight) {
            return Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight);
        },

        getOrientation: () => _orientation
    };

    Imperial.Viewport = ViewportHandler;
    Imperial.Kernel.registerModule("core74_viewport_handler");

    // Ignition
    ViewportHandler.init();

})(window.Imperial);
