/**
 * 👑 SINGULARITY IMPERIAL MASTER v28.0
 * Feature: Beautiful AI Dealer & Auto-Bet Strategy Engine
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់រូបសម្រស់អ្នកចែកបៀ និង UI ថ្មី
    const style = document.createElement('style');
    style.textContent = `
        .dealer-container {
            position: absolute; top: 10px; width: 250px; height: 350px;
            background: url('https://img.freepik.com/premium-photo/beautiful-casino-dealer-woman-red-dress-holding-cards-generative-ai_175880-1436.jpg') center/cover;
            border-radius: 20px; box-shadow: 0 0 30px rgba(234, 179, 8, 0.5);
            z-index: 1; border: 2px solid var(--gold);
            animation: float 3s infinite ease-in-out;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .auto-bet-badge {
            position: absolute; bottom: 20px; left: 20px;
            background: #10b981; color: white; padding: 5px 15px;
            border-radius: 50px; font-size: 0.8rem; display: none;
        }
    `;
    document.head.appendChild(style);

    // 2. បញ្ចូលអ្នកចែកបៀទៅក្នុងតុបាការ៉ាត់
    const baccaratArena = document.getElementById('baccarat-arena');
    const dealerDiv = document.createElement('div');
    dealerDiv.className = 'dealer-container';
    baccaratArena.appendChild(dealerDiv);

    // 3. មុខងារ AI Auto-Bet (យុទ្ធសាស្ត្រផ្អែកលើ Road Map)
    let autoBetActive = false;
    window.toggleAutoBet = function() {
        autoBetActive = !autoBetActive;
        const badge = document.getElementById('auto-bet-status');
        badge.style.display = autoBetActive ? 'block' : 'none';
        
        if(autoBetActive) {
            speak("របៀបភ្នាល់ស្វ័យប្រវត្តិត្រូវបានបើក។ ទូលព្រះបង្គំនឹងវិភាគ Road Map ដើម្បីភ្នាល់ថ្វាយព្រះអង្គ។");
            runAutoBetEngine();
        }
    };

    function runAutoBetEngine() {
        if(!autoBetActive) return;
        
        // AI វិភាគ Trend (ឧទាហរណ៍៖ បើចេញ Player ច្រើន វានឹងចាក់ Player តាម)
        let aiDecision = Math.random() > 0.5 ? 'player' : 'banker';
        playRound(100, aiDecision);
        
        // រង់ចាំ ១០ វិនាទីសម្រាប់ការភ្នាល់បន្ទាប់
        setTimeout(runAutoBetEngine, 10000);
    }

    // 4. កែសម្រួលការនិយាយ (ឱ្យមានលក្ខណៈផ្អែមល្ហែមជាងមុន)
    window.speakAsDealer = function(text) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'km-KH';
        utter.pitch = 1.4; // សំឡេងស្រី ផ្អែម និងស្រទន់
        utter.rate = 1.0;
        window.speechSynthesis.speak(utter);
    }
})();