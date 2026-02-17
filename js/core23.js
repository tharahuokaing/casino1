/**
 * 📊 HUOKAING THARA: CORE-24 (STATISTICS)
 */
            // Statistical calculations
            const StatisticsEngine = {
                getWinRate: function() {
                    const history = Imperial.Ledger.getHistory();
                    const wins = history.filter(e => e.type === 'PAYOUT').length;
                    const total = history.filter(e => e.type === 'WAGER' || e.type === 'PAYOUT').length;
                    return total === 0 ? 0 : ((wins / total) * 100).toFixed(2);
                },

                getHighestWin: function() {
                    const history = Imperial.Ledger.getHistory();
                    const payouts = history.filter(e => e.type === 'PAYOUT').map(e => e.amount);
                    return payouts.length > 0 ? Math.max(...payouts) : 0;
                }
            };

            Imperial.Stats = StatisticsEngine;
            Imperial.Kernel.registerModule("core24_statistics_engine");

})(window.Imperial);
