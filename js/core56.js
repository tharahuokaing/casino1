/**
 * 💬 HUOKAING THARA: CORE-56 (CHAT BRIDGE)
 * Feature: Real-time Social Logic & Filtered Messaging
 * Version: 4.0.0
 */

(function(Imperial) {
    const _chatHistory = [];
    const _bannedWords = ['scam', 'cheat', 'hack', 'admin']; // Example filter
    const _THROTTLE_MS = 1000;
    let _lastMessageTime = 0;

    const ChatBridge = {
        /**
         * send: Dispatches a message to the network
         */
        send: function(text) {
            const now = Date.now();
            if (now - _lastMessageTime < _THROTTLE_MS) return;

            const cleanText = this._filter(text);
            const message = {
                user: Imperial.Session ? "Citizen" : "Guest",
                text: cleanText,
                timestamp: now
            };

            // Send via Network Gateway (Core 37)
            Imperial.Network.request('/social/chat', {
                method: 'POST',
                body: JSON.stringify(message)
            });

            _lastMessageTime = now;
            this._addLocal(message);
        },

        _filter: function(text) {
            let filtered = text.toLowerCase();
            _bannedWords.forEach(word => {
                const reg = new RegExp(word, 'g');
                filtered = filtered.replace(reg, '***');
            });
            return filtered;
        },

        _addLocal: function(msg) {
            _chatHistory.push(msg);
            if (_chatHistory.length > 100) _chatHistory.shift();
            
            // Notify UI to render new bubble
            Imperial.Events.emit('CHAT_RECEIVED', msg);
        },

        getHistory: () => [..._chatHistory]
    };

    Imperial.Chat = ChatBridge;
    Imperial.Kernel.registerModule("core56_chat_bridge");

    // Integration: Allow AI Bots to "talk" back
    Imperial.Events.on('PLAYER_WINS_BIG', (data) => {
        setTimeout(() => {
            const bot = Imperial.AI.spawnBot();
            ChatBridge._addLocal({
                user: bot.name,
                text: `Wow! Congrats on the ${data.amount} win!`,
                isBot: true
            });
        }, 2000);
    });

})(window.Imperial);
