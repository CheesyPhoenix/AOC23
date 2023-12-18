import { expect, test } from "bun:test";
import { getHands, sortHands } from "./lib";

test("example", async () => {
	const input = await Bun.file("./src/day7/exampleinput.txt").text();

	const hands = getHands(input);

	const sortedHands = sortHands(hands);

	let winnings = 0;
	sortedHands.forEach((hand, i) => {
		winnings += hand.bid * (i + 1);
	});

	expect(winnings).toBe(5905);
});

test("high card", () => {
	const hands = getHands("32TQK 765");

	expect(hands[0].power).toBe(0);
});

test("one pair joker", () => {
	const hands = getHands("32TQJ 765");

	expect(hands[0].power).toBe(1);
});

test("one pair", () => {
	const hands = getHands("32TQ3 765");

	expect(hands[0].power).toBe(1);
});

test("three of kind joker", () => {
	const hands = getHands("32TJ3 765");

	expect(hands[0].power).toBe(3);
});

test("full house joker", () => {
	const hands = getHands("322J3 765");

	expect(hands[0].power).toBe(4);
});
