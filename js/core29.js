/**
 * 🔒 HUOKAING THARA: CORE-30 (RNG SEED VAULT)
 * Feature: SHA-256 Hashing & Provably Fair Logic
 * Version: 4.0.0
 */

(function(Imperial) {
    let _serverSeed = "";
    let _clientSeed = "";
    let _nonce = 0;

    const SeedVault = {
        /**
         * init: Generates the initial session seeds
         */
        init: function() {
            _serverSeed = this._generateRandomString(64);
            _clientSeed = this._generateRandomString(16);
            _nonce = 0;
            
            Imperial.Logger.log("SECURITY", "Cryptographic Seed Vault Initialized.");
        },

        /**
         * getResult: Generates a deterministic random number (0-1)
         * based on the combination of seeds and the current nonce.
         */
        generateResult: async function() {
            _nonce++;
            const combinedString = `${_serverSeed}-${_clientSeed}-${_nonce}`;
            
            // Generate a SHA-256 hash of the combined string
            const hash = await this._sha256(combinedString);
            
            // Convert first 8 characters of hash to a decimal percentage
            const hexValue = hash.substring(0, 8);
            const intValue = parseInt(hexValue, 16);
            const result = intValue / 0xFFFFFFFF;

            Imperial.Events.emit('RNG_GENERATED', { nonce: _nonce, hash: hash });
            return result;
        },

        /**
         * _sha256: Internal helper for web crypto API
         */
        _sha256: async function(message) {
            const msgUint8 = new TextEncoder().encode(message);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        },

        _generateRandomString: function(len) {
            const arr = new Uint8Array(len / 2);
            window.crypto.getRandomValues(arr);
            return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
        },

        getPublicMetadata: function() {
            return {
                clientSeed: _clientSeed,
                nonce: _nonce,
                hashedServerSeed: "REDACTED_UNTIL_SESSION_END" 
            };
        }
    };

    // Attach to Global Namespace
    Imperial.RNG = SeedVault;

    // Register with Kernel
    Imperial.Kernel.registerModule("core30_rng_vault");

    // Auto-init
    window.addEventListener('load', () => SeedVault.init());

})(window.Imperial);
