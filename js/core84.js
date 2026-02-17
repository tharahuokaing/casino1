/**
 * 🎙️ HUOKAING THARA: CORE-84 (VOICE-OVER MANAGER)
 * Feature: Multi-Language Audio Sync & Ducking
 * Version: 4.0.0
 */

(function(Imperial) {
    const _voCache = new Map();
    let _activeChannel = null;

    const VOManager = {
        /**
         * play: Triggers a voice line with "Audio Ducking"
         * (Ducking lowers background music while the voice speaks)
         */
        play: async function(voKey) {
            const lang = Imperial.Locale ? Imperial.Locale.getLang() : 'en';
            const fullKey = `${lang}_${voKey}`;

            // 1. Duck the Background Music (Core 13)
            if (Imperial.Audio) {
                Imperial.Audio.setVolume('MUSIC', 0.3, 200); // Drop to 30% volume over 200ms
            }

            // 2. Load/Fetch the localized clip
            let clip = _voCache.get(fullKey);
            if (!clip) {
                clip = await this._loadVO(fullKey);
            }

            // 3. Play with high priority
            if (clip) {
                _activeChannel = clip;
                clip.play();
                
                clip.onended = () => {
                    // 4. Restore Music Volume
                    if (Imperial.Audio) Imperial.Audio.setVolume('MUSIC', 1.0, 500);
                    _activeChannel = null;
                };
            }
        },

        _loadVO: async function(key) {
            // Path logic: /assets/audio/vo/en/big_win.mp3
            const [lang, name] = key.split('_');
            const path = `/assets/audio/vo/${lang}/${name}.mp3`;
            
            try {
                const audio = new Audio(path);
                _voCache.set(key, audio);
                return audio;
            } catch (e) {
                Imperial.Logger.log("ERROR", `VO Clip not found: ${path}`);
                return null;
            }
        },

        stopAll: function() {
            if (_activeChannel) _activeChannel.pause();
        }
    };

    Imperial.VO = VOManager;
    Imperial.Kernel.registerModule("core84_vo_manager");

    // Integration: Listen for big events
    Imperial.Events.on('BIG_WIN_REVEALED', () => VOManager.play('celebration_mega'));
    Imperial.Events.on('LEVEL_UP', () => VOManager.play('level_up_congrats'));

})(window.Imperial);
