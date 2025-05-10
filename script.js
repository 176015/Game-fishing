let money = 0;
let catchChance = 30;
let upgradeCost = 10;

const moneyCountEl = document.getElementById('moneyCount');
const catchChanceDisplay = document.getElementById('catchChanceDisplay');
const upgradeCostEl = document.getElementById('upgradeCost');
const lastFishEl = document.getElementById('lastFish');

const swimmingFish = document.getElementById('swimmingFish');
const catchZone = document.getElementById('catchZone');
const pond = document.getElementById('pond');

const fishTable = [
  { name: "Bluegill", chance: 70, value: 1 },
  { name: "Bass", chance: 10, value: 2 },
  { name: "Koi", chance: 5, value: 3 },
  { name: "Catfish", chance: 2, value: 5 },
  { name: "Shark", chance: 1, value: 50 },
  { name: "Megalodon", chance: 0.01, value: 700 }
];

function getRandomFish() {
  const rand = Math.random() * 100;
  let total = 0;
  for (let fish of fishTable) {
    total += fish.chance;
    if (rand < total) return fish;
  }
  return { name: "Old Boot", value: 0 };
}

let fishX = -50;
let fishSpeed = getRandomSpeed();

function getRandomSpeed() {
  return Math.random() * 2 + 1; // speed between 1 and 3
}

function animateFish() {
  fishX += fishSpeed;
  if (fishX > 650) {
    fishX = -50;
    fishSpeed = getRandomSpeed(); // new speed
  }
  swimmingFish.style.left = fishX + "px";
  requestAnimationFrame(animateFish);
}

swimmingFish.addEventListener('click', () => {
  const fishRect = swimmingFish.getBoundingClientRect();
  const zoneRect = catchZone.getBoundingClientRect();

  const isInZone =
    fishRect.left + fishRect.width / 2 > zoneRect.left &&
    fishRect.left + fishRect.width / 2 < zoneRect.right;

  if (isInZone) {
    // Flash the pond green
    pond.classList.add('flash');
    setTimeout(() => pond.classList.remove('flash'), 300);

    const chanceRoll = Math.random() * 100;
    if (chanceRoll <= catchChance) {
      const fish = getRandomFish();
      money += fish.value;
      lastFishEl.textContent = `You caught a ${fish.name}! +$${fish.value}`;
    } else {
      lastFishEl.textContent = "The fish got away...";
    }
  } else {
    lastFishEl.textContent = "Missed!";
  }

  updateDisplay();
});

document.getElementById('upgradeButton').addEventListener('click', () => {
  if (money >= upgradeCost) {
    money -= upgradeCost;
    catchChance = Math.min(catchChance + 10, 100);
    upgradeCost = Math.floor(upgradeCost * 1.7);
    updateDisplay();
  } else {
    alert("Not enough money!");
  }
});

function updateDisplay() {
  moneyCountEl.textContent = money;
  catchChanceDisplay.textContent = catchChance;
  upgradeCostEl.textContent = upgradeCost;
}

animateFish();
