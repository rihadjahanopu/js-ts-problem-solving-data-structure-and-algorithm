// ═══════════════════════════════════════════════════════════════
// 12_functions.ts — Functions in TypeScript
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Basic Function Types
// ═══════════════════════════════════════

// Named function with types
function add(a: number, b: number): number {
	return a + b;
}

// Arrow function with types
const multiply = (a: number, b: number): number => a * b;

// Function expression
const subtract: (a: number, b: number) => number = function (a, b) {
	return a - b;
};

console.log("Add:", add(5, 3));
console.log("Multiply:", multiply(4, 7));
console.log("Subtract:", subtract(10, 4));

// ═══════════════════════════════════════
// Optional Parameters
// ═══════════════════════════════════════

function greet(name: string, greeting?: string): string {
	if (greeting) {
		return `${greeting}, ${name}!`;
	}
	return `Hello, ${name}!`;
}

console.log(greet("Rahim"));
console.log(greet("Karim", "Good morning"));

// ═══════════════════════════════════════
// Default Parameters
// ═══════════════════════════════════════

function createUser(
	name: string,
	age: number = 18,
	isActive: boolean = true
): { name: string; age: number; isActive: boolean } {
	return { name, age, isActive };
}

console.log(createUser("Rahim"));
console.log(createUser("Karim", 25));
console.log(createUser("Jamal", 30, false));

// ═══════════════════════════════════════
// Rest Parameters
// ═══════════════════════════════════════

function sum(...numbers: number[]): number {
	return numbers.reduce((total, num) => total + num, 0);
}

console.log("Sum:", sum(1, 2, 3, 4, 5));
console.log("Sum:", sum(10, 20));

function logMessages(prefix: string, ...messages: string[]): void {
	messages.forEach((msg) => console.log(`[${prefix}] ${msg}`));
}

logMessages("INFO", "Server started", "Connected to DB", "Ready");

// ═══════════════════════════════════════
// Function Overloading
// ═══════════════════════════════════════

// Overload signatures
function processInput(input: string): string;
function processInput(input: number): number;
function processInput(input: boolean): boolean;

// Implementation
function processInput(
	input: string | number | boolean
): string | number | boolean {
	if (typeof input === "string") {
		return input.toUpperCase();
	} else if (typeof input === "number") {
		return input * 2;
	} else {
		return !input;
	}
}

console.log(processInput("hello")); // "HELLO"
console.log(processInput(5)); // 10
console.log(processInput(true)); // false

// ═══════════════════════════════════════
// Callback Functions
// ═══════════════════════════════════════

type FilterCallback<T> = (item: T, index: number) => boolean;

function filterArray<T>(arr: T[], callback: FilterCallback<T>): T[] {
	const result: T[] = [];
	for (let i = 0; i < arr.length; i++) {
		if (callback(arr[i], i)) {
			result.push(arr[i]);
		}
	}
	return result;
}

let numbers = [1, 2, 3, 4, 5, 6];
let evens = filterArray(numbers, (n) => n % 2 === 0);
console.log("Evens:", evens);

// ═══════════════════════════════════════
// this Parameter
// ═══════════════════════════════════════

interface Counter {
	count: number;
	increment(): void;
	decrement(): void;
	getCount(): number;
}

const counter: Counter = {
	count: 0,
	increment(this: Counter) {
		this.count++;
	},
	decrement(this: Counter) {
		this.count--;
	},
	getCount(this: Counter) {
		return this.count;
	},
};

counter.increment();
counter.increment();
counter.increment();
console.log("Count:", counter.getCount()); // 3

// ═══════════════════════════════════════
// Void vs Undefined Return
// ═══════════════════════════════════════

function logMessage(msg: string): void {
	console.log(msg);
	// return undefined; // OK but unnecessary
}

function returnUndefined(): undefined {
	console.log("Returning undefined");
	return undefined;
}

logMessage("Hello");
returnUndefined();

export {};
