import { expect, test } from "bun:test";
import {
	getDirections,
	getNodes,
	getStartNodes,
	getSteps,
	getStepsPart2,
} from "./lib";

test("simple example", async () => {
	const input = await Bun.file("./src/day8/simple-example.txt").text();
	expect(getSteps(input)).toBe(2);
});

test("long example", async () => {
	const input = await Bun.file("./src/day8/long-example.txt").text();
	expect(getSteps(input)).toBe(6);
});

test("directions single line", () => {
	expect(getDirections("RLRLLRLRRRLR")).toBe("RLRLLRLRRRLR");
});

test("directions multi line", () => {
	expect(getDirections("RLRLLRLRRRLR\nRRLRLLLLRRLRR\n\nRLRLR")).toBe(
		"RLRLLRLRRRLRRRLRLLLLRRLRR"
	);
});

test("single node", () => {
	expect(getNodes("RL\n\nAAA = (BBB, CCC)")).toEqual({
		AAA: { L: "BBB", R: "CCC" },
	});
});

test("multiple nodes", () => {
	expect(
		getNodes(
			"RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)"
		)
	).toEqual({
		AAA: { L: "BBB", R: "CCC" },
		BBB: { L: "DDD", R: "EEE" },
		CCC: { L: "ZZZ", R: "GGG" },
		DDD: { L: "DDD", R: "DDD" },
		EEE: { L: "EEE", R: "EEE" },
		GGG: { L: "GGG", R: "GGG" },
		ZZZ: { L: "ZZZ", R: "ZZZ" },
	});
});

test("part2 example", async () => {
	const input = await Bun.file("./src/day8/part2-example.txt").text();
	expect(getStepsPart2(input)).toBe(6);
});

test("get start nodes", () => {
	expect(
		getStartNodes({
			"21A": { R: "", L: "" },
			"21B": { R: "", L: "" },
			A1B: { R: "", L: "" },
			A1A: { R: "", L: "" },
			A2B: { R: "", L: "" },
			"31C": { R: "", L: "" },
			"312": { R: "", L: "" },
			AAA: { R: "", L: "" },
		})
	).toEqual(["21A", "A1A", "AAA"]);
});
