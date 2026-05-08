// ═══════════════════════════════════════════════════════════════
// 06_interfaces.ts — ইন্টারফেস (Interfaces)
// ═══════════════════════════════════════════════════════════════

// Basic Interface
interface Person {
	firstName: string;
	lastName: string;
	age: number;
	email?: string; // Optional
}

let person1: Person = {
	firstName: "Abdul",
	lastName: "Rahim",
	age: 30,
};

console.log("Person:", person1);

// Interface with Methods
interface Animal {
	name: string;
	makeSound(): void;
	getInfo(): string;
}

let dog: Animal = {
	name: "Buddy",
	makeSound() {
		console.log("Woof!");
	},
	getInfo() {
		return `Name: ${this.name}`;
	},
};

dog.makeSound();
console.log(dog.getInfo());

// Interface with Index Signature
interface StringDictionary {
	[key: string]: string;
}

let translations: StringDictionary = {
	hello: "Hola",
	goodbye: "Adios",
};
console.log("Translation:", translations.hello);

// Readonly Interface
interface Config {
	readonly apiUrl: string;
	readonly timeout: number;
}

let appConfig: Config = {
	apiUrl: "https://api.example.com",
	timeout: 5000,
};
// appConfig.apiUrl = "..."; // ❌ Error

// Interface Extension (Inheritance)
interface Shape {
	color: string;
}

interface Square extends Shape {
	sideLength: number;
}

let mySquare: Square = {
	color: "red",
	sideLength: 10,
};
console.log("Square:", mySquare);

// Multiple Extension
interface Printable {
	print(): void;
}

interface Serializable {
	serialize(): string;
}

interface Document extends Printable, Serializable {
	title: string;
	content: string;
}

let myDoc: Document = {
	title: "My Report",
	content: "Lorem ipsum...",
	print() {
		console.log(this.content);
	},
	serialize() {
		return JSON.stringify(this);
	},
};

myDoc.print();
console.log("Serialized:", myDoc.serialize());

// Interface Merging (Declaration Merging)
interface Car {
	brand: string;
}

interface Car {
	model: string;
}

let myCar: Car = {
	brand: "Toyota",
	model: "Corolla",
};
console.log("Car:", myCar);

// Class implements Interface
interface Drawable {
	draw(): void;
	getArea(): number;
}

class Circle implements Drawable {
	constructor(private radius: number) {}

	draw(): void {
		console.log("Drawing circle");
	}

	getArea(): number {
		return Math.PI * this.radius * this.radius;
	}
}

let circle = new Circle(5);
circle.draw();
console.log("Area:", circle.getArea());

export {};
