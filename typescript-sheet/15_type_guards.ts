// ═══════════════════════════════════════════════════════════════
// 15_type_guards.ts — Type Guards (টাইপ গার্ড)
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// typeof Type Guard
// ═══════════════════════════════════════

function processValue(value: string | number | boolean): void {
	if (typeof value === "string") {
		console.log("String length:", value.length);
	} else if (typeof value === "number") {
		console.log("Number squared:", value ** 2);
	} else {
		console.log("Boolean:", value);
	}
}

processValue("hello");
processValue(5);
processValue(true);

// ═══════════════════════════════════════
// instanceof Type Guard
// ═══════════════════════════════════════

class Dog {
	bark() {
		console.log("Woof!");
	}
}

class Cat {
	meow() {
		console.log("Meow!");
	}
}

function makeSound(animal: Dog | Cat): void {
	if (animal instanceof Dog) {
		animal.bark();
	} else {
		animal.meow();
	}
}

makeSound(new Dog());
makeSound(new Cat());

// ═══════════════════════════════════════
// in Type Guard
// ═══════════════════════════════════════

type Car = {
	drive(): void;
	wheels: number;
};

type Boat = {
	sail(): void;
	anchor: string;
};

function moveVehicle(vehicle: Car | Boat): void {
	if ("drive" in vehicle) {
		vehicle.drive();
	} else {
		vehicle.sail();
	}
}

let myCar: Car = {
	drive() {
		console.log("Driving...");
	},
	wheels: 4,
};

let myBoat: Boat = {
	sail() {
		console.log("Sailing...");
	},
	anchor: "heavy",
};

moveVehicle(myCar);
moveVehicle(myBoat);

// ═══════════════════════════════════════
// Custom Type Guard (is keyword)
// ═══════════════════════════════════════

interface Bird {
	fly(): void;
	layEggs(): void;
}

interface Fish {
	swim(): void;
	layEggs(): void;
}

// Custom type guard function
function isBird(animal: Bird | Fish): animal is Bird {
	return (animal as Bird).fly !== undefined;
}

function interactWithAnimal(animal: Bird | Fish): void {
	if (isBird(animal)) {
		animal.fly(); // TypeScript knows it's Bird
	} else {
		animal.swim(); // TypeScript knows it's Fish
	}
	animal.layEggs(); // Common property
}

let bird: Bird = {
	fly() {
		console.log("Flying...");
	},
	layEggs() {
		console.log("Laying eggs...");
	},
};

interactWithAnimal(bird);

// ═══════════════════════════════════════
// Discriminated Unions
// ═══════════════════════════════════════

interface Circle {
	kind: "circle";
	radius: number;
}

interface Square {
	kind: "square";
	sideLength: number;
}

interface Triangle {
	kind: "triangle";
	base: number;
	height: number;
}

type Shape = Circle | Square | Triangle;

// Discriminant property: kind
function getArea(shape: Shape): number {
	switch (shape.kind) {
		case "circle":
			return Math.PI * shape.radius ** 2;
		case "square":
			return shape.sideLength ** 2;
		case "triangle":
			return 0.5 * shape.base * shape.height;
		default:
			// Exhaustive check with never
			const _exhaustiveCheck: never = shape;
			return _exhaustiveCheck;
	}
}

let circle: Shape = { kind: "circle", radius: 5 };
let square: Shape = { kind: "square", sideLength: 10 };

console.log("Circle area:", getArea(circle));
console.log("Square area:", getArea(square));

// ═══════════════════════════════════════
// Truthiness Guard
// ═══════════════════════════════════════

function printLength(str: string | null | undefined): void {
	if (str) {
		console.log("Length:", str.length); // str is string here
	} else {
		console.log("No string provided");
	}
}

printLength("hello");
printLength(null);
printLength(undefined);

// ═══════════════════════════════════════
// Equality Guard
// ═══════════════════════════════════════

type Result =
	| { success: true; data: string }
	| { success: false; error: string };

function handleResult(result: Result): void {
	if (result.success === true) {
		console.log("Data:", result.data);
	} else {
		console.log("Error:", result.error);
	}
}

handleResult({ success: true, data: "Hello" });
handleResult({ success: false, error: "Failed" });

export {};
