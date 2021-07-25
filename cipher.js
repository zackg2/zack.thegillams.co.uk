console.log("hello world");
const mesage = "JRYY/QBAR/LBH/PENPXRQ/VG";
console.log(mesage);
const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".repeat(3);
console.log(alfabet);

let output = "";
for (let i = 0; i < mesage.length; i = i + 1) {
  const l = mesage[i];
  const n = alfabet.indexOf(l);
  if (n >= 0) {
    const c = n + 13;
    output = output + alfabet[c];
  } else {
    output = output + l;
  }
}
console.log(output);
