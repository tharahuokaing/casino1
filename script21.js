/**
 * 👑 SINGULARITY IMPERIAL CORE v19.0
 * Feature: AI Financial Report & Investment Advice
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់ផ្ទាំងរបាយការណ៍ (Financial Overlay)
    const style = document.createElement('style');
    style.textContent = `
        #financial-report {
            display: none; position: fixed; top: 50%; left: 50%;
            transform: translate(-50%, -50%); width: 400px;
            background: rgba(2, 6, 23, 0.95); border: 2px solid var(--gold);
            border-radius: 20px; padding: 25px; z-index: 6000;
            box-shadow: 0 0 50px rgba(234, 179, 8, 0.3); backdrop-filter: blur(15px);
        }
        .report-header { font-size: 1.2rem; color: var(--gold); margin-bottom: 15px; border-bottom: 1px solid #334155; padding-bottom: 10px; text-align: center; }
        .advice-box { background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--accent); padding: 10px; margin-top: 15px; font-style: italic; font-size: 0.9rem; }
    `;
    document.head.appendChild(style);

    // 2. បញ្ចូល HTML នៃរបាយការណ៍ទៅក្នុង Body
    const reportHtml = `
        <div id="financial-report">
            <div class="report-header">📜 របាយការណ៍ហិរញ្ញវត្ថុអធិរាជ</div>
            <div id="report-content" style="font-size: 0.85rem; line-height: 1.6;">
                កំពុងវិភាគទិន្នន័យទីផ្សារ...
            </div>
            <div id="ai-advice" class="advice-box"></div>
            <button onclick="document.getElementById('financial-report').style.display='none'" style="margin-top:20px; width:100%; padding:10px; background:var(--gold); border:none; border-radius:10px; cursor:pointer; font-weight:bold;">ថ្វាយបង្គំលា</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', reportHtml);

    // 3. មុខងារវិភាគ និងសង្ខេបរបាយការណ៍ (AI Analysis Engine)
    window.generateFinancialReport = async function() {
        const reportPanel = document.getElementById('financial-report');
        const content = document.getElementById('report-content');
        const advice = document.getElementById('ai-advice');
        
        reportPanel.style.display = 'block';
        speak("ទូលព្រះបង្គំកំពុងរៀបចំរបាយការណ៍ហិរញ្ញវត្ថុថ្វាយអង្គអធិរាជ។");

        // ទាញទិន្នន័យចុងក្រោយ (Simulated values for analysis logic)
        const btcPrice = document.getElementById('btcPrice').innerText;
        const goldPrice = document.getElementById('goldPrice').innerText;
        
        // Logic វិភាគ (Algorithm)
        let trend = Math.random() > 0.5 ? "ឡើង" : "ចុះ";
        let recommendation = "";
        
        if (trend === "ឡើង") {
            recommendation = "ទីផ្សារមានសញ្ញាវិជ្ជមាន។ ព្រះអង្គអាចបន្តការកម្សាន្តដោយប្រុងប្រយ័ត្ន ប៉ុន្តែគួរដកប្រាក់ចំណេញខ្លះទៅវិនិយោគលើមាស។";
        } else {
            recommendation = "ទីផ្សារកំពុងមានសម្ពាធ។ ទូលព្រះបង្គំសូមណែនាំឱ្យព្រះអង្គ 'ផ្អាកការភ្នាល់' ជាបណ្តោះអាសន្ន ដើម្បីរក្សាមហានិធិឱ្យគង់វង្ស។";
        }

        // បង្ហាញលទ្ធផល
        content.innerHTML = `
            📅 <b>កាលបរិច្ឆេទ៖</b> ${new Date().toLocaleDateString('km-KH')}<br>
            💰 <b>មហានិធិបច្ចុប្បន្ន៖</b> $${balance.toFixed(2)}<br>
            📈 <b>និន្នាការមាស៖</b> <span style="color:${trend==='ឡើង'?'#10b981':'#ef4444'}">${goldPrice} (${trend})</span><br>
            ₿ <b>ស្ថានភាព BTC៖</b> ${btcPrice}
        `;
        advice.innerHTML = `<b>💡 ដំបូន្មាន AI:</b> ${recommendation}`;
        
        speak(recommendation);
    };

    // ៤. បន្ថែមប៊ូតុង "របាយការណ៍" ក្នុង Dashboard
    // ព្រះអង្គអាចវាយពាក្យ "របាយការណ៍" ក្នុង Chat ឬ ចុចប៊ូតុងដែលទូលព្រះបង្គំនឹងបន្ថែមក្នុង Header
})();