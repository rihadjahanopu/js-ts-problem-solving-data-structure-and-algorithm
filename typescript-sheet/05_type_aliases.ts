// ═══════════════════════════════════════════════════════════════
// 05_type_aliases.ts — টাইপ অ্যালিয়াস (Type Aliases)
// ═══════════════════════════════════════════════════════════════

// Basic Type Alias
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42;
// value = true; // ❌ Error

// Object Type Alias
type User = {
	id: number;
	name: string;
	email: string;
	isActive?: boolean; // Optional property
};

let user1: User = {
	id: 1,
	name: "Rahim",
	email: "rahim@example.com",
	isActive: true,
};

let user2: User = {
	id: 2,
	name: "Karim",
	email: "karim@example.com",
	// isActive optional
};

console.log("User1:", user1);
console.log("User2:", user2);

// Readonly property
type Point = {
	readonly x: number;
	readonly y: number;
};

let point: Point = { x: 10, y: 20 };
// point.x = 15; // ❌ Error: read-only

// Function Type Alias
type MathOperation = (a: number, b: number) => number;

let add: MathOperation = (x, y) => x + y;
let subtract: MathOperation = (x, y) => x - y;

console.log("Add:", add(5, 3)); // 8
console.log("Subtract:", subtract(10, 4)); // 6

// Union Type Alias
type Status = "pending" | "success" | "error";
let currentStatus: Status = "success";
// currentStatus = "loading"; // ❌ Error

// Tuple Type Alias
type NameAgeTuple = [string, number];
let personTuple: NameAgeTuple = ["Rahim", 25];
console.log("Tuple:", personTuple);

// Nested Type Alias
type Address = {
	city: string;
	country: string;
	zipCode?: string;
};

type Employee = {
	id: number;
	name: string;
	address: Address;
};

let employee: Employee = {
	id: 101,
	name: "Rahim",
	address: {
		city: "Dhaka",
		country: "Bangladesh",
		zipCode: "1200",
	},
};

console.log("Employee:", employee);

export {};
