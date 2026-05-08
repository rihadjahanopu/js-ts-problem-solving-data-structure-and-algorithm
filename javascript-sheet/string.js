// ==========================================
// JAVASCRIPT STRING METHODS - COMPLETE GUIDE
// ==========================================

let str = "Hello JavaScript World";
let str2 = "  Trim Me  ";
let str3 = "apple,banana,grape";

// ==========================================
// A - anchor(), at()
// ==========================================

// anchor() - HTML anchor tag create kore (deprecated)
let anchorStr = str.anchor("myLink");
console.log(anchorStr);
// Output: <a name="myLink">Hello JavaScript World</a>

// at() - specific index er character return kore (negative index support kore)
console.log(str.at(0)); // Output: H
console.log(str.at(-1)); // Output: d (last character)
console.log(str.at(6)); // Output: J

// ==========================================
// B - big(), blink(), bold()
// ==========================================

// big() - <big> tag (deprecated)
console.log(str.big());
// Output: <big>Hello JavaScript World</big>

// blink() - <blink> tag (deprecated)
console.log(str.blink());
// Output: <blink>Hello JavaScript World</blink>

// bold() - <b> tag (deprecated)
console.log(str.bold());
// Output: <b>Hello JavaScript World</b>

// ==========================================
// C - charAt(), charCodeAt(), codePointAt(), concat()
// ==========================================

// charAt() - specific index er character
console.log(str.charAt(0)); // Output: H
console.log(str.charAt(6)); // Output: J

// charCodeAt() - UTF-16 code unit return kore
console.log(str.charCodeAt(0)); // Output: 72 (H er ASCII value)
console.log(str.charCodeAt(6)); // Output: 74 (J er ASCII value)

// codePointAt() - Unicode code point return kore
console.log(str.codePointAt(0)); // Output: 72

// concat() - string jog kore
let newStr = str.concat("!", " Welcome");
console.log(newStr);
// Output: Hello JavaScript World! Welcome

// ==========================================
// E - endsWith()
// ==========================================

// endsWith() - string specific diye sesh hoyeche kina check kore
console.log(str.endsWith("World")); // Output: true
console.log(str.endsWith("Java", 10)); // Output: true (first 10 character check)

// ==========================================
// F - fixed(), fontcolor(), fontsize()
// ==========================================

// fixed() - <tt> tag (deprecated)
console.log(str.fixed());
// Output: <tt>Hello JavaScript World</tt>

// fontcolor() - <font color=""> (deprecated)
console.log(str.fontcolor("red"));
// Output: <font color="red">Hello JavaScript World</font>

// fontsize() - <font size=""> (deprecated)
console.log(str.fontsize(5));
// Output: <font size="5">Hello JavaScript World</font>

// ==========================================
// I - includes(), indexOf(), isWellFormed(), italics()
// ==========================================

// includes() - substring ache kina check kore
console.log(str.includes("Java")); // Output: true
console.log(str.includes("Python")); // Output: false
console.log(str.includes("Hello", 5)); // Output: false (index 5 theke search)

// indexOf() - first occurrence er index return kore
console.log(str.indexOf("Java")); // Output: 6
console.log(str.indexOf("o")); // Output: 4
console.log(str.indexOf("o", 5)); // Output: 19 (5 index por theke search)

// isWellFormed() - Unicode well-formed kina check kore
console.log(str.isWellFormed()); // Output: true

// italics() - <i> tag (deprecated)
console.log(str.italics());
// Output: <i>Hello JavaScript World</i>

// ==========================================
// L - lastIndexOf(), length, link(), localeCompare()
// ==========================================

// lastIndexOf() - last occurrence er index return kore
console.log(str.lastIndexOf("o")); // Output: 19
console.log(str.lastIndexOf("l")); // Output: 18

// length - property (string er length)
console.log(str.length); // Output: 22

// link() - <a href=""> tag create kore (deprecated)
console.log(str.link("https://example.com"));
// Output: <a href="https://example.com">Hello JavaScript World</a>

// localeCompare() - duita string compare kore
let a = "apple";
let b = "banana";
console.log(a.localeCompare(b)); // Output: -1 (a age)
console.log(b.localeCompare(a)); // Output: 1 (b pore)
console.log(a.localeCompare("apple")); // Output: 0 (same)

// ==========================================
// M - match(), matchAll()
// ==========================================

// match() - regex er sathe match kore
let text = "The rain in SPAIN stays mainly in the plain";
console.log(text.match(/ain/));
// Output: ['ain', index: 5, input: 'The rain...', groups: undefined]

console.log(text.match(/ain/g));
// Output: ['ain', 'ain', 'ain', 'ain'] (global match)

console.log(text.match(/ain/gi));
// Output: ['ain', 'AIN', 'ain', 'ain', 'ain'] (case insensitive)

// matchAll() - shob match iterator return kore
let matches = text.matchAll(/ain/gi);
for (let match of matches) {
	console.log(match[0]);
	// Output: ain, AIN, ain, ain, ain (separately)
}

// ==========================================
// N - normalize()
// ==========================================

// normalize() - Unicode normalize kore
let normalized = "café".normalize();
console.log(normalized); // Output: café

// ==========================================
// P - padEnd(), padStart()
// ==========================================

// padEnd() - sheshe character add kore specific length porjonto
console.log("5".padEnd(4, "0")); // Output: 5000
console.log("Hi".padEnd(10, "-")); // Output: Hi--------

// padStart() - shuru te character add kore specific length porjonto
console.log("5".padStart(4, "0")); // Output: 0005
console.log("Hi".padStart(10, "-")); // Output: --------Hi

// ==========================================
// R - repeat(), replace(), replaceAll(), search()
// ==========================================

// repeat() - string repeat kore
console.log("Ha".repeat(3)); // Output: HaHaHa
console.log("*".repeat(10)); // Output: **********

// replace() - first match replace kore
console.log(str.replace("World", "Universe"));
// Output: Hello JavaScript Universe

console.log(str.replace(/o/g, "0"));
// Output: Hell0 JavaScript W0rld (global regex diye shob replace)

// replaceAll() - shob match replace kore (ES2021)
console.log(str.replaceAll("l", "L"));
// Output: HeLLo JavaScript WorLd

// search() - regex er sathe match er index return kore
console.log(str.search("Java")); // Output: 6
console.log(str.search(/[A-Z]/)); // Output: 0 (first capital letter)

// ==========================================
// S - slice(), small(), split(), startsWith(), strike(), sub(), substr(), substring(), sup()
// ==========================================

// slice() - string theke part cut kore (negative index allowed)
console.log(str.slice(0, 5)); // Output: Hello
console.log(str.slice(6)); // Output: JavaScript World
console.log(str.slice(-5)); // Output: World (last 5)
console.log(str.slice(-5, -2)); // Output: Wor

// small() - <small> tag (deprecated)
console.log(str.small());
// Output: <small>Hello JavaScript World</small>

// split() - string ke array te vag kore
console.log(str3.split(","));
// Output: ['apple', 'banana', 'grape']

console.log(str.split(" "));
// Output: ['Hello', 'JavaScript', 'World']

console.log(str.split(""));
// Output: ['H', 'e', 'l', 'l', 'o', ' ', 'J', ...] (shob character alada)

console.log(str.split(" ", 2));
// Output: ['Hello', 'JavaScript'] (limit 2)

// startsWith() - specific diye shuru hoyeche kina check kore
console.log(str.startsWith("Hello")); // Output: true
console.log(str.startsWith("Java", 6)); // Output: true (index 6 theke)

// strike() - <strike> tag (deprecated)
console.log(str.strike());
// Output: <strike>Hello JavaScript World</strike>

// sub() - <sub> tag (deprecated)
console.log(str.sub());
// Output: <sub>Hello JavaScript World</sub>

// substr() - substring return kore (deprecated, use slice instead)
console.log(str.substr(6, 10));
// Output: JavaScript (index 6 theke 10 character)

// substring() - duita index er moddher part return kore
console.log(str.substring(6, 16));
// Output: JavaScript
console.log(str.substring(16, 6));
// Output: JavaScript (swap hoye jay)

// sup() - <sup> tag (deprecated)
console.log(str.sup());
// Output: <sup>Hello JavaScript World</sup>

// ==========================================
// T - toLocaleLowerCase(), toLocaleUpperCase(), toLowerCase(), toString(), toUpperCase(), trim(), trimEnd(), trimStart(), toWellFormed()
// ==========================================

// toLocaleLowerCase() - locale onujayi lowercase
console.log("İSTANBUL".toLocaleLowerCase("tr"));
// Output: istanbul (Turkish locale)

// toLocaleUpperCase() - locale onujayi uppercase
console.log("istanbul".toLocaleUpperCase("tr"));
// Output: İSTANBUL

// toLowerCase() - shob lowercase
console.log(str.toLowerCase());
// Output: hello javascript world

// toString() - string value return kore
let strObj = new String("Hello");
console.log(strObj.toString()); // Output: Hello

// toUpperCase() - shob uppercase
console.log(str.toUpperCase());
// Output: HELLO JAVASCRIPT WORLD

// trim() - dui pasher whitespace remove kore
console.log(str2.trim());
// Output: "Trim Me"

// trimEnd() / trimRight() - shesher whitespace remove kore
console.log(str2.trimEnd());
// Output: "  Trim Me"

// trimStart() / trimLeft() - shurur whitespace remove kore
console.log(str2.trimStart());
// Output: "Trim Me  "

// toWellFormed() - well-formed Unicode string return kore
console.log(str.toWellFormed());
// Output: Hello JavaScript World

// ==========================================
// V - valueOf()
// ==========================================

// valueOf() - primitive string value return kore
console.log(strObj.valueOf()); // Output: Hello

// ==========================================
// ADVANCED EXAMPLES & USE CASES
// ==========================================

// 1. Email validation simple check
let email = "user@example.com";
console.log(email.includes("@") && email.includes("."));
// Output: true

// 2. URL theke filename extract
let url = "https://example.com/path/to/file.js";
let filename = url.slice(url.lastIndexOf("/") + 1);
console.log(filename);
// Output: file.js

// 3. Sentence case conversion
let sentence = "HELLO WORLD";
let properCase = sentence.charAt(0) + sentence.slice(1).toLowerCase();
console.log(properCase);
// Output: Hello world

// 4. Word count
let paragraph = "Hello JavaScript World";
let wordCount = paragraph.trim().split(/\s+/).length;
console.log(wordCount);
// Output: 3

// 5. Palindrome check
function isPalindrome(text) {
	let clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
	return clean === clean.split("").reverse().join("");
}
console.log(isPalindrome("A man, a plan, a canal: Panama"));
// Output: true

// 6. String padding for time format
let hours = "9";
let minutes = "5";
console.log(`${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`);
// Output: 09:05

// 7. Extract domain from email
let email2 = "user@example.com";
let domain = email2.slice(email2.indexOf("@") + 1);
console.log(domain);
// Output: example.com

// 8. Replace multiple spaces with single space
let messy = "Hello    JavaScript    World";
console.log(messy.replace(/\s+/g, " "));
// Output: Hello JavaScript World

// 9. Check if string is empty or whitespace only
let empty = "   ";
console.log(empty.trim().length === 0);
// Output: true

// 10. Reverse a string
let original = "JavaScript";
let reversed = original.split("").reverse().join("");
console.log(reversed);
// Output: tpircSavaJ

// ==========================================
// MODERN JAVASCRIPT (ES6+) FEATURES
// ==========================================

// Template literals (backticks)
let name = "JavaScript";
let version = "ES6";
console.log(`Hello ${name} ${version}!`);
// Output: Hello JavaScript ES6!

// Tagged templates
function highlight(strings, ...values) {
	return strings.reduce((result, str, i) => {
		return result + str + (values[i] ? `<b>${values[i]}</b>` : "");
	}, "");
}
let user = "John";
console.log(highlight`Hello ${user}, welcome!`);
// Output: Hello <b>John</b>, welcome!

// String.raw - raw string return kore
console.log(String.raw`C:\Windows\System32`);
// Output: C:\Windows\System32 (escape process hoy na)

// ==========================================
// PERFORMANCE TIPS
// ==========================================

// 1. concat() vs + operator
// + operator is faster and more readable
let fast = "Hello" + " " + "World"; // Prefer this
let slow = "Hello".concat(" ", "World"); // Slower

// 2. For large string building, use array then join
let parts = [];
for (let i = 0; i < 1000; i++) {
	parts.push("Part " + i);
}
let largeString = parts.join(""); // Faster than repeated +=

// 3. Use slice() instead of substring() for consistency
// slice() handles negative indices better

// ==========================================
// COMMON MISTAKES TO AVOID
// ==========================================

// Mistake 1: Strings are immutable
let test = "Hello";
test[0] = "h"; // No effect!
console.log(test); // Output: Hello (unchanged)

// Correct way:
test = "h" + test.slice(1);
console.log(test); // Output: hello

// Mistake 2: indexOf() vs search()
// indexOf() - simple substring search, faster
// search() - regex support, slower

// Mistake 3: replace() only replaces first occurrence
let text2 = "foo foo foo";
console.log(text2.replace("foo", "bar"));
// Output: bar foo foo (only first)

// Use replaceAll() or regex with g flag
console.log(text2.replaceAll("foo", "bar"));
// Output: bar bar bar

// ==========================================
// QUICK REFERENCE TABLE
// ==========================================

/*
Method              | Returns           | Modifies Original?
--------------------|-------------------|-------------------
charAt()            | string            | No
concat()            | string            | No
includes()          | boolean           | No
indexOf()           | number            | No
match()             | array/null        | No
replace()           | string            | No
replaceAll()        | string            | No
search()            | number            | No
slice()             | string            | No
split()             | array             | No
substr()            | string            | No (deprecated)
substring()         | string            | No
toLowerCase()       | string            | No
toUpperCase()       | string            | No
trim()              | string            | No
trimEnd()           | string            | No
trimStart()         | string            | No
at()                | string/undefined  | No
padStart()          | string            | No
padEnd()            | string            | No
repeat()            | string            | No
startsWith()        | boolean           | No
endsWith()          | boolean           | No
*/

console.log("=== All String Methods Examples Completed ===");
