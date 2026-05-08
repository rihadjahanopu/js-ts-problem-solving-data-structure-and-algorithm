// ============================================
// JAVASCRIPT LOOPS - COMPLETE LEARNING GUIDE
// ============================================

console.log("========================================");
console.log("   JAVASCRIPT LOOPS - A TO Z");
console.log("========================================\n");

// ============================================
// 1. FOR LOOP (Most Common)
// ============================================
console.log("--- 1. BASIC FOR LOOP ---");

// Basic counting 0 to 4
for (let i = 0; i < 5; i++) {
	console.log("Count:", i);
}

console.log("\n--- A to Z using FOR LOOP ---");
// Print A to Z
for (let charCode = 65; charCode <= 90; charCode++) {
	console.log(String.fromCharCode(charCode));
}

console.log("\n--- Reverse Z to A ---");
for (let charCode = 90; charCode >= 65; charCode--) {
	console.log(String.fromCharCode(charCode));
}

console.log("\n--- Array with FOR LOOP ---");
const fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];
for (let i = 0; i < fruits.length; i++) {
	console.log(`Index ${i}: ${fruits[i]}`);
}

// ============================================
// 2. WHILE LOOP
// ============================================
console.log("\n\n--- 2. WHILE LOOP ---");

let count = 0;
while (count < 5) {
	console.log("While count:", count);
	count++;
}

console.log("\n--- Password Check Example ---");
let attempt = 0;
let password = "secret123";
let userInput = "secret123"; // Simulated input

while (attempt < 3) {
	if (userInput === password) {
		console.log("Access Granted!");
		break;
	}
	attempt++;
	console.log(`Attempt ${attempt} failed`);
}

// ============================================
// 3. DO...WHILE LOOP
// ============================================
console.log("\n\n--- 3. DO...WHILE LOOP ---");

let num = 0;
do {
	console.log("Do-While number:", num);
	num++;
} while (num < 3);

console.log("\n--- Menu System Example ---");
let menuChoice = 0;
do {
	console.log(`
    ===== MENU =====
    1. Play Game
    2. Settings
    3. Exit
    `);
	menuChoice++;
	console.log("Selected option:", menuChoice);
} while (menuChoice < 3);

// ============================================
// 4. FOR...OF LOOP (ES6 - For Iterables)
// ============================================
console.log("\n\n--- 4. FOR...OF LOOP ---");

// Array
const colors = ["Red", "Green", "Blue", "Yellow"];
console.log("Colors:");
for (const color of colors) {
	console.log("  →", color);
}

// String
const word = "HELLO";
console.log("\nLetters in 'HELLO':");
for (const letter of word) {
	console.log("  →", letter);
}

// Set (Unique values only)
const numbers = new Set([1, 2, 2, 3, 3, 3, 4]);
console.log("\nUnique numbers from Set:");
for (const num of numbers) {
	console.log("  →", num);
}

// Map
const userMap = new Map([
	["name", "John"],
	["age", 25],
	["city", "Dhaka"],
]);
console.log("\nMap entries:");
for (const [key, value] of userMap) {
	console.log(`  ${key}: ${value}`);
}

// ============================================
// 5. FOR...IN LOOP (For Objects)
// ============================================
console.log("\n\n--- 5. FOR...IN LOOP ---");

const student = {
	name: "Karim",
	age: 22,
	subject: "Computer Science",
	grade: "A+",
};

console.log("Student Object:");
for (const key in student) {
	console.log(`  ${key}: ${student[key]}`);
}

// Array index with for...in
const items = ["Pen", "Book", "Notebook"];
console.log("\nArray indices and values:");
for (const index in items) {
	console.log(`  Index ${index}: ${items[index]}`);
}

// ============================================
// 6. ADVANCED: BREAK & CONTINUE
// ============================================
console.log("\n\n--- 6. BREAK & CONTINUE ---");

console.log("Break at 5:");
for (let i = 0; i < 10; i++) {
	if (i === 5) break;
	console.log("  ", i);
}

console.log("\nContinue (skip even numbers):");
for (let i = 0; i < 10; i++) {
	if (i % 2 === 0) continue;
	console.log("  Odd number:", i);
}

// ============================================
// 7. NESTED LOOPS
// ============================================
console.log("\n\n--- 7. NESTED LOOPS ---");

console.log("Multiplication Table (1-3):");
for (let i = 1; i <= 3; i++) {
	for (let j = 1; j <= 3; j++) {
		console.log(`  ${i} × ${j} = ${i * j}`);
	}
}

console.log("\nStar Pattern:");
for (let i = 1; i <= 5; i++) {
	let line = "";
	for (let j = 1; j <= i; j++) {
		line += "* ";
	}
	console.log("  " + line);
}

console.log("\nNumber Triangle:");
for (let i = 1; i <= 5; i++) {
	let line = "";
	for (let j = 1; j <= i; j++) {
		line += j + " ";
	}
	console.log("  " + line);
}

// ============================================
// 8. ARRAY METHODS (Functional Loops)
// ============================================
console.log("\n\n--- 8. ARRAY METHODS (Advanced) ---");

const scores = [85, 92, 78, 95, 88];

// forEach
console.log("forEach:");
scores.forEach((score, index) => {
	console.log(`  Student ${index + 1}: ${score}`);
});

// map
console.log("\nmap (add 5 bonus):");
const newScores = scores.map((score) => score + 5);
console.log("  Original:", scores);
console.log("  New:", newScores);

// filter
console.log("\nfilter (above 90):");
const topScores = scores.filter((score) => score > 90);
console.log("  Top scores:", topScores);

// find
console.log("\nfind (first above 90):");
const firstTop = scores.find((score) => score > 90);
console.log("  First top score:", firstTop);

// reduce
console.log("\nreduce (total & average):");
const total = scores.reduce((sum, score) => sum + score, 0);
const average = total / scores.length;
console.log(`  Total: ${total}, Average: ${average.toFixed(2)}`);

// every & some
console.log("\nevery & some:");
const allPassed = scores.every((score) => score >= 60);
const anyPerfect = scores.some((score) => score === 100);
console.log(`  All passed: ${allPassed}, Any perfect: ${anyPerfect}`);

// ============================================
// 9. PRACTICAL EXAMPLES
// ============================================
console.log("\n\n--- 9. PRACTICAL EXAMPLES ---");

// Example 1: Sum of 1 to 100
console.log("Sum of 1 to 100:");
let sum = 0;
for (let i = 1; i <= 100; i++) {
	sum += i;
}
console.log(`  Result: ${sum}`);

// Example 2: Factorial
console.log("\nFactorial of 5:");
let factorial = 1;
for (let i = 1; i <= 5; i++) {
	factorial *= i;
}
console.log(`  5! = ${factorial}`);

// Example 3: Fibonacci Series
console.log("\nFibonacci Series (first 10):");
let a = 0,
	b = 1;
let fibSeries = [a, b];
for (let i = 2; i < 10; i++) {
	let next = a + b;
	fibSeries.push(next);
	a = b;
	b = next;
}
console.log("  ", fibSeries.join(", "));

// Example 4: Prime Numbers 1-50
console.log("\nPrime Numbers (1-50):");
for (let num = 2; num <= 50; num++) {
	let isPrime = true;
	for (let i = 2; i <= Math.sqrt(num); i++) {
		if (num % i === 0) {
			isPrime = false;
			break;
		}
	}
	if (isPrime) process.stdout.write(num + " ");
}
console.log();

// Example 5: Reverse String
console.log("\nReverse String:");
const original = "JavaScript";
let reversed = "";
for (let i = original.length - 1; i >= 0; i--) {
	reversed += original[i];
}
console.log(`  ${original} → ${reversed}`);

// ============================================
// 10. INFINITE LOOP WARNING & FIX
// ============================================
console.log("\n\n--- 10. INFINITE LOOP PREVENTION ---");

console.log("DANGER: Infinite loop example (commented out)");
// while (true) {
//     console.log("This never stops!");
// }

console.log("SAFE: With break condition");
let safeCount = 0;
while (true) {
	console.log("  Running...", safeCount);
	safeCount++;
	if (safeCount >= 3) {
		console.log("  Breaking out!");
		break;
	}
}

// ============================================
// END
// ============================================
console.log("\n========================================");
console.log("   ALL LOOPS COMPLETED!");
console.log("========================================");
