// ═══════════════════════════════════════════════════════════════
// 11_union_intersection.ts — Union & Intersection Types
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Union Types (|) — এক বা একাধিক type
// ═══════════════════════════════════════

// Basic Union
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42;
// value = true; // ❌ Error

// Function with Union parameter
function printId(id: string | number): void {
	console.log(`ID: ${id}`);
}
printId("abc123");
printId(101);

// Type Narrowing with Union
function processValue(value: string | number | boolean): void {
	if (typeof value === "string") {
		console.log(value.toUpperCase()); // TypeScript knows it's string
	} else if (typeof value === "number") {
		console.log(value.toFixed(2)); // TypeScript knows it's number
	} else {
		console.log(value ? "Yes" : "No"); // TypeScript knows it's boolean
	}
}

processValue("typescript");
processValue(3.14159);
processValue(true);

// Union with Objects
type Circle = {
	kind: "circle";
	radius: number;
};

type Square = {
	kind: "square";
	sideLength: number;
};

type Rectangle = {
	kind: "rectangle";
	width: number;
	height: number;
};

type Shape = Circle | Square | Rectangle;

function getArea(shape: Shape): number {
	switch (shape.kind) {
		case "circle":
			return Math.PI * shape.radius ** 2;
		case "square":
			return shape.sideLength ** 2;
		case "rectangle":
			return shape.width * shape.height;
		default:
			// Exhaustive check
			const _exhaustive: never = shape;
			return _exhaustive;
	}
}

let circle: Circle = { kind: "circle", radius: 5 };
console.log("Circle area:", getArea(circle));

// ═══════════════════════════════════════
// Intersection Types (&) — সব type একসাথে
// ═══════════════════════════════════════

type HasName = {
	name: string;
};

type HasAge = {
	age: number;
};

type HasEmail = {
	email: string;
};

// Intersection — সব properties থাকতে হবে
type Person = HasName & HasAge;
type Employee = HasName & HasAge & HasEmail;

let person: Person = {
	name: "Rahim",
	age: 25,
};

let employee: Employee = {
	name: "Karim",
	age: 30,
	email: "karim@company.com",
};

console.log("Person:", person);
console.log("Employee:", employee);

// Intersection with conflicting types
type X = { a: string; b: number };
type Y = { b: string; c: boolean };
// type Z = X & Y; // b becomes never (conflict)

// Practical: Mixin pattern with Intersection
interface Timestamps {
	createdAt: Date;
	updatedAt: Date;
}

interface SoftDelete {
	deletedAt: Date | null;
	isDeleted: boolean;
}

type Entity = { id: number; name: string };
type AuditableEntity = Entity & Timestamps & SoftDelete;

let product: AuditableEntity = {
	id: 1,
	name: "Laptop",
	createdAt: new Date(),
	updatedAt: new Date(),
	deletedAt: null,
	isDeleted: false,
};

console.log("Auditable Product:", product);

export {};
