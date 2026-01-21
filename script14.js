/**
 * 👑 SINGULARITY IMPERIAL CORE v13.0
 * Feature: 3D Holographic Hub + Epic Background Music
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់ប៊ូតុងសំឡេង និង Animation
    const style = document.createElement('style');
    style.textContent = `
        /* ... រក្សារចនាបថពី v12.0 ... */
        .music-control {
            position: fixed; bottom: 20px; left: 20px;
            background: rgba(0,0,0,0.7); border: 1px solid var(--gold);
            padding: 10px; border-radius: 50%; cursor: pointer;
            z-index: 1000; box-shadow: 0 0 15px var(--gold);
        }
        .pulse { animation: pulse-gold 2s infinite; }
        @keyframes pulse-gold {
            0% { box-shadow: 0 0 0 0px rgba(234, 179, 8, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(234, 179, 8, 0); }
            100% { box-shadow: 0 0 0 0px rgba(234, 179, 8, 0); }
        }
    `;
    document.head.appendChild(style);

    // 2. បង្កើត Audio Element
    const bgMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3'); // ភ្លេងបែប Epic/Electronic
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    // 3. ចាក់បញ្ចូល HTML (បន្ថែមប៊ូតុងសំឡេង)
    const originalBody = document.body.innerHTML; 
    // ចំណាំ៖ ក្នុង File ជាក់ស្តែង ព្រះអង្គគ្រាន់តែបន្ថែម Div នេះទៅក្នុង Overlay
    const musicBtn = document.createElement('div');
    musicBtn.className = 'music-control pulse';
    musicBtn.id = 'musicBtn';
    musicBtn.innerHTML = '🔊';
    document.body.appendChild(musicBtn);

    // 4. Logic គ្រប់គ្រងសំឡេង
    let isPlaying = false;
    
    // ដោយសារ Browser ហាមឃាត់ការចាក់សំឡេងស្វ័យប្រវត្តិ (Autoplay Policy)
    // ភ្លេងនឹងចាប់ផ្តើមនៅពេលព្រះអង្គចុចលើកន្លែងណាមួយនៃអេក្រង់
    window.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().catch(e => console.log("Audio play blocked"));
            isPlaying = true;
            document.getElementById('musicBtn').innerHTML = '🔊';
        }
    }, { once: true });

    document.getElementById('musicBtn').onclick = (e) => {
        e.stopPropagation();
        if (bgMusic.paused) {
            bgMusic.play();
            document.getElementById('musicBtn').innerHTML = '🔊';
            document.getElementById('musicBtn').classList.add('pulse');
        } else {
            bgMusic.pause();
            document.getElementById('musicBtn').innerHTML = '🔈';
            document.getElementById('musicBtn').classList.remove('pulse');
        }
    };

    // 5. មុខងារ Effect សំឡេងពេលចុចលើហ្គេម
    window.openGame = function(gameName) {
        const clickSound = new Audio('https://www.soundjay.com/buttons/button-09.mp3');
        clickSound.play();
        
        speak("កំពុងបើកដំណើរការ " + gameName + " ក្នុងរបៀបអធិរាជ");
        
        const hub = document.querySelector('.game-hub');
        hub.style.filter = 'brightness(2) blur(20px)';
        hub.style.transition = 'all 1s';
        
        setTimeout(() => {
            alert(`✨ WELCOME TO ${gameName.toUpperCase()} ✨`);
            location.reload(); 
        }, 1200);
    };

    function speak(text) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'km-KH';
        window.speechSynthesis.speak(utter);
    }
    
    // --- (រក្សាទុក Logic Game បាការ៉ាត់ និង Analytics ពី v11.0 ដូចដើម) ---

})();