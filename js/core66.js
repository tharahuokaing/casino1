/**
 * 🖼️ HUOKAING THARA: CORE-66 (SPRITE PACKER)
 * Feature: Dynamic Texture Atlasing & Draw-Call Reduction
 * Version: 4.0.0
 */

(function(Imperial) {
    const _atlasCache = new Map();
    const _MAX_ATLAS_SIZE = 2048; // Common GPU texture limit

    const SpritePacker = {
        /**
         * pack: Combines multiple Image objects into a single Canvas/Texture
         */
        createAtlas: function(atlasId, imageArray) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = _MAX_ATLAS_SIZE;
            canvas.height = _MAX_ATLAS_SIZE;

            let currentX = 0;
            let currentY = 0;
            let rowHeight = 0;
            const mapping = {};

            imageArray.forEach(img => {
                // Simple "Shelf Packing" Algorithm
                if (currentX + img.width > _MAX_ATLAS_SIZE) {
                    currentX = 0;
                    currentY += rowHeight;
                    rowHeight = 0;
                }

                ctx.drawImage(img, currentX, currentY);
                
                mapping[img.id || img.src] = {
                    x: currentX,
                    y: currentY,
                    w: img.width,
                    h: img.height
                };

                currentX += img.width;
                rowHeight = Math.max(rowHeight, img.height);
            });

            const atlasData = {
                texture: canvas,
                map: mapping
            };

            _atlasCache.set(atlasId, atlasData);
            Imperial.Logger.log("RENDER", `Atlas [${atlasId}] created. Packed ${imageArray.length} sprites.`);
            return atlasData;
        },

        /**
         * getFrame: Returns coordinates for a specific sprite within the atlas
         */
        getFrame: function(atlasId, spriteId) {
            const atlas = _atlasCache.get(atlasId);
            return atlas ? atlas.map[spriteId] : null;
        }
    };

    Imperial.Render.Packer = SpritePacker;
    Imperial.Kernel.registerModule("core66_sprite_packer");

})(window.Imperial);
