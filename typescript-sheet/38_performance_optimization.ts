// ═══════════════════════════════════════════════════════════════
// 38_performance_optimization.ts — TypeScript Performance Tips
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// 1. Avoid Deeply Nested Types
// ═══════════════════════════════════════

// ❌ Bad: Deep nesting causes slow compilation
type DeepNested<T> = {
	a: {
		b: {
			c: {
				d: {
					e: T;
				};
			};
		};
	};
};

// ✅ Good: Flatten the structure
interface FlatStructure<T> {
	a_b_c_d_e: T;
}

// ═══════════════════════════════════════
// 2. Use Interfaces Over Type Aliases for Objects
// ═══════════════════════════════════════

// ✅ Interfaces are faster for object types
interface FastUser {
	id: number;
	name: string;
}

// Type aliases create new type objects
// Interfaces use declaration merging (faster)

// ═══════════════════════════════════════
// 3. Avoid Excessive Generics
// ═══════════════════════════════════════

// ❌ Bad: Too many generic parameters
type OverGeneric<T, U, V, W, X, Y, Z> = {
	a: T;
	b: U;
	c: V;
	d: W;
	e: X;
	f: Y;
	g: Z;
};

// ✅ Good: Use concrete types where possible
interface ConcreteTypes {
	a: string;
	b: number;
	c: boolean;
}

// ═══════════════════════════════════════
// 4. Use const assertions for Literal Types
// ═══════════════════════════════════════

// ✅ const assertion — no widening
const config = {
	apiUrl: "https://api.example.com",
	timeout: 5000,
	retries: 3,
} as const;

// Type is readonly and literal
// config.apiUrl = "..."; // ❌ Error

// ═══════════════════════════════════════
// 5. Lazy Type Evaluation with ReturnType
// ═══════════════════════════════════════

// ✅ Defer type computation
function createUserService() {
	return {
		getUser: (id: number) => ({ id, name: "User" }),
		saveUser: (user: { name: string }) => user,
	};
}

type UserService = ReturnType<typeof createUserService>;

// ═══════════════════════════════════════
// 6. Avoid Circular Dependencies in Types
// ═══════════════════════════════════════

// ❌ Bad: Circular type references
// type A = B;
// type B = A;

// ✅ Good: Use interfaces with optional properties
interface Node {
	value: string;
	children?: Node[];
}

// ═══════════════════════════════════════
// 7. Use satisfies Operator (TS 4.9+)
// ═══════════════════════════════════════

// ✅ satisfies — type check without widening
type RGB = [number, number, number];

const color = [255, 0, 0] satisfies RGB;
// color is still [number, number, number], not readonly

const theme = {
	primary: "#007bff",
	secondary: "#6c757d",
	success: "#28a745",
} satisfies Record<string, string>;

// theme.primary is still literal "#007bff"

// ═══════════════════════════════════════
// 8. Prefer Lookup Types Over Conditional
// ═══════════════════════════════════════

interface User {
	id: number;
	name: string;
	email: string;
	profile: {
		age: number;
		avatar: string;
	};
}

// ✅ Fast: Lookup type
type UserProfile = User["profile"];

// ❌ Slower: Conditional type
type UserProfileSlow = User extends { profile: infer P } ? P : never;

// ═══════════════════════════════════════
// 9. Use Type Predicates for Narrowing
// ═══════════════════════════════════════

// ✅ Type predicate — compiler can optimize
function isString(value: unknown): value is string {
	return typeof value === "string";
}

function process(value: unknown): void {
	if (isString(value)) {
		// value is narrowed to string
		console.log(value.toUpperCase());
	}
}

// ═══════════════════════════════════════
// 10. Bundle Size Optimization
// ═══════════════════════════════════════

// ✅ Use import type for type-only imports
// import type { User } from "./types";
// The import is erased at compile time

// ✅ Use enums carefully — they generate code
// Prefer const enums or union types
const enum Status {
	Active = 1,
	Inactive = 0,
}
// const enum is inlined at compile time

// ✅ Prefer union types over enums for smaller bundles
type StatusUnion = "active" | "inactive";

// ═══════════════════════════════════════
// 11. tsconfig.json Performance Flags
// ═══════════════════════════════════════

/*
{
  "compilerOptions": {
    // Faster compilation
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo",

    // Skip type checking node_modules
    "skipLibCheck": true,

    // Faster module resolution
    "moduleResolution": "bundler",

    // Don't emit if only type checking
    "noEmit": true,

    // Use project references for monorepos
    "composite": true,
    "declarationMap": true
  }
}
*/

// ═══════════════════════════════════════
// 12. Memory-Efficient Data Structures
// ═══════════════════════════════════════

// ✅ Use Maps for frequent lookups
class FastLookup<T> {
	private map = new Map<string, T>();

	set(key: string, value: T): void {
		this.map.set(key, value);
	}

	get(key: string): T | undefined {
		return this.map.get(key);
	}

	has(key: string): boolean {
		return this.map.has(key);
	}
}

// ✅ Use Sets for unique collections
class UniqueCollection<T> {
	private set = new Set<T>();

	add(value: T): void {
		this.set.add(value);
	}

	has(value: T): boolean {
		return this.set.has(value);
	}

	toArray(): T[] {
		return Array.from(this.set);
	}
}

// ═══════════════════════════════════════
// 13. Lazy Initialization Pattern
// ═══════════════════════════════════════

class Lazy<T> {
	private value: T | undefined;
	private initialized = false;

	constructor(private factory: () => T) {}

	get(): T {
		if (!this.initialized) {
			this.value = this.factory();
			this.initialized = true;
		}
		return this.value!;
	}

	reset(): void {
		this.initialized = false;
		this.value = undefined;
	}
}

// Usage
const expensiveResource = new Lazy(() => {
	console.log("Initializing...");
	return { data: "expensive" };
});

// Not initialized yet
console.log("Before get");

// Initialized on first access
const resource = expensiveResource.get();
console.log(resource);

// ═══════════════════════════════════════
// 14. Object Pool Pattern
// ═══════════════════════════════════════

class ObjectPool<T> {
	private pool: T[] = [];
	private createFn: () => T;
	private resetFn: (item: T) => void;

	constructor(createFn: () => T, resetFn: (item: T) => void, initialSize = 0) {
		this.createFn = createFn;
		this.resetFn = resetFn;

		for (let i = 0; i < initialSize; i++) {
			this.pool.push(createFn());
		}
	}

	acquire(): T {
		if (this.pool.length > 0) {
			return this.pool.pop()!;
		}
		return this.createFn();
	}

	release(item: T): void {
		this.resetFn(item);
		this.pool.push(item);
	}

	get size(): number {
		return this.pool.length;
	}
}

// Usage
interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	active: boolean;
}

const particlePool = new ObjectPool<Particle>(
	() => ({ x: 0, y: 0, vx: 0, vy: 0, active: false }),
	(p) => {
		p.x = 0;
		p.y = 0;
		p.vx = 0;
		p.vy = 0;
		p.active = false;
	},
	100
);

const particle = particlePool.acquire();
particle.x = 100;
particle.y = 200;
particle.active = true;

// Use particle...

particlePool.release(particle);
console.log("Pool size:", particlePool.size);

// ═══════════════════════════════════════
// 15. Debounce & Throttle (Performance)
// ═══════════════════════════════════════

function debounce<T extends (...args: any[]) => void>(
	fn: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), wait);
	};
}

function throttle<T extends (...args: any[]) => void>(
	fn: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle = false;

	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			fn(...args);
			inThrottle = true;
			setTimeout(() => {
				inThrottle = false;
			}, limit);
		}
	};
}

// Usage
const search = debounce((query: string) => {
	console.log("Searching:", query);
}, 300);

const scrollHandler = throttle(() => {
	console.log("Scroll position:", window.scrollY);
}, 100);

export { FastLookup, Lazy, ObjectPool, debounce, throttle };
