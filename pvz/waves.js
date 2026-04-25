// @ts-check

import { Hat } from "./Hat.js";
import { Zombie } from "./zombie.js";
import { mohawk } from "./mohawk.js";

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
          { klass: Hat, count: 1 },
          { klass: mohawk, count: 3 },
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
          { klass: Hat, count: 5 },
          { klass: mohawk, count: 10 },
        ],
      },
      {
        duration: 20,
        zombies: [
          { klass: Zombie, count: 6 },
          { klass: Hat, count: 5 },
          { klass: mohawk, count: 6 },
        ],
      },
    ],
  },
];
