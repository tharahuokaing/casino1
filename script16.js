/**
 * 👑 SINGULARITY IMPERIAL CORE v15.0
 * Feature: 3D Hologram Face Recognition Simulation
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់ផ្ទាំងស្កេនព្រះភ័ក្ត្រ
    const style = document.createElement('style');
    style.textContent = `
        #face-scan-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.9); z-index: 2000;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .scanner-frame {
            width: 300px; height: 300px; border: 2px solid var(--accent);
            position: relative; box-shadow: 0 0 20px var(--accent);
            border-radius: 50%; overflow: hidden; background: #000;
        }
        .scan-line {
            width: 100%; height: 4px; background: var(--accent);
            position: absolute; top: 0; box-shadow: 0 0 15px var(--accent);
            animation: scan-move 2s infinite ease-in-out;
        }
        @keyframes scan-move {
            0% { top: 0%; }
            50% { top: 100%; }
            100% { top: 0%; }
        }
        .scan-data {
            color: var(--accent); font-family: 'Courier New', monospace;
            font-size: 0.8rem; margin-top: 20px; text-align: center;
        }
    `;
    document.head.appendChild(style);

    // 2. មុខងារចាប់ផ្តើមស្កេនព្រះភ័ក្ត្រ (Face Scan Simulation)
    window.startFaceScan = function() {
        // បង្កើត HTML Overlay
        const scanOverlay = document.createElement('div');
        scanOverlay.id = 'face-scan-overlay';
        scanOverlay.innerHTML = `
            <div class="scanner-frame">
                <div class="scan-line"></div>
                <video id="webcam" autoplay muted style="width:100%; height:100%; object-fit:cover; opacity:0.5;"></video>
            </div>
            <div class="scan-data" id="scan-status">
                [ ANALYSIS IN PROGRESS ]<br>
                IDENTITY: UNKNOWN<br>
                BIOMETRIC SCANNING...
            </div>
        `;
        document.body.appendChild(scanOverlay);

        // ព្យាយាមបើក Camera (បើមាន)
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                document.getElementById('webcam').srcObject = stream;
            }).catch(() => {
                // បើគ្មាន Camera វានឹងបង្ហាញជារូបភាពតំណាង
                document.getElementById('webcam').style.background = "url('https://cdn-icons-png.flaticon.com/512/3135/3135715.png') center/contain no-repeat";
            });

        // បន្លំការស្កេនរយៈពេល ៣ វិនាទី
        setTimeout(() => {
            const status = document.getElementById('scan-status');
            status.innerHTML = `<span style="color:var(--gold);">[ ACCESS GRANTED ]<br>IDENTITY: IMPERIAL SOVEREIGN<br>PROCEED TO PIN VERIFICATION</span>`;
            status.style.color = "var(--gold)";
            
            speak("សម្គាល់ព្រះភ័ក្ត្រជោគជ័យ។ សូមបញ្ចូលលេខកូដសម្ងាត់ ព្រះអង្គអធិរាជ។");

            setTimeout(() => {
                document.body.removeChild(scanOverlay);
                document.getElementById('login-screen').style.display = 'block';
            }, 1500);
        }, 3500);
    };

    // កែសម្រួលចំណុចចាប់ផ្តើម៖ ឱ្យស្កេនមុនពេលឃើញផ្ទាំង PIN
    window.onload = () => {
        document.getElementById('login-screen').style.display = 'none';
        startFaceScan();
    };

})();