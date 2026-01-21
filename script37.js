/**
 * 👑 HUOKAING THARA - MOBILE ADAPTIVE ENGINE v34.0
 * Feature: Responsive Design, Touch Optimization & Mobile UI
 */

(function() {
    // 1. បន្ថែម CSS Media Queries សម្រាប់អេក្រង់តូច
    const style = document.createElement('style');
    style.textContent = `
        /* Responsive Grid System */
        @media (max-width: 1024px) {
            .command-center {
                grid-template-columns: 1fr;
                grid-template-rows: auto auto 1fr auto;
                height: auto; overflow-y: auto;
            }
            .side-panel, .panel:nth-child(4) { grid-column: 1 / -1; grid-row: auto; }
            .main-stage { grid-column: 1 / -1; height: 400px; }
            .side-nav { bottom: 0; top: auto; width: 100% !important; height: 60px; flex-direction: row; justify-content: space-around; padding: 0; border-right: none; border-top: 1px solid var(--gold); }
            .nav-item { padding: 0; justify-content: center; width: auto; }
            .nav-text { display: none !important; }
            .jackpot-banner { top: 10px; right: 10px; transform: scale(0.8); }
            .header-panel { flex-direction: column; gap: 10px; height: auto; padding: 15px; }
        }

        /* Touch Optimization */
        button, .nav-item {
            min-height: 44px; /* ទំហំស្តង់ដារសម្រាប់ម្រាមដៃចុច */
            touch-action: manipulation;
        }

        /* Adjust Table for Mobile */
        @media (max-width: 600px) {
            .table-3d { width: 95%; height: 300px; border-width: 8px; }
            .dealer-box { width: 150px; height: 220px; top: -60px; }
            .card-slot { width: 50px; height: 75px; font-size: 1rem; }
            #status { font-size: 1.2rem; }
        }
    `;
    document.head.appendChild(style);

    // 2. បន្ថែម Meta Tag សម្រាប់ Mobile Viewport (សំខាន់បំផុត)
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.head.appendChild(meta);
    }

    // 3. មុខងារបិទការ Zoom ពេលចុចពីរដង (Double-tap zoom) លើ Mobile
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    console.log("📱 Mobile Adaptive Engine v34.0 Activated.");
})();