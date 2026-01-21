/**
 * 👑 SINGULARITY IMPERIAL MASTER v32.0
 * Feature: Grid Command Center & Dynamic Theme Switcher (Dark/Light)
 */

(function() {
    // 1. បន្ថែម Variable សម្រាប់ Theme (Dark/Light)
    const style = document.createElement('style');
    style.id = "imperial-theme-engine";
    style.textContent = `
        :root {
            --bg: #020617; --card-bg: rgba(255,255,255,0.05);
            --text: #f8fafc; --gold: #eab308; --accent: #3b82f6;
            --border: rgba(255,255,255,0.1);
        }
        .light-mode {
            --bg: #f1f5f9; --card-bg: #ffffff;
            --text: #1e293b; --gold: #b45309; --accent: #2563eb;
            --border: rgba(0,0,0,0.1);
        }

        body { background: var(--bg); color: var(--text); transition: 0.5s; }

        /* Grid Layout for Command Center */
        .command-center {
            display: grid;
            grid-template-columns: 300px 1fr 300px;
            grid-template-rows: 80px 1fr 200px;
            gap: 15px; height: 100vh; padding: 15px; box-sizing: border-box;
        }

        .panel {
            background: var(--card-bg); border: 1px solid var(--border);
            border-radius: 15px; backdrop-filter: blur(10px);
            padding: 20px; display: flex; flex-direction: column;
        }

        .header-panel { grid-column: 1 / 4; display: flex; justify-content: space-between; align-items: center; }
        .side-panel { grid-row: 2 / 4; }
        .main-stage { grid-column: 2 / 3; grid-row: 2 / 3; position: relative; overflow: hidden; }
        .bottom-feed { grid-column: 2 / 4; grid-row: 3 / 4; }

        /* Theme Toggle Button */
        .theme-btn {
            background: var(--gold); border: none; padding: 8px 15px;
            border-radius: 20px; cursor: pointer; font-weight: bold; color: #000;
        }
    `;
    document.head.appendChild(style);

    // 2. ការរៀបចំ HTML Structure ថ្មី (Grid System)
    window.renderCommandCenter = function() {
        document.body.innerHTML = `
            <div id="main-ui" class="command-center">
                <div class="panel header-panel">
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--gold);">🏛️ IMPERIAL COMMAND CENTER</div>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <span id="clock" style="font-family: monospace;">00:00:00</span>
                        <button class="theme-btn" onclick="toggleTheme()">🌓 ប្តូរពន្លឺ</button>
                    </div>
                </div>

                <div class="panel side-panel">
                    <h3 style="border-bottom: 1px solid var(--gold);">💰 មហានិធិ</h3>
                    <div id="balance-display" style="font-size: 1.8rem; margin: 10px 0;">$${balance.toFixed(2)}</div>
                    <hr style="width:100%; opacity:0.1;">
                    <h4>📈 ទីផ្សារផ្សាយផ្ទាល់</h4>
                    <div id="market-news" style="font-size: 0.8rem; color: var(--accent);">
                        BTC: Loading...<br>GOLD: Loading...
                    </div>
                </div>

                <div class="panel main-stage" id="game-stage">
                    <div id="dealer-view" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                        <div class="dealer-box" id="dealer-img" style="position:relative; top:0;"></div>
                    </div>
                </div>

                <div class="panel">
                    <h3 style="border-bottom: 1px solid var(--gold);">🛠️ បញ្ជាការ</h3>
                    <button onclick="openVault()" style="margin-bottom:10px;">🗝️ បើកបន្ទប់សម្ងាត់</button>
                    <button onclick="toggleAutoBet()">🤖 ម៉ាស៊ីន Auto-Bet</button>
                </div>

                <div class="panel bottom-feed">
                    <h4 style="margin: 0 0 10px 0; font-size: 0.7rem; color: var(--gold);">🌐 GLOBAL LIVE FEED</h4>
                    <div id="feed-messages" style="font-size: 0.75rem; overflow-y: auto;"></div>
                </div>
            </div>
        `;
    };

    // 3. Theme Toggle Logic
    window.toggleTheme = function() {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        speak(isLight ? "បានប្តូរទៅជារបៀបពន្លឺថ្ងៃ" : "បានប្តូរទៅជារបៀបរាត្រី");
    };

    // 4. Clock Engine
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString();
    }, 1000);

})();