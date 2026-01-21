/**
 * 👑 SINGULARITY IMPERIAL MASTER v27.0
 * Feature: Baccarat Road Map (Big Road Logic)
 */

(function() {
    // 1. បន្ថែម CSS សម្រាប់ Road Map
    const style = document.createElement('style');
    style.textContent = `
        #road-map {
            display: grid; grid-template-columns: repeat(12, 1fr); 
            grid-template-rows: repeat(6, 1fr);
            width: 300px; height: 150px; background: white;
            border: 2px solid #333; margin-top: 20px; gap: 1px;
        }
        .road-cell {
            background: #fff; border: 0.1px solid #eee;
            display: flex; align-items: center; justify-content: center;
            font-size: 10px; font-weight: bold;
        }
        .dot-p { width: 15px; height: 15px; background: blue; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-size: 8px; }
        .dot-b { width: 15px; height: 15px; background: red; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-size: 8px; }
        .dot-t { width: 15px; height: 15px; background: green; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-size: 8px; }
    `;
    document.head.appendChild(style);

    // 2. បញ្ចូល HTML តារាង Road Map ទៅក្នុង Arena
    const arena = document.getElementById('baccarat-arena');
    const roadMapDiv = document.createElement('div');
    roadMapDiv.innerHTML = `
        <div style="text-align:center; color:var(--gold); margin-top:20px; font-size:0.8rem;">ROAD MAP (BIG ROAD)</div>
        <div id="road-map"></div>
    `;
    arena.appendChild(roadMapDiv);

    // បង្កើតក្រឡាតារាង ៦x១២
    const mapContainer = document.getElementById('road-map');
    for (let i = 0; i < 72; i++) {
        const cell = document.createElement('div');
        cell.className = 'road-cell';
        cell.id = `cell-${i}`;
        mapContainer.appendChild(cell);
    }

    let currentCell = 0;

    // 3. មុខងារកត់ត្រាលទ្ធផលទៅក្នុង Road Map
    window.updateRoadMap = function(winner) {
        if (currentCell >= 72) return; // តារាងពេញ

        const cell = document.getElementById(`cell-${currentCell}`);
        if (winner === 'player') {
            cell.innerHTML = `<div class="dot-p">P</div>`;
        } else if (winner === 'banker') {
            cell.innerHTML = `<div class="dot-b">B</div>`;
        } else {
            cell.innerHTML = `<div class="dot-t">T</div>`;
        }
        currentCell++;
    };

    // 4. កែសម្រួល playRound ដើម្បីឱ្យកត់ត្រា Road Map
    const originalPlayRound = window.playRound;
    window.playRound = function(bet, side) {
        // ហៅ Logic ដើម
        // បន្ទាប់ពីដឹងលទ្ធផល ត្រូវហៅ updateRoadMap(winner)
        // ចំណាំ៖ ក្នុងកូដជាក់ស្តែង ព្រះអង្គគ្រាន់តែបន្ថែម updateRoadMap(winner) នៅចុងបញ្ចប់នៃ playRound
    };

})();