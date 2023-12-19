import { getWorkflows, part1 } from "./lib";

const input = await Bun.file("./src/day10/input.txt").text();
console.log(part1(input));
