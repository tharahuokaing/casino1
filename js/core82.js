/**
 * 🧹 HUOKAING THARA: CORE-82 (VRAM COLLECTOR)
 * Feature: GPU Resource Deallocation & Buffer Management
 * Version: 4.0.0
 */

(function(Imperial) {
    const _disposalQueue = new Set();
    const _MAX_VRAM_FRAGMENTATION = 5; // Allow 5 unused textures before force-flush

    const VRAMCollector = {
        /**
         * markForDeletion: Flags a WebGL texture or buffer for disposal
         */
        mark: function(assetId, glResource) {
            _disposalQueue.add({ id: assetId, resource: glResource });
            
            if (_disposalQueue.size >= _MAX_VRAM_FRAGMENTATION) {
                this.collect();
            }
        },

        /**
         * collect: Explicitly tells the GPU to free up memory
         */
        collect: function() {
            if (_disposalQueue.size === 0) return;

            const gl = Imperial.Render.getContext();
            if (!gl) return;

            Imperial.Logger.log("GPU", `Cleaning VRAM... Disposing ${_disposalQueue.size} assets.`);

            _disposalQueue.forEach(item => {
                if (item.resource instanceof WebGLTexture) {
                    gl.deleteTexture(item.resource);
                } else if (item.resource instanceof WebGLBuffer) {
                    gl.deleteBuffer(item.resource);
                }
                // Notify Asset Manager (Core 32) that this is gone from VRAM
                Imperial.Assets.onVRAMPurge(item.id);
            });

            _disposalQueue.clear();
        },

        /**
         * emergencyFlush: Called when Core 69 (Power) or Core 78 (Memory) detect a crisis
         */
        emergencyFlush: function() {
            Imperial.Logger.log("CRITICAL", "Emergency VRAM Flush initiated.");
            this.collect();
            // Force a small delay to let the GPU driver catch up
            gl.finish(); 
        }
    };

    Imperial.GPUCleaner = VRAMCollector;
    Imperial.Kernel.registerModule("core82_vram_collector");

    // Listen for scene changes to trigger cleanup
    Imperial.Events.on('SCENE_TRANSITION_COMPLETE', () => VRAMCollector.collect());

})(window.Imperial);
