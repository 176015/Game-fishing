let fish = 0;
let fishPerClick = 1;
let upgradeCost = 10;

const fishCountEl = document.getElementById('fishCount');
const fishPerClickEl = document.getElementById('fishPerClick');
const upgradeCostEl = document.getElementById('upgradeCost');

document.getElementById('fishButton').addEventListener('click', () => {
  fish += fishPerClick;
  updateDisplay();
});

document.getElementById('upgradeButton').addEventListener('click', () => {
  if (fish >= upgradeCost) {
    fish -= upgradeCost;
    fishPerClick++;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updateDisplay();
  } else {
    alert("Not enough fish!");
  }
});

function updateDisplay() {
  fishCountEl.textContent = fish;
  fishPerClickEl.textContent = fishPerClick;
  upgradeCostEl.textContent = upgradeCost;
}
