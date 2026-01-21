 /**
 * 👑 SINGULARITY IMPERIAL CORE v12.0
 * Feature: 3D Holographic Hub + Modern Wallpaper + Game Redirect
 */

(function() {
    // 1. រៀបចំរចនាបថ UI បែប Hologram & 3D
    const style = document.createElement('style');
    style.textContent = `
        :root { --accent: #3b82f6; --gold: #eab308; }
        body { 
            margin: 0; padding: 0; height: 100vh;
            background: url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop') no-repeat center center fixed;
            background-size: cover; font-family: 'Kantumruy Pro', sans-serif;
            color: white; overflow: hidden;
        }
        .overlay { background: rgba(0, 0, 0, 0.7); height: 100vh; width: 100%; display: flex; flex-direction: column; backdrop-filter: blur(10px); }
        
        /* Dashboard Header */
        header { padding: 20px 40px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.5); }
        .treasury { color: var(--gold); font-weight: bold; font-size: 1.2rem; text-shadow: 0 0 10px var(--gold); }

        /* Game Grid - 3D Hologram Effect */
        .game-hub { flex: 1; display: flex; justify-content: center; align-items: center; gap: 40px; perspective: 1000px; }
        .game-card {
            width: 250px; height: 350px; background: rgba(255, 255, 255, 0.1);
            border-radius: 20px; border: 1px solid rgba(59, 130, 246, 0.5);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative; overflow: hidden; backdrop-filter: blur(5px);
        }
        .game-card:hover {
            transform: scale(1.1) rotateY(10deg);
            box-shadow: 0 0 50px rgba(59, 130, 246, 0.8);
            border-color: var(--gold);
        }
        .game-card img { width: 120px; height: 120px; margin-bottom: 20px; filter: drop-shadow(0 0 10px var(--accent)); }
        .game-card h2 { margin: 0; font-size: 1.5rem; letter-spacing: 2px; text-shadow: 0 0 5px white; }
        .game-card p { font-size: 0.8rem; color: #94a3b8; }
        
        /* Hologram Scanline Effect */
        .game-card::after {
            content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                        linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 2px, 3px 100%; pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // 2. ចាក់បញ្ចូល HTML នៃ Hub ថ្មី
    document.body.innerHTML = `
        <div class="overlay">
            <header>
                <div style="font-size: 1.5rem; font-weight: bold;">✨ SINGULARITY IMPERIAL OS</div>
                <div class="treasury">💰 TREASURY: <span id="balanceDisplay">$220.00</span></div>
            </header>

            <div class="game-hub">
                <div class="game-card" onclick="openGame('Baccarat')">
                    <img src="https://cdn-icons-png.flaticon.com/512/1055/1055823.png" alt="Baccarat">
                    <h2>BACCARAT</h2>
                    <p>Imperial Card Game</p>
                </div>

                <div class="game-card" onclick="openGame('Roulette')">
                    <img src="https://cdn-icons-png.flaticon.com/512/2641/2641433.png" alt="Roulette">
                    <h2>ROULETTE</h2>
                    <p>European Standard</p>
                </div>

                <div class="game-card" onclick="openGame('Slots')">
                    <img src="https://cdn-icons-png.flaticon.com/512/8153/8153028.png" alt="Slots">
                    <h2>SLOTS</h2>
                    <p>Royal Jackpot</p>
                </div>
            </div>

            <div style="text-align: center; padding: 20px; color: #64748b; font-size: 0.8rem;">
                Powered by Singularity AI v4.0 | Imperial Security Active
            </div>
        </div>
    `;

    // 3. មុខងារបើកហ្គេម (Redirect Logic)
    window.openGame = function(gameName) {
        speak("កំពុងបើកដំណើរការ " + gameName);
        
        // បង្ហាញ Loading Effect
        const hub = document.querySelector('.game-hub');
        hub.style.opacity = '0';
        hub.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            alert("Redirecting to " + gameName + " Engine...");
            // ក្នុងដំណាក់កាលនេះ ព្រះអង្គអាចឱ្យវាបើកផ្ទាំង Chat Game ពីមុនមកវិញ
            // ឬ Redirect ទៅ URL ផ្សេង៖ window.location.href = 'baccarat.html';
            location.reload(); // សាកល្បង Reload ដើម្បីបង្ហាញការផ្លាស់ប្តូរ
        }, 1000);
    };

    function speak(text) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'km-KH';
        window.speechSynthesis.speak(utter);
    }
})();