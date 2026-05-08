//  learn real world  exampule of spread operator in array and object

// 1. Spread operator in array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Using spread operator to combine arrays
const combinedArr = [...arr1, ...arr2];
console.log(combinedArr); // Output: [1, 2, 3, 4, 5, 6]

// Using spread operator to copy an array
const copiedArr = [...arr1];
console.log(copiedArr); // Output: [1, 2, 3]

// 2. Spread operator in object
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Using spread operator to combine objects
const combinedObj = { ...obj1, ...obj2 };
console.log(combinedObj); // Output:  a: 1, b: 2, c: 3, d: 4 }

// Using spread operator to copy an object
const copiedObj = { ...obj1 };
console.log(copiedObj); // Output: { a: 1, b: 2 }

// Using spread operator to update an object
const updatedObj = { ...obj1, b: 20 };
console.log(updatedObj); // Output: { a: 1, b: 20 }

// exampul of spread operator in function arguments
function sum(a, b, c) {
	return a + b + c;
}

const numbers = [1, 2, 3];

// Using spread operator to pass array elements as function arguments
const result = sum(...numbers);
console.log(result); // Output: 6

//  rigistarion form exampul of spread operator in object
const user = {
	name: "John Doe",
	email: "john.doe@example.com",
	age: 30,
};

// Using spread operator to copy an object
const copiedUser = { ...user };
console.log(copiedUser); // Output: { name: 'John Doe', email: 'john.doe@example.com', age: 30 }

// Using spread operator to update an object
const updatedUser = { ...user, age: 31 };
console.log(updatedUser); // Output: { name: 'John Doe', email: 'john.doe@example.com', age: 31 }

//  advance exampul of spread operator in array and object

// 1. Spread operator in array with nested arrays
const nestedArr1 = [1, 2, [3, 4]];
const nestedArr2 = [5, 6];

// Using spread operator to flatten nested arrays
const flattenedArr = [...nestedArr1, ...nestedArr2];
console.log(flattenedArr); // Output: [1, 2, [3, 4], 5, 6]

// 2. Spread operator in object with nested objects
const nestedObj1 = { a: 1, b: { c: 2 } };
const nestedObj2 = { d: 3 };

// Using spread operator to combine nested objects
const combinedNestedObj = { ...nestedObj1, ...nestedObj2 };
console.log(combinedNestedObj); // Output: { a: 1, b: { c: 2 }, d: 3 }

// Using spread operator to update a nested object
const updatedNestedObj = { ...nestedObj1, b: { ...nestedObj1.b, c: 20 } };
console.log(updatedNestedObj); // Output: { a: 1, b: { c: 20 } }
