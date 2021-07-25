console.log("hello world");
const mesage = "JRYY/QBAR/LBH/PENPXRQ/VG";
const letters = mesage.split("");
console.log(letters);
const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".repeat(3);
const alfabetletters = alfabet.split("");
console.log(alfabetletters);

let output = "";
for (let i = 0; i < letters.length; i = i + 1) {
  const l = letters[i];
  const n = alfabetletters.indexOf(l);
  if (n >= 0) {
    const c = n + 13;
    output = output + alfabetletters[c];
  } else {
    output = output + l;
  }
}
console.log(output);
