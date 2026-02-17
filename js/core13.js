/**
 * 🔊 HUOKAING THARA: CORE-13 (SOUND ENGINE)
 * Feature: Audio Management, Volume Control & Ducking logic
 * Version: 4.0.0
 */

(function(Imperial) {
    const _channels = {
        music: null,
        sfx: []
    };

    const _settings = {
        masterVolume: 0.8,
        musicVolume: 0.5,
        sfxVolume: 1.0,
        isMuted: false
    };

    const SoundEngine = {
        /**
         * playMusic: Loops a background track
         */
        playMusic: function(trackName) {
            const audio = Imperial.Assets.getSnd(trackName);
            if (!audio) return;

            if (_channels.music) _channels.music.pause();
            
            audio.loop = true;
            audio.volume = _settings.isMuted ? 0 : _settings.musicVolume * _settings.masterVolume;
            audio.play().catch(e => console.warn("Autoplay blocked. Interaction required."));
            _channels.music = audio;
        },

        /**
         * playSFX: Plays a one-shot sound (cards, chips, win)
         */
        playSFX: function(sfxName, forceOverlap = true) {
            const audio = Imperial.Assets.getSnd(sfxName);
            if (!audio || _settings.isMuted) return;

            const sound = forceOverlap ? audio.cloneNode() : audio;
            sound.volume = _settings.sfxVolume * _settings.masterVolume;
            sound.play();
            
            // Clean up cloned nodes to save memory
            if (forceOverlap) {
                sound.onended = () => { sound.remove(); };
            }
        },

        /**
         * duckMusic: Briefly lowers music volume (useful for big announcements)
         */
        duck: function(duration = 2000) {
            if (!_channels.music) return;
            const originalVol = _channels.music.volume;
            _channels.music.volume = originalVol * 0.2;
            
            setTimeout(() => {
                if (_channels.music) _channels.music.volume = originalVol;
            }, duration);
        },

        setMasterVolume: function(val) {
            _settings.masterVolume = Math.max(0, Math.min(1, val));
            if (_channels.music) _channels.music.volume = _settings.musicVolume * _settings.masterVolume;
        }
    };

    // Attach to Global Namespace
    Imperial.Sound = SoundEngine;

    // Register with Kernel
    Imperial.Kernel.registerModule("core13_sound_engine");

    // Hook into system events
    window.addEventListener('load', () => {
        if (Imperial.Events) {
            // Play a click sound whenever the user interacts with a button
            document.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') SoundEngine.playSFX('click_standard');
            });
            
            // Auto-duck music on Big Win
            Imperial.Events.on('BIG_WIN', () => SoundEngine.duck(3000));
        }
    });

})(window.Imperial);
