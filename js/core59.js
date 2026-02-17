/**
 * 🎲 HUOKAING THARA: CORE-59 (ENTROPY HARVESTER)
 * Feature: Behavioral Noise Injection for RNG Seeds
 * Version: 4.0.0
 */

(function(Imperial) {
    let _entropyBuffer = [];
    const _BUFFER_LIMIT = 256; // bits of entropy

    const EntropyHarvester = {
        init: function() {
            // Harvest from Mouse/Pointer Jitter
            window.addEventListener('pointermove', (e) => this._collect(e.clientX ^ e.clientY));
            
            // Harvest from Timing Noise (Precision timestamps)
            window.addEventListener('keydown', () => this._collect(performance.now()));

            Imperial.Logger.log("SECURITY", "Entropy Harvester is gathering behavioral noise.");
        },

        /**
         * _collect: Mixes new noise into the buffer
         */
        _collect: function(value) {
            if (_entropyBuffer.length < _BUFFER_LIMIT) {
                // Use bitwise XOR to mix values
                const noise = Math.floor(value * 10000) % 255;
                _entropyBuffer.push(noise);
            } else {
                this._cycle();
            }
        },

        /**
         * _cycle: Feeds the harvested noise into the main RNG Vault
         */
        _cycle: function() {
            const seedMaterial = _entropyBuffer.join('');
            if (Imperial.RNG && Imperial.RNG.injectEntropy) {
                Imperial.RNG.injectEntropy(seedMaterial);
            }
            
            // Clear and start over to keep entropy fresh
            _entropyBuffer = [];
            Imperial.Events.emit('ENTROPY_CYCLED');
        },

        /**
         * getEntropyLevel: Returns percentage of buffer readiness
         */
        getReadiness: () => (_entropyBuffer.length / _BUFFER_LIMIT) * 100
    };

    Imperial.Entropy = EntropyHarvester;
    Imperial.Kernel.registerModule("core59_entropy_harvester");

    // Ignition
    EntropyHarvester.init();

})(window.Imperial);
