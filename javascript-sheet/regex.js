//  i learn regex

const regex = /hello/i; // 'i' flag for case-insensitive matching

const str1 = "Hello World";
const str2 = "hello world";
const str3 = "HELLO WORLD";

console.log(regex.test(str1)); // true
console.log(regex.test(str2)); // true
console.log(regex.test(str3)); // true


const regexGlobal = /hello/g; // 'g' flag for global matching
const str4 = "hello hello hello";

const matches = str4.match(regexGlobal);
console.log(matches); // [ 'hello', 'hello', 'hello' ]

const regexMultiline = /^hello/m; // 'm' flag for multiline matching
const str5 = "world\nhello\nworld";

console.log(regexMultiline.test(str5)); // true

const regexDotAll = /hello.world/s;

const str6 = "hello\nworld";
console.log(regexDotAll.test(str6)); // true

const regexUnicode = /\p{L}+/gu; // 'u' flag for Unicode matching
const str7 = "Hello Привет こんにちは";

const unicodeMatches = str7.match(regexUnicode);
console.log(unicodeMatches); // [ 'Hello', 'Привет', 'こんにちは' ]

const regexSticky = /hello/y; // 'y' flag for sticky matching
const str8 = "hello world hello";

regexSticky.lastIndex = 0;
console.log(regexSticky.test(str8)); // true

regexSticky.lastIndex = 6;
console.log(regexSticky.test(str8)); // false

// This code demonstrates the use of various regex flags in JavaScript.