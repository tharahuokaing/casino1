/**
 * 🧪 HUOKAING THARA: CORE-87 (SHADER INJECTOR)
 * Feature: Real-time GLSL Injection & Post-Processing
 * Version: 4.0.0
 */

(function(Imperial) {
    let _activeFilters = new Set();

    const ShaderInjector = {
        /**
         * injectEffect: Applies a GLSL post-processing filter to the main viewport
         */
        injectEffect: function(effectId, uniforms = {}) {
            const gl = Imperial.Render.getContext();
            if (!gl) return;

            Imperial.Logger.log("RENDER", `Injecting Visual Mutation: [${effectId}]`);

            // 1. Fetch the GLSL code from Core-61
            const shaderCode = Imperial.Shaders.getFragmentCode(effectId);
            
            // 2. Compile and link to the main rendering pass
            this._applyToPipeline(shaderCode, uniforms);
            
            _activeFilters.add(effectId);
        },

        /**
         * transition: Smoothly interpolates shader variables (e.g., blurring the screen)
         */
        transition: function(uniformName, startValue, endValue, duration) {
            const startTime = performance.now();
            
            const animate = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const current = startValue + (endValue - startValue) * progress;
                
                Imperial.Render.setUniform(uniformName, current);
                
                if (progress < 1) requestAnimationFrame(animate);
            };
            
            requestAnimationFrame(animate);
        },

        clearAll: function() {
            _activeFilters.clear();
            Imperial.Render.resetPipeline();
        }
    };

    Imperial.Alchemy = ShaderInjector;
    Imperial.Kernel.registerModule("core87_shader_injector");

    // Integration: Visual feedback for game states
    Imperial.Events.on('WIN_STREAK_START', () => {
        ShaderInjector.injectEffect('HEAT_HAZE', { intensity: 0.5 });
    });

    Imperial.Events.on('LOW_BALANCE_WARNING', () => {
        // Desaturate the world to signal caution
        ShaderInjector.transition('u_saturation', 1.0, 0.2, 1000);
    });

})(window.Imperial);
