//Dom variables
const startSection = document.querySelector(".start");
const countrySection = document.querySelector(".country");
const gameSection = document.querySelector(".game");
const startBtn = document.querySelector("#start-btn");
const card1 = document.querySelector("#faction1");
const card2 = document.querySelector("#faction2");
const card3 = document.querySelector("#faction3");
const storyP = document.querySelector("#story-p");
const hud = document.querySelector("#hud");
//Stats
const popDisplay = document.querySelector("#pop");
const fuelDisplay = document.querySelector("#fuel");
const scrapDisplay = document.querySelector("#scrap");
const fuelBtn = document.querySelector("#fuel-btn");
const scrapBtn = document.querySelector("#scrap-btn");
//Map
const mapSection = document.querySelector(".map-section");
const mapGrid = document.querySelectorAll(".grid-item");
const matSection = document.querySelector(".mat-section");
const techSection = document.querySelector(".tech-section");
const soldierSection = document.querySelector(".soldier-section");
//Slider buttons
const rightArrow = document.querySelector("#arrow-right");
//Game buttons
const map = document.querySelector("#map");
const mat = document.querySelector("#mat");
const tech = document.querySelector("#tech");
const soldier = document.querySelector("#soldier");

//Game variables
let card = 1;
let sCounter = 0;
let scrap = 0;
let fuel = 0;
let pop = 0;
let faction = 0;
let fuelPerSec = 0;
let scrapPerSec = 0;

//Functions
const atStart = () => {
  countrySection.style.display = "none";
  gameSection.style.display = "none";
  hud.style.display = "none";
  mapSection.style.display = "none";
  matSection.style.display = "none";
  techSection.style.display = "none";
  soldierSection.style.display = "none";
};

//Picks faction
const cardPicker = () => {
  card1.style.display = "flex";
  card2.style.display = "none";
  card3.style.display = "none";
};

//Changes vars based on faction picked
const factionSetup = () => {
  if (faction == 1) {
    population = 200000;
    fuelPerSec = 4;
    scrapPerSec = 4;
  } else if (faction == 2) {
    population = 300000;
    fuelPerSec = 1;
    scrapPerSec = 7;
  } else {
    population = 500000;
    fuelPerSec = 6;
    scrapPerSec = 2;
  }
  popDisplay.innerHTML = `Population: ${population}`;
};

//Determines the time the story element is displayed after picking a faction
const storyCounter = () => {
  sCounter += 1;
  //Change back to == 10 after testing is done
  if (sCounter == 1) {
    storyP.style.display = "none";
    hud.style.display = "flex";
  }
};

const pickedFaction = () => {
  factionSetup();
  countrySection.style.display = "none";
  gameSection.style.display = "flex";
};

//Calculates how much of each resourse is produced per second
const collectResources = () => {
  fuel += fuelPerSec;
  scrap += scrapPerSec;
  fuelDisplay.innerHTML = `Fuel: ${fuel}`;
  scrapDisplay.innerHTML = `Scrap: ${scrap}`;
};

//Procedural Generation
const proceduralMapGen = () => {
  let eStart = Math.floor(Math.random() * 8 + 0);
  let sStart = Math.floor(Math.random() * 8 + 0);
  let bStart = Math.floor(Math.random() * 8 + 0);

  while (eStart == sStart || bStart == eStart || sStart == bStart) {
    sStart = Math.floor(Math.random() * 8 + 0);
    bStart = Math.floor(Math.random() * 8 + 0);
  }

  if (faction == 1) {
    mapGrid[sStart].style.color = "#e74c3c";
  } else if (faction == 2) {
    mapGrid[eStart].style.color = "#e74c3c";
  } else {
    mapGrid[bStart].style.color = "#e74c3c";
  }

  for (let i = 0; i < mapGrid.length; i++) {
    mapGrid[eStart].innerHTML = "E";
    mapGrid[sStart].innerHTML = "S";
    mapGrid[bStart].innerHTML = "B";
    if (mapGrid[i] != "") {
      mapGrid[i].innerHTML = "H";
    }
  }
};

//Event listeners
startBtn.addEventListener("click", () => {
  startSection.style.display = "none";
  countrySection.style.display = "flex";
});

//Moves the faction choices
rightArrow.addEventListener("click", () => {
  if (card == 1) {
    card1.style.display = "none";
    card2.style.display = "flex";
    card3.style.display = "none";
    card++;
  } else if (card == 2) {
    card1.style.display = "none";
    card2.style.display = "none";
    card3.style.display = "flex";
    card = 0;
  } else {
    card1.style.display = "flex";
    card2.style.display = "none";
    card3.style.display = "none";
    card++;
  }
});

//Picks faction
card1.addEventListener("click", () => {
  faction = 1;
  pickedFaction();
});

card2.addEventListener("click", () => {
  faction = 2;
  pickedFaction();
});

card3.addEventListener("click", () => {
  faction = 3;
  pickedFaction();
});

//HUD buttons
map.addEventListener("click", () => {
  proceduralMapGen();
  mapSection.style.display = "grid";
  matSection.style.display = "none";
  hud.style.display = "none";
  techSection.style.display = "none";
  soldierSection.style.display = "none";
});

mat.addEventListener("click", () => {
  mapSection.style.display = "none";
  hud.style.display = "none";
  matSection.style.display = "flex";
  techSection.style.display = "none";
  soldierSection.style.display = "none";
});

tech.addEventListener("click", () => {
  mapSection.style.display = "none";
  hud.style.display = "none";
  matSection.style.display = "none";
  techSection.style.display = "flex";
  soldierSection.style.display = "none";
});

soldier.addEventListener("click", () => {
  mapSection.style.display = "none";
  hud.style.display = "none";
  matSection.style.display = "none";
  techSection.style.display = "none";
  soldierSection.style.display = "flex";
});

//Collect materials per click
fuelBtn.addEventListener("click", () => {
  fuel += 1;
  fuelDisplay.innerHTML = `Fuel: ${fuel}`;
});

scrapBtn.addEventListener("click", () => {
  scrap += 1;
  scrapDisplay.innerHTML = `Scrap: ${scrap}`;
});

//Function calls
atStart();
cardPicker();

//Game loop
window.setInterval(() => {
  storyCounter();
  collectResources();
}, 2000);
