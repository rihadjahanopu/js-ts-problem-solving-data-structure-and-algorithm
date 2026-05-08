// ==========================================
// 🔢 ADVANCED MATH & NUMBER UTILITIES
// ==========================================

// নির্দিষ্ট রেঞ্জে রাউন্ড করা (উদাহরণ: 0.5 এর মাল্টিপলে)
const roundToNearest = (num, nearest = 1) => {
	return Math.round(num / nearest) * nearest;
};
console.log(roundToNearest(23, 5)); // 25
console.log(roundToNearest(23, 10)); // 20

// সংখ্যাকে K, M, B ফরম্যাটে (সোশ্যাল মিডিয়ার মতো)
const formatNumber = (num) => {
	if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
	if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
	if (num >= 1000) return (num / 1000).toFixed(1) + "K";
	return num.toString();
};
console.log(formatNumber(1500000)); // "1.5M"
console.log(formatNumber(2500)); // "2.5K"

// সংখ্যাকে বাংলা ডিজিটে কনভার্ট
const toBanglaNumber = (num) => {
	const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
	return num.toString().replace(/[0-9]/g, (w) => banglaDigits[+w]);
};
console.log(toBanglaNumber(12345)); // "১২৩৪৫"

// র‍্যান্ডম সংখ্যা নির্দিষ্ট দৈর্ঘ্যের (OTP এর জন্য)
const generateOTP = (length = 6) => {
	return Math.floor(Math.random() * Math.pow(10, length))
		.toString()
		.padStart(length, "0");
};
console.log(generateOTP()); // "384729"
console.log(generateOTP(4)); // "7293"

// ==========================================
// 📅 DATE & TIME UTILITIES
// ==========================================

// বর্তমান সময় বাংলায়
const getBanglaDate = () => {
	const days = [
		"রবিবার",
		"সোমবার",
		"মঙ্গলবার",
		"বুধবার",
		"বৃহস্পতিবার",
		"শুক্রবার",
		"শনিবার",
	];
	const months = [
		"জানুয়ারি",
		"ফেব্রুয়ারি",
		"মার্চ",
		"এপ্রিল",
		"মে",
		"জুন",
		"জুলাই",
		"আগস্ট",
		"সেপ্টেম্বর",
		"অক্টোবর",
		"নভেম্বর",
		"ডিসেম্বর",
	];
	const date = new Date();
	return `${days[date.getDay()]}, ${toBanglaNumber(date.getDate())} ${months[date.getMonth()]} ${toBanglaNumber(date.getFullYear())}`;
};
console.log(getBanglaDate()); // "রবিবার, ২ ফেব্রুয়ারি ২০২৫"

// সময়কে "২ মিনিট আগে" এই ফরম্যাটে
const timeAgo = (date) => {
	const seconds = Math.floor((new Date() - new Date(date)) / 1000);
	const intervals = {
		বছর: 31536000,
		মাস: 2592000,
		সপ্তাহ: 604800,
		দিন: 86400,
		ঘণ্টা: 3600,
		মিনিট: 60,
		সেকেন্ড: 1,
	};
	for (const [unit, secondsInUnit] of Object.entries(intervals)) {
		const interval = Math.floor(seconds / secondsInUnit);
		if (interval >= 1) return `${interval} ${unit} আগে`;
	}
	return "এখনই";
};
console.log(timeAgo(new Date(Date.now() - 120000))); // "2 মিনিট আগে"

// কাউন্টডাউন টাইমার
const getCountdown = (targetDate) => {
	const diff = new Date(targetDate) - new Date();
	if (diff <= 0) return "সময় শেষ!";
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	return `${days}দিন ${hours}ঘণ্টা ${minutes}মিনিট`;
};
console.log(getCountdown("2025-12-31")); // "৩৩২দিন ১৫ঘণ্টা ৪৫মিনিট"

// ==========================================
// 📝 STRING UTILITIES
// ==========================================

// টেক্সটকে স্লাগ বানানো (URL friendly)
const slugify = (text) => {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-");
};
console.log(slugify("Hello World! This is JS")); // "hello-world-this-is-js"

// প্রথম অক্ষর বড় করা (Title Case)
const toTitleCase = (str) => {
	return str.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	);
};
console.log(toTitleCase("hello world")); // "Hello World"

// টেক্সট কাটা (Read more... এর জন্য)
const truncateText = (text, maxLength = 100, suffix = "...") => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + suffix;
};
console.log(
	truncateText("This is a very long text that needs to be truncated", 20)
);
// "This is a very long..."

// ইমেইল ভ্যালিডেশন
const isValidEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};
console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("invalid.email")); // false

// ফোন নম্বর ভ্যালিডেশন (বাংলাদেশ)
const isValidBDPhone = (phone) => {
	const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
	return regex.test(phone);
};
console.log(isValidBDPhone("01712345678")); // true
console.log(isValidBDPhone("0191234567")); // false

// ==========================================
// 🗂️ ARRAY & OBJECT UTILITIES
// ==========================================

// অ্যারেকে গ্রুপ করা (SQL GROUP BY এর মতো)
const groupBy = (array, key) => {
	return array.reduce((result, item) => {
		const group = item[key];
		result[group] = result[group] || [];
		result[group].push(item);
		return result;
	}, {});
};
const users = [
	{ name: "রাহিম", dept: "IT" },
	{ name: "করিম", dept: "HR" },
	{ name: "জলিল", dept: "IT" },
];
console.log(groupBy(users, "dept"));
// { IT: [{...}, {...}], HR: [{...}] }

// অবজেক্ট থেকে নির্দিষ্ট কী বাদ দেওয়া
const omit = (obj, keys) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([key]) => !keys.includes(key))
	);
};
const user = { name: "আলী", password: "secret123", email: "ali@test.com" };
console.log(omit(user, ["password"]));
// { name: 'আলী', email: 'ali@test.com' }

// অবজেক্ট থেকে শুধু নির্দিষ্ট কী নেওয়া
const pick = (obj, keys) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([key]) => keys.includes(key))
	);
};
console.log(pick(user, ["name", "email"]));
// { name: 'আলী', email: 'ali@test.com' }

// ডুপ্লিকেট রিমুভ করা (অ্যাডভান্সড)
const uniqueBy = (array, key) => {
	const seen = new Set();
	return array.filter((item) => {
		const val = item[key];
		if (seen.has(val)) return false;
		seen.add(val);
		return true;
	});
};
const products = [
	{ id: 1, name: "A" },
	{ id: 2, name: "B" },
	{ id: 1, name: "C" },
];
console.log(uniqueBy(products, "id")); // [{id:1, name:'A'}, {id:2, name:'B'}]

// অ্যারেকে চাংকে ভাগ করা (Pagination এর জন্য)
const chunk = (array, size) => {
	return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
		array.slice(i * size, i * size + size)
	);
};
console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3)); // [[1,2,3], [4,5,6], [7]]

// ==========================================
// 💾 LOCAL STORAGE UTILITIES
// ==========================================

// LocalStorage wrapper with expiry
const storage = {
	set: (key, value, ttlMinutes = null) => {
		const item = {
			value,
			expiry: ttlMinutes ? Date.now() + ttlMinutes * 60000 : null,
		};
		localStorage.setItem(key, JSON.stringify(item));
	},
	get: (key) => {
		const item = JSON.parse(localStorage.getItem(key));
		if (!item) return null;
		if (item.expiry && Date.now() > item.expiry) {
			localStorage.removeItem(key);
			return null;
		}
		return item.value;
	},
	remove: (key) => localStorage.removeItem(key),
};

// ব্যবহার:
// storage.set('user', {name: 'রাহিম'}, 30); // 30 মিনিট পর এক্সপায়ার
// console.log(storage.get('user'));

// ==========================================
// 🌐 API & NETWORK UTILITIES
// ==========================================

// ডিবাউন্স ফাংশন (সার্চ বক্সের জন্য)
const debounce = (func, wait) => {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};
// ব্যবহার: searchInput.addEventListener('input', debounce(handleSearch, 500));

// থ্রটল ফাংশন (স্ক্রল ইভেন্টের জন্য)
const throttle = (func, limit) => {
	let inThrottle;
	return function (...args) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};

// ফেচ রিট্রাই লজিক (API ফেইল হলে আবার চেষ্টা)
const fetchWithRetry = async (url, options = {}, maxRetries = 3) => {
	for (let i = 0; i < maxRetries; i++) {
		try {
			const response = await fetch(url, options);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			return await response.json();
		} catch (error) {
			if (i === maxRetries - 1) throw error;
			await new Promise((r) => setTimeout(r, 1000 * (i + 1))); // এক্সপোনেনশিয়াল ব্যাকঅফ
		}
	}
};

// ==========================================
// 🔒 SECURITY UTILITIES
// ==========================================

// সাধারণ পাসওয়ার্ড স্ট্রেন্থ চেকার
const checkPasswordStrength = (password) => {
	let score = 0;
	if (password.length >= 8) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;

	const levels = ["দুর্বল", "মাঝারি", "ভালো", "শক্তিশালী"];
	return {
		score,
		level: levels[score] || "দুর্বল",
		isStrong: score >= 3,
	};
};
console.log(checkPasswordStrength("Hello123!"));
// { score: 4, level: 'শক্তিশালী', isStrong: true }

// ==========================================
// 💰 FINANCIAL UTILITIES
// ==========================================

// EMI ক্যালকুলেটর (Equated Monthly Installment)
const calculateEMI = (principal, annualRate, months) => {
	const monthlyRate = annualRate / 12 / 100;
	const emi =
		(principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
		(Math.pow(1 + monthlyRate, months) - 1);
	return {
		emi: Math.round(emi),
		totalPayment: Math.round(emi * months),
		totalInterest: Math.round(emi * months - principal),
	};
};
console.log(calculateEMI(100000, 10, 12));
// { emi: 8792, totalPayment: 105504, totalInterest: 5504 }

// মূল্য কর (VAT) সহ ক্যালকুলেশন
const calculateWithVAT = (amount, vatRate = 15) => {
	const vat = (amount * vatRate) / 100;
	return {
		baseAmount: amount,
		vatAmount: vat,
		totalAmount: amount + vat,
	};
};

// ==========================================
// 🎨 DOM & UI UTILITIES
// ==========================================

// এলিমেন্ট কপি করা (Clipboard)
const copyToClipboard = async (text) => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		// Fallback
		const textarea = document.createElement("textarea");
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		return true;
	}
};

// স্ক্রল টু টপ স্মুথলি
const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
};

// এলিমেন্ট ভিউপোর্টে আছে কিনা চেক
const isInViewport = (element) => {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

// ==========================================
// 🔧 GENERAL UTILITIES
// ==========================================

// ডিপ ক্লোন (Nested object/array কপি)
const deepClone = (obj) => {
	if (obj === null || typeof obj !== "object") return obj;
	if (obj instanceof Date) return new Date(obj);
	if (obj instanceof Array) return obj.map((item) => deepClone(item));
	if (obj instanceof Object) {
		return Object.fromEntries(
			Object.entries(obj).map(([key, val]) => [key, deepClone(val)])
		);
	}
	throw new Error("Unable to copy object");
};

// কোয়েরি স্ট্রিং থেকে অবজেক্ট বানানো
const parseQueryString = (url) => {
	const params = new URLSearchParams(new URL(url).search);
	return Object.fromEntries(params.entries());
};
console.log(parseQueryString("https://example.com?name=John&age=30"));
// { name: "John", age: "30" }

// অবজেক্ট থেকে কোয়েরি স্ট্রিং বানানো
const toQueryString = (obj) => {
	return Object.entries(obj)
		.map(
			([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
		)
		.join("&");
};
console.log(toQueryString({ name: "John Doe", age: 30 }));
// "name=John%20Doe&age=30"

// এক্সপোর্ট করা যাতে অন্য ফাইলে ইমপোর্ট করা যায়
// module.exports = { debounce, throttle, formatNumber, ... };
// export { debounce, throttle, formatNumber, slugify, ... };
export {
	calculateEMI,
	calculateWithVAT,
	checkPasswordStrength,
	chunk,
	copyToClipboard,
	debounce,
	deepClone,
	fetchWithRetry,
	formatNumber,
	generateOTP,
	getBanglaDate,
	getCountdown,
	groupBy,
	isInViewport,
	isValidBDPhone,
	isValidEmail,
	omit,
	parseQueryString,
	pick,
	roundToNearest,
	scrollToTop,
	slugify,
	storage,
	throttle,
	timeAgo,
	toBanglaNumber,
	toQueryString,
	toTitleCase,
	truncateText,
	uniqueBy,
};
