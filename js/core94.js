/**
 * 👥 HUOKAING THARA: CORE-94 (SOCIAL PRESENCE)
 * Feature: Real-time Buddy List & Activity Feed
 * Version: 4.0.0
 */

(function(Imperial) {
    const _friends = new Map();

    const SocialTracker = {
        init: function() {
            // Listen for presence updates from the High Command
            Imperial.Events.on('WS_SOCIAL_UPDATE', (data) => this._updatePresence(data));
            
            Imperial.Logger.log("SOCIAL", "Social Presence Tracker initialized.");
        },

        /**
         * _updatePresence: Syncs the status of friends in the registry
         */
        _updatePresence: function(payload) {
            // payload: { userId: '123', status: 'ONLINE', activity: 'Dragon_Slot' }
            _friends.set(payload.userId, {
                status: payload.status,
                activity: payload.activity,
                lastSeen: Date.now()
            });

            Imperial.Events.emit('SOCIAL_UI_REFRESH', Array.from(_friends.values()));
        },

        /**
         * broadcastWin: Sends a signal to friends about a local victory
         */
        broadcastWin: function(amount, currency) {
            if (amount > 1000) {
                Imperial.Network.send({
                    type: 'SOCIAL_SHOUT',
                    msg: `Just won ${amount} ${currency} in the Plaza!`,
                    game: Imperial.Context.getCurrentGame()
                });
            }
        },

        getOnlineCount: function() {
            return Array.from(_friends.values()).filter(f => f.status === 'ONLINE').length;
        },

        getFriendStatus: (userId) => _friends.get(userId)
    };

    Imperial.Social = SocialTracker;
    Imperial.Kernel.registerModule("core94_social_presence");

    // Integration: Auto-shout on Big Wins
    Imperial.Events.on('BIG_WIN_REVEALED', (data) => {
        SocialTracker.broadcastWin(data.amount, data.currency);
    });

    SocialTracker.init();

})(window.Imperial);
