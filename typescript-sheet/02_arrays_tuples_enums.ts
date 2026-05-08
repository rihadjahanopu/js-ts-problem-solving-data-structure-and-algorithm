// ═══════════════════════════════════════════════════════════════
// 02_arrays_tuples_enums.ts — অ্যারে, টিউপল এবং এনাম
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// অ্যারে (Array)
// ═══════════════════════════════════════

// Method 1: Type[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Rahim", "Karim", "Jamal"];

// Method 2: Array<Type>
let scores: Array<number> = [85, 90, 78];
let cities: Array<string> = ["Dhaka", "Chittagong", "Sylhet"];

// Mixed array
let mixed: (string | number)[] = ["hello", 42, "world", 100];

// Array methods — TypeScript auto type বুঝে নেয়
numbers.push(6);
// numbers.push("six"); // ❌ Error
let firstNumber: number = numbers[0];

console.log("Numbers:", numbers);
console.log("First number:", firstNumber);

// ═══════════════════════════════════════
// টিউপল (Tuple) — Fixed-length, Fixed-type
// ═══════════════════════════════════════

let person: [string, number, boolean] = ["Rahim", 25, true];

// Destructuring
let [pName, pAge, pActive] = person;
console.log(`Name: ${pName}, Age: ${pAge}, Active: ${pActive}`);

// Coordinate example
let coordinate: [number, number] = [23.8103, 90.4125];
console.log(`Lat: ${coordinate[0]}, Long: ${coordinate[1]}`);

// Optional tuple element
let optionalTuple: [string, number?] = ["Hello"];
let optionalTuple2: [string, number?] = ["Hello", 10];

// ═══════════════════════════════════════
// এনাম (Enum)
// ═══════════════════════════════════════

// Numeric Enum
enum Direction {
	Up, // 0
	Down, // 1
	Left, // 2
	Right, // 3
}
let move: Direction = Direction.Up;
console.log("Direction Up value:", move); // 0
console.log("Direction name:", Direction[move]); // "Up"

// Custom start value
enum StatusCode {
	OK = 200,
	Created = 201,
	BadRequest = 400,
	NotFound = 404,
	ServerError = 500,
}
let status: StatusCode = StatusCode.OK;
console.log("Status:", status); // 200

// String Enum
enum UserRole {
	Admin = "ADMIN",
	Editor = "EDITOR",
	Viewer = "VIEWER",
}
let myRole: UserRole = UserRole.Admin;
console.log("Role:", myRole); // "ADMIN"

// const enum — Compile time optimize
const enum Permission {
	Read = 1,
	Write = 2,
	Execute = 4,
}
let perm: Permission = Permission.Read | Permission.Write;
console.log("Permission:", perm); // 3

export {};
