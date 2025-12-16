import { readFile } from "node:fs/promises";
const inputa = await readFile("day3.txt", "utf-8");
function a() {
  let totalvolt = 0;
  //seperate the batery packs
  const batterypacks = inputa.split("\n");
  console.log(batterypacks);
  // take battery packs and split numbers and find 2 highest in order to make highest possible number
  batterypacks.forEach((batterypack) => {
    let nums = new Array();
    const num = batterypack.split("").map((n) => Number(n));
    for (let i = 0; i < num.length; i++) {
      const val1 = batterypack[i];
      for (let j = i + 1; j < num.length; j++) {
        const val2 = batterypack[j];
        const realnum = Number(val1 + val2);
        nums.push(realnum);
      }
    }
    const largest = Math.max(...nums);
    totalvolt += largest;
  });
  console.log(totalvolt);
}
function b() {
  const batterypacks = inputa.split("\n");
  const amtofdig = 12;
  let total = 0;
  for (const line of batterypacks) {
    const numbers = line.trim().split("").map(Number);
    let joltage = 0;
    let start = 0;
    for (let digit = 1; digit <= 12; digit++) {
      const remdig = amtofdig - digit;
      const choice = numbers.slice(start, numbers.length - remdig);
      const largest = Math.max(...choice);
      const i = start + choice.indexOf(largest);
      start = i + 1;
      const order = remdig;
      const mag = 10 ** order;
      joltage += largest * mag;
    }
    total += joltage;
  }
  console.log(total);
}
b();
