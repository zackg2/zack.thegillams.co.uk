// @ts-check
import { Turret } from "./turret.js";
/** @import { Space } from "./space.js"; */

export class CCC extends Turret {
  /**
   *
   * @param {Space} space
   */
  constructor(space) {
    super(space);
    this.ticksPerShot = 12;
    this.maxHp = 14;
    this.hp = this.maxHp;

    this.div.className = "turret CCC";
  }
}
