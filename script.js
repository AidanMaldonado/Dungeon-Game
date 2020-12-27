/* Game Rules 
Every set up raid days, knights/adventurers show up to get the treasure
Difficulty determines how often there are raids, also determines loot drops
Amount of gold in the stash determines what levels of loot the heroes bring in
Loot can be captured and bartered at the town
Gems can be mined at the mine in town, which can be sold or used to make special monsters
Monsters must be made at the witch
Every x amount of days there is a raid.

TODO:
add difficulty system to raid days func

*/

//Dom variables
const startSection = document.querySelector(".start");
const locationSection = document.querySelector(".country");
const gameSection = document.querySelector(".game");
const helpSection = document.querySelector(".help-section");
//Buttons
const startBtn = document.querySelector("#start-btn");
const helpBtn = document.querySelector("#help-btn");
//Cards
const card1 = document.querySelector("#faction1");
const card2 = document.querySelector("#faction2");
const card3 = document.querySelector("#faction3");
const storyP = document.querySelector("#story-p");
const hud = document.querySelector("#hud");
//Map
const mapSection = document.querySelector(".map-section");
const townSection = document.querySelector(".town-section");
const mapGrid = document.querySelectorAll(".grid-item");
//Slider buttons
const rightArrow = document.querySelector("#arrow-right");
//Game buttons
const map = document.querySelector("#map");
const town = document.querySelector("#town");
//Stats
const daysDisplay = document.querySelector("#days-display");
const backBtn = document.querySelectorAll(".back-btn");

//Game variables
let card = 1;
let sCounter = 0;
let faction = 0;
let days = 0; //For final stats/highscores
let daysUntilRaid = 10;
let souls = 0; //Dungeon points
let gold = 0;
let raid = false; //Determines if a raid is currently happening

//Functions
const atStart = () => {
  locationSection.style.display = "none";
  gameSection.style.display = "none";
  hud.style.display = "none";
  mapSection.style.display = "none";
  townSection.style.display = "none";
  helpSection.style.display = "none";
};

//Creates back button functionality
const backBtnFunc = () => {
  for (let i = 0; i < backBtn.length; i++) {
    backBtn[i].addEventListener("click", () => {
      hud.style.display = "flex";
      mapSection.style.display = "none";
      townSection.style.display = "none";
    });
  }
};

//Picks faction
const cardPicker = () => {
  card1.style.display = "flex";
  card2.style.display = "none";
  card3.style.display = "none";
};

//Determines how many days until raid
//Change this so it works with difficulty.
const raidCalculator = () => {
  if (daysUntilRaid == 0) {
    daysUntilRaid = Math.floor(Math.random() * 5 + 10);
  } else {
    daysUntilRaid -= 1;
  }

  //Displays the days until raid
  daysDisplay.innerHTML = `Days Until Raid: ${daysUntilRaid}`;
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

//Generates map, goes to hud
const pickedFaction = () => {
  locationSection.style.display = "none";
  gameSection.style.display = "flex";
  proceduralMapGen();
};

//Procedural Generation
const proceduralMapGen = () => {
  let eStart = Math.floor(Math.random() * 9 + 0);

  //Checks to make sure entrance is on the outside
  while (
    eStart == 4 ||
    eStart == 1 ||
    eStart == 3 ||
    eStart == 5 ||
    eStart == 7
  ) {
    eStart = Math.floor(Math.random() * 9 + 0);
  }

  for (let i = 0; i < mapGrid.length; i++) {
    mapGrid[eStart].innerHTML = "E";
    if (mapGrid[i] != "") {
      mapGrid[i].innerHTML = "X";
    }
  }

  //Places Gold at the other side
  if (eStart == 0) {
    mapGrid[8].innerHTML = "G";
    mapGrid[8].style.color = "#e74c3c";
  } else if (eStart == 2) {
    mapGrid[6].innerHTML = "G";
    mapGrid[6].style.color = "#e74c3c";
  } else if (eStart == 6) {
    mapGrid[2].innerHTML = "G";
    mapGrid[2].style.color = "#e74c3c";
  } else if (eStart == 8) {
    mapGrid[0].innerHTML = "G";
    mapGrid[0].style.color = "#e74c3c";
    mapGrid[eStart].innerHTML = "E";
  }
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
  //Change this to flex if you want the divs side by side
  mapSection.style.display = "grid";
  townSection.style.display = "none";
  hud.style.display = "none";
});

town.addEventListener("click", () => {
  proceduralMapGen();
  mapSection.style.display = "none";
  townSection.style.display = "flex";
  hud.style.display = "none";
});

//Triggers help features
helpBtn.addEventListener("click", () => {
  startSection.style.display = "none";
  helpSection.style.display = "flex";
});

//Function calls
atStart();
cardPicker();
backBtnFunc();

//Game loop
window.setInterval(() => {
  days += 1; //For final stats
  raidCalculator();
  storyCounter();
}, 1000);
