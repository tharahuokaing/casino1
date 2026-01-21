/**
 * 👑 SINGULARITY IMPERIAL CORE v20.0
 * Feature: AI Investment Assistant (Profit Forecasting)
 */

(function() {
    // 1. រូបមន្តគណនាការប្រាក់សមាស (Compound Interest Formula)
    // A = P(1 + r/n)^(nt)
    window.calculateForecast = function(principal, annualRate, years) {
        const r = annualRate / 100;
        const n = 12; // គិតការប្រាក់បូកបញ្ចូលដើមរៀងរាល់ខែ
        const amount = principal * Math.pow((1 + r/n), (n * years));
        return amount.toFixed(2);
    };

    // 2. បន្ថែម UI សម្រាប់ផ្ទាំងវិនិយោគ
    const investHtml = `
        <div id="invest-panel" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:350px; background:rgba(2,6,23,0.98); border:2px solid var(--accent); border-radius:15px; padding:20px; z-index:7000; box-shadow: 0 0 40px var(--accent);">
            <h3 style="color:var(--gold); text-align:center;">📈 ជំនួយការវិនិយោគអធិរាជ</h3>
            <div style="margin-bottom:10px;">
                <label style="font-size:0.8rem;">ដើមទុនវិនិយោគ ($):</label>
                <input type="number" id="inv-amount" value="100" style="width:100%; background:#000; border:1px solid var(--accent); color:white; padding:5px; margin-top:5px;">
            </div>
            <div style="margin-bottom:10px;">
                <label style="font-size:0.8rem;">ប្រភេទទ្រព្យសកម្ម:</label>
                <select id="inv-type" style="width:100%; background:#000; border:1px solid var(--accent); color:white; padding:5px; margin-top:5px;">
                    <option value="8">មាស (មធ្យម ៨%/ឆ្នាំ)</option>
                    <option value="15">S&P 500 (មធ្យម ១៥%/ឆ្នាំ)</option>
                    <option value="60">Crypto (មធ្យម ៦០%/ឆ្នាំ - ហានិភ័យខ្ពស់)</option>
                </select>
            </div>
            <div style="margin-bottom:10px;">
                <label style="font-size:0.8rem;">រយៈពេល (ឆ្នាំ):</label>
                <input type="number" id="inv-years" value="1" style="width:100%; background:#000; border:1px solid var(--accent); color:white; padding:5px; margin-top:5px;">
            </div>
            <button onclick="runInvestmentSim()" style="width:100%; padding:10px; background:var(--accent); border:none; color:white; font-weight:bold; cursor:pointer; margin-top:10px;">គណនាការព្យាករណ៍</button>
            <div id="inv-result" style="margin-top:15px; font-size:0.9rem; text-align:center; color:var(--gold);"></div>
            <button onclick="document.getElementById('invest-panel').style.display='none'" style="width:100%; padding:5px; background:transparent; border:1px solid #334155; color:#94a3b8; margin-top:10px; cursor:pointer;">បិទ</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', investHtml);

    // 3. មុខងារដំណើរការការត្រួតពិនិត្យ និងបង្ហាញលទ្ធផល
    window.runInvestmentSim = function() {
        const p = parseFloat(document.getElementById('inv-amount').value);
        const r = parseFloat(document.getElementById('inv-type').value);
        const t = parseFloat(document.getElementById('inv-years').value);
        
        const finalAmount = calculateForecast(p, r, t);
        const profit = (finalAmount - p).toFixed(2);
        
        const resultDiv = document.getElementById('inv-result');
        resultDiv.innerHTML = `
            <div style="border-top:1px solid #334155; padding-top:10px;">
                ទ្រព្យសរុបនឹងកើនដល់: <b>$${finalAmount}</b><br>
                <span style="color:#10b981;">ចំណេញដុល: +$${profit}</span>
            </div>
        `;
        
        speak(`ប្រសិនបើព្រះអង្គវិនិយោគ ${p} ដុល្លារ រយៈពេល ${t} ឆ្នាំ ព្រះអង្គនឹងទទួលបានទ្រព្យសរុបចំនួន ${finalAmount} ដុល្លារ។`);
    };

    // បើកផ្ទាំងវិនិយោគដោយបញ្ជា "វិនិយោគ"
    window.openInvestmentAssistant = function() {
        document.getElementById('invest-panel').style.display = 'block';
    }
})();