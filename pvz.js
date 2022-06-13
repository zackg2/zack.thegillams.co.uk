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

  if (currentWave < WAVES.length) {
    const part = WAVES[currentWave].parts[currentPart];

    for (const spawn of spawns) {
      if (spawn.tick === partTick) {
        const Klass = spawn.klass;
        const zombie = new Klass();
        zombie.update();
        zombies.push(zombie);
      }
    }

    /*
const Klass=zombieCount.klass;
const zombie=new Klass()
zombie.update();
zombies.push(zombie);
*/

    partTick += 1;
    if (partTick > part.duration * TPS) {
      partTick = 0;
      currentPart += 1;
      if (currentPart >= WAVES[currentWave].parts.length) {
        currentPart = 0;
        currentWave += 1;
      }
    }
  } else {
    if (zombies.length === 0) {
      alert("THE ZOMBIEZ ARE GONE");
    }
  }
}
function eatBrainz() {
  clearInterval(ticker);
  alert("the zombiezz have ate your brainz");
}

let ticker;
let currentWave = 0;
let currentPart = 0;
let partTick = 0;
let spawns = [];
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

  currentWave = 0;
  currentPart = 0;
  partTick = 0;
  startPart();

  ticker = setInterval(tick, 1000 / TPS);
}

function startPart() {
  const part = WAVES[currentWave].parts[currentPart];
  partTick = 0;
  spawns = [];
  const ticks = part.duration * TPS;

  for (const zombieCount of part.zombies) {
    for (let n = 0; n < zombieCount.count; n++) {
      const tick = rand(0, ticks - 1);
      const klass = zombieCount.klass;
      spawns.push({ tick, klass });
    }
  }
}

class Zombie {
  laneno = -1;
  speed = -100 / (60 * TPS);
  x = 100;
  hp = 5;
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
  hit() {
    this.hp = this.hp - 1;
    if (this.hp <= 0) {
      this.destroy();
    }
  }

  destroy() {
    const pos = zombies.indexOf(this);
    if (pos >= 0) {
      zombies.splice(pos, 1);
    }
    this.div.parentElement.removeChild(this.div);
  }

  tick() {
    this.x += this.speed;
    this.update();
  }
}

class TVZombie extends Zombie {
  speed = -50 / (60 * TPS);
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
      this.space.spaceno * 10 + 5
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

  destroy() {
    const pos = projectiles.indexOf(this);
    if (pos >= 0) {
      projectiles.splice(pos, 1);
    }
    this.div.parentElement.removeChild(this.div);
  }

  tick() {
    this.x += this.speed;
    for (const zombie of zombies) {
      if (zombie.laneno === this.laneno && this.x >= zombie.x) {
        zombie.hit();
        this.destroy();
      }
    }
    this.update();
  }
}

const WAVES = [
  {
    parts: [
      {
        duration: 20,
        zombies: [
          //normies
          { klass: Zombie, count: 5 },
        ],
      },
      {
        duration: 20,
        zombies: [
          { klass: Zombie, count: 12 },
          { klass: TVZombie, count: 1 },
        ],
      },
    ],
  },
  {
    parts: [
      {
        duration: 20,
        zombies: [
          { klass: Zombie, count: 21 },
          { klass: TVZombie, count: 5 },
        ],
      },
      {
        duration: 20,
        zombies: [
          { klass: Zombie, count: 6 },
          { klass: TVZombie, count: 5 },
        ],
      },
    ],
  },
];

start();
