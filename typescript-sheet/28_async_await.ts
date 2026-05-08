// ═══════════════════════════════════════════════════════════════
// 28_async_await.ts — Async/Await & Promises in TypeScript
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Basic Promise
// ═══════════════════════════════════════

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchData(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const success = Math.random() > 0.3;
			if (success) {
				resolve("Data loaded successfully");
			} else {
				reject(new Error("Failed to load data"));
			}
		}, 1000);
	});
}

// ═══════════════════════════════════════
// Async/Await Basics
// ═══════════════════════════════════════

async function loadUserData(): Promise<void> {
	console.log("Loading...");
	await delay(1000);
	console.log("Loaded!");
}

async function getUser(): Promise<{ id: number; name: string }> {
	await delay(500);
	return { id: 1, name: "Rahim" };
}

// ═══════════════════════════════════════
// Error Handling
// ═══════════════════════════════════════

async function safeFetch(): Promise<string> {
	try {
		const data = await fetchData();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error:", error.message);
			return "Fallback data";
		}
		throw error;
	}
}

// ═══════════════════════════════════════
// Promise.all — Parallel Execution
// ═══════════════════════════════════════

interface User {
	id: number;
	name: string;
}

interface Post {
	id: number;
	title: string;
	userId: number;
}

interface Comment {
	id: number;
	body: string;
	postId: number;
}

async function fetchUser(userId: number): Promise<User> {
	await delay(300);
	return { id: userId, name: `User ${userId}` };
}

async function fetchPosts(userId: number): Promise<Post[]> {
	await delay(400);
	return [
		{ id: 1, title: "Post 1", userId },
		{ id: 2, title: "Post 2", userId },
	];
}

async function fetchComments(postId: number): Promise<Comment[]> {
	await delay(200);
	return [
		{ id: 1, body: "Great post!", postId },
		{ id: 2, body: "Thanks!", postId },
	];
}

// Parallel fetching
async function loadDashboard(userId: number): Promise<void> {
	const [user, posts] = await Promise.all([
		fetchUser(userId),
		fetchPosts(userId),
	]);

	console.log("User:", user);
	console.log("Posts:", posts);
}

// ═══════════════════════════════════════
// Promise.allSettled — All results
// ═══════════════════════════════════════

async function fetchMultiple(): Promise<void> {
	const results = await Promise.allSettled([
		fetchUser(1),
		fetchUser(2),
		fetchUser(999), // Might fail
	]);

	results.forEach((result, index) => {
		if (result.status === "fulfilled") {
			console.log(`User ${index + 1}:`, result.value);
		} else {
			console.error(`User ${index + 1} failed:`, result.reason);
		}
	});
}

// ═══════════════════════════════════════
// Promise.race — First to complete
// ═══════════════════════════════════════

async function fetchWithTimeout<T>(
	promise: Promise<T>,
	timeoutMs: number
): Promise<T> {
	const timeoutPromise = new Promise<never>((_, reject) => {
		setTimeout(() => reject(new Error("Timeout")), timeoutMs);
	});

	return Promise.race([promise, timeoutPromise]);
}

// Usage
async function testTimeout(): Promise<void> {
	try {
		const user = await fetchWithTimeout(fetchUser(1), 500);
		console.log("User:", user);
	} catch (error) {
		console.error("Timed out or failed");
	}
}

// ═══════════════════════════════════════
// Sequential vs Parallel
// ═══════════════════════════════════════

// Sequential (slow)
async function loadSequential(): Promise<void> {
	const user = await fetchUser(1);
	const posts = await fetchPosts(user.id);
	const comments = await fetchComments(posts[0].id);
	console.log("Sequential:", { user, posts, comments });
}

// Parallel (fast)
async function loadParallel(): Promise<void> {
	const userPromise = fetchUser(1);
	const postsPromise = fetchPosts(1);

	const [user, posts] = await Promise.all([userPromise, postsPromise]);
	const comments = await fetchComments(posts[0].id);

	console.log("Parallel:", { user, posts, comments });
}

// ═══════════════════════════════════════
// Async Iterator
// ═══════════════════════════════════════

async function* generateNumbers(count: number): AsyncGenerator<number> {
	for (let i = 1; i <= count; i++) {
		await delay(100);
		yield i;
	}
}

async function consumeAsyncIterator(): Promise<void> {
	for await (const num of generateNumbers(5)) {
		console.log("Generated:", num);
	}
}

// ═══════════════════════════════════════
// Retry Logic with TypeScript
// ═══════════════════════════════════════

async function withRetry<T>(
	fn: () => Promise<T>,
	maxRetries: number = 3,
	delayMs: number = 1000
): Promise<T> {
	let lastError: Error;

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error));
			console.log(`Attempt ${attempt} failed: ${lastError.message}`);

			if (attempt < maxRetries) {
				await delay(delayMs * attempt);
			}
		}
	}

	throw lastError!;
}

// Usage
async function testRetry(): Promise<void> {
	let attempts = 0;
	const unreliableFn = async (): Promise<string> => {
		attempts++;
		if (attempts < 3) {
			throw new Error("Temporary failure");
		}
		return "Success!";
	};

	try {
		const result = await withRetry(unreliableFn, 5);
		console.log("Result:", result);
	} catch (error) {
		console.error("All retries failed");
	}
}

// ═══════════════════════════════════════
// Debounce with Async
// ═══════════════════════════════════════

function debounce<T extends (...args: any[]) => Promise<any>>(
	fn: T,
	wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>): Promise<ReturnType<T>> => {
		return new Promise((resolve) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(async () => {
				const result = await fn(...args);
				resolve(result);
			}, wait);
		});
	};
}

// ═══════════════════════════════════════
// Async Queue
// ═══════════════════════════════════════

class AsyncQueue<T> {
	private queue: T[] = [];
	private resolvers: Array<(value: T) => void> = [];

	enqueue(item: T): void {
		if (this.resolvers.length > 0) {
			const resolve = this.resolvers.shift()!;
			resolve(item);
		} else {
			this.queue.push(item);
		}
	}

	async dequeue(): Promise<T> {
		if (this.queue.length > 0) {
			return this.queue.shift()!;
		}
		return new Promise<T>((resolve) => {
			this.resolvers.push(resolve);
		});
	}

	get size(): number {
		return this.queue.length;
	}
}

// Usage
async function testQueue(): Promise<void> {
	const queue = new AsyncQueue<string>();

	// Consumer
	const consumer = async (): Promise<void> => {
		while (true) {
			const item = await queue.dequeue();
			console.log("Consumed:", item);
			if (item === "done") break;
		}
	};

	// Producer
	const producer = async (): Promise<void> => {
		await delay(100);
		queue.enqueue("item1");
		await delay(100);
		queue.enqueue("item2");
		await delay(100);
		queue.enqueue("done");
	};

	await Promise.all([consumer(), producer()]);
}

// ═══════════════════════════════════════
// Promise Pool (Limited concurrency)
// ═══════════════════════════════════════

async function promisePool<T, R>(
	items: T[],
	concurrency: number,
	fn: (item: T) => Promise<R>
): Promise<R[]> {
	const results: R[] = new Array(items.length);
	const executing: Promise<void>[] = [];

	for (let i = 0; i < items.length; i++) {
		const promise = fn(items[i]).then((result) => {
			results[i] = result;
		});

		executing.push(promise);

		if (executing.length >= concurrency) {
			await Promise.race(executing);
			executing.splice(
				executing.findIndex((p) => p === promise),
				1
			);
		}
	}

	await Promise.all(executing);
	return results;
}

// Usage
async function testPool(): Promise<void> {
	const urls = ["/api/1", "/api/2", "/api/3", "/api/4", "/api/5"];

	const fetchUrl = async (url: string): Promise<string> => {
		await delay(200);
		return `Data from ${url}`;
	};

	const results = await promisePool(urls, 2, fetchUrl);
	console.log("Pool results:", results);
}

// ═══════════════════════════════════════
// Run examples
// ═══════════════════════════════════════

async function runAll(): Promise<void> {
	console.log("=== Async/Await Examples ===\n");

	await loadUserData();
	await loadDashboard(1);
	await fetchMultiple();
	await testTimeout();
	await consumeAsyncIterator();
	await testRetry();
	await testQueue();
	await testPool();
}

runAll().catch(console.error);

export {};
