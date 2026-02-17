/**
 * 👑 HUOKAING THARA: CORE-1 (KERNEL)
 * Feature: Global Registry & System Handshake
 * Version: 4.0.0
 */

// Initialize the Imperial Global Namespace
window.Imperial = window.Imperial || {};

const ImperialKernel = {
    version: "4.0.0-PRO",
    startTime: Date.now(),
    registry: new Set(),

    /**
     * coreRegister: Allows core2 through core43 to check-in 
     * and ensure system integrity.
     */
    registerModule: function(moduleName) {
        if (this.registry.has(moduleName)) {
            console.warn(`[KERNEL]: Module ${moduleName} is already active.`);
            return;
        }
        this.registry.add(moduleName);
        console.log(`%c [KERNEL]: %c Module %s Loaded Successfully `, 
            "color: #5C6AC4; font-weight: bold;", 
            "color: #eee;", 
            moduleName.toUpperCase());
    },

    /**
     * getSystemStatus: Returns health metrics for the empire.
     */
    getSystemStatus: function() {
        return {
            uptime: Math.floor((Date.now() - this.startTime) / 1000) + "s",
            activeModules: Array.from(this.registry),
            securityLevel: "ENCRYPTED_SSL_V3"
        };
    }
};

// Expose Kernel to the window
window.Imperial.Kernel = ImperialKernel;

// Self-register the Kernel
ImperialKernel.registerModule("core1_kernel");

/**
 * INITIAL BOOT SEQUENCE
 * Prevents execution if the DOM is not ready.
 */
window.addEventListener('DOMContentLoaded', () => {
    console.log("%c 👑 HUOKAING THARA EMPIRE v4.0 ONLINE ", 
        "background: #111; color: #5C6AC4; border: 1px solid #5C6AC4; padding: 5px 10px; font-weight: bold;");
});
