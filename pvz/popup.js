// @ts-check

import { state } from "./state.js";

export function popup(message = "", permanent = false) {
  if (!state.popupel) return;
  // displays message
  state.popupel.textContent = message;
  // makes text opaque
  state.popupel.style.opacity = "1";

  if (!permanent) {
    // after 5seconds the text will become transparent
    setTimeout(() => {
      if (!state.popupel) return;

      state.popupel.style.opacity = "0";
    }, 5000);
  }
}
