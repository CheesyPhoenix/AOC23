export function getHands(input: string) {
	const lines = input.split("\n");

	const hands = lines.map((line) => {
		const [hand, bid] = line.split(" ", 2);
		let power = 0;

		let cards: { [key: string]: number } = {};
		for (let i = 0; i < hand.length; i++) {
			const card = hand[i];
			if (cards[card] !== undefined) cards[card] += 1;
			else cards[card] = 1;
		}
		Object.entries(cards).forEach(([card, count], i, arr) => {
			if (
				count === 5 ||
				(card !== "J" && cards["J"] && count + cards["J"] === 5)
			) {
				if (power < 6) {
					power = 6;
				}
			}
			if (
				count === 4 ||
				(card !== "J" && cards["J"] && count + cards["J"] === 4)
			) {
				if (power < 5) {
					power = 5;
				}
			}

			if (
				(count === 3 && arr.length === 2) ||
				(card !== "J" &&
					cards["J"] &&
					count + cards["J"] === 3 &&
					arr.length === 3)
			) {
				if (power < 4) {
					power = 4;
				}
			}

			if (
				count === 3 ||
				(card !== "J" && cards["J"] && count + cards["J"] === 3)
			) {
				if (power < 3) {
					power = 3;
				}
			}
			if (
				count === 2 ||
				(card !== "J" && cards["J"] && count + cards["J"] === 2)
			) {
				if (arr.length === 3) {
					if (power < 2) {
						power = 2;
					}
				} else {
					if (power < 1) {
						power = 1;
					}
				}
			}
		});

		return {
			hand,
			power,
			bid: parseInt(bid),
		};
	});

	return hands;
}

export function sortHands(hands: ReturnType<typeof getHands>) {
	const cardStrength = [
		"J",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"T",
		"Q",
		"K",
		"A",
	];

	return hands.toSorted((a, b) => {
		const compPow = a.power - b.power;
		if (compPow === 0) {
			for (let i = 0; i < a.hand.length; i++) {
				const aCard = a.hand[i];
				const bCard = b.hand[i];

				const aCardStrength = cardStrength.indexOf(aCard);
				const bCardStrength = cardStrength.indexOf(bCard);

				const comp = aCardStrength - bCardStrength;
				if (comp !== 0) return comp;
			}
			console.log({ a, b });

			return 0;
		}
		return compPow;
	});
}
