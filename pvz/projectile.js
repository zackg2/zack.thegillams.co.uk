//@ts-check

import { hitboxOverlaps, TPS } from "./common.js";
import { state } from "./state.js";

export class Projectile {
  laneno = -1;
  speed = 1000 / (60 * TPS);
  x = 0;
  div = document.createElement("div");
  /**
   *
   * @param {number} laneno
   * @param {number} x
   * @param {string} className
   * @param {number} damage
   */
  constructor(laneno, x, className = "bullet", damage = 1) {
    this.damage = damage;
    this.laneno = laneno;
    this.x = x;
    this.div.className = `projectile ${className}`;
    this.update();
    state.lanes[this.laneno].appendChild(this.div);
  }

  update() {
    this.div.style.left = `${this.x}%`;
  }

  destroy() {
    const pos = state.projectiles.indexOf(this);
    if (pos >= 0) {
      state.projectiles.splice(pos, 1);
    }
    this.div.parentElement?.removeChild(this.div);
  }

  tick() {
    this.x = this.x + this.speed;
    for (const zombie of state.zombies) {
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
