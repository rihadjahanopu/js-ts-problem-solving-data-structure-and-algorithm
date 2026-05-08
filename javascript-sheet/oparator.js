// ============================================
// JAVASCRIPT OPERATORS - COMPLETE CHEAT SHEET
// ============================================

// ============================================
// 1. ARITHMETIC OPERATORS (গাণিতিক)
// ============================================

let a = 10,
	b = 3;

console.log("=== ARITHMETIC OPERATORS ===");
console.log(a + b); // 13 - Addition (যোগ)
console.log(a - b); // 7 - Subtraction (বিয়োগ)
console.log(a * b); // 30 - Multiplication (গুণ)
console.log(a / b); // 3.333... - Division (ভাগ)
console.log(a % b); // 1 - Modulus (ভাগশেষ)
console.log(a ** b); // 1000 - Exponentiation (ঘাত)

// Increment/Decrement
let c = 5;
console.log(++c); // 6 - Prefix Increment (আগে বাড়ায়)
console.log(c++); // 6 - Postfix Increment (পরে বাড়ায়)
console.log(--c); // 6 - Prefix Decrement
console.log(c--); // 6 - Postfix Decrement

// ============================================
// 2. ASSIGNMENT OPERATORS (মান নির্ধারণ)
// ============================================

console.log("\n=== ASSIGNMENT OPERATORS ===");
let x = 10;
console.log((x += 5)); // 15 (x = x + 5)
console.log((x -= 3)); // 12 (x = x - 3)
console.log((x *= 2)); // 24 (x = x * 2)
console.log((x /= 4)); // 6 (x = x / 4)
console.log((x %= 4)); // 2 (x = x % 4)
console.log((x **= 3)); // 8 (x = x ** 3)

// Logical Assignment (ES2021)
let y = null;
console.log((y ??= 10)); // 10 (nullish coalescing assignment)
let z = 0;
console.log((z ||= 20)); // 20 (logical OR assignment)
let w = 5;
console.log((w &&= 10)); // 10 (logical AND assignment)

// ============================================
// 3. COMPARISON OPERATORS (তুলনা)
// ============================================

console.log("\n=== COMPARISON OPERATORS ===");
let p = 5,
	q = "5",
	r = 10;

console.log(p == q); // true (loose equality - শুধু মান)
console.log(p === q); // false (strict equality - মান+টাইপ) ✅
console.log(p != q); // false (loose not equal)
console.log(p !== q); // true (strict not equal)
console.log(p > 3); // true
console.log(p < 10); // true
console.log(p >= 5); // true
console.log(p <= 4); // false

// ============================================
// 4. LOGICAL OPERATORS (যৌক্তিক)
// ============================================

console.log("\n=== LOGICAL OPERATORS ===");
let isLogged = true;
let isAdmin = false;

console.log(isLogged && isAdmin); // false (AND - দুটোই true)
console.log(isLogged || isAdmin); // true (OR - একটা true)
console.log(!isLogged); // false (NOT - উল্টো)

// Short-circuit evaluation
let user = null;
let name = user && user.name; // null (প্রথম falsy)
let display = user || "Guest"; // "Guest" (প্রথম truthy)
let count = 0 ?? 10; // 0 (nullish coalescing)

// ============================================
// 5. BITWISE OPERATORS (বিটওয়াইজ)
// ============================================

console.log("\n=== BITWISE OPERATORS ===");
let m = 5; // 0101
let n = 3; // 0011

console.log(m & n); // 1  (AND - 0101 & 0011 = 0001)
console.log(m | n); // 7  (OR - 0101 | 0011 = 0111)
console.log(m ^ n); // 6  (XOR - 0101 ^ 0011 = 0110)
console.log(~m); // -6 (NOT - সব বিট উল্টে)
console.log(m << 1); // 10 (Left shift - 0101 -> 1010)
console.log(m >> 1); // 2  (Right shift - 0101 -> 0010)
console.log(m >>> 1); // 2  (Unsigned right shift)

// Practical: Permission flags
const READ = 1,
	WRITE = 2,
	EXECUTE = 4;
let perm = READ | WRITE;
console.log(perm & READ ? "Can Read" : "No"); // Can Read

// ============================================
// 6. TERNARY OPERATOR (ত্রয়ী)
// ============================================

console.log("\n=== TERNARY OPERATOR ===");
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // Adult

// Nested ternary
let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(grade); // B

// Multiple expressions with comma
let result = true ? (console.log("Yes"), 100) : (console.log("No"), 0);

// ============================================
// 7. TYPE OPERATORS (টাইপ চেক)
// ============================================

console.log("\n=== TYPE OPERATORS ===");
console.log(typeof "Hello"); // string
console.log(typeof 123); // number
console.log(typeof true); // boolean
console.log(typeof {}); // object
console.log(typeof []); // object ⚠️
console.log(typeof null); // object ⚠️ (bug)
console.log(typeof undefined); // undefined
console.log(typeof function () {}); // function

// instanceof
class Animal {}
class Dog extends Animal {}
let dog = new Dog();
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true

// ============================================
// 8. IN OPERATOR (প্রপার্টি চেক)
// ============================================

console.log("\n=== IN OPERATOR ===");
let person = { name: "Rahim", age: 25 };
console.log("name" in person); // true
console.log("salary" in person); // false

let arr = [10, 20, 30];
console.log(0 in arr); // true
console.log(3 in arr); // false
console.log("length" in arr); // true

// ============================================
// 9. DELETE OPERATOR (মুছে ফেলা)
// ============================================

console.log("\n=== DELETE OPERATOR ===");
let obj = { a: 1, b: 2, c: 3 };
delete obj.b;
console.log(obj); // {a: 1, c: 3}

// Array তে delete করলে hole তৈরি হয়
let myArr = [1, 2, 3];
delete myArr[1];
console.log(myArr); // [1, empty, 3]
console.log(myArr.length); // 3 (length কমে না!)

// ============================================
// 10. SPREAD & REST OPERATORS (...)
// ============================================

console.log("\n=== SPREAD & REST ===");
// Spread
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 };
console.log(obj2); // {a: 1, b: 2, c: 3}

// Rest
function sum(...numbers) {
	return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Destructuring with rest
let [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first, rest); // 1 [2, 3, 4, 5]

// ============================================
// 11. OPTIONAL CHAINING (?.)
// ============================================

console.log("\n=== OPTIONAL CHAINING ===");
let userObj = {
	profile: {
		address: {
			city: "Dhaka",
		},
	},
};

let city = userObj?.profile?.address?.city;
console.log(city); // Dhaka

let zip = userObj?.profile?.address?.zipcode;
console.log(zip); // undefined (error নেই)

let methodResult = userObj?.getName?.();
console.log(methodResult); // undefined

// ============================================
// 12. NULLISH COALESCING (??)
// ============================================

console.log("\n=== NULLISH COALESCING ===");
let val1 = null ?? "default";
let val2 = undefined ?? "default";
let val3 = 0 ?? "default"; // 0 (falsy কিন্তু nullish নয়)
let val4 = "" ?? "default"; // "" (falsy কিন্তু nullish নয়)
let val5 = false ?? "default"; // false

console.log(val1, val2, val3, val4, val5);

// ============================================
// 13. VOID OPERATOR
// ============================================

console.log("\n=== VOID OPERATOR ===");
console.log(void 0); // undefined
console.log(void 0); // undefined

// IIFE with void
void (function () {
	console.log("IIFE runs!");
})();

// ============================================
// 14. COMMA OPERATOR (,)
// ============================================

console.log("\n=== COMMA OPERATOR ===");
let commaResult = (1, 2, 3, 4, 5);
console.log(commaResult); // 5 (শেষটা রিটার্ন হয়)

// Loop example
for (let i = 0, j = 10; i < j; i++, j--) {
	console.log(`i: ${i}, j: ${j}`);
}

// ============================================
// 15. GROUPING OPERATOR ()
// ============================================

console.log("\n=== GROUPING OPERATOR ===");
let calc = (2 + 3) * 4; // 20 (precedence নিয়ন্ত্রণ)
console.log(calc);

// IIFE
let iifeResult = (function () {
	return "Immediately Invoked";
})();
console.log(iifeResult);

// ============================================
// 16. ADVANCED COMBINATIONS
// ============================================

console.log("\n=== ADVANCED EXAMPLES ===");

// 1. Pipeline pattern
const pipe =
	(...fns) =>
	(x) =>
		fns.reduce((v, f) => f(v), x);
const add5 = (x) => x + 5;
const double = (x) => x * 2;
const result1 = pipe(add5, double)(10);
console.log(result1); // 30

// 2. Bitwise tricks
let int = 17.89 | 0; // 17 (fast integer conversion)
console.log(int);

// Swap without temp
let x1 = 5,
	y1 = 10;
x1 ^= y1;
y1 ^= x1;
x1 ^= y1;
console.log(x1, y1); // 10 5

// 3. Complex destructuring
let complex = {
	data: {
		users: [
			{ id: 1, name: "Alice" },
			{ id: 2, name: "Bob" },
		],
	},
};

let {
	data: {
		users: [, secondUser],
	},
} = complex;
console.log(secondUser.name); // Bob

// 4. Logical assignment chain
let config = {
	timeout: 0,
	retries: null,
	port: undefined,
};

config.timeout ??= 5000; // 0 থাকবে
config.retries ??= 3; // 3 হবে
config.port ??= 8080; // 8080 হবে
console.log(config);

// ============================================
// OPERATOR PRECEDENCE (গুরুত্ব ক্রম)
// ============================================

/*
1.  ()                    - Grouping
2.  ., [], new, ()        - Member access, call
3.  ++, --, !, ~, typeof  - Unary
4.  **                    - Exponentiation
5.  *, /, %               - Multiplicative
6.  +, -                  - Additive
7.  <, <=, >, >=, in      - Relational
8.  ==, !=, ===, !==      - Equality
9.  &                     - Bitwise AND
10. ^                     - Bitwise XOR
11. |                     - Bitwise OR
12. &&                    - Logical AND
13. ||                    - Logical OR
14. ??                    - Nullish coalescing
15. ? :                   - Conditional
16. =, +=, etc.           - Assignment
17. ,                     - Comma
*/

// ============================================
// QUICK REFERENCE TABLE
// ============================================

/*
| Operator | Name | Example | Result |
|----------|------|---------|--------|
| + | Addition | 5 + 3 | 8 |
| - | Subtraction | 5 - 3 | 2 |
| * | Multiplication | 5 * 3 | 15 |
| / | Division | 5 / 2 | 2.5 |
| % | Modulus | 5 % 2 | 1 |
| ** | Exponent | 2 ** 3 | 8 |
| ++ | Increment | ++5 / 5++ | 6 / 5 |
| -- | Decrement | --5 / 5-- | 4 / 5 |
| == | Equal | 5 == "5" | true |
| === | Strict Equal | 5 === "5" | false ✅ |
| != | Not Equal | 5 != "5" | false |
| !== | Strict Not Equal | 5 !== "5" | true ✅ |
| > | Greater | 5 > 3 | true |
| < | Less | 5 < 3 | false |
| >= | Greater/Equal | 5 >= 5 | true |
| <= | Less/Equal | 5 <= 5 | true |
| && | AND | true && false | false |
| \|\| | OR | true \|\| false | true |
| ! | NOT | !true | false |
| ?? | Nullish | null ?? "A" | "A" |
| ?. | Optional | obj?.prop | safe access |
| ... | Spread | [...arr] | copy/expand |
| ... | Rest | (...args) | collect args |
| ? : | Ternary | a ? b : c | conditional |
| typeof | Type | typeof 123 | "number" |
| instanceof | Instance | obj instanceof Class | boolean |
| in | Property | "x" in obj | boolean |
| delete | Delete | delete obj.x | boolean |
| void | Void | void 0 | undefined |
| , | Comma | (1, 2, 3) | 3 |
*/

console.log("\n=== END OF REFERENCE ===");
