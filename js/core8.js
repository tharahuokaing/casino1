/**
 * 🔔 HUOKAING THARA: CORE-9 (NOTIFICATIONS)
 * Feature: Non-blocking Toast UI & Alert Management
 * Version: 4.0.0
 */

(function(Imperial) {
    // Container for all notification elements
    let _notifyContainer = null;

    const NotificationModule = {
        /**
         * init: Creates the notification anchor in the DOM
         */
        init: function() {
            _notifyContainer = document.createElement('div');
            _notifyContainer.id = 'imperial-notify-anchor';
            _notifyContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
            `;
            document.body.appendChild(_notifyContainer);
            Imperial.Kernel.registerModule("core9_notifications_active");
        },

        /**
         * send: Dispatches a visual toast message
         * @param {string} title - The headline (e.g., 'WINNER')
         * @param {string} message - The body text
         * @param {string} type - 'success', 'error', 'info', or 'gold'
         */
        send: function(title, message, type = 'info') {
            if (!_notifyContainer) this.init();

            const toast = document.createElement('div');
            const colors = {
                success: '#2ecc71',
                error: '#e74c3c',
                info: '#3498db',
                gold: '#ffd700'
            };

            toast.style.cssText = `
                background: rgba(0, 0, 0, 0.9);
                border-left: 4px solid ${colors[type]};
                color: #fff;
                padding: 12px 20px;
                border-radius: 4px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                min-width: 250px;
                transform: translateX(120%);
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                pointer-events: auto;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            `;

            toast.innerHTML = `
                <div style="font-weight: bold; color: ${colors[type]}; font-size: 0.8rem; letter-spacing: 1px;">${title.toUpperCase()}</div>
                <div style="font-size: 0.9rem; margin-top: 3px; opacity: 0.9;">${message}</div>
            `;

            _notifyContainer.appendChild(toast);

            // Trigger animation
            setTimeout(() => toast.style.transform = 'translateX(0)', 10);

            // Auto-remove after 4 seconds
            setTimeout(() => {
                toast.style.transform = 'translateX(120%)';
                setTimeout(() => toast.remove(), 400);
            }, 4000);
        }
    };

    // Attach to Global Namespace
    Imperial.Notify = NotificationModule;

    // Register with Kernel
    Imperial.Kernel.registerModule("core9_notifications");

    // Hook into the Event Bus to auto-notify on key actions
    window.addEventListener('load', () => {
        if (Imperial.Events) {
            Imperial.Events.on('SESSION_STARTED', data => {
                NotificationModule.send("System", `Welcome back, ${data.user}`, "info");
            });
        }
    });

})(window.Imperial);
