// @ts-check

import { Creature } from "./creature.js";
import { Projectile } from "./projectile.js";
import { state } from "./state.js";
/** @import {Space} from "./space.js" */

export class Turret extends Creature {
  space;
  counter = 0;
  cost = 10;
  ticksPerShot = 25;
  /**
   *
   * @param {Space} space
   */
  constructor(space) {
    super();
    this.div.className = "turret";
    this.space = space;
    this.update();
    this.space.div.appendChild(this.div);
  }

  update() {}

  fire() {
    const projectile = new Projectile(
      this.space.laneno,
      this.space.spaceno * 10 + 5
    );
    state.projectiles.push(projectile);
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
