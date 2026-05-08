// ═══════════════════════════════════════════════════════════════
// 13_generics.ts — Generics (জেনেরিকস)
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Basic Generic Function
// ═══════════════════════════════════════

// Without Generic — any ব্যবহার করতে হয়
function identityAny(value: any): any {
	return value;
}

// With Generic — type preserve হয়
function identity<T>(value: T): T {
	return value;
}

let num = identity<number>(42);
let str = identity<string>("hello");
let bool = identity(true); // Type inference — T = boolean

console.log(num, str, bool);

// ═══════════════════════════════════════
// Generic with Multiple Type Parameters
// ═══════════════════════════════════════

function pair<T, U>(first: T, second: U): [T, U] {
	return [first, second];
}

let p1 = pair<string, number>("age", 25);
let p2 = pair(100, true); // Inference: [number, boolean]
console.log(p1, p2);

// ═══════════════════════════════════════
// Generic Constraints
// ═══════════════════════════════════════

interface HasLength {
	length: number;
}

// T must have length property
function logLength<T extends HasLength>(arg: T): T {
	console.log(`Length: ${arg.length}`);
	return arg;
}

logLength("hello"); // string has length
logLength([1, 2, 3]); // array has length
logLength({ length: 10 }); // object with length
// logLength(42);          // ❌ Error: number has no length

// Keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}

let user = {
	name: "Rahim",
	age: 25,
	email: "rahim@test.com",
};

console.log(getProperty(user, "name")); // "Rahim"
console.log(getProperty(user, "age")); // 25
// getProperty(user, "phone");           // ❌ Error: "phone" not in user

// ═══════════════════════════════════════
// Generic with Default Type
// ═══════════════════════════════════════

function createArray<T = string>(length: number, value: T): T[] {
	return Array(length).fill(value);
}

let stringArray = createArray(3, "hello"); // T = string (default)
let numberArray = createArray<number>(3, 42); // T = number
console.log(stringArray);
console.log(numberArray);

// ═══════════════════════════════════════
// Generic Interface
// ═══════════════════════════════════════

interface Container<T> {
	value: T;
	getValue(): T;
	setValue(newValue: T): void;
}

let numberContainer: Container<number> = {
	value: 10,
	getValue() {
		return this.value;
	},
	setValue(newValue) {
		this.value = newValue;
	},
};

console.log(numberContainer.getValue()); // 10
numberContainer.setValue(20);
console.log(numberContainer.getValue()); // 20

// Generic with multiple constraints
interface Printable {
	print(): void;
}

interface Serializable {
	serialize(): string;
}

function processItem<T extends Printable & Serializable>(item: T): void {
	item.print();
	console.log(item.serialize());
}

let doc = {
	content: "Hello",
	print() {
		console.log(this.content);
	},
	serialize() {
		return JSON.stringify(this);
	},
};

processItem(doc);

// ═══════════════════════════════════════
// Generic Class
// ═══════════════════════════════════════

class Stack<T> {
	private items: T[] = [];

	push(item: T): void {
		this.items.push(item);
	}

	pop(): T | undefined {
		return this.items.pop();
	}

	peek(): T | undefined {
		return this.items[this.items.length - 1];
	}

	isEmpty(): boolean {
		return this.items.length === 0;
	}

	size(): number {
		return this.items.length;
	}
}

let numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);
console.log("Stack peek:", numberStack.peek()); // 30
console.log("Stack pop:", numberStack.pop()); // 30
console.log("Stack size:", numberStack.size()); // 2

let stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log("String stack:", stringStack.pop()); // "world"

// Generic with extends for classes
class GenericNumber<T extends number | bigint> {
	zeroValue: T;
	add: (x: T, y: T) => T;

	constructor(zeroValue: T, addFn: (x: T, y: T) => T) {
		this.zeroValue = zeroValue;
		this.add = addFn;
	}
}

let myNum = new GenericNumber<number>(0, (x, y) => x + y);
console.log(myNum.add(5, 3)); // 8

export {};
