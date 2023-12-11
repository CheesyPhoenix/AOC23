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
		map.forEach((op) => {
			if (
				seed.from > op.sourceStart &&
				seed.from < op.sourceStart + op.rangeLength
			) {
				if (
					seed.from + seed.count - 1 <
					op.sourceStart + op.rangeLength
				) {
					seed.from = op.destStart + seed.from - op.sourceStart;
				} else {
					const toTake = op.rangeLength - seed.from - op.destStart;
					seeds.push({
						from: seed.from + toTake,
						count: seed.count - toTake,
					});
					seed.from = op.destStart + seed.from - op.sourceStart;
					seed.count = toTake;
				}
			} else if (seed.from + seed.count - 1 )
		});
	});
});
