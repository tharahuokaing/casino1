/**
 * 🔔 HUOKAING THARA: CORE-38 (NOTIFICATIONS)
 * Feature: Animated Toast Alerts & Message Queuing
 * Version: 4.0.0
 */

(function(Imperial) {
    const _toastContainer = document.createElement('div');
    _toastContainer.id = 'imp-toast-container';
    _toastContainer.style = `
        position: fixed; bottom: 20px; left: 50%; 
        transform: translateX(-50%); z-index: 10000;
        display: flex; flex-direction: column-reverse; gap: 10px;
    `;
    document.body.appendChild(_toastContainer);

    const NotificationSystem = {
        /**
         * send: Dispatches a visual alert
         * @param {string} title - The bold header
         * @param {string} msg - The detail text
         * @param {string} type - 'info', 'success', 'warning', or 'danger'
         */
        send: function(title, msg, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `imp-toast imp-toast-${type}`;
            toast.innerHTML = `
                <div class="toast-content">
                    <strong>${title}</strong><br/>
                    <span>${msg}</span>
                </div>
            `;

            _toastContainer.appendChild(toast);

            // Play sound based on type via core13
            if (Imperial.Sound) {
                const sfx = type === 'success' ? 'notif_win' : 'notif_generic';
                Imperial.Sound.playSFX(sfx);
            }

            // Animate In and Out
            this._animate(toast);
        },

        _animate: function(el) {
            // Entry animation
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });

            // Auto-remove after 4 seconds
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(-20px)';
                setTimeout(() => el.remove(), 400);
            }, 4000);
        }
    };

    // Attach to Global Namespace
    Imperial.Notify = NotificationSystem;

    // Register with Kernel
    Imperial.Kernel.registerModule("core38_notification_system");

    // Integration: Listen for system-wide errors
    Imperial.Events.on('NETWORK_OFFLINE', () => {
        NotificationSystem.send("Connection Lost", "Attempting to reconnect...", "danger");
    });

})(window.Imperial);
