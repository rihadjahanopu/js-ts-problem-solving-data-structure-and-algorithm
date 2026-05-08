// ═══════════════════════════════════════════════════════════════
// 20_classes_oop.ts — Object-Oriented TypeScript
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Basic Class
// ═══════════════════════════════════════

class Animal {
	// Properties
	name: string;
	age: number;

	// Constructor
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	// Method
	makeSound(): void {
		console.log("Some sound");
	}

	getInfo(): string {
		return `${this.name} is ${this.age} years old`;
	}
}

let animal = new Animal("Generic", 5);
console.log(animal.getInfo());

// ═══════════════════════════════════════
// Access Modifiers
// ═══════════════════════════════════════

class BankAccount {
	// public — default, সবাই access করতে পারে
	public owner: string;

	// private — শুধু class এর ভিতরে
	private _balance: number;

	// protected — class এবং subclass এ access
	protected accountType: string;

	// readonly — একবার set করলে change করা যায় না
	readonly accountNumber: string;

	constructor(owner: string, balance: number, accountNumber: string) {
		this.owner = owner;
		this._balance = balance;
		this.accountNumber = accountNumber;
		this.accountType = "savings";
	}

	// Getter
	get balance(): number {
		return this._balance;
	}

	// Setter
	set balance(amount: number) {
		if (amount < 0) {
			throw new Error("Balance cannot be negative");
		}
		this._balance = amount;
	}

	deposit(amount: number): void {
		if (amount <= 0) {
			throw new Error("Deposit amount must be positive");
		}
		this._balance += amount;
		console.log(`Deposited $${amount}. New balance: $${this._balance}`);
	}

	withdraw(amount: number): void {
		if (amount > this._balance) {
			throw new Error("Insufficient funds");
		}
		this._balance -= amount;
		console.log(`Withdrew $${amount}. New balance: $${this._balance}`);
	}
}

let account = new BankAccount("Rahim", 1000, "ACC-12345");
console.log("Owner:", account.owner); // public
console.log("Balance:", account.balance); // getter
// console.log(account._balance);           // ❌ Error: private
// console.log(account.accountType);        // ❌ Error: protected
// account.accountNumber = "new";           // ❌ Error: readonly

account.deposit(500);
account.withdraw(200);

// ═══════════════════════════════════════
// Inheritance
// ═══════════════════════════════════════

class Dog extends Animal {
	breed: string;

	constructor(name: string, age: number, breed: string) {
		super(name, age); // Parent constructor call
		this.breed = breed;
	}

	// Method override
	makeSound(): void {
		console.log("Woof! Woof!");
	}

	fetch(): void {
		console.log(`${this.name} is fetching the ball`);
	}
}

class Cat extends Animal {
	color: string;

	constructor(name: string, age: number, color: string) {
		super(name, age);
		this.color = color;
	}

	makeSound(): void {
		console.log("Meow!");
	}

	climb(): void {
		console.log(`${this.name} is climbing`);
	}
}

let dog = new Dog("Buddy", 3, "Golden Retriever");
let cat = new Cat("Whiskers", 2, "Orange");

dog.makeSound();
dog.fetch();
cat.makeSound();
cat.climb();

// ═══════════════════════════════════════
// Abstract Class
// ═══════════════════════════════════════

abstract class Shape {
	abstract getArea(): number;
	abstract getPerimeter(): number;

	// Concrete method
	describe(): string {
		return `Area: ${this.getArea()}, Perimeter: ${this.getPerimeter()}`;
	}
}

class Rectangle extends Shape {
	constructor(
		private width: number,
		private height: number
	) {
		super();
	}

	getArea(): number {
		return this.width * this.height;
	}

	getPerimeter(): number {
		return 2 * (this.width + this.height);
	}
}

class Circle extends Shape {
	constructor(private radius: number) {
		super();
	}

	getArea(): number {
		return Math.PI * this.radius ** 2;
	}

	getPerimeter(): number {
		return 2 * Math.PI * this.radius;
	}
}

// let shape = new Shape(); // ❌ Error: Cannot create instance of abstract class
let rect = new Rectangle(10, 5);
let circle2 = new Circle(7);

console.log(rect.describe());
console.log(circle2.describe());

// ═══════════════════════════════════════
// Interface Implementation
// ═══════════════════════════════════════

interface Drivable {
	speed: number;
	accelerate(amount: number): void;
	brake(amount: number): void;
}

interface Flyable {
	altitude: number;
	fly(height: number): void;
	land(): void;
}

class Car implements Drivable {
	speed: number = 0;

	accelerate(amount: number): void {
		this.speed += amount;
		console.log(`Car accelerating. Speed: ${this.speed}`);
	}

	brake(amount: number): void {
		this.speed = Math.max(0, this.speed - amount);
		console.log(`Car braking. Speed: ${this.speed}`);
	}
}

// Multiple interface implementation
class AmphibiousVehicle implements Drivable, Flyable {
	speed: number = 0;
	altitude: number = 0;

	accelerate(amount: number): void {
		this.speed += amount;
		console.log(`Amphibious speed: ${this.speed}`);
	}

	brake(amount: number): void {
		this.speed = Math.max(0, this.speed - amount);
	}

	fly(height: number): void {
		this.altitude = height;
		console.log(`Flying at ${this.altitude}m`);
	}

	land(): void {
		this.altitude = 0;
		console.log("Landed");
	}
}

let car = new Car();
car.accelerate(50);
car.brake(20);

// ═══════════════════════════════════════
// Static Members
// ═══════════════════════════════════════

class MathUtils {
	static PI: number = 3.14159;

	static circleArea(radius: number): number {
		return this.PI * radius ** 2;
	}

	static circleCircumference(radius: number): number {
		return 2 * this.PI * radius;
	}
}

console.log("PI:", MathUtils.PI);
console.log("Area:", MathUtils.circleArea(5));

// ═══════════════════════════════════════
// Singleton Pattern
// ═══════════════════════════════════════

class Database {
	private static instance: Database;
	private connection: string;

	private constructor() {
		this.connection = "Connected to DB";
		console.log("Database instance created");
	}

	static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	query(sql: string): void {
		console.log(`Executing: ${sql}`);
	}
}

let db1 = Database.getInstance();
let db2 = Database.getInstance();
console.log("Same instance:", db1 === db2); // true

export {};
