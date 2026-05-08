// ═══════════════════════════════════════════════
//  ADVANCED THROTTLE FUNCTION
// ═══════════════════════════════════════════════

function advancedThrottle(func, limit, options = {}) {
	let timer;
	let lastArgs;
	let lastThis;
	let result;
	let lastInvokeTime = 0;

	const {
		leading = true, // প্রথম call এ সাথে সাথে execute?
		trailing = true, // শেষ call এর পরে execute?
		onThrottle = null, // throttle হলে callback
		onInvoke = null, // execute হলে callback
	} = options;

	// ─── Execute the function ───────────────────
	function invokeFunc(time, args, thisArg) {
		lastInvokeTime = time;
		result = func.apply(thisArg, args);
		if (onInvoke) onInvoke(args);
		return result;
	}

	// ─── Timer expired (trailing edge) ──────────
	function timerExpired() {
		const time = Date.now();
		timer = undefined;

		if (trailing && lastArgs) {
			result = invokeFunc(time, lastArgs, lastThis);
			lastArgs = lastThis = undefined;
		}
	}

	// ─── Main throttled function ─────────────────
	function throttled(...args) {
		const time = Date.now();
		const timeSinceLast = time - lastInvokeTime;
		const isFirstCall = lastInvokeTime === 0;

		lastArgs = args;
		lastThis = this;

		// Leading edge — প্রথম call বা limit পার হলে
		if ((isFirstCall && leading) || timeSinceLast >= limit) {
			if (timer) {
				clearTimeout(timer);
				timer = undefined;
			}
			return invokeFunc(time, args, this);
		}

		// Throttled — skip করো
		if (onThrottle) onThrottle(args);

		// Trailing edge timer set করো
		if (!timer && trailing) {
			timer = setTimeout(timerExpired, limit - timeSinceLast);
		}

		return result;
	}

	// ─── Cancel ───────────────────────────────────
	throttled.cancel = function () {
		if (timer) clearTimeout(timer);
		lastInvokeTime = 0;
		timer = lastArgs = lastThis = undefined;
	};

	// ─── Flush ────────────────────────────────────
	throttled.flush = function () {
		if (timer && lastArgs) {
			clearTimeout(timer);
			timer = undefined;
			return invokeFunc(Date.now(), lastArgs, lastThis);
		}
		return result;
	};

	// ─── Pending check ────────────────────────────
	throttled.pending = function () {
		return timer !== undefined;
	};

	// ─── Reset ────────────────────────────────────
	throttled.reset = function () {
		clearTimeout(timer);
		lastInvokeTime = 0;
		timer = lastArgs = lastThis = undefined;
		console.log("Throttle reset!");
	};

	return throttled;
}

// ═══════════════════════════════════════════════
//  USAGE EXAMPLES
// ═══════════════════════════════════════════════

// ── 1. Basic Throttle ──────────────────────────
const basicThrottle = advancedThrottle((query) => {
	console.log("Basic Throttle:", query);
}, 500);

// ── 2. Leading Only ────────────────────────────
// শুধু প্রথম call fire হবে, শেষেরটা হবে না
const leadingOnly = advancedThrottle(
	(e) => {
		console.log("Leading only:", e.target.scrollTop);
	},
	300,
	{ leading: true, trailing: false }
);

window.addEventListener("scroll", leadingOnly);

// ── 3. Trailing Only ───────────────────────────
// প্রথম call skip, শুধু শেষের call fire হবে
const trailingOnly = advancedThrottle(
	(e) => {
		console.log("Trailing only:", e.target.scrollTop);
	},
	300,
	{ leading: false, trailing: true }
);

window.addEventListener("scroll", trailingOnly);

// ── 4. onThrottle Callback ─────────────────────
// throttle হলে জানাও
const withCallback = advancedThrottle(
	(query) => {
		console.log("Search:", query);
	},
	500,
	{
		onThrottle: (args) => console.log("⛔ Throttled:", args),
		onInvoke: (args) => console.log("✅ Invoked:", args),
	}
);

// ── 5. Cancel ──────────────────────────────────
// Component unmount হলে cancel করো
const cancelThrottle = advancedThrottle((query) => {
	console.log("Search:", query);
}, 500);

// cancel করো
cancelThrottle.cancel();
console.log("Cancelled!");

// ── 6. Flush ───────────────────────────────────
// Form submit হলে সাথে সাথে execute করো
const flushThrottle = advancedThrottle((query) => {
	console.log("Search:", query);
}, 500);

document.getElementById("searchForm")?.addEventListener("submit", () => {
	flushThrottle.flush();
	console.log("Flushed on submit!");
});

// ── 7. Pending Check ───────────────────────────
const pendingThrottle = advancedThrottle((query) => {
	console.log("Search:", query);
}, 500);

setInterval(() => {
	if (pendingThrottle.pending()) {
		console.log("Throttle pending...");
	}
}, 100);

// ── 8. AbortController (API cancel) ────────────
// পুরনো request বাতিল করে নতুন পাঠাও
let controller;

const abortThrottle = advancedThrottle(async (query) => {
	if (controller) controller.abort();
	controller = new AbortController();

	try {
		const res = await fetch(`/api/search?q=${query}`, {
			signal: controller.signal,
		});
		const data = await res.json();
		console.log("Results:", data);
	} catch (err) {
		if (err.name === "AbortError") {
			console.log("Request cancelled!");
		}
	}
}, 500);

// ── 9. Scroll + Throttle (Real Use Case) ───────
const handleScroll = advancedThrottle(() => {
	const scrollY = window.scrollY;
	const height = document.body.scrollHeight - window.innerHeight;
	const percent = Math.round((scrollY / height) * 100);

	console.log(`Scroll: ${percent}%`);

	// Bottom এ পৌঁছালে নতুন data load করো
	if (percent >= 90) {
		console.log("Load more data!");
	}
}, 200);

window.addEventListener("scroll", handleScroll);

// ── 10. Resize + Throttle (Real Use Case) ──────
const handleResize = advancedThrottle(() => {
	console.log(`Window: ${window.innerWidth}x${window.innerHeight}`);
}, 300);

window.addEventListener("resize", handleResize);

// ── 11. Search Input তে লাগাও ──────────────────
const input = document.getElementById("searchInput");

if (input) {
	const searchThrottle = advancedThrottle(
		(e) => {
			console.log("Throttled Search:", e.target.value);
		},
		500,
		{
			onThrottle: () => console.log("⛔ Too fast! Throttled."),
			onInvoke: () => console.log("✅ Search executed!"),
		}
	);

	input.addEventListener("input", searchThrottle);
}
