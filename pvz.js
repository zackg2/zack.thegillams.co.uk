// @ts-check

/** @type {Zombie[]} */
const zombies = [];
/** @type {Element[]} */
const lanes = [];
/** @type {Space[][]} */
const spaces = [];
/** @type {Projectile[]} */
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

const menu = document.createElement("div");

function hidemenu() {
  menu.parentElement?.removeChild(menu);
}
window.addEventListener("click", hidemenu, false);

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
          currentPart = 0;
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

class Creature {
  div = document.createElement("div");
  healthbarDiv = document.createElement("div");
  healthbarbackgroundDiv = document.createElement("div");
  maxHp = 10;
  constructor() {
    this.hp = this.maxHp;
    this.div.appendChild(this.healthbarbackgroundDiv);
    this.healthbarbackgroundDiv.className = "healthbarbackground";
    this.healthbarbackgroundDiv.appendChild(this.healthbarDiv);
    this.healthbarDiv.className = "healthbar";
  }
  suffer(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.destroy();
    } else {
      //   this.div.style.opacity = String(this.hp / this.maxHp);
      this.healthbarDiv.style.width = `${(this.hp / this.maxHp) * 7.8}vw`;
    }
  }
  // heal(damage)
  destroy() {
    this.div.parentElement?.removeChild(this.div);
  }
}

class Zombie extends Creature {
  laneno = -1;
  speed = -90 / (60 * TPS);
  x = 100;
  maxHp = 7;
  /** @type {Element} */
  lane;
  damage = 0.1;

  constructor() {
    super();
    this.hp = this.maxHp;
    this.laneno = rand(0, lanes.length - 1);
    this.div.className = "zombie";
    this.update();
    this.lane = lanes[this.laneno];
    this.lane.appendChild(this.div);
  }

  update() {
    this.div.style.left = `${this.x}%`;
  }

  destroy() {
    super.destroy();
    const pos = zombies.indexOf(this);
    if (pos >= 0) {
      zombies.splice(pos, 1);
    }
    this.div.parentElement?.removeChild(this.div);
    credits += 2;
  }

  tick() {
    const targetSpace = spaces[this.laneno].find(
      (space) =>
        space.turret && hitboxOverlaps(space.turret.hitbox(), this.hitbox())
    );
    if (targetSpace) {
      targetSpace.turret?.suffer(this.damage);
    } else {
      this.x = this.x + this.speed;
      this.update();
    }
  }

  hitbox() {
    return { laneno: this.laneno, x: this.x, w: 7 };
  }
}

class TVZombie extends Zombie {
  constructor() {
    super();
    this.speed = -45 / (60 * TPS);
    this.maxHp = 14;
    this.hp = this.maxHp;
    this.damage = 0.2;

    this.div.className = "zombie TVzombie";
  }
}

class Space {
  laneno = -1;
  spaceno = -1;
  div = document.createElement("div");
  /** @type {Turret|null} */
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

  clicked(e) {
    e.stopPropagation();
    /*
    if (!this.turret && credits >= 10) {
      credits -= 10;
      this.turret = new Turret(this);
      } else if (this.turret) {
        this.turret.destroy();
        this.turret = new CCC(this);
        }
    */
    menu.innerHTML = "";
    this.div.appendChild(menu);
    menu.className = "turretPopup";
    if (this.turret) {
      {
        const button = document.createElement("button");
        menu.appendChild(button);
        button.innerHTML = "x";
        button.className = "";
        button.onclick = (e) => {
          e.stopPropagation();
          credits += this.turret?.cost / 2;
          this.turret?.destroy();
          this.turret = null;
          hidemenu();
        };
      }
    } else {
      {
        const cost = 10;
        const button = document.createElement("button");
        button.disabled = credits < cost;
        menu.appendChild(button);
        button.innerHTML = "";
        button.className = "button";
        button.onclick = (e) => {
          e.stopPropagation();
          credits -= cost;
          this.turret = new Turret(this, cost);
          hidemenu();
        };
      }
      {
        const cost = 20;

        const button = document.createElement("button");
        button.disabled = credits < cost;
        menu.appendChild(button);
        button.innerHTML = "";
        button.className = "button2";
        button.onclick = (e) => {
          e.stopPropagation();
          credits -= cost;
          this.turret = new CCC(this);
          this.turret.cost = cost;
          hidemenu();
        };
      }
    }
  }

  tick() {
    this.update();
    if (this.turret) {
      this.turret.tick();
    }
  }

  hitbox() {
    return { laneno: this.laneno, x: this.spaceno * 10, w: 10 };
  }
}

class Turret extends Creature {
  space;
  counter = 0;
  cost;
  ticksPerShot = 25;

  constructor(space, cost) {
    super();
    this.div.className = "turret";
    this.space = space;
    this.update();
    this.cost = cost;
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
    super.destroy();
    this.space.turret = null;
  }

  tick() {
    this.counter = this.counter + 1;
    if (this.counter >= this.ticksPerShot) {
      this.counter = 0;
      this.fire();
    }
    this.update();
  }
  hitbox() {
    return { laneno: this.space.laneno, x: this.space.spaceno * 10, w: 6 };
  }
}

class CCC extends Turret {
  constructor(space) {
    super(space);
    this.ticksPerShot = 12;
    this.maxHp = 14;
    this.hp = this.maxHp;

    this.div.className = "turret CCC";
  }
}

class Projectile {
  laneno = -1;
  speed = 1000 / (60 * TPS);
  x = 0;
  div = document.createElement("div");

  constructor(laneno, x, className = "bullet", damage = 1) {
    this.damage = damage;
    this.laneno = laneno;
    this.x = x;
    this.div.className = `projectile ${className}`;
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
    this.div.parentElement?.removeChild(this.div);
  }

  tick() {
    this.x = this.x + this.speed;
    for (const zombie of zombies) {
      //if (zombie.laneno === this.laneno && this.x >= zombie.x) {
      if (hitboxOverlaps(zombie.hitbox(), this.hitbox())) {
        zombie.suffer(this.damage);
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
  hitbox() {
    return { laneno: this.laneno, x: this.x, w: 2 };
  }
}

function hitboxOverlaps(a, b) {
  if (a.laneno !== b.laneno) return false;
  const [left, right] = a.x > b.x ? [b, a] : [a, b];
  const end = left.x + left.w;
  if (right.x < end) return true;
  else return false;
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
