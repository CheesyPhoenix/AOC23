import { expect, test } from "bun:test";
import { getParts, getWorkflows, part1 } from "./lib";

test("getWorkflows", () => {
	expect(getWorkflows("px{a<2006:qkq,m>2090:A,rfg}")).toEqual({
		px: [
			{
				op: "<",
				targetVar: "a",
				value: 2006,
				destination: "qkq",
				catchAll: false,
			},
			{
				op: ">",
				targetVar: "m",
				value: 2090,
				destination: "A",
				catchAll: false,
			},
			{ destination: "rfg", catchAll: true },
		],
	});
});

test("getParts", () => {
	expect(getParts("hdj{m>838:A,pv}\n\n{x=787,m=2655,a=1222,s=2876}")).toEqual([
		{ x: 787, m: 2655, a: 1222, s: 2876 },
	]);
});

test("part1", async () => {
	const input = await Bun.file("./src/day10/example-p1.txt").text();
	expect(part1(input)).toBe(19114);
});
