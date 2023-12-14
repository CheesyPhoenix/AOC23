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

let maps: {
	destStart: number;
	sourceStart: number;
	rangeLength: number;
	name: string;
}[][] = [];
let currentMap: {
	destStart: number;
	sourceStart: number;
	rangeLength: number;
	name: string;
}[] = [];
let currname = "null";
for (const line of lines) {
	if (line.length === 0 || line.includes("seeds:")) continue;

	if (line.includes("map")) {
		// switch maps
		if (currentMap.length > 0) {
			maps.push(currentMap);
			currentMap = [];
		}
		currname = line;

		continue;
	}

	const [destStart, sourceStart, rangeLength] = line
		.split(" ")
		.map((x) => parseInt(x));
	currentMap.push({ destStart, rangeLength, sourceStart, name: currname });
}
maps.push(currentMap);

const stages = [JSON.parse(JSON.stringify(seeds))];

maps.forEach((map) => {
	for (let i = 0; i < seeds.length; i++) {
		const seed = seeds[i];
		for (const op of map) {
			if (
				seed.from >= op.sourceStart + op.rangeLength ||
				seed.from + seed.count <= op.sourceStart
			) {
				continue;
			}
			if (seed.from >= op.sourceStart) {
				if (
					seed.from + seed.count - 1 <
					op.sourceStart + op.rangeLength
				) {
					// from inside to inside
					seed.from = op.destStart + seed.from - op.sourceStart;

					break;
				} else {
					// from inside to outside
					const toTake =
						op.rangeLength - (seed.from - op.sourceStart);
					seeds.push({
						from: seed.from + toTake,
						count: seed.count - toTake,
					});
					seed.from = op.destStart + seed.from - op.sourceStart;
					seed.count = toTake;
					break;
				}
			} else {
				// from outside to inside
				seeds.push({
					from: seed.from,
					count: op.sourceStart - seed.from,
				});
				seed.count = seed.count - (op.sourceStart - seed.from);
				seed.from = op.destStart;
				break;
			}
		}
	}

	stages.push(JSON.parse(JSON.stringify(seeds)));
});

let lowest: number | undefined = undefined;
seeds.forEach((seed) => {
	if (lowest === undefined || seed.from < lowest) {
		lowest = seed.from;
	}
});

console.log(lowest);

console.log(seeds.map((x) => x.from).sort((a, b) => a - b));
