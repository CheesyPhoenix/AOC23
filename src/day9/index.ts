import { part1 } from "./lib";

const input = await Bun.file("./src/day9/input.txt").text();
console.log(part1(input));
