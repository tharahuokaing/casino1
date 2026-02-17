/**
 * 💾 HUOKAING THARA: CORE-3 (STORAGE)
 * Feature: Persistence Layer & Data Encryption
 * Version: 4.0.0
 */

(function(Imperial) {
    const STORAGE_KEY = "IMPERIAL_THARA_DATA";

    const StorageModule = {
        /**
         * saveState: Packages current security and rank data into LocalStorage
         */
        saveState: function() {
            if (!Imperial.Security || !Imperial.Security.validate()) {
                console.error("[STORAGE]: Cannot save. Security integrity failed.");
                return false;
            }

            const dataToSave = {
                v: Imperial.Security.getBalance(),
                t: Date.now(),
                h: btoa(Imperial.Security.getBalance().toString()) // Obfuscation
            };

            try {
                const encrypted = JSON.stringify(dataToSave);
                localStorage.setItem(STORAGE_KEY, encrypted);
                Imperial.Kernel.registerModule("core3_storage_active");
                return true;
            } catch (e) {
                console.error("[STORAGE]: Write error.", e);
                return false;
            }
        },

        /**
         * loadState: Retrieves data and pushes it back into the Security vault
         */
        loadState: function() {
            const rawData = localStorage.getItem(STORAGE_KEY);
            if (!rawData) return null;

            try {
                const parsed = JSON.parse(rawData);
                // Basic verification: Check if hash matches value
                if (btoa(parsed.v.toString()) === parsed.h) {
                    console.log("[STORAGE]: Data verified. Restoring state...");
                    return parsed.v;
                }
            } catch (e) {
                console.error("[STORAGE]: Corrupt data detected.");
                return null;
            }
        },

        /**
         * clear: Resets the empire's local database
         */
        wipe: function() {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    };

    // Attach to Global Namespace
    Imperial.Storage = StorageModule;

    // Register with Kernel
    Imperial.Kernel.registerModule("core3_storage");

})(window.Imperial);
