import { readFile } from "node:fs/promises";
const input = await readFile("day1.txt", "utf-8");
let dialvalue = 50;
const lines = input.split("\r\n");
function part1() {
  let counter = 0;

  for (const line of lines) {
    const dir = line[0];
    const amount = Number(line.slice(1));
    if (dir == "L") {
      dialvalue -= amount;
    } else if (dir == "R") {
      dialvalue += amount;
    }
    while (dialvalue < 0) {
      dialvalue += 100;
    }
    while (dialvalue > 99) {
      dialvalue -= 100;
    }
    if (dialvalue == 0) {
      counter += 1;
    }
  }

  console.log(counter);
}

function part2() {
  let counter = 0;

  for (const line of lines) {
    const dir = line[0];
    const amount = Number(line.slice(1));
    let i = 1;
    if (dir == "L") {
      i = -i;
    }
    for (let x = 0; x < amount; x++) {
      dialvalue += i;
      while (dialvalue < 0) {
        dialvalue += 100;
      }
      while (dialvalue > 99) {
        dialvalue -= 100;
      }
      if (dialvalue == 0) {
        counter += 1;
      }
    }
  }

  console.log(counter);
}
part2();
