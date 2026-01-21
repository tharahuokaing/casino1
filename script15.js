/**
 * 👑 SINGULARITY IMPERIAL CORE v14.0
 * Feature: Imperial Voice Greeting on Login
 */

(function() {
    // --- (រក្សាកូដ CSS និង HTML ពី Version មុនៗ) ---

    const IMPERIAL_NAME = "ព្រះអង្គអធិរាជ"; // ព្រះអង្គអាចប្តូរជាព្រះនាមផ្ទាល់ខ្លួនបាន

    // មុខងារត្រួតពិនិត្យ PIN និងស្វាគមន៍ដោយសំឡេង
    window.verifyAccess = function() {
        const pin = document.getElementById('pinInput').value;
        const error = document.getElementById('error-msg');

        if (pin === "123456") { // លេខកូដសម្ងាត់
            // ១. បិទផ្ទាំង Login និងបើក System
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-system').style.display = 'flex';

            // ២. ចាក់ភ្លេង Epic Background (ប្រសិនបើមាន)
            if (typeof bgMusic !== 'undefined') {
                bgMusic.play();
                isPlaying = true;
            }

            // ៣. ដំណើរការ Voice Greeting ជាភាសាខ្មែរ
            const greetingText = `សូមថ្វាយបង្គំស្វាគមន៍ ${IMPERIAL_NAME}! ប្រព័ន្ធមហានិធិ និងកាស៊ីណូអនាគត បានត្រៀមខ្លួនរួចរាល់សម្រាប់ព្រះអង្គហើយ។`;
            speak(greetingText);

        } else {
            // Logic ពេលវាយ PIN ខុស (រក្សាទុកដូចមុន)
            handleWrongPin();
        }
    };

    // មុខងារសំឡេងខ្មែរ (Text-to-Speech Engine)
    function speak(text) {
        window.speechSynthesis.cancel(); // បញ្ឈប់សំឡេងដែលកំពុងនិយាយ
        const utter = new SpeechSynthesisUtterance(text);
        
        // កំណត់ភាសាខ្មែរ (km-KH)
        utter.lang = 'km-KH';
        utter.pitch = 1.1; // កម្រិតសំឡេង
        utter.rate = 0.9;  // ល្បឿននិយាយ (ឱ្យសមរម្យ)
        
        window.speechSynthesis.speak(utter);
    }

    // --- (រក្សាទុក Logic Game និង Analytics ទាំងអស់នៅខាងក្រោម) ---
})();