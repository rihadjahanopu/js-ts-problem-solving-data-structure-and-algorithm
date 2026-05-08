/**
 * ============================================================
 * JAVASCRIPT VARIABLES - COMPLETE A-Z GUIDE
 * ============================================================
 * Author: Learning Purpose
 * Description: Advanced examples of JavaScript variables
 * ============================================================
 */

"use strict";

// ============================================
// A. VARIABLE DECLARATION TYPES
// ============================================

console.log("=== A. VARIABLE DECLARATION TYPES ===");

// var - Function scoped (Old way)
var oldVariable = "I am var";
var oldNumber = 100;

// let - Block scoped (Modern)
let modernVariable = "I am let";
let letNumber = 200;

// const - Constant (Cannot reassign)
const CONSTANT_VALUE = "I cannot change";
const PI = 3.14159265359;

console.log("var:", oldVariable);
console.log("let:", modernVariable);
console.log("const:", CONSTANT_VALUE);

// ============================================
// B. DATA TYPES - PRIMITIVE
// ============================================

console.log("\n=== B. PRIMITIVE DATA TYPES ===");

// String
let userName = "Rihad Islam";
let userNick = "Rihad";
let userTemplate = `Hello, ${userName}!`;

console.log("String:", userName, typeof userName);

// Number
let userAge = 25;
let productPrice = 999.99;
let negativeNum = -50;
let infinityNum = Infinity;
let notANumber = NaN;

console.log("Number:", userAge, typeof userAge);

// Boolean
let isActive = true;
let isVerified = false;
let hasPermission = true;

console.log("Boolean:", isActive, typeof isActive);

// Undefined
let notDefined;
console.log("Undefined:", notDefined, typeof notDefined);

// Null
let emptyValue = null;
console.log("Null:", emptyValue, typeof emptyValue); // object (bug)

// Symbol
let uniqueId = Symbol("id");
let anotherUniqueId = Symbol("id");
console.log("Symbol:", uniqueId, typeof uniqueId);
console.log("Symbols are unique:", uniqueId === anotherUniqueId); // false

// BigInt
let hugeNumber = 9007199254740991n;
let anotherBig = BigInt(12345678901234567890);
console.log("BigInt:", hugeNumber, typeof hugeNumber);

// ============================================
// C. DATA TYPES - COMPLEX
// ============================================

console.log("\n=== C. COMPLEX DATA TYPES ===");

// Array
let fruits = ["Apple", "Banana", "Mango", "Orange"];
let mixedArray = ["Text", 123, true, null, undefined, { key: "value" }];

console.log("Array:", fruits);
console.log("First fruit:", fruits[0]);
console.log("Array length:", fruits.length);

fruits.push("Grape"); // Add to end
fruits.unshift("Strawberry"); // Add to beginning
console.log("Modified array:", fruits);

// Object
let userProfile = {
	firstName: "Rihad",
	lastName: "Islam",
	age: 25,
	email: "rihad@example.com",
	isStudent: true,
	address: {
		street: "123 Main St",
		city: "Dhaka",
		country: "Bangladesh",
		zipCode: "1200",
	},
	hobbies: ["Coding", "Reading", "Gaming"],
	getFullName: function () {
		return `${this.firstName} ${this.lastName}`;
	},
	getAgeNextYear: function () {
		return this.age + 1;
	},
};

console.log("Object:", userProfile);
console.log("Full Name:", userProfile.getFullName());
console.log("City:", userProfile.address.city);
console.log("First Hobby:", userProfile.hobbies[0]);

// Function as variable
let calculateArea = function (width, height) {
	return width * height;
};

let calculateVolume = (length, width, height) => {
	return length * width * height;
};

console.log("Area:", calculateArea(10, 5));
console.log("Volume:", calculateVolume(10, 5, 2));

// ============================================
// D. VARIABLE NAMING CONVENTIONS
// ============================================

console.log("\n=== D. NAMING CONVENTIONS ===");

// Camel Case (Most popular)
let firstName = "Rihad";
let lastName = "Islam";
let userEmailAddress = "rihad@example.com";

// Snake Case
let first_name = "Rihad";
let last_name = "Islam";
let user_email_address = "rihad@example.com";

// Pascal Case (Classes)
let UserProfile = "User Profile String";
class UserAccount {
	constructor(name) {
		this.name = name;
	}
}

// UPPER_SNAKE_CASE (Constants)
const MAX_LOGIN_ATTEMPTS = 3;
const DATABASE_CONNECTION_STRING = "mongodb://localhost:27017";
const API_BASE_URL = "https://api.example.com";

// Special characters
let $price = 100; // jQuery style
let _privateVariable = "secret"; // Private convention
let user$name = "DoubleDollar"; // Middle dollar
let name_ = "UnderscoreEnd"; // End underscore

console.log("Camel Case:", userEmailAddress);
console.log("Constant:", MAX_LOGIN_ATTEMPTS);
console.log("Special $:", $price);

// ============================================
// E. MULTIPLE DECLARATIONS
// ============================================

console.log("\n=== E. MULTIPLE DECLARATIONS ===");

// Single line, multiple variables
let a, b, c;
let x = 10,
	y = 20,
	z = 30;

// Destructuring - Array
let colors = ["Red", "Green", "Blue"];
let [color1, color2, color3] = colors;
console.log("Destructured colors:", color1, color2, color3);

// Destructuring - Object
let person = { name: "Rihad", age: 25, city: "Dhaka" };
let { name, age, city } = person;
console.log("Destructured person:", name, age, city);

// Destructuring with default values
let settings = { theme: "dark" };
let { theme, language = "en" } = settings;
console.log("Theme:", theme, "Language:", language);

// Nested destructuring
let student = {
	studentName: "Ali",
	scores: {
		math: 90,
		science: 85,
	},
};
let {
	studentName,
	scores: { math, science },
} = student;
console.log("Student:", studentName, "Math:", math, "Science:", science);

// ============================================
// F. SCOPE EXAMPLES
// ============================================

console.log("\n=== F. SCOPE DEMONSTRATION ===");

// Global scope
let globalVar = "I am global";

function demonstrateScope() {
	// Function scope with var
	var functionScoped = "I am function scoped";

	if (true) {
		// Block scope with let/const
		let blockScoped = "I am block scoped";
		const alsoBlockScoped = "Me too";
		var notBlockScoped = "I escape block!"; // function scoped

		console.log("Inside block:", blockScoped);
		console.log("Global inside function:", globalVar);
	}

	console.log("Function scoped:", functionScoped);
	console.log("Var escapes block:", notBlockScoped);
	// console.log(blockScoped); // Error! Not accessible
}

demonstrateScope();
console.log("Global outside:", globalVar);

// ============================================
// G. HOISTING
// ============================================

console.log("\n=== G. HOISTING ===");

// var hoisting (undefined)
console.log("Hoisted var:", hoistedVar); // undefined
var hoistedVar = "I am hoisted";

// let/const hoisting (Temporal Dead Zone - Error if accessed)
// console.log(hoistedLet); // ReferenceError!
let hoistedLet = "Not accessible before";

// Function hoisting
sayHello(); // Works!
function sayHello() {
	console.log("Hello from hoisted function!");
}

// Function expression NOT hoisted
// sayGoodbye(); // Error!
let sayGoodbye = function () {
	console.log("Goodbye!");
};

// ============================================
// H. TYPE CONVERSION
// ============================================

console.log("\n=== H. TYPE CONVERSION ===");

// String to Number
let strNum = "123";
let convertedNum = Number(strNum);
let parsedInt = parseInt(strNum);
let parsedFloat = parseFloat("123.45");
let unaryPlus = +"456";

console.log("Converted:", convertedNum, typeof convertedNum);
console.log("Unary plus:", unaryPlus);

// Number to String
let numToStr = 789;
let stringified = String(numToStr);
let toStringMethod = numToStr.toString();
let concatenated = numToStr + "";

console.log("Stringified:", stringified, typeof stringified);

// Boolean conversion
console.log("Boolean(1):", Boolean(1));
console.log("Boolean(0):", Boolean(0));
console.log("Boolean(''):", Boolean(""));
console.log("Boolean('hello'):", Boolean("hello"));
console.log("Boolean(null):", Boolean(null));
console.log("Double negation !!:", !!userName);

// ============================================
// I. SPREAD OPERATOR
// ============================================

console.log("\n=== I. SPREAD OPERATOR ===");

// Array spread
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5, 6];
let arr3 = [...arr1, ...arr2];
let arrCopy = [...arr1]; // Shallow copy

console.log("Original:", arr1);
console.log("Spread with new:", arr2);
console.log("Combined:", arr3);

// Object spread
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3, d: 4 };
let objMerged = { ...obj1, ...obj2 };
let objCopy = { ...obj1 };

console.log("Object spread:", obj2);
console.log("Merged:", objMerged);

// ============================================
// J. TEMPLATE LITERALS
// ============================================

console.log("\n=== J. TEMPLATE LITERALS ===");

let customer = "Rihad";
let items = 5;
let totalPrice = 2500;

// Multi-line string
let message = `
Dear ${customer},

Thank you for your order!
You have purchased ${items} items.
Total amount: ৳${totalPrice}
Discount: ৳${totalPrice > 2000 ? totalPrice * 0.1 : 0}

Next year you will be ${userProfile.getAgeNextYear()} years old.
`;

console.log(message);

// Tagged template literal
function highlight(strings, ...values) {
	return strings.reduce((result, string, i) => {
		const value = values[i] ? `**${values[i]}**` : "";
		return result + string + value;
	}, "");
}

let highlighted = highlight`Name: ${customer}, Items: ${items}`;
console.log("Highlighted:", highlighted);

// ============================================
// K. ADVANCED PATTERNS
// ============================================

console.log("\n=== K. ADVANCED PATTERNS ===");

// Closure
function createCounter() {
	let count = 0; // Private variable

	return {
		increment: function () {
			return ++count;
		},
		decrement: function () {
			return --count;
		},
		getCount: function () {
			return count;
		},
	};
}

let counter = createCounter();
console.log("Counter:", counter.increment());
console.log("Counter:", counter.increment());
console.log("Counter:", counter.getCount());

// IIFE (Immediately Invoked Function Expression)
let result = (function () {
	let privateVar = "I am private";
	return privateVar;
})();

console.log("IIFE result:", result);

// Module pattern
let calculator = (function () {
	let result = 0;

	function add(x) {
		result += x;
		return this;
	}

	function subtract(x) {
		result -= x;
		return this;
	}

	function getResult() {
		return result;
	}

	return {
		add: add,
		subtract: subtract,
		getResult: getResult,
	};
})();

console.log("Calculator:", calculator.add(10).subtract(3).getResult());

// ============================================
// L. PRACTICAL EXAMPLES
// ============================================

console.log("\n=== L. PRACTICAL EXAMPLES ===");

// Example 1: E-commerce Cart
const TAX_RATE = 0.05;
const SHIPPING_COST = 50;

let cart = [
	{ name: "Laptop", price: 50000, qty: 1 },
	{ name: "Mouse", price: 800, qty: 2 },
	{ name: "Keyboard", price: 1500, qty: 1 },
];

let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
let tax = subtotal * TAX_RATE;
let total = subtotal + tax + SHIPPING_COST;

console.log(`
Order Summary:
Subtotal: ৳${subtotal}
Tax (5%): ৳${tax.toFixed(2)}
Shipping: ৳${SHIPPING_COST}
Total: ৳${total.toFixed(2)}
`);

// Example 2: User Authentication
const USERS = [
	{ username: "rihad", password: "pass123", role: "admin" },
	{ username: "karim", password: "pass456", role: "user" },
];

function authenticate(username, password) {
	let user = USERS.find(
		(u) => u.username === username && u.password === password
	);

	if (user) {
		let { password, ...userWithoutPassword } = user; // Remove password
		return { success: true, user: userWithoutPassword };
	}

	return { success: false, message: "Invalid credentials" };
}

let authResult = authenticate("rihad", "pass123");
console.log("Auth result:", authResult);

// Example 3: Data Transformation
let rawData = [
	{ id: 1, name: "Product A", price: "100", category: "electronics" },
	{ id: 2, name: "Product B", price: "200", category: "clothing" },
];

let processedData = rawData.map((item) => ({
	...item,
	price: Number(item.price),
	priceWithTax: Number(item.price) * 1.05,
	displayName: item.name.toUpperCase(),
}));

console.log("Processed:", processedData);

// ============================================
// M. ERROR HANDLING WITH VARIABLES
// ============================================

console.log("\n=== M. ERROR HANDLING ===");

// Safe property access
let safeUser = null;
// console.log(safeUser.name); // Error!
console.log(safeUser?.name); // undefined (optional chaining)

// Nullish coalescing
let defaultValue = safeUser ?? "Default User";
console.log("Default:", defaultValue);

// Try-catch with variables
try {
	let riskyOperation = someUndefinedVariable + 10;
} catch (error) {
	let errorMessage = `Error occurred: ${error.message}`;
	console.log(errorMessage);
}

// ============================================
// N. MODERN ES6+ FEATURES
// ============================================

console.log("\n=== N. MODERN FEATURES ===");

// Dynamic property names
let dynamicKey = "dynamicProperty";
let dynamicObject = {
	[dynamicKey]: "This is dynamic",
	[`computed${dynamicKey}`]: "Computed value",
};
console.log("Dynamic:", dynamicObject);

// Object property shorthand
let p = 10,
	q = 20;
let shortObj = { p, q }; // { p: 10, q: 20 }
console.log("Shorthand:", shortObj);

// Rest parameters
function sumAll(...numbers) {
	return numbers.reduce((total, num) => total + num, 0);
}
console.log("Sum all:", sumAll(1, 2, 3, 4, 5));

// Rest in destructuring
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log("First:", first, "Rest:", rest);

// ============================================
// SUMMARY
// ============================================

console.log("\n=== SUMMARY ===");
console.log(`
JavaScript Variables Summary:
1. Use 'const' by default
2. Use 'let' when reassignment needed
3. Avoid 'var' in modern code
4. Use camelCase for variables
5. Use UPPER_SNAKE_CASE for constants
6. Choose meaningful names
7. Understand scope and hoisting
8. Use destructuring for cleaner code
9. Use spread operator for copying
10. Use template literals for strings
`);

// End of file
