const input = await Bun.file("./src/day1/input.txt").text();

let sum = 0;

const numMap: { [key: string]: string } = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};

input.split("\n").forEach((line) => {
	let firstIndex: number | undefined = undefined;
	let lastIndex: number | undefined = undefined;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		if (!isNaN(parseInt(char))) {
			if (firstIndex === undefined) firstIndex = i;
			lastIndex = i;
		}
	}
	// if (firstIndex === 0 && lastIndex === line.length - 1) {
	// 	sum += parseInt(line[firstIndex] + line[lastIndex]);
	// 	return;
	// }

	let first: string | undefined =
		firstIndex !== undefined ? line[firstIndex] : undefined;
	let last: string | undefined =
		lastIndex !== undefined ? line[lastIndex] : undefined;

	Object.keys(numMap).forEach((key) => {
		const indexOf = line.indexOf(key);
		const lastIndexOf = line.lastIndexOf(key);

		if (
			indexOf !== -1 &&
			(firstIndex === undefined || indexOf < firstIndex)
		) {
			first = numMap[key];
			firstIndex = indexOf;
		}
		if (
			lastIndexOf !== -1 &&
			(lastIndex === undefined || lastIndexOf > lastIndex)
		) {
			last = numMap[key];
			lastIndex = lastIndexOf;
		}
	});

	if (first === undefined || last === undefined) {
		throw Error("first or last is undefined");
	}

	sum += parseInt(first + last);
});

console.log(sum);
