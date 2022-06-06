const zombies = [];
const lanes = [];
const spaces = [];
let credits = 20;
const TPS = 10;

let creditsel;

function rand(low, high) {
  return low + Math.floor(Math.random() * (high - low));
}

function tick() {
  credits = credits + 0.1;
  creditsel.textContent = Math.floor(credits);
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
  creditsel = document.getElementById("credits");
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
  laneno = -1;
  speed = 100 / (60 * TPS);
  progress = 0;
  div = document.createElement("div");

  constructor() {
    this.laneno = rand(0, lanes.length - 1);
    this.div.className = "zombie";
    this.update();
    lanes[this.laneno].appendChild(this.div);
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
  laneno = -1;
  spaceno = -1;
  div = document.createElement("div");
  turret = null;

  constructor(laneno, spaceno) {
    this.laneno = laneno;
    this.spaceno = spaceno;
    this.div.className = "space";
    this.div.onclick = this.clicked.bind(this);
    this.div.style.left = `${this.spaceno * 10}%`;
    this.update();
    lanes[this.laneno].appendChild(this.div);
  }

  update() {}

  clicked() {
    if (!this.turret) {
      this.turret = new Turret(this);
    }
  }

  tick() {
    this.update();
  }
}

class Turret {
  space = null;
  div = document.createElement("div");

  constructor(space) {
    this.space = space;
    this.div.className = "turret";
    this.update();
    this.space.div.appendChild(this.div);
  }

  update() {}

  tick() {
    this.update();
  }
}

start();
