// ============================
// JAVASCRIPT NUMBERS - A TO Z
// ============================

// ---------- A: Assignment ----------
let a = 100;
let b = 99.99;
let c = -50;
console.log(a, b, c);
// Console: 100 99.99 -50

// ---------- B: Binary (0b) ----------
let binary = 0b1010; // 10 in decimal
console.log(binary);
// Console: 10

// ---------- C: Constructor ----------
let num1 = new Number(123); // Object
let num2 = Number(123); // Primitive
console.log(typeof num1, typeof num2);
// Console: object number

// ---------- D: Decimal (Float) ----------
let decimal = 3.14159;
console.log(decimal);
// Console: 3.14159

// ---------- E: Exponential (Scientific) ----------
let exp = 5e6; // 5 * 10^6 = 5000000
let exp2 = 5e-6; // 0.000005
console.log(exp, exp2);
// Console: 5000000 0.000005

// ---------- F: Floating Point Precision ----------
let f = 0.1 + 0.2;
console.log(f);
// Console: 0.30000000000000004 (Precision issue)

// ---------- G: Global Methods ----------
let g = parseInt("100px");
let g2 = parseFloat("99.99$");
console.log(g, g2);
// Console: 100 99.99

// ---------- H: Hexadecimal (0x) ----------
let hex = 0xff; // 255 in decimal
console.log(hex);
// Console: 255

// ---------- I: Infinity ----------
let i = 1 / 0;
console.log(i);
// Console: Infinity

let negInf = -1 / 0;
console.log(negInf);
// Console: -Infinity

// ---------- J: isInteger() ----------
console.log(Number.isInteger(10)); // true
console.log(Number.isInteger(10.5)); // false
// Console: true false

// ---------- K: isNaN() ----------
console.log(isNaN("Hello")); // true
console.log(isNaN(123)); // false
// Console: true false

// ---------- L: Large Numbers (BigInt) ----------
let big = 9007199254740991n; // BigInt
let big2 = BigInt(123);
console.log(big, big2);
// Console: 9007199254740991n 123n

// ---------- M: MAX_VALUE / MIN_VALUE ----------
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324
// Console: 1.7976931348623157e+308 5e-324

// ---------- N: NaN (Not a Number) ----------
let n = "abc" / 2;
console.log(n);
// Console: NaN

// ---------- O: Octal (0o) ----------
let octal = 0o17; // 15 in decimal
console.log(octal);
// Console: 15

// ---------- P: Precision ----------
let p = 999999999999999; // 15 digits precise
console.log(p);
// Console: 999999999999999

// ---------- Q: Quotient ----------
let q = 17 / 5;
console.log(q);
// Console: 3.4

// ---------- R: Remainder (Modulo) ----------
let r = 17 % 5;
console.log(r);
// Console: 2

// ---------- S: Safe Integer ----------
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
// Console: 9007199254740991 -9007199254740991

// ---------- T: Typeof ----------
console.log(typeof 42); // number
console.log(typeof 3.14); // number
console.log(typeof NaN); // number (special!)
// Console: number number number

// ---------- U: Unary Plus (+) ----------
let u = +"100";
console.log(u, typeof u);
// Console: 100 number

// ---------- V: ValueOf() ----------
let v = new Number(50);
console.log(v.valueOf());
// Console: 50

// ---------- W: Whole Number Check ----------
function isWhole(n) {
	return n % 1 === 0;
}
console.log(isWhole(10)); // true
console.log(isWhole(10.5)); // false
// Console: true false

// ---------- X: XOR (Bitwise) ----------
let x = 5 ^ 3; // 101 XOR 011 = 110 (6)
console.log(x);
// Console: 6

// ---------- Y: Yield (Generator - ES6) ----------
function* generator() {
	yield 1;
	yield 2;
	yield 3;
}
let gen = generator();
console.log(gen.next().value);
// Console: 1

// ---------- Z: Zero ----------
let z1 = 0;
let z2 = -0;
console.log(z1 === z2); // true (but different in division)
console.log(1 / z1, 1 / z2);
// Console: true Infinity -Infinity

// ================================
// NUMBER METHODS - COMPLETE GUIDE
// ================================

let num = 123.456789;

// ---------- 1. toExponential() ----------
// Scientific notation e diye
console.log(num.toExponential());
// Console: 1.23456789e+2

console.log(num.toExponential(2));
// Console: 1.23e+2

console.log((1234).toExponential());
// Console: 1.234e+3

// ---------- 2. toFixed() ----------
// Decimal point er por koto ghor
let price = 99.995;
console.log(price.toFixed(2));
// Console: 100.00

console.log((10).toFixed(4));
// Console: 10.0000

console.log((2.5).toFixed(0));
// Console: 3 (rounded)

// ---------- 3. toLocaleString() ----------
// Local format e (Bangladesh/India - en-IN)
let amount = 5000000;
console.log(amount.toLocaleString("en-IN"));
// Console: 50,00,000

console.log(amount.toLocaleString("en-US"));
// Console: 5,000,000

console.log(amount.toLocaleString("bn-BD"));
// Console: ৫০,০০,০০০ (Bangla number)

// Currency format
console.log(
	amount.toLocaleString("en-IN", {
		style: "currency",
		currency: "INR",
	})
);
// Console: ₹50,00,000.00

// ---------- 4. toPrecision() ----------
// Total koto ghor significant digit
let precise = 3.14159;
console.log(precise.toPrecision(3));
// Console: 3.14

console.log(precise.toPrecision(2));
// Console: 3.1

console.log((1234).toPrecision(2));
// Console: 1.2e+3 (scientific if needed)

// ---------- 5. toString() ----------
// Number ke string e convert + radix (base)
let convert = 255;
console.log(convert.toString());
// Console: "255"

console.log(convert.toString(2));
// Console: "11111111" (binary)

console.log(convert.toString(8));
// Console: "377" (octal)

console.log(convert.toString(16));
// Console: "ff" (hexadecimal)

console.log(convert.toString(36));
// Console: "73" (base 36)

// ---------- 6. valueOf() ----------
// Primitive value return
let objNum = new Number(42);
console.log(objNum.valueOf());
// Console: 42

console.log(typeof objNum.valueOf());
// Console: number

// =========================================
// STATIC NUMBER METHODS (Number.method())
// =========================================

// ---------- 7. Number.isFinite() ----------
console.log(Number.isFinite(123));
// Console: true

console.log(Number.isFinite(Infinity));
// Console: false

console.log(Number.isFinite("123"));
// Console: false (string, even if numeric)

// ---------- 8. Number.isInteger() ----------
console.log(Number.isInteger(5));
// Console: true

console.log(Number.isInteger(5.0));
// Console: true (5.0 === 5)

console.log(Number.isInteger(5.5));
// Console: false

// ---------- 9. Number.isNaN() ----------
console.log(Number.isNaN(NaN));
// Console: true

console.log(Number.isNaN("NaN"));
// Console: false (string)

console.log(Number.isNaN(0 / 0));
// Console: true

// ---------- 10. Number.isSafeInteger() ----------
console.log(Number.isSafeInteger(9007199254740991));
// Console: true (MAX_SAFE_INTEGER)

console.log(Number.isSafeInteger(9007199254740992));
// Console: false (unsafe)

// ---------- 11. Number.parseFloat() ----------
console.log(Number.parseFloat("3.14"));
// Console: 3.14

console.log(Number.parseFloat("3.14abc"));
// Console: 3.14 (stops at non-digit)

console.log(Number.parseFloat("  99.99  "));
// Console: 99.99 (whitespace trimmed)

// ---------- 12. Number.parseInt() ----------
console.log(Number.parseInt("100px"));
// Console: 100

console.log(Number.parseInt("100", 10));
// Console: 100 (decimal)

console.log(Number.parseInt("FF", 16));
// Console: 255 (hex to decimal)

console.log(Number.parseInt("77", 8));
// Console: 63 (octal to decimal)

console.log(Number.parseInt("1010", 2));
// Console: 10 (binary to decimal)

// =========================================
// GLOBAL FUNCTIONS (window/global scope)
// =========================================

// ---------- 13. parseInt() ----------
console.log(parseInt("50.99"));
// Console: 50 (integer part only)

// ---------- 14. parseFloat() ----------
console.log(parseFloat("50.99"));
// Console: 50.99

// ---------- 15. isNaN() ----------
console.log(isNaN("Hello"));
// Console: true (tries to convert first)

console.log(Number.isNaN("Hello"));
// Console: false (no conversion)

// ---------- 16. isFinite() ----------
console.log(isFinite(100));
// Console: true

console.log(isFinite(Infinity));
// Console: false

// =========================================
// MATH OBJECT METHODS (Related to Numbers)
// =========================================

// ---------- 17. Math Methods ----------
console.log(Math.round(4.5));
// Console: 5 (round to nearest)

console.log(Math.ceil(4.1));
// Console: 5 (round up)

console.log(Math.floor(4.9));
// Console: 4 (round down)

console.log(Math.trunc(4.9));
// Console: 4 (remove decimal)

console.log(Math.abs(-10));
// Console: 10 (absolute value)

console.log(Math.pow(2, 3));
// Console: 8 (2^3)

console.log(Math.sqrt(16));
// Console: 4 (square root)

console.log(Math.cbrt(27));
// Console: 3 (cube root)

console.log(Math.min(1, 5, -3, 10));
// Console: -3

console.log(Math.max(1, 5, -3, 10));
// Console: 10

console.log(Math.random());
// Console: 0.847293847... (0 to <1)

console.log(Math.PI);
// Console: 3.141592653589793

console.log(Math.E);
// Console: 2.718281828459045

// Advanced Math
console.log(Math.sign(-50));
// Console: -1 (negative)

console.log(Math.sign(50));
// Console: 1 (positive)

console.log(Math.sign(0));
// Console: 0

console.log(Math.log10(100));
// Console: 2 (log base 10)

console.log(Math.log2(8));
// Console: 3 (log base 2)

console.log(Math.exp(1));
// Console: 2.718281828459045 (e^1)

// =========================================
// ADVANCED TECHNIQUES & REAL WORLD EXAMPLES
// =========================================

// ---------- Formatting Currency ----------
function formatCurrency(amount, locale = "en-IN", currency = "INR") {
	return amount.toLocaleString(locale, {
		style: "currency",
		currency: currency,
	});
}
console.log(formatCurrency(500000));
// Console: ₹5,00,000.00

// ---------- Random Integer Generator ----------
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomInt(1, 100));
// Console: 42 (random between 1-100)

// ---------- Number Validation ----------
function isValidNumber(value) {
	return typeof value === "number" && !isNaN(value) && isFinite(value);
}
console.log(isValidNumber(100));
// Console: true

console.log(isValidNumber(NaN));
// Console: false

// ---------- Precision Handling ----------
function roundToPrecision(num, precision) {
	const factor = Math.pow(10, precision);
	return Math.round(num * factor) / factor;
}
console.log(roundToPrecision(3.14159, 2));
// Console: 3.14

// ---------- Pad Numbers ----------
function padNumber(num, length) {
	return num.toString().padStart(length, "0");
}
console.log(padNumber(42, 5));
// Console: "00042"

// ---------- Format Bytes ----------
function formatBytes(bytes) {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
console.log(formatBytes(1536000));
// Console: "1.46 MB"

// ---------- Number Range Check ----------
function inRange(num, min, max) {
	return num >= min && num <= max;
}
console.log(inRange(50, 1, 100));
// Console: true

// ---------- Generate OTP ----------
function generateOTP(length = 6) {
	const min = Math.pow(10, length - 1);
	const max = Math.pow(10, length) - 1;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(generateOTP());
// Console: 847291 (random 6 digit)

// ---------- Decimal to Fraction ----------
function toFraction(decimal) {
	const gcd = (a, b) => (b ? gcd(b, a % b) : a);
	const len = decimal.toString().length - 2;
	let num = decimal * Math.pow(10, len);
	let den = Math.pow(10, len);
	const divisor = gcd(num, den);
	return `${num / divisor}/${den / divisor}`;
}
console.log(toFraction(0.75));
// Console: "3/4"

// ---------- Number Counter Animation ----------
function animateCounter(element, target, duration = 2000) {
	let start = 0;
	const increment = target / (duration / 16);

	function update() {
		start += increment;
		if (start < target) {
			element.textContent = Math.floor(start);
			requestAnimationFrame(update);
		} else {
			element.textContent = target;
		}
	}
	update();
}
// Usage: animateCounter(document.getElementById('counter'), 1000);

// ---------- Check Prime ----------
function isPrime(num) {
	if (num <= 1) return false;
	if (num <= 3) return true;
	if (num % 2 === 0 || num % 3 === 0) return false;
	for (let i = 5; i * i <= num; i += 6) {
		if (num % i === 0 || num % (i + 2) === 0) return false;
	}
	return true;
}
console.log(isPrime(17));
// Console: true

// ---------- Factorial ----------
function factorial(n) {
	if (n === 0 || n === 1) return 1;
	return n * factorial(n - 1);
}
console.log(factorial(5));
// Console: 120

// ---------- Fibonacci ----------
function fibonacci(n) {
	if (n <= 1) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10));
// Console: 55

// =========================================
// ES6+ MODERN FEATURES
// =========================================

// Numeric Separators (ES2021)
const billion = 1_000_000_000;
console.log(billion);
// Console: 1000000000

const binaryExample = 0b1010_1111;
console.log(binaryExample);
// Console: 175

// BigInt Operations
const huge = 9007199254740991n;
const result = huge + 1n;
console.log(result);
// Console: 9007199254740992n

// Cannot mix BigInt and Number
// console.log(huge + 1); // Error!

// Math.clz32() - Count leading zeros
console.log(Math.clz32(1));
// Console: 31 (32-bit me 1 er age 31 ta 0)

// Math.imul() - 32-bit integer multiplication
console.log(Math.imul(0xffffffff, 5));
// Console: -5 (32-bit overflow handled)

// Math.fround() - Nearest 32-bit float
console.log(Math.fround(1.337));
// Console: 1.3370000123977661

// =========================================
// QUICK REFERENCE - ALL IN ONE
// =========================================

const numberCheatSheet = {
	// Properties
	MAX_VALUE: Number.MAX_VALUE, // 1.79e+308
	MIN_VALUE: Number.MIN_VALUE, // 5e-324
	MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER, // 9007199254740991
	MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER, // -9007199254740991
	POSITIVE_INFINITY: Infinity,
	NEGATIVE_INFINITY: -Infinity,
	NaN: NaN,
	EPSILON: Number.EPSILON, // 2.220446049250313e-16

	// Instance Methods
	toExponential: (n) => n.toExponential(2), // "1.23e+2"
	toFixed: (n) => n.toFixed(2), // "123.46"
	toLocaleString: (n) => n.toLocaleString(), // "123"
	toPrecision: (n) => n.toPrecision(4), // "123.5"
	toString: (n) => n.toString(16), // "7b" (hex)
	valueOf: (n) => n.valueOf(), // 123

	// Static Methods
	isFinite: Number.isFinite,
	isInteger: Number.isInteger,
	isNaN: Number.isNaN,
	isSafeInteger: Number.isSafeInteger,
	parseFloat: Number.parseFloat,
	parseInt: Number.parseInt,
};

// Test all
console.log(numberCheatSheet);

// ====== 1 SECOND COPY PASTE ======

// Basic
let number = 123.456;
number.toFixed(2); // "123.46"
number.toPrecision(4); // "123.5"
number.toExponential(2); // "1.23e+2"
number.toString(16); // "7b.74bc6a7ef9db" (hex)
// Static
Number.isInteger(5); // true
Number.isNaN(NaN); // true
Number.parseInt("100"); // 100
Number.parseFloat("3.14"); // 3.14

// Math
Math.round(4.5); // 5
Math.ceil(4.1); // 5
Math.floor(4.9); // 4
Math.trunc(4.9); // 4
Math.abs(-10); // 10
Math.pow(2, 3); // 8
Math.sqrt(16); // 4
Math.min(1, 2, 3); // 1
Math.max(1, 2, 3); // 3
Math.random(); // 0.XXX
Math.PI; // 3.14159...
