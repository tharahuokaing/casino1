/**
 * 👻 HUOKAING THARA: CORE-85 (TUTORIAL GHOST)
 * Feature: Contextual Highlights & Animated Onboarding
 * Version: 4.0.0
 */

(function(Imperial) {
    const _steps = {
        WELCOME: { target: '#spin-btn', text: 'Tap here to begin your journey!', arrow: 'down' },
        VAULT_INTRO: { target: '#vault-icon', text: 'Your riches are stored here.', arrow: 'right' }
    };

    const TutorialGhost = {
        _active: false,

        /**
         * showStep: Spotlights a specific UI element
         */
        showStep: function(stepId) {
            const step = _steps[stepId];
            const targetEl = document.querySelector(step.target);
            if (!targetEl) return;

            this._active = true;
            const rect = targetEl.getBoundingClientRect();

            // 1. Create the "Spotlight" Mask
            this._drawOverlay(rect);

            // 2. Spawn the "Ghost Hand" (Animated CSS/SVG)
            this._spawnGhostHand(rect.left + rect.width/2, rect.top + rect.height/2);

            // 3. Show the Tooltip
            Imperial.Notify.showTooltip(rect, step.text, step.arrow);

            Imperial.Logger.log("UI", `Onboarding Step Triggered: ${stepId}`);
        },

        _drawOverlay: function(rect) {
            const overlay = document.querySelector('#imp-tutorial-overlay') || document.createElement('div');
            overlay.id = 'imp-tutorial-overlay';
            // CSS 'mask-image' uses radial-gradient to "punch a hole" over the rect
            overlay.style.maskImage = `radial-gradient(circle at ${rect.left + rect.width/2}px ${rect.top + rect.height/2}px, transparent 50px, black 51px)`;
            document.body.appendChild(overlay);
        },

        _spawnGhostHand: function(x, y) {
            const hand = document.createElement('div');
            hand.className = 'imp-ghost-hand-anim';
            hand.style.left = `${x}px`;
            hand.style.top = `${y}px`;
            document.body.appendChild(hand);
        },

        dismiss: function() {
            const overlay = document.querySelector('#imp-tutorial-overlay');
            const hand = document.querySelector('.imp-ghost-hand-anim');
            if (overlay) overlay.remove();
            if (hand) hand.remove();
            this._active = false;
        }
    };

    Imperial.Ghost = TutorialGhost;
    Imperial.Kernel.registerModule("core85_tutorial_ghost");

    // Integration: Auto-trigger for new citizens
    Imperial.Events.on('ENGINE_READY', () => {
        if (Imperial.Player.isNew()) {
            setTimeout(() => TutorialGhost.showStep('WELCOME'), 2000);
        }
    });

})(window.Imperial);
