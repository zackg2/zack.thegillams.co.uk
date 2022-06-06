const zombies = [];
const lanes = [];
const spaces = [];
const projectiles = [];
let credits = 20;
const TPS = 10;

let creditsel;

function rand(low, high) {
  return low + Math.floor(Math.random() * (high - low));
}

function tick() {
  credits = credits + 0.1;
  creditsel.textContent = Math.floor(credits);
  for (const projectile of projectiles) {
    projectile.tick();
  }
  for (const lane of spaces) {
    for (const space of lane) {
      space.tick();
    }
  }
  for (const zombie of zombies) {
    zombie.tick();
    if (zombie.x < -4) {
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
    zombie.x = 100 + i * 3;
    zombie.update();
    zombies.push(zombie);
  }
  ticker = setInterval(tick, 1000 / TPS);
}

class Zombie {
  laneno = -1;
  speed = -100 / (60 * TPS);
  x = 100;
  div = document.createElement("div");

  constructor() {
    this.laneno = rand(0, lanes.length - 1);
    this.div.className = "zombie";
    this.update();
    lanes[this.laneno].appendChild(this.div);
  }

  update() {
    this.div.style.left = `${this.x}%`;
  }

  tick() {
    this.x += this.speed;
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
    if (!this.turret && credits >= 10) {
      credits -= 10;
      this.turret = new Turret(this);
    }
  }

  tick() {
    this.update();
    if (this.turret) {
      this.turret.tick();
    }
  }
}

class Turret {
  space = null;
  counter = 0;
  div = document.createElement("div");

  constructor(space) {
    this.space = space;
    this.div.className = "turret";
    this.update();
    this.space.div.appendChild(this.div);
  }

  update() {}

  fire() {
    const projectile = new Projectile(
      this.space.laneno,
      this.space.spaceno * 10
    );
    projectiles.push(projectile);
  }

  tick() {
    this.counter = this.counter + 1;
    if (this.counter >= 20) {
      this.counter = 0;
      this.fire();
    }
    this.update();
  }
}

class Projectile {
  laneno = -1;
  speed = 300 / (60 * TPS);
  x = 0;
  div = document.createElement("div");

  constructor(laneno, x) {
    this.laneno = laneno;
    this.x = x;
    this.div.className = "projectile";
    this.update();
    lanes[this.laneno].appendChild(this.div);
  }

  update() {
    this.div.style.left = `${this.x}%`;
  }

  tick() {
    this.x += this.speed;
    this.update();
  }
}

start();
