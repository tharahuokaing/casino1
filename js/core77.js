/**
 * 🎥 HUOKAING THARA: CORE-77 (VIDEO STREAMER)
 * Feature: Canvas Buffer Recording & WebRTC Streaming
 * Version: 4.0.0
 */

(function(Imperial) {
    let _recorder = null;
    let _chunks = [];

    const VideoStreamer = {
        /**
         * startCapture: Begins recording the canvas at 60 FPS
         */
        startCapture: function() {
            const canvas = document.querySelector('#imperial-main-canvas');
            const stream = canvas.captureStream(60); // Capture at 60fps
            
            // Add Audio track from Core-13 if available
            if (Imperial.Audio && Imperial.Audio.getDestinationStream()) {
                stream.addTrack(Imperial.Audio.getDestinationStream().getAudioTracks()[0]);
            }

            _chunks = [];
            _recorder = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs=vp9',
                videoBitsPerSecond: 5000000 // 5Mbps for high quality
            });

            _recorder.ondataavailable = (e) => {
                if (e.data.size > 0) _chunks.push(e.data);
            };

            _recorder.start();
            Imperial.Logger.log("SYSTEM", "Recording started.");
        },

        /**
         * stopAndSave: Finalizes the video and triggers a download or upload
         */
        stopAndSave: async function() {
            if (!_recorder) return;
            
            return new Promise(resolve => {
                _recorder.onstop = () => {
                    const blob = new Blob(_chunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    
                    Imperial.Logger.log("SYSTEM", "Video processed and ready.");
                    resolve({ blob, url });
                };
                _recorder.stop();
            });
        },

        /**
         * broadcast: Pumps the stream to a WebRTC peer (Spectator Mode)
         */
        broadcast: function(peerConnection) {
            const canvas = document.querySelector('#imperial-main-canvas');
            const stream = canvas.captureStream(30); // Lower FPS for network stability
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
        }
    };

    Imperial.Streamer = VideoStreamer;
    Imperial.Kernel.registerModule("core77_video_streamer");

})(window.Imperial);
