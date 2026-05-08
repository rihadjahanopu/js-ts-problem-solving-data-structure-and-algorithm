# 🔰 TypeScript Phase 1: Foundation — Complete Example Guide

> Beginner থেকে Advanced পর্যন্ত সব কিছু Example সহ শেখার গাইড

---

## 📌 1. Why TypeScript? (কেন TypeScript শিখবেন?)

### JavaScript vs TypeScript Example

```typescript
// ❌ JavaScript — Runtime এ Error দেবে
function add(a, b) {
	return a + b;
}
console.log(add("5", 10)); // "510" — Bug! কিন্তু error দেখাবে না

// ✅ TypeScript — Compile time এই Error ধরে ফেলবে
function addTS(a: number, b: number): number {
	return a + b;
}
// addTS("5", 10); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

**সুবিধা:**

- Compile time এ Error ধরা
- IntelliSense / Auto-completion
- Refactoring সহজ
- Large codebase manage করা সহজ

---

## 📌 2. Installation & Setup

### Step-by-Step Setup

```bash
# 1. Node.js install করুন (https://nodejs.org)

# 2. TypeScript Global install
npm install -g typescript

# 3. Version check
tsc --version  # Version 5.x.x

# 4. Project folder তে initialize করুন
mkdir my-ts-project
cd my-ts-project
npm init -y

# 5. TypeScript config file তৈরি করুন
tsc --init     # tsconfig.json তৈরি হবে

# 6. tsconfig.json এ কিছু important settings
```

### tsconfig.json (Recommended Settings)

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"module": "commonjs",
		"outDir": "./dist",
		"rootDir": "./src",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true
	},
	"include": ["src/**/*"],
	"exclude": ["node_modules"]
}
```

### Project Structure

```
my-ts-project/
├── src/
│   └── index.ts
├── dist/           (compiled JS files)
├── tsconfig.json
└── package.json
```

### Compile & Run

```bash
# Compile
tsc

# Auto compile on change
tsc --watch

# Run compiled JS
node dist/index.js

# OR use ts-node for direct run (no separate compile needed)
npm install -g ts-node
ts-node src/index.ts
```

---

## 📌 3. Basic Types (মৌলিক টাইপসমূহ)

### 3.1 Primitive Types

```typescript
// ✅ string
let userName: string = "Rahim";
userName = "Karim"; // OK
// userName = 123;            // ❌ Error: Type 'number' is not assignable to type 'string'

// ✅ number (integer, float, decimal সব number)
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xff; // Hexadecimal
let binary: number = 0b1010; // Binary
let octal: number = 0o744; // Octal

// ✅ boolean
let isActive: boolean = true;
let isLoggedIn: boolean = false;

// ✅ null & undefined
let emptyValue: null = null;
let notDefined: undefined = undefined;

// ✅ bigint (ES2020+)
let bigNumber: bigint = 9007199254740991n;

// ✅ symbol
let uniqueId: symbol = Symbol("id");
```

### 3.2 Array Type

```typescript
// Method 1: Type[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Rahim", "Karim", "Jamal"];

// Method 2: Array<Type> (Generic syntax)
let scores: Array<number> = [85, 90, 78];
let cities: Array<string> = ["Dhaka", "Chittagong", "Sylhet"];

// Mixed array — সাধারণত এড়িয়ে চলুন
let mixed: (string | number)[] = ["hello", 42, "world", 100];

// Array methods — TypeScript auto type বুঝে নেয়
numbers.push(6); // ✅ OK
// numbers.push("six");    // ❌ Error
let first: number = numbers[0]; // TypeScript জানে এটা number
```

### 3.3 Tuple (Fixed-length, Fixed-type Array)

```typescript
// Tuple — নির্দিষ্ট position এ নির্দিষ্ট type
let person: [string, number, boolean] = ["Rahim", 25, true];

// Destructuring
let [pName, pAge, pActive] = person;
console.log(pName); // "Rahim"
console.log(pAge); // 25

// Use case: Coordinate
let coordinate: [number, number] = [23.8103, 90.4125]; // Dhaka lat, long

// Optional tuple element
let optionalTuple: [string, number?] = ["Hello"]; // ✅ OK
let optionalTuple2: [string, number?] = ["Hello", 10]; // ✅ OK
```

### 3.4 Enum (Enumeration)

```typescript
// Numeric Enum (Default: 0, 1, 2...)
enum Direction {
	Up, // 0
	Down, // 1
	Left, // 2
	Right, // 3
}
let move: Direction = Direction.Up;
console.log(move); // 0

// Custom start value
enum StatusCode {
	OK = 200,
	Created = 201,
	BadRequest = 400,
	NotFound = 404,
	ServerError = 500,
}
let status: StatusCode = StatusCode.OK;
console.log(status); // 200

// String Enum
enum UserRole {
	Admin = "ADMIN",
	Editor = "EDITOR",
	Viewer = "VIEWER",
}
let myRole: UserRole = UserRole.Admin;

// Heterogeneous Enum (Mixed) — এড়িয়ে চলুন
enum Mixed {
	No = 0,
	Yes = "YES",
}

// const enum — Compile time optimize
const enum Permission {
	Read = 1,
	Write = 2,
	Execute = 4,
}
let perm: Permission = Permission.Read | Permission.Write;
```

### 3.5 Special Types: any, unknown, never, void

```typescript
// ───────────────────────────────────────────────
// any — যেকোনো type (TypeScript off করে দেয় — এড়িয়ে চলুন)
// ───────────────────────────────────────────────
let anything: any = "hello";
anything = 42;
anything = true;
anything.someRandomMethod(); // ❌ No error — Dangerous!

// Use case: Migration time এ JS code থেকে TS এ আনার সময়
function logAny(value: any): void {
	console.log(value);
}

// ───────────────────────────────────────────────
// unknown — যেকোনো type, কিন্তু safe (any এর safe alternative)
// ───────────────────────────────────────────────
let notSure: unknown = "hello";
notSure = 42;
notSure = { name: "Rahim" };

// Directly use করা যায় না — type narrowing করতে হয়
// console.log(notSure.toUpperCase()); // ❌ Error

if (typeof notSure === "string") {
	console.log(notSure.toUpperCase()); // ✅ OK — narrowed to string
}

// Type assertion দিয়েও করা যায়
let strValue: unknown = "TypeScript";
console.log((strValue as string).length); // ✅ OK

// ───────────────────────────────────────────────
// void — কিছু return করে না
// ───────────────────────────────────────────────
function sayHello(): void {
	console.log("Hello!");
	// return "hi"; // ❌ Error
}

function processData(data: string): void {
	console.log(`Processing: ${data}`);
}

// void variable — শুধু null বা undefined assign করা যায়
let unusable: void = undefined;

// ───────────────────────────────────────────────
// never — কখনো return করে না (Error throw বা infinite loop)
// ───────────────────────────────────────────────
function throwError(message: string): never {
	throw new Error(message);
	// কোনো return statement থাকবে না
}

function infiniteLoop(): never {
	while (true) {
		console.log("Running forever...");
	}
}

// Exhaustive checking এ ব্যবহার
function assertNever(value: never): never {
	throw new Error(`Unexpected value: ${value}`);
}
```

---

## 📌 4. Type Inference (টাইপ অনুমান)

TypeScript smart — সবসময় explicit type লিখতে হয় না

```typescript
// ✅ Type Inference — TypeScript নিজে বুঝে নেয়
let inferredString = "Hello"; // Type: string
let inferredNumber = 42; // Type: number
let inferredBoolean = true; // Type: boolean
let inferredArray = [1, 2, 3]; // Type: number[]

// ❌ Implicit any — Avoid করুন
// let something;               // Type: any (strict mode এ error)
// something = "hello";
// something = 42;

// ✅ Best Practice: Initialize করুন
let something: string; // Explicit type declare
something = "hello";
// something = 42;             // ❌ Error

// Function return type inference
function multiply(a: number, b: number) {
	return a * b; // TypeScript বুঝে নেয় return type: number
}
let result = multiply(5, 3); // result: number

// Array inference
let mixedArray = [1, "hello", true]; // Type: (string | number | boolean)[]

// Object inference
let user = {
	name: "Rahim",
	age: 25,
}; // Type: { name: string; age: number; }

// user.name = 123;             // ❌ Error
// user.email = "test@test.com"; // ❌ Error — email property নেই
```

### When to Explicitly Type?

```typescript
// ✅ Explicit type লাগে যখন:
// 1. Function parameters
function greet(name: string): string {
	return `Hello, ${name}`;
}

// 2. Empty array initialize
let emptyNumbers: number[] = []; // Without :number[] it would be any[]
emptyNumbers.push(1); // ✅ OK

// 3. Object with specific shape
let person: { name: string; age: number } = {
	name: "Rahim",
	age: 25,
};

// 4. Complex return types
function getUser(): { id: number; name: string } {
	return { id: 1, name: "Rahim" };
}

// 5. Variable declare করার সময় assign না করলে
let futureValue: string;
// পরে assign করা হবে
futureValue = "Hello";
```

---

## 📌 5. Type Aliases & Interfaces

### 5.1 Type Alias (`type`)

```typescript
// Basic Type Alias
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42;
// value = true;  // ❌ Error

// Object Type Alias
type User = {
	id: number;
	name: string;
	email: string;
	isActive?: boolean; // Optional property
};

let user1: User = {
	id: 1,
	name: "Rahim",
	email: "rahim@example.com",
	isActive: true,
};

let user2: User = {
	id: 2,
	name: "Karim",
	email: "karim@example.com",
	// isActive optional — দিলেও হয়, না দিলেও হয়
};

// Readonly property
type Point = {
	readonly x: number;
	readonly y: number;
};

let point: Point = { x: 10, y: 20 };
// point.x = 15;  // ❌ Error: Cannot assign to 'x' because it is a read-only property

// Function Type Alias
type MathOperation = (a: number, b: number) => number;

let add: MathOperation = (x, y) => x + y;
let subtract: MathOperation = (x, y) => x - y;

console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6

// Union Type Alias
type Status = "pending" | "success" | "error";
let currentStatus: Status = "success";
// currentStatus = "loading";  // ❌ Error

// Tuple Type Alias
type NameAgeTuple = [string, number];
let personTuple: NameAgeTuple = ["Rahim", 25];
```

### 5.2 Interface (`interface`)

```typescript
// Basic Interface
interface Person {
	firstName: string;
	lastName: string;
	age: number;
	email?: string; // Optional
}

let person1: Person = {
	firstName: "Abdul",
	lastName: "Rahim",
	age: 30,
};

// Interface with Methods
interface Animal {
	name: string;
	makeSound(): void;
	getInfo(): string;
}

let dog: Animal = {
	name: "Buddy",
	makeSound() {
		console.log("Woof!");
	},
	getInfo() {
		return `Name: ${this.name}`;
	},
};

dog.makeSound(); // "Woof!"
console.log(dog.getInfo()); // "Name: Buddy"

// Interface with Index Signature
interface StringDictionary {
	[key: string]: string;
}

let translations: StringDictionary = {
	hello: "Hola",
	goodbye: "Adios",
};

// Readonly Interface
interface Config {
	readonly apiUrl: string;
	readonly timeout: number;
}

let appConfig: Config = {
	apiUrl: "https://api.example.com",
	timeout: 5000,
};
// appConfig.apiUrl = "...";  // ❌ Error
```

### 5.3 Interface Extension (Inheritance)

```typescript
// Base Interface
interface Shape {
	color: string;
}

// Extending Interface
interface Square extends Shape {
	sideLength: number;
}

let mySquare: Square = {
	color: "red",
	sideLength: 10,
};

// Multiple Extension
interface Printable {
	print(): void;
}

interface Serializable {
	serialize(): string;
}

interface Document extends Printable, Serializable {
	title: string;
	content: string;
}

let myDoc: Document = {
	title: "My Report",
	content: "Lorem ipsum...",
	print() {
		console.log(this.content);
	},
	serialize() {
		return JSON.stringify(this);
	},
};

// Interface Merging (Declaration Merging)
interface Car {
	brand: string;
}

interface Car {
	model: string; // Same interface — merge হবে
}

// Final Car interface has: brand + model
let myCar: Car = {
	brand: "Toyota",
	model: "Corolla",
};
```

### 5.4 `type` vs `interface` — কখন কোনটি?

```typescript
// ───────────────────────────────────────────────
// ✅ Interface use করুন যখন:
// ───────────────────────────────────────────────
// 1. Object shape define করতে
interface User {
	name: string;
}

// 2. Class implement করতে
interface Drawable {
	draw(): void;
}

class Circle implements Drawable {
	draw() {
		console.log("Drawing circle");
	}
}

// 3. Extension দরকার হলে
interface Admin extends User {
	permissions: string[];
}

// 4. Declaration merging দরকার হলে

// ───────────────────────────────────────────────
// ✅ Type use করুন যখন:
// ───────────────────────────────────────────────
// 1. Union type দরকার হলে
type Status = "active" | "inactive" | "pending";

// 2. Tuple type দরকার হলে
type Coordinate = [number, number];

// 3. Primitive alias দরকার হলে
type UserID = string;

// 4. Complex mapped/conditional type দরকার হলে (Advanced)

type PartialUser = {
	[K in keyof User]?: User[K];
};

// ───────────────────────────────────────────────
// 📌 General Rule:
// Object shape → Interface
// Everything else → Type
// ───────────────────────────────────────────────
```

---

## 📌 6. Complete Practice Examples

### Example 1: Student Management System

```typescript
// Type Definitions
type StudentID = string | number;

interface Student {
	id: StudentID;
	name: string;
	age: number;
	grades: number[];
	isEnrolled: boolean;
	address?: {
		// Optional nested object
		city: string;
		country: string;
	};
}

// Function to create student
function createStudent(id: StudentID, name: string, age: number): Student {
	return {
		id,
		name,
		age,
		grades: [],
		isEnrolled: true,
	};
}

// Function to add grade
function addGrade(student: Student, grade: number): void {
	if (grade < 0 || grade > 100) {
		console.log("Invalid grade!");
		return;
	}
	student.grades.push(grade);
}

// Function to calculate average
function getAverageGrade(student: Student): number {
	if (student.grades.length === 0) return 0;
	const sum = student.grades.reduce((a, b) => a + b, 0);
	return sum / student.grades.length;
}

// Usage
let student1 = createStudent(101, "Rahim", 20);
addGrade(student1, 85);
addGrade(student1, 90);
addGrade(student1, 78);

console.log(student1);
console.log(`Average: ${getAverageGrade(student1)}`); // Average: 84.33
```

### Example 2: E-commerce Product System

```typescript
// Enum for categories
enum ProductCategory {
	Electronics = "ELECTRONICS",
	Clothing = "CLOTHING",
	Food = "FOOD",
	Books = "BOOKS",
}

// Interface for Product
interface Product {
	readonly id: number;
	name: string;
	price: number;
	category: ProductCategory;
	inStock: boolean;
	tags?: string[];
}

// Type for Cart Item
type CartItem = {
	product: Product;
	quantity: number;
};

// Shopping Cart Interface
interface ShoppingCart {
	items: CartItem[];
	addItem(product: Product, quantity: number): void;
	removeItem(productId: number): void;
	getTotal(): number;
	getItemCount(): number;
}

// Implementation
const cart: ShoppingCart = {
	items: [],

	addItem(product, quantity) {
		if (quantity <= 0) {
			console.log("Quantity must be positive!");
			return;
		}
		if (!product.inStock) {
			console.log("Product out of stock!");
			return;
		}
		this.items.push({ product, quantity });
	},

	removeItem(productId) {
		this.items = this.items.filter((item) => item.product.id !== productId);
	},

	getTotal() {
		return this.items.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0
		);
	},

	getItemCount() {
		return this.items.reduce((count, item) => count + item.quantity, 0);
	},
};

// Create products
let laptop: Product = {
	id: 1,
	name: "MacBook Pro",
	price: 1299.99,
	category: ProductCategory.Electronics,
	inStock: true,
	tags: ["laptop", "apple"],
};

let tshirt: Product = {
	id: 2,
	name: "Cotton T-Shirt",
	price: 19.99,
	category: ProductCategory.Clothing,
	inStock: true,
};

// Use cart
cart.addItem(laptop, 1);
cart.addItem(tshirt, 3);

console.log(`Total: $${cart.getTotal()}`); // Total: $1359.96
console.log(`Items: ${cart.getItemCount()}`); // Items: 4
```

### Example 3: API Response Handler

```typescript
// Generic API Response Type
type ApiResponse<T> = {
	success: boolean;
	data: T;
	message?: string;
	timestamp: number;
};

// User Data Type
type UserData = {
	id: number;
	username: string;
	email: string;
	role: "admin" | "user" | "guest";
};

// Product Data Type
type ProductData = {
	id: number;
	title: string;
	price: number;
	category: string;
};

// Simulated API function
function fetchUser(id: number): ApiResponse<UserData> {
	return {
		success: true,
		data: {
			id: id,
			username: "rahim123",
			email: "rahim@example.com",
			role: "user",
		},
		timestamp: Date.now(),
	};
}

function fetchProducts(): ApiResponse<ProductData[]> {
	return {
		success: true,
		data: [
			{ id: 1, title: "Laptop", price: 999, category: "Electronics" },
			{ id: 2, title: "Phone", price: 699, category: "Electronics" },
		],
		timestamp: Date.now(),
	};
}

// Usage
let userResponse = fetchUser(1);
console.log(userResponse.data.username); // TypeScript knows it's string

let productResponse = fetchProducts();
console.log(productResponse.data[0].price); // TypeScript knows it's number

// Error Response
let errorResponse: ApiResponse<null> = {
	success: false,
	data: null,
	message: "User not found",
	timestamp: Date.now(),
};
```

---

## 📌 7. Common Mistakes & Solutions

```typescript
// ❌ Mistake 1: Using any everywhere
let data: any = fetchData();
data.someMethod(); // No error, but might crash at runtime

// ✅ Solution: Use proper types or unknown
let data2: unknown = fetchData();
if (typeof data2 === "object" && data2 !== null) {
	// Safe to use
}

// ❌ Mistake 2: Optional property access without check
interface User {
	name: string;
	address?: { city: string };
}
let u: User = { name: "Rahim" };
// console.log(u.address.city);  // ❌ Runtime error!

// ✅ Solution: Optional chaining
console.log(u.address?.city); // undefined (no error)

// ❌ Mistake 3: Mutating readonly
interface Config {
	readonly apiKey: string;
}
let cfg: Config = { apiKey: "abc123" };
// cfg.apiKey = "new";  // ❌ Compile error

// ✅ Solution: Create new object
let newCfg: Config = { ...cfg, apiKey: "new123" };

// ❌ Mistake 4: Wrong tuple assignment
let coord: [number, number] = [10, 20];
// coord = [10, 20, 30];  // ❌ Error: too many elements
// coord = ["10", 20];    // ❌ Error: wrong type

// ✅ Solution: Use proper types
let coord2: [number, number, number?] = [10, 20]; // Optional 3rd
let coord3: [number, number] = [10, 20]; // Strict 2

// ❌ Mistake 5: Forgetting function return type
function calculate(a: number, b: number) {
	return a + b; // inferred: number
}
// But explicit is better for complex functions
function calculateExplicit(a: number, b: number): number {
	return a + b;
}
```

---

## 📌 8. Quick Reference Cheat Sheet

```typescript
// ─── Variables ───
let str: string = "text";
let num: number = 42;
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let tuple: [string, number] = ["age", 25];
let anyVal: any = "anything";
let unknownVal: unknown = "safe";
let voidFn = (): void => {};
let neverFn = (): never => {
	throw new Error();
};

// ─── Type Alias ───
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;

// ─── Interface ───
interface Person {
	name: string;
	age: number;
	greet(): string;
}
interface Employee extends Person {
	salary: number;
}

// ─── Enum ───
enum Color {
	Red,
	Green,
	Blue,
}
enum Status {
	Active = "ACTIVE",
	Inactive = "INACTIVE",
}

// ─── Union & Intersection ───
type A = { a: string };
type B = { b: number };
type AorB = A | B; // Union
type AandB = A & B; // Intersection

// ─── Optional & Readonly ───
interface Opt {
	required: string;
	optional?: string;
	readonly fixed: number;
}
```

---

## 🎯 Practice Tasks

1. **Task 1:** একটি `Book` interface তৈরি করুন যার properties হবে: `id` (readonly), `title`, `author`, `price`, `isAvailable` (optional), এবং `tags` (string array, optional)।

2. **Task 2:** একটি `Library` type alias তৈরি করুন যা `books: Book[]` এবং `addBook()`, `findBook()`, `listAvailableBooks()` methods থাকবে।

3. **Task 3:** একটি enum তৈরি করুন `Genre` নামে যার values হবে: Fiction, NonFiction, Science, History।

4. **Task 4:** একটি function লিখুন `calculateDiscount(price: number, discountPercent: number): number` যা discounted price return করবে।

5. **Task 5:** একটি tuple type তৈরি করুন `BookInfo` যা `[string, number, boolean]` হবে (title, pageCount, isHardcover)।

---

> **Next Step:** Phase 2 — Intermediate Type System (Union, Intersection, Generics, Utility Types) শেখার জন্য বলুন!
