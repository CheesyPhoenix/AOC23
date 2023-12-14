const input = await Bun.file("./src/day6/input.txt").text();

const lines = input.split("\n");

const times = lines[0]
	.split("Time: ", 2)[1]
	.trim()
	.split(" ")
	.filter((x) => x.trim().length > 0)
	.map((x) => parseInt(x));
const records = lines[1]
	.split("Distance: ", 2)[1]
	.trim()
	.split(" ")
	.filter((x) => x.trim().length > 0)
	.map((x) => parseInt(x));

let multipliedBetterRecords = 1;

for (let i = 0; i < times.length; i++) {
	const time = times[i];
	const record = records[i];
	let betterRecords = 0;
	for (let x = 0; x <= time; x++) {
		const distance = x * (time - x);
		if (distance > record) {
			betterRecords++;
		}
	}
	multipliedBetterRecords *= betterRecords;
}

console.log(multipliedBetterRecords);
