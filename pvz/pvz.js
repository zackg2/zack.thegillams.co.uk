// @ts-check

import { TPS, rand } from "./common.js";
import { state } from "./state.js";
import { Space } from "./space.js";
import { popup } from "./popup.js";
import { WAVES } from "./waves.js";

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

setTimeout(start, 0);
