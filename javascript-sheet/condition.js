// ============================================================
// JAVASCRIPT CONDITIONAL STATEMENTS - COMPLETE ADVANCED GUIDE
// Copy and paste this entire file into your project
// ============================================================

// ==========================================
// 1. BASIC CONDITIONALS
// ==========================================

// 1.1 If Statement
let age = 18;
if (age >= 18) {
	console.log("Adult");
}

// 1.2 If-Else Statement
let temperature = 25;
if (temperature > 30) {
	console.log("Hot");
} else {
	console.log("Moderate");
}

// 1.3 If-Else If-Else Ladder
let score = 85;
if (score >= 90) {
	console.log("Grade A");
} else if (score >= 80) {
	console.log("Grade B");
} else if (score >= 70) {
	console.log("Grade C");
} else {
	console.log("Grade F");
}

// ==========================================
// 2. TERNARY OPERATOR (Shorthand If-Else)
// ==========================================

// 2.1 Basic Ternary
let isLoggedIn = true;
let message = isLoggedIn ? "Welcome back!" : "Please login";
console.log(message);

// 2.2 Nested Ternary
let userRole = "admin";
let access =
	userRole === "admin"
		? "Full Access"
		: userRole === "editor"
			? "Limited Access"
			: "No Access";

// 2.3 Multiple Conditions Ternary
let num = 15;
let result =
	num > 0
		? num % 2 === 0
			? "Positive Even"
			: "Positive Odd"
		: num < 0
			? "Negative"
			: "Zero";

// ==========================================
// 3. SWITCH STATEMENT
// ==========================================

// 3.1 Basic Switch
let day = 3;
switch (day) {
	case 1:
		console.log("Monday");
		break;
	case 2:
		console.log("Tuesday");
		break;
	case 3:
		console.log("Wednesday");
		break;
	default:
		console.log("Invalid day");
}

// 3.2 Switch with Fall-through (Multiple cases same result)
let month = 1;
switch (month) {
	case 12:
	case 1:
	case 2:
		console.log("Winter");
		break;
	case 3:
	case 4:
	case 5:
		console.log("Spring");
		break;
	default:
		console.log("Other season");
}

// 3.3 Switch with Expressions
let a = 10,
	b = 5;
let operation = "multiply";
switch (operation) {
	case "add":
		console.log(a + b);
		break;
	case "subtract":
		console.log(a - b);
		break;
	case "multiply":
		console.log(a * b);
		break;
	case "divide":
		console.log(a / b);
		break;
}

// ==========================================
// 4. ADVANCED CONDITIONAL PATTERNS
// ==========================================

// 4.1 Logical Operators Short-circuiting
// && (AND) - Returns first falsy value or last truthy
let user = { name: "John", age: 25 };
let userName = user && user.name && user.name.toUpperCase();

// || (OR) - Returns first truthy value or last falsy
let displayName = user.name || "Anonymous";

// ?? (Nullish Coalescing) - Only null/undefined, not 0 or ""
let count = 0;
let displayCount = count ?? "No count"; // Returns 0
let missingCount = null ?? "No count"; // Returns "No count"

// 4.2 Optional Chaining with Conditionals
let deepObj = {
	level1: {
		level2: {
			value: "Found!",
		},
	},
};

// Safe nested property access
let safeValue = deepObj?.level1?.level2?.value ?? "Default";
console.log(safeValue);

// ==========================================
// 5. ADVANCED COMPARISONS
// ==========================================

// 5.1 Strict vs Loose Equality
console.log(5 == "5"); // true (loose, type coercion)
console.log(5 === "5"); // false (strict, different types)
console.log(0 == false); // true
console.log(0 === false); // false

// 5.2 Object Comparison (Reference vs Value)
let obj1 = { x: 1 };
let obj2 = { x: 1 };
let obj3 = obj1;

console.log(obj1 === obj2); // false (different references)
console.log(obj1 === obj3); // true (same reference)

// 5.3 Deep Equality Check Function
function deepEqual(obj1, obj2) {
	if (obj1 === obj2) return true;
	if (typeof obj1 !== typeof obj2) return false;
	if (typeof obj1 !== "object" || obj1 === null || obj2 === null) return false;

	let keys1 = Object.keys(obj1);
	let keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) return false;

	for (let key of keys1) {
		if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
			return false;
		}
	}
	return true;
}

// ==========================================
// 6. PATTERN MATCHING & ADVANCED SWITCHES
// ==========================================

// 6.1 Object-based Switch (More flexible than switch statement)
function getAnimalSound(animal) {
	const sounds = {
		dog: "Woof",
		cat: "Meow",
		cow: "Moo",
		default: "Unknown sound",
	};
	return sounds[animal] || sounds.default;
}

// 6.2 Strategy Pattern with Functions
const strategies = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => (b !== 0 ? a / b : "Cannot divide by zero"),
};

function calculate(operation, a, b) {
	return strategies[operation]
		? strategies[operation](a, b)
		: "Invalid operation";
}

// 6.3 Predicate Functions
const isPositive = (n) => n > 0;
const isEven = (n) => n % 2 === 0;
const isDivisibleBy = (n, divisor) => n % divisor === 0;

// Combining predicates
function checkNumber(n) {
	if (isPositive(n) && isEven(n)) {
		return "Positive Even";
	}
	return "Other";
}

// ==========================================
// 7. ARRAY & OBJECT CONDITIONALS
// ==========================================

// 7.1 Array.every() and Array.some()
let numbers = [2, 4, 6, 8, 10];
let allEven = numbers.every((n) => n % 2 === 0); // true
let hasNegative = numbers.some((n) => n < 0); // false

// 7.2 Array.find() and Array.filter()
let users = [
	{ id: 1, name: "Alice", active: true },
	{ id: 2, name: "Bob", active: false },
	{ id: 3, name: "Charlie", active: true },
];

let activeUser = users.find((u) => u.active); // First active user
let activeUsers = users.filter((u) => u.active); // All active users

// 7.3 Conditional Array Methods
let mixed = [1, "two", 3, null, undefined, "six", 0];
let validNumbers = mixed.filter(
	(item) => typeof item === "number" && !isNaN(item)
);

// ==========================================
// 8. ADVANCED ERROR HANDLING CONDITIONALS
// ==========================================

// 8.1 Try-Catch with Conditional Logic
function parseJSON(jsonString) {
	try {
		let data = JSON.parse(jsonString);
		if (!data || typeof data !== "object") {
			throw new Error("Invalid data structure");
		}
		return data;
	} catch (error) {
		if (error instanceof SyntaxError) {
			console.error("Invalid JSON format");
		} else {
			console.error("Processing error:", error.message);
		}
		return null;
	}
}

// 8.2 Custom Error Classes with Conditions
class ValidationError extends Error {
	constructor(field, message) {
		super(message);
		this.field = field;
		this.name = "ValidationError";
	}
}

function validateUser(user) {
	if (!user.email) {
		throw new ValidationError("email", "Email is required");
	}
	if (!user.email.includes("@")) {
		throw new ValidationError("email", "Invalid email format");
	}
	if (!user.age || user.age < 18) {
		throw new ValidationError("age", "Must be 18 or older");
	}
	return true;
}

// ==========================================
// 9. ASYNC CONDITIONALS
// ==========================================

// 9.1 Async/Await with Conditionals
async function fetchUserData(userId) {
	try {
		let response = await fetch(`/api/users/${userId}`);

		if (!response.ok) {
			if (response.status === 404) {
				console.log("User not found");
				return null;
			}
			throw new Error(`HTTP ${response.status}`);
		}

		let data = await response.json();
		return data;
	} catch (error) {
		console.error("Fetch failed:", error);
		return null;
	}
}

// 9.2 Promise Chaining with Conditions
function checkServiceHealth() {
	return fetch("/api/health")
		.then((res) => {
			if (!res.ok) throw new Error("Service unhealthy");
			return res.json();
		})
		.then((data) => {
			return data.status === "healthy" ? "All good" : "Issues detected";
		})
		.catch((err) => `Error: ${err.message}`);
}

// ==========================================
// 10. REAL-WORLD COMPLEX EXAMPLES
// ==========================================

// 10.1 Form Validation System
class FormValidator {
	constructor(rules) {
		this.rules = rules;
		this.errors = {};
	}

	validate(formData) {
		this.errors = {};

		for (let [field, validators] of Object.entries(this.rules)) {
			for (let validator of validators) {
				let error = validator(formData[field], formData);
				if (error) {
					this.errors[field] = error;
					break; // Stop at first error per field
				}
			}
		}

		return Object.keys(this.errors).length === 0;
	}

	getErrors() {
		return this.errors;
	}
}

// Usage
const loginValidator = new FormValidator({
	email: [
		(val) => !val && "Email is required",
		(val) => !val?.includes("@") && "Invalid email format",
	],
	password: [
		(val) => !val && "Password is required",
		(val) => val?.length < 8 && "Password must be 8+ characters",
	],
});

// 10.2 State Machine Pattern
const trafficLight = {
	state: "green",
	transitions: {
		green: { next: "yellow", action: () => console.log("Go!") },
		yellow: { next: "red", action: () => console.log("Slow down!") },
		red: { next: "green", action: () => console.log("Stop!") },
	},

	change() {
		const current = this.transitions[this.state];
		current.action();
		this.state = current.next;
		return this.state;
	},
};

// 10.3 Feature Flags / Permission System
const permissions = {
	user: ["read"],
	editor: ["read", "write"],
	admin: ["read", "write", "delete", "manage"],
};

function hasPermission(role, action) {
	const rolePerms = permissions[role] || [];
	return rolePerms.includes(action);
}

function requirePermission(role, action) {
	if (!hasPermission(role, action)) {
		throw new Error(`Role '${role}' lacks '${action}' permission`);
	}
	return true;
}

// 10.4 Complex Business Logic with Guard Clauses
function processOrder(order) {
	// Guard clauses - early returns for invalid states
	if (!order) return { error: "No order provided" };
	if (!order.items?.length) return { error: "Empty cart" };
	if (order.status !== "pending") return { error: "Order already processed" };

	// Calculate totals
	const subtotal = order.items.reduce((sum, item) => {
		if (!item.price || item.quantity < 1) {
			throw new Error(`Invalid item: ${item.name}`);
		}
		return sum + item.price * item.quantity;
	}, 0);

	// Apply conditional discounts
	let discount = 0;
	if (subtotal > 1000)
		discount = 0.1; // 10% off over $1000
	else if (subtotal > 500)
		discount = 0.05; // 5% off over $500
	else if (order.customer?.isVIP) discount = 0.15; // VIP always 15%

	const total = subtotal * (1 - discount);

	// Conditional shipping
	const shipping = subtotal > 50 ? 0 : 5.99;

	return {
		subtotal: subtotal.toFixed(2),
		discount: discount * 100 + "%",
		shipping: shipping.toFixed(2),
		total: (total + shipping).toFixed(2),
		status: "confirmed",
	};
}

// ==========================================
// 11. FUNCTIONAL PROGRAMMING CONDITIONALS
// ==========================================

// 11.1 Currying and Partial Application
const checkThreshold = (min) => (max) => (value) =>
	value >= min && value <= max;
const isAdultAge = checkThreshold(18)(65);
console.log(isAdultAge(25)); // true

// 11.2 Compose with Conditions
const compose =
	(...fns) =>
	(x) =>
		fns.reduceRight((v, f) => f(v), x);

const addTax = (price) => price * 1.08;
const applyDiscount = (price) => (price > 100 ? price * 0.9 : price);
const formatPrice = (price) => `$${price.toFixed(2)}`;

const calculateFinalPrice = compose(formatPrice, addTax, applyDiscount);

// 11.3 Maybe Monad Pattern (Null safety)
const Maybe = function (value) {
	this.value = value;
};

Maybe.of = function (value) {
	return new Maybe(value);
};

Maybe.prototype.isNothing = function () {
	return this.value === null || this.value === undefined;
};

Maybe.prototype.map = function (fn) {
	return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value));
};

Maybe.prototype.getOrElse = function (defaultValue) {
	return this.isNothing() ? defaultValue : this.value;
};

// Usage
let userAddress = Maybe.of(user)
	.map((u) => u.profile)
	.map((p) => p.address)
	.map((a) => a.city)
	.getOrElse("Unknown City");

// ==========================================
// 12. PERFORMANCE OPTIMIZED CONDITIONALS
// ==========================================

// 12.1 Lookup Tables (Faster than switch/if-else)
const monthDays = {
	1: 31,
	2: 28,
	3: 31,
	4: 30,
	5: 31,
	6: 30,
	7: 31,
	8: 31,
	9: 30,
	10: 31,
	11: 30,
	12: 31,
};

function getDaysInMonth(month, year) {
	if (month === 2 && isLeapYear(year)) return 29;
	return monthDays[month] || "Invalid month";
}

function isLeapYear(year) {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// 12.2 Bitwise Operations for Flags
const PERMISSIONS = {
	READ: 1 << 0, // 0001 = 1
	WRITE: 1 << 1, // 0010 = 2
	EXECUTE: 1 << 2, // 0100 = 4
	DELETE: 1 << 3, // 1000 = 8
};

function hasFlag(userPerms, flag) {
	return (userPerms & flag) === flag;
}

function addFlag(userPerms, flag) {
	return userPerms | flag;
}

// Usage
let userPerms = PERMISSIONS.READ | PERMISSIONS.WRITE; // 3
console.log(hasFlag(userPerms, PERMISSIONS.READ)); // true
console.log(hasFlag(userPerms, PERMISSIONS.DELETE)); // false

// ==========================================
// TESTING & DEMONSTRATION
// ==========================================

console.log("=== Basic Conditionals ===");
console.log(getAnimalSound("dog"));
console.log(getAnimalSound("lion"));

console.log("\n=== Strategy Pattern ===");
console.log(calculate("add", 5, 3));
console.log(calculate("divide", 10, 0));

console.log("\n=== Form Validation ===");
let formData = { email: "test@example.com", password: "short" };
let isValid = loginValidator.validate(formData);
console.log("Valid:", isValid);
console.log("Errors:", loginValidator.getErrors());

console.log("\n=== Order Processing ===");
let order = {
	status: "pending",
	items: [
		{ name: "Laptop", price: 999, quantity: 1 },
		{ name: "Mouse", price: 25, quantity: 2 },
	],
	customer: { isVIP: false },
};
console.log(processOrder(order));

console.log("\n=== Maybe Monad ===");
let testUser = { profile: { address: { city: "New York" } } };
console.log(
	Maybe.of(testUser)
		.map((u) => u.profile)
		.getOrElse("No profile")
);

// ============================================================
// END OF FILE
// ============================================================
