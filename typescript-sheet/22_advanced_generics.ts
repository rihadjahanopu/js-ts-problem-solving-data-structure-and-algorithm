// ═══════════════════════════════════════════════════════════════
// 22_advanced_generics.ts — Advanced Generics & Constraints
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Generic with Multiple Constraints
// ═══════════════════════════════════════

interface HasId {
	id: number;
}

interface HasName {
	name: string;
}

interface HasTimestamp {
	createdAt: Date;
}

// T must satisfy all three constraints
type Entity = HasId & HasName & HasTimestamp;

function processEntity<T extends Entity>(entity: T): void {
	console.log(`ID: ${entity.id}`);
	console.log(`Name: ${entity.name}`);
	console.log(`Created: ${entity.createdAt}`);
}

let user: Entity = {
	id: 1,
	name: "Rahim",
	createdAt: new Date(),
};

processEntity(user);

// ═══════════════════════════════════════
// Generic with Class Constraints
// ═══════════════════════════════════════

abstract class Component {
	abstract render(): string;
}

function mount<T extends Component>(component: T, selector: string): void {
	const element = document.querySelector(selector);
	if (element) {
		element.innerHTML = component.render();
	}
}

class Button extends Component {
	constructor(private label: string) {
		super();
	}
	render(): string {
		return `<button>${this.label}</button>`;
	}
}

// mount(new Button("Click"), "#app");

// ═══════════════════════════════════════
// Generic with Default Type
// ═══════════════════════════════════════

interface ApiResponse<T = unknown> {
	data: T;
	status: number;
	message: string;
}

// Default type is unknown
let genericResponse: ApiResponse = {
	data: "anything",
	status: 200,
	message: "OK",
};

// Explicit type
let userResponse: ApiResponse<{ name: string }> = {
	data: { name: "Rahim" },
	status: 200,
	message: "Success",
};

// ═══════════════════════════════════════
// Generic with Conditional Types
// ═══════════════════════════════════════

type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<number[]>; // true
type B = IsArray<string>; // false

// Extract array element type
type ArrayElement<T> = T extends (infer E)[] ? E : T;

type NumArr = ArrayElement<number[]>; // number
type Str = ArrayElement<string>; // string

// ═══════════════════════════════════════
// Generic with Mapped Types
// ═══════════════════════════════════════

type Nullable<T> = {
	[K in keyof T]: T[K] | null;
};

interface User {
	name: string;
	age: number;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null }

// Generic mapped type with modifier
type Mutable<T> = {
	-readonly [K in keyof T]: T[K];
};

interface ReadonlyUser {
	readonly name: string;
	readonly age: number;
}

type MutableUser = Mutable<ReadonlyUser>;
// { name: string; age: number }

// ═══════════════════════════════════════
// Higher-Order Function with Generics
// ═══════════════════════════════════════

function memoize<T extends (...args: any[]) => any>(fn: T): T {
	const cache = new Map<string, ReturnType<T>>();

	return function (...args: Parameters<T>): ReturnType<T> {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key)!;
		}
		const result = fn(...args);
		cache.set(key, result);
		return result;
	} as T;
}

function fibonacci(n: number): number {
	if (n <= 1) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);
console.log("Fib(10):", memoizedFib(10));

// ═══════════════════════════════════════
// Generic Repository Pattern
// ═══════════════════════════════════════

interface Identifiable {
	id: number | string;
}

class Repository<T extends Identifiable> {
	private items: T[] = [];

	create(item: T): T {
		this.items.push(item);
		return item;
	}

	findById(id: number | string): T | undefined {
		return this.items.find((item) => item.id === id);
	}

	findAll(): T[] {
		return [...this.items];
	}

	update(id: number | string, updates: Partial<T>): T | undefined {
		const index = this.items.findIndex((item) => item.id === id);
		if (index === -1) return undefined;
		this.items[index] = { ...this.items[index], ...updates };
		return this.items[index];
	}

	delete(id: number | string): boolean {
		const index = this.items.findIndex((item) => item.id === id);
		if (index === -1) return false;
		this.items.splice(index, 1);
		return true;
	}
}

interface Product extends Identifiable {
	name: string;
	price: number;
}

const productRepo = new Repository<Product>();
productRepo.create({ id: 1, name: "Laptop", price: 999 });
productRepo.create({ id: 2, name: "Phone", price: 699 });

console.log("All products:", productRepo.findAll());
console.log("Find by ID:", productRepo.findById(1));

// ═══════════════════════════════════════
// Generic Event Emitter
// ═══════════════════════════════════════

type EventMap = {
	[event: string]: any;
};

class EventEmitter<Events extends EventMap> {
	private listeners: {
		[K in keyof Events]?: Array<(payload: Events[K]) => void>;
	} = {};

	on<K extends keyof Events>(
		event: K,
		listener: (payload: Events[K]) => void
	): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event]!.push(listener);
	}

	emit<K extends keyof Events>(event: K, payload: Events[K]): void {
		const eventListeners = this.listeners[event];
		if (eventListeners) {
			eventListeners.forEach((listener) => listener(payload));
		}
	}

	off<K extends keyof Events>(
		event: K,
		listener: (payload: Events[K]) => void
	): void {
		const eventListeners = this.listeners[event];
		if (eventListeners) {
			this.listeners[event] = eventListeners.filter((l) => l !== listener);
		}
	}
}

interface AppEvents {
	userLogin: { userId: string; timestamp: Date };
	userLogout: { userId: string };
	error: { message: string; code: number };
}

const emitter = new EventEmitter<AppEvents>();

emitter.on("userLogin", (data) => {
	console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

emitter.on("error", (data) => {
	console.log(`Error ${data.code}: ${data.message}`);
});

emitter.emit("userLogin", { userId: "123", timestamp: new Date() });
emitter.emit("error", { message: "Connection failed", code: 500 });

// ═══════════════════════════════════════
// Generic Builder Pattern
// ═══════════════════════════════════════

class QueryBuilder<T> {
	private conditions: string[] = [];
	private orderByField: keyof T | null = null;
	private limitValue: number | null = null;

	where<K extends keyof T>(field: K, value: T[K]): this {
		this.conditions.push(`${String(field)} = ${JSON.stringify(value)}`);
		return this;
	}

	orderBy(field: keyof T): this {
		this.orderByField = field;
		return this;
	}

	limit(count: number): this {
		this.limitValue = count;
		return this;
	}

	build(): string {
		let query = "SELECT * FROM table";
		if (this.conditions.length > 0) {
			query += ` WHERE ${this.conditions.join(" AND ")}`;
		}
		if (this.orderByField) {
			query += ` ORDER BY ${String(this.orderByField)}`;
		}
		if (this.limitValue) {
			query += ` LIMIT ${this.limitValue}`;
		}
		return query;
	}
}

interface UserRecord {
	id: number;
	name: string;
	age: number;
	email: string;
}

const query = new QueryBuilder<UserRecord>()
	.where("age", 25)
	.where("name", "Rahim")
	.orderBy("id")
	.limit(10)
	.build();

console.log("Query:", query);

export {};
