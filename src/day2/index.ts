const input = await Bun.file("./src/day2/input.txt").text();

const maxMap: { [key: string]: number } = {
	red: 12,
	green: 13,
	blue: 14,
};

let sumPossibleGameIDs = 0;
let sumPowers = 0;

input.split("\n").forEach((line) => {
	const gameid = parseInt(line.split(":", 2)[0].split(" ", 2)[1]);

	const sets = line.split(":", 2)[1].trim().split(/[,;] /);

	let possible = true;
	for (const set of sets) {
		const split = set.split(" ", 2);
		if (maxMap[split[1]] < parseInt(split[0])) {
			possible = false;
			break;
		}
	}

	if (possible) {
		sumPossibleGameIDs += gameid;
	}

	const largest: { [key: string]: number } = {
		red: 0,
		green: 0,
		blue: 0,
	};
	for (const set of sets) {
		const split = set.split(" ", 2);
		if (largest[split[1]] < parseInt(split[0])) {
			largest[split[1]] = parseInt(split[0]);
		}
	}

	sumPowers += largest["red"] * largest["green"] * largest["blue"];
});

console.log(sumPossibleGameIDs);
console.log(sumPowers);
