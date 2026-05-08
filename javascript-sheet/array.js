// =============================================================================
//                    JAVASCRIPT ARRAY & METHODS - COMPLETE GUIDE
// =============================================================================

console.log("🚀 JAVASCRIPT ARRAY MASTERCLASS");
console.log("=====================================\n");

// =============================================================================
// 1. ARRAY CREATION METHODS
// =============================================================================

console.log("1️⃣ ARRAY CREATION METHODS");
console.log("---------------------------");

// Literal Notation (Most Common)
const fruits = ["Apple", "Banana", "Mango", "lemon", "Banane", "lili", "locki"];
console.log("Literal:", fruits); // ['Apple', 'Banana', 'Mango']

// Array Constructor
const arr1 = new Array(3); // Creates array with 3 empty slots
console.log("Constructor (length):", arr1); // [empty × 3]
console.log("Constructor length:", arr1.length); // 3

const arr2 = new Array(1, 2, 3);
console.log("Constructor (values):", arr2); // [1, 2, 3]

// Array.of() - ES6
const arr3 = Array.of(5); // Creates array with single element 5
console.log("Array.of(5):", arr3); // [5] (NOT [empty × 5])

// Array.from() - ES6 (Array-like/Iterable to Array)
const str = "Hello";
const arrFromStr = Array.from(str);
console.log("Array.from(string):", arrFromStr); // ['H', 'e', 'l', 'l', 'o']

const nodeList = { length: 3, 0: "a", 1: "b", 2: "c" }; // Array-like object
console.log("Array.from(array-like):", Array.from(nodeList)); // ['a', 'b', 'c']

// With mapping function
const doubled = Array.from([1, 2, 3], (x) => x * 2);
console.log("Array.from with map:", doubled); // [2, 4, 6]

// Spread Operator
const original = [1, 2, 3];
const copy = [...original];
console.log("Spread copy:", copy); // [1, 2, 3]

// =============================================================================
// 2. ADDING/REMOVING ELEMENTS (MUTATING METHODS)
// =============================================================================

console.log("\n2️⃣ ADDING/REMOVING ELEMENTS (Mutating)");
console.log("----------------------------------------");

let arr = [1, 2, 3];

// push() - Add to end, returns new length
const newLength = arr.push(4, 5);
console.log("After push(4,5):", arr, "| Length:", newLength); // [1,2,3,4,5] | 5

// pop() - Remove from end, returns removed element
const popped = arr.pop();
console.log("After pop():", arr, "| Popped:", popped); // [1,2,3,4] | 5

// unshift() - Add to beginning, returns new length
const newLen = arr.unshift(0, -1);
console.log("After unshift(0,-1):", arr, "| Length:", newLen); // [-1,0,1,2,3,4] | 6

// shift() - Remove from beginning, returns removed element
const shifted = arr.shift();
console.log("After shift():", arr, "| Shifted:", shifted); // [0,1,2,3,4] | -1

// splice() - Swiss army knife (add/remove/replace)
// splice(start, deleteCount, ...items)
arr = ["a", "b", "c", "d", "e"];

// Remove
const removed = arr.splice(1, 2); // From index 1, remove 2 items
console.log("After splice(1,2):", arr, "| Removed:", removed); // ['a','d','e'] | ['b','c']

// Insert
arr.splice(1, 0, "x", "y"); // At index 1, remove 0, insert 'x','y'
console.log("After splice(1,0,'x','y'):", arr); // ['a','x','y','d','e']

// Replace
arr.splice(2, 2, "z"); // At index 2, remove 2, insert 'z'
console.log("After splice(2,2,'z'):", arr); // ['a','x','z','e']

// =============================================================================
// 3. ACCESSING & SEARCHING
// =============================================================================

console.log("\n3️⃣ ACCESSING & SEARCHING");
console.log("-------------------------");

const numbers = [10, 20, 30, 40, 30, 50];

// Basic access
console.log("numbers[2]:", numbers[2]); // 30
console.log("numbers.at(-1):", numbers.at(-1)); // 50 (ES2022 - negative index support)
console.log("numbers.at(-2):", numbers.at(-2)); // 30

// indexOf() - First occurrence, -1 if not found
console.log("indexOf(30):", numbers.indexOf(30)); // 2
console.log("indexOf(30,3):", numbers.indexOf(30, 3)); // 4 (start from index 3)
console.log("indexOf(99):", numbers.indexOf(99)); // -1

// lastIndexOf() - Last occurrence
console.log("lastIndexOf(30):", numbers.lastIndexOf(30)); // 4

// includes() - Check existence (ES2016)
console.log("includes(20):", numbers.includes(20)); // true
console.log("includes(20,3):", numbers.includes(20, 3)); // false (start from 3)

// find() - First element matching condition
const found = numbers.find((num) => num > 25);
console.log("find(>25):", found); // 30

// findIndex() - Index of first match
const foundIndex = numbers.findIndex((num) => num > 25);
console.log("findIndex(>25):", foundIndex); // 2

// findLast() & findLastIndex() - ES2023
const lastFound = numbers.findLast((num) => num > 25);
console.log("findLast(>25):", lastFound); // 30

const lastFoundIndex = numbers.findLastIndex((num) => num > 25);
console.log("findLastIndex(>25):", lastFoundIndex); // 4

// =============================================================================
// 4. ITERATION METHODS (.forEach, map, filter, reduce, etc.)
// =============================================================================

console.log("\n4️⃣ ITERATION METHODS");
console.log("---------------------");

const nums = [1, 2, 3, 4, 5];

// forEach() - Execute function for each element (returns undefined)
console.log("forEach():");
nums.forEach((num, index, array) => {
	console.log(`  Index ${index}: ${num}`);
});

// map() - Create new array by transforming each element
const squared = nums.map((num) => num ** 2);
console.log("map(x²):", squared); // [1, 4, 9, 16, 25]

// filter() - Create new array with elements passing test
const evens = nums.filter((num) => num % 2 === 0);
console.log("filter(even):", evens); // [2, 4]

// reduce() - Reduce to single value
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log("reduce(sum):", sum); // 15

// reduceRight() - Reduce from right to left
const concat = ["a", "b", "c"].reduceRight((acc, curr) => acc + curr, "");
console.log("reduceRight(concat):", concat); // 'cba'

// Advanced reduce examples
const grouped = ["apple", "banana", "apricot", "blueberry", "cherry"].reduce(
	(acc, fruit) => {
		const firstLetter = fruit[0];
		acc[firstLetter] = acc[firstLetter] || [];
		acc[firstLetter].push(fruit);
		return acc;
	},
	{}
);
console.log("reduce(group by first letter):", grouped);
// { a: ['apple', 'apricot'], b: ['banana', 'blueberry'], c: ['cherry'] }

// flatMap() - map then flat (ES2019)
const sentences = ["Hello world", "Good morning"];
const words = sentences.flatMap((sentence) => sentence.split(" "));
console.log("flatMap(split):", words); // ['Hello', 'world', 'Good', 'morning']

// =============================================================================
// 5. SORTING & REVERSING
// =============================================================================

console.log("\n5️⃣ SORTING & REVERSING");
console.log("-----------------------");

let unsorted = [3, 1, 4, 1, 5, 9, 2, 6];

// sort() - Sorts in place (converts to string by default!)
unsorted.sort();
console.log("sort() (as string):", unsorted); // [1, 1, 2, 3, 4, 5, 6, 9] - lucky!

// Numeric sort (correct way)
unsorted = [10, 2, 30, 1];
unsorted.sort((a, b) => a - b); // Ascending
console.log("sort(ascending):", unsorted); // [1, 2, 10, 30]

unsorted.sort((a, b) => b - a); // Descending
console.log("sort(descending):", unsorted); // [30, 10, 2, 1]

// Object sorting
const users = [
	{ name: "John", age: 30 },
	{ name: "Jane", age: 25 },
	{ name: "Bob", age: 35 },
];
users.sort((a, b) => a.age - b.age);
console.log(
	"sort(by age):",
	users.map((u) => `${u.name}(${u.age})`)
); // ["Jane(25)", "John(30)", "Bob(35)"]

// toSorted() - Non-mutating sort (ES2023)
const originalArr = [3, 1, 2];
const sortedNew = originalArr.toSorted((a, b) => a - b);
console.log("Original:", originalArr); // [3, 1, 2]
console.log("toSorted():", sortedNew); // [1, 2, 3]

// reverse() - Reverse in place
let toReverse = [1, 2, 3, 4];
toReverse.reverse();
console.log("reverse():", toReverse); // [4, 3, 2, 1]

// toReversed() - Non-mutating reverse (ES2023)
const originalRev = [1, 2, 3];
const reversedNew = originalRev.toReversed();
console.log("Original:", originalRev); // [1, 2, 3]
console.log("toReversed():", reversedNew); // [3, 2, 1]

// =============================================================================
// 6. SLICING & CONCATENATING
// =============================================================================

console.log("\n6️⃣ SLICING & CONCATENATING");
console.log("---------------------------");

const originalSlice = [0, 1, 2, 3, 4, 5];

// slice(start, end) - Non-mutating extract (end not included)
console.log("slice(2):", originalSlice.slice(2)); // [2, 3, 4, 5]
console.log("slice(2,4):", originalSlice.slice(2, 4)); // [2, 3]
console.log("slice(-3):", originalSlice.slice(-3)); // [3, 4, 5] (last 3)
console.log("slice(-3,-1):", originalSlice.slice(-3, -1)); // [3, 4]

// Original unchanged
console.log("Original after slice:", originalSlice); // [0, 1, 2, 3, 4, 5]

// concat() - Merge arrays (non-mutating)
const arrA = [1, 2];
const arrB = [3, 4];
const arrC = [5, 6];
const merged = arrA.concat(arrB, arrC, 7, 8);
console.log("concat():", merged); // [1, 2, 3, 4, 5, 6, 7, 8]
console.log("Original arrA:", arrA); // [1, 2] - unchanged

// Spread alternative
const spreadMerge = [...arrA, ...arrB, ...arrC];
console.log("Spread merge:", spreadMerge); // [1, 2, 3, 4, 5, 6]

// =============================================================================
// 7. FLATTENING ARRAYS
// =============================================================================

console.log("\n7️⃣ FLATTENING ARRAYS");
console.log("---------------------");

const nested = [1, [2, 3], [[4, 5], 6], [[[7]]]];

// flat(depth) - ES2019
console.log("flat(1):", nested.flat(1)); // [1, 2, 3, [4, 5], 6, [[7]]]
console.log("flat(2):", nested.flat(2)); // [1, 2, 3, 4, 5, 6, [7]]
console.log("flat(Infinity):", nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7]

// flatMap() - map + flat(1)
const phrases = ["Hello world", "Goodbye moon"];
const allWords = phrases.flatMap((p) => p.split(" "));
console.log("flatMap:", allWords); // ['Hello', 'world', 'Goodbye', 'moon']

// =============================================================================
// 8. FILLING & COPYING WITHIN ARRAY
// =============================================================================

console.log("\n8️⃣ FILLING & COPYING");
console.log("---------------------");

// fill(value, start, end) - ES6
const toFill = new Array(5);
toFill.fill(0);
console.log("fill(0):", toFill); // [0, 0, 0, 0, 0]

const toFill2 = [1, 2, 3, 4, 5];
toFill2.fill("x", 1, 3); // From index 1 to 3 (exclusive)
console.log("fill('x',1,3):", toFill2); // [1, 'x', 'x', 4, 5]

// copyWithin(target, start, end) - ES6 (rarely used but powerful)
const toCopy = [1, 2, 3, 4, 5];
toCopy.copyWithin(0, 3, 5); // Copy index 3-4 to index 0
console.log("copyWithin(0,3,5):", toCopy); // [4, 5, 3, 4, 5]

// =============================================================================
// 9. TESTING METHODS (every, some)
// =============================================================================

console.log("\n9️⃣ TESTING METHODS");
console.log("-------------------");

const testArr = [2, 4, 6, 8, 10];

// every() - All elements pass test?
const allEven = testArr.every((num) => num % 2 === 0);
console.log("every(even):", allEven); // true

const allPositive = testArr.every((num) => num > 5);
console.log("every(>5):", allPositive); // false

// some() - At least one passes test?
const hasGreaterThan8 = testArr.some((num) => num > 8);
console.log("some(>8):", hasGreaterThan8); // true

const hasNegative = testArr.some((num) => num < 0);
console.log("some(<0):", hasNegative); // false

// =============================================================================
// 10. JOINING & CONVERTING TO STRING
// =============================================================================

console.log("\n🔟 JOINING & STRING CONVERSION");
console.log("-------------------------------");

const joinArr = ["Fire", "Air", "Water"];

// join() - Array to string
console.log("join():", joinArr.join()); // "Fire,Air,Water"
console.log("join(' '):", joinArr.join(" ")); // "Fire Air Water"
console.log("join('-'):", joinArr.join("-")); // "Fire-Air-Water"

// toString() - Default comma separated
console.log("toString():", joinArr.toString()); // "Fire,Air,Water"

// toLocaleString() - Locale aware
const dates = [new Date("2023-01-01"), 1000];
console.log("toLocaleString():", dates.toLocaleString("en-US"));

// =============================================================================
// 11. ADVANCED PATTERNS & TECHNIQUES
// =============================================================================

console.log("\n1️⃣1️⃣ ADVANCED PATTERNS");
console.log("-----------------------");

// Destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log("Destructuring:", { first, second, rest }); // {first:1, second:2, rest:[3,4,5]}

// Swapping with destructuring
let a = 1,
	b = 2;
[a, b] = [b, a];
console.log("Swapped:", { a, b }); // {a:2, b:1}

// Array.from with {length} for generating sequences
const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log("Range 1-5:", range); // [1, 2, 3, 4, 5]

// 18. Multidimensional Array
const matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

// Matrix/2D Array
const matrixArray = Array.from({ length: 3 }, (_, i) =>
	Array.from({ length: 3 }, (_, j) => i * 3 + j + 1)
);
console.log("3x3 Matrix:", matrixArray); // [[1,2,3], [4,5,6], [7,8,9]]

// Unique values with Set
const withDuplicates = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(withDuplicates)];
console.log("Unique with Set:", unique); // [1, 2, 3]

// Grouping (ES2024 - Object.groupBy)
const inventory = [
	{ name: "apple", type: "fruit", qty: 5 },
	{ name: "banana", type: "fruit", qty: 2 },
	{ name: "carrot", type: "vegetable", qty: 10 },
];
// Polyfill for older environments
const groupedByType = inventory.reduce((acc, item) => {
	acc[item.type] = acc[item.type] || [];
	acc[item.type].push(item);
	return acc;
}, {});
console.log("Group by type:", Object.keys(groupedByType)); // ['fruit', 'vegetable']

// Chaining methods
const result = [1, 2, 3, 4, 5, 6]
	.filter((n) => n % 2 === 0) // [2, 4, 6]
	.map((n) => n * 10) // [20, 40, 60]
	.reduce((a, b) => a + b, 0); // 120
console.log("Chained result:", result); // 120

// =============================================================================
// 12. PERFORMANCE & EDGE CASES
// =============================================================================

console.log("\n1️⃣2️⃣ PERFORMANCE TIPS");
console.log("---------------------");

// Sparse arrays (avoid!)
const sparse = [1, , 3]; // Hole at index 1
console.log("Sparse array length:", sparse.length); // 3
console.log("Sparse iteration:");
sparse.forEach((x, i) => console.log(`  Index ${i}: ${x}`)); // Skips index 1!

// delete leaves holes (avoid, use splice instead)
const delArr = [1, 2, 3];
delete delArr[1];
console.log("After delete:", delArr); // [1, empty, 3]
console.log("Has hole?", 1 in delArr); // false

// Large array pre-allocation
const large = new Array(1000000);
console.log("Pre-allocated length:", large.length); // 1000000

// =============================================================================
// 13. IMMUTABLE PATTERNS (ES2023 Methods)
// =============================================================================

console.log("\n1️⃣3️⃣ IMMUTABLE METHODS (ES2023)");
console.log("--------------------------------");

const originalData = [1, 2, 3, 4, 5];

// toReversed() - Non-mutating reverse
const reversed = originalData.toReversed();
console.log("Original:", originalData); // [1, 2, 3, 4, 5]
console.log("toReversed:", reversed); // [5, 4, 3, 2, 1]

// toSorted() - Non-mutating sort
const sorted = [3, 1, 4].toSorted((a, b) => a - b);
console.log("toSorted:", sorted); // [1, 3, 4]

// toSpliced() - Non-mutating splice
const spliced = originalData.toSpliced(1, 2, "a", "b");
console.log("Original:", originalData); // [1, 2, 3, 4, 5]
console.log("toSpliced:", spliced); // [1, 'a', 'b', 4, 5]

// with() - Non-mutating index replacement
const replaced = originalData.with(2, "X");
console.log("with(2, 'X'):", replaced); // [1, 2, 'X', 4, 5]
console.log("Original intact:", originalData); // [1, 2, 3, 4, 5]

// =============================================================================
// 14. UTILITY FUNCTIONS (Custom)
// =============================================================================

console.log("\n1️⃣4️⃣ CUSTOM UTILITY FUNCTIONS");
console.log("------------------------------");

// Chunk array
const chunk = (arr, size) =>
	Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
		arr.slice(i * size, i * size + size)
	);
console.log("Chunk [1,2,3,4,5] by 2:", chunk([1, 2, 3, 4, 5], 2)); // [[1,2], [3,4], [5]]

// Compact (remove falsy)
const compact = (arr) => arr.filter(Boolean);
console.log("Compact:", compact([0, 1, false, 2, "", 3, null])); // [1, 2, 3]

// Flatten deep
const flattenDeep = (arr) => arr.flat(Infinity);
console.log("Flatten deep:", flattenDeep([1, [2, [3, [4]]]])); // [1, 2, 3, 4]

// Intersection
const intersection = (a, b) => a.filter((x) => b.includes(x));
console.log("Intersection:", intersection([1, 2, 3], [2, 3, 4])); // [2, 3]

// Difference
const difference = (a, b) => a.filter((x) => !b.includes(x));
console.log("Difference:", difference([1, 2, 3], [2, 3])); // [1]

// =============================================================================
// SUMMARY TABLE
// =============================================================================

console.log("\n📊 QUICK REFERENCE");
console.log("==================");
console.log(`
MUTATING (Changes original):
  push, pop, unshift, shift, splice, sort, reverse, fill, copyWithin

NON-MUTATING (Returns new):
  concat, slice, join, toSorted, toReversed, toSpliced, with (ES2023)

ITERATION:
  forEach, map, filter, reduce, reduceRight, find, findIndex, findLast,
  findLastIndex, every, some, flatMap

SEARCH:
  indexOf, lastIndexOf, includes, find, findIndex

UTILITY:
  flat, from, of, at, isArray
`);

console.log(
	"✅ Guide Complete! Practice these methods to master JavaScript Arrays!"
);
