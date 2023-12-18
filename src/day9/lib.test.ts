import { test, expect } from "bun:test";
import { getDiffs, getNext, getPrevious } from "./lib";

test("getDiffs basic", () => {
	expect(getDiffs([0, 3, 6, 9, 12, 15])).toEqual([3, 3, 3, 3, 3]);
});

test("getDiffs zero", () => {
	expect(getDiffs([3, 3, 3, 3, 3])).toEqual([0, 0, 0, 0]);
});

test("getDiffs advanced", () => {
	expect(getDiffs([1, 3, 6, 10, 15, 21])).toEqual([2, 3, 4, 5, 6]);
});

test("getNext example1", () => {
	expect(getNext([0, 3, 6, 9, 12, 15])).toBe(18);
});

test("getNext example2", () => {
	expect(getNext([1, 3, 6, 10, 15, 21])).toBe(28);
});

test("getNext example3", () => {
	expect(getNext([10, 13, 16, 21, 30, 45])).toBe(68);
});

test("getPrevious example3", () => {
	expect(getPrevious([10, 13, 16, 21, 30, 45])).toBe(5);
});
