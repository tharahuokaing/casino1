/**
 * 💻 HUOKAING THARA: CORE-16 (COMMAND CONSOLE)
 * Feature: System Interactivity & Debugging Interface
 * Version: 4.0.0
 */

(function(Imperial) {
    const _commands = {};

    const CommandConsole = {
        /**
         * register: Adds a new command that can be called via the console
         * @param {string} cmd - The keyword (e.g., 'add_cash')
         * @param {function} handler - The logic to execute
         */
        register: function(cmd, handler) {
            _commands[cmd.toLowerCase()] = handler;
        },

        /**
         * execute: Runs a registered command
         * @param {string} input - The command string (e.g., 'add_cash 1000')
         */
        execute: function(input) {
            const parts = input.split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            if (_commands[cmd]) {
                Imperial.Logger.log("INFO", `Executing Command: ${cmd}`);
                return _commands[cmd](...args);
            } else {
                Imperial.Logger.log("WARN", `Unknown Command: ${cmd}`);
                return `Command '${cmd}' not found.`;
            }
        },

        /**
         * initDefaults: Registers core system commands
         */
        initDefaults: function() {
            // Command: HELP
            this.register('help', () => {
                return "Available: " + Object.keys(_commands).join(', ');
            });

            // Command: SET_THEME [name]
            this.register('set_theme', (name) => {
                return Imperial.Theme.apply(name) ? `Theme ${name} applied.` : "Theme not found.";
            });

            // Command: GIVE_MONEY [amount] (Requires Auth Clearance)
            this.register('give_money', (amount) => {
                if (Imperial.Auth.hasAccess(9)) {
                    const val = parseFloat(amount);
                    Imperial.Security.updateBalance(val);
                    return `Granted $${val}`;
                }
                return "Unauthorized clearance level.";
            });

            Imperial.Kernel.registerModule("core16_terminal_active");
        }
    };

    // Attach to Global Namespace
    Imperial.Console = CommandConsole;

    // Register with Kernel
    Imperial.Kernel.registerModule("core16_command_console");

    // Initialize defaults on load
    window.addEventListener('load', () => CommandConsole.initDefaults());

})(window.Imperial);
