// ═══════════════════════════════════════════════
//  ADVANCED DEBOUNCE FUNCTION
// ═══════════════════════════════════════════════

function advancedDebounce(func, delay, options = {}) {
	let timer;
	let lastArgs;
	let lastThis;
	let result;

	const {
		leading = false, // প্রথম call এ সাথে সাথে execute করবে?
		trailing = true, // শেষ call এর পরে execute করবে?
		maxWait = null, // সর্বোচ্চ কতক্ষণ অপেক্ষা করবে?
		onCancel = null, // cancel হলে callback
	} = options;

	let lastInvokeTime = 0;
	let lastCallTime = null;

	// ─── Execute the function ───────────────────
	function invokeFunc(time) {
		const args = lastArgs;
		const thisArg = lastThis;

		lastArgs = lastThis = undefined;
		lastInvokeTime = time;
		result = func.apply(thisArg, args);
		return result;
	}

	// ─── Should invoke on leading edge? ─────────
	function leadingEdge(time) {
		lastInvokeTime = time;
		timer = setTimeout(timerExpired, delay);
		return leading ? invokeFunc(time) : result;
	}

	// ─── Remaining wait time ─────────────────────
	function remainingWait(time) {
		const timeSinceLastCall = time - lastCallTime;
		const timeSinceLastInvoke = time - lastInvokeTime;
		const timeWaiting = delay - timeSinceLastCall;

		return maxWait !== null ?
				Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
			:	timeWaiting;
	}

	// ─── Should invoke? ───────────────────────────
	function shouldInvoke(time) {
		const timeSinceLastCall = time - lastCallTime;
		const timeSinceLastInvoke = time - lastInvokeTime;

		return (
			lastCallTime === null ||
			timeSinceLastCall >= delay ||
			timeSinceLastCall < 0 ||
			(maxWait !== null && timeSinceLastInvoke >= maxWait)
		);
	}

	// ─── Timer expired ────────────────────────────
	function timerExpired() {
		const time = Date.now();

		if (shouldInvoke(time)) {
			return trailingEdge(time);
		}

		// Restart timer for remaining wait
		timer = setTimeout(timerExpired, remainingWait(time));
	}

	// ─── Trailing edge execution ──────────────────
	function trailingEdge(time) {
		timer = undefined;

		if (trailing && lastArgs) {
			return invokeFunc(time);
		}

		lastArgs = lastThis = undefined;
		return result;
	}

	// ─── Cancel ───────────────────────────────────
	function cancel() {
		if (timer !== undefined) {
			clearTimeout(timer);
		}
		lastInvokeTime = 0;
		lastArgs = lastCallTime = lastThis = timer = undefined;

		if (onCancel) onCancel(); // callback fire করো
	}

	// ─── Flush (সাথে সাথে execute) ───────────────
	function flush() {
		return timer === undefined ? result : trailingEdge(Date.now());
	}

	// ─── Pending check ────────────────────────────
	function pending() {
		return timer !== undefined;
	}

	// ─── Main debounced function ──────────────────
	function debounced(...args) {
		const time = Date.now();
		const isInvoking = shouldInvoke(time);

		lastArgs = args;
		lastThis = this;
		lastCallTime = time;

		if (isInvoking) {
			if (timer === undefined) {
				return leadingEdge(lastCallTime);
			}
			if (maxWait !== null) {
				clearTimeout(timer);
				timer = setTimeout(timerExpired, delay);
				return invokeFunc(lastCallTime);
			}
		}

		if (timer === undefined) {
			timer = setTimeout(timerExpired, delay);
		}

		return result;
	}

	// Extra methods attach করো
	debounced.cancel = cancel;
	debounced.flush = flush;
	debounced.pending = pending;

	return debounced;
}

// ═══════════════════════════════════════════════
//  USAGE EXAMPLES
// ═══════════════════════════════════════════════

// ── 1. Basic (simple debounce) ─────────────────
const basicSearch = advancedDebounce((query) => {
	console.log("Basic Search:", query);
}, 500);

// ── 2. Leading Edge ────────────────────────────
// প্রথম keystroke এ সাথে সাথে call হবে
const leadingSearch = advancedDebounce(
	(query) => {
		console.log("Leading Search:", query);
	},
	500,
	{ leading: true, trailing: false }
);

// ── 3. MaxWait ─────────────────────────────────
// user যতক্ষণ type করুক, 2000ms পরে force call
const maxWaitSearch = advancedDebounce(
	(query) => {
		console.log("MaxWait Search:", query);
	},
	500,
	{ maxWait: 2000 }
);

// ── 4. Cancel ──────────────────────────────────
// Component unmount হলে pending call বাতিল করো
const cancelSearch = advancedDebounce(
	(query) => {
		console.log("Cancel Search:", query);
	},
	500,
	{
		onCancel: () => console.log("Search cancelled!"),
	}
);

// cancel করো
cancelSearch.cancel();

// ── 5. Flush ───────────────────────────────────
// Form submit হলে সাথে সাথে execute করো
const flushSearch = advancedDebounce((query) => {
	console.log("Flush Search:", query);
}, 500);

document.getElementById("searchForm")?.addEventListener("submit", () => {
	flushSearch.flush(); // pending call সাথে সাথে fire করো
});

// ── 6. Pending check ───────────────────────────
setInterval(() => {
	if (basicSearch.pending()) {
		console.log("Search is pending...");
	}
}, 100);

// ── 7. AbortController (API cancel) ────────────
// পুরনো API request বাতিল করে নতুন request পাঠাও
let controller;

const abortSearch = advancedDebounce(async (query) => {
	if (controller) controller.abort(); // পুরনো request বাতিল
	controller = new AbortController();

	try {
		const res = await fetch(`/api/search?q=${query}`, {
			signal: controller.signal,
		});
		const data = await res.json();
		console.log("Results:", data);
	} catch (err) {
		if (err.name === "AbortError") {
			console.log("Request cancelled");
		}
	}
}, 500);

// ── 8. Search Input তে লাগাও ───────────────────
const input = document.getElementById("searchInput");

if (input) {
	input.addEventListener("input", (e) => {
		maxWaitSearch(e.target.value);
	});
}
