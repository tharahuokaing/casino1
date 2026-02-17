/**
 * 🚦 HUOKAING THARA: CORE-18 (STATE MACHINE)
 * Feature: Game Phase Control & Input Locking
 * Version: 4.0.0
 */

(function(Imperial) {
    // Define valid transitions to prevent "illegal" state jumps
    const _validTransitions = {
        'IDLE': ['BETTING'],
        'BETTING': ['LOCKED', 'IDLE'],
        'LOCKED': ['PROCESSING'],
        'PROCESSING': ['RESULT'],
        'RESULT': ['IDLE']
    };

    let _currentState = 'IDLE';

    const StateMachine = {
        /**
         * transition: Moves the system to a new phase
         * @param {string} newState - The target state
         */
        transition: function(newState) {
            const allowed = _validTransitions[_currentState];

            if (allowed && allowed.includes(newState)) {
                const oldState = _currentState;
                _currentState = newState;

                Imperial.Logger.log("INFO", `State Change: ${oldState} -> ${newState}`);
                
                // Notify the entire empire of the phase change
                Imperial.Events.emit('STATE_CHANGE', {
                    from: oldState,
                    to: newState,
                    timestamp: Date.now()
                });

                return true;
            } else {
                Imperial.Logger.log("ERROR", `Illegal State Jump: ${_currentState} to ${newState}`);
                return false;
            }
        },

        /**
         * is: Quick check for current phase
         */
        is: function(stateName) {
            return _currentState === stateName;
        },

        getCurrent: function() {
            return _currentState;
        }
    };

    // Attach to Global Namespace
    Imperial.State = StateMachine;

    // Register with Kernel
    Imperial.Kernel.registerModule("core18_state_machine");

    // Integration: Auto-lock UI buttons when state is not BETTING
    Imperial.Events.on('STATE_CHANGE', (data) => {
        if (data.to !== 'BETTING') {
            document.body.classList.add('state-locked');
        } else {
            document.body.classList.remove('state-locked');
        }
    });

})(window.Imperial);
