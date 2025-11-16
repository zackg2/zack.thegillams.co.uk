// @ts-check

import { Zombie } from "./zombie.js";
import { TPS, rand } from "./common.js";
import { state } from "./state.js";
import { Space } from "./space.js";

/** @import { Hitbox } from "./common.js" */

function tick() {
  state.credits = state.credits + 0.01;
  if (state.creditsel) {
    state.creditsel.textContent = String(Math.floor(state.credits));
  }
  for (const projectile of state.projectiles) {
    projectile.tick();
  }
  for (const lane of state.spaces) {
    for (const space of lane) {
      space.tick();
    }
  }
  for (const zombie of state.zombies) {
    zombie.tick();
    if (zombie.x < -4) {
      eatBrainz();
    }
  }

  if (state.currentWave < WAVES.length) {
    const part = WAVES[state.currentWave].parts[state.currentPart];

    for (const spawn of state.spawns) {
      if (spawn.tick === state.partTick) {
        const Klass = spawn.klass;
        const zombie = new Klass();
        zombie.update();
        state.zombies.push(zombie);
      }
    }

    if (state.currentPart < 0) {
      if (state.zombies.length === 0) {
        state.currentPart = 0;
        popup(`wave ${state.currentWave + 1}`);
      }
    } else {
      state.partTick += 1;
      if (state.partTick > part.duration * TPS) {
        state.partTick = 0;
        state.currentPart += 1;
        if (state.currentPart >= WAVES[state.currentWave].parts.length) {
          state.currentPart = 0;
          state.currentWave += 1;
        }
        if (state.currentWave < WAVES.length) {
          startPart();
        }
      }
    }
  } else {
    if (state.zombies.length === 0) {
      clearInterval(state.ticker);

      popup("THE ZOMBIEZ ARE GONE", true);
    }
  }
}
function eatBrainz() {
  clearInterval(state.ticker);
  popup("the zombiez have ate your brainz", true);
}

function start() {
  state.creditsel = document.getElementById("credits");
  state.popupel = document.getElementById("popup");

  state.lanes.push(...document.querySelectorAll(".lane"));

  for (let laneno = 0; laneno < state.lanes.length; laneno++) {
    const lane = state.lanes[laneno];
    state.spaces[laneno] = [];
    for (let spaceno = 0; spaceno < 8; spaceno++) {
      const space = new Space(laneno, spaceno);
      state.spaces[laneno].push(space);
    }
  }
  popup(`here they come`);

  state.currentWave = 0;
  state.currentPart = 0;
  state.partTick = 0;
  startPart();

  state.ticker = setInterval(tick, 1000 / TPS);
}

function startPart() {
  const part = WAVES[state.currentWave].parts[state.currentPart];
  state.partTick = 0;
  state.spawns = [];
  const ticks = part.duration * TPS;

  for (const zombieCount of part.zombies) {
    for (let n = 0; n < zombieCount.count; n++) {
      const tick = rand(0, ticks - 1);
      const klass = zombieCount.klass;
      state.spawns.push({ tick, klass });
    }
  }
}

function popup(message = "", permanent = false) {
  if (!state.popupel) return;
  // displays message
  state.popupel.textContent = message;
  // makes text opaque
  state.popupel.style.opacity = "1";

  if (!permanent) {
    // after 5seconds the text will become transparent
    setTimeout(() => {
      if (!state.popupel) return;

      state.popupel.style.opacity = "0";
    }, 5000);
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
