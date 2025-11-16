import { readFile, writeFile } from "node:fs/promises";
const __dirname = import.meta.dirname;
console.log("hello");
async function convert(name) {
  const tsv = await readFile(`${__dirname}/../data/${name}.tsv`, "utf-8");
  const lines = tsv
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line != "");
  const data = lines.map((line) => line.split("\t"));
  const headers = data.shift();
  const objects = data.map((values) => {
    const object = {};
    headers.forEach((header, i) => {
      const value = values[i];
      object[header] = value;
    });

    return object;
  });
  console.log(objects);
  await writeFile(
    `${__dirname}/../${name}-data.js`,
    `export const data=${JSON.stringify(objects, null, 2)}`
  );
}
await convert("turrets");
await convert("zombies");
