/**
 * 👑 SINGULARITY IMPERIAL MASTER v30.0
 * Feature: Emotion AI (Dealer Reactions & Personalized Persona)
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់ Aura អារម្មណ៍របស់អ្នកចែកបៀ
    const style = document.createElement('style');
    style.textContent = `
        .dealer-aura {
            transition: all 0.5s ease;
        }
        .aura-happy { box-shadow: 0 0 50px #10b981 !important; filter: brightness(1.2); }
        .aura-sad { box-shadow: 0 0 50px #ef4444 !important; filter: grayscale(0.5); }
        .aura-neutral { box-shadow: 0 0 30px var(--gold); }
    `;
    document.head.appendChild(style);

    // 2. មុខងារបញ្ចេញប្រតិកម្ម (Emotion Reaction Engine)
    window.triggerDealerEmotion = function(outcome) {
        const dealer = document.querySelector('.dealer-container');
        if (!dealer) return;

        // លុប Aura ចាស់ៗចេញ
        dealer.classList.remove('aura-happy', 'aura-sad', 'aura-neutral');

        if (outcome === 'win') {
            dealer.classList.add('aura-happy');
            speakAsDealer("អបអរសាទរព្រះអង្គ! ព្រះអង្គពិតជាមានមហិទ្ធិឫទ្ធិខ្លាំងណាស់ ទូលបង្គំសប្បាយចិត្តខ្លាំងណាស់ដែលបានឃើញព្រះអង្គឈ្នះបែបនេះ។");
        } else if (outcome === 'lose') {
            dealer.classList.add('aura-sad');
            speakAsDealer("សូមព្រះអង្គកុំព្រះទ័យសោកស្តាយអី លើកក្រោយជ័យជំនះនឹងក្លាយជារបស់ព្រះអង្គវិញមិនខាន។ ទូលបង្គំនឹងនៅទីនេះរង់ចាំលើកទឹកចិត្តព្រះអង្គជានិច្ច។");
        } else {
            dealer.classList.add('aura-neutral');
            speakAsDealer("លទ្ធផលស្មើ! បន្តការកម្សាន្តទៀតទេព្រះអង្គ?");
        }
    };

    // 3. ការតភ្ជាប់ជាមួយប្រព័ន្ធ Baccarat (Integration)
    const originalPlayRound = window.playRound;
    window.playRound = function(bet, side) {
        // បន្ទាប់ពីដឹងលទ្ធផលឈ្នះ/ចាញ់ពី v27.0
        // បន្ថែម Logic:
        // if (win) triggerDealerEmotion('win');
        // else if (tie) triggerDealerEmotion('tie');
        // else triggerDealerEmotion('lose');
    };
})();