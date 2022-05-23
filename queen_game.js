const MAXYEARS = 95;
const PLAYERS = 4;
const playerDivs = [];
const monthDivs = [];
let turn = 0;
for (let player = 0; player < PLAYERS; player++) {
  const element = document.createElement("div");
  element.className = "player";
  element.textContent = player + 1;
  element.pos = 0;
  playerDivs.push(element);
}
for (let year = 0; year <= MAXYEARS; year++) {
  for (let month = 0; month < 12; month++) {
    if (year === MAXYEARS && month > 0) continue;
    const element = document.createElement("div");
    element.className = "tile";
    element.textContent = `${year}y` + (month > 0 ? `${month}m` : "");
    if (year === 0 && month === 0) {
      for (let player = 0; player < PLAYERS; player++) {
        const playerDiv = playerDivs[player];
        element.appendChild(playerDiv);
      }
    }

    // special rules
    if (year === 24 && month === 10) {
      element.goForward = 25 * 12;
      element.className = "tile purple";
    } else if (year === 49 && month === 10) {
      element.goForward = 15 * 12;
      element.className = "tile purple";
    } else if (year === 64 && month === 10) {
      element.goForward = 10 * 12;
      element.className = "tile purple";
    } else if (year === 74 && month === 10) {
      element.goForward = 10 * 12;
      element.className = "tile purple";
    } else if (year === 84 && month === 10) {
      element.goForward = 5 * 12;
      element.className = "tile purple";
    } else if (year === 89 && month === 10) {
      element.goForward = 5 * 12;
      element.className = "tile purple";
    } else if (year === 94 && month === 10) {
      element.goForward = 1 * 12;
      element.className = "tile purple";
    } else if (month === 0) {
      element.goForward = 10;
      element.className = "tile green";
    } else {
      element.goForward = 0;
    }

    document.body.appendChild(element);
    monthDivs.push(element);
  }
}
function keypress(e) {
  e.preventDefault();

  const player = playerDivs[turn];
  const dice = 1 + Math.floor(Math.random() * 6);
  console.log(`${turn} rolled ${dice}`);

  player.pos = Math.min(player.pos + dice, monthDivs.length - 1);
  let month = monthDivs[player.pos];
  if (month.goForward) {
    console.log(`${turn} goes forward ${month.goForward}`);

    player.pos = Math.min(player.pos + month.goForward, monthDivs.length - 1);
    month = monthDivs[player.pos];
  }
  month.appendChild(player);

  // next turn
  turn = (turn + 1) % PLAYERS;
}
window.addEventListener("keypress", keypress);
