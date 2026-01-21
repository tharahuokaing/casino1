/**
 * 👑 SINGULARITY IMPERIAL MASTER v29.0
 * Feature: Custom Dealer Image (The "Personal Touch" System)
 */

(function() {
    // 1. មុខងារសម្រាប់ប្តូររូបភាពអ្នកចែកបៀ
    window.changeDealerImage = function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                const dealerContainer = document.querySelector('.dealer-container');
                if (dealerContainer) {
                    dealerContainer.style.backgroundImage = `url('${event.target.result}')`;
                    speak("អ្នកចែកបៀថ្មីត្រូវបានដំឡើងតាមព្រះរាជហឫទ័យ។");
                }
            };
            reader.readAsDataURL(file);
        };
        input.click();
    };

    // 2. បន្ថែមប៊ូតុងបញ្ជា (Secret Key)
    // ព្រះអង្គអាចចុចប៊ូតុង "ប្តូរអ្នកចែកបៀ" ដើម្បីជ្រើសរើសរូបភាពពីម៉ាស៊ីនផ្ទាល់
})();