// @ts-check

import { Creature } from "./creature.js";
import { TPS, rand, hitboxOverlaps } from "./common.js";
import { state } from "./state.js";

export class Zombie extends Creature {
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
    this.laneno = rand(0, state.lanes.length - 1);
    this.div.className = "zombie";
    this.update();
    this.lane = state.lanes[this.laneno];
    this.lane.appendChild(this.div);
  }

  update() {
    this.div.style.left = `${this.x}%`;
  }

  destroy() {
    super.destroy();
    const pos = state.zombies.indexOf(this);
    if (pos >= 0) {
      state.zombies.splice(pos, 1);
    }
    this.div.parentElement?.removeChild(this.div);
    state.credits += 2;
  }

  tick() {
    const targetSpace = state.spaces[this.laneno].find(
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
  /**
   *
   * @returns Hitbox
   */
  hitbox() {
    return { laneno: this.laneno, x: this.x, w: 7 };
  }
}
