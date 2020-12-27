//Dom variables
const startSection = document.querySelector(".start");
const locationSection = document.querySelector(".country");
const gameSection = document.querySelector(".game");
const startBtn = document.querySelector("#start-btn");
const card1 = document.querySelector("#faction1");
const card2 = document.querySelector("#faction2");
const card3 = document.querySelector("#faction3");
const storyP = document.querySelector("#story-p");
const hud = document.querySelector("#hud");
//Map
const mapSection = document.querySelector(".map-section");
const mapGrid = document.querySelectorAll(".grid-item");
//Slider buttons
const rightArrow = document.querySelector("#arrow-right");
//Game buttons
const map = document.querySelector("#map");

//Game variables
let card = 1;
let sCounter = 0;
let faction = 0;
let days = 0;
let dp = 0; //Dungeon points

//Functions
const atStart = () => {
  locationSection.style.display = "none";
  gameSection.style.display = "none";
  hud.style.display = "none";
  mapSection.style.display = "none";
};

//Picks faction
const cardPicker = () => {
  card1.style.display = "flex";
  card2.style.display = "none";
  card3.style.display = "none";
};

//Changes vars based on faction picked

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
  locationSection.style.display = "none";
  gameSection.style.display = "flex";
};

//Procedural Generation
const proceduralMapGen = () => {
  let eStart = Math.floor(Math.random() * 8 + 0);

  //Checks to make sure entrance is on the outside
  while (eStart == 4) {
    eStart = Math.floor(Math.random() * 8 + 0);
  }

  for (let i = 0; i < mapGrid.length; i++) {
    mapGrid[eStart].innerHTML = "E";
    if (mapGrid[i] != "") {
      mapGrid[i].innerHTML = "X";
    }
  }

  mapGrid[4].innerHTML = "G";
  mapGrid[4].style.color = "#e74c3c";
};

//Event listeners
startBtn.addEventListener("click", () => {
  startSection.style.display = "none";
  locationSection.style.display = "flex";
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
  hud.style.display = "none";
});

//Function calls
atStart();
cardPicker();

//Game loop
window.setInterval(() => {
  storyCounter();
}, 2000);
