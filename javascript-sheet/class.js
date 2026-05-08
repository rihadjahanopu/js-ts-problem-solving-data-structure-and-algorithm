// ============================================
// SECTION 1: CLASS BASICS (বেসিক ক্লাস)
// ============================================

// Class Declaration (ক্লাস ডিক্লেয়ারেশন)
// 'class' keyword দিয়ে ক্লাস তৈরি করা হয়
class Person {
	// Constructor Method (কনস্ট্রাক্টর মেথড)
	// নতুন অবজেক্ট তৈরি হলে প্রথমে এটি কল হয়
	constructor(name, age) {
		// Instance Properties (ইনস্ট্যান্স প্রোপার্টি)
		// 'this' বর্তমান অবজেক্টকে নির্দেশ করে
		this.name = name; // প্রতিটি অবজেক্টের নিজস্ব name থাকবে
		this.age = age; // প্রতিটি অবজেক্টের নিজস্ব age থাকবে
	}

	// Instance Method (ইনস্ট্যান্স মেথড)
	// ক্লাসের প্রোটোটাইপে যায়, সব ইনস্ট্যান্স শেয়ার করে
	greet() {
		return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
	}

	// Another Instance Method
	haveBirthday() {
		this.age += 1; // age 1 বাড়িয়ে দেওয়া হলো
		return `Happy Birthday ${this.name}! Now you are ${this.age}.`;
	}
}

// Object Creation (অবজেক্ট তৈরি)
const person1 = new Person("Rahim", 25); // 'new' দিয়ে ইনস্ট্যান্স তৈরি
const person2 = new Person("Karim", 30);

console.log("--- Basic Class Output ---");
console.log(person1.greet()); // Hello, I'm Rahim and I'm 25 years old.
console.log(person2.greet()); // Hello, I'm Karim and I'm 30 years old.
console.log(person1.haveBirthday()); // Happy Birthday Rahim! Now you are 26.
console.log(person1.age); // 26 (আপডেট হয়েছে)

// ============================================
// SECTION 2: STATIC MEMBERS (স্ট্যাটিক মেম্বার)
// ============================================

class MathUtils {
	// Static Property (স্ট্যাটিক প্রোপার্টি)
	// ক্লাস লেভেলে থাকে, ইনস্ট্যান্সে যায় না
	static PI = 3.14159;

	// Static Method (স্ট্যাটিক মেথড)
	// ক্লাস নাম দিয়ে কল করতে হয়, ইনস্ট্যান্স দিয়ে নয়
	static add(a, b) {
		return a + b;
	}

	static multiply(a, b) {
		return a * b;
	}

	// Static method accessing static property
	static circleArea(radius) {
		return this.PI * radius * radius; // this এখানে MathUtils ক্লাসকে নির্দেশ করে
	}
}

console.log("\n--- Static Members Output ---");
console.log(MathUtils.PI); // 3.14159 (ক্লাস নাম দিয়ে অ্যাক্সেস)
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.circleArea(5)); // 78.53975

// const utils = new MathUtils();
// utils.add(2,3); // ❌ Error! Static method ইনস্ট্যান্সে পাওয়া যায় না

// ============================================
// SECTION 3: GETTERS & SETTERS (গেটার সেটার)
// ============================================

class BankAccount {
	// Private Field (প্রাইভেট ফিল্ড) - # দিয়ে শুরু
	// ক্লাসের বাইরে থেকে সরাসরি অ্যাক্সেস করা যায় না
	#balance = 0;
	#transactionHistory = []; // আরেকটি প্রাইভেট ফিল্ড

	constructor(ownerName, initialDeposit = 0) {
		this.ownerName = ownerName;
		this.#balance = initialDeposit; // প্রাইভেট ফিল্ডে ভ্যালু সেট
		this.#logTransaction("Account opened", initialDeposit);
	}

	// Getter (গেটার) - প্রপার্টির মতো অ্যাক্সেস করা যায়
	// কিন্তু এটি আসলে একটি মেথড
	get balance() {
		return `$${this.#balance.toFixed(2)}`; // ফরম্যাট করে রিটার্ন
	}

	get transactionCount() {
		return this.#transactionHistory.length;
	}

	// Setter (সেটার) - প্রপার্টির মতো ভ্যালু সেট করা যায়
	// কিন্তু ভ্যালিডেশন করতে পারে
	set deposit(amount) {
		if (amount <= 0) {
			throw new Error("Deposit amount must be positive!");
		}
		this.#balance += amount;
		this.#logTransaction("Deposit", amount);
	}

	set withdraw(amount) {
		if (amount > this.#balance) {
			throw new Error("Insufficient funds!");
		}
		if (amount <= 0) {
			throw new Error("Withdrawal amount must be positive!");
		}
		this.#balance -= amount;
		this.#logTransaction("Withdrawal", -amount);
	}

	// Private Method (প্রাইভেট মেথড) - # দিয়ে শুরু
	// শুধুমাত্র ক্লাসের ভেতরে ব্যবহার করা যায়
	#logTransaction(type, amount) {
		this.#transactionHistory.push({
			type,
			amount,
			date: new Date().toLocaleString(),
			balance: this.#balance,
		});
	}

	// Public method to view history
	getHistory() {
		return [...this.#transactionHistory]; // কপি রিটার্ন করা হলো
	}
}

console.log("\n--- Getters & Setters Output ---");
const account = new BankAccount("Rahim", 1000);
console.log(account.balance); // $1000.00 (getter কল হলো)
account.deposit = 500; // setter কল হলো
console.log(account.balance); // $1500.00
account.withdraw = 200; // setter কল হলো
console.log(account.balance); // $1300.00
console.log(`Total transactions: ${account.transactionCount}`); // 3

// console.log(account.#balance); // ❌ Syntax Error! Private field

// ============================================
// SECTION 4: INHERITANCE (ইনহেরিট্যান্স)
// ============================================

// Base/Parent Class (বেস/প্যারেন্ট ক্লাস)
class Animal {
	constructor(name, species) {
		this.name = name;
		this.species = species;
		this.energy = 100; // ডিফল্ট এনার্জি
	}

	eat(food) {
		this.energy += 20;
		return `${this.name} is eating ${food}. Energy: ${this.energy}`;
	}

	sleep() {
		this.energy = 100;
		return `${this.name} is sleeping. Energy restored to 100.`;
	}

	makeSound() {
		return `${this.name} makes a sound.`;
	}
}

// Derived/Child Class (ডেরাইভড/চাইল্ড ক্লাস)
// 'extends' keyword দিয়ে inheritance করা হয়
class Dog extends Animal {
	constructor(name, breed) {
		// super() - parent class এর constructor কল করে
		super(name, "Canine"); // Animal এর constructor কল
		this.breed = breed; // Dog class এর নিজস্ব প্রপার্টি
		this.tricks = []; // ট্রিক্স শেখার অ্যারে
	}

	// Method Overriding (মেথড ওভাররাইডিং)
	// Parent class এর মেথডকে রিডিফাইন করা
	makeSound() {
		return `${this.name} barks: Woof! Woof!`;
	}

	// Child class এর নতুন মেথড
	learnTrick(trick) {
		this.tricks.push(trick);
		return `${this.name} learned ${trick}!`;
	}

	performTricks() {
		if (this.tricks.length === 0) return `${this.name} knows no tricks yet.`;
		return `${this.name} performs: ${this.tricks.join(", ")}`;
	}

	// Parent method কল করা (super keyword ব্যবহার করে)
	rest() {
		const message = super.sleep(); // parent class এর sleep() কল
		return `${message} (Dogs need 12-14 hours sleep!)`;
	}
}

// Another Child Class
class Cat extends Animal {
	constructor(name, color) {
		super(name, "Feline");
		this.color = color;
		this.lives = 9; // বিড়ালের ৯টি জীবন 😺
	}

	makeSound() {
		return `${this.name} meows: Meow~`;
	}

	// Parent method কে extend করা
	sleep() {
		const baseMessage = super.sleep();
		return `${baseMessage} Cats sleep 16-20 hours daily!`;
	}
}

console.log("\n--- Inheritance Output ---");
const myDog = new Dog("Tommy", "Golden Retriever");
console.log(myDog.makeSound()); // Tommy barks: Woof! Woof! (overridden)
console.log(myDog.eat("dog food")); // Tommy is eating dog food. Energy: 120 (inherited)
console.log(myDog.learnTrick("sit")); // Tommy learned sit!
console.log(myDog.learnTrick("roll over")); // Tommy learned roll over!
console.log(myDog.performTricks()); // Tommy performs: sit, roll over
console.log(myDog.rest()); // Parent method + extra info

const myCat = new Cat("Whiskers", "Orange");
console.log(myCat.makeSound()); // Whiskers meows: Meow~
console.log(myCat.sleep()); // Overridden method

// ============================================
// SECTION 5: ABSTRACT CLASSES (Simulated)
// ============================================

// JavaScript এ সরাসরি abstract class নেই, কিন্তু এভাবে simulate করা যায়
class Shape {
	constructor() {
		// Abstract class থেকে সরাসরি instance তৈরি করলে error
		if (new.target === Shape) {
			throw new Error("Cannot instantiate abstract class Shape directly");
		}
	}

	// Abstract method - child class এ implement করতেই হবে
	calculateArea() {
		throw new Error("Method 'calculateArea()' must be implemented");
	}

	calculatePerimeter() {
		throw new Error("Method 'calculatePerimeter()' must be implemented");
	}

	// Concrete method (সবার জন্য কমন)
	describe() {
		return `I am a ${this.constructor.name}`;
	}
}

class Rectangle extends Shape {
	constructor(width, height) {
		super(); // Abstract parent call
		this.width = width;
		this.height = height;
	}

	// Abstract method implementation
	calculateArea() {
		return this.width * this.height;
	}

	calculatePerimeter() {
		return 2 * (this.width + this.height);
	}
}

class Circle extends Shape {
	constructor(radius) {
		super();
		this.radius = radius;
	}

	calculateArea() {
		return Math.PI * this.radius ** 2;
	}

	calculatePerimeter() {
		return 2 * Math.PI * this.radius;
	}
}

console.log("\n--- Abstract Class Pattern Output ---");
const rect = new Rectangle(5, 10);
console.log(`${rect.describe()}: Area = ${rect.calculateArea()}`); // 50
console.log(`${rect.describe()}: Perimeter = ${rect.calculatePerimeter()}`); // 30

const circle = new Circle(7);
console.log(
	`${circle.describe()}: Area = ${circle.calculateArea().toFixed(2)}`
); // 153.94

// const shape = new Shape(); // ❌ Error: Cannot instantiate abstract class

// ============================================
// SECTION 6: MIXINS (মিক্সিনস)
// ============================================

// Mixin: Multiple inheritance এর বিকল্প
// ফাংশন যা ক্লাসকে নতুন functionality দেয়
const Flyable = (Base) =>
	class extends Base {
		fly() {
			return `${this.name} is flying at ${this.altitude || 1000}ft!`;
		}

		setAltitude(feet) {
			this.altitude = feet;
		}
	};

const Swimmable = (Base) =>
	class extends Base {
		swim() {
			return `${this.name} is swimming at ${this.depth || 10}m depth!`;
		}

		setDepth(meters) {
			this.depth = meters;
		}
	};

// Base class
class LivingBeing {
	constructor(name) {
		this.name = name;
	}
}

// Mixed class: Flyable + Swimmable + LivingBeing
class Duck extends Flyable(Swimmable(LivingBeing)) {
	constructor(name) {
		super(name);
	}

	quack() {
		return "Quack! Quack!";
	}
}

console.log("\n--- Mixins Output ---");
const donald = new Duck("Donald");
console.log(donald.quack()); // Quack! Quack!
console.log(donald.fly()); // Donald is flying at 1000ft!
donald.setAltitude(5000);
console.log(donald.fly()); // Donald is flying at 5000ft!
console.log(donald.swim()); // Donald is swimming at 10m depth!

// ============================================
// SECTION 7: ADVANCED PATTERNS
// ============================================

// 7.1 Singleton Pattern (একটিই instance থাকবে)
class Database {
	// Private static instance
	static #instance = null;

	constructor(connectionString) {
		if (Database.#instance) {
			throw new Error("Use Database.getInstance() instead of new");
		}
		this.connectionString = connectionString;
		this.isConnected = false;
		Database.#instance = this;
	}

	// Static method to get single instance
	static getInstance(connectionString) {
		if (!Database.#instance) {
			Database.#instance = new Database(connectionString);
		}
		return Database.#instance;
	}

	connect() {
		this.isConnected = true;
		return "Database connected!";
	}
}

console.log("\n--- Singleton Pattern Output ---");
const db1 = Database.getInstance("mongodb://localhost");
const db2 = Database.getInstance("postgresql://localhost");
console.log(db1 === db2); // true (একই অবজেক্ট)
console.log(db1.connect()); // Database connected!
// const db3 = new Database("..."); // ❌ Error

// 7.2 Factory Pattern (ফ্যাক্টরি প্যাটার্ন)
class UserFactory {
	static createUser(type, name) {
		switch (type) {
			case "admin":
				return new AdminUser(name);
			case "guest":
				return new GuestUser(name);
			case "member":
				return new MemberUser(name);
			default:
				throw new Error("Unknown user type");
		}
	}
}

class AdminUser {
	constructor(name) {
		this.name = name;
		this.role = "Administrator";
		this.permissions = ["read", "write", "delete", "manage"];
	}
	getInfo() {
		return `${this.name} (${this.role})`;
	}
}

class GuestUser {
	constructor(name) {
		this.name = name;
		this.role = "Guest";
		this.permissions = ["read"];
	}
	getInfo() {
		return `${this.name} (${this.role})`;
	}
}

class MemberUser {
	constructor(name) {
		this.name = name;
		this.role = "Member";
		this.permissions = ["read", "write"];
	}
	getInfo() {
		return `${this.name} (${this.role})`;
	}
}

console.log("\n--- Factory Pattern Output ---");
const admin = UserFactory.createUser("admin", "Rahim");
const guest = UserFactory.createUser("guest", "Karim");
console.log(admin.getInfo()); // Rahim (Administrator)
console.log(guest.getInfo()); // Karim (Guest)

// 7.3 Builder Pattern (বিল্ডার প্যাটার্ন)
class Pizza {
	constructor() {
		this.size = "medium";
		this.cheese = false;
		this.pepperoni = false;
		this.mushrooms = false;
		this.extraCheese = false;
	}

	static get Builder() {
		return new PizzaBuilder();
	}
}

class PizzaBuilder {
	constructor() {
		this.pizza = new Pizza();
	}

	setSize(size) {
		this.pizza.size = size;
		return this; // Method chaining এর জন্য this রিটার্ন
	}

	addCheese() {
		this.pizza.cheese = true;
		return this;
	}

	addPepperoni() {
		this.pizza.pepperoni = true;
		return this;
	}

	addMushrooms() {
		this.pizza.mushrooms = true;
		return this;
	}

	addExtraCheese() {
		this.pizza.extraCheese = true;
		return this;
	}

	build() {
		return this.pizza;
	}
}

console.log("\n--- Builder Pattern Output ---");
const myPizza = Pizza.Builder.setSize("large")
	.addCheese()
	.addPepperoni()
	.addExtraCheese()
	.build();

console.log(myPizza);
// Pizza { size: 'large', cheese: true, pepperoni: true, mushrooms: false, extraCheese: true }

// ============================================
// SECTION 8: SYMBOLS & PRIVATE FIELDS
// ============================================

const _password = Symbol("password"); // Unique symbol for pseudo-private field

class SecureUser {
	constructor(username, password) {
		this.username = username;
		this[_password] = password; // Symbol key - hard to access accidentally
		this.createdAt = new Date();
	}

	// Public method to check password
	verifyPassword(input) {
		return this[_password] === input;
	}

	// Private field with #
	#secretKey = "xyz123";

	getSecret() {
		return this.#secretKey.substring(0, 3) + "***";
	}
}

console.log("\n--- Symbols & Private Fields Output ---");
const secureUser = new SecureUser("rahim", "secret123");
console.log(secureUser.username); // rahim
console.log(secureUser.verifyPassword("secret123")); // true
console.log(secureUser.verifyPassword("wrong")); // false
// console.log(secureUser[_password]); // Possible but unlikely (symbol access)
console.log(secureUser.getSecret()); // xyz***

// ============================================
// SECTION 9: CLASS DECORATORS (Modern JS/TS Concept)
// ============================================

// JavaScript এ decorator এখনো experimental, কিন্তু এভাবে simulate করা যায়
function logExecution(target, propertyKey, descriptor) {
	const originalMethod = descriptor.value;

	descriptor.value = function (...args) {
		console.log(`[LOG] Calling ${propertyKey} with args:`, args);
		const result = originalMethod.apply(this, args);
		console.log(`[LOG] ${propertyKey} returned:`, result);
		return result;
	};

	return descriptor;
}

function measureTime(target, propertyKey, descriptor) {
	const originalMethod = descriptor.value;

	descriptor.value = function (...args) {
		const start = performance.now();
		const result = originalMethod.apply(this, args);
		const end = performance.now();
		console.log(`[TIME] ${propertyKey} took ${(end - start).toFixed(2)}ms`);
		return result;
	};

	return descriptor;
}

class Calculator {
	@logExecution // Hypothetical decorator syntax (Stage 3)
	@measureTime // Multiple decorators
	heavyCalculation(n) {
		let sum = 0;
		for (let i = 0; i < n; i++) {
			sum += Math.sqrt(i);
		}
		return sum;
	}
}

// Manual decorator application (current JS way)
const calc = new Calculator();
const descriptor = Object.getOwnPropertyDescriptor(
	Calculator.prototype,
	"heavyCalculation"
);
const decorated = measureTime(
	Calculator.prototype,
	"heavyCalculation",
	descriptor
);
Object.defineProperty(Calculator.prototype, "heavyCalculation", decorated);

// ============================================
// SECTION 10: ITERABLE CLASSES (ইটারেবল ক্লাস)
// ============================================

class Collection {
	#items = [];

	constructor(...items) {
		this.#items = items;
	}

	add(item) {
		this.#items.push(item);
	}

	// Make class iterable using Symbol.iterator
	[Symbol.iterator]() {
		let index = 0;
		const items = this.#items;

		return {
			next() {
				if (index < items.length) {
					return { value: items[index++], done: false };
				}
				return { done: true };
			},
		};
	}

	// Generator version (simpler)
	*entries() {
		for (let i = 0; i < this.#items.length; i++) {
			yield { index: i, value: this.#items[i] };
		}
	}
}

console.log("\n--- Iterable Class Output ---");
const collection = new Collection("apple", "banana", "cherry");

// Using for...of loop
for (const item of collection) {
	console.log("Item:", item);
}

// Using generator
for (const entry of collection.entries()) {
	console.log(`Index ${entry.index}: ${entry.value}`);
}

// ============================================
// SECTION 11: ASYNC CLASS METHODS
// ============================================

class DataFetcher {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
		this.cache = new Map(); // Simple cache
	}

	// Async method
	async fetchData(endpoint) {
		const cacheKey = `${this.apiUrl}/${endpoint}`;

		if (this.cache.has(cacheKey)) {
			console.log("[Cache Hit]");
			return this.cache.get(cacheKey);
		}

		console.log("[Fetching from API]");
		// Simulating API call
		return new Promise((resolve) => {
			setTimeout(() => {
				const data = { id: 1, name: "Product", price: 99.99 };
				this.cache.set(cacheKey, data);
				resolve(data);
			}, 1000);
		});
	}

	// Async generator
	async *fetchPaginated(endpoint) {
		let page = 1;
		while (page <= 3) {
			yield await this.fetchData(`${endpoint}?page=${page}`);
			page++;
		}
	}
}

console.log("\n--- Async Class Methods Output ---");
const fetcher = new DataFetcher("https://api.example.com");

// Using async method
fetcher
	.fetchData("products")
	.then((data) => {
		console.log("First fetch:", data);
		return fetcher.fetchData("products"); // Should hit cache
	})
	.then((data) => {
		console.log("Second fetch:", data);
	});

// ============================================
// SECTION 12: PROXY WITH CLASSES
// ============================================

class ProtectedObject {
	constructor() {
		this.publicData = "Anyone can see this";
		this._sensitive = "Secret data";
	}
}

// Proxy handler for access control
const handler = {
	get(target, prop) {
		if (prop.startsWith("_")) {
			console.log(`[BLOCKED] Attempted to access private property: ${prop}`);
			return undefined;
		}
		return target[prop];
	},

	set(target, prop, value) {
		if (prop.startsWith("_")) {
			console.log(`[BLOCKED] Cannot modify private property: ${prop}`);
			return false;
		}
		target[prop] = value;
		return true;
	},
};

console.log("\n--- Proxy with Classes Output ---");
const protectedObj = new ProtectedObject();
const proxy = new Proxy(protectedObj, handler);

console.log(proxy.publicData); // Anyone can see this
console.log(proxy._sensitive); // undefined (blocked)
proxy.publicData = "Modified"; // Works fine
proxy._sensitive = "Hacked"; // Blocked

// ============================================
// SECTION 13: CLASS COMPOSITION VS INHERITANCE
// ============================================

// Favor composition over inheritance
const CanAuthorize = {
	checkPermission(user) {
		return user.role === "admin";
	},
};

const CanValidate = {
	validate(data) {
		return data !== null && typeof data === "object";
	},
};

const CanLog = {
	log(message) {
		console.log(`[${new Date().toISOString()}] ${message}`);
	},
};

// Compose behaviors into a class
class OrderService {
	constructor() {
		// Mix in behaviors
		Object.assign(this, CanAuthorize, CanValidate, CanLog);
	}

	processOrder(user, orderData) {
		this.log("Processing order...");

		if (!this.checkPermission(user)) {
			throw new Error("Unauthorized");
		}

		if (!this.validate(orderData)) {
			throw new Error("Invalid data");
		}

		this.log("Order processed successfully");
		return { success: true, orderId: 12345 };
	}
}

console.log("\n--- Composition Pattern Output ---");
const orderService = new OrderService();
const adminUser = { role: "admin", name: "Rahim" };
const result = orderService.processOrder(adminUser, { items: ["book", "pen"] });
console.log(result); // { success: true, orderId: 12345 }

// ============================================
// SECTION 14: METAPROGRAMMING
// ============================================

class MetaClass {
	constructor() {
		// Dynamic property creation
		["read", "write", "delete"].forEach((action) => {
			this[`can${action.charAt(0).toUpperCase() + action.slice(1)}`] = () => {
				return `Permission: ${action}`;
			};
		});
	}

	// Computed method names
	["dynamicMethod"](param) {
		return `Dynamic method called with ${param}`;
	}

	// Static block (ES2022) - ক্লাস লোড হলে একবার রান করে
	static {
		console.log("[Static Block] MetaClass is being defined");
		this.classInfo = "This runs when class is loaded";
	}
}

console.log("\n--- Metaprogramming Output ---");
const meta = new MetaClass();
console.log(meta.canRead()); // Permission: read
console.log(meta.canWrite()); // Permission: write
console.log(meta.dynamicMethod("test")); // Dynamic method called with test
