let wieners = 0;
let perClick = 1;
let perSecond = 0;

let treatCost = 10;
let grillCost = 50;
let parkCost = 500;

const counter = document.getElementById('counter');
const dog = document.getElementById('dog');
const bark = document.getElementById('bark');

function updateDisplay() {
    counter.textContent = `Wieners: ${wieners}`;
    document.getElementById('treatCost').textContent = treatCost;
    document.getElementById('grillCost').textContent = grillCost;
    document.getElementById('parkCost').textContent = parkCost;
}

function saveGame() {
    localStorage.setItem('dachshundClickerSave', JSON.stringify({
        wieners, perClick, perSecond, treatCost, grillCost, parkCost
    }));
}

function loadGame() {
    const save = JSON.parse(localStorage.getItem('dachshundClickerSave'));
    if (save) {
        wieners = save.wieners;
        perClick = save.perClick;
        perSecond = save.perSecond;
        treatCost = save.treatCost;
        grillCost = save.grillCost;
        parkCost = save.parkCost;
    }
}

dog.addEventListener('click', () => {
    wieners += perClick;
    bark.currentTime = 0;
    bark.play();
    updateDisplay();
    saveGame();
});

document.getElementById('treat').addEventListener('click', () => {
    if (wieners >= treatCost) {
        wieners -= treatCost;
        perClick++;
        treatCost = Math.floor(treatCost * 1.5);
        updateDisplay();
        saveGame();
    }
});

document.getElementById('grill').addEventListener('click', () => {
    if (wieners >= grillCost) {
        wieners -= grillCost;
        perSecond++;
        grillCost = Math.floor(grillCost * 1.5);
        updateDisplay();
        saveGame();
    }
});

document.getElementById('park').addEventListener('click', () => {
    if (wieners >= parkCost) {
        wieners -= parkCost;
        perSecond += 10;
        parkCost = Math.floor(parkCost * 1.5);
        updateDisplay();
        saveGame();
    }
});

// Passive income
setInterval(() => {
    wieners += perSecond;
    updateDisplay();
    saveGame();
}, 1000);

// Load on start
loadGame();
updateDisplay();
