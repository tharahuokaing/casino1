/**
 * 🛠️ HUOKAING THARA: CORE-36 (DEBUG SUITE)
 * Feature: Real-time Variable Inspection & State Forcing
 * Version: 4.0.0
 */

(function(Imperial) {
    const _config = {
        enabled: true,
        visible: false
    };

    const DebugSuite = {
        init: function() {
            this._createUI();
            this._bindShortcuts();
            Imperial.Logger.log("DEBUG", "Inspector Ready. Press [~] to toggle.");
        },

        _createUI: function() {
            const panel = document.createElement('div');
            panel.id = 'imp-debug-panel';
            panel.style = `
                display: none; position: fixed; top: 0; right: 0; 
                width: 300px; height: 100vh; background: rgba(0,0,0,0.9);
                color: #0f0; font-family: monospace; padding: 10px;
                z-index: 9999; border-left: 2px solid #0f0; overflow-y: auto;
            `;
            panel.innerHTML = `
                <h2 style="color:#fff">IMPERIAL INSPECTOR</h2>
                <hr/>
                <div id="debug-stats"></div>
                <hr/>
                <button onclick="Imperial.Debug.forceWin()">Force BIG_WIN</button>
                <button onclick="Imperial.Debug.addCash()">+1000 Cash</button>
                <hr/>
                <div id="debug-logs" style="font-size:10px"></div>
            `;
            document.body.appendChild(panel);
            this._panel = panel;
        },

        _bindShortcuts: function() {
            window.addEventListener('keydown', (e) => {
                if (e.key === '`') this.toggle(); // Tilde key
            });
        },

        toggle: function() {
            _config.visible = !_config.visible;
            this._panel.style.display = _config.visible ? 'block' : 'none';
            if (_config.visible) this.startLiveUpdate();
        },

        startLiveUpdate: function() {
            const update = () => {
                if (!_config.visible) return;
                const stats = document.getElementById('debug-stats');
                stats.innerHTML = `
                    FPS: ${Imperial.Monitor.getFPS()}<br>
                    State: ${Imperial.State.getCurrent()}<br>
                    Balance: ${Imperial.Security.getBalance()}<br>
                    Language: ${Imperial.Locale ? 'Active' : 'N/A'}
                `;
                requestAnimationFrame(update);
            };
            update();
        },

        // Test Helpers
        forceWin: () => Imperial.Events.emit('BIG_WIN', { amount: 5000 }),
        addCash: () => Imperial.Security.updateBalance(1000)
    };

    Imperial.Debug = DebugSuite;
    Imperial.Kernel.registerModule("core36_debug_suite");
    window.addEventListener('load', () => DebugSuite.init());

})(window.Imperial);
