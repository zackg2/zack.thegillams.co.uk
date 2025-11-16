// @ts-check

export class Creature {
  div = document.createElement("div");
  healthbarDiv = document.createElement("div");
  healthbarbackgroundDiv = document.createElement("div");
  maxHp = 10;
  constructor() {
    this.hp = this.maxHp;
    this.div.appendChild(this.healthbarbackgroundDiv);
    this.healthbarbackgroundDiv.className = "healthbarbackground";
    this.healthbarbackgroundDiv.appendChild(this.healthbarDiv);
    this.healthbarDiv.className = "healthbar";
  }
  /**
   *
   * @param {number} damage
   */

  suffer(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.destroy();
    } else {
      //   this.div.style.opacity = String(this.hp / this.maxHp);
      this.healthbarDiv.style.width = `${(this.hp / this.maxHp) * 7.8}vw`;
    }
  }
  // heal(damage)
  destroy() {
    this.div.parentElement?.removeChild(this.div);
  }
}
