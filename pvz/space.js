//@ts-check

import { Turret } from "./turret.js";
import { state } from "./state.js";
import { menu, hidemenu } from "./menu.js";
import { CCC } from "./ccc.js";

export class Space {
  laneno = -1;
  spaceno = -1;
  div = document.createElement("div");
  /** @type {Turret|null} */
  turret = null;

  /**
   *
   * @param {number} laneno
   * @param {number} spaceno
   */
  constructor(laneno, spaceno) {
    this.laneno = laneno;
    this.spaceno = spaceno;
    this.div.className = "space";
    this.div.onclick = this.clicked.bind(this);
    this.div.style.left = `${this.spaceno * 10}%`;
    this.update();
    state.lanes[this.laneno].appendChild(this.div);
  }

  update() {}
  /**
   *
   * @param {Event} e
   */
  clicked(e) {
    e.stopPropagation();
    /*
    if (!this.turret && state.credits >= 10) {
      state.credits -= 10;
      this.turret = new Turret(this);
      } else if (this.turret) {
        this.turret.destroy();
        this.turret = new CCC(this);
        }
    */
    menu.innerHTML = "";
    this.div.appendChild(menu);
    menu.className = "turretPopup";
    if (this.turret) {
      {
        const button = document.createElement("button");
        menu.appendChild(button);
        button.innerHTML = "x";
        button.className = "";
        button.onclick = (e) => {
          e.stopPropagation();
          state.credits += (this.turret?.cost ?? 0) / 2;
          this.turret?.destroy();
          this.turret = null;
          hidemenu();
        };
      }
    } else {
      {
        const cost = 10;
        const button = document.createElement("button");
        button.disabled = state.credits < cost;
        menu.appendChild(button);
        button.innerHTML = "";
        button.className = "button";
        button.onclick = (e) => {
          e.stopPropagation();
          state.credits -= cost;
          this.turret = new Turret(this);
          this.turret.cost = cost;

          hidemenu();
        };
      }
      {
        const cost = 20;

        const button = document.createElement("button");
        button.disabled = state.credits < cost;
        menu.appendChild(button);
        button.innerHTML = "";
        button.className = "button2";
        button.onclick = (e) => {
          e.stopPropagation();
          state.credits -= cost;
          this.turret = new CCC(this);
          this.turret.cost = cost;
          hidemenu();
        };
      }
    }
  }
  tick() {
    this.update();
    if (this.turret) {
      this.turret.tick();
    }
  }

  hitbox() {
    return { laneno: this.laneno, x: this.spaceno * 10, w: 10 };
  }
}
