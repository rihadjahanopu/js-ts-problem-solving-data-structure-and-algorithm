// ═══════════════════════════════════════════════════════════════
// 31_type_narrowing.ts — Advanced Type Narrowing
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// 1. typeof Narrowing
// ═══════════════════════════════════════

function processInput(input: string | number | boolean): string {
	if (typeof input === "string") {
		// input is string here
		return input.toUpperCase();
	}
	if (typeof input === "number") {
		// input is number here
		return input.toFixed(2);
	}
	// input is boolean here
	return input ? "YES" : "NO";
}

// ═══════════════════════════════════════
// 2. instanceof Narrowing
// ═══════════════════════════════════════

class Cat {
	meow() {
		return "Meow";
	}
}

class Dog {
	bark() {
		return "Woof";
	}
}

function makeSound(animal: Cat | Dog): string {
	if (animal instanceof Cat) {
		return animal.meow();
	}
	return animal.bark();
}

// ═══════════════════════════════════════
// 3. in Operator Narrowing
// ═══════════════════════════════════════

type Fish = { swim: () => void };
type Bird = { fly: () => void };

type Animal = Fish | Bird;

function move(animal: Animal): void {
	if ("swim" in animal) {
		animal.swim();
	} else {
		animal.fly();
	}
}

// ═══════════════════════════════════════
// 4. Literal Type Narrowing
// ═══════════════════════════════════════

type Shape =
	| { kind: "circle"; radius: number }
	| { kind: "square"; side: number }
	| { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
	switch (shape.kind) {
		case "circle":
			return Math.PI * shape.radius ** 2;
		case "square":
			return shape.side ** 2;
		case "rectangle":
			return shape.width * shape.height;
		default:
			// Exhaustive check
			const _exhaustive: never = shape;
			return _exhaustive;
	}
}

// ═══════════════════════════════════════
// 5. Custom Type Guard (is)
// ═══════════════════════════════════════

interface User {
	type: "user";
	name: string;
	email: string;
}

interface Admin {
	type: "admin";
	name: string;
	permissions: string[];
}

function isAdmin(person: User | Admin): person is Admin {
	return person.type === "admin";
}

function isUser(person: User | Admin): person is User {
	return person.type === "user";
}

function greetPerson(person: User | Admin): string {
	if (isAdmin(person)) {
		return `Admin ${person.name} with ${person.permissions.length} permissions`;
	}
	return `User ${person.name} (${person.email})`;
}

// ═══════════════════════════════════════
// 6. Array Type Guard
// ═══════════════════════════════════════

function isStringArray(value: unknown): value is string[] {
	return (
		Array.isArray(value) && value.every((item) => typeof item === "string")
	);
}

function isNumberArray(value: unknown): value is number[] {
	return (
		Array.isArray(value) && value.every((item) => typeof item === "number")
	);
}

function processArray(value: unknown): string {
	if (isStringArray(value)) {
		return value.join(", ");
	}
	if (isNumberArray(value)) {
		return value.reduce((a, b) => a + b, 0).toString();
	}
	return "Unknown array type";
}

// ═══════════════════════════════════════
// 7. Object Type Guard
// ═══════════════════════════════════════

interface ApiError {
	error: true;
	message: string;
	code: number;
}

interface ApiSuccess<T> {
	error: false;
	data: T;
}

type ApiResponse<T> = ApiError | ApiSuccess<T>;

function isApiError<T>(response: ApiResponse<T>): response is ApiError {
	return response.error === true;
}

function handleResponse<T>(response: ApiResponse<T>): T | null {
	if (isApiError(response)) {
		console.error("Error:", response.message);
		return null;
	}
	return response.data;
}

// ═══════════════════════════════════════
// 8. Null/Undefined Narrowing
// ═══════════════════════════════════════

function processMaybeString(value: string | null | undefined): string {
	// Truthiness check
	if (value) {
		return value.toUpperCase();
	}

	// Equality check
	if (value === null) {
		return "NULL_VALUE";
	}

	// Remaining is undefined
	return "UNDEFINED_VALUE";
}

// Optional chaining with narrowing
interface Config {
	database?: {
		host?: string;
		port?: number;
	};
}

function getDbHost(config: Config): string {
	// Narrowing with optional chaining
	if (config.database?.host) {
		return config.database.host;
	}
	return "localhost";
}

// ═══════════════════════════════════════
// 9. Branded Types (Nominal Typing)
// ═══════════════════════════════════════

type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;
type ProductId = Brand<string, "ProductId">;

function createUserId(id: string): UserId {
	return id as UserId;
}

function createOrderId(id: string): OrderId {
	return id as OrderId;
}

function processUser(id: UserId): void {
	console.log("Processing user:", id);
}

const userId = createUserId("user-123");
const orderId = createOrderId("order-456");

processUser(userId);
// processUser(orderId); // ❌ Error: Type 'OrderId' is not assignable to type 'UserId'

// ═══════════════════════════════════════
// 10. Assertion Functions
// ═══════════════════════════════════════

function assertIsString(value: unknown): asserts value is string {
	if (typeof value !== "string") {
		throw new TypeError(`Expected string, got ${typeof value}`);
	}
}

function assertIsNumber(value: unknown): asserts value is number {
	if (typeof value !== "number" || isNaN(value)) {
		throw new TypeError(`Expected number, got ${typeof value}`);
	}
}

function assertIsDefined<T>(value: T | undefined | null): asserts value is T {
	if (value === undefined || value === null) {
		throw new TypeError("Expected defined value, got null/undefined");
	}
}

function processValues(a: unknown, b: unknown): string {
	assertIsString(a);
	assertIsNumber(b);
	// Now a is string and b is number
	return `${a}: ${b}`;
}

// ═══════════════════════════════════════
// 11. Discriminated Union with Exhaustive Check
// ═══════════════════════════════════════

type Event =
	| { type: "USER_LOGIN"; userId: string; timestamp: Date }
	| { type: "USER_LOGOUT"; userId: string; timestamp: Date }
	| { type: "PAGE_VIEW"; url: string; referrer?: string }
	| { type: "CLICK"; element: string; x: number; y: number };

function handleEvent(event: Event): void {
	switch (event.type) {
		case "USER_LOGIN":
			console.log(`User ${event.userId} logged in at ${event.timestamp}`);
			break;
		case "USER_LOGOUT":
			console.log(`User ${event.userId} logged out at ${event.timestamp}`);
			break;
		case "PAGE_VIEW":
			console.log(`Page viewed: ${event.url}`);
			break;
		case "CLICK":
			console.log(`Clicked at ${event.x}, ${event.y}`);
			break;
		default:
			// Compile-time exhaustive check
			const _exhaustiveCheck: never = event;
			console.error("Unhandled event:", _exhaustiveCheck);
	}
}

// ═══════════════════════════════════════
// 12. Type Predicate with Generics
// ═══════════════════════════════════════

function hasProperty<T extends object, K extends PropertyKey>(
	obj: T,
	key: K
): obj is T & Record<K, unknown> {
	return key in obj;
}

interface Person {
	name: string;
}

function processPerson(obj: object): string {
	if (hasProperty(obj, "name") && typeof obj.name === "string") {
		return obj.name.toUpperCase();
	}
	return "UNKNOWN";
}

// ═══════════════════════════════════════
// 13. Filter with Type Guards
// ═══════════════════════════════════════

function filterDefined<T>(arr: (T | undefined | null)[]): T[] {
	return arr.filter((item): item is T => item !== undefined && item !== null);
}

const mixed = [1, null, 2, undefined, 3, null];
const defined = filterDefined(mixed);
// defined: number[]

// ═══════════════════════════════════════
// 14. Promise Type Narrowing
// ═══════════════════════════════════════

async function fetchData(): Promise<{ data: string } | { error: string }> {
	// Simulated fetch
	return { data: "success" };
}

async function processFetch(): Promise<void> {
	const result = await fetchData();

	if ("error" in result) {
		console.error("Error:", result.error);
		return;
	}

	// result is narrowed to { data: string }
	console.log("Data:", result.data);
}

export {};
