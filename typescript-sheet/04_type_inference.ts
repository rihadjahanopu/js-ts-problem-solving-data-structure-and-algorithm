// ═══════════════════════════════════════════════════════════════
// 04_type_inference.ts — টাইপ অনুমান (Type Inference)
// ═══════════════════════════════════════════════════════════════

// TypeScript নিজে বুঝে নেয়
let inferredString = "Hello"; // Type: string
let inferredNumber = 42; // Type: number
let inferredBoolean = true; // Type: boolean
let inferredArray = [1, 2, 3]; // Type: number[]

console.log(typeof inferredString); // string
console.log(typeof inferredNumber); // number

// Function return type inference
function multiply(a: number, b: number) {
	return a * b; // TypeScript বুঝে নেয় return type: number
}
let result = multiply(5, 3); // result: number
console.log("Multiply result:", result);

// Array inference
let mixedArray = [1, "hello", true]; // Type: (string | number | boolean)[]

// Object inference
let user = {
	name: "Rahim",
	age: 25,
}; // Type: { name: string; age: number; }

// user.name = 123;             // ❌ Error
// user.email = "test@test.com"; // ❌ Error

// ═══════════════════════════════════════
// কখন Explicit Type লাগে?
// ═══════════════════════════════════════

// 1. Function parameters
function greet(name: string): string {
	return `Hello, ${name}`;
}

// 2. Empty array initialize
let emptyNumbers: number[] = [];
emptyNumbers.push(1);
// emptyNumbers.push("one"); // ❌ Error

// 3. Object with specific shape
let person: { name: string; age: number } = {
	name: "Rahim",
	age: 25,
};

// 4. Variable declare করার সময় assign না করলে
let futureValue: string;
futureValue = "Hello";
// futureValue = 42; // ❌ Error

// 5. Complex return types
function getUser(): { id: number; name: string } {
	return { id: 1, name: "Rahim" };
}

let userData = getUser();
console.log("User:", userData);

export {};
