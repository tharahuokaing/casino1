/**
 * 📖 HUOKAING THARA: CORE-49 (AUDIT LEDGER)
 * Feature: Provably Fair History & Dispute Resolution
 * Version: 4.0.0
 */

(function(Imperial) {
    const _history = [];
    const _MAX_ENTRIES = 50;

    const AuditLedger = {
        /**
         * logResult: Stores the cryptographic proof of a game outcome
         */
        logResult: function(gameId, serverSeed, clientSeed, nonce, result) {
            const entry = {
                timestamp: new Date().toISOString(),
                gameId,
                serverSeed, // Usually hashed in public view
                clientSeed,
                nonce,
                result,
                // Verification Hash (SHA-256 simulation)
                proof: this._generateProof(serverSeed, clientSeed, nonce)
            };

            _history.unshift(entry); // Add to start
            if (_history.length > _MAX_ENTRIES) _history.pop();

            Imperial.Logger.log("AUDIT", `Result logged for ${gameId}. Nonce: ${nonce}`);
        },

        /**
         * _generateProof: Re-calculates the hash to prove integrity
         */
        _generateProof: function(s, c, n) {
            // In a production environment, this uses a real CryptoJS SHA256 lib
            return btoa(`${s}:${c}:${n}`).substring(0, 16);
        },

        /**
         * getHistory: Returns the audit trail for the UI
         */
        getHistory: function() {
            return Object.freeze([..._history]);
        }
    };

    Imperial.Ledger = AuditLedger;
    Imperial.Kernel.registerModule("core49_audit_ledger");

    // Integration: Listen for RNG generations to automatically log
    Imperial.Events.on('RNG_GENERATED', (data) => {
        AuditLedger.logResult(
            data.gameId || 'System',
            data.sSeed,
            data.cSeed,
            data.nonce,
            data.result
        );
    });

})(window.Imperial);
