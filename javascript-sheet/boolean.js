// ============================================
// JAVASCRIPT BOOLEAN - COMPLETE EXAMPLES
// ============================================

// 1. BOOLEAN BASIC - সত্যি বা মিথ্যা মান
let isSunny = true;
let isRaining = false;

console.log("আজ কি রোদ্দুর?", isSunny); // true
console.log("আজ কি বৃষ্টি হচ্ছে?", isRaining); // false

// 2. COMPARISON OPERATORS - তুলনা অপারেটর
let age = 25;
let hasLicense = true;

console.log("\n=== তুলনা অপারেটর ===");
console.log("বয়স ১৮ এর বেশি?", age > 18); // true
console.log("বয়স ৩০ এর কম?", age < 30); // true
console.log("বয়স ২৫ কি?", age === 25); // true
console.log("বয়স ২০ নয়?", age !== 20); // true
console.log("বয়স ১৮ বা বেশি?", age >= 18); // true
console.log("বয়স ২৫ বা কম?", age <= 25); // true

// 3. LOGICAL OPERATORS - যৌক্তিক অপারেটর
let hasMoney = true;
let hasTime = false;

console.log("\n=== যৌক্তিক অপারেটর ===");
// AND (&&) - দুটোই সত্যি হতে হবে
console.log("টাকা আছে এবং সময় আছে?", hasMoney && hasTime); // false

// OR (||) - যেকোনো একটি সত্যি হলেই চলবে
console.log("টাকা আছে অথবা সময় আছে?", hasMoney || hasTime); // true

// NOT (!) - উল্টো করে দেয়
console.log("টাকা নেই?", !hasMoney); // false

// 4. IF-ELSE STATEMENTS - শর্তাধীন বিবৃতি
console.log("\n=== শর্তাধীন বিবৃতি ===");

let temperature = 35;

if (temperature > 30) {
	console.log("আজ অনেক গরম!");
} else if (temperature > 20) {
	console.log("আজ আবহাওয়া ভালো।");
} else {
	console.log("আজ ঠান্ডা।");
}

// 5. TRUTHY & FALSY VALUES - সত্যি ও মিথ্যা মান
console.log("\n=== Truthy & Falsy মান ===");

// Falsy মান (false হিসেবে গণ্য হয়):
console.log(Boolean(0)); // false
console.log(Boolean("")); // false (খালি স্ট্রিং)
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(false)); // false

// Truthy মান (true হিসেবে গণ্য হয়):
console.log(Boolean(1)); // true
console.log(Boolean("hello")); // true (যেকোনো টেক্সট)
console.log(Boolean([])); // true (খালি অ্যারে)
console.log(Boolean({})); // true (খালি অবজেক্ট)
console.log(Boolean(-5)); // true (নেগেটিভ সংখ্যাও)

// 6. PRACTICAL EXAMPLE - বাস্তব উদাহরণ
console.log("\n=== বাস্তব উদাহরণ: লগইন সিস্টেম ===");

function checkLogin(username, password) {
	let isUsernameValid = username.length > 0;
	let isPasswordValid = password.length >= 6;
	let isAdmin = username === "admin";

	console.log(`ইউজারনেম: ${username}`);
	console.log(`পাসওয়ার্ড ভ্যালিড? ${isPasswordValid}`);
	console.log(`অ্যাডমিন কি? ${isAdmin}`);

	if (isUsernameValid && isPasswordValid) {
		if (isAdmin) {
			return "অ্যাডমিন হিসেবে লগইন সফল!";
		} else {
			return "ইউজার হিসেবে লগইন সফল!";
		}
	} else {
		return "লগইন ব্যর্থ! তথ্য যাচাই করুন।";
	}
}

console.log(checkLogin("admin", "123456"));
console.log(checkLogin("raju", "123"));
console.log(checkLogin("", "password123"));

// 7. TERNARY OPERATOR - সংক্ষিপ্ত শর্তাধীন অপারেটর
console.log("\n=== Ternary Operator ===");

let marks = 75;
let result = marks >= 40 ? "পাশ" : "ফেল";
console.log(`নম্বর: ${marks}, ফলাফল: ${result}`);

let isWeekend = true;
let activity = isWeekend ? "বন্ধুদের সাথে ঘুরতে যাওয়া" : "কাজে যাওয়া";
console.log(`আজকের পরিকল্পনা: ${activity}`);

// 8. BOOLEAN CONVERSION - অন্যান্য টাইপকে Boolean-এ রূপান্তর
console.log("\n=== Boolean রূপান্তর ===");

let userInput = "";
if (!userInput) {
	console.log("ইউজার কিছু লেখেনি");
}

let count = 0;
while (!count) {
	console.log("কাউন্ট শূন্য, লুপ বন্ধ");
	count = 1; // লুপ বন্ধ করতে
}

// Double NOT (!!) দিয়ে Boolean-এ রূপান্তর
console.log(!!"hello"); // true
console.log(!!0); // false
console.log(!!" "); // true (স্পেসও Truthy)

// 9. COMPLEX EXAMPLE - জটিল উদাহরণ
console.log("\n=== জটিল উদাহরণ: অনলাইন শপিং ===");

function canPurchase(itemInStock, userLoggedIn, userHasAddress, paymentValid) {
	// সব শর্ত পূরণ হতে হবে
	let canBuy = itemInStock && userLoggedIn && userHasAddress && paymentValid;

	// কি কি সমস্যা আছে তা দেখানো
	let issues = [];
	if (!itemInStock) issues.push("পণ্য স্টকে নেই");
	if (!userLoggedIn) issues.push("লগইন করুন");
	if (!userHasAddress) issues.push("ঠিকানা যোগ করুন");
	if (!paymentValid) issues.push("পেমেন্ট তথ্য ভুল");

	return {
		canBuy: canBuy,
		issues: issues,
		message: canBuy ? "অর্ডার করা যাবে!" : "সমস্যা: " + issues.join(", "),
	};
}

let order1 = canPurchase(true, true, true, true);
console.log(order1.message); // অর্ডার করা যাবে!

let order2 = canPurchase(true, false, true, false);
console.log(order2.message); // সমস্যা: লগইন করুন, পেমেন্ট তথ্য ভুল

// 10. SHORT-CIRCUIT EVALUATION - সংক্ষিপ্ত মূল্যায়ন
console.log("\n=== Short-Circuit Evaluation ===");

// && (AND) - প্রথমটি false হলে পরেরটি চেক হয় না
let user = null;
let userName = user && user.name; // user null হওয়ায় user.name চেক হয় না
console.log(userName); // null

// || (OR) - প্রথমটি true হলে পরেরটি চেক হয় না
let defaultName = "Guest";
let displayName = userName || defaultName;
console.log(displayName); // "Guest"

// ?? (Nullish Coalescing) - শুধু null বা undefined এর জন্য
let score = 0;
let finalScore = score ?? 100; // 0 falsy হলেও এটি নেয়
console.log(finalScore); // 0 (কারণ 0 null নয়)

//| অপারেটর | নাম              | ব্যবহার     | উদাহরণ                     |
//| ------- | ---------------- | ----------- | -------------------------- |
//| `===`   | Strict Equal     | সমান কিনা   | `5 === 5` → `true`         |
//| `!==`   | Strict Not Equal | সমান নয়    | `5 !== 3` → `true`         |
//| `>`     | Greater Than     | বড় কিনা    | `5 > 3` → `true`           |
//| `<`     | Less Than        | ছোট কিনা    | `3 < 5` → `true`           |
//| `&&`    | AND              | দুটোই সত্যি | `true && false` → `false`  |
//| `\|\|`  | OR               | একটি সত্যি  | `true \|\| false` → `true` |
//| `!`     | NOT              | উল্টো       | `!true` → `false`          |
