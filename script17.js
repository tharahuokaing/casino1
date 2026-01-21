/**
 * 👑 SINGULARITY IMPERIAL CORE v16.0
 * Feature: Biometric Security Log + Snapshot Capture
 */

(function() {
    // 1. បង្កើតអារេសម្រាប់រក្សាកំណត់ត្រាសន្តិសុខ
    let securityLogs = JSON.parse(localStorage.getItem('imperial_logs')) || [];

    // 2. មុខងារថតរូប និងកត់ត្រា (Security Logging)
    window.captureSecurityLog = function(status) {
        const video = document.getElementById('webcam');
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 300;
        canvas.height = video.videoHeight || 300;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // បំប្លែងរូបភាពទៅជា Base64
        const snapshot = canvas.toDataURL('image/png');
        const timestamp = new Date().toLocaleString('km-KH');

        const logEntry = {
            time: timestamp,
            status: status, // "GRANTED" or "DENIED"
            image: snapshot
        };

        securityLogs.push(logEntry);
        // រក្សាទុកតែ ៥០ កំណត់ត្រាចុងក្រោយដើម្បីកុំឱ្យធ្ងន់ប្រព័ន្ធ
        if (securityLogs.length > 50) securityLogs.shift();
        localStorage.setItem('imperial_logs', JSON.stringify(securityLogs));
    };

    // 3. ការកែសម្រួលមុខងារ Face Scan (បញ្ចូលការថតរូប)
    const originalScan = window.startFaceScan;
    window.startFaceScan = function() {
        // ... (កូដ Scan ពី v15.0) ...
        
        setTimeout(() => {
            const isAuthorized = true; // ក្នុង Simulation យើងឱ្យ Granted ជានិច្ចសម្រាប់ព្រះអង្គ
            captureSecurityLog(isAuthorized ? "SUCCESS" : "INTRUDER");
            
            // បន្តទៅកាន់វគ្គ PIN...
        }, 3000);
    };

    // 4. ផ្ទាំងបញ្ជាសម្រាប់អង្គអធិរាជបើកមើល Log (Secret Access)
    window.showSecurityLogs = function() {
        let logHTML = `
            <div id="log-viewer" style="position:fixed; top:10%; left:10%; width:80%; height:80%; background:#000; border:2px solid var(--gold); z-index:5000; overflow-y:auto; padding:20px;">
                <h2 style="color:var(--gold);">📋 កំណត់ត្រាសន្តិសុខអធិរាជ</h2>
                <button onclick="document.body.removeChild(this.parentElement)" style="float:right; background:red; color:white; border:none; padding:5px 15px; cursor:pointer;">បិទ</button>
                <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap:20px;">
        `;

        securityLogs.reverse().forEach(log => {
            logHTML += `
                <div style="border:1px solid #333; padding:10px; text-align:center; background:#111;">
                    <img src="${log.image}" style="width:100%; border-radius:5px;">
                    <p style="font-size:0.7rem; color:${log.status === 'SUCCESS' ? '#10b981' : 'red'};">${log.time}</p>
                    <p style="font-weight:bold;">Status: ${log.status}</p>
                </div>
            `;
        });

        logHTML += `</div></div>`;
        const div = document.createElement('div');
        div.innerHTML = logHTML;
        document.body.appendChild(div.firstChild);
    };

    // បន្ថែមពាក្យបញ្ជាសំងាត់ឱ្យ AI បើក Log៖ "បង្ហាញកំណត់ត្រាសន្តិសុខ"
})();