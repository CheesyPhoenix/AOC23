import { getHands, sortHands } from "./lib";

const input = await Bun.file("./src/day7/input.txt").text();

const hands = getHands(input);

const sortedHands = sortHands(hands);

let winnings = 0;
sortedHands.forEach((hand, i) => {
	winnings += hand.bid * (i + 1);
});

console.log(winnings);
