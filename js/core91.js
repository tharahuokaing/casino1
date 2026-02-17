/**
 * 🎨 HUOKAING THARA: CORE-91 (SPRITE GENERATOR)
 * Feature: On-the-fly Texture Compositing & Recoloring
 * Version: 4.0.0
 */

(function(Imperial) {
    const _generatedCache = new Map();

    const SpriteGenerator = {
        /**
         * synthesize: Creates a new texture by compositing layers
         * @param {string} baseKey - The core asset (e.g., 'warrior_idle')
         * @param {Object} mods - Modifications (e.g., { tint: '#ffd700', glow: true })
         */
        synthesize: function(baseKey, mods) {
            const cacheKey = `${baseKey}_${JSON.stringify(mods)}`;
            if (_generatedCache.has(cacheKey)) return _generatedCache.get(cacheKey);

            const baseImg = Imperial.Assets.get(baseKey);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = baseImg.width;
            canvas.height = baseImg.height;

            // 1. Draw Base
            ctx.drawImage(baseImg, 0, 0);

            // 2. Apply Tint (Multiply Blend Mode)
            if (mods.tint) {
                ctx.globalCompositeOperation = 'multiply';
                ctx.fillStyle = mods.tint;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'destination-in';
                ctx.drawImage(baseImg, 0, 0);
            }

            // 3. Add Special Overlays (e.g., "Gold Glint")
            if (mods.glow) {
                ctx.globalCompositeOperation = 'source-over';
                this._applyGlow(ctx, canvas.width, canvas.height);
            }

            // 4. Convert to Image Bitmap for GPU efficiency
            const result = canvas.toDataURL('image/png');
            _generatedCache.set(cacheKey, result);
            
            Imperial.Logger.log("ASSET", `Synthesized dynamic texture: ${cacheKey}`);
            return result;
        },

        _applyGlow: function(ctx, w, h) {
            const grad = ctx.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0, 'rgba(255,255,255,0)');
            grad.addColorStop(0.5, 'rgba(255,255,255,0.5)');
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
        }
    };

    Imperial.Quartermaster = SpriteGenerator;
    Imperial.Kernel.registerModule("core91_sprite_generator");

})(window.Imperial);
