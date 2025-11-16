//@ts-check

export const menu = document.createElement("div");

export function hidemenu() {
  menu.parentElement?.removeChild(menu);
}
window.addEventListener("click", hidemenu, false);
