// @ts-check

/** @import { Zombie } from "./zombie.js"; */
/** @import { Space } from "./space.js"; */
/** @import { Projectile } from "./projectile.js"; */

export const state = {
  /** @type {Zombie[]} */
  zombies: [],
  /** @type {Element[]} */
  lanes: [],
  /** @type {Space[][]} */
  spaces: [],
  /** @type {Projectile[]} */
  projectiles: [],

  credits: 50,

  /** @type {HTMLElement | null} */
  creditsel: null,
  /** @type {HTMLElement | null} */
  popupel: null,
  /** @type {number | undefined} */
  ticker: undefined,
  currentWave: 0,
  currentPart: 0,
  partTick: 0,
  /** @type {{tick:number,klass:typeof Zombie}[]} */

  spawns: [],
};
