const input = await Bun.file("./src/day3/input.txt").text();

const lines = input.split("\n");

let sum = 0;

let gears = new Map<string, number[]>();

lines.forEach((line, i) => {
	const results = line.matchAll(/[0-9]+/g);
	for (const result of results) {
		if (result.index === undefined) {
			throw Error("result.index is undefined");
		}
		let surroundings = "";
		if (i > 0) {
			surroundings += lines[i - 1].slice(
				Math.min(Math.max(result.index - 1, 0), line.length - 1),
				Math.min(result.index + result[0].length + 1, line.length)
			);
			surroundings += ";";
		}

		surroundings += lines[i].slice(
			Math.min(Math.max(result.index - 1, 0), line.length - 1),
			Math.min(result.index + result[0].length + 1, line.length)
		);

		if (i < lines.length - 1) {
			surroundings += ";";
			surroundings += lines[i + 1].slice(
				Math.min(Math.max(result.index - 1, 0), line.length - 1),
				Math.min(result.index + result[0].length + 1, line.length)
			);
		}

		if (surroundings.match(/[^0-9\.;]/) !== null) {
			sum += parseInt(result[0]);
		}

		//part 2
		const gearShafts = surroundings.matchAll(/[*]/g);
		for (const gearShaft of gearShafts) {
			if (gearShaft.index === undefined) {
				throw Error("gearShaft.index is undefined");
			}

			const pre = surroundings.slice(0, gearShaft.index);

			const y =
				pre.length -
				pre.replaceAll(";", "").length -
				(i === 0 ? 0 : 1) +
				i;

			const existingShaft = gears.get(
				JSON.stringify({
					x:
						(pre.split(";").pop()?.length ?? 0) -
						1 +
						Math.max(result.index - 1, 0),
					y,
				})
			);
			if (existingShaft !== undefined) {
				existingShaft.push(parseInt(result[0]));
			} else {
				gears.set(
					JSON.stringify({
						x:
							(pre.split(";").pop()?.length ?? 0) -
							1 +
							Math.max(result.index - 1, 0),
						y,
					}),
					[parseInt(result[0])]
				);
			}
		}
	}
});

console.log(sum);

let gearRatios = 0;

for (const gear of gears) {
	if (gear[1].length === 2) {
		gearRatios += gear[1][0] * gear[1][1];
	}
}

console.log(gearRatios);
