// ============================================
// JAVASCRIPT OBJECT A-Z COMPLETE GUIDE
// ============================================

// ============================================
// A. OBJECT CREATION (অবজেক্ট তৈরির বিভিন্ন উপায়)
// ============================================

// 1. Object Literal (সবচেয়ে সাধারণ)
const person = {
	firstName: "Rahim",
	lastName: "Uddin",
	age: 25,
	isStudent: true,
	skills: ["JavaScript", "Python", "React"],
	address: {
		city: "Dhaka",
		country: "Bangladesh",
	},

	// Method inside object
	getFullName: function () {
		return `${this.firstName} ${this.lastName}`;
	},

	// ES6 shorthand method
	greet() {
		return `Hello, I'm ${this.firstName}`;
	},
};

console.log(person);
// Output: { firstName: 'Rahim', lastName: 'Uddin', age: 25, isStudent: true, skills: ['JavaScript', 'Python', 'React'], address: { city: 'Dhaka', country: 'Bangladesh' }, getFullName: [Function: getFullName], greet: [Function: greet] }

console.log(person.getFullName());
// Output: Rahim Uddin

console.log(person.greet());
// Output: Hello, I'm Rahim

// 2. Object Constructor
const car = new Object();
car.brand = "Toyota";
car.model = "Corolla";
car.year = 2023;

console.log(car);
// Output: { brand: 'Toyota', model: 'Corolla', year: 2023 }

// 3. Constructor Function
function Book(title, author, pages) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.getInfo = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages`;
	};
}

const book1 = new Book("JavaScript Guide", "John Doe", 300);
console.log(book1.getInfo());
// Output: JavaScript Guide by John Doe, 300 pages

// 4. ES6 Class (Modern Approach)
class Animal {
	constructor(name, species) {
		this.name = name;
		this.species = species;
	}

	makeSound(sound) {
		return `${this.name} says ${sound}`;
	}

	// Static method - class level
	static isAnimal(obj) {
		return obj instanceof Animal;
	}
}

const dog = new Animal("Buddy", "Dog");
console.log(dog.makeSound("Woof!"));
// Output: Buddy says Woof!

console.log(Animal.isAnimal(dog));
// Output: true

// ============================================
// B. OBJECT PROPERTIES (প্রোপার্টি অ্যাক্সেস ও ম্যানিপুলেশন)
// ============================================

// Bracket vs Dot Notation
const user = {
	firstName: "Karim",
	"last-name": "Ali", // Special character needs bracket
	age: 30,
};

// Dot notation
console.log(user.firstName); // Output: Karim

// Bracket notation
console.log(user["last-name"]); // Output: Ali
console.log(user["firstName"]); // Output: Karim

// Dynamic property access
const prop = "age";
console.log(user[prop]); // Output: 30

// Property Descriptors
const product = {};

Object.defineProperty(product, "name", {
	value: "Laptop",
	writable: false, // Cannot change value
	enumerable: true, // Shows in loops
	configurable: false, // Cannot delete or modify descriptor
});

console.log(product.name); // Output: Laptop

product.name = "Desktop"; // Silent fail in strict mode
console.log(product.name); // Output: Laptop (unchanged)

// ============================================
// C. CORE OBJECT METHODS (মূল মেথডসমূহ)
// ============================================

const student = {
	name: "Alice",
	grade: "A",
	score: 95,
};

// Object.keys() - Get all keys
const keys = Object.keys(student);
console.log(keys);
// Output: ['name', 'grade', 'score']

// Object.values() - Get all values
const values = Object.values(student);
console.log(values);
// Output: ['Alice', 'A', 95]

// Object.entries() - Get key-value pairs as array
const entries = Object.entries(student);
console.log(entries);
// Output: [['name', 'Alice'], ['grade', 'A'], ['score', 95]]

// Iterate using entries
entries.forEach(([key, value]) => {
	console.log(`${key}: ${value}`);
});
// Output:
// name: Alice
// grade: A
// score: 95

// Object.assign() - Merge/Copy Objects
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { d: 5 };

const merged = Object.assign({}, target, source1, source2);
console.log(merged);
// Output: { a: 1, b: 3, c: 4, d: 5 }

// Shallow copy issue with nested objects
const original = {
	name: "John",
	details: { age: 25 },
};
const copy = Object.assign({}, original);

copy.details.age = 30;
console.log(original.details.age);
// Output: 30 (affected - shallow copy)

// Object.freeze() - Completely immutable
const config = { api: "https://api.example.com", timeout: 5000 };
Object.freeze(config);
config.timeout = 10000; // Silent fail
config.newProp = "test"; // Silent fail
delete config.api; // Silent fail
console.log(config);
// Output: { api: 'https://api.example.com', timeout: 5000 }

// Object.seal() - Can modify values, cannot add/delete
const settings = { theme: "dark", fontSize: 14 };
Object.seal(settings);
settings.theme = "light"; // Works
settings.newProp = "test"; // Silent fail
delete settings.fontSize; // Silent fail
console.log(settings);
// Output: { theme: 'light', fontSize: 14 }

// ============================================
// D. ADVANCED OBJECT PATTERNS (অ্যাডভান্সড প্যাটার্ন)
// ============================================

// Factory Function with Closure
function createCounter() {
	let count = 0; // Private variable (closure)

	return {
		increment() {
			count++;
			return this;
		},
		decrement() {
			count--;
			return this;
		},
		getCount() {
			return count;
		},
		reset() {
			count = 0;
			return this;
		},
	};
}

const counter = createCounter();
console.log(counter.getCount()); // Output: 0
console.log(counter.increment().increment().getCount());
// Output: 2 (method chaining)

// Prototype and Inheritance
const vehiclePrototype = {
	init(make, model) {
		this.make = make;
		this.model = model;
		return this;
	},
	getDetails() {
		return `${this.make} ${this.model}`;
	},
	honk() {
		return "Beep beep!";
	},
};

const myCar = Object.create(vehiclePrototype);
myCar.init("Honda", "Civic");

console.log(myCar.getDetails());
// Output: Honda Civic
console.log(myCar.honk());
// Output: Beep beep!

console.log(Object.getPrototypeOf(myCar) === vehiclePrototype);
// Output: true

// Mixins Pattern
const canFly = {
	fly() {
		return `${this.name} is flying!`;
	},
};

const canSwim = {
	swim() {
		return `${this.name} is swimming!`;
	},
};

const canWalk = {
	walk() {
		return `${this.name} is walking!`;
	},
};

function mixin(target, ...sources) {
	Object.assign(target, ...sources);
}

function Duck(name) {
	this.name = name;
}

mixin(Duck.prototype, canFly, canSwim, canWalk);

const donald = new Duck("Donald");
console.log(donald.fly()); // Output: Donald is flying!
console.log(donald.swim()); // Output: Donald is swimming!
console.log(donald.walk()); // Output: Donald is walking!

// ============================================
// E. MODERN ES6+ OBJECT FEATURES (আধুনিক ফিচার)
// ============================================

// Computed Property Names
const prefix = "user";
const id = 42;

const dynamicObject = {
	[`${prefix}_${id}`]: "John Doe",
	[`${prefix}_info`]: { age: 25, city: "NYC" },

	[`get${prefix}Info`]() {
		return this[`${prefix}_${id}`];
	},
};

console.log(dynamicObject.user_42);
// Output: John Doe
console.log(dynamicObject.getuserInfo());
// Output: John Doe

// Destructuring with Objects
const employee = {
	id: 101,
	name: "Sarah",
	department: "Engineering",
	salary: 75000,
	contact: {
		email: "sarah@company.com",
		phone: "555-0123",
	},
};

// Basic destructuring
const { name, department } = employee;
console.log(name, department);
// Output: Sarah Engineering

// With default values
const { age = 30 } = employee;
console.log(age);
// Output: 30 (default used)

// Nested destructuring
const {
	contact: { email, phone },
} = employee;
console.log(email, phone);
// Output: sarah@company.com 555-0123

// Rest pattern
const { id: empId, ...rest } = employee;
console.log(rest);
// Output: { name: 'Sarah', department: 'Engineering', salary: 75000, contact: { email: 'sarah@company.com', phone: '555-0123' } }

// Renaming
const { name: employeeName, salary: pay } = employee;
console.log(employeeName, pay);
// Output: Sarah 75000

// Spread Operator with Objects
const defaults = { theme: "light", lang: "en", notifications: true };
const userPrefs = { theme: "dark", fontSize: 16 };

const settings2 = { ...defaults, ...userPrefs };
console.log(settings2);
// Output: { theme: 'dark', lang: 'en', notifications: true, fontSize: 16 }

const updated = { ...defaults, theme: "auto", lang: "bn" };
console.log(updated);
// Output: { theme: 'auto', lang: 'bn', notifications: true }

// ============================================
// F. OBJECT ITERATION METHODS (ইটারেশন মেথড)
// ============================================

const scores = { math: 90, science: 85, english: 88 };

// 1. for...in loop
for (let subject in scores) {
	if (scores.hasOwnProperty(subject)) {
		console.log(`${subject}: ${scores[subject]}`);
	}
}
// Output:
// math: 90
// science: 85
// english: 88

// 2. Object.keys() with forEach
Object.keys(scores).forEach((subject) => {
	console.log(`${subject}: ${scores[subject]}`);
});

// 3. Object.entries() with map
const gradeEntries = Object.entries(scores).map(([subject, score]) => {
	const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
	return { subject, score, grade };
});
console.log(gradeEntries);
// Output: [{ subject: 'math', score: 90, grade: 'A' }, { subject: 'science', score: 85, grade: 'B' }, { subject: 'english', score: 88, grade: 'B' }]

// 4. Object.fromEntries() - reverse of entries
const modified = Object.fromEntries(
	Object.entries(scores).map(([k, v]) => [k, v + 5])
);
console.log(modified);
// Output: { math: 95, science: 90, english: 93 }

// ============================================
// G. GETTERS AND SETTERS (অ্যাক্সেসর প্রোপার্টি)
// ============================================

class Temperature {
	constructor(celsius) {
		this._celsius = celsius;
	}

	get celsius() {
		console.log("Getting celsius...");
		return this._celsius;
	}

	set celsius(value) {
		if (value < -273.15) {
			throw new Error("Temperature below absolute zero!");
		}
		console.log("Setting celsius...");
		this._celsius = value;
	}

	get fahrenheit() {
		return (this._celsius * 9) / 5 + 32;
	}

	set fahrenheit(value) {
		this._celsius = ((value - 32) * 5) / 9;
	}

	static get absoluteZero() {
		return -273.15;
	}
}

const temp = new Temperature(25);
console.log(temp.celsius);
// Output: Getting celsius... \n 25

temp.celsius = 30;
// Output: Setting celsius...
console.log(temp.fahrenheit);
// Output: 86

temp.fahrenheit = 98.6;
console.log(temp.celsius);
// Output: Getting celsius... \n 37

console.log(Temperature.absoluteZero);
// Output: -273.15

// ============================================
// H. SYMBOL AND PRIVATE FIELDS (সিম্বল এবং প্রাইভেট ফিল্ড)
// ============================================

// Symbol as Unique Keys
const id2 = Symbol("id");
const secret = Symbol("secret");

const userData = {
	name: "John",
	[id2]: 12345,
	[secret]: "my-password",
};

console.log(userData.name); // Output: John
console.log(userData[id2]); // Output: 12345
console.log(Object.keys(userData)); // Output: ['name']
console.log(Object.getOwnPropertySymbols(userData));
// Output: [Symbol(id), Symbol(secret)]

// Private Class Fields (ES2022)
class BankAccount {
	#balance = 0;
	#transactions = [];

	constructor(owner) {
		this.owner = owner;
	}

	deposit(amount) {
		if (amount <= 0) throw new Error("Invalid amount");
		this.#balance += amount;
		this.#transactions.push({ type: "deposit", amount, date: new Date() });
		return this.#balance;
	}

	withdraw(amount) {
		if (amount > this.#balance) throw new Error("Insufficient funds");
		this.#balance -= amount;
		this.#transactions.push({ type: "withdraw", amount, date: new Date() });
		return this.#balance;
	}

	get balance() {
		return this.#balance;
	}

	#calculateInterest(rate) {
		return this.#balance * rate;
	}

	applyInterest(rate) {
		const interest = this.#calculateInterest(rate);
		this.deposit(interest);
		return interest;
	}
}

const account = new BankAccount("Alice");
account.deposit(1000);
console.log(account.balance); // Output: 1000
// console.log(account.#balance); // SyntaxError: Private field must be declared

// ============================================
// I. PROXY AND REFLECT (প্রক্সি এবং রিফ্লেক্ট)
// ============================================

// Proxy for Validation
const validator = {
	set(target, prop, value) {
		if (prop === "age") {
			if (!Number.isInteger(value)) {
				throw new TypeError("Age must be integer");
			}
			if (value < 0 || value > 150) {
				throw new RangeError("Invalid age range");
			}
		}
		target[prop] = value;
		return true;
	},

	get(target, prop) {
		if (prop in target) {
			console.log(`Accessing ${prop}: ${target[prop]}`);
			return target[prop];
		}
		return `Property ${prop} not found`;
	},
};

const personProxy = new Proxy({}, validator);
personProxy.name = "Bob";
personProxy.age = 25;
console.log(personProxy.name);
// Output: Accessing name: Bob \n Bob

// Proxy for Logging
function createLogger(obj, name) {
	return new Proxy(obj, {
		get(target, prop) {
			console.log(`[${name}] Getting ${String(prop)}`);
			return target[prop];
		},
		set(target, prop, value) {
			console.log(`[${name}] Setting ${String(prop)} = ${value}`);
			target[prop] = value;
			return true;
		},
	});
}

const mathOps = {
	add: (a, b) => a + b,
	multiply: (a, b) => a * b,
};

const loggedMath = createLogger(mathOps, "Math");
console.log(loggedMath.add(5, 3));
// Output: [Math] Getting add \n 8

// ============================================
// J. JSON AND OBJECT SERIALIZATION
// ============================================

const complexObject = {
	name: "Product",
	price: 99.99,
	features: ["fast", "reliable"],
	metadata: { created: new Date() },
	secret: undefined,
	calculate() {
		return this.price * 2;
	},
};

const jsonString = JSON.stringify(complexObject, null, 2);
console.log(jsonString);
/* Output:
{
  "name": "Product",
  "price": 99.99,
  "features": ["fast", "reliable"],
  "metadata": {
    "created": "2024-01-15T10:30:00.000Z"
  }
}
*/

const filteredJSON = JSON.stringify(complexObject, ["name", "price"], 2);
console.log(filteredJSON);
// Output: {"name": "Product", "price": 99.99}

const parsed = JSON.parse(jsonString, (key, value) => {
	if (key === "created") return new Date(value);
	return value;
});
console.log(parsed.metadata.created instanceof Date);
// Output: true

// ============================================
// K. COMPLETE ADVANCED EXAMPLE: E-COMMERCE SYSTEM
// ============================================

const OrderManager = (function () {
	const _items = Symbol("items");
	const _calculateTotal = Symbol("calculateTotal");

	class Order {
		#orderId;
		#createdAt;
		[_items] = [];

		static orderCount = 0;

		constructor(customer) {
			this.customer = customer;
			this.#orderId = ++Order.orderCount;
			this.#createdAt = new Date();
			this.status = "pending";

			return new Proxy(this, {
				set(target, prop, value) {
					if (
						prop === "status" &&
						!["pending", "shipped", "delivered"].includes(value)
					) {
						throw new Error("Invalid status");
					}
					target[prop] = value;
					return true;
				},
			});
		}

		get info() {
			return {
				id: this.#orderId,
				customer: this.customer,
				date: this.#createdAt,
				itemCount: this[_items].length,
				total: this[_calculateTotal](),
			};
		}

		[_calculateTotal]() {
			return this[_items].reduce((sum, item) => sum + item.price * item.qty, 0);
		}

		addItem(product, qty = 1) {
			const existing = this[_items].find((i) => i.id === product.id);
			if (existing) {
				existing.qty += qty;
			} else {
				this[_items].push({ ...product, qty });
			}
			return this;
		}

		removeItem(productId) {
			const idx = this[_items].findIndex((i) => i.id === productId);
			if (idx > -1) this[_items].splice(idx, 1);
			return this;
		}

		*[Symbol.iterator]() {
			yield* this[_items];
		}

		toJSON() {
			return {
				orderId: this.#orderId,
				customer: this.customer,
				items: this[_items],
				total: this[_calculateTotal](),
				status: this.status,
			};
		}
	}

	return { Order };
})();

const { Order } = OrderManager;

const order = new Order("John Doe");
order
	.addItem({ id: 1, name: "Laptop", price: 999 }, 1)
	.addItem({ id: 2, name: "Mouse", price: 25 }, 2)
	.addItem({ id: 1, name: "Laptop", price: 999 }, 1);

console.log(order.info);
/* Output:
{
  id: 1,
  customer: 'John Doe',
  date: 2024-01-15T10:30:00.000Z,
  itemCount: 2,
  total: 2048
}
*/

for (const item of order) {
	console.log(`${item.name}: $${item.price} x ${item.qty}`);
}
// Output:
// Laptop: $999 x 2
// Mouse: $25 x 2

console.log(JSON.stringify(order, null, 2));
/* Output:
{
  "orderId": 1,
  "customer": "John Doe",
  "items": [
    {"id": 1, "name": "Laptop", "price": 999, "qty": 2},
    {"id": 2, "name": "Mouse", "price": 25, "qty": 2}
  ],
  "total": 2048,
  "status": "pending"
}
*/

// ============================================
// SUMMARY TABLE
// ============================================
/*
| Category       | Key Methods/Concepts                                    |
|----------------|---------------------------------------------------------|
| Creation       | {}, new Object(), Object.create(), Class                |
| Properties     | defineProperty, getters/setters, computed names         |
| Access         | Dot notation, bracket notation, destructuring           |
| Iteration      | Object.keys/values/entries, for...in, spread            |
| Immutability   | Object.freeze(), Object.seal(), const                   |
| Copying        | Object.assign(), spread {...obj}, structuredClone       |
| Advanced       | Proxy, Reflect, Symbol, Private fields (#), Mixins      |
| Serialization  | JSON.stringify/parse, custom toJSON                     |
*/
