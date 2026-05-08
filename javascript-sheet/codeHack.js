/**
 * 📂 JAVASCRIPT HACKS: 1 - 100 (EXAMPLES)
 * Comprehensive logic snippets for everyday development.
 */

// ==========================================
// 🟢 ১-১০: বিটওয়াইজ ও ম্যাজিক অপারেটর (BITWISE)
// ==========================================

// ১. Toggle 0 and 1
let toggle = 0;
toggle ^= 1; // রেজাল্ট: 1

// ২. Quick Math.floor()
const floorVal = ~~4.9; // রেজাল্ট: 4

// ৩. Integer conversion
const intVal = 5.7 | 0; // রেজাল্ট: 5

// ৪. Multiply by 2
const mult = 5 << 1; // রেজাল্ট: 10

// ৫. Divide by 2
const div = 10 >> 1; // রেজাল্ট: 5

// ৬. Odd/Even Check
const isEven = (n) => (n & 1) === 0;
console.log(isEven(4)); // true

// ৭. Index check shortcut (~n yields 0 only for -1)
if (~[1, 2].indexOf(1)) {
	/* found */
}

// ৮. Force Boolean
const hasData = !!"content"; // true

// ৯. String to Number
const num = +"42"; // 42

// ১০. Modulo even check
const isOdd = 7 % 2 !== 0; // true

// ==========================================
// 🟡 ১১-৩০: অ্যারে ট্রিকস (ARRAY)
// ==========================================

const arr = [1, 2, 2, 3, 4, 4, 5];

// ১১. Unique values
const unique = [...new Set(arr)];

// ১২. Get last element
const last = arr.at(-1);

// ১৩. Empty an array
// arr.length = 0;

// ১৪. Flatten nested arrays
const flat = [1, [2, [3]]].flat(Infinity); // [1, 2, 3]

// ১৫. Fill array
const zeros = new Array(3).fill(0); // [0, 0, 0]

// ১৬. Reverse (Mutates)
// arr.reverse();

// ১৭. Shuffle array
const shuffled = arr.sort(() => Math.random() - 0.5);

// ১৮. Filter Falsy (null, 0, undefined, "")
const clean = [0, 1, false, 2, "", 3].filter(Boolean); // [1, 2, 3]

// ১৯. Range array
const range = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]

// ২০. Swap variables
let x = 1,
	y = 2;
[x, y] = [y, x];

// ২১. Get last N items
const lastThree = arr.slice(-3);

// ২২. Clone array
const clone = [...arr];

// ২৩. Array to String
const strArr = ["A", "B"].join("-"); // "A-B"

// ২৪. Check existence
const exists = arr.includes(3);

// ২৫. Every element check
const allPositive = [1, 2, 3].every((n) => n > 0);

// ২৬. Some element check
const hasNegative = [1, -2, 3].some((n) => n < 0);

// ২৭. Find object in array
const user = [{ id: 1 }, { id: 2 }].find((u) => u.id === 2);

// ২৮. Transform array
const doubled = [1, 2].map((n) => n * 2);

// ২৯. Accumulate total
const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0);

// ৩০. Merge arrays
const merged = [...[1, 2], ...[3, 4]];

// ==========================================
// 🔵 ৩১-৫০: অবজেক্ট ট্রিকস (OBJECTS)
// ==========================================

const obj1 = { a: 1 },
	obj2 = { b: 2 };

// ৩১. Merge objects
const mergedObj = { ...obj1, ...obj2 };

// ৩২. Get keys
const keys = Object.keys(mergedObj);

// ৩৩. Get values
const values = Object.values(mergedObj);

// ৩৪. Entries (Key-Value pairs)
const entries = Object.entries(mergedObj);

// ৩৫. Delete property
const temp = { a: 1, b: 2 };
delete temp.a;

// ৩৬. Optional Chaining
const city = user?.address?.city; // Undefined instead of error

// ৩৭. Nullish Coalescing
const name = null ?? "Guest"; // "Guest"

// ৩৮. Destructuring
const { a, b } = mergedObj;

// ৩৯. Dynamic Key
const keyName = "status";
const dynamic = { [keyName]: "active" };

// ৪০. Freeze (No changes)
Object.freeze(obj1);

// ৪১. Seal (Only edit existing, no new props)
Object.seal(obj2);

// ৪২. Deep Clone (Basic)
const deep = JSON.parse(JSON.stringify(mergedObj));

// ৪৩. Check property
const hasA = "a" in obj1;

// ৪৪. Own property check
const isOwn = obj1.hasOwnProperty("a");

// ৪৫. From entries to object
const objFromArr = Object.fromEntries([
	["id", 1],
	["val", "ok"],
]);

// ৪৬. Shallow copy
const copyObj = { ...obj1 };

// ৪৭. NaN Comparison
Object.is(NaN, NaN); // true

// ৪৮. Nullish Assignment
let settings = { theme: null };
settings.theme ??= "dark";

// ৪৯. Logical AND Assignment
let count = 5;
count &&= 10; // Result: 10 (if count was truthy)

// ৫০. Console Table
// console.table(mergedObj);

// ==========================================
// 🔴 ৫১-৭০: স্ট্রিং হ্যাকস (STRINGS)
// ==========================================

const myStr = "Hello World";

// ৫১. Template Literals
const greet = `Msg: ${myStr}`;

// ৫২. Repeat
const echo = "Hi ".repeat(3);

// ৫৩. Trim
const messy = "  test  ".trim();

// ৫৪. Reverse string
const rev = myStr.split("").reverse().join("");

// ৫৫. Starts with
const isH = myStr.startsWith("H");

// ৫৬. Ends with
const isD = myStr.endsWith("d");

// ৫৭. Pad start (Time/Date formatting)
const mins = "5".padStart(2, "0"); // "05"

// ৫৮. Pad end
const tag = "User".padEnd(6, "!"); // "User!!"

// ৫৯. Replace all
const rep = "apple pie".replace(/p/g, "b"); // "abble bie"

// ৬০. Upper Case
const up = myStr.toUpperCase();

// ৬১. Lower Case
const low = myStr.toLowerCase();

// ৬২. Number to String
const sNum = (123).toString();

// ৬৩. Check empty
const isEmpty = "".length === 0;

// ৬৪. Contains substring
const hasWord = myStr.includes("World");

// ৬৫. Base64 Encode
const encoded = btoa("JavaScript");

// ৬৬. Base64 Decode
const decoded = atob(encoded);

// ৬৭. Char at index
const char = myStr.charAt(0);

// ৬৮. Substring
const part = myStr.substring(0, 5);

// ৬৯. Length
const len = myStr.length;

// ৭০. JSON Formatting
const prettyJson = JSON.stringify({ id: 1 }, null, 2);

// ==========================================
// 🟣 ৭১-৯০: লজিক ও ফাংশন (LOGIC/MATH)
// ==========================================

// ৭১. Arrow function
const add = (a, b) => a + b;

// ৭২. IIFE
(() => {
	/* run immediately */
})();

// ৭৩. Ternary
const status = 10 > 5 ? "Yes" : "No";

// ৭৪. Default value (OR)
const input = "" || "Default";

// ৭৫. Short-circuit AND
const isTrue = true;
isTrue && console.log("Logic checked");

// ৭৬. Max in array
const max = Math.max(...[1, 5, 2]);

// ৭৭. Min in array
const min = Math.min(...[1, 5, 2]);

// ৭৮. Random ID
const id = Math.random().toString(36).slice(2);

// ৭৯. Timeout
// setTimeout(() => {}, 1000);

// ৮০. Interval
// setInterval(() => {}, 1000);

// ৮১. Performance timer
const start = performance.now();
// ... code ...
const end = performance.now();

// ৮২. Reload page
// location.reload();

// ৮৩. Scroll to top
// window.scrollTo(0, 0);

// ৮৪. Current Date
const today = new Date().toLocaleDateString();

// ৮৫. Round
Math.round(4.4); // 4

// ৮৬. Ceil
Math.ceil(4.1); // 5

// ৮৭. Floor
Math.floor(4.9); // 4

// ৮৮. Try-Catch
try {
	/* dangerous code */
} catch (err) {
	console.error(err);
}

// ৮৯. Custom Error
// throw new Error("Custom crash");

// ৯০. Check if Float
const isFloat = (n) => !!(n % 1);

// ==========================================
// ⚪ ৯১-১০০: ডোম ও বিবিধ (DOM & MISC)
// ==========================================

// ৯১. Selector
// const el = document.querySelector('.btn');

// ৯২. Clear Inner HTML
// el.innerHTML = '';

// ৯৩. Toggle class
// el.classList.toggle('active');

// ৯৪. Hide element
// el.style.display = 'none';

// ৯৫. Dataset access
// const dataId = el.dataset.id;

// ৯৬. LocalStorage Save
// localStorage.setItem('user', 'Opu');

// ৯৭. LocalStorage Load
// const savedUser = localStorage.getItem('user');

// ৯৮. Fetch API
// fetch('url').then(res => res.json()).then(console.log);

// ৯৯. Colored Console
console.log("%c Rihad Jahan Opu ", "background: #222; color: #bada55");

// ১০০. Debugger
// debugger;

console.log("Hacks 1-100 Ready!");

/**
 * 📂 JAVASCRIPT & WEB HACKS: 101 - 200 (EXAMPLES)
 * Focus: HTML Attributes, CSS Tricks, and Browser APIs
 */

// ==========================================
// 🌐 ১০১-১১৫: HTML ও অ্যাট্রিবিউট হ্যাকস (HTML ATTRIBUTES)
// (এগুলো মূলত HTML ফাইলে ব্যবহারের জন্য, এখানে কমেন্ট হিসেবে উদাহরণ দেওয়া হলো)
// ==========================================

/*
১০১. <img loading="lazy">          // ইমেজ স্ক্রিনে আসলে লোড হবে (Performance)
১০২. <input spellcheck="false">    // লাল দাগ বা স্পেলিং চেক বন্ধ রাখা
১০৩. <a href="f.pdf" download>     // ক্লিক করলে সরাসরি ডাউনলোড হবে
১০৪. <video poster="thumb.jpg">    // ভিডিও প্লে করার আগে একটি ছবি দেখানো
১০৫. <input autocomplete="off">    // ব্রাউজারের অটো-সাজেশন বন্ধ করা
১০৬. <input autofocus>             // পেজ লোড হতেই ইনপুট বক্সে কার্সার আসা
১০৭. <input accept="image/*">      // শুধু ছবি আপলোড করার পারমিশন দেওয়া
১০৮. <input multiple>              // একসাথে অনেকগুলো ফাইল সিলেক্ট করা
১০৯. <div title="Help Info">       // মাউস হোভার করলে তথ্য দেখানো
১১০. <form novalidate>             // ব্রাউজারের ডিফল্ট ফর্ম ভ্যালিডেশন বন্ধ রাখা
১১১. <h1 contenteditable>          // টেক্সটকে সরাসরি ব্রাউজারে এডিট করা
১১২. <input inputmode="numeric">   // মোবাইলে শুধু নাম্বার কিবোর্ড ওপেন করা
১১৩. <div draggable="true">        // এলিমেন্টকে টেনে নিয়ে যাওয়ার ব্যবস্থা
১১৪. <div hidden>                  // এলিমেন্টকে অদৃশ্য করা
১১৫. <base target="_blank">        // সব লিংক নতুন ট্যাবে ওপেন করা
*/

// ==========================================
// 🎨 ১১৬-১৪০: CSS জাদুকরী ট্রিকস (CSS MAGIC)
// (এগুলো তোমার স্টাইলশিটে ব্যবহারের জন্য উদাহরণ)
// ==========================================

/*
১১৬. aspect-ratio: 16 / 9;         // হাইট-উইডথ রেশিও ঠিক রাখা
১১৭. user-select: none;            // টেক্সট কপি করা বন্ধ রাখা
১১৮. pointer-events: none;         // মাউস ক্লিক ডিজেবল করা
১১৯. scroll-behavior: smooth;      // লিংকে ক্লিক করলে স্মুথলি স্ক্রল হওয়া
১২০. caret-color: red;             // ইনপুট কার্সারের রঙ বদলানো
১২১. inset: 0;                     // top, left, right, bottom সব ০ করা
১২২. object-fit: cover;            // ছবিকে ফ্রেমে পারফেক্টলি ফিট করা
১২৩. backdrop-filter: blur(8px);   // ব্যাকগ্রাউন্ড ঝাপসা করা (Glassmorphism)
১২৪. place-items: center;          // গ্রিড এলিমেন্টকে মাঝখানে আনা
১২৫. accent-color: #ff00ff;        // চেকবক্স বা রেডিও বাটনের থিম কালার
১২৬. resize: both;                 // ইউজারকে বক্স বড়-ছোট করতে দেওয়া
১২৭. column-count: 3;              // ম্যাগাজিনের মতো ৩টি কলাম করা
১২৮. mix-blend-mode: multiply;     // কালার ব্লেন্ডিং ইফেক্ট
১২৯. writing-mode: vertical-rl;    // লেখাকে লম্বালম্বি বা খাড়াখাড়ি করা
১৩০. clip-path: circle(50%);       // এলিমেন্টকে গোল করে কাটা
১৩১. filter: grayscale(100%);      // রঙিন ছবি সাদা-কালো করা
১৩২. text-overflow: ellipsis;      // বড় লেখা শেষে ডট (...) যোগ করা
১৩৩. white-space: nowrap;          // লেখাকে এক লাইনে আটকে রাখা
১৩৪. outline: none;                // ফোকাস বর্ডার সরানো
১৩৫. visibility: hidden;           // অদৃশ্য কিন্তু জায়গা দখল করে থাকবে
১৩৬. transform: scale(-1);         // ইমেজকে আয়নার মতো উল্টে দেওয়া
১৩৭. all: unset;                   // সব ডিফল্ট ডিজাইন মুছে ফেলা
১৩৮. scroll-snap-type: x mandatory;// স্লাইডার স্ক্রলিং ইফেক্ট
১৩৯. overflow-y: scroll;           // শুধু নিচের দিকে স্ক্রল বার রাখা
১৪০. ::selection { background: #000; } // লেখা সিলেক্ট করলে কালার বদলানো
*/

// ==========================================
// ⚡ ১৪১-১৬৫: জাভাস্ক্রিপ্ট প্রো-লজিক (JS PRO-LOGIC)
// ==========================================

const nums = [1, 2, 3, 4];

// ১৪১. toReversed (Original array ঠিক রেখে উল্টানো কপি)
const revCopy = nums.toReversed();

// ১৪২. toSorted (Original ঠিক রেখে সর্ট করা কপি)
const sortCopy = nums.toSorted();

// ১৪৩. structuredClone (Deep copy করার সবচেয়ে সেরা উপায়)
const original = { a: 1, b: { c: 2 } };
const deepCopy = structuredClone(original);

// ১৪৪. Array from Set (ডুপ্লিকেট রিমুভ করে অ্যারো বানানো)
const uniqueArr = Array.from(new Set([1, 1, 2]));

// ১৪৫. createObjectURL (ফাইলের জন্য টেম্পোরারি ইউআরএল)
// const url = URL.createObjectURL(fileBlob);

// ১৪৬. navigator.vibrate (মোবাইল ভাইব্রেট করা - ২০০ মিলি সেকেন্ড)
// navigator.vibrate(200);

// ১৪৭. clipboard.writeText (ক্লিপবোর্ডে কপি করা)
// await navigator.clipboard.writeText('Hello Opu');

// ১৪৮. getSelection (ইউজার যা সিলেক্ট করেছে তা পাওয়া)
const selectedText = window.getSelection().toString();

// ১৪৯. toFixed(0) (দশমিক সরিয়ে রাউন্ড করা)
const fixed = (5.67).toFixed(0); // "6"

// ১৫০. Number.isSafeInteger (নিখুঁত ক্যালকুলেশন চেক)
const isSafe = Number.isSafeInteger(9007199254740991);

// ১৫১. Object.hasOwn (hasOwnProperty এর আধুনিক অল্টারনেটিভ)
const hasIt = Object.hasOwn({ x: 1 }, "x");

// ১৫২. randomUUID (ইউনিক আইডি জেনারেট করা)
const uuid = crypto.randomUUID();

// ১৫৩. Intl.NumberFormat (কারেন্সি বা সংখ্যা ফরম্যাট করা)
const formatted = new Intl.NumberFormat("en-IN").format(100000); // "1,00,000"

// ১৫৪. Intl.DateTimeFormat (তারিখ ফরম্যাট করা)
const dateStr = new Intl.DateTimeFormat("bn-BD").format(new Date());

// ১৫৫. history.back() (আগের পেজে ফিরে যাওয়া)
// history.back();

// ১৫৬. designMode (ওয়েবসাইট এডিটযোগ্য করা)
// document.designMode = 'on';

// ১৫৭. Promise finally (সফল হোক বা না হোক, কিছু রান করা)
// fetch(url).finally(() => console.log('Done'));

// ১৫৮. Rest arguments (আনলিমিটেড আরগুমেন্ট নেওয়া)
const sumAll = (...args) => args.reduce((a, b) => a + b);

// ১৫৯. console.time (পারফরম্যান্স মাপা শুরু)
console.time("timer1");

// ১৬০. console.timeEnd (পারফরম্যান্স মাপা শেষ)
console.timeEnd("timer1");

// ১৬১. Math.hypot (পিথাগোরাসের অতিভুজ বের করা)
const hypot = Math.hypot(3, 4); // 5

// ১৬২. Typed Arrays (মেমোরি সেভ করতে নির্দিষ্ট টাইপের অ্যারে)
const smallArr = new Int8Array(10);

// ১৬৩. Reflect.has (প্রপার্টি চেক করার আধুনিক উপায়)
const reflects = Reflect.has({ a: 1 }, "a");

// ১৬৪. Proxy (অবজেক্ট ইন্টারসেপশন)
const p = new Proxy(
	{},
	{ set: (t, k, v) => console.log(`Setting ${k} to ${v}`) }
);

// ১৬৫. Symbol (ইউনিক আইডি/কী তৈরি)
const myKey = Symbol("id");

// ==========================================
// 🛠 ১৬৬-১৮৫: ডিবাগিং ও ব্রাউজার ট্রিকস (DEBUGGING)
// ==========================================

// ১৬৬. copy(data) - শুধু ব্রাউজার কনসোলে কাজ করে
// ১৬৭. inspect($0) - কনসোলের এলিমেন্টকে ডোম-এ খুঁজে দেখা
// ১৬৮. $_ - শেষ আউটপুটটি পুনরায় পাওয়া
// ১৬৯. clear() - কনসোল পরিষ্কার করা
// ১৭০. monitorEvents(window, 'click') - ইভেন্ট ট্র্যাক করা
// ১৭১. getEventListeners(el) - এলিমেন্টের ইভেন্ট লিস্ট দেখা
// ১৭২. location.search - ইউআরএল প্যারামিটার (Query string)
// ১৭৩. performance.memory - মেমোরি ইউজ দেখা
// ১৭৪. devicePixelRatio - স্ক্রিন রেজোলিউশন রেশিও
// ১৭৫. matchMedia - ডার্ক মোড চেক করা
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

// ১৭৬. onbeforeunload - পেজ ছাড়ার সময় সতর্কবার্তা
// window.onbeforeunload = () => "Are you sure?";

// ১৭৭. navigator.onLine - ইন্টারনেট চেক
const online = navigator.onLine;

// ১৭৮. Array.isArray - অ্যারে কি না নিশ্চিত হওয়া
const checkArr = Array.isArray([]);

// ১৭৯. JSON Stringify filter - নির্দিষ্ট ফিল্ড রেখে স্ট্রিং বানানো
const json = JSON.stringify({ name: "Opu", age: 25 }, ["name"]);

// ১৮০. preventExtensions - নতুন প্রপার্টি অ্যাড করা বন্ধ
Object.preventExtensions(original);

// ১৮১. requestAnimationFrame - স্মুথ অ্যানিমেশন লুপ
// requestAnimationFrame(loopFunction);

// ১৮২. AbortController - ফেচ রিকোয়েস্ট মাঝপথে থামানো
const controller = new AbortController();
// controller.abort();

// ১৮৩. queueMicrotask - মাইক্রোটাস্ক রান করা
queueMicrotask(() => console.log("Next Tick"));

// ১৮৪. globalThis - সব এনভায়রনমেন্টে গ্লোবাল অবজেক্ট
console.log(globalThis);

// ১৮৫. import.meta.url - বর্তমান মডিউলের পাথ
// console.log(import.meta.url);

// ==========================================
// 💡 ১৮৬-২০০: বিবিধ ও মজার হ্যাকস (MISC)
// ==========================================

// ১৮৬. Array fill (নির্দিষ্ট রেঞ্জ পূরণ করা)
const filled = [1, 2, 3, 4].fill(0, 1, 3); // [1, 0, 0, 4]

// ১৮৭. String concat
const joined = "a".concat("b", "c");

// ১৮৮. CodePoint (ইমোজি বানানো)
const smile = String.fromCodePoint(0x1f600); // 😀

// ১৮৯. eval (স্ট্রিংকে কোড হিসেবে রান করা - সতর্ক থাকুন)
const result = eval("2 + 2");

// ১৯০. isFinite (সংখ্যাটি অসীম কি না চেক)
const finite = isFinite(1 / 0); // false

// ১৯১. NaN Comparison (জাভাস্ক্রিপ্টে NaN !== NaN)
const nanCheck = NaN === NaN; // false

// ১৯২. typeof null (এটি একটি অবজেক্ট রিটার্ন করে)
const type = typeof null; // "object"

// ১৯৩. 0.1 + 0.2 (নিখুঁত ০.৩ হয় না)
const mathBug = 0.1 + 0.2 === 0.3; // false

// ১৯৪. void 0 (undefined এর নিরাপদ বিকল্প)
const undef = void 0;

// ১৯৫. Boolean Math
const boolAdd = true + true; // 2

// ১৯৬. Array to String implicit
const arrEmpty = [] + []; // "" (Empty string)

// ১৯৭. Object Empty plus Array
const objPlusArr = {} + []; // "[object Object]"

// ১৯৮. Math.max default (কিছু না দিলে -Infinity)
const maxDef = Math.max();

// ১৯৯. Math.min default (কিছু না দিলে Infinity)
const minDef = Math.min();

// ২০০. debugger; - এই কীওয়ার্ডটি ব্রাউজার ইনসপেক্টর অটো ওপেন করে কোড থামিয়ে দেয়।

console.log("Hacks 101-200 Complete!");

/**
 * 📂 JAVASCRIPT & WEB HACKS: 201 - 300 (EXAMPLES)
 * Focus: Modern JS (ES2024), Advanced CSS Layouts, and Performance
 */

// ==========================================
// 🚀 ২০১-২২০: আধুনিক অ্যারে ও অবজেক্ট ম্যাজিক (ES2023/24)
// ==========================================

const myArr = [10, 20, 30, 40];

// ২০১. arr.with() (অরিজিনাল অ্যারে ঠিক রেখে নির্দিষ্ট ইনডেক্সে মান বদলানো)
const newArr = myArr.with(1, 99); // [10, 99, 30, 40]

// ২০২. arr.toSpliced() (মিউটেশন ছাড়া আইটেম রিমুভ/অ্যাড)
const spliced = myArr.toSpliced(1, 1, 50); // [10, 50, 30, 40]

// ২০৩. Object.groupBy() (ডাটাকে ক্যাটাগরি অনুযায়ী গ্রুপ করা - প্রো টিপ!)
const inventory = [
	{ name: "Laptop", type: "tech" },
	{ name: "Phone", type: "tech" },
	{ name: "Apple", type: "food" },
];
const grouped = Object.groupBy(inventory, ({ type }) => type);

// ২০৪. findLast() (শেষের দিক থেকে প্রথম ম্যাচিং ভ্যালু খোঁজা)
const lastHigh = myArr.findLast((n) => n > 25); // 40

// ২০৫. findLastIndex() (শেষের দিক থেকে ইনডেক্স খোঁজা)
const lastIdx = myArr.findLastIndex((n) => n > 25); // 3

// ২০৬. Array self-check (অ্যারে নিজের ভেতরেই কপি করা)
// [1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5]

// ২০৭. TypedArray.prototype.set (খুব দ্রুত অ্যারে ডাটা কপি করা)
const buffer = new Int32Array(10);
buffer.set([1, 2, 3]);

// ২০৮. Map.prototype.size (ম্যাপে কয়টি আইটেম আছে দেখা)
const myMap = new Map([
	["a", 1],
	["b", 2],
]);
console.log(myMap.size); // 2

// ২০৯. Set.prototype.has (খুব দ্রুত ডাটা সার্চ করা)
const mySet = new Set([1, 2, 3]);
mySet.has(2); // true

// ২১০. Promise.withResolvers() (প্রমিস হ্যান্ডেল করার একদম নতুন উপায় - ES2024)
// const { promise, resolve, reject } = Promise.withResolvers();

// ২১১. Intl.Segmenter (টেক্সটকে শব্দ বা বাক্যে সঠিকভাবে ভাগ করা)
const segmenter = new Intl.Segmenter("en", { granularity: "word" });
const segments = segmenter.segment("Hello World");

// ২১২. String.prototype.isWellFormed() (স্ট্রিংটি সঠিকভাবে এনকোড করা কি না চেক)
"abc".isWellFormed(); // true

// ২১৩. Symbol.for() (গ্লোবাল সিম্বল রেজিস্ট্রি ব্যবহার করা)
const globalSym = Symbol.for("app.id");

// ২১৪. structuredClone for Dates & Regex (এগুলোও ক্লোন হয়)
const objWithDate = { d: new Date(), r: /test/g };
const clone = structuredClone(objWithDate);

// ২১৫. Logical Nullish Assignment (শুধু নাল বা আনডিফাইনড হলেই সেট হবে)
let settings = { volume: 0 };
settings.volume ??= 10; // Result: 0 (কারণ 0 নাল নয়)

// ==========================================
// 🎨 ২১৬-২৪০: আধুনিক CSS ও রেসপন্সিভ হ্যাকস
// ==========================================

/*
২১৬. color-scheme: dark light;     // ব্রাউজার থিম অনুযায়ী অটো ডার্ক মোড।
২১৭. text-wrap: balance;           // হেডিংয়ের লাইনগুলোকে সুন্দরভাবে সমান করা।
২১৮. text-wrap: pretty;            // প্যারাগ্রাফের শেষে একা শব্দ ঝুলে থাকা বন্ধ করা।
২১৯. :has(:checked)                // কোনো ইনপুট চেকড থাকলে প্যারেন্টকে স্টাইল করা।
২২০. container-type: inline-size;  // কন্টেইনার কুয়েরি (প্যারেন্ট সাইজ অনুযায়ী স্টাইল)।
২২১. display: subgrid;             // প্যারেন্ট গ্রিডের সাথে চাইল্ড গ্রিড এলাইন করা।
২২২. font-palette: --my-colors;    // কালার ফন্টের রঙ বদলানো।
২২৩. isolation: isolate;           // z-index এর ঝামেলা থেকে বাঁচতে নতুন লেয়ার।
২২৪. overscroll-behavior: contain; // স্ক্রল করার সময় পেছনের পেজ স্ক্রল হওয়া বন্ধ করা।
২২৫. scroll-padding-top: 100px;    // স্টিকি হেডার থাকলে স্ক্রল এলাইনমেন্ট ঠিক করা।
২২৬. white-space: pre-wrap;        // টেক্সটের স্পেস ও লাইন ব্রেক বজায় রাখা।
২২৭. pointer-events: bounding-box; // SVG ক্লিকের এরিয়া নিখুঁত করা।
২২৮. mix-blend-mode: difference;   // কার্সার টেক্সটের ওপর নিলে রঙ বদলে যাওয়া।
২২৯. filter: drop-shadow(0 0 5px red); // PNG ইমেজের বর্ডার অনুযায়ী শ্যাডো।
২৩০. aspect-ratio: 1 / 1;          // নিখুঁত বর্গাকার বক্স বানানো।
২৩১. hyphens: auto;                // লম্বা শব্দ ভেঙে পরবর্তী লাইনে নিয়ে যাওয়া।
২৩২. user-select: all;             // এক ক্লিকে পুরো টেক্সট সিলেক্ট করা।
২৩৩. columns: 2 300px;             // রেসপন্সিভ কলাম অটো তৈরি করা।
২৩৪. container-name: sidebar;      // নির্দিষ্ট কন্টেইনারকে টার্গেট করা।
২৩৫. image-rendering: pixelated;   // লো-কোয়ালিটি ইমেজ বা পিক্সেল আর্ট শার্প করা।
২৩৬. @supports (display: flex)     // ব্রাউজার ফিচার সাপোর্ট করে কি না দেখা।
২৩৭. @media (prefers-reduced-motion) // এনিমেশন পছন্দ না করলে তা বন্ধ রাখা।
২৩৮. @media (hover: hover)         // ডিভাইসটি মাউস নাকি টাচ স্ক্রিন চেক করা।
২৩৯. block-size / inline-size;     // height/width এর আধুনিক নাম (Logical props)।
২৪০. margin-inline: auto;          // মাঝখানে এলিমেন্ট আনা (left/right margin)।
*/

// ==========================================
// ⚡ ২৪১-২৭০: পারফরম্যান্স ও অপ্টিমাইজেশন (PERFORMANCE)
// ==========================================

// ২৪১. IntersectionObserver (ইমেজ স্ক্রিনে আসলে লোড করা)
/* const observer = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && console.log('Visible!'));
});
*/

// ২৪২. ResizeObserver (এলিমেন্টের সাইজ বদলালে অ্যাকশন নেওয়া)
/*
const ro = new ResizeObserver(entries => console.log('Resized!'));
ro.observe(document.body);
*/

// ২৪৩. requestIdleCallback (ব্রাউজার যখন ফ্রি তখন ভারী কাজ করা)
// window.requestIdleCallback(() => { console.log('Doing heavy task...') });

// ২৪৪. Worker (ব্যাকগ্রাউন্ড থ্রেডে কাজ করা - মেইন পেজ ফাস্ট রাখে)
// const worker = new Worker('worker.js');

// ২৪৫. navigator.sendBeacon (পেজ বন্ধ করার সময় ডাটা পাঠানো)
// navigator.sendBeacon('/log', JSON.stringify(data));

// ২৪৬. CompressionStream (ব্রাউজারেই ডাটা জিপ করা)
// const cs = new CompressionStream('gzip');

// ২৪৭. fetchpriority (কোন ইমেজ আগে লোড হবে তা ব্রাউজারকে বলা)
// <img src="hero.jpg" fetchpriority="high">

// ২৪৮. Performance Mark (কোডের স্পিড মাপা)
performance.mark("start-task");
// ... কোড ...
performance.mark("end-task");
performance.measure("My Task", "start-task", "end-task");

// ২৪৯. decoding="async" (ইমেজ ডিকোডিং ব্যাকগ্রাউন্ডে করা)
// <img src="big-img.jpg" decoding="async">

// ২৫০. loading="lazy" for iframes (আইফ্রেম লেজি লোড করা)

// ২৫১. Object.preventExtensions (নতুন প্রপার্টি যোগ করা ব্লক করা)
const secureObj = { id: 1 };
Object.preventExtensions(secureObj);

// ২৫২. queueMicrotask (প্রমিসের মতো করে কোনো কাজ লাইনের শেষে রাখা)
queueMicrotask(() => {
	/* run after current script */
});

// ২৫৩. Array.from({length: 5}) (৫টি আইটেমের খালি অ্যারে বানানো)

// ২৫৪. Number.isNaN vs isNaN (Number.isNaN বেশি নিরাপদ)
Number.isNaN("hello"); // false
isNaN("hello"); // true (ভুল রেজাল্ট)

// ২৫৫. String.prototype.trimStart() (শুরু থেকে স্পেস কাটা)

// ২৫৬. console.groupCollapsed (কনসোল লগ ফোল্ডার করে রাখা)
console.groupCollapsed("My Logs");
console.log("Task 1");
console.groupEnd();

// ২৫৭. console.assert (কন্ডিশন ফলস হলে তবেই এরর দেখানো)
console.assert(1 === 2, "Math failed!");

// ২৫৮. requestAnimationFrame (স্মুথ এনিমেশনের জন্য)
/*
function animate() {
  // update UI
  requestAnimationFrame(animate);
}
*/

// ২৫৯. matchMedia listener (ডার্ক মোড চেঞ্জ হলে ডিটেক্ট করা)
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", (e) => {
		console.log(e.matches ? "Dark" : "Light");
	});

// ২৬০. navigator.deviceMemory (ডিভাইসের র‍্যাম কত জিবি তা জানা)
const ram = navigator.deviceMemory; // e.g., 8

// ==========================================
// 🌍 ২৬১-৩০০: সিস্টেম ও ওয়েব এপিআই (SYSTEM APIs)
// ==========================================

// ২৬১. navigator.getBattery() (ব্যাটারি পারসেন্টেজ দেখা)
// navigator.getBattery().then(b => console.log(b.level * 100 + "%"));

// ২৬২. navigator.share (মোবাইলের নেটিভ শেয়ার অপশন ওপেন করা)
/*
navigator.share({ title: 'Opu', url: 'https://...' });
*/

// ২৬৩. window.getSelection() (ইউজার যে টেক্সট সিলেক্ট করেছে তা পড়া)

// ২৬৪. navigator.clipboard.readText() (ক্লিপবোর্ড থেকে ডাটা পড়া)

// ২৬৫. URLSearchParams (ইউআরএল এর ডাটা সহজে হ্যান্ডেল করা)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// ২৬৬. CSS.supports (জেএস দিয়ে সিএসএস সাপোর্ট চেক)
CSS.supports("display", "grid"); // true

// ২৬৭. navigator.onLine (ইন্টারনেট কানেকশন আছে কি না দেখা)

// ২৬৮. Element.getBoundingClientRect() (এলিমেন্টের সঠিক পজিশন ও সাইজ)

// ২৬৯. Element.closest('.class') (সবচেয়ে কাছের প্যারেন্ট খুঁজে বের করা)

// ২৭০. DocumentFragment (মেমোরিতে ডোম তৈরি করে একবারে ইনসার্ট করা - Fast!)
const fragment = document.createDocumentFragment();

// ২৭১. Notification.requestPermission() (নোটিফিকেশন পারমিশন চাওয়া)

// ২৭২. Intl.RelativeTimeFormat (২ দিন আগে / ৩ ঘণ্টা পর - এমন ফরম্যাট)
const rtf = new Intl.RelativeTimeFormat("bn", { numeric: "auto" });
console.log(rtf.format(-2, "day")); // "২ দিন আগে"

// ২৭৩. StorageEstimate (ব্রাউজারে কতটুকু মেমোরি খালি আছে দেখা)
// navigator.storage.estimate().then(e => console.log(e.usage));

// ২৭৪. window.location.replace (ব্যাক বাটন ছাড়াই পেজ রিডাইরেক্ট)

// ২৭৫. Array.prototype.flatMap (ম্যাপ এবং ফ্ল্যাট একসাথে করা)

// ২৭৬. EyeDropper API (স্ক্রিন থেকে রঙ পিক করা - Chrome only)
/*
const eyeDropper = new EyeDropper();
eyeDropper.open().then(result => console.log(result.sRGBHex));
*/

// ২৭৭. WakeLock (স্ক্রিন অফ হওয়া বন্ধ করা)
// navigator.wakeLock.request('screen');

// ২৭৮. BroadcastChannel (একই সাইটের বিভিন্ন ট্যাবের মধ্যে কথা বলা)
const channel = new BroadcastChannel("app_bus");
channel.postMessage("Hello Tabs!");

// ২৭৯. history.pushState (রিফ্রেশ ছাড়া ইউআরএল চেঞ্জ করা)

// ২৮০. structuredClone for Map/Set (ম্যাপ বা সেট ডিপ কপি করা)

// ২৮১. console.table for Objects (অবজেক্ট সুন্দর টেবিল আকারে দেখা)

// ২৮২. Object.values (অবজেক্টের সব ভ্যালু একসাথে পাওয়া)

// ২৮৩. String.prototype.repeat (স্ট্রিং বারবার প্রিন্ট করা)

// ২৮৪. TextEncoder / TextDecoder (স্ট্রিংকে বাইনারিতে রূপান্তর)

// ২৮৫. AbortController for Fetch (ফেচ রিকোয়েস্ট ক্যানসেল করা)

// ২৮৬. Blob API (ডাটাকে ফাইল হিসেবে ডাউনলোড করা)

// ২৮৭. crypto.getRandomValues (খুবই সিকিউর র‍্যান্ডম নাম্বার)

// ২৮৮. Proxy for validation (অবজেক্টে ডাটা ঢোকার আগে চেক করা)

// ২৮৯. navigator.language (ইউজারের ব্রাউজার ল্যাঙ্গুয়েজ জানা)

// ২৯০. window.print() (পেজ প্রিন্ট করার কমান্ড)

// ২৯১. Element.scrollIntoView({ behavior: 'smooth' }) (স্মুথ স্ক্রলিং)

// ২৯২. Intl.ListFormat (একাধিক শব্দকে কমা দিয়ে সুন্দর করা)
const lf = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
lf.format(["Apple", "Mango", "Banana"]); // "Apple, Mango, and Banana"

// ২৯৩. document.hidden (ইউজার যখন অন্য ট্যাবে থাকে তখন কাজ থামানো)

// ২৯৪. visualViewport (স্ক্রিনের জুম বা কীবোর্ড ওপেন হওয়া ট্র্যাক করা)

// ২৯৫. Node.contains (একটি এলিমেন্ট অন্যটির ভেতরে আছে কি না দেখা)

// ২৯৬. location.hash (ইউআরএল এর হ্যাস # ভ্যালু পড়া)

// ২৯৭. navigator.vibrate([100, 50, 100]) (ভাইব্রেশন প্যাটার্ন তৈরি)

// ২৯৮. CSS.registerProperty (জেএস দিয়ে কাস্টম সিএসএস প্রপার্টি বানানো)

// ২৯৯. indexedDB (ব্রাউজারে বড় ডাটাবেস স্টোর করা)

// ৩০০. debugger; (কোড মাঝপথে থামিয়ে ডিবাগ করা)

console.log("Hacks 201-300 Ready!");

/**
 * 📂 JAVASCRIPT & WEB HACKS: 301 - 400 (EXAMPLES)
 * Focus: Advanced DOM, Security, Async Patterns, and Optimization
 */

// ==========================================
// 🏗 ৩০১-৩২০: অ্যাডভান্সড ডোম ও ইভেন্ট (ADVANCED DOM)
// ==========================================

// ৩০১. Custom Events (নিজের নামে ইভেন্ট তৈরি ও ডিসপ্যাচ করা)
const myEvent = new CustomEvent("opu:update", { detail: { id: 101 } });
document.dispatchEvent(myEvent);

// ৩০২. Event Delegation (একটি প্যারেন্ট দিয়ে অনেকগুলো চাইল্ডের ক্লিক হ্যান্ডেল করা)
document.querySelector("#parent").addEventListener("click", (e) => {
	if (e.target.matches(".child")) console.log("Child clicked!");
});

// ৩০৩. once: true (ইভেন্ট লিসেনার একবার কাজ করার পর অটো ডিলিট হওয়া)
window.addEventListener("scroll", () => console.log("Scrolled once!"), {
	once: true,
});

// ৩০৪. passive: true (স্ক্রল ইভেন্টের পারফরম্যান্স বাড়ানো)
window.addEventListener("touchstart", () => {}, { passive: true });

// ৩০৫. stopImmediatePropagation (একই এলিমেন্টের অন্য সব লিসেনার বন্ধ করা)
el.addEventListener("click", (e) => e.stopImmediatePropagation());

// ৩০৬. node.replaceWith (পুরানো এলিমেন্ট বদলে নতুন কিছু বসানো)
// oldEl.replaceWith(newEl);

// ৩০৭. insertAdjacentHTML (খুব দ্রুত HTML ইনসার্ট করা)
// el.insertAdjacentHTML('beforeend', '<p>Hello</p>');

// ৩০৮. scrollIntoView with Offset (স্মুথ স্ক্রলিং ও পজিশনিং)
// el.scrollIntoView({ behavior: 'smooth', block: 'center' });

// ৩০৯. Pointer Events (মাউস এবং টাচ দুটোর জন্যই কাজ করা)
el.addEventListener("pointerdown", (e) => console.log("Pressed!"));

// ৩১০. FormData API (ফর্মের সব ডাটা একবারে অবজেক্ট করা)
const data = new FormData(document.querySelector("form"));
const formObj = Object.fromEntries(data.entries());

// ৩১১. input event (keyup এর বদলে এটি ব্যবহার করা ভালো)
input.addEventListener("input", (e) => console.log(e.target.value));

// ৩১২. transitionend (সিএসএস এনিমেশন শেষ হওয়ার পর জেএস রান করা)
el.addEventListener("transitionend", () => console.log("Done!"));

// ৩১৩. Document.activeElement (বর্তমানে কোন বক্সে ফোকাস আছে তা জানা)
console.log(document.activeElement);

// ৩১৪. contains (একটি এলিমেন্ট অন্যটির ভেতরে আছে কি না দেখা)
const isInside = parent.contains(child);

// ৩১৫. cloneNode(true) (চাইল্ডসহ পুরো এলিমেন্ট কপি করা)
const copy = el.cloneNode(true);

// ৩১৬. matches (এলিমেন্টটি নির্দিষ্ট সিলেক্টর কি না চেক করা)
if (el.matches(".active")) {
	/* do something */
}

// ৩১৭. getComputedStyle (সিএসএস ফাইলের স্টাইল ভ্যালু পড়া)
const color = getComputedStyle(el).color;

// ৩১৮. requestFullscreen (ফুল স্ক্রিন মোড অন করা)
// el.requestFullscreen();

// ৩১৯. checkVisibility (এলিমেন্টটি আসলে স্ক্রিনে দেখা যাচ্ছে কি না)
if (el.checkVisibility()) {
	/* visible */
}

// ৩২০. window.getComputedStyle (সিউডো এলিমেন্ট ::before এর স্টাইল পড়া)
const beforeStyle = window.getComputedStyle(el, "::before").content;

// ==========================================
// 🔒 ৩২১-৩৪০: সিকিউরিটি ও ডাটা প্রোটেকশন (SECURITY)
// ==========================================

// ৩২১. encodeURIComponent (ইউআরএল এ ডাটা পাঠানোর আগে এনকোড করা)
const safeURL = encodeURIComponent("name=Rihad Jahan");

// ৩২২. Object.freeze (অবজেক্ট পুরোপুরি লক করে দেওয়া)
const config = Object.freeze({ api: "https://..." });

// ৩২৩. TextEncoder (স্ট্রিং থেকে Uint8Array তৈরি করা)
const encoder = new TextEncoder();
const bytes = encoder.encode("Hello");

// ৩২৪. crypto.subtle (ব্রাউজারে ডাটা হ্যাশ বা এনক্রিপ্ট করা)
// const hash = await crypto.subtle.digest('SHA-256', data);

// ৩২৫. Content-Security-Policy (CSP চেক - হ্যাকিং রোধে)

// ৩২৬. noopener, noreferrer (নতুন ট্যাব ওপেন করার সময় সিকিউরিটি)
// <a href="..." target="_blank" rel="noopener noreferrer">

// ৩২৭. HttpOnly Cookies (জেএস থেকে কুকি চুরি রোধ - সার্ভার সাইড)

// ৩২৮. input.setSelectionRange (পাসওয়ার্ড বক্সের সিকিউর সিলেকশন)

// ৩২৯. btoa() / atob() (বেস৬৪ এনকোডিং ও ডিকোডিং)

// ৩৩০. Sanitizer API (অশুদ্ধ HTML কোড ক্লিন করা)
// const cleanHTML = new Sanitizer().sanitizeFor('div', dirtyHTML);

// ৩৩১. window.origin (ইউআরএল এর অরিজিন চেক করা)

// ৩৩২. crossOriginIsolated (শেয়ারড মেমোরি ব্যবহারের আগে চেক)

// ৩৩৩. Trusted Types (XSS অ্যাটাক বন্ধ করার মডার্ন ওয়ে)

// ৩৩৪. Referrer Policy (ডাটা লিকেজ রোধে)

// ৩৩৫. Permissions API (ক্যামেরা/লোকেশন পারমিশন স্ট্যাটাস দেখা)
// navigator.permissions.query({name:'camera'}).then(p => console.log(p.state));

// ==========================================
// 🛠 ৩৪১-৩৭০: নোড/বান ও ব্যাকএন্ড হ্যাকস (BACKEND/CLI)
// (এগুলো তোমার Deepin OS স্ক্রিপ্টিং এর জন্য দারুণ)
// ==========================================

// ৩৪১. Bun.file (বানে ফাইল পড়া - নোডের চেয়ে অনেক ফাস্ট)
// const file = Bun.file("data.txt"); await file.text();

// ৩৪২. process.env (এনভায়রনমেন্ট ভেরিয়েবল পড়া)
const dbKey = process.env.DB_KEY;

// ৩৪৩. __dirname (বর্তমান ফোল্ডারের পাথ পাওয়া)

// ৩৪৪. fs.watch (ফাইলে কোনো চেঞ্জ হলে সাথে সাথে জানা)

// ৩৪৫. AbortSignal.timeout (অটোমেটিক রিকোয়েস্ট ক্যানসেল করা)
// fetch(url, { signal: AbortSignal.timeout(5000) });

// ৩৪৬. util.promisify (পুরানো কলব্যাক ফাংশনকে প্রমিসে রূপান্তর)

// ৩৪৭. worker_threads (ভারী ক্যালকুলেশন আলাদা থ্রেডে পাঠানো)

// ৩৪৮. process.nextTick (পরবর্তী লুপের শুরুতেই কাজ করা)

// ৩৪৯. stream.pipeline (বড় ফাইল মেমোরি না ভরিয়ে ট্রান্সফার করা)

// ৩৫০. crypto.randomBytes (সিকিউর টোকেন জেনারেট করা)

// ৩৫১. path.join (সব ওএসের জন্য সঠিক পাথ তৈরি করা)

// ৩৫২. cluster (মাল্টি-কোর প্রসেসর ব্যবহার করে সার্ভার চালানো)

// ৩৫৩. process.on('uncaughtException') (অ্যাপ ক্র্যাশ হওয়া ঠেকানো)

// ৩৫৪. URL.createObjectURL (বড় ডাটাকে টেম্পোরারি লিংকে কনভার্ট করা)

// ৩৫৫. ReadableStream (ডাটা চাঙ্ক আকারে পড়া)

// ৩৫৬. WritableStream (ডাটা চাঙ্ক আকারে লেখা)

// ৩৫৭. TransformStream (ডাটা যাওয়ার পথেই বদলে দেওয়া)

// ৩৫৮. EventLoop Monitoring (সার্ভার স্লো হচ্ছে কি না চেক করা)

// ৩৫৯. console.dir (অবজেক্টের ভেতরের সব প্রপার্টি লম্বালম্বি দেখা)

// ৩৬০. os.cpus() (তোমার কম্পিউটারের কোর সংখ্যা জানা)

// ==========================================
// 💡 ৩৬১-৪০০: বিবিধ ও লজিক্যাল হ্যাকস (LOGIC & UTILS)
// ==========================================

// ৩৬১. Array.from({length: 10}, (_, i) => i + 1) (১ থেকে ১০ এর অ্যারে)

// ৩৬২. performance.now() vs Date.now() (পারফরম্যান্সের জন্য performance.now নিখুঁত)

// ৩৬৩. navigator.sendBeacon (ইউজার ট্যাব ক্লোজ করলেও সার্ভারে ডাটা যাবে)

// ৩৬৪. window.matchMedia (ডার্ক মোড স্ক্রিপ্টিং)

// ৩৬৫. scroll-padding (স্টিকি হেডারের জন্য স্ক্রল গ্যাপ ঠিক করা)

// ৩৬৬. pointer-events: none (এলিমেন্টের ওপর দিয়ে ক্লিক পাস করা)

// ৩৬৭. user-select: text (টেক্সট কপি করার সুবিধা রাখা)

// ৩৬৮. gap in Flexbox (মার্জিনের বদলে গ্যাপ ব্যবহার করা)

// ৩৬৯. aspect-ratio (ইমেজের হাইট-উইডথ রেশিও লক করা)

//৩৭০. filter: blur() (গ্লাস ইফেক্ট তৈরি করা)

// ৩৭১. backdrop-filter (পেছনের এলিমেন্ট ঝাপসা করা)

// ৩৭২. mix-blend-mode (কালার ওভারলে ইফেক্ট)

// ৩৭৩. overscroll-behavior (বডি স্ক্রল লক করা)

// ৩৭৪. scroll-snap-align (স্লাইডার এলাইনমেন্ট)

// ৩৭৫. will-change (ব্রাউজারকে অ্যানিমেশন অপ্টিমাইজ করতে সাহায্য করা)

// ৩৭৬. display: contents (প্যারেন্ট সরিয়ে চাইল্ডকে মেইন গ্রিডে আনা)

// ৩৭৭. object-fit: cover (ছবিকে বক্সে ফিট করা)

// ৩৭৮. clip-path (কাস্টম শেপ তৈরি করা)

// ৩৭৯. outline-offset (আউটলাইন ও বর্ডারের মাঝে গ্যাপ দেওয়া)

// ৩৮০. caret-color (ইনপুট কার্সারের রঙ বদলানো)

// ৩৮১. scrollbar-width: none (স্ক্রল বার হাইড করা)

// ৩৮২. accent-color (চেকবক্সের থিম কালার চেঞ্জ)

// ৩৮৩. text-indent (প্রথম লাইনে স্পেস দেওয়া)

// ৩৮৪. column-count (টেক্সটকে কলামে ভাগ করা)

// ৩৮৫. shape-outside (ছবির চারপাশ দিয়ে টেক্সট কার্ভ করা)

// ৩৮৬. image-set (রেজোলিউশন অনুযায়ী ইমেজ লোড)

// ৩৮৭. font-display: swap (ফন্ট লোডিং অপ্টিমাইজেশন)

// ৩৮৮. pointer-events: bounding-box (SVG ক্লিক ফিক্স)

// ৩৮৯. CSS.registerProperty (জেএস দিয়ে কাস্টম সিএসএস প্রপার্টি)

// ৩৯০. IntersectionObserver (লেজি লোডিং ইমেজ)

// ৩৯১. ResizeObserver (উইন্ডো না, শুধু এলিমেন্ট রিসাইজ ডিটেক্ট করা)

// ৩৯২. requestIdleCallback (অলস সময়ে কাজ করা)

// ৩৯৩. navigator.vibrate (ভাইব্রেশন ফিডব্যাক)

// ৩৯৪. Intl.NumberFormat (টাকার হিসাব ফরম্যাট করা)

// ৩৯৫. Intl.DateTimeFormat (তারিখের ফরম্যাট ঠিক করা)

// ৩৯৬. Intl.RelativeTimeFormat (সময়কে "আগে/পরে" হিসেবে দেখানো)

// ৩৯৭. structuredClone (ডিপ কপির আসল রাজা)

// ৩৯৮. Promise.allSettled (সব প্রমিস শেষ হওয়া পর্যন্ত ওয়েট করা)

// ৩৯৯. Nullish Coalescing (??) (ফলব্যাক ভ্যালু সেট করা)

// ৪০০. debugger; (কোড মাঝপথে থামিয়ে কনসোলে চেক করা)

console.log("Hacks 301-400 Complete! Now you have all 500 hacks in order.");

/**
 * 📂 JAVASCRIPT & WEB HACKS: 401 - 500 (EXAMPLES)
 * Focus: Memory, Browser Internals, Advanced DOM & Modern APIs
 */

// ==========================================
// 🚀 ৪০১-৪২০: মেমোরি ও প্রো-প্যাটার্নস (JS MEMORY)
// ==========================================

// ৪০১. WeakMap (মেমোরি লিক ছাড়া ডাটা স্টোর)
const privateData = new WeakMap();
let user = { name: "Opu" };
privateData.set(user, "Sensitive Info"); // user ডিলিট হলে এটাও অটো ডিলিট হবে।

// ৪০২. WeakSet (অবজেক্টের কালেকশন যা অটো ক্লিনিং হয়)
const visitedNodes = new WeakSet();

// ৪০৩. FinalizationRegistry (অবজেক্ট গার্বেজ কালেক্ট হলে জানানো)
const registry = new FinalizationRegistry((heldValue) => {
	console.log(`${heldValue} মেমোরি থেকে ডিলিট হয়েছে!`);
});
registry.register(user, "User Object");

// ৪০৪. Error.cause (এররের আসল কারণ পাস করা)
try {
	/* code */
} catch (err) {
	throw new Error("Failed to fetch", { cause: err });
}

// ৪০৫. globalThis (সব এনভায়রনমেন্টে গ্লোবাল অবজেক্ট)
console.log(globalThis); // ব্রাউজারে window, নোডে global।

// ৪০৬. Promise.any() (প্রথম সফল প্রমিসটি নেওয়া)
Promise.any([p1, p2]).then((res) => console.log(res));

// ৪০৭. AggregateError (একাধিক এরর হ্যান্ডেল করা)
// catch (err) { if (err instanceof AggregateError) { ... } }

// ৪০৮. Logical Nullish Assignment (??=)
let config = { timeout: null };
config.timeout ??= 3000; // শুধু null/undefined হলে সেট হবে।

// ৪০৯. Numeric Separators (বড় সংখ্যা সহজে পড়া)
const salary = 1_00_000; // ১০ লক্ষ

// ৪১০. matchAll (Regex দিয়ে সব ম্যাচ একসাথে পাওয়া)
const matches = [..."hello".matchAll(/l/g)];

// ৪১১. for await...of (স্ট্রিম বা প্রমিসের লুপ)
for await (const chunk of asyncIterable) {
	console.log(chunk);
}

// ৪১২. Import Maps (ব্রাউজারে সরাসরি মডিউল পাথ কন্ট্রোল)
// <script type="importmap"> { "imports": { "utils": "./utils.js" } } </script>

// ৪১৩. Top-level await (ফাংশন ছাড়াই await ব্যবহার - মডিউলে)
// const data = await fetch('/api');

// ৪১৪. Array.fromAsync (অ্যাসিনক্রোনাস ডাটা থেকে অ্যারে বানানো)
const items = await Array.fromAsync(asyncSource);

// ৪১৫. Symbol.asyncIterator (কাস্টম অ্যাসিনক্রোনাস ইটারেটর)
const myObj = {
	[Symbol.asyncIterator]: async function* () {
		yield 1;
	},
};

// ৪১৬. Proxy (trap) (অবজেক্টের চেঞ্জ ট্র্যাক করা)
const p = new Proxy(
	{},
	{
		deleteProperty: (t, k) => {
			console.log(k);
			return true;
		},
	}
);

// ৪১৭. Reflect.ownKeys (সিম্বলসহ সব কী বের করা)
Reflect.ownKeys({ [Symbol("id")]: 1, a: 2 });

// ৪১৮. SharedArrayBuffer (ওয়ার্কারের মধ্যে মেমোরি শেয়ার)
const shared = new SharedArrayBuffer(1024);

// ৪১৯. Atomics.add (মাল্টি-থ্রেডেড ক্যালকুলেশন সেফ রাখা)
Atomics.add(new Int32Array(shared), 0, 5);

// ৪২০. Intl.PluralRules (একবচন/বহুবচন নির্ধারণ)
const plural = new Intl.PluralRules("en-US").select(1); // "one"

// ==========================================
// 🎨 ৪২১-৪৪০: CSS আর্কিটেকচার ও মডার্ন লেআউট
// ==========================================

/*
৪২১. @layer base, components;     // সিএসএস লেয়ার দিয়ে স্পেসিফিসিটি ঠিক করা।
৪২২. @container (min-width: 400px) // প্যারেন্ট এলিমেন্টের সাইজ অনুযায়ী স্টাইল।
৪২৩. scroll-timeline: --my-scroll; // স্ক্রল অনুযায়ী এনিমেশন (JS ছাড়া)।
৪২৪. view-transition-name: hero;  // পেজ ট্রানজিশন স্মুথ করা।
৪২৫. color(display-p3 1 0 0);      // হাই-ডেফিনিশন রঙ।
৪২৬. oklch(70% 0.1 20);            // মানুষের চোখের জন্য আরামদায়ক রঙ।
৪২৭. text-wrap: balance;           // লাইনের দৈর্ঘ্য সমান রাখা।
৪২৮. aspect-ratio: 16 / 9;         // লেআউট শিফট রোধ করা।
৪২৯. contain: paint;               // বাইরের অংশ রেন্ডার না করে স্পিড বাড়ানো।
৪৩০. will-change: transform;       // ব্রাউজারকে এনিমেশন অপ্টিমাইজ করতে বলা।
৪৩১. image-set(url(a.jpg) 1x);     // রেজোলিউশন অনুযায়ী ইমেজ লোড।
৪৩২. font-display: swap;           // ডিফল্ট ফন্ট আগে দেখানো।
৪৩৩. accent-color: red;            // ফর্ম কন্ট্রোলের থিম কালার।
৪৩৪. pointer-events: bounding-box; // SVG ক্লিকের সঠিক এরিয়া।
৪৩৫. shape-outside: circle();      // ছবির চারপাশ দিয়ে টেক্সট বাঁকানো।
৪৩৬. clip-path: polygon(...);      // কাস্টম শেপ তৈরি।
৪৩৭. mask-clip: content-box;       // ইমেজের মাস্কিং কন্ট্রোল।
৪৩৮. mix-blend-mode: overlay;      // ফটোশপ স্টাইল ব্লেন্ডিং।
৪৩৯. scroll-snap-stop: always;     // স্ক্রল করার সময় নির্দিষ্ট জায়গায় থামা।
৪৪০. prefers-reduced-motion: reduce; // এনিমেশন বন্ধ রাখার ইউজার সেটিংস।
*/

// ==========================================
// ⚡ ৪৪১-৪৬০: পারফরম্যান্স ও ব্রাউজার ইন্টারনালস
// ==========================================

// ৪৪১. fetchpriority="high" (ইমেজের প্রায়োরিটি বাড়ানো)
// ৪৪২. dns-prefetch (ডোমেইন আগে কানেক্ট রাখা)
// ৪৪৩. preconnect (হ্যান্ডশেক প্রসেস আগে করা)
// ৪৪৪. preload (জরুরি ফাইল আগে লোড করা)
// ৪৪৫. prefetch (পরবর্তী পেজের ডাটা আগে লোড করা)

// ৪৪৬. CompressionStream (ব্রাউজারেই ডাটা জিপ করা)
const gzip = new CompressionStream("gzip");

// ৪৪৭. DecompressionStream (জিপ ফাইল আনজিপ করা)

// ৪৪৮. OffscreenCanvas (ব্যাকগ্রাউন্ডে গ্রাফিক্স রেন্ডার করা)
// canvas.transferControlToOffscreen();

// ৪৪৯. WebAssembly.instantiate (C++/Rust কোড ব্রাউজারে চালানো)

// ৪৫০. navigator.scheduling.isInputPending (ইউজার ইনপুট পেন্ডিং কি না চেক)
if (navigator.scheduling?.isInputPending()) {
	/* yield back to UI */
}

// ৪৫১. requestIdleCallback (ব্রাউজার যখন অলস তখন কাজ করা)

// ৪৫২. Scheduler.postTask (টাস্ক প্রায়োরিটি সেট করা)
// scheduler.postTask(() => {}, { priority: 'background' });

// ৪৫৩. performance.mark('start') (কোডের স্পিড মাপা শুরু)
// ৪৫৪. performance.measure('total', 'start', 'end') (সময় মাপা)

// ৪৫৫. Beacon API (পেজ বন্ধ হলেও সার্ভারে ডাটা পাঠানো)
// navigator.sendBeacon('/log', data);

// ৪৫৬. ReportingObserver (ব্রাউজারের এরর রিপোর্ট পাওয়া)

// ৪৫৭. Self-Profiling API (লাইভ অ্যাপের প্রোফাইল করা)

// ৪৫৮. EyeDropper API (স্ক্রিন থেকে রঙ পিক করা)
// const color = await new EyeDropper().open();

// ৪৫৯. Screen Wake Lock API (স্ক্রিন অফ হওয়া বন্ধ করা)
// const lock = await navigator.wakeLock.request('screen');

// ৪৬০. Window Controls Overlay (ডেস্কটপ অ্যাপের টাইটেল বার কাস্টমাইজ)

// ==========================================
// 🛠 ৪৬১-৪৮০: ডোম (DOM) ও ইভেন্ট হ্যান্ডলিং হ্যাকস
// ==========================================

// ৪৬১. capture: true (বাবলিংয়ের আগে ইভেন্ট ধরা)
el.addEventListener("click", fn, { capture: true });

// ৪৬২. once: true (ইভেন্ট লিসেনার শুধু একবার রান করা)
el.addEventListener("click", fn, { once: true });

// ৪৬৩. passive: true (স্ক্রল পারফরম্যান্স বাড়ানো)

// ৪৬৪. EventTarget (কাস্টম ইভেন্ট সিস্টেম তৈরি)
const bus = new EventTarget();

// ৪৬৫. MutationObserver (DOM চেঞ্জ ট্র্যাক করা)
const mo = new MutationObserver((mutations) => console.log(mutations));

// ৪৬৬. ResizeObserver (এলিমেন্ট সাইজ চেঞ্জ ট্র্যাক করা)

// ৪৬৭. IntersectionObserver (ইমেজ লেজি লোডিং)

// ৪৬৮. ShadowRoot (closed mode) (সিএসএস ইনক্যাপসুলেট করা)
el.attachShadow({ mode: "closed" });

// ৪৬৯. CustomElements (নিজের ট্যাগ বানানো)
// customElements.define('my-btn', MyBtn);

// ৪৭০. delegated focus (কাস্টম কম্পোনেন্টে অটো ফোকাস)

// ৪৭১. slot (ওয়েব কম্পোনেন্টে কন্টেন্ট পাস করা)

// ৪৭২. CSSStyleSheet.replaceSync (JS দিয়ে CSS ফাইল এডিট)

// ৪৭৩. NodeIterator (DOM এর ভেতর টেক্সট ফিল্টার)

// ৪৭৪. TreeWalker (DOM এ দ্রুত যাতায়াত)

// ৪৭৫. createContextualFragment (স্ট্রিং টু ডোম ফ্র্যাগমেন্ট)

// ৪৭৬. Selection.addRange (কোড দিয়ে টেক্সট সিলেক্ট করা)

// ৪৭৭. scrollIntoView ({behavior: "smooth"})

// ৪৭৮. getBoundingClientRect (এলিমেন্টের সঠিক পজিশন)

// ৪৭৯. DocumentFragment (মেমোরিতে ডোম তৈরি)

// ৪৮০. hidden="until-found" (সার্চে পাওয়া গেলে কন্টেন্ট দেখানো)

// ==========================================
// 🌍 ৪৮১-৫০০: আধুনিক ওয়েব এপিআই ও সিকিউরিটি
// ==========================================

// ৪৮১. SRI (Integrity) (সিডিএন ফাইল হ্যাক চেক)
// ৪৮২. CSP (Content-Security-Policy সেট করা)
// ৪৮৩. Permissions-Policy (ক্যামেরা/মাইক লিমিট করা)
// ৪৮৪. Credential Management (সেভ করা পাসওয়ার্ড ব্যবহার)
// ৪৮৫. WebAuthn (ফিঙ্গারপ্রিন্ট বা ফেস আইডি দিয়ে লগইন)
// ৪৮৬. Payment Request API (ব্রাউজার পেমেন্ট গেটওয়ে)
// ৪৮৭. Web Share API (নেটিভ শেয়ার শিট ওপেন)
// ৪৮৮. Periodic Background Sync (ব্যাকগ্রাউন্ডে ডাটা আপডেট)
// ৪৮৯. Web Serial API (আরডুইনো বা হার্ডওয়্যারের সাথে কথা বলা)
// ৪৯০. WebHID (গেমিং কন্ট্রোলার ইনপুট নেওয়া)
// ৪৯১. VirtualKeyboard API (কিবোর্ড লেআউট ঠিক করা)
// ৪৯২. Storage Foundation API (ফাইল স্টোরেজ)
// ৪৯৩. Font Access API (লোকাল ফন্ট ব্যবহার)
// ৪৯৪. Sanitizer API (HTML ক্লিন করা)
// ৪৯৫. Trust Tokens (বট কি না চেক করা)
// ৪৯৬. Fenced Frames (সিকিউর অ্যাড ফ্রেম)
// ৪৯৭. Shared Storage API (প্রাইভেসি সেফ ডাটা শেয়ার)
// ৪৯৮. Client Hints (ব্রাউজার তথ্য পাওয়ার আধুনিক ওয়ে)
// ৪৯৯. Speculation Rules (ইউজার ক্লিক করার আগেই পেজ রেন্ডার)
// ৫০০. debugger; (কোড মাঝপথে থামিয়ে ডিবাগ করা)

console.log(
	"%c 🏆 ৫০০টি প্রো-হ্যাকস সম্পূর্ণ! শুভকামনা, রিয়াদ।",
	"color: #00ff00; font-size: 16px; font-weight: bold;"
);
