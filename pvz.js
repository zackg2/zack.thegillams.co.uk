const zombies = [];
const lanes = [];
const TPS = 10;

function rand(low, high) {
  return low + Math.floor(Math.random() * (high - low));
}

function tick() {
  for (const zombie of zombies) {
    zombie.tick();
  }
}

function start() {
  lanes.push(...document.querySelectorAll(".lane"));
  for (let i = 0; i < 3; i++) {
    const zombie = new Zombie();
    zombie.progress = -i * 3;
    zombie.update();
    zombies.push(zombie);
  }
  setInterval(tick, 1000 / TPS);
}

class Zombie {
  lane = -1;
  speed = 100 / (60 * TPS);
  progress = 0;
  div = document.createElement("div");

  constructor() {
    this.lane = rand(0, lanes.length - 1);
    this.div.className = "zombie";
    this.update();
    lanes[this.lane].appendChild(this.div);
  }

  update() {
    this.div.style.left = `${100 - this.progress}%`;
  }

  tick() {
    this.progress += this.speed;
    this.update();
  }
}
start();
