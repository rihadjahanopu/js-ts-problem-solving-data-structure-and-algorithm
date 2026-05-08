// ═══════════════════════════════════════════════════════════════
// 27_design_patterns.ts — Design Patterns in TypeScript
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// 1. Singleton Pattern
// ═══════════════════════════════════════

class DatabaseConnection {
	private static instance: DatabaseConnection;
	private connection: string;

	private constructor() {
		this.connection = "Connected to PostgreSQL";
		console.log("Database connection established");
	}

	static getInstance(): DatabaseConnection {
		if (!DatabaseConnection.instance) {
			DatabaseConnection.instance = new DatabaseConnection();
		}
		return DatabaseConnection.instance;
	}

	query(sql: string): any[] {
		console.log(`Executing: ${sql}`);
		return [];
	}

	getConnectionInfo(): string {
		return this.connection;
	}
}

// Usage
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log("Same instance:", db1 === db2); // true

// ═══════════════════════════════════════
// 2. Factory Pattern
// ═══════════════════════════════════════

interface Notification {
	send(message: string, recipient: string): void;
}

class EmailNotification implements Notification {
	send(message: string, recipient: string): void {
		console.log(`📧 Email to ${recipient}: ${message}`);
	}
}

class SMSNotification implements Notification {
	send(message: string, recipient: string): void {
		console.log(`📱 SMS to ${recipient}: ${message}`);
	}
}

class PushNotification implements Notification {
	send(message: string, recipient: string): void {
		console.log(`🔔 Push to ${recipient}: ${message}`);
	}
}

class NotificationFactory {
	static create(type: "email" | "sms" | "push"): Notification {
		switch (type) {
			case "email":
				return new EmailNotification();
			case "sms":
				return new SMSNotification();
			case "push":
				return new PushNotification();
			default:
				throw new Error(`Unknown notification type: ${type}`);
		}
	}
}

// Usage
const emailNotifier = NotificationFactory.create("email");
emailNotifier.send("Hello!", "user@example.com");

// ═══════════════════════════════════════
// 3. Builder Pattern
// ═══════════════════════════════════════

class UserBuilder {
	private user: Partial<{
		id: number;
		name: string;
		email: string;
		age: number;
		role: string;
		isActive: boolean;
		createdAt: Date;
	}> = {};

	setId(id: number): this {
		this.user.id = id;
		return this;
	}

	setName(name: string): this {
		this.user.name = name;
		return this;
	}

	setEmail(email: string): this {
		this.user.email = email;
		return this;
	}

	setAge(age: number): this {
		this.user.age = age;
		return this;
	}

	setRole(role: string): this {
		this.user.role = role;
		return this;
	}

	setActive(isActive: boolean): this {
		this.user.isActive = isActive;
		return this;
	}

	build(): Required<typeof this.user> {
		return {
			id: this.user.id ?? 0,
			name: this.user.name ?? "",
			email: this.user.email ?? "",
			age: this.user.age ?? 0,
			role: this.user.role ?? "user",
			isActive: this.user.isActive ?? true,
			createdAt: new Date(),
		} as Required<typeof this.user>;
	}
}

// Usage
const user = new UserBuilder()
	.setId(1)
	.setName("Rahim")
	.setEmail("rahim@test.com")
	.setAge(25)
	.setRole("admin")
	.setActive(true)
	.build();

console.log("Built user:", user);

// ═══════════════════════════════════════
// 4. Observer Pattern
// ═══════════════════════════════════════

interface Observer {
	update(data: any): void;
}

interface Subject {
	attach(observer: Observer): void;
	detach(observer: Observer): void;
	notify(data: any): void;
}

class NewsPublisher implements Subject {
	private observers: Observer[] = [];
	private news: string[] = [];

	attach(observer: Observer): void {
		this.observers.push(observer);
	}

	detach(observer: Observer): void {
		this.observers = this.observers.filter((obs) => obs !== observer);
	}

	notify(data: any): void {
		this.observers.forEach((observer) => observer.update(data));
	}

	addNews(news: string): void {
		this.news.push(news);
		this.notify({ type: "news", content: news });
	}
}

class EmailSubscriber implements Observer {
	constructor(private email: string) {}

	update(data: any): void {
		console.log(`📧 Email to ${this.email}: ${data.content}`);
	}
}

class SMSSubscriber implements Observer {
	constructor(private phone: string) {}

	update(data: any): void {
		console.log(`📱 SMS to ${this.phone}: ${data.content}`);
	}
}

// Usage
const publisher = new NewsPublisher();
publisher.attach(new EmailSubscriber("user@example.com"));
publisher.attach(new SMSSubscriber("+8801234567890"));
publisher.addNews("TypeScript 6 released!");

// ═══════════════════════════════════════
// 5. Strategy Pattern
// ═══════════════════════════════════════

interface PaymentStrategy {
	pay(amount: number): void;
	validate(): boolean;
}

class CreditCardPayment implements PaymentStrategy {
	constructor(
		private cardNumber: string,
		private cvv: string
	) {}

	validate(): boolean {
		return this.cardNumber.length === 16 && this.cvv.length === 3;
	}

	pay(amount: number): void {
		if (!this.validate()) {
			throw new Error("Invalid card details");
		}
		console.log(
			`💳 Paid $${amount} using Credit Card ****${this.cardNumber.slice(-4)}`
		);
	}
}

class PayPalPayment implements PaymentStrategy {
	constructor(private email: string) {}

	validate(): boolean {
		return this.email.includes("@");
	}

	pay(amount: number): void {
		if (!this.validate()) {
			throw new Error("Invalid PayPal email");
		}
		console.log(`💰 Paid $${amount} using PayPal (${this.email})`);
	}
}

class CryptoPayment implements PaymentStrategy {
	constructor(private walletAddress: string) {}

	validate(): boolean {
		return (
			this.walletAddress.startsWith("0x") && this.walletAddress.length === 42
		);
	}

	pay(amount: number): void {
		if (!this.validate()) {
			throw new Error("Invalid wallet address");
		}
		console.log(
			`₿ Paid $${amount} using Crypto (${this.walletAddress.slice(0, 6)}...)`
		);
	}
}

class ShoppingCart {
	private items: { name: string; price: number }[] = [];
	private paymentStrategy: PaymentStrategy | null = null;

	addItem(name: string, price: number): void {
		this.items.push({ name, price });
	}

	setPaymentStrategy(strategy: PaymentStrategy): void {
		this.paymentStrategy = strategy;
	}

	getTotal(): number {
		return this.items.reduce((sum, item) => sum + item.price, 0);
	}

	checkout(): void {
		if (!this.paymentStrategy) {
			throw new Error("Payment method not set");
		}
		const total = this.getTotal();
		this.paymentStrategy.pay(total);
	}
}

// Usage
const cart = new ShoppingCart();
cart.addItem("Laptop", 999);
cart.addItem("Mouse", 29);
cart.setPaymentStrategy(new CreditCardPayment("1234567890123456", "123"));
cart.checkout();

// ═══════════════════════════════════════
// 6. Decorator Pattern
// ═══════════════════════════════════════

interface Coffee {
	cost(): number;
	description(): string;
}

class SimpleCoffee implements Coffee {
	cost(): number {
		return 10;
	}

	description(): string {
		return "Simple coffee";
	}
}

abstract class CoffeeDecorator implements Coffee {
	constructor(protected coffee: Coffee) {}

	abstract cost(): number;
	abstract description(): string;
}

class MilkDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 2;
	}

	description(): string {
		return `${this.coffee.description()}, milk`;
	}
}

class SugarDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 1;
	}

	description(): string {
		return `${this.coffee.description()}, sugar`;
	}
}

class WhipDecorator extends CoffeeDecorator {
	cost(): number {
		return this.coffee.cost() + 3;
	}

	description(): string {
		return `${this.coffee.description()}, whip`;
	}
}

// Usage
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new WhipDecorator(coffee);

console.log(`${coffee.description()} — $${coffee.cost()}`);

// ═══════════════════════════════════════
// 7. Repository Pattern
// ═══════════════════════════════════════

interface Identifiable {
	id: string | number;
}

interface Repository<T extends Identifiable> {
	findAll(): Promise<T[]>;
	findById(id: string | number): Promise<T | null>;
	create(item: Omit<T, "id">): Promise<T>;
	update(id: string | number, item: Partial<T>): Promise<T | null>;
	delete(id: string | number): Promise<boolean>;
}

interface Product extends Identifiable {
	id: number;
	name: string;
	price: number;
	category: string;
}

class InMemoryProductRepository implements Repository<Product> {
	private products: Product[] = [];
	private nextId = 1;

	async findAll(): Promise<Product[]> {
		return [...this.products];
	}

	async findById(id: string | number): Promise<Product | null> {
		return this.products.find((p) => p.id === id) || null;
	}

	async create(item: Omit<Product, "id">): Promise<Product> {
		const product: Product = { ...item, id: this.nextId++ };
		this.products.push(product);
		return product;
	}

	async update(
		id: string | number,
		item: Partial<Product>
	): Promise<Product | null> {
		const index = this.products.findIndex((p) => p.id === id);
		if (index === -1) return null;
		this.products[index] = { ...this.products[index], ...item };
		return this.products[index];
	}

	async delete(id: string | number): Promise<boolean> {
		const index = this.products.findIndex((p) => p.id === id);
		if (index === -1) return false;
		this.products.splice(index, 1);
		return true;
	}
}

// Usage
async function testRepository(): Promise<void> {
	const repo = new InMemoryProductRepository();
	await repo.create({ name: "Laptop", price: 999, category: "Electronics" });
	await repo.create({ name: "Phone", price: 699, category: "Electronics" });

	const products = await repo.findAll();
	console.log("Products:", products);
}

testRepository();

// ═══════════════════════════════════════
// 8. Adapter Pattern
// ═══════════════════════════════════════

// Old interface
interface OldPrinter {
	oldPrint(text: string): void;
}

class LegacyPrinter implements OldPrinter {
	oldPrint(text: string): void {
		console.log(`Legacy: ${text}`);
	}
}

// New interface
interface ModernPrinter {
	print(document: string): void;
	scan(): string;
}

class ModernPrinterImpl implements ModernPrinter {
	print(document: string): void {
		console.log(`Modern: ${document}`);
	}

	scan(): string {
		return "Scanned document";
	}
}

// Adapter
class PrinterAdapter implements ModernPrinter {
	constructor(private oldPrinter: OldPrinter) {}

	print(document: string): void {
		this.oldPrinter.oldPrint(document);
	}

	scan(): string {
		console.log("Scan not supported by legacy printer");
		return "";
	}
}

// Usage
const legacy = new LegacyPrinter();
const adapted = new PrinterAdapter(legacy);
adapted.print("Hello World");

export {};
