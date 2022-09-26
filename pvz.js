const zombies = [];
const lanes = [];
const spaces = [];
const projectiles = [];

let credits = 50;
const TPS = 10;

let creditsel;
let popupel;
let ticker;
let currentWave = 0;
let currentPart = 0;
let partTick = 0;
let spawns = [];

function rand(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}

function tick() {
  credits = credits + 0.01;
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

    if (currentPart < 0) {
      if (zombies.length === 0) {
        currentPart = 0;
        popup(`wave ${currentWave + 1}`);
      }
    } else {
      partTick += 1;
      if (partTick > part.duration * TPS) {
        partTick = 0;
        currentPart += 1;
        if (currentPart >= WAVES[currentWave].parts.length) {
          currentPart = -1;
          currentWave += 1;
        }
        if (currentWave < WAVES.length) {
          startPart();
        }
      }
    }
  } else {
    if (zombies.length === 0) {
      clearInterval(ticker);

      popup("THE ZOMBIEZ ARE GONE", true);
    }
  }
}
function eatBrainz() {
  clearInterval(ticker);
  popup("the zombiez have ate your brainz", true);
}

function start() {
  creditsel = document.getElementById("credits");
  popupel = document.getElementById("popup");

  lanes.push(...document.querySelectorAll(".lane"));

  for (let laneno = 0; laneno < lanes.length; laneno++) {
    const lane = lanes[laneno];
    spaces[laneno] = [];
    for (let spaceno = 0; spaceno < 8; spaceno++) {
      const space = new Space(laneno, spaceno);
      spaces[laneno].push(space);
    }
  }
  popup(`here they come`);

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

function popup(message, permanent = false) {
  // displays message
  popupel.textContent = message;
  // makes text opaque
  popupel.style.opacity = 1;

  if (!permanent) {
    // after 5seconds the text will become transparent
    setTimeout(() => {
      popupel.style.opacity = 0;
    }, 5000);
  }
}

class Zombie {
  laneno = -1;
  speed = -90 / (60 * TPS);
  x = 100;
  hp = 7;
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
    this.x = this.x + this.speed;
    this.update();
  }
}

class TVZombie extends Zombie {
  speed = -45 / (60 * TPS);
  hp = 14;
  constructor() {
    super();

    this.div.className = "zombie TVzombie";
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
    /*
    if (!this.turret && credits >= 10) {
      credits -= 10;
      this.turret = new Turret(this);
    } else if (this.turret) {
      this.turret.destroy();
      this.turret = new CCC(this);
    }
    */
    const menu = document.createElement("div");
    menu.innerHTML = "";
    this.div.appendChild(menu);
    menu.className = "turretPopup";
    {
      const button = document.createElement("button");
      menu.appendChild(button);
      button.innerHTML = "";
      button.className = "button";
    }
    {
      const button = document.createElement("button");
      menu.appendChild(button);
      button.innerHTML = "";
      button.className = "button2";
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

  destroy() {
    this.div.parentElement.removeChild(this.div);
  }

  tick() {
    this.counter = this.counter + 1;
    if (this.counter >= 25) {
      this.counter = 0;
      this.fire();
    }
    this.update();
  }
}

class CCC extends Turret {
  speed = -45 / (60 * TPS);
  hp = 14;
  constructor(space) {
    super(space);

    this.div.className = "turret CCC";
  }
}

class Projectile {
  laneno = -1;
  speed = 1000 / (60 * TPS);
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
    this.x = this.x + this.speed;
    for (const zombie of zombies) {
      if (zombie.laneno === this.laneno && this.x >= zombie.x) {
        zombie.hit();
        this.destroy();
        return;
      }
    }
    if (this.x > 100) {
      this.destroy();
      return;
    }
    this.update();
  }
}

const WAVES = [
  {
    parts: [
      {
        duration: 30,
        zombies: [
          //normies
          { klass: Zombie, count: 3 },
        ],
      },
      {
        duration: 60,
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

setTimeout(start, 0);
