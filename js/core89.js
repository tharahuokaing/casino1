/**
 * 🎵 HUOKAING THARA: CORE-89 (MUSIC CROSSFADER)
 * Feature: Seamless Audio Transitions & Beat-Sync Fading
 * Version: 4.0.0
 */

(function(Imperial) {
    let _activeSource = null;
    let _transitioning = false;

    const MusicMaestro = {
        /**
         * playTheme: Transitions to a new music track with a professional crossfade
         */
        playTheme: async function(themeKey, duration = 2000) {
            if (_transitioning) return;
            _transitioning = true;

            const nextSource = await Imperial.Audio.getSource(themeKey);
            if (!nextSource) {
                _transitioning = false;
                return;
            }

            Imperial.Logger.log("AUDIO", `Crossfading to theme: [${themeKey}]`);

            // 1. Prepare Next Track (Start at 0 volume)
            nextSource.volume = 0;
            nextSource.loop = true;
            nextSource.play();

            // 2. The Crossfade Logic
            const steps = 20;
            const interval = duration / steps;
            let currentStep = 0;

            const fade = setInterval(() => {
                currentStep++;
                const ratio = currentStep / steps;

                // Exponential fade for smoother human hearing perception
                if (_activeSource) _activeSource.volume = Math.pow(1 - ratio, 2);
                nextSource.volume = Math.pow(ratio, 2);

                if (currentStep >= steps) {
                    clearInterval(fade);
                    this._finalize(nextSource);
                }
            }, interval);
        },

        _finalize: function(newSource) {
            if (_activeSource) {
                _activeSource.pause();
                _activeSource.currentTime = 0;
            }
            _activeSource = newSource;
            _transitioning = false;
            Imperial.Events.emit('MUSIC_TRANSITION_COMPLETE');
        },

        /**
         * syncBeat: Adjusts the start of the next track to match the current BPM
         */
        syncBeat: function() {
            // Future logic for BPM-aligned transitions
        }
    };

    Imperial.Music = MusicMaestro;
    Imperial.Kernel.registerModule("core89_music_crossfader");

    // Integration: Listen for High-Stakes transitions
    Imperial.Events.on('BONUS_ROUND_START', () => MusicMaestro.playTheme('THEME_BONUS', 1500));
    Imperial.Events.on('BONUS_ROUND_END', () => MusicMaestro.playTheme('THEME_BASE', 3000));

})(window.Imperial);
