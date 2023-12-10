const input = await Bun.file("./src/day5/input.txt").text();

const lines = input.split("\n");

const seeds: { id: number; steps: { [key: string]: number } }[] = lines[0]
	.split("seeds: ", 2)[1]
	.trim()
	.split(" ")
	.filter((x) => x.length > 0)
	.map((x) => {
		return { id: parseInt(x), steps: { seed: parseInt(x) } };
	});

let currentMap: { to: string; from: string } = { to: "", from: "" };
for (const line of lines) {
	if (line.length === 0) continue;

	if (line.includes("map")) {
		// switch maps
		const [from, to] = line.split(" map:", 2)[0].split("-to-");
		currentMap = { to, from };

		seeds.forEach((seed) => {
			seed.steps[currentMap.to] = seed.steps[currentMap.from];
		});

		continue;
	}

	const [destStart, sourceStart, rangeLength] = line
		.split(" ")
		.map((x) => parseInt(x));

	seeds.forEach((seed) => {
		if (
			seed.steps[currentMap.from] > sourceStart &&
			seed.steps[currentMap.from] < sourceStart + rangeLength
		) {
			seed.steps[currentMap.to] =
				destStart + seed.steps[currentMap.from] - sourceStart;
		}
	});
}

// get lowest location number
let lowest: number | undefined = undefined;
seeds.forEach((seed) => {
	if (lowest === undefined || seed.steps["location"] < lowest)
		lowest = seed.steps["location"];
});

console.log(lowest);
