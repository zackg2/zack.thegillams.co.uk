// @ts-check

import { TVZombie } from "./tvzombie.js";
import { Zombie } from "./zombie.js";

export const WAVES = [
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
