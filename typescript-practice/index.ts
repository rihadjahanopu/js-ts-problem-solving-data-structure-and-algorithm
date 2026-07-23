const nui = (a: number, b: number): number => {
	return a / b;
};

let mult = nui(26, 46);

console.log(mult);

console.log(nui(26, 56));

let subtitle: string | undefined = undefined;

console.log(subtitle);

const nab: number = 20;

console.log(nab);

const ms: number = Math.random() * nab;

console.log(ms);

type User = {
	id: number;
	name: string;
	email: string;
	role?: string;
	readonly createAt: Date;
};

const userOne: User = {
	id: 1,
	name: "Rihad",
	email: "r@gmail.com",
	createAt: new Date(),
};

// userOne.createAt = new Date();
const me = 23;
