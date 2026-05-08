/**
 * 🏆 THE COMPLETE JAVASCRIPT EVOLUTION (ES2015 - ES2025)
 * Path: ~/Development/fullstack/master_reference.js (fu)
 * Purpose: Beginner to Advanced Learning & Mastery
 */

// ==========================================
// 👶 LEVEL 1: FOUNDATION (ES2015/ES6)
// ==========================================

// 1. Variables & Template Literals
const user = "Anik";
let experience = 2;
console.log(`Developer: ${user}, XP: ${experience} Years`);

// 2. Arrow Functions
const add = (a, b) => a + b;

// 3. Destructuring & Spread
const settings = { theme: "dark", lang: "JS" };
const { theme, lang } = settings; // Destructuring
const updatedSettings = { ...settings, theme: "light" }; // Spread

// 4. Classes & Static Blocks
class App {
	static {
		// ES2022 Static initialization block
		this.version = "1.0.0";
	}
}

// ==========================================
// 👨‍💻 LEVEL 2: INTERMEDIATE (ES2017 - ES2022)
// ==========================================

// 5. Async/Await (Advanced Data Fetching)
async function getApiData() {
	try {
		const response = await fetch("https://api.example.com/data");
		return await response.json();
	} catch (e) {
		throw new Error("Fetch failed", { cause: e }); // Error Cause (ES2022)
	}
}

// 6. Logical Assignments (Optimizing Logic)
let config = { timeout: 0, port: null };
config.port ??= 8080; // Nullish: Only if null/undefined (Result: 8080)
config.timeout ||= 5000; // OR: If falsy (Result: 5000, since 0 is falsy)
let isOnline = true;
isOnline &&= checkConnection();

// Scenario: User settings
let userTheme = null;
userTheme ??= "light"; // ✅ Sets to 'light' because it's null

let userVolume = 0; // User muted the audio
userVolume ??= 50; // ❌ Stays 0! (0 is not null/undefined)

console.log(userTheme); // "light"
console.log(userVolume); // 0 (user's choice preserved!)

// Scenario: Game settings
let playerName = "";
playerName ||= "Anonymous"; // ✅ Sets to "Anonymous" (empty string is falsy)

let maxScore = 0;
maxScore ||= 100; // ⚠️ Sets to 100! (0 is falsy - might not be what you want)

// Better use case:
let apiKey = localStorage.getItem("key"); // returns null if missing
apiKey ||= "default-dev-key"; // ✅ Sets only if missing/null/empty

// Scenario: Form validation
let errorMessage = "Invalid email";
errorMessage &&= "Please fix: " + errorMessage;
// ✅ Becomes "Please fix: Invalid email" (was truthy, so we modified it)

let successMessage = "";
successMessage &&= "Success: " + successMessage;
// ❌ Stays "" (falsy, so no modification)

// Practical use: Disabling a button
let isLoading = true;
isLoading &&= showSpinner(); // Runs showSpinner() only if already loading

// 7. Array.at() & Object.hasOwn()
const arr = [10, 20, 30];
console.log(arr.at(-1)); // 30 (Last element)
console.log(Object.hasOwn(settings, "theme")); // true

// ==========================================
// 🚀 LEVEL 3: ADVANCED (ES2023 - ES2024)
// ==========================================

// 8. Change Array by Copy (Immutable)
const scores = [50, 20, 90];
const sortedScores = scores.toSorted(); // Original thik thake
const updatedScores = scores.with(1, 100); // [50, 100, 90]

// 9. Object.groupBy
const inventory = [
	{ name: "Laptop", type: "tech" },
	{ name: "Apple", type: "food" },
	{ name: "Phone", type: "tech" },
];
const grouped = Object.groupBy(inventory, (i) => i.type);

// ==========================================
// 👑 LEVEL 4: THE CUTTING EDGE (ES2025 OFFICIAL)
// ==========================================

// 10. New Set Methods
const admins = new Set(["Anik", "Sami"]);
const editors = new Set(["Sami", "Nitu"]);

console.log(admins.intersection(editors)); // Set { "Sami" }
console.log(admins.difference(editors)); // Set { "Anik" }

// 11. Iterator Helpers
function* generator() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
}
const finalResult = generator()
	.filter((n) => n % 2 === 0)
	.map((n) => n * 10)
	.toArray(); // [20, 40]

// 12. Promise.try
Promise.try(() => {
	return "Safe wrapper for sync/async code";
}).then(console.log);

// 13. RegExp.escape
const userInput = "Hello? $100";
const safeRegex = new RegExp(RegExp.escape(userInput));

// ==========================================
// 🧪 LEVEL 5: EXPERIMENTAL (STAGE 1-3 PROPOSALS)
// ==========================================

/** * NOTE: Nicher code gulo browser-e error dite pare.
 * Egulo shudhu shikhonir jonno comment kora holo.
 */

// 14. Pipeline Operator (|>)
/*
const value = "  hello world  "
    |> (s => s.trim())
    |> (s => s.toUpperCase())
    |> (s => s + "!");
*/

// 15. Do Expressions
/*
let msg = do {
    if (age > 18) "Adult";
    else "Minor";
};
*/

// 16. Record & Tuple (Immutable Primitives)
/*
const myTuple = #[1, 2, 3];
const myRecord = #{ x: 1, y: 2 };
*/

// 17. Temporal API (Date Replacement)
/*
import { Temporal } from '@js-temporal/polyfill';
const today = Temporal.Now.plainDateISO();
*/

console.log("-----------------------------------------");
console.log("🔥 JAVASCRIPT MASTER FILE LOADED!");
console.log("Environment: 2026 Ready");
console.log("-----------------------------------------");
