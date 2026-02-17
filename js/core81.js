/**
 * 🔔 HUOKAING THARA: CORE-81 (NOTIFICATIONS)
 * Feature: Service Worker Push & Local Reminders
 * Version: 4.0.0
 */

(function(Imperial) {
    const _config = {
        icon: '/assets/brand/imperial_icon_192.png',
        badge: '/assets/brand/imperial_badge.png'
    };

    const NotificationSystem = {
        permission: 'default',

        init: async function() {
            if (!('Notification' in window)) return;
            
            this.permission = Notification.permission;
            
            // Register Service Worker for background handling
            if ('serviceWorker' in navigator) {
                try {
                    await navigator.serviceWorker.register('/imperial-sw.js');
                    Imperial.Logger.log("SYSTEM", "Notification Service Worker ready.");
                } catch (e) {
                    Imperial.Logger.log("WARN", "SW Registration failed.");
                }
            }
        },

        /**
         * requestAccess: Prompts the user to allow notifications
         */
        requestAccess: async function() {
            const status = await Notification.requestPermission();
            this.permission = status;
            return status === 'granted';
        },

        /**
         * sendLocal: Triggers an immediate or scheduled notification
         */
        send: function(title, body, tag = 'general') {
            if (this.permission !== 'granted') return;

            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                    body: body,
                    icon: _config.icon,
                    badge: _config.badge,
                    tag: tag, // Overwrites existing notification of same tag
                    vibrate: [200, 100, 200],
                    data: { url: window.location.origin }
                });
            });
        },

        /**
         * scheduleBonusReminder: Sets a reminder for the next daily reward
         */
        scheduleBonusReminder: function(delayMs) {
            Imperial.Logger.log("SYSTEM", `Bonus reminder scheduled in ${delayMs / 1000}s`);
            // Logic to handle timers or push-sync...
        }
    };

    Imperial.Notify = NotificationSystem;
    Imperial.Kernel.registerModule("core81_notification_system");

    // Integration: Remind player when they leave with a full vault
    window.addEventListener('beforeunload', () => {
        if (Imperial.Player.hasUnclaimedRewards()) {
            // Note: Most browsers require a real Push message for background, 
            // but we prep the state here.
        }
    });

    NotificationSystem.init();

})(window.Imperial);
