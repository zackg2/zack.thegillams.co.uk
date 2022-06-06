const zombies = [];
const lanes = [];
const spaces = [];
const TPS = 10;

function rand(low, high) {
  return low + Math.floor(Math.random() * (high - low));
}

function tick() {
  for (const zombie of zombies) {
    zombie.tick();
    if (zombie.progress > 104) {
      eatBrainz();
    }
  }
}
function eatBrainz() {
  clearInterval(ticker);
  alert("the zombiezz have ate your brainz");
}

let ticker;
function start() {
  lanes.push(...document.querySelectorAll(".lane"));

  for (let laneno = 0; laneno < lanes.length; laneno++) {
    const lane = lanes[laneno];
    spaces[laneno] = [];
    for (let spaceno = 0; spaceno < 8; spaceno++) {
      const space = new Space(laneno, spaceno);
      spaces[laneno].push(space);
    }
  }

  for (let i = 0; i < 3; i++) {
    const zombie = new Zombie();
    zombie.progress = -i * 3;
    zombie.update();
    zombies.push(zombie);
  }
  ticker = setInterval(tick, 1000 / TPS);
}

class Zombie {
  lane = -1;
  speed = 100 / (60 * TPS);
  progress = 0;
  div = document.createElement("div");

  constructor() {
    this.lane = rand(0, lanes.length - 1);
    this.div.className = "zombie";
    this.update();
    lanes[this.lane].appendChild(this.div);
  }

  update() {
    this.div.style.left = `${100 - this.progress}%`;
  }

  tick() {
    this.progress += this.speed;
    this.update();
  }
}

class Space {
  lane = -1;
  space = -1;
  div = document.createElement("div");

  constructor(laneno, spaceno) {
    this.lane = laneno;
    this.space = spaceno;
    this.div.className = "space";
    this.div.style.left = `${this.space * 10}%`;
    this.update();
    lanes[this.lane].appendChild(this.div);
  }

  update() {}

  tick() {
    this.update();
  }
}

start();
