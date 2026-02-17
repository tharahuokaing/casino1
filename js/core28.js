/**
 * 🎇 HUOKAING THARA: CORE-28 (FX ENGINE)
 * Feature: Particle Emission & Visual Feedback
 * Version: 4.0.0
 */

(function(Imperial) {
    const _particles = [];

    const FXEngine = {
        /**
         * spawnBurst: Creates a burst of elements at a specific coordinate
         */
        spawnBurst: function(x, y, count = 20, color = '#ffd700') {
            for (let i = 0; i < count; i++) {
                const p = this._createParticle(x, y, color);
                _particles.push(p);
                document.body.appendChild(p.el);
                this._animateParticle(p);
            }
        },

        _createParticle: function(x, y, color) {
            const el = document.createElement('div');
            el.className = 'imp-particle';
            el.style.backgroundColor = color;
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            
            return {
                el: el,
                vx: (Math.random() - 0.5) * 10, // Velocity X
                vy: (Math.random() - 0.5) * 10 - 5, // Velocity Y (upward)
                life: 1.0
            };
        },

        _animateParticle: function(p) {
            const gravity = 0.2;
            const step = () => {
                p.vy += gravity;
                p.life -= 0.02;
                
                const curLeft = parseFloat(p.el.style.left);
                const curTop = parseFloat(p.el.style.top);
                
                p.el.style.left = `${curLeft + p.vx}px`;
                p.el.style.top = `${curTop + p.vy}px`;
                p.el.style.opacity = p.life;

                if (p.life > 0) {
                    requestAnimationFrame(step);
                } else {
                    p.el.remove();
                }
            };
            requestAnimationFrame(step);
        }
    };

    Imperial.FX = FXEngine;
    Imperial.Kernel.registerModule("core28_fx_engine");

    // Integration: Auto-burst on BIG_WIN
    Imperial.Events.on('BIG_WIN', (data) => {
        FXEngine.spawnBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
    });

})(window.Imperial);
