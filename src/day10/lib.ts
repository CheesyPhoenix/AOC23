export function getWorkflows(input: string): {
	[key: string]: (
		| {
				op: "<" | ">";
				targetVar: "x" | "m" | "a" | "s";
				value: number;
				destination: string | "A" | "R";
				catchAll: false;
		  }
		| {
				catchAll: true;
				destination: string | "A" | "R";
		  }
	)[];
} {
	const lines = input.split("\n");

	let workflows: ReturnType<typeof getWorkflows> = {};

	for (const line of lines) {
		if (line.length === 0) break;

		const [name, value] = line.replace("}", "").split("{", 2);
		const ops: ReturnType<typeof getWorkflows>["x"] = value
			.split(",")
			.map((x) => {
				if (!x.includes(":")) return { destination: x, catchAll: true };

				const [op, dest] = x.split(":", 2);

				if (op.includes("<")) {
					const [targetVar, value] = op.split("<", 2);
					return {
						op: "<",
						targetVar,
						value: parseInt(value),
						destination: dest,
						catchAll: false,
					};
				} else if (op.includes(">")) {
					const [targetVar, value] = op.split(">", 2);
					return {
						op: ">",
						targetVar,
						value: parseInt(value),
						destination: dest,
						catchAll: false,
					};
				} else {
					throw Error("something went wrong, no <, > or : found");
				}
			});
		workflows[name] = ops;
	}

	return workflows;
}

export function getParts(
	input: string
): { x: number; m: number; a: number; s: number }[] {
	const lines = input.split("\n\n", 2)[1].split("\n");
	const parts: ReturnType<typeof getParts> = lines.map((x) => {
		const [_x, _m, _a, _s] = x
			.split(",")
			.map((x) => parseInt(x.split("=", 2)[1]));
		return {
			x: _x,
			m: _m,
			a: _a,
			s: _s,
		};
	});

	return parts;
}

export function part1(input: string): number {
	let sum = 0;

	const workflows = getWorkflows(input);
	const parts = getParts(input);

	parts.forEach((part) => {
		let currentWorkflow = workflows.in;

		while (true) {
			for (const op of currentWorkflow) {
				if (op.catchAll) {
					if (op.destination === "A") {
						sum += part.x + part.m + part.a + part.s;
						return;
					} else if (op.destination === "R") {
						return;
					}
					currentWorkflow = workflows[op.destination];
					break;
				}

				let success = false;

				if (op.op === "<") {
					if (part[op.targetVar] < op.value) {
						success = true;
					}
				} else if (op.op === ">") {
					if (part[op.targetVar] > op.value) {
						success = true;
					}
				}

				if (success) {
					if (op.destination === "A") {
						sum += part.x + part.m + part.a + part.s;
						return;
					} else if (op.destination === "R") {
						return;
					}
					currentWorkflow = workflows[op.destination];
					break;
				}
			}
		}
	});

	return sum;
}
