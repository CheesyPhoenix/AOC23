import { part1, part2 } from "./lib";

const input = await Bun.file("./src/day9/input.txt").text();
console.log(part1(input));
console.log(part2(input));
