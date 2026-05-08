// ============================================================
// JavaScript for Everyone: Destructuring
// CSS-Tricks Article Examples - All Code in One Place
// ============================================================

console.log("=== 1. Basic Array Destructuring (Binding Pattern) ===");
const theArray1 = [false, true, false];
const [firstElement, secondElement, thirdElement] = theArray1;

console.log(firstElement); // Result: false
console.log(secondElement); // Result: true
console.log(thirdElement); // Result: false

console.log("\n=== 2. Skipping Elements ===");
const theArray2 = [true, false, true];
const [firstElem, , thirdElem] = theArray2;

console.log(firstElem); // Result: true
console.log(thirdElem); // Result: true

console.log("\n=== 3. Basic Object Destructuring ===");
const theObject1 = {
	theProperty: true,
	theOtherProperty: false,
};
const { theProperty, theOtherProperty } = theObject1;

console.log(theProperty); // true
console.log(theOtherProperty); // false

console.log("\n=== 4. Object Destructuring with Renaming ===");
const theObject2 = {
	theProperty: true,
	theOtherProperty: false,
};
const { theProperty: theIdentifier, theOtherProperty: theOtherIdentifier } =
	theObject2;

console.log(theIdentifier); // true
console.log(theOtherIdentifier); // false

console.log("\n=== 5. Assignment Pattern Destructuring (Array) ===");
const theArray3 = [true, false];
let theFirstIdentifier;
let theSecondIdentifier;

[theFirstIdentifier, theSecondIdentifier] = theArray3;

console.log(theFirstIdentifier); // true
console.log(theSecondIdentifier); // false

console.log("\n=== 6. Assignment Pattern with let ===");
const theArray4 = [true, false];
let [id1, id2] = theArray4;

console.log(id1); // true
console.log(id2); // false

console.log("\n=== 7. Assignment Pattern with const ===");
const theArray5 = [true, false];
const [id3, id4] = theArray5;

console.log(id3); // true
console.log(id4); // false

console.log("\n=== 8. Assignment to Array Elements ===");
const theArray6 = [true, false];
let theResultArray = [];

[theResultArray[1], theResultArray[0]] = theArray6;

console.log(theResultArray); // [ false, true ]

console.log("\n=== 9. Object Assignment Pattern Destructuring ===");
const theObject3 = {
	theProperty: true,
	theOtherProperty: false,
};
let prop1;
let prop2;

({ theProperty: prop1, theOtherProperty: prop2 } = theObject3);

console.log(prop1); // true
console.log(prop2); // false

console.log("\n=== 10. Object Assignment Pattern with Renaming ===");
const theObject4 = {
	theProperty: true,
	theOtherProperty: false,
};
let theFirstId;
let theSecondId;

({ theProperty: theFirstId, theOtherProperty: theSecondId } = theObject4);

console.log(theFirstId); // true
console.log(theSecondId); // false

console.log("\n=== 11. Assignment to Object Properties ===");
const theObject5 = {
	theProperty: true,
	theOtherProperty: false,
};
let resultObject = {};

({
	theProperty: resultObject.resultProp,
	theOtherProperty: resultObject.otherResultProp,
} = theObject5);

console.log(resultObject); // { resultProp: true, otherResultProp: false }

console.log("\n=== 12. Default Values (Array) ===");
const theArray7 = [true, undefined];
const [elem1, elem2 = "A string.", elem3 = 100] = theArray7;

console.log(elem1); // true
console.log(elem2); // A string.
console.log(elem3); // 100

console.log("\n=== 13. Default Values (Object) ===");
const theObject6 = {
	theProperty: true,
	theOtherProperty: undefined,
};
const { propA, propB = "A string.", propC = 100 } = theObject6;

console.log(propA); // true
console.log(propB); // A string.
console.log(propC); // 100

console.log("\n=== 14. Nested Object Destructuring (Separate) ===");
const nestedObject1 = {
	theProperty: true,
	theNestedObject: {
		anotherProperty: true,
		stillOneMoreProp: "A string.",
	},
};

const { theProperty: p1, theNestedObject } = nestedObject1;
const { anotherProperty, stillOneMoreProp = "Default string." } =
	theNestedObject;

console.log(stillOneMoreProp); // A string.

console.log("\n=== 15. Nested Object Destructuring (Single Line) ===");
const nestedObject2 = {
	theProperty: true,
	theNestedObject: {
		anotherProperty: true,
		stillOneMoreProp: "A string.",
	},
};
const {
	theProperty: p2,
	theNestedObject: { anotherProperty: ap, stillOneMoreProp: sp },
} = nestedObject2;

console.log(sp); // A string.

console.log("\n=== 16. Mixed Data Structure Destructuring ===");
const mixedObject = [
	{
		aProperty: true,
	},
	{
		anotherProperty: "A string.",
	},
];
const [{ aProperty }, { anotherProperty: ap2 }] = mixedObject;

console.log(ap2); // A string.

console.log("\n=== 17. Rest Properties (Array) ===");
const theArray8 = [false, true, false, true, true, false];
const [first, second, ...remainingElements] = theArray8;

console.log(remainingElements); // [ false, true, true, false ]

console.log("\n=== 18. Real-world Example (Newsletter Data) ===");
const firstPost = {
	id: "mat-update-1.md",
	slug: "mat-update-1",
	body: "Hey, great to meet you, everybody...",
	data: {
		title: "Meet your Instructor",
		pubDate: "2025-05-08T09:55:00.630Z",
		headingSize: "large",
		showUnsubscribeLink: true,
		stream: "javascript-for-everyone",
	},
};

const {
	data: { title },
	body,
} = firstPost;

console.log(title); // Meet your Instructor
console.log(body); // Full body text

console.log("\n=== 19. Rest Properties with Nested Object ===");
const firstPost2 = {
	id: "mat-update-1.md",
	slug: "mat-update-1",
	body: "Hey, great to meet you, everybody...",
	data: {
		title: "Meet your Instructor",
		pubDate: "2025-05-08T09:55:00.630Z",
		headingSize: "large",
		showUnsubscribeLink: true,
		stream: "javascript-for-everyone",
	},
};

const {
	data: { title: t2, ...metaData },
	body: b2,
} = firstPost2;

console.log(t2); // Meet your Instructor
console.log(metaData); // { pubDate, headingSize, showUnsubscribeLink, stream }
