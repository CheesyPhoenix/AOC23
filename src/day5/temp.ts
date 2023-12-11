const input = await Bun.file("./src/day5/input.txt").text();

const lines = input.split("\n");

const inputNums = lines[0]
	.split("seeds: ", 2)[1]
	.trim()
	.split(" ")
	.map((x) => parseInt(x));

const counts = inputNums.filter((_, i) => i % 2 !== 0);

const seeds: { from: number; count: number }[] = inputNums
	.filter((_, i) => i % 2 === 0)
	.map((x, i) => {
		return {
			from: x,
			count: counts[i],
		};
	});

let maps: { destStart: number; sourceStart: number; rangeLength: number }[][] =
	[];
let currentMap: {
	destStart: number;
	sourceStart: number;
	rangeLength: number;
}[] = [];
for (const line of lines) {
	if (line.length === 0) continue;

	if (line.includes("map")) {
		// switch maps
		maps.push(currentMap);
		currentMap = [];

		continue;
	}

	const [destStart, sourceStart, rangeLength] = line
		.split(" ")
		.map((x) => parseInt(x));
	currentMap.push({ destStart, rangeLength, sourceStart });
}

maps.forEach((map) => {
	seeds.forEach((seed) => {
		// if (
		// 	seed.steps[currentMap.from] > sourceStart &&
		// 	seed.steps[currentMap.from] < sourceStart + rangeLength
		// ) {
		// 	seed.steps[currentMap.to] =
		// 		destStart + seed.steps[currentMap.from] - sourceStart;
		// }

		if (seed.from > sourceStart && seed.from < sourceStart + rangeLength) {
			if (seed.from + seed.count - 1 < sourceStart + rangeLength) {
				seed.from = destStart + seed.from - sourceStart;
			} else {
				const toTake = rangeLength - seed.from - destStart;
				seeds.push({
					from: seed.from + toTake,
					count: seed.count - toTake,
				});
			}
		}
	});
});
