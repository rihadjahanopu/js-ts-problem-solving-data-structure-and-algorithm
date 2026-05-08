// ═══════════════════════════════════════════════════════════════
// 03_special_types.ts — any, unknown, never, void
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// any — যেকোনো type (Avoid করুন)
// ═══════════════════════════════════════
let anything: any = "hello";
anything = 42;
anything = true;
// anything.someRandomMethod(); // No error — Dangerous!

function logAny(value: any): void {
	console.log(value);
}
logAny("test");
logAny(123);

// ═══════════════════════════════════════
// unknown — any এর safe alternative
// ═══════════════════════════════════════
let notSure: unknown = "hello";
notSure = 42;
notSure = { name: "Rahim" };

// Directly use করা যায় না — type narrowing করতে হয়
// console.log(notSure.toUpperCase()); // ❌ Error

if (typeof notSure === "string") {
	console.log(notSure.toUpperCase()); // ✅ OK
}

// Type assertion দিয়েও করা যায়
let strValue: unknown = "TypeScript";
console.log((strValue as string).length); // ✅ 10

// ═══════════════════════════════════════
// void — কিছু return করে না
// ═══════════════════════════════════════
function sayHello(): void {
	console.log("Hello!");
	// return "hi"; // ❌ Error
}

function processData(data: string): void {
	console.log(`Processing: ${data}`);
}

sayHello();
processData("user data");

// void variable — শুধু null বা undefined
let unusable: void = undefined;

// ═══════════════════════════════════════
// never — কখনো return করে না
// ═══════════════════════════════════════
function throwError(message: string): never {
	throw new Error(message);
}

function infiniteLoop(): never {
	while (true) {
		console.log("Running...");
	}
}

// Exhaustive checking
function assertNever(value: never): never {
	throw new Error(`Unexpected value: ${value}`);
}

// Example: Exhaustive switch
type Shape = "circle" | "square" | "triangle";

function getShapeName(shape: Shape): string {
	switch (shape) {
		case "circle":
			return "Circle";
		case "square":
			return "Square";
		case "triangle":
			return "Triangle";
		default:
			return assertNever(shape as never);
	}
}

console.log(getShapeName("circle"));

export {};
