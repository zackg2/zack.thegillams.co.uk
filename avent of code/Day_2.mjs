import { readFile } from "node:fs/promises";
const input = await readFile("day2.txt", "utf-8");

//split the input on "," store in variable called ranges
function part1() {
  const ranges = input.split(",").map((s) => s.trim());
  console.log(ranges);
  let counter = 0;
  // loop over each of the ranges
  ranges.forEach((range) => {
    //and for each split on"-" to give min and max
    // parse into numbers
    const [min, max] = range.split("-").map((n) => Number(n));
    console.log(min, max);

    // loop over all numbers in range and perform checks
    for (let id = min; id <= max; id++) {
      //  console.log (id)
      // if the number is the same pattern 2x then imvalid
      const idstr = String(id);
      if (idstr.length % 2 == 1) continue;
      const haplen = idstr.length / 2;
      const left = idstr.slice(0, haplen);
      const right = idstr.slice(haplen, idstr.length);
      if (left == right) counter += id;
    }
  });
  console.log(counter);
}

function part2() {
  const ranges = input.split(",").map((s) => s.trim());
  console.log(ranges);
  let counter = 0;
  // loop over each of the ranges
  ranges.forEach((range) => {
    //and for each split on"-" to give min and max
    // parse into numbers
    const [min, max] = range.split("-").map((n) => Number(n));
    console.log(min, max);

    // loop over all numbers in range and perform checks
    for (let id = min; id <= max; id++) {
      //  console.log (id)
      // if the number is the same pattern 2x then imvalid
      const idstr = String(id);
      for (let replen = 1; replen < idstr.length; replen++) {
        if (idstr.length % replen != 0) continue;
        const slices = idstr.length / replen;
        if (slices == 1) continue;
        const left = idstr.slice(0, replen);
        let isMatch = true;
        for (let slice = 1; slice < slices; slice++) {
          const right = idstr.slice(replen * slice, replen * (slice + 1));
          if (left != right) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          counter += id;
          console.log(id);
          break;
        }
      }
    }
  });
  console.log(counter);
}
part2();
