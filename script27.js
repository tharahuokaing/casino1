/**
 * 👑 SINGULARITY IMPERIAL CORE v25.0
 * Feature: Live Chat Feed & Global Winner Announcements
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់ Live Feed
    const style = document.createElement('style');
    style.textContent = `
        #live-feed-container {
            position: fixed; bottom: 80px; left: 20px; width: 280px;
            height: 200px; background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px); border-radius: 10px;
            border-left: 3px solid var(--gold); overflow: hidden;
            display: flex; flex-direction: column; z-index: 9000;
        }
        .feed-header { background: rgba(234, 179, 8, 0.2); padding: 5px 10px; font-size: 0.7rem; color: var(--gold); font-weight: bold; }
        .feed-messages { flex: 1; padding: 10px; font-size: 0.75rem; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
        .winner-notif { color: #10b981; animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    `;
    document.head.appendChild(style);

    // 2. បង្កើត HTML នៃ Live Feed
    const feedDiv = document.createElement('div');
    feedDiv.id = 'live-feed-container';
    feedDiv.innerHTML = `
        <div class="feed-header">🌐 GLOBAL ACTIVITY FEED</div>
        <div id="feed-messages" class="feed-messages"></div>
    `;
    document.body.appendChild(feedDiv);

    // 3. Logic បង្កើតសកម្មភាពអ្នកលេង (Simulated Players)
    const players = ["Lyna_VIP", "Sokha_Pro", "Rich_Bora", "Theara_88", "Empire_King", "Lucky_Man"];
    const actions = ["ទើបតែឈ្នះ $500 ក្នុងបាការ៉ាត់!", "កំពុងភ្នាល់ធំលើ Slots...", "បានដាក់ប្រាក់ $1000 តាម NFC", "ឈ្នះ Grand Jackpot! 🎊"];

    window.pushLiveFeed = function() {
        const msgContainer = document.getElementById('feed-messages');
        const randomPlayer = players[Math.floor(Math.random() * players.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        
        const msgHtml = `<div class="winner-notif"><b>${randomPlayer}</b>: ${randomAction}</div>`;
        
        msgContainer.insertAdjacentHTML('beforeend', msgHtml);
        
        // រក្សាសារត្រឹម ៥ ចុងក្រោយ
        if (msgContainer.children.length > 5) {
            msgContainer.removeChild(msgContainer.firstChild);
        }
        
        // រំកិលទៅក្រោមបំផុត
        msgContainer.scrollTop = msgContainer.scrollHeight;
    };

    // ដំណើរការ Feed រៀងរាល់ ៥ ទៅ ១០ វិនាទី
    setInterval(pushLiveFeed, Math.random() * 5000 + 5000);

})();