export function getDirections(input: string): string {
	const lines = input.split("\n");

	let directions = "";

	for (const line of lines) {
		if (line.length === 0) break;

		directions += line;
	}

	return directions;
}

export function getNodes(input: string): {
	[key: string]: { R: string; L: string };
} {
	const nodes: { [key: string]: { R: string; L: string } } = {};

	for (const line of input.split("\n")) {
		if (!line.includes(" = ")) continue;

		const [key, paths] = line.split(" = ", 2);
		const [L, R] = paths.split("(", 2)[1].split(")", 2)[0].split(", ");
		nodes[key] = { L, R };
	}

	return nodes;
}

export function getSteps(input: string): number {
	const directions = getDirections(input);

	const nodes = getNodes(input);

	let steps = 0;
	let currNode = "AAA";
	while (currNode !== "ZZZ") {
		const node = nodes[currNode];
		const direction = directions[steps % directions.length];

		if (direction !== "R" && direction !== "L") {
			throw Error("Direction was neither R nor L. Got: " + direction);
		}
		currNode = node[direction];
		steps++;
	}

	return steps;
}

export function getStartNodes(nodes: ReturnType<typeof getNodes>) {
	return Object.keys(nodes).filter(
		(x) => x.lastIndexOf("A") === x.length - 1
	);
}

export function getStepsPart2(input: string): number {
	const directions = getDirections(input);

	const nodes = getNodes(input);

	let steps = 0;
	let currNodes = getStartNodes(nodes);
	// TODO: detect loops and stuff

	while (currNodes.some((x) => x.lastIndexOf("Z") !== x.length - 1)) {
		const direction = directions[steps % directions.length];

		if (direction !== "R" && direction !== "L") {
			throw Error("Direction was neither R nor L. Got: " + direction);
		}
		currNodes = currNodes.map((currNode) => {
			const node = nodes[currNode];
			return node[direction];
		});

		if (steps % 10000000 === 0) {
			console.log(steps);
		}

		steps++;
	}

	return steps;
}
