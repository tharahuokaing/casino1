/**
 * 📸 HUOKAING THARA: CORE-95 (SHARE-CARD GENERATOR)
 * Feature: Branded Screenshots & Web Share Integration
 * Version: 4.0.0
 */

(function(Imperial) {
    const _FRAME_URL = '/assets/ui/share_frame_gold.png';

    const Publicist = {
        /**
         * captureAndShare: Grabs the current win and opens the native share sheet
         */
        captureAndShare: async function(winData) {
            Imperial.Logger.log("SYSTEM", "Generating shareable victory card...");

            try {
                const blob = await this._generateCard(winData);
                const file = new File([blob], `Imperial_Win_${Date.now()}.png`, { type: 'image/png' });

                if (navigator.share) {
                    await navigator.share({
                        title: 'My Imperial Victory!',
                        text: `I just won ${winData.amount} gold in the Plaza! Can you beat my score?`,
                        files: [file]
                    });
                } else {
                    // Fallback: Just download the image
                    this._downloadFallback(blob);
                }
            } catch (err) {
                Imperial.Logger.log("ERROR", "Share-card generation failed.");
            }
        },

        /**
         * _generateCard: Composites the game canvas with a branded overlay
         */
        _generateCard: function(winData) {
            return new Promise((resolve) => {
                const gameCanvas = document.querySelector('#imperial-main-canvas');
                const tempCanvas = document.createElement('canvas');
                const ctx = tempCanvas.getContext('2d');

                tempCanvas.width = 1080; // Standard social media width
                tempCanvas.height = 1080;

                // 1. Draw Game Content (Centered)
                ctx.drawImage(gameCanvas, 0, 140, 1080, 800);

                // 2. Overlay Branded Frame
                const frame = new Image();
                frame.src = _FRAME_URL;
                frame.onload = () => {
                    ctx.drawImage(frame, 0, 0, 1080, 1080);

                    // 3. Inject Dynamic Text (User & Amount)
                    ctx.font = 'bold 60px ImperialGold';
                    ctx.fillStyle = '#FFFFFF';
                    ctx.textAlign = 'center';
                    ctx.fillText(winData.userName.toUpperCase(), 540, 950);
                    
                    ctx.font = '80px ImperialGold';
                    ctx.fillStyle = '#D4AF37'; // Gold
                    ctx.fillText(`${winData.amount} GOLD`, 540, 1030);

                    tempCanvas.toBlob(resolve, 'image/png');
                };
            });
        },

        _downloadFallback: function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Imperial_Victory.png';
            a.click();
        }
    };

    Imperial.Publicist = Publicist;
    Imperial.Kernel.registerModule("core95_share_card_generator");

})(window.Imperial);
