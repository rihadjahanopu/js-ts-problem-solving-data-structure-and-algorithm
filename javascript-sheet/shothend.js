// ============================================
// 11. NULLISH COALESCING (??) vs OR (||)
// ============================================
// ?? শুধু null/undefined এর জন্য, || সব falsy value এর জন্য

const value1 = 0 || "default"; // "default" (0 falsy)
const value2 = 0 ?? "default"; // 0 (0 not null/undefined)

const value3 = "" || "default"; // "default"
const value4 = "" ?? "default"; // "" (empty string)

const value5 = null ?? undefined ?? "final"; // "final"

// ============================================
// 12. OPTIONAL CHAINING (?.)
// ============================================
const user = { profile: { address: { city: "Dhaka" } } };

// পুরনো পদ্ধতি (verbose)
const oldCity =
	user && user.profile && user.profile.address && user.profile.address.city;

// নতুন পদ্ধতি
const newCity = user?.profile?.address?.city; // "Dhaka"
const noCity = user?.profile?.settings?.theme; // undefined (error নয়)

// Optional chaining with bracket notation
const key = "name";
const dynamic = user?.[key]; // undefined

// Optional chaining with function calls
const result = someObject?.method?.(); // undefined if method missing

// ============================================
// 13. LOGICAL ASSIGNMENT OPERATORS
// ============================================
let a = null;
let b = 0;
let c = "";

// ||= (OR assignment) - assign if current is falsy
a ||= "default"; // a = "default"
b ||= 42; // b = 42 (0 is falsy)
c ||= "fallback"; // c = "fallback"

// &&= (AND assignment) - assign if current is truthy
let d = "hello";
d &&= "updated"; // d = "updated" (hello was truthy)

let e = "";
e &&= "never"; // e = "" (empty is falsy)

// ??= (Nullish assignment) - assign only if null/undefined
let f = null;
f ??= "value"; // f = "value"

let g = 0;
g ??= 42; // g = 0 (0 is not null/undefined!)

// ============================================
// 14. ARRAY METHODS SHORTHAND
// ============================================
const arr = [1, 2, 3, 4, 5, 6];

// Filter + Map একসাথে (flatMap বা chaining)
const doubledEvens = arr.filter((n) => n % 2 === 0).map((n) => n * 2); // [4, 8, 12]

// find (first match)
const firstEven = arr.find((n) => n % 2 === 0); // 2

// findIndex
const firstEvenIndex = arr.findIndex((n) => n % 2 === 0); // 1

// some (any match?)
const hasEven = arr.some((n) => n % 2 === 0); // true

// every (all match?)
const allPositive = arr.every((n) => n > 0); // true

// includes
const hasThree = arr.includes(3); // true

// indexOf shorthand
const idx = ~arr.indexOf(3); // truthy if found (bitwise NOT trick)

// at() - negative indexing (ES2022)
const last = arr.at(-1); // 6 (last element)
const secondLast = arr.at(-2); // 5

// ============================================
// 15. OBJECT MANIPULATION SHORTHAND
// ============================================

// Object.fromEntries (array to object)
const entries = [
	["a", 1],
	["b", 2],
];
const obj1 = Object.fromEntries(entries); // { a: 1, b: 2 }

// Object.entries shorthand loop
Object.entries(obj1).forEach(([key, value]) => {
	console.log(`${key}: ${value}`);
});

// Object.keys/values shorthand
const keys = Object.keys(obj1); // ['a', 'b']
const values = Object.values(obj1); // [1, 2]

// Merge objects (spread)
const merged = { ...obj1, c: 3, ...{ d: 4 } };

// Delete property shorthand (destructuring)
const { removeThis, ...keepRest } = { removeThis: 1, keep: 2, this: 3 };
// keepRest = { keep: 2, this: 3 }

// Rename while destructuring
const { a: alpha, b: beta } = { a: 1, b: 2 };

// Nested destructuring
const {
	profile: { name: userName },
} = { profile: { name: "John" } };

// Default + rename together
const { x: renamedX = 10 } = {}; // renamedX = 10

// ============================================
// 16. FUNCTION SHORTHAND
// ============================================

// Implicit return with object (parentheses দরকার!)
const makeUser = (name, age) => ({ name, age }); // Returns object!

// IIFE (Immediately Invoked Function Expression)
const config = (() => {
	const privateVar = "secret";
	return { public: "data" };
})();

// Default params with destructuring
function draw({ size = "big", coords = { x: 0, y: 0 } } = {}) {
	console.log(size, coords);
}
draw(); // Works with no args!

// Rest parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);

// Partial application / Currying
const multiply = (a) => (b) => a * b;
const triple = multiply(3);
triple(5); // 15

// Function composition
const compose =
	(...fns) =>
	(x) =>
		fns.reduceRight((v, f) => f(v), x);
const pipe =
	(...fns) =>
	(x) =>
		fns.reduce((v, f) => f(v), x);

// ============================================
// 17. PROMISE & ASYNC SHORTHAND
// ============================================

// Promise.resolve/reject shorthand
const resolved = Promise.resolve(42);
const rejected = Promise.reject(new Error("Oops"));

// Async IIFE
(async () => {
	const data = await fetchData();
})();

// Sequential vs Parallel
// Sequential (slow)
for (const url of urls) {
	await fetch(url); // একটা করে হচ্ছে
}

// Parallel (fast)
await Promise.all(urls.map((url) => fetch(url))); // সব একসাথে

// Promise.allSettled (never fails)
const results = await Promise.allSettled([
	Promise.resolve("success"),
	Promise.reject("error"),
]);
// [{status: "fulfilled", value: "success"}, {status: "rejected", reason: "error"}]

// Promise.race (first to settle)
const winner = await Promise.race([fetch("/fast"), fetch("/slow")]);

// ============================================
// 18. GENERATOR & ITERATOR SHORTHAND
// ============================================
function* idGenerator() {
	let id = 1;
	while (true) yield id++;
}
const gen = idGenerator();
gen.next().value; // 1
gen.next().value; // 2

// Generator for infinite sequence
function* range(start, end) {
	for (let i = start; i <= end; i++) yield i;
}
const nums = [...range(1, 5)]; // [1, 2, 3, 4, 5]

// ============================================
// 19. CLASS SHORTHAND
// ============================================

// Public class fields (no constructor needed)
class User {
	name = "Anonymous"; // Public field
	#privateField = "secret"; // Private field

	static count = 0; // Static field

	constructor(name) {
		this.name = name;
		User.count++;
	}

	// Getter/Setter shorthand
	get upperName() {
		return this.name.toUpperCase();
	}

	set upperName(value) {
		this.name = value.toLowerCase();
	}

	// Static block (ES2022)
	static {
		console.log("Class initialized");
	}
}

// ============================================
// 20. MODULE SHORTHAND
// ============================================

// Re-export
export { bar, foo } from "./module.js";
export * as utils from "./utils.js";

// Dynamic import with destructuring
const { default: myDefault, namedExport } = await import("./module.js");

// Import meta
console.log(import.meta.url); // Current module URL

// ============================================
// 21. BIG INT & NUMBER SHORTHAND
// ============================================

// BigInt operations
const huge = 123456789012345678901n;
const sumBig = huge + 1n;

// Number separators (readable)
const million = 1_000_000;
const binary = 0b1010_1010;
const hex = 0xff_ff;

// Numeric checks
const isFiniteNum = Number.isFinite(42); // true (strict, not global isFinite)
const isInt = Number.isInteger(42.0); // true
const isSafeInt = Number.isSafeInteger(2 ** 53);

// ============================================
// 22. REGEX SHORTHAND
// ============================================

// Named capture groups
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const {
	groups: { year, month, day },
} = dateRegex.exec("2024-03-15");

// Match all (global + iterate)
const matches = "abc123def456".matchAll(/\d+/g);
[...matches].forEach((m) => console.log(m[0])); // "123", "456"

// Replace with function
const camelCase = "hello-world".replace(/-(\w)/g, (_, c) => c.toUpperCase()); // "helloWorld"

// ============================================
// 23. SYMBOL & WEAKMAP SHORTHAND
// ============================================

// Unique property keys
const id = Symbol("id");
const userSym = { [id]: 123 };

// Well-known symbols
class MyClass {
	[Symbol.iterator]() {
		/* ... */
	}
	[Symbol.toStringTag] = "MyClass";
}

// WeakMap for private data (old way before #private)
const privateData = new WeakMap();
class OldPrivate {
	constructor() {
		privateData.set(this, { secret: "data" });
	}
	getSecret() {
		return privateData.get(this).secret;
	}
}

// ============================================
// 24. ERROR HANDLING SHORTHAND
// ============================================

// Optional catch binding (ES2019)
try {
	riskyOperation();
} catch {
	// no (e) needed if not using
	console.log("Failed");
}

// Throw expressions (proposal, stage 3)
// const value = param ?? throw new Error("Required!");

// ============================================
// 25. MODERN SYNTAX SUGAR
// ============================================

// Nullish coalescing in chain
const theme = user?.preferences?.theme ?? "dark";

// Logical AND for conditional rendering (React style)
const component = isVisible && <Component />;

// Array flat/flatMap
const nested = [1, [2, 3], [4, [5]]];
const flat = nested.flat(2); // [1, 2, 3, 4, 5]

const flatMapped = [1, 2, 3].flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6]

// Replace all (ES2021)
const newStr = "foo bar foo".replaceAll("foo", "baz"); // "baz bar baz"

// at() method for strings too
"hello".at(-1); // "o"

// ============================================
// PRACTICAL COMBINATION EXAMPLES
// ============================================

// Safe deep access with defaults
const getUserCity = (user) => user?.profile?.address?.city ?? "Unknown";

// Configuration with defaults
const createConfig = (options = {}) => ({
	timeout: 5000,
	retries: 3,
	...options,
});

// Pipeline processing
const processData = (data) =>
	data
		?.filter(Boolean)
		?.map(Number)
		?.filter((n) => !isNaN(n))
		?.reduce((a, b) => a + b, 0) ?? 0;

// Event handler with optional chaining
button?.addEventListener?.("click", handler);

// Safe JSON parse
const safeJSON = (str) => {
	try {
		return JSON.parse(str);
	} catch {
		return null;
	}
};
