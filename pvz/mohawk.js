//@ts-check

import { TPS } from "./common.js";
import { Zombie } from "./zombie.js";

export class mohawk extends Zombie {
  constructor() {
    super();
    this.speed = -100 / (60 * TPS);
    this.maxHp = 5;
    this.hp = this.maxHp;
    this.damage = 0.3;

    this.div.className = "zombie sprite mohawk";
  }
}
