const MAXYEARS = 95;
const PLAYERS = 4;
const playerDivs = [];
for (let player = 0; player < PLAYERS; player++) {
  const element = document.createElement("div");
  element.className = "player";
  element.textContent = player + 1;
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
    document.body.appendChild(element);
  }
}
