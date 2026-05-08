// ═══════════════════════════════════════════════════════════════
// 07_type_vs_interface.ts — type vs interface: কখন কোনটি?
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// ✅ Interface use করুন যখন:
// ═══════════════════════════════════════

// 1. Object shape define করতে
interface User {
	name: string;
	age: number;
}

// 2. Class implement করতে
interface Drawable {
	draw(): void;
}

class Rectangle implements Drawable {
	draw() {
		console.log("Drawing rectangle");
	}
}

// 3. Extension দরকার হলে
interface Admin extends User {
	permissions: string[];
}

let admin: Admin = {
	name: "Rahim",
	age: 30,
	permissions: ["read", "write", "delete"],
};

// 4. Declaration merging দরকার হলে
interface Product {
	id: number;
}

interface Product {
	name: string;
}

// Final Product = { id: number; name: string }
let product: Product = { id: 1, name: "Laptop" };

// ═══════════════════════════════════════
// ✅ Type use করুন যখন:
// ═══════════════════════════════════════

// 1. Union type দরকার হলে
type Status = "active" | "inactive" | "pending";
let userStatus: Status = "active";

// 2. Tuple type দরকার হলে
type Coordinate = [number, number];
let location: Coordinate = [23.8103, 90.4125];

// 3. Primitive alias দরকার হলে
type UserID = string;
let id: UserID = "user_123";

// 4. Intersection type দরকার হলে
type A = { a: string };
type B = { b: number };
type AandB = A & B;

let combined: AandB = { a: "hello", b: 42 };

// 5. Complex mapped type (Advanced)
type PartialUser = {
	[K in keyof User]?: User[K];
};

let partialUser: PartialUser = { name: "Rahim" }; // age optional

// ═══════════════════════════════════════
// 📌 General Rule:
// Object shape → Interface
// Everything else → Type
// ═══════════════════════════════════════

console.log("Admin:", admin);
console.log("Product:", product);
console.log("Combined:", combined);

export {};
