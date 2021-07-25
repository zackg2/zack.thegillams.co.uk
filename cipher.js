console.log("hello world");
const mesage = "JUB JNAGF CEVATYRF";
console.log(mesage);
const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".repeat(3);
console.log(alfabet);

function decipher(mesage, rot) {
  let output = "";
  for (let i = 0; i < mesage.length; i = i + 1) {
    const l = mesage[i];
    const n = alfabet.indexOf(l);
    if (n >= 0) {
      const c = n + rot;
      output = output + alfabet[c];
    } else {
      output = output + l;
    }
  }
  console.log(output);
}

for (let j = 0; j < 26; j = j + 1) {
  decipher(mesage, j);
}
