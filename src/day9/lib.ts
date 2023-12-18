export function getDiffs(numbers: number[]): number[] {
	const result: number[] = [];
	for (let i = 0; i < numbers.length - 1; i++) {
		const num1 = numbers[i];
		const num2 = numbers[i + 1];
		result.push(num2 - num1);
	}
	return result;
}

export function getNext(numbers: number[]): number {
	const diffs: number[][] = [];
	let currDiff = numbers;
	while (true) {
		diffs.push(currDiff);
		if (!currDiff.some((x) => x !== 0)) {
			break;
		}

		currDiff = getDiffs(currDiff);
	}

	// reconstruct
	let nextVal = 0;
	diffs.toReversed().forEach((diff) => {
		nextVal += diff[diff.length - 1];
	});

	return nextVal;
}

export function part1(input: string): number {
	const lines = input.split("\n");

	let sum = 0;
	lines.forEach((line) => {
		sum += getNext(line.split(" ").map((x) => parseInt(x)));
	});
	return sum;
}

export function getPrevious(numbers: number[]): number {
	const diffs: number[][] = [];
	let currDiff = numbers;
	while (true) {
		diffs.push(currDiff);
		if (!currDiff.some((x) => x !== 0)) {
			break;
		}

		currDiff = getDiffs(currDiff);
	}

	// reconstruct
	let nextVal = 0;
	diffs.toReversed().forEach((diff) => {
		nextVal = diff[0] - nextVal;
	});

	return nextVal;
}

export function part2(input: string): number {
	const lines = input.split("\n");

	let sum = 0;
	lines.forEach((line) => {
		sum += getPrevious(line.split(" ").map((x) => parseInt(x)));
	});
	return sum;
}
