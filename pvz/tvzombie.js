//@ts-check

import { TPS } from "./common.js";
import { Zombie } from "./zombie.js";

export class TVZombie extends Zombie {
  constructor() {
    super();
    this.speed = -45 / (60 * TPS);
    this.maxHp = 14;
    this.hp = this.maxHp;
    this.damage = 0.2;

    this.div.className = "zombie TVzombie";
  }
}
