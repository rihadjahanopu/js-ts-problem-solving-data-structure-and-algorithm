// ============================================
// সব নাম্বার সোয়াপিং পদ্ধতি একই জায়গায়
// ============================================

console.log("=== Method 1: Destructuring (সবচেয়ে সহজ) ===");
let x1 = 5,
	y1 = 10;
[x1, y1] = [y1, x1];
console.log(`After swap: x1 = ${x1}, y1 = ${y1}`);

// 1. Swap two variables without a temporary variable
let anum = 5,
	bnum = 10;
[anum, bnum] = [bnum, anum];
// Now anum is 10 and bnum is 5

console.log("\n=== Method 2: Temp Variable (ক্লাসিক) ===");
let x2 = 20,
	y2 = 30;
let temp = x2;
x2 = y2;
y2 = temp;
console.log(`After swap: x2 = ${x2}, y2 = ${y2}`);

console.log("\n=== Method 3: XOR Bitwise (ইন্টিজার Only) ===");
let x3 = 7,
	y3 = 3;
x3 = x3 ^ y3;
y3 = x3 ^ y3;
x3 = x3 ^ y3;
console.log(`After swap: x3 = ${x3}, y3 = ${y3}`);

console.log("\n=== Method 4: Arithmetic (+/-) ===");
let x4 = 100,
	y4 = 50;
x4 = x4 + y4; // 150
y4 = x4 - y4; // 100
x4 = x4 - y4; // 50
console.log(`After swap: x4 = ${x4}, y4 = ${y4}`);

console.log("\n=== Method 5: Array Index Swap ===");
let arr = [1, 2, 3, 4, 5];
[arr[1], arr[3]] = [arr[3], arr[1]];
console.log("Array after swap:", arr); // [1, 4, 3, 2, 5]

console.log("\n=== Method 6: Function দিয়ে Swap ===");
function swap(a, b) {
	return [b, a];
}
let [x6, y6] = swap(15, 25);
console.log(`After swap: x6 = ${x6}, y6 = ${y6}`);

console.log("\n=== Method 7: Multiple Variable Swap ===");
let a = 1,
	b = 2,
	c = 3;
[a, b, c] = [c, a, b]; // a=3, b=1, c=2
console.log(`Triple swap: a=${a}, b=${b}, c=${c}`);
console.log("\n=== Method 8: Using Map (Key-Value Swap) ===");

// 2. Check if a number is even or odd using bitwise operator
function isEven(num) {
	return (num & 1) === 0;
}

// 3. Remove duplicates from an array
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(arrayWithDuplicates)];

// 4. Flatten an array of arrays
const nestedArray = [[1, 2], [3, 4], [5]];
const flattenedArray = nestedArray.flat();

// 5. Capitalize the first letter of each word in a string
function capitalizeWords(str) {
	return str.replace(/\b\w/g, (char) => char.toUpperase());
}

// 6. Generate a random integer between two values
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 7. Check if a string is a palindrome
function isPalindrome(str) {
	const cleanedStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
	return cleanedStr === cleanedStr.split("").reverse().join("");
}

// 8. Merge two objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const mergedObj = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }

// 9. Check if an object is empty
function isEmptyObject(obj) {
	return Object.keys(obj).length === 0;
}

// 10. Convert a string to camelCase
function toCamelCase(str) {
	return str
		.toLowerCase()
		.replace(/[-_ ]+(.)/g, (match, char) => char.toUpperCase());
}
