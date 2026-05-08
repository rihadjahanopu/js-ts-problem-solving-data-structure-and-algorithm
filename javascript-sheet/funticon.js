/*
================================================================================
                    JAVASCRIPT FUNCTIONS - COMPLETE REFERENCE
                    =========================================

    File: js-functions-complete-reference.js
    Description: Complete guide to JavaScript functions from basic to advanced
    Author: Learning Reference
    Version: 1.0

    HOW TO USE:
    1. Copy this entire content
    2. Save as: js-functions-complete-reference.js (or .txt)
    3. Open in VS Code, Sublime Text, Notepad++, or any editor
    4. Search with Ctrl+F to find specific topics

    TABLE OF CONTENTS:
    ==================
    01. FUNCTION BASICS
    02. PARAMETERS & ARGUMENTS
    03. RETURN STATEMENTS
    04. FUNCTION EXPRESSIONS
    05. ARROW FUNCTIONS
    06. IIFE (Immediately Invoked)
    07. CALLBACK FUNCTIONS
    08. HIGHER-ORDER FUNCTIONS
    09. CLOSURES
    10. SCOPE & HOISTING
    11. THIS KEYWORD
    12. CALL, APPLY, BIND
    13. CONSTRUCTOR FUNCTIONS
    14. PROTOTYPES
    15. CLASSES (ES6+)
    16. STATIC METHODS
    17. PRIVATE METHODS
    18. GETTERS & SETTERS
    19. INHERITANCE
    20. MIXINS
    21. GENERATORS
    22. ASYNC FUNCTIONS
    23. PROMISES
    24. ASYNC/AWAIT
    25. ERROR HANDLING
    26. FUNCTIONAL PROGRAMMING
    27. CURRYING
    28. COMPOSITION
    29. PIPELINING
    30. MEMOIZATION
    31. DEBOUNCE & THROTTLE
    32. RECURSION
    33. TAIL CALL OPTIMIZATION
    34. PROXY & REFLECT
    35. SYMBOL & ITERATORS
    36. REAL-WORLD EXAMPLES
    37. DESIGN PATTERNS
    38. PERFORMANCE TIPS
    39. COMMON MISTAKES
    40. INTERVIEW QUESTIONS

================================================================================
*/

// ================================================================================
// 01. FUNCTION BASICS
// ================================================================================

// Function Declaration - Hoisted, can be called before definition
function greet(name) {
	return "Hello, " + name + "!";
}

// Function Expression - Not hoisted, stored in variable
const sayHelloof = function (name) {
	return "Hello, " + name + "!";
};

// Named Function Expression (useful for recursion)
const factorial = function fact(n) {
	if (n <= 1) return 1;
	return n * fact(n - 1);
};

// Function with no parameters
function sayHi() {
	return "Hi there!";
}

// Function with multiple parameters
function add(a, b) {
	return a + b;
}

// Function with no return (returns undefined)
function logMessage(msg) {
	console.log(msg);
}

// ================================================================================
// 02. PARAMETERS & ARGUMENTS
// ================================================================================

// Default Parameters (ES6)
function greetUser(name = "Guest", greeting = "Hello") {
	return `${greeting}, ${name}!`;
}

// Rest Parameters (ES6) - collects remaining arguments into array
function sum(...numbers) {
	return numbers.reduce((total, num) => total + num, 0);
}
// Usage: sum(1, 2, 3, 4, 5) → 15

// Arguments object (old way, not recommended)
function oldSum() {
	let total = 0;
	for (let i = 0; i < arguments.length; i++) {
		total += arguments[i];
	}
	return total;
}

// Destructuring Parameters
function displayUser({ name, age, email = "N/A" }) {
	console.log(`${name} (${age}) - ${email}`);
}
// Usage: displayUser({ name: "Rahim", age: 25 })

// Array Destructuring
function getCoords([x, y, z = 0]) {
	return { x, y, z };
}

// Nested Destructuring
function printCompany({ name, address: { city, country } }) {
	console.log(`${name} is in ${city}, ${country}`);
}

// ================================================================================
// 03. RETURN STATEMENTS
// ================================================================================

// Single return
function double(x) {
	return x * 2;
}

// Multiple returns (conditional)
function getGrade(score) {
	if (score >= 90) return "A";
	if (score >= 80) return "B";
	if (score >= 70) return "C";
	return "F";
}

// Returning objects (wrap in parentheses)
const makePerson = (name, age) => ({ name, age });

// Early return pattern (guard clause)
function processUser(user) {
	if (!user) return null;
	if (!user.active) return "Inactive user";
	// Process active user...
	return user.data;
}

// Returning multiple values (as object or array)
function getMinMax(arr) {
	return {
		min: Math.min(...arr),
		max: Math.max(...arr),
	};
}

// Or using array
function getStats(numbers) {
	const sum = numbers.reduce((a, b) => a + b, 0);
	const avg = sum / numbers.length;
	return [sum, avg];
}
// Usage: const [total, average] = getStats([1, 2, 3]);

// ================================================================================
// 04. FUNCTION EXPRESSIONS
// ================================================================================

// Anonymous function
const multiply = function (a, b) {
	return a * b;
};

// Named function expression (better for debugging)
const divide = function division(a, b) {
	if (b === 0) throw new Error("Cannot divide by zero");
	return a / b;
};

// Function stored in object
const calculator = {
	add: function (a, b) {
		return a + b;
	},
	subtract: function (a, b) {
		return a - b;
	},
};

// Function stored in array
const operations = [
	function (a, b) {
		return a + b;
	},
	function (a, b) {
		return a - b;
	},
	function (a, b) {
		return a * b;
	},
];

// ================================================================================
// 05. ARROW FUNCTIONS (ES6)
// ================================================================================

// Basic syntax
const square = (x) => x * x;

// Multiple parameters (parentheses required)
const add = (a, b) => a + b;

// No parameters
const getRandom = () => Math.random();

// Multiple statements (need braces and return)
const calculate = (a, b) => {
	const sum = a + b;
	const product = a * b;
	return { sum, product };
};

// Returning object (wrap in parentheses)
const createUser = (name, age) => ({ name, age, created: Date.now() });

// Arrow functions in array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);
const sum = numbers.reduce((a, b) => a + b, 0);

// IMPORTANT: Arrow functions don't have their own 'this'
const obj = {
	name: "Test",
	// DON'T use arrow for methods
	badMethod: () => console.log(this.name), // undefined (window.name)
	// DO use regular function
	goodMethod() {
		console.log(this.name);
	}, // "Test"
};

// Arrow functions preserve 'this' from outer scope
const betterObj = {
	name: "Test",
	friends: ["A", "B", "C"],
	printFriends() {
		// 'this' is preserved in arrow function
		this.friends.forEach((f) => console.log(this.name + " knows " + f));
	},
};

// ================================================================================
// 06. IIFE (Immediately Invoked Function Expression)
// ================================================================================

// Basic IIFE
(function () {
	console.log("I run immediately!");
})();

// IIFE with parameters
(function (name) {
	console.log("Hello, " + name);
})("World");

// Arrow function IIFE
(() => {
	console.log("Arrow IIFE");
})();

// IIFE returning value
const result = (function () {
	const privateVar = "secret";
	return {
		getSecret: () => privateVar,
	};
})();

// Module pattern with IIFE
const myModule = (function () {
	// Private
	let count = 0;
	const privateMethod = () => console.log("Private");

	// Public API
	return {
		increment: () => ++count,
		decrement: () => --count,
		getCount: () => count,
	};
})();

// ================================================================================
// 07. CALLBACK FUNCTIONS
// ================================================================================

// Synchronous callback
function processData(data, callback) {
	const processed = data.toUpperCase();
	callback(processed);
}

processData("hello", function (result) {
	console.log(result); // "HELLO"
});

// Asynchronous callback (old style)
function fetchData(url, successCallback, errorCallback) {
	setTimeout(() => {
		if (Math.random() > 0.5) {
			successCallback({ data: "Success" });
		} else {
			errorCallback(new Error("Failed"));
		}
	}, 1000);
}

// Callback hell example (avoid this)
// getData(function(a) {
//     getMoreData(a, function(b) {
//         getMoreData(b, function(c) {
//             console.log(c);
//         });
//     });
// });

// Better: Use Promises or async/await

// ================================================================================
// 08. HIGHER-ORDER FUNCTIONS
// ================================================================================

// Function that returns function
function multiplyBy(factor) {
	return function (number) {
		return number * factor;
	};
}
const triple = multiplyBy(3);
console.log(triple(5)); // 15

// Function that takes function as argument
function withLogging(fn) {
	return function (...args) {
		console.log(`Calling ${fn.name} with`, args);
		const result = fn(...args);
		console.log(`Result:`, result);
		return result;
	};
}

const loggedAdd = withLogging(add);
loggedAdd(2, 3);

// Array methods as HOF
const users = [
	{ name: "Rahim", age: 25 },
	{ name: "Karim", age: 30 },
	{ name: "Salam", age: 20 },
];

// map - transform
const names = users.map((u) => u.name);

// filter - select
const adults = users.filter((u) => u.age >= 25);

// reduce - aggregate
const totalAge = users.reduce((sum, u) => sum + u.age, 0);

// find - first match
const rahimok = users.find((u) => u.name === "Rahim");

// some/every - test
const hasAdult = users.some((u) => u.age >= 25);
const allAdults = users.every((u) => u.age >= 18);

// sort
const sorted = users.sort((a, b) => a.age - b.age);

// forEach
users.forEach((u) => console.log(u.name));

// Custom HOF: Compose
const compose =
	(...fns) =>
	(x) =>
		fns.reduceRight((v, f) => f(v), x);
const pipe =
	(...fns) =>
	(x) =>
		fns.reduce((v, f) => f(v), x);

const toUpper = (s) => s.toUpperCase();
const exclaim = (s) => s + "!";
const shout = compose(exclaim, toUpper);

console.log(shout("hello")); // "HELLO!"

// ================================================================================
// 09. CLOSURES
// ================================================================================

// Basic closure
function outer() {
	let count = 0;

	function inner() {
		count++;
		return count;
	}

	return inner;
}

const counter1 = outer();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = outer(); // Separate closure
console.log(counter2()); // 1

// Practical: Private variables
function createBankAccount(initialBalance) {
	let balance = initialBalance;
	const transactions = [];

	return {
		deposit(amount) {
			balance += amount;
			transactions.push({ type: "deposit", amount, date: new Date() });
			return balance;
		},
		withdraw(amount) {
			if (amount > balance) throw new Error("Insufficient funds");
			balance -= amount;
			transactions.push({ type: "withdraw", amount, date: new Date() });
			return balance;
		},
		getBalance() {
			return balance;
		},
		getHistory() {
			return [...transactions];
		},
	};
}

const accountok = createBankAccount(1000);
accountok.deposit(500);
console.log(accountok.getBalance()); // 1500
console.log(accountok.balance); // undefined (private)

// Closure in loops (classic problem)
for (var i = 0; i < 3; i++) {
	setTimeout(() => console.log(i), 100); // 3, 3, 3 (wrong)
}

// Solution 1: IIFE
for (var i = 0; i < 3; i++) {
	(function (index) {
		setTimeout(() => console.log(index), 100); // 0, 1, 2
	})(i);
}

// Solution 2: let (block scope)
for (let i = 0; i < 3; i++) {
	setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// Module pattern with closure
const DataModule = (function () {
	let data = [];

	return {
		add(item) {
			data.push(item);
		},
		getAll() {
			return [...data];
		},
		clear() {
			data = [];
		},
	};
})();

// ================================================================================
// 10. SCOPE & HOISTING
// ================================================================================

// Global scope
let globalVar = "I am global";

function testScope() {
	// Function scope
	let functionVar = "I am function scoped";

	if (true) {
		// Block scope (let, const)
		let blockVar = "I am block scoped";
		const alsoBlock = "Me too";
		var notBlock = "I am function scoped (var ignores block)";
	}

	// console.log(blockVar); // Error
	console.log(notBlock); // Works
}

// Hoisting
console.log(hoistedVar); // undefined (var is hoisted)
var hoistedVar = "I am hoisted";

// console.log(notHoisted); // Error (let/const not hoisted)
let notHoisted = "I am not hoisted";

// Function hoisting
sayHi(); // Works (function declaration is hoisted)
function sayHi() {
	console.log("Hi");
}

// sayHello(); // Error (function expression not hoisted)
const sayHello = function () {
	console.log("Hello");
};

// Temporal Dead Zone (TDZ)
{
	// TDZ starts
	// console.log(value); // Error
	let value = "safe"; // TDZ ends
}

// ================================================================================
// 11. THIS KEYWORD
// ================================================================================

// Global context (browser: window, node: global)
console.log(this); // Window or {}

// Function context
function showThis() {
	console.log(this);
}
showThis(); // Window (non-strict) or undefined (strict)

// Method context
const user = {
	name: "Rahim",
	greet() {
		console.log("Hello, " + this.name);
	},
};
user.greet(); // "Hello, Rahim"

// Losing 'this' context
const greet = user.greet;
greet(); // "Hello, undefined" (or window.name)

// Fixing with bind
const boundGreet = user.greet.bind(user);
boundGreet(); // "Hello, Rahim"

// Arrow functions don't bind their own 'this'
const arrowUser = {
	name: "Karim",
	greet: () => {
		console.log("Hi, " + this.name); // this is from outer scope
	},
	greetProperly() {
		const arrow = () => {
			console.log("Hi, " + this.name); // inherits this
		};
		arrow();
	},
};

// Constructor context
function Person(name) {
	this.name = name;
}
const rahim = new Person("Rahim");
console.log(rahim.name); // "Rahim"

// Event handler context
button.addEventListener("click", function () {
	console.log(this); // button element
});

button.addEventListener("click", () => {
	console.log(this); // outer scope (window)
});

// ================================================================================
// 12. CALL, APPLY, BIND
// ================================================================================

function introduce(greeting, punctuation) {
	console.log(`${greeting}, I am ${this.name}${punctuation}`);
}

const person1 = { name: "Rahim" };
const person2 = { name: "Karim" };

// call - invoke with specific this, comma-separated args
introduce.call(person1, "Hello", "!"); // "Hello, I am Rahim!"

// apply - invoke with specific this, array of args
introduce.apply(person2, ["Hi", "."]); // "Hi, I am Karim."

// bind - returns new function with bound this
const rahimIntro = introduce.bind(person1);
rahimIntro("Hey", "?"); // "Hey, I am Rahim?"

// bind with partial application
const rahimHello = introduce.bind(person1, "Hello");
rahimHello("!!!"); // "Hello, I am Rahim!!!"

// Practical: Borrowing methods
const arr = Array.prototype.slice.call(arguments);
const nums = [1, 2, 3];
const max = Math.max.apply(null, nums); // 3

// Modern alternative: spread operator
const max2 = Math.max(...nums);

// ================================================================================
// 13. CONSTRUCTOR FUNCTIONS
// ================================================================================

// Old way (before ES6 classes)
function Car(make, model, year) {
	// this = {}
	this.make = make;
	this.model = model;
	this.year = year;
	this.running = false;
	// return this (implicitly)
}

Car.prototype.start = function () {
	this.running = true;
	console.log(`${this.make} ${this.model} started`);
};

Car.prototype.stop = function () {
	this.running = false;
	console.log(`${this.make} ${this.model} stopped`);
};

const myCar = new Car("Toyota", "Corolla", 2023);
myCar.start();

// instanceof
console.log(myCar instanceof Car); // true

// Constructor with default values
function User(name, role = "user", active = true) {
	this.name = name;
	this.role = role;
	this.active = active;
	this.createdAt = new Date();
}

// Safe constructor (without new)
function SafeUser(name) {
	if (!(this instanceof SafeUser)) {
		return new SafeUser(name);
	}
	this.name = name;
}

// ================================================================================
// 14. PROTOTYPES
// ================================================================================

// Every function has a prototype property
function Animal(name) {
	this.name = name;
}

Animal.prototype.speak = function () {
	console.log(`${this.name} makes a sound`);
};

Animal.prototype.toString = function () {
	return `Animal: ${this.name}`;
};

const dog = new Animal("Dog");
dog.speak();

// Prototype chain
console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true

// Checking prototype
console.log(Animal.prototype.isPrototypeOf(dog)); // true

// Object.create - create object with specific prototype
const catPrototype = {
	init(name) {
		this.name = name;
		return this;
	},
	speak() {
		console.log("Meow");
	},
};

const cat = Object.create(catPrototype).init("Whiskers");
cat.speak();

// Modifying built-in prototypes (generally avoid)
Array.prototype.last = function () {
	return this[this.length - 1];
};
console.log([1, 2, 3].last()); // 3

// ================================================================================
// 15. CLASSES (ES6+)
// ================================================================================

// Class declaration
class Rectangle {
	// Constructor
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	// Instance method
	area() {
		return this.width * this.height;
	}

	// Getter
	get isSquare() {
		return this.width === this.height;
	}

	// Setter
	set dimensions({ width, height }) {
		this.width = width;
		this.height = height;
	}

	// Static method
	static createSquare(side) {
		return new Rectangle(side, side);
	}
}

const rect = new Rectangle(10, 20);
console.log(rect.area()); // 200

// Class expression
const Circle = class {
	constructor(radius) {
		this.radius = radius;
	}

	get area() {
		return Math.PI * this.radius ** 2;
	}
};

// Inheritance
class Square extends Rectangle {
	constructor(side) {
		super(side, side); // Call parent constructor
		this.side = side;
	}

	// Override method
	area() {
		console.log("Square area:");
		return super.area();
	}
}

const sq = new Square(5);
console.log(sq.area());

// ================================================================================
// 16. STATIC METHODS
// ================================================================================

class MathUtils {
	// Static property (ES2022)
	static PI = 3.14159;

	static add(a, b) {
		return a + b;
	}

	static multiply(a, b) {
		return a * b;
	}

	static randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Static block (ES2022)
	static {
		console.log("MathUtils initialized");
		this.version = "1.0";
	}
}

console.log(MathUtils.add(2, 3)); // 5
console.log(MathUtils.PI); // 3.14159

// Factory pattern with static methods
class User {
	constructor(name, role) {
		this.name = name;
		this.role = role;
	}

	static createAdmin(name) {
		const admin = new User(name, "admin");
		admin.permissions = ["all"];
		return admin;
	}

	static createGuest() {
		return new User("Guest", "guest");
	}
}

// ================================================================================
// 17. PRIVATE METHODS & FIELDS (ES2022)
// ================================================================================

class BankAccount {
	// Private field
	#balance = 0;

	// Private static field
	static #accountCounter = 0;

	constructor(owner, initialDeposit = 0) {
		this.owner = owner;
		this.#balance = initialDeposit;
		this.accountNumber = ++BankAccount.#accountCounter;
	}

	// Public method
	deposit(amount) {
		if (amount <= 0) throw new Error("Invalid amount");
		this.#updateBalance(amount);
		this.#logTransaction("deposit", amount);
		return this.#balance;
	}

	withdraw(amount) {
		if (amount > this.#balance) throw new Error("Insufficient funds");
		this.#updateBalance(-amount);
		this.#logTransaction("withdraw", amount);
		return this.#balance;
	}

	getBalance() {
		return this.#balance;
	}

	// Private method
	#updateBalance(amount) {
		this.#balance += amount;
	}

	#logTransaction(type, amount) {
		console.log(`${type}: $${amount}`);
	}

	// Private static method
	static #validateAccountNumber(num) {
		return num > 0 && num <= this.#accountCounter;
	}
}

const account = new BankAccount("Rahim", 1000);
console.log(account.getBalance()); // 1000
// console.log(account.#balance); // SyntaxError: Private field

// ================================================================================
// 18. GETTERS & SETTERS
// ================================================================================

class Temperature {
	constructor(celsius) {
		this._celsius = celsius;
	}

	// Getter
	get celsius() {
		return this._celsius;
	}

	// Setter with validation
	set celsius(value) {
		if (value < -273.15) {
			throw new Error("Temperature below absolute zero");
		}
		this._celsius = value;
	}

	// Computed getter
	get fahrenheit() {
		return (this._celsius * 9) / 5 + 32;
	}

	set fahrenheit(value) {
		this._celsius = ((value - 32) * 5) / 9;
	}

	// Getter only
	get kelvin() {
		return this._celsius + 273.15;
	}
}

const temp = new Temperature(25);
console.log(temp.fahrenheit); // 77
temp.fahrenheit = 100;
console.log(temp.celsius); // 37.777...

// Object getters/setters
const userProfile = {
	firstName: "Rahim",
	lastName: "Khan",

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	},

	set fullName(name) {
		[this.firstName, this.lastName] = name.split(" ");
	},
};

console.log(userProfile.fullName); // "Rahim Khan"
userProfile.fullName = "Karim Ahmed";
console.log(userProfile.firstName); // "Karim"

// ================================================================================
// 19. INHERITANCE
// ================================================================================

// Base class
class Animal {
	constructor(name) {
		this.name = name;
		this.energy = 100;
	}

	eat() {
		this.energy += 10;
		console.log(`${this.name} is eating`);
	}

	sleep() {
		this.energy = 100;
		console.log(`${this.name} is sleeping`);
	}

	makeSound() {
		console.log("Some generic sound");
	}
}

// Derived class
class Dog extends Animal {
	constructor(name, breed) {
		super(name); // Must call super before using this
		this.breed = breed;
	}

	makeSound() {
		console.log("Woof! Woof!");
	}

	fetch() {
		this.energy -= 10;
		console.log(`${this.name} is fetching`);
	}
}

// Multi-level inheritance
class Puppy extends Dog {
	constructor(name, breed, age) {
		super(name, breed);
		this.age = age;
	}

	whine() {
		console.log("Whining...");
	}
}

const puppy = new Puppy("Max", "Labrador", 0.5);
puppy.eat(); // Inherited from Animal
puppy.fetch(); // Inherited from Dog
puppy.whine(); // Own method

// Method overriding
class Cat extends Animal {
	makeSound() {
		super.makeSound(); // Call parent method
		console.log("Meow!");
	}
}

// instanceof
console.log(puppy instanceof Puppy); // true
console.log(puppy instanceof Dog); // true
console.log(puppy instanceof Animal); // true

// ================================================================================
// 20. MIXINS
// ================================================================================

// Mixin as function
const Flyable = (Base) =>
	class extends Base {
		fly() {
			console.log(`${this.name} is flying`);
		}

		land() {
			console.log(`${this.name} landed`);
		}
	};

const Swimmable = (Base) =>
	class extends Base {
		swim() {
			console.log(`${this.name} is swimming`);
		}

		dive() {
			console.log(`${this.name} dived`);
		}
	};

// Apply mixins
class Bird extends Flyable(Animal) {
	constructor(name) {
		super(name);
	}
}

class Duck extends Swimmable(Flyable(Animal)) {
	constructor(name) {
		super(name);
	}
}

const duck = new Duck("Donald");
duck.fly(); // From Flyable
duck.swim(); // From Swimmable
duck.eat(); // From Animal

// Multiple mixins helper
const mix = (Base, ...mixins) => {
	return mixins.reduce((acc, mixin) => mixin(acc), Base);
};

class SuperAnimal extends mix(Animal, Flyable, Swimmable) {}

// Object mixins
const TimestampMixin = {
	createdAt: new Date(),
	getAge() {
		return Date.now() - this.createdAt;
	},
};

const LoggableMixin = {
	log(message) {
		console.log(`[${this.constructor.name}] ${message}`);
	},
};

class Product {
	constructor(name) {
		this.name = name;
		Object.assign(this, TimestampMixin, LoggableMixin);
	}
}

// ================================================================================
// 21. GENERATORS
// ================================================================================

// Basic generator
function* simpleGenerator() {
	yield 1;
	yield 2;
	yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Generator with loop
function* range(start, end) {
	for (let i = start; i <= end; i++) {
		yield i;
	}
}

for (const num of range(1, 5)) {
	console.log(num); // 1, 2, 3, 4, 5
}

// Infinite generator
function* idGenerator() {
	let id = 1;
	while (true) {
		yield id++;
	}
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2

// Generator with return
function* withReturn() {
	yield 1;
	yield 2;
	return "finished";
	yield 3; // Never reached
}

// Delegating generators
function* combined() {
	yield* [1, 2, 3];
	yield* "abc";
	yield* range(10, 12);
}

// Practical: Paginated data
function* fetchPages(url) {
	let page = 1;
	let hasMore = true;

	while (hasMore) {
		const response = yield fetch(`${url}?page=${page}`);
		hasMore = response.hasMore;
		page++;
		yield response.data;
	}
}

// Generator methods in classes
class Collection {
	constructor(items) {
		this.items = items;
	}

	*[Symbol.iterator]() {
		for (const item of this.items) {
			yield item;
		}
	}

	*filter(predicate) {
		for (const item of this.items) {
			if (predicate(item)) {
				yield item;
			}
		}
	}
}

const coll = new Collection([1, 2, 3, 4, 5]);
for (const item of coll.filter((x) => x > 2)) {
	console.log(item); // 3, 4, 5
}

// ================================================================================
// 22. ASYNC FUNCTIONS
// ================================================================================

// Basic async function
async function fetchUser(id) {
	return { id, name: "User " + id }; // Returns Promise
}

// Async with await
async function getUserDetails(userId) {
	try {
		const user = await fetchUser(userId);
		const posts = await fetchPosts(userId);
		return { ...user, posts };
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

// Async function expression
const processData = async function (data) {
	const result = await validate(data);
	return await transform(result);
};

// Async arrow function
const fetchAll = async (urls) => {
	const promises = urls.map((url) => fetch(url));
	return await Promise.all(promises);
};

// Sequential execution
async function processSequentially(items) {
	const results = [];
	for (const item of items) {
		const result = await processItem(item); // Wait for each
		results.push(result);
	}
	return results;
}

// Parallel execution
async function processInParallel(items) {
	const promises = items.map((item) => processItem(item));
	return await Promise.all(promises); // All at once
}

// Mixed: Batches
async function processInBatches(items, batchSize) {
	const results = [];
	for (let i = 0; i < items.length; i += batchSize) {
		const batch = items.slice(i, i + batchSize);
		const batchResults = await Promise.all(
			batch.map((item) => processItem(item))
		);
		results.push(...batchResults);
	}
	return results;
}

// Async IIFE
(async () => {
	const data = await fetchData();
	console.log(data);
})();

// ================================================================================
// 23. PROMISES
// ================================================================================

// Creating a Promise
const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		const success = true;
		if (success) {
			resolve("Data loaded");
		} else {
			reject(new Error("Failed to load"));
		}
	}, 1000);
});

// Consuming promises
promise
	.then((result) => {
		console.log(result);
		return result.toUpperCase();
	})
	.then((upperResult) => {
		console.log(upperResult);
	})
	.catch((error) => {
		console.error(error.message);
	})
	.finally(() => {
		console.log("Cleanup");
	});

// Promise.resolve / Promise.reject
const resolved = Promise.resolve(42);
const rejected = Promise.reject(new Error("Oops"));

// Promise.all - wait for all
const promises = [
	fetch("/api/users"),
	fetch("/api/posts"),
	fetch("/api/comments"),
];

Promise.all(promises)
	.then(([users, posts, comments]) => {
		console.log("All loaded");
	})
	.catch((error) => {
		console.log("One failed:", error);
	});

// Promise.allSettled - wait for all, never rejects
Promise.allSettled(promises).then((results) => {
	results.forEach((result) => {
		if (result.status === "fulfilled") {
			console.log("Success:", result.value);
		} else {
			console.log("Error:", result.reason);
		}
	});
});

// Promise.race - first to settle
Promise.race([
	fetch("/api/fast"),
	new Promise((_, reject) =>
		setTimeout(() => reject(new Error("Timeout")), 5000)
	),
]);

// Promise.any - first to fulfill (ES2021)
Promise.any(promises)
	.then((firstSuccess) => console.log(firstSuccess))
	.catch((allErrors) => console.log(allErrors.errors));

// Promisify callback
function promisify(fn) {
	return function (...args) {
		return new Promise((resolve, reject) => {
			fn(...args, (err, result) => {
				if (err) reject(err);
				else resolve(result);
			});
		});
	};
}

// ================================================================================
// 24. ASYNC/AWAIT PATTERNS
// ================================================================================

// Error handling with try/catch
async function robustFetch(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error(`Fetch failed for ${url}:`, error);
		return null; // or throw, or return default
	}
}

// Parallel with async/await
async function fetchDashboardData() {
	const [user, posts, notifications] = await Promise.all([
		fetchUser(),
		fetchPosts(),
		fetchNotifications(),
	]);
	return { user, posts, notifications };
}

// Sequential with condition
async function processWorkflow(data) {
	const step1 = await validate(data);
	if (!step1.valid) return { error: "Invalid" };

	const step2 = await enrich(step1);
	const step3 = await transform(step2);

	return await save(step3);
}

// Retry logic
async function fetchWithRetry(url, maxRetries = 3) {
	for (let i = 0; i < maxRetries; i++) {
		try {
			return await fetch(url);
		} catch (error) {
			if (i === maxRetries - 1) throw error;
			await delay(1000 * Math.pow(2, i)); // Exponential backoff
		}
	}
}

// Async iterator
async function* fetchPages(url) {
	let nextUrl = url;
	while (nextUrl) {
		const response = await fetch(nextUrl);
		const data = await response.json();
		yield data.results;
		nextUrl = data.next;
	}
}

// Usage
(async () => {
	for await (const page of fetchPages("/api/items")) {
		console.log(page);
	}
})();

// Top-level await (ES2022, modules only)
// const data = await fetchData();

// ================================================================================
// 25. ERROR HANDLING
// ================================================================================

// Custom error classes
class ValidationError extends Error {
	constructor(message, field) {
		super(message);
		this.name = "ValidationError";
		this.field = field;
	}
}

class DatabaseError extends Error {
	constructor(message, query) {
		super(message);
		this.name = "DatabaseError";
		this.query = query;
	}
}

// Throwing errors
function divide(a, b) {
	if (b === 0) {
		throw new Error("Division by zero");
	}
	return a / b;
}

// Try/catch/finally
try {
	const result = divide(10, 0);
} catch (error) {
	if (error instanceof ValidationError) {
		console.log("Validation failed:", error.field);
	} else {
		console.log("Error:", error.message);
	}
} finally {
	console.log("Cleanup code always runs");
}

// Error in async functions
async function riskyOperation() {
	throw new Error("Something went wrong");
}

// Handling async errors
riskyOperation().catch((error) => {
	console.log("Caught:", error.message);
});

// Global error handling (browser)
window.onerror = (msg, url, line) => {
	console.log(`Error: ${msg} at ${line}`);
	return true; // Prevent default
};

// window.addEventListener('unhandledrejection', event => {
//     console.log('Unhandled promise rejection:', event.reason);
// });

// Defensive programming
function safeDivide(a, b) {
	try {
		return a / b;
	} catch (error) {
		console.error("Divide error:", error);
		return 0; // Default value
	}
}

// Result type pattern (functional)
function safeOperation(fn) {
	return function (...args) {
		try {
			return { success: true, data: fn(...args) };
		} catch (error) {
			return { success: false, error: error.message };
		}
	};
}

// ================================================================================
// 26. FUNCTIONAL PROGRAMMING
// ================================================================================

// Pure functions
const pureAdd = (a, b) => a + b; // Same input → same output, no side effects

// Impure (avoid)
let total = 0;
const impureAdd = (x) => {
	total += x;
	return total;
};

// Immutability
const numbersin = [1, 2, 3];
const newNumbersin = [...numbersin, 4]; // Don't push

const userof = { name: "Rahim", age: 25 };
const updatedUser = { ...userof, age: 26 }; // Don't mutate

// Higher-order functions
const map = (fn) => (arr) => arr.map(fn);
const filter = (predicate) => (arr) => arr.filter(predicate);
const reduce = (fn, init) => (arr) => arr.reduce(fn, init);

// Compose
const composeof =
	(...fns) =>
	(x) =>
		fns.reduceRight((v, f) => f(v), x);

// Pipe
const pipeof =
	(...fns) =>
	(x) =>
		fns.reduce((v, f) => f(v), x);

// Example pipeline
const processUsers = pipe(
	filter((u) => u.active),
	map((u) => ({ name: u.name, age: u.age })),
	reduce((acc, u) => acc + u.age, 0)
);

// Point-free style
const getNames = map((u) => u.name);
const getAdults = filter((u) => u.age >= 18);
const getAdultNames = compose(getNames, getAdults);

// Functor (mapable)
class Container {
	constructor(value) {
		this.value = value;
	}

	map(fn) {
		return new Container(fn(this.value));
	}

	fold(fn) {
		return fn(this.value);
	}
}

// Maybe monad (null safety)
class Maybe {
	constructor(value) {
		this.value = value;
	}

	static of(value) {
		return new Maybe(value);
	}

	isNothing() {
		return this.value === null || this.value === undefined;
	}

	map(fn) {
		return this.isNothing() ? this : new Maybe(fn(this.value));
	}

	getOrElse(defaultValue) {
		return this.isNothing() ? defaultValue : this.value;
	}
}

const userStreet = Maybe.of(user)
	.map((u) => u.address)
	.map((a) => a.street)
	.getOrElse("Unknown");

// ================================================================================
// 27. CURRYING
// ================================================================================

// Basic curry
const curry = (fn) => {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function (...nextArgs) {
				return curried.apply(this, args.concat(nextArgs));
			};
		}
	};
};

// Usage
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6

// Practical example
const filterBy = curry((key, value, arr) =>
	arr.filter((item) => item[key] === value)
);

const filterByRole = filterBy("role");
const filterAdmins = filterByRole("admin");
const filterUsers = filterByRole("user");

const people = [
	{ name: "Rahim", role: "admin" },
	{ name: "Karim", role: "user" },
];

console.log(filterAdmins(people)); // [{ name: "Rahim", role: "admin" }]

// Advanced curry with placeholder
const _ = Symbol("placeholder");

const advancedCurry = (fn) => {
	return function curried(...args) {
		const cleanArgs = args.filter((arg) => arg !== _);

		if (cleanArgs.length >= fn.length) {
			return fn(...args.map((arg) => (arg === _ ? undefined : arg)));
		}

		return function (...nextArgs) {
			let argIndex = 0;
			const mergedArgs = args.map((arg) =>
				arg === _ && argIndex < nextArgs.length ? nextArgs[argIndex++] : arg
			);
			return curried(...mergedArgs, ...nextArgs.slice(argIndex));
		};
	};
};

// ================================================================================
// 28. COMPOSITION
// ================================================================================

// Simple compose
const composein =
	(...fns) =>
	(x) =>
		fns.reduceRight((value, fn) => fn(value), x);

// Simple pipe
const pipein =
	(...fns) =>
	(x) =>
		fns.reduce((value, fn) => fn(value), x);

// Example
const toUpperin = (s) => s.toUpperCase();
const exclaimin = (s) => s + "!";
const repeat = (s) => s + " " + s;

const shoutin = compose(repeat, exclaimin, toUpperin);
const shoutPipein = pipe(toUpperin, exclaimin, repeat);
console.log(shoutin("hello")); // "HELLO! HELLO!"
console.log(shoutPipein("hello")); // "HELLO! HELLO!"
// Compose with multiple arguments
const composeArgs = (...fns) =>
	fns.reduceRight(
		(f, g) =>
			(...args) =>
				f(g(...args))
	);

// Async compose
const asyncCompose =
	(...fns) =>
	(x) =>
		fns.reduceRight(async (value, fn) => fn(await value), x);

// Tap (for debugging in pipeline)
const tap = (fn) => (x) => {
	fn(x);
	return x;
};

const loggedShout = pipe(
	toUpper,
	tap(console.log),
	exclaim,
	tap(console.log),
	repeat
);

// Trace
const trace = (label) => (value) => {
	console.log(`${label}:`, value);
	return value;
};

// ================================================================================
// 29. PIPELINING
// ================================================================================

// Pipeline operator proposal (|>) - not standard yet
// const result = value |> double |> addOne |> stringify;

// Simulate with pipe function
const double = (x) => x * 2;
const addOne = (x) => x + 1;
const stringify = (x) => String(x);

const resultin = pipe(double, addOne, stringify)(5); // "11"

// Object pipeline
const processOrder = pipe(
	(order) => ({ ...order, validated: true }),
	(order) => ({
		...order,
		total: order.items.reduce((a, b) => a + b.price, 0),
	}),
	(order) => ({ ...order, tax: order.total * 0.1 }),
	(order) => ({ ...order, grandTotal: order.total + order.tax })
);

// Pipeline class
class Pipeline {
	constructor(value) {
		this.value = value;
	}

	pipe(fn) {
		this.value = fn(this.value);
		return this;
	}

	tap(fn) {
		fn(this.value);
		return this;
	}

	valueOf() {
		return this.value;
	}
}

const processed = new Pipeline(5)
	.pipe(double)
	.tap(console.log) // 10
	.pipe(addOne)
	.valueOf(); // 11

// ================================================================================
// 30. MEMOIZATION
// ================================================================================

// Simple memoization
const memoize = (fn) => {
	const cache = new Map();

	return function (...args) {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key);
		}

		const result = fn.apply(this, args);
		cache.set(key, result);
		return result;
	};
};

// Fibonacci with memoization
const fibonacci = memoize((n) => {
	if (n < 2) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(50)); // Fast!

// Memoization with LRU (Least Recently Used)
const memoizeLRU = (fn, maxSize = 100) => {
	const cache = new Map();

	return function (...args) {
		const key = JSON.stringify(args);

		if (cache.has(key)) {
			// Move to end (recently used)
			const value = cache.get(key);
			cache.delete(key);
			cache.set(key, value);
			return value;
		}

		const result = fn.apply(this, args);

		if (cache.size >= maxSize) {
			// Delete oldest (first item)
			const oldestKey = cache.keys().next().value;
			cache.delete(oldestKey);
		}

		cache.set(key, result);
		return result;
	};
};

// WeakMap memoization (for objects)
const memoizeWeak = (fn) => {
	const cache = new WeakMap();

	return function (obj) {
		if (cache.has(obj)) {
			return cache.get(obj);
		}

		const result = fn(obj);
		cache.set(obj, result);
		return result;
	};
};

// ================================================================================
// 31. DEBOUNCE & THROTTLE
// ================================================================================

// Debounce: Execute after pause
const debounce = (fn, delay) => {
	let timeoutId;

	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
};

// Usage: Search input
const searchInput = document.querySelector("#search");
searchInput.addEventListener(
	"input",
	debounce((e) => {
		console.log("Searching for:", e.target.value);
		// API call here
	}, 500)
);

// Debounce with immediate option
const debounceAdvanced = (fn, delay, immediate = false) => {
	let timeoutId;

	return function (...args) {
		const callNow = immediate && !timeoutId;

		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			timeoutId = null;
			if (!immediate) fn.apply(this, args);
		}, delay);

		if (callNow) fn.apply(this, args);
	};
};

// Throttle: Execute at intervals
const throttle = (fn, limit) => {
	let inThrottle;

	return function (...args) {
		if (!inThrottle) {
			fn.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};

// Throttle with trailing call
const throttleAdvanced = (fn, limit) => {
	let lastFunc;
	let lastRan;

	return function (...args) {
		if (!lastRan) {
			fn.apply(this, args);
			lastRan = Date.now();
		} else {
			clearTimeout(lastFunc);
			lastFunc = setTimeout(
				() => {
					if (Date.now() - lastRan >= limit) {
						fn.apply(this, args);
						lastRan = Date.now();
					}
				},
				limit - (Date.now() - lastRan)
			);
		}
	};
};

// Usage: Scroll handler
window.addEventListener(
	"scroll",
	throttle(() => {
		console.log("Scroll position:", window.scrollY);
	}, 100)
);

// ================================================================================
// 32. RECURSION
// ================================================================================

// Factorial
const factorialin = (n) => {
	if (n <= 1) return 1;
	return n * factorial(n - 1);
};

// Fibonacci
const fib = (n) => {
	if (n < 2) return n;
	return fib(n - 1) + fib(n - 2);
};

// Sum array
const sumArray = (arr) => {
	if (arr.length === 0) return 0;
	return arr[0] + sumArray(arr.slice(1));
};

// Deep clone
const deepClone = (obj) => {
	if (obj === null || typeof obj !== "object") return obj;
	if (obj instanceof Date) return new Date(obj);
	if (Array.isArray(obj)) return obj.map(deepClone);

	return Object.fromEntries(
		Object.entries(obj).map(([key, val]) => [key, deepClone(val)])
	);
};

// Tree traversal
const tree = {
	value: 1,
	children: [
		{ value: 2, children: [{ value: 4, children: [] }] },
		{ value: 3, children: [{ value: 5, children: [] }] },
	],
};

const traverseDepth = (node, fn) => {
	fn(node.value);
	node.children.forEach((child) => traverseDepth(child, fn));
};

const traverseBreadth = (root, fn) => {
	const queue = [root];
	while (queue.length > 0) {
		const node = queue.shift();
		fn(node.value);
		queue.push(...node.children);
	}
};

// Flatten nested array
const flatten = (arr) => {
	return arr.reduce((flat, item) => {
		return flat.concat(Array.isArray(item) ? flatten(item) : item);
	}, []);
};

// File system traversal simulation
const getAllFiles = (dir) => {
	let files = [];
	for (const item of dir.contents) {
		if (item.type === "file") {
			files.push(item.name);
		} else {
			files = files.concat(getAllFiles(item));
		}
	}
	return files;
};

// ================================================================================
// 33. TAIL CALL OPTIMIZATION
// ================================================================================

// Bad: Stack grows
function factorialBad(n) {
	if (n <= 1) return 1;
	return n * factorialBad(n - 1); // Must wait for recursive call
}

// Good: Tail call (optimized in strict mode, some engines)
function factorialGood(n, acc = 1) {
	if (n <= 1) return acc;
	return factorialGood(n - 1, n * acc); // Last operation is recursive call
}

// Trampoline for stack safety
const trampoline =
	(fn) =>
	(...args) => {
		let result = fn(...args);
		while (typeof result === "function") {
			result = result();
		}
		return result;
	};

const sumTrampoline = trampoline(function sum(n, acc = 0) {
	if (n <= 0) return acc;
	return () => sum(n - 1, acc + n); // Return thunk
});

console.log(sumTrampoline(100000)); // No stack overflow!

// ================================================================================
// 34. PROXY & REFLECT
// ================================================================================

// Basic proxy
const target = { name: "Rahim", age: 25 };
const handler = {
	get(target, prop) {
		console.log(`Getting ${String(prop)}`);
		return target[prop];
	},
	set(target, prop, value) {
		console.log(`Setting ${String(prop)} to ${value}`);
		target[prop] = value;
		return true;
	},
};

const proxy = new Proxy(target, handler);
proxy.name; // Logs: Getting name
proxy.age = 26; // Logs: Setting age to 26

// Validation proxy
const validator = {
	set(target, prop, value) {
		if (prop === "age" && typeof value !== "number") {
			throw new TypeError("Age must be a number");
		}
		if (prop === "age" && value < 0) {
			throw new RangeError("Age cannot be negative");
		}
		target[prop] = value;
		return true;
	},
};

const person = new Proxy({}, validator);
person.age = 25; // OK
// person.age = "old"; // TypeError
// person.age = -5; // RangeError

// Private properties proxy
const withPrivate = (obj, privatePrefix = "_") => {
	return new Proxy(obj, {
		get(target, prop) {
			if (String(prop).startsWith(privatePrefix)) {
				throw new Error(`Private property ${String(prop)}`);
			}
			return target[prop];
		},
		set(target, prop, value) {
			if (String(prop).startsWith(privatePrefix)) {
				throw new Error(`Cannot set private ${String(prop)}`);
			}
			target[prop] = value;
			return true;
		},
		ownKeys(target) {
			return Object.keys(target).filter((k) => !k.startsWith(privatePrefix));
		},
	});
};

// Revocable proxy
const { proxy: revocableProxy, revoke } = Proxy.revocable(
	{ data: "secret" },
	{}
);
console.log(revocableProxy.data); // "secret"
revoke();
// console.log(revocableProxy.data); // TypeError: Revoked

// Reflect API
const objectin = { x: 1, y: 2 };
Reflect.set(objectin, "z", 3); // true
Reflect.has(objectin, "x"); // true
Reflect.deleteProperty(objectin, "y"); // true
Reflect.ownKeys(objectin); // ['x', 'z']
// ================================================================================
// 35. SYMBOL & ITERATORS
// ================================================================================

// Symbols
const id = Symbol("id");
const secret = Symbol("secret");

const userin = {
	name: "Rahim",
	[id]: 12345,
	[secret]: "hidden",
};

console.log(user.name); // "Rahim"
console.log(user[id]); // 12345
console.log(Object.keys(user)); // ["name"] - symbols not enumerable

// Well-known symbols
const iterable = {
	[Symbol.iterator]() {
		let i = 0;
		return {
			next() {
				if (i < 5) {
					return { value: i++, done: false };
				}
				return { done: true };
			},
		};
	},
};

for (const num of iterable) {
	console.log(num); // 0, 1, 2, 3, 4
}

// Generator as iterator
function* range(start, end) {
	for (let i = start; i <= end; i++) {
		yield i;
	}
}

// Async iterator
const asyncIterable = {
	[Symbol.asyncIterator]: async function* () {
		yield await Promise.resolve(1);
		yield await Promise.resolve(2);
		yield await Promise.resolve(3);
	},
};

(async () => {
	for await (const num of asyncIterable) {
		console.log(num);
	}
})();

// Custom iterator class
class Collection {
	constructor(items) {
		this.items = items;
	}

	*[Symbol.iterator]() {
		for (const item of this.items) {
			yield item;
		}
	}

	*entries() {
		for (let i = 0; i < this.items.length; i++) {
			yield [i, this.items[i]];
		}
	}

	*filter(predicate) {
		for (const item of this.items) {
			if (predicate(item)) {
				yield item;
			}
		}
	}

	*map(transform) {
		for (const item of this.items) {
			yield transform(item);
		}
	}
}

const collin = new Collection([1, 2, 3, 4, 5]);
for (const item of collin.filter((x) => x > 2).map((x) => x * 2)) {
	console.log(item); // 6, 8, 10
}

// ================================================================================
// 36. REAL-WORLD EXAMPLES
// ================================================================================

// Example 1: Complete Data Service
class DataService {
	#cache = new Map();
	#baseUrl;

	constructor(baseUrl) {
		this.#baseUrl = baseUrl;
	}

	async fetch(endpoint, options = {}) {
		const url = `${this.#baseUrl}${endpoint}`;
		const cacheKey = `${url}${JSON.stringify(options)}`;

		if (this.#cache.has(cacheKey) && !options.noCache) {
			return this.#cache.get(cacheKey);
		}

		try {
			const response = await fetch(url, {
				...options,
				headers: {
					"Content-Type": "application/json",
					...options.headers,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}

			const data = await response.json();

			if (options.cache !== false) {
				this.#cache.set(cacheKey, data);
			}

			return data;
		} catch (error) {
			console.error(`Fetch error for ${url}:`, error);
			throw error;
		}
	}

	clearCache() {
		this.#cache.clear();
	}

	*getCacheKeys() {
		for (const key of this.#cache.keys()) {
			yield key;
		}
	}
}

// Example 2: Event Emitter
class EventEmitter {
	#events = new Map();
	#maxListeners = 10;

	on(event, listener) {
		if (!this.#events.has(event)) {
			this.#events.set(event, new Set());
		}

		const listeners = this.#events.get(event);
		if (listeners.size >= this.#maxListeners) {
			console.warn(`Max listeners exceeded for ${event}`);
		}

		listeners.add(listener);

		return () => this.off(event, listener); // Unsubscribe function
	}

	once(event, listener) {
		const onceWrapper = (...args) => {
			this.off(event, onceWrapper);
			listener(...args);
		};
		return this.on(event, onceWrapper);
	}

	off(event, listener) {
		this.#events.get(event)?.delete(listener);
	}

	emit(event, ...args) {
		this.#events.get(event)?.forEach((listener) => {
			try {
				listener(...args);
			} catch (error) {
				console.error(`Error in listener for ${event}:`, error);
			}
		});
	}

	async emitAsync(event, ...args) {
		const listeners = this.#events.get(event);
		if (!listeners) return;

		const promises = Array.from(listeners).map((listener) =>
			Promise.resolve().then(() => listener(...args))
		);

		await Promise.all(promises);
	}

	listenerCount(event) {
		return this.#events.get(event)?.size || 0;
	}

	removeAllListeners(event) {
		if (event) {
			this.#events.delete(event);
		} else {
			this.#events.clear();
		}
	}

	*[Symbol.iterator]() {
		for (const [event, listeners] of this.#events) {
			yield { event, count: listeners.size };
		}
	}
}

// Example 3: State Manager (Redux-like)
const createStore = (reducer, initialState) => {
	let state = initialState;
	const listeners = new Set();

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener(state));
		return action;
	};

	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};

	// Initialize
	dispatch({ type: "@@INIT" });

	return { getState, dispatch, subscribe };
};

// Example 4: Validation Pipeline
const createValidator = (...rules) => {
	return (value) => {
		for (const rule of rules) {
			const result = rule(value);
			if (result !== true) {
				return result;
			}
		}
		return true;
	};
};

const required =
	(msg = "Required") =>
	(value) =>
		(value !== undefined && value !== null && value !== "") || msg;

const minLength = (min) => (value) =>
	value.length >= min || `Minimum ${min} characters`;

const email = (value) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email";

const validateEmail = createValidator(required(), minLength(5), email);

console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("")); // 'Required'
console.log(validateEmail("abc")); // 'Invalid email'

// ================================================================================
// 37. DESIGN PATTERNS
// ================================================================================

// Singleton
const Singleton = (function () {
	let instance;

	function createInstance() {
		return { data: "I am the instance" };
	}

	return {
		getInstance() {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		},
	};
})();

// Module Pattern
const myModulein = (function () {
	let privateVar = 0;

	function privateMethod() {
		return privateVar;
	}

	return {
		publicMethod() {
			return privateMethod();
		},
		increment() {
			privateVar++;
		},
	};
})();

// Factory Pattern
class UserFactory {
	static create(type, name) {
		switch (type) {
			case "admin":
				return new Admin(name);
			case "guest":
				return new Guest(name);
			default:
				return new User(name);
		}
	}
}

// Observer Pattern
class Subject {
	constructor() {
		this.observers = [];
	}

	subscribe(observer) {
		this.observers.push(observer);
	}

	unsubscribe(observer) {
		this.observers = this.observers.filter((obs) => obs !== observer);
	}

	notify(data) {
		this.observers.forEach((observer) => observer.update(data));
	}
}

// Strategy Pattern
const strategies = {
	creditCard: (amount) => amount * 1.02, // 2% fee
	paypal: (amount) => amount * 1.03, // 3% fee
	crypto: (amount) => amount * 1.01, // 1% fee
};

const calculateTotal = (strategy, amount) => strategies[strategy](amount);

// Decorator Pattern
const withLogging =
	(fn) =>
	(...args) => {
		console.log("Input:", args);
		const result = fn(...args);
		console.log("Output:", result);
		return result;
	};

const withValidation =
	(validator) =>
	(fn) =>
	(...args) => {
		if (!validator(...args)) {
			throw new Error("Validation failed");
		}
		return fn(...args);
	};

// Command Pattern
class Command {
	execute() {}
	undo() {}
}

class AddCommand extends Command {
	constructor(receiver, value) {
		super();
		this.receiver = receiver;
		this.value = value;
	}

	execute() {
		this.receiver.add(this.value);
	}

	undo() {
		this.receiver.subtract(this.value);
	}
}

// ================================================================================
// 38. PERFORMANCE TIPS
// ================================================================================

// 1. Avoid closures in loops (use let or IIFE)
for (let i = 0; i < 10; i++) {
	/* OK with let */
}

// 2. Debounce/Throttle expensive operations
const expensive = debounce(() => {
	/* ... */
}, 100);

// 3. Use object pools for frequently created objects
class ObjectPool {
	constructor(factory, size = 10) {
		this.factory = factory;
		this.available = Array(size)
			.fill(null)
			.map(() => factory());
		this.inUse = new Set();
	}

	acquire() {
		if (this.available.length === 0) {
			this.available.push(this.factory());
		}
		const obj = this.available.pop();
		this.inUse.add(obj);
		return obj;
	}

	release(obj) {
		this.inUse.delete(obj);
		this.available.push(obj);
	}
}

// 4. Memoize pure functions
const memoizedFib = memoize(fibonacci);

// 5. Use requestAnimationFrame for animations
function animate() {
	// Update animation
	requestAnimationFrame(animate);
}

// 6. Lazy loading with generators
function* lazyLoad(items) {
	for (const item of items) {
		yield heavyProcessing(item);
	}
}

// 7. Avoid nested functions in hot paths
// Bad: Creates new function every call
function process(items) {
	return items.map((item) => {
		const transform = (x) => x * 2; // Created every time!
		return transform(item);
	});
}

// Good: Define outside
const transform = (x) => x * 2;
function processGood(items) {
	return items.map(transform);
}

// 8. Use WeakMap/WeakSet for private data to allow GC
const privateData = new WeakMap();
class MyClass {
	constructor() {
		privateData.set(this, { secret: "value" });
	}
}

// 9. Batch DOM operations
function updateDOM(elements) {
	// DocumentFragment for multiple inserts
	const fragment = document.createDocumentFragment();
	elements.forEach((el) => fragment.appendChild(el));
	document.body.appendChild(fragment);
}

// 10. Use Web Workers for heavy computation
// const worker = new Worker('worker.js');

// ================================================================================
// 39. COMMON MISTAKES
// ================================================================================

// Mistake 1: this binding
const objin = {
	name: "Test",
	// Wrong: arrow function doesn't bind this
	greetWrong: () => console.log(this.name), // undefined

	// Right: regular function
	greetRight() {
		console.log(this.name);
	},

	// Alternative: arrow in method (preserves outer this)
	delayedGreet() {
		setTimeout(() => {
			console.log(this.name); // Works!
		}, 100);
	},
};

// Mistake 2: Closure in loop
for (var i = 0; i < 3; i++) {
	setTimeout(() => console.log(i), 100); // 3, 3, 3
}
// Fix: Use let instead of var

// Mistake 3: Mutating arguments
function addToArray(arr, item) {
	arr.push(item); // Mutates original!
	return arr;
}
// Fix: return new array
function addToArraySafe(arr, item) {
	return [...arr, item];
}

// Mistake 4: Floating promises
async function bad() {
	fetch("/api/data"); // Forgot await!
}
// Fix: Always await or handle promise
async function good() {
	await fetch("/api/data");
}

// Mistake 5: try/catch in async
async function badError() {
	try {
		fetch("/api/data"); // Missing await!
	} catch (e) {
		// Never catches fetch errors
	}
}
// Fix: await the promise
async function goodError() {
	try {
		await fetch("/api/data");
	} catch (e) {
		// Catches errors properly
	}
}

// Mistake 6: == vs ===
0 == "0"; // true (coercion)
0 === "0"; // false (strict)

// Mistake 7: typeof null
typeof null === "object"; // true!

// Mistake 8: Deleting array elements
const arrin = [1, 2, 3];
delete arr[1]; // [1, empty, 3] - length still 3!
// Fix: use splice
arr.splice(1, 1); // [1, 3]

// Mistake 9: Not handling Promise rejections
fetch("/api").then((data) => data.json()); // Unhandled rejection!
// Fix: Always add catch
fetch("/api")
	.then((data) => data.json())
	.catch((error) => console.error(error));

// Mistake 10: Blocking main thread
function blocking() {
	const start = Date.now();
	while (Date.now() - start < 5000) {} // Blocks for 5s!
}
// Fix: Use async or split work

// ================================================================================
// 40. INTERVIEW QUESTIONS
// ================================================================================

// Q1: What is the output?
console.log(typeof typeof 1); // "string"

// Q2: Implement Array.prototype.map
Array.prototype.myMap = function (callback) {
	const result = [];
	for (let i = 0; i < this.length; i++) {
		result.push(callback(this[i], i, this));
	}
	return result;
};

// Q3: Implement Promise.all
function promiseAll(promises) {
	return new Promise((resolve, reject) => {
		const results = [];
		let completed = 0;

		if (promises.length === 0) {
			resolve(results);
			return;
		}

		promises.forEach((promise, index) => {
			Promise.resolve(promise)
				.then((result) => {
					results[index] = result;
					completed++;
					if (completed === promises.length) {
						resolve(results);
					}
				})
				.catch(reject);
		});
	});
}

// Q4: Flatten nested array
const flattenin = (arr) =>
	arr.reduce(
		(flat, next) => flat.concat(Array.isArray(next) ? flatten(next) : next),
		[]
	);

// Q5: Deep equality check
function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a !== "object" || a === null || b === null) return false;

	const keysA = Object.keys(a);
	const keysB = Object.keys(b);

	if (keysA.length !== keysB.length) return false;

	return keysA.every((key) => keysB.includes(key) && deepEqual(a[key], b[key]));
}

// Q6: Event delegation
document.getElementById("parent").addEventListener("click", (e) => {
	if (e.target.matches(".child-button")) {
		console.log("Button clicked:", e.target.textContent);
	}
});

// Q7: Currying implementation
const curryin =
	(fn) =>
	(...args) =>
		args.length >= fn.length
			? fn(...args)
			: (...next) => curry(fn)(...args, ...next);

// Q8: Memoization with expiry
function memoizeWithExpiry(fn, ttlMs) {
	const cache = new Map();

	return function (...args) {
		const key = JSON.stringify(args);
		const cached = cache.get(key);

		if (cached && Date.now() - cached.time < ttlMs) {
			return cached.value;
		}

		const result = fn(...args);
		cache.set(key, { value: result, time: Date.now() });
		return result;
	};
}
// Q9: Custom Error class
class ValidationError extends Error {
	constructor(message, field) {
		super(message);
		this.name = "ValidationError";
		this.field = field;
	}
}

// Q10: Throttle implementation
const throttlein = (fn, limit) => {
	let inThrottle;
	return function (...args) {
		if (!inThrottle) {
			fn.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};
