// ═══════════════════════════════════════════════════════════════
// 01_basics.ts — TypeScript মৌলিক টাইপসমূহ
// ═══════════════════════════════════════════════════════════════

// ─── string ───
let userName: string = "Rahim";
let greeting: string = `Hello, ${userName}!`;
console.log(greeting); // Hello, Rahim!

// ─── number ───
let age: number = 30;
let price: number = 99.99;
let hex: number = 0xff; // Hexadecimal
let binary: number = 0b1010; // Binary
console.log(`Age: ${age}, Price: ${price}`);

// ─── boolean ───
let isActive: boolean = true;
let isLoggedIn: boolean = false;

// ─── null & undefined ───
let emptyValue: null = null;
let notDefined: undefined = undefined;

// ─── bigint ───
let bigNumber: bigint = 9007199254740991n;

// ─── symbol ───
let uniqueId: symbol = Symbol("id");

// ─── Practice: Variable declare এবং type check ───
function showInfo(name: string, age: number, isStudent: boolean): void {
	console.log(`Name: ${name}`);
	console.log(`Age: ${age}`);
	console.log(`Student: ${isStudent ? "Yes" : "No"}`);
}

showInfo("Karim", 22, true);

export {};
