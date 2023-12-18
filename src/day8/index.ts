import { getSteps, getStepsPart2 } from "./lib";

const input = await Bun.file("./src/day8/input.txt").text();
console.log(getSteps(input));
console.log(getStepsPart2(input));
