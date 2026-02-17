/**
 * 📸 HUOKAING THARA: CORE-67 (SOCIAL SHARING)
 * Feature: Canvas Capture, Watermarking & Social API Bridge
 * Version: 4.0.0
 */

(function(Imperial) {
    const _config = {
        watermarkUrl: '/assets/ui/imperial_watermark.png',
        fileName: 'Imperial_Win_Capture.png'
    };

    const SocialBridge = {
        /**
         * capture: Snapshots the game and adds branding
         */
        capture: async function() {
            const gameCanvas = document.querySelector('#imperial-main-canvas');
            if (!gameCanvas) return;

            // 1. Create a temporary "Post-Production" canvas
            const tempCanvas = document.createElement('canvas');
            const ctx = tempCanvas.getContext('2d');
            tempCanvas.width = gameCanvas.width;
            tempCanvas.height = gameCanvas.height;

            // 2. Draw the game frame
            ctx.drawImage(gameCanvas, 0, 0);

            // 3. Overlay the Watermark (Core 32 must have this preloaded)
            const watermark = Imperial.Assets.get('watermark');
            if (watermark) {
                const w = tempCanvas.width * 0.2; // 20% of screen width
                const h = (watermark.height / watermark.width) * w;
                ctx.globalAlpha = 0.7;
                ctx.drawImage(watermark, 20, 20, w, h);
                ctx.globalAlpha = 1.0;
            }

            // 4. Convert to Blob
            return new Promise(resolve => {
                tempCanvas.toBlob(blob => {
                    Imperial.Logger.log("SYSTEM", "Social Capture generated.");
                    resolve(blob);
                }, 'image/png');
            });
        },

        /**
         * shareToTelegram: Uses the Web Share API or direct URL
         */
        share: async function(platform = 'native') {
            const imageBlob = await this.capture();
            const file = new File([imageBlob], _config.fileName, { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Imperial Victory',
                        text: 'Just hit a massive win in the Imperial Plaza! 👑'
                    });
                } catch (err) {
                    Imperial.Logger.log("WARN", "Sharing cancelled or failed.");
                }
            } else {
                // Fallback: Just download the image for manual upload
                this.download(imageBlob);
            }
        },

        download: function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = _config.fileName;
            a.click();
        }
    };

    Imperial.Social = SocialBridge;
    Imperial.Kernel.registerModule("core67_social_bridge");

    // Integration: Auto-prompt to share on Jackpots
    Imperial.Events.on('BIG_WIN_ANIMATION_END', () => {
        Imperial.Notify.prompt("Share your glory?", "Post your win to the community!", () => {
            SocialBridge.share();
        });
    });

})(window.Imperial);
