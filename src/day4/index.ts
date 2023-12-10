const input = await Bun.file("./src/day4/input.txt").text();

const lines = input.split("\n").map((x) => {
	return { data: x, multiplier: 1 };
});

let sum = 0;
let cardCount = 0;

lines.forEach((line, lineNum) => {
	let cardValue = 0;
	let matches = 0;

	cardCount += line.multiplier;

	const [winningNums, actualNums] = line.data
		.split(":", 2)[1]
		.split("|")
		.map((x) =>
			x
				.trim()
				.split(" ")
				.filter((y) => y.length > 0)
				.map((y) => parseInt(y))
		);

	actualNums.forEach((num) => {
		if (winningNums.includes(num)) {
			if (cardValue === 0) {
				cardValue = 1;
			} else {
				cardValue *= 2;
			}
			matches++;
		}
	});

	sum += cardValue;

	for (let i = 1; i <= matches; i++) {
		lines[lineNum + i].multiplier += line.multiplier;
	}
});

console.log(sum);
console.log(cardCount);
