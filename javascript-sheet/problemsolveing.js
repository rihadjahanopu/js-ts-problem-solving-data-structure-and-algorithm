// ============================================
// GOOGLE INTERVIEW PROBLEMS
// ============================================

// 1. Word Abbreviation
function shortenWords(words) {
	const map = new Map();
	function getAbbr(word, k) {
		if (word.length <= 2) return word;
		return word[0] + (word.length - 2 - k + 1) + word[word.length - 1];
	}
	return words.map((word) => {
		let prefix = 1;
		let abbr = getAbbr(word, prefix);
		while (map.has(abbr) && map.get(abbr) !== word) {
			prefix++;
			abbr =
				word.substring(0, prefix) +
				(word.length - prefix - 1) +
				word[word.length - 1];
		}
		map.set(abbr, word);
		return abbr;
	});
}

// 2. Rotate Array Around Target
function rotateArray(arr, target) {
	const index = arr.indexOf(target);
	if (index === -1) return arr;
	return [...arr.slice(index), ...arr.slice(0, index)];
}

// 3. N-ary Tree / Organization Hierarchy
class TreeNode {
	constructor(value) {
		this.value = value;
		this.children = [];
	}
}
function buildHierarchy(employees) {
	const map = new Map();
	let root = null;
	for (const [emp, manager] of employees) {
		if (!map.has(emp)) map.set(emp, new TreeNode(emp));
		if (manager && !map.has(manager)) map.set(manager, new TreeNode(manager));
	}
	for (const [emp, manager] of employees) {
		if (manager === null) {
			root = map.get(emp);
		} else {
			map.get(manager).children.push(map.get(emp));
		}
	}
	return root;
}

// ============================================
// FACEBOOK (META) INTERVIEW PROBLEMS
// ============================================

// 1. Nested Array Sum with Depth Multiplier
function nestedArraySum(arr, depth = 1) {
	let sum = 0;
	for (const item of arr) {
		if (Array.isArray(item)) {
			sum += nestedArraySum(item, depth + 1);
		} else {
			sum += item;
		}
	}
	return sum * depth;
}

// 2. Remove Minimum Parentheses to Make Valid
function minRemoveToMakeValid(s) {
	const arr = s.split("");
	const stack = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === "(") {
			stack.push(i);
		} else if (arr[i] === ")") {
			if (stack.length > 0) {
				stack.pop();
			} else {
				arr[i] = "";
			}
		}
	}
	while (stack.length > 0) {
		arr[stack.pop()] = "";
	}
	return arr.join("");
}

// 3. Longest Monotonic Subsequence
function longestMonotonicSubsequence(arr) {
	if (arr.length === 0) return 0;
	const inc = new Array(arr.length).fill(1);
	const dec = new Array(arr.length).fill(1);
	for (let i = 1; i < arr.length; i++) {
		for (let j = 0; j < i; j++) {
			if (arr[i] > arr[j]) {
				inc[i] = Math.max(inc[i], inc[j] + 1);
			} else if (arr[i] < arr[j]) {
				dec[i] = Math.max(dec[i], dec[j] + 1);
			}
		}
	}
	return Math.max(...inc, ...dec);
}

// 4. Event Emitter Implementation
class EventEmitter {
	constructor() {
		this.events = {};
	}
	on(event, callback) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(callback);
		return () => this.off(event, callback);
	}
	off(event, callback) {
		if (!this.events[event]) return;
		this.events[event] = this.events[event].filter((cb) => cb !== callback);
	}
	emit(event, ...args) {
		if (!this.events[event]) return;
		this.events[event].forEach((callback) => callback(...args));
	}
	once(event, callback) {
		const onceCallback = (...args) => {
			callback(...args);
			this.off(event, onceCallback);
		};
		this.on(event, onceCallback);
	}
}

// ============================================
// AMAZON INTERVIEW PROBLEMS
// ============================================

// 1. Second Largest Number
function secondLargest(arr) {
	if (arr.length < 2) return null;
	let first = -Infinity,
		second = -Infinity;
	for (const num of arr) {
		if (num > first) {
			second = first;
			first = num;
		} else if (num > second && num !== first) {
			second = num;
		}
	}
	return second === -Infinity ? null : second;
}

// 2. Transitive Link Between Pages (Graph BFS)
function hasTransitiveLink(logs, start, end) {
	const graph = new Map();
	for (const [from, to] of logs) {
		if (!graph.has(from)) graph.set(from, new Set());
		graph.get(from).add(to);
	}
	const visited = new Set();
	const queue = [start];
	while (queue.length > 0) {
		const current = queue.shift();
		if (current === end) return true;
		if (visited.has(current)) continue;
		visited.add(current);
		const neighbors = graph.get(current) || [];
		for (const neighbor of neighbors) {
			if (!visited.has(neighbor)) {
				queue.push(neighbor);
			}
		}
	}
	return false;
}

// 3. Maximum Width of Binary Tree
function maxWidth(root) {
	if (!root) return 0;
	const queue = [[root, 0]];
	let maxWidth = 0;
	while (queue.length > 0) {
		const levelSize = queue.length;
		const levelStart = queue[0][1];
		let levelEnd = levelStart;
		for (let i = 0; i < levelSize; i++) {
			const [node, index] = queue.shift();
			levelEnd = index;
			if (node.left) queue.push([node.left, 2 * index]);
			if (node.right) queue.push([node.right, 2 * index + 1]);
		}
		maxWidth = Math.max(maxWidth, levelEnd - levelStart + 1);
	}
	return maxWidth;
}

// 4. Tic-Tac-Toe Game
class TicTacToe {
	constructor(n) {
		this.n = n;
		this.rows = new Array(n).fill(0);
		this.cols = new Array(n).fill(0);
		this.diag = 0;
		this.antiDiag = 0;
	}
	move(row, col, player) {
		const toAdd = player === 1 ? 1 : -1;
		this.rows[row] += toAdd;
		this.cols[col] += toAdd;
		if (row === col) this.diag += toAdd;
		if (row + col === this.n - 1) this.antiDiag += toAdd;
		if (
			Math.abs(this.rows[row]) === this.n ||
			Math.abs(this.cols[col]) === this.n ||
			Math.abs(this.diag) === this.n ||
			Math.abs(this.antiDiag) === this.n
		) {
			return player;
		}
		return 0;
	}
}

// ============================================
// PAYPAL INTERVIEW PROBLEMS
// ============================================

// 1. Loyal Customers from Log Files
function findLoyalCustomers(day1Logs, day2Logs) {
	const day1Map = new Map();
	for (const [timestamp, pageId, customerId] of day1Logs) {
		if (!day1Map.has(customerId)) {
			day1Map.set(customerId, new Set());
		}
		day1Map.get(customerId).add(pageId);
	}
	const day2Map = new Map();
	for (const [timestamp, pageId, customerId] of day2Logs) {
		if (!day2Map.has(customerId)) {
			day2Map.set(customerId, new Set());
		}
		day2Map.get(customerId).add(pageId);
	}
	const loyalCustomers = [];
	for (const [customerId, day1Pages] of day1Map) {
		const day2Pages = day2Map.get(customerId);
		if (day2Pages) {
			const uniquePages = new Set([...day1Pages, ...day2Pages]);
			if (uniquePages.size >= 2) {
				loyalCustomers.push(customerId);
			}
		}
	}
	return loyalCustomers;
}

// ============================================
// VANILLA JS UTILITY FUNCTIONS (ALL COMPANIES)
// ============================================

// 1. Debounce
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// 2. Throttle
function throttle(func, limit) {
	let inThrottle;
	return function (...args) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

// 3. Deep Clone
function deepClone(obj, hash = new WeakMap()) {
	if (Object(obj) !== obj) return obj;
	if (obj instanceof Date) return new Date(obj);
	if (obj instanceof RegExp) return new RegExp(obj);
	if (hash.has(obj)) return hash.get(obj);
	const result = Array.isArray(obj) ? [] : {};
	hash.set(obj, result);
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			result[key] = deepClone(obj[key], hash);
		}
	}
	return result;
}

// 4. Promise.all Implementation
function promiseAll(promises) {
	return new Promise((resolve, reject) => {
		if (promises.length === 0) {
			resolve([]);
			return;
		}
		const results = new Array(promises.length);
		let completedCount = 0;
		promises.forEach((promise, index) => {
			Promise.resolve(promise)
				.then((result) => {
					results[index] = result;
					completedCount++;
					if (completedCount === promises.length) {
						resolve(results);
					}
				})
				.catch(reject);
		});
	});
}

// 5. Promise.race Implementation
function promiseRace(promises) {
	return new Promise((resolve, reject) => {
		if (promises.length === 0) return;
		promises.forEach((promise) => {
			Promise.resolve(promise).then(resolve, reject);
		});
	});
}

// 6. Promise.allSettled Implementation
function promiseAllSettled(promises) {
	return Promise.all(
		promises.map((promise) =>
			Promise.resolve(promise)
				.then((value) => ({ status: "fulfilled", value }))
				.catch((reason) => ({ status: "rejected", reason }))
		)
	);
}

// 7. Flatten Array
function flatten(arr, depth = Infinity) {
	if (depth === 0) return arr;
	return arr.reduce((acc, val) => {
		return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val);
	}, []);
}

// 8. Custom Array.filter
Array.prototype.myFilter = function (callback, thisArg) {
	const result = [];
	for (let i = 0; i < this.length; i++) {
		if (i in this && callback.call(thisArg, this[i], i, this)) {
			result.push(this[i]);
		}
	}
	return result;
};

// 9. Custom Array.map
Array.prototype.myMap = function (callback, thisArg) {
	const result = new Array(this.length);
	for (let i = 0; i < this.length; i++) {
		if (i in this) {
			result[i] = callback.call(thisArg, this[i], i, this);
		}
	}
	return result;
};

// 10. Custom Array.reduce
Array.prototype.myReduce = function (callback, initialValue) {
	let accumulator = initialValue;
	let startIndex = 0;
	if (arguments.length < 2) {
		accumulator = this[0];
		startIndex = 1;
	}
	for (let i = startIndex; i < this.length; i++) {
		if (i in this) {
			accumulator = callback(accumulator, this[i], i, this);
		}
	}
	return accumulator;
};

// 11. Memoization
function memoize(fn) {
	const cache = new Map();
	return function (...args) {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key);
		}
		const result = fn.apply(this, args);
		cache.set(key, result);
		return result;
	};
}

// 12. Currying
function curry(fn) {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function (...args2) {
				return curried.apply(this, args.concat(args2));
			};
		}
	};
}

// ============================================
// DOM MANIPULATION
// ============================================

// 1. getElementsByClassName Implementation
function getElementsByClassName(root, className) {
	const result = [];
	function traverse(node) {
		if (!node) return;
		if (node.classList && node.classList.contains(className)) {
			result.push(node);
		}
		for (const child of node.children) {
			traverse(child);
		}
	}
	traverse(root);
	return result;
}

// 2. Template Engine
function renderTemplate(template, data) {
	return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		return data.hasOwnProperty(key) ? data[key] : match;
	});
}

// ============================================
// ADVANCED ALGORITHMS
// ============================================

// 1. LRU Cache
class LRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.cache = new Map();
	}
	get(key) {
		if (!this.cache.has(key)) return -1;
		const value = this.cache.get(key);
		this.cache.delete(key);
		this.cache.set(key, value);
		return value;
	}
	put(key, value) {
		if (this.cache.has(key)) {
			this.cache.delete(key);
		} else if (this.cache.size >= this.capacity) {
			const firstKey = this.cache.keys().next().value;
			this.cache.delete(firstKey);
		}
		this.cache.set(key, value);
	}
}

// 2. Detect Cycle in Linked List
function hasCycle(head) {
	let slow = head;
	let fast = head;
	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
		if (slow === fast) return true;
	}
	return false;
}

// 3. Binary Search
function binarySearch(arr, target) {
	let left = 0;
	let right = arr.length - 1;
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] === target) return mid;
		if (arr[mid] < target) left = mid + 1;
		else right = mid - 1;
	}
	return -1;
}

// 4. Retry with Exponential Backoff
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
	for (let i = 0; i < maxRetries; i++) {
		try {
			return await fn();
		} catch (error) {
			if (i === maxRetries - 1) throw error;
			const backoffDelay = delay * Math.pow(2, i);
			await new Promise((resolve) => setTimeout(resolve, backoffDelay));
		}
	}
}

// 5. Fibonacci with Memoization
const fibonacci = memoize(function (n) {
	if (n < 2) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
});

// ============================================
// STRING & ARRAY PROBLEMS
// ============================================

// 1. Two Sum
function twoSum(nums, target) {
	const map = new Map();
	for (let i = 0; i < nums.length; i++) {
		const complement = target - nums[i];
		if (map.has(complement)) {
			return [map.get(complement), i];
		}
		map.set(nums[i], i);
	}
	return [];
}

// 2. Valid Parentheses
function isValid(s) {
	const stack = [];
	const map = { "(": ")", "[": "]", "{": "}" };
	for (const char of s) {
		if (map[char]) {
			stack.push(char);
		} else {
			const last = stack.pop();
			if (map[last] !== char) return false;
		}
	}
	return stack.length === 0;
}

// 3. Merge Intervals
function mergeIntervals(intervals) {
	if (intervals.length <= 1) return intervals;
	intervals.sort((a, b) => a[0] - b[0]);
	const result = [intervals[0]];
	for (let i = 1; i < intervals.length; i++) {
		const current = intervals[i];
		const last = result[result.length - 1];
		if (current[0] <= last[1]) {
			last[1] = Math.max(last[1], current[1]);
		} else {
			result.push(current);
		}
	}
	return result;
}

// 4. Climbing Stairs (DP)
function climbStairs(n) {
	if (n <= 2) return n;
	let first = 1,
		second = 2;
	for (let i = 3; i <= n; i++) {
		const third = first + second;
		first = second;
		second = third;
	}
	return second;
}

// 5. Maximum Subarray (Kadane's Algorithm)
function maxSubArray(nums) {
	let maxCurrent = nums[0];
	let maxGlobal = nums[0];
	for (let i = 1; i < nums.length; i++) {
		maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
		maxGlobal = Math.max(maxGlobal, maxCurrent);
	}
	return maxGlobal;
}

// ============================================
// OBJECT & CLASS PROBLEMS
// ============================================

// 1. Singleton Pattern
class Singleton {
	constructor() {
		if (Singleton.instance) {
			return Singleton.instance;
		}
		Singleton.instance = this;
		this.data = {};
	}
	static getInstance() {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton();
		}
		return Singleton.instance;
	}
}

// 2. Observer Pattern
class Observer {
	constructor() {
		this.subscribers = [];
	}
	subscribe(fn) {
		this.subscribers.push(fn);
	}
	unsubscribe(fn) {
		this.subscribers = this.subscribers.filter((sub) => sub !== fn);
	}
	notify(data) {
		this.subscribers.forEach((fn) => fn(data));
	}
}

// 3. Deep Equal
function deepEqual(obj1, obj2) {
	if (obj1 === obj2) return true;
	if (
		typeof obj1 !== "object" ||
		typeof obj2 !== "object" ||
		obj1 === null ||
		obj2 === null
	) {
		return false;
	}
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (const key of keys1) {
		if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
			return false;
		}
	}
	return true;
}

// ============================================
// ASYNC UTILITIES
// ============================================

// 1. Sleep Function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 2. Timeout Promise
function promiseWithTimeout(promise, ms) {
	const timeout = new Promise((_, reject) => {
		setTimeout(() => reject(new Error("Timeout")), ms);
	});
	return Promise.race([promise, timeout]);
}

// 3. Sequential Async Execution
async function runSequential(promises) {
	const results = [];
	for (const promise of promises) {
		results.push(await promise);
	}
	return results;
}

// 4. Parallel with Limit
async function parallelLimit(tasks, limit) {
	const results = [];
	const executing = [];
	for (const [index, task] of tasks.entries()) {
		const p = Promise.resolve()
			.then(() => task())
			.then((result) => {
				results[index] = result;
			});
		results.push(p);
		executing.push(p);
		if (executing.length >= limit) {
			await Promise.race(executing);
			executing.splice(
				executing.findIndex((e) => e === p),
				1
			);
		}
	}
	await Promise.all(results);
	return results;
}

// ============================================
// SORTING ALGORITHMS
// ============================================

// 1. Quick Sort
function quickSort(arr) {
	if (arr.length <= 1) return arr;
	const pivot = arr[Math.floor(arr.length / 2)];
	const left = arr.filter((x) => x < pivot);
	const middle = arr.filter((x) => x === pivot);
	const right = arr.filter((x) => x > pivot);
	return [...quickSort(left), ...middle, ...quickSort(right)];
}

// 2. Merge Sort
function mergeSort(arr) {
	if (arr.length <= 1) return arr;
	const mid = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));
	return merge(left, right);
}
function merge(left, right) {
	const result = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}
	return [...result, ...left, ...right];
}

// ============================================
// TREE TRAVERSAL
// ============================================

// Binary Tree Node
class BinaryTreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

// 1. Inorder Traversal (Recursive)
function inorderRecursive(root) {
	const result = [];
	function traverse(node) {
		if (!node) return;
		traverse(node.left);
		result.push(node.val);
		traverse(node.right);
	}
	traverse(root);
	return result;
}

// 2. Inorder Traversal (Iterative)
function inorderIterative(root) {
	const result = [];
	const stack = [];
	let current = root;
	while (current || stack.length > 0) {
		while (current) {
			stack.push(current);
			current = current.left;
		}
		current = stack.pop();
		result.push(current.val);
		current = current.right;
	}
	return result;
}

// 3. Level Order Traversal (BFS)
function levelOrder(root) {
	if (!root) return [];
	const result = [];
	const queue = [root];
	while (queue.length > 0) {
		const levelSize = queue.length;
		const currentLevel = [];
		for (let i = 0; i < levelSize; i++) {
			const node = queue.shift();
			currentLevel.push(node.val);
			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}
		result.push(currentLevel);
	}
	return result;
}

// ============================================
// GRAPH ALGORITHMS
// ============================================

// 1. DFS (Recursive)
function dfsRecursive(graph, start, visited = new Set()) {
	visited.add(start);
	console.log(start);
	for (const neighbor of graph.get(start) || []) {
		if (!visited.has(neighbor)) {
			dfsRecursive(graph, neighbor, visited);
		}
	}
	return visited;
}

// 2. BFS
function bfs(graph, start) {
	const visited = new Set();
	const queue = [start];
	visited.add(start);
	while (queue.length > 0) {
		const node = queue.shift();
		console.log(node);
		for (const neighbor of graph.get(node) || []) {
			if (!visited.has(neighbor)) {
				visited.add(neighbor);
				queue.push(neighbor);
			}
		}
	}
	return visited;
}

// 3. Dijkstra's Algorithm
function dijkstra(graph, start) {
	const distances = new Map();
	const visited = new Set();
	const pq = [[0, start]];

	for (const node of graph.keys()) {
		distances.set(node, Infinity);
	}
	distances.set(start, 0);

	while (pq.length > 0) {
		pq.sort((a, b) => a[0] - b[0]);
		const [dist, node] = pq.shift();

		if (visited.has(node)) continue;
		visited.add(node);

		for (const [neighbor, weight] of graph.get(node) || []) {
			const newDist = dist + weight;
			if (newDist < distances.get(neighbor)) {
				distances.set(neighbor, newDist);
				pq.push([newDist, neighbor]);
			}
		}
	}
	return distances;
}

// ============================================
// DESIGN PATTERNS
// ============================================

// 1. Factory Pattern
class Car {
	constructor(model) {
		this.model = model;
	}
}
class CarFactory {
	createCar(model) {
		return new Car(model);
	}
}

// 2. Builder Pattern
class QueryBuilder {
	constructor() {
		this.query = {};
	}
	select(fields) {
		this.query.select = fields;
		return this;
	}
	from(table) {
		this.query.from = table;
		return this;
	}
	where(condition) {
		this.query.where = condition;
		return this;
	}
	build() {
		return this.query;
	}
}

// 3. Proxy Pattern
function createProxy(target) {
	return new Proxy(target, {
		get(obj, prop) {
			console.log(`Getting ${prop}`);
			return obj[prop];
		},
		set(obj, prop, value) {
			console.log(`Setting ${prop} to ${value}`);
			obj[prop] = value;
			return true;
		},
	});
}

// ============================================
// MISCELLANEOUS
// ============================================

// 1. Chunk Array
function chunk(arr, size) {
	const result = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}
	return result;
}

// 2. Group By
function groupBy(arr, key) {
	return arr.reduce((result, item) => {
		const groupKey = typeof key === "function" ? key(item) : item[key];
		if (!result[groupKey]) result[groupKey] = [];
		result[groupKey].push(item);
		return result;
	}, {});
}

// 3. Once Function
function once(fn) {
	let called = false;
	let result;
	return function (...args) {
		if (!called) {
			called = true;
			result = fn.apply(this, args);
		}
		return result;
	};
}

// 4. Pipe and Compose
const pipe =
	(...fns) =>
	(x) =>
		fns.reduce((v, f) => f(v), x);
const compose =
	(...fns) =>
	(x) =>
		fns.reduceRight((v, f) => f(v), x);

// 5. Intersection of Arrays
function intersection(...arrays) {
	return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
}

// 6. Difference of Arrays
function difference(arr1, arr2) {
	return arr1.filter((x) => !arr2.includes(x));
}

// 7. Unique Array
function unique(arr) {
	return [...new Set(arr)];
}

// 8. Shuffle Array (Fisher-Yates)
function shuffle(arr) {
	const result = [...arr];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

// 9. Palindrome Check
function isPalindrome(str) {
	const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
	return cleaned === cleaned.split("").reverse().join("");
}

// 10. Anagram Check
function isAnagram(str1, str2) {
	const clean = (str) =>
		str
			.toLowerCase()
			.replace(/[^a-z0-9]/g, "")
			.split("")
			.sort()
			.join("");
	return clean(str1) === clean(str2);
}

// 11. Factorial
function factorial(n) {
	if (n <= 1) return 1;
	return n * factorial(n - 1);
}

// 12. Prime Check
function isPrime(n) {
	if (n <= 1) return false;
	if (n <= 3) return true;
	if (n % 2 === 0 || n % 3 === 0) return false;
	for (let i = 5; i * i <= n; i += 6) {
		if (n % i === 0 || n % (i + 2) === 0) return false;
	}
	return true;
}

// 13. GCD
function gcd(a, b) {
	return b === 0 ? a : gcd(b, a % b);
}

// 14. LCM
function lcm(a, b) {
	return (a * b) / gcd(a, b);
}

// 15. Power Function (Fast Exponentiation)
function power(base, exponent) {
	if (exponent === 0) return 1;
	if (exponent < 0) return 1 / power(base, -exponent);
	if (exponent % 2 === 0) {
		const half = power(base, exponent / 2);
		return half * half;
	}
	return base * power(base, exponent - 1);
}

// 16. Permutations
function permutations(arr) {
	if (arr.length <= 1) return [arr];
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		const current = arr[i];
		const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
		const perms = permutations(remaining);
		for (const perm of perms) {
			result.push([current, ...perm]);
		}
	}
	return result;
}

// 17. Combinations
function combinations(arr, k) {
	if (k === 0) return [[]];
	if (arr.length < k) return [];
	const [first, ...rest] = arr;
	const withFirst = combinations(rest, k - 1).map((comb) => [first, ...comb]);
	const withoutFirst = combinations(rest, k);
	return [...withFirst, ...withoutFirst];
}

// 18. Flatten Object
function flattenObject(obj, prefix = "") {
	return Object.keys(obj).reduce((acc, k) => {
		const pre = prefix.length ? prefix + "." : "";
		if (
			typeof obj[k] === "object" &&
			obj[k] !== null &&
			!Array.isArray(obj[k])
		) {
			Object.assign(acc, flattenObject(obj[k], pre + k));
		} else {
			acc[pre + k] = obj[k];
		}
		return acc;
	}, {});
}

// 19. Unflatten Object
function unflattenObject(obj) {
	const result = {};
	for (const key in obj) {
		const keys = key.split(".");
		let current = result;
		for (let i = 0; i < keys.length - 1; i++) {
			if (!current[keys[i]]) current[keys[i]] = {};
			current = current[keys[i]];
		}
		current[keys[keys.length - 1]] = obj[key];
	}
	return result;
}

// 20. Safe Get (Lodash get alternative)
function get(obj, path, defaultValue) {
	const keys = Array.isArray(path) ? path : path.split(".");
	let result = obj;
	for (const key of keys) {
		if (result == null) return defaultValue;
		result = result[key];
	}
	return result !== undefined ? result : defaultValue;
}

// 21. Safe Set
function set(obj, path, value) {
	const keys = Array.isArray(path) ? path : path.split(".");
	let current = obj;
	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (!(key in current) || typeof current[key] !== "object") {
			current[key] = {};
		}
		current = current[key];
	}
	current[keys[keys.length - 1]] = value;
	return obj;
}

// 22. Throttle with Leading and Trailing
function throttleAdvanced(func, limit, options = {}) {
	let timeout, context, args, result;
	let previous = 0;
	const { leading = true, trailing = true } = options;

	const later = function () {
		previous = leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};

	return function (...params) {
		const now = Date.now();
		if (!previous && leading === false) previous = now;
		const remaining = limit - (now - previous);
		context = this;
		args = params;

		if (remaining <= 0 || remaining > limit) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
}

// 23. Intersection Observer Polyfill (Basic)
function createIntersectionObserver(callback, options = {}) {
	const { root = null, rootMargin = "0px", threshold = 0 } = options;
	const observers = [];

	function observe(target) {
		const observer = { target, callback, isIntersecting: false };
		observers.push(observer);
		checkIntersection(observer);
		window.addEventListener("scroll", () => checkIntersection(observer));
		window.addEventListener("resize", () => checkIntersection(observer));
	}

	function checkIntersection(observer) {
		const targetRect = observer.target.getBoundingClientRect();
		const rootRect =
			root ?
				root.getBoundingClientRect()
			:	{
					top: 0,
					left: 0,
					bottom: window.innerHeight,
					right: window.innerWidth,
				};

		const intersecting = !(
			targetRect.right < rootRect.left ||
			targetRect.left > rootRect.right ||
			targetRect.bottom < rootRect.top ||
			targetRect.top > rootRect.bottom
		);

		if (intersecting !== observer.isIntersecting) {
			observer.isIntersecting = intersecting;
			observer.callback([
				{
					target: observer.target,
					isIntersecting: intersecting,
					intersectionRatio: intersecting ? 1 : 0,
				},
			]);
		}
	}

	return { observe };
}

// 24. Virtual Scroll (Basic Implementation)
class VirtualScroll {
	constructor(container, itemHeight, totalItems, renderFn) {
		this.container = container;
		this.itemHeight = itemHeight;
		this.totalItems = totalItems;
		this.renderFn = renderFn;
		this.visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
		this.startIndex = 0;
		this.init();
	}

	init() {
		this.container.style.overflow = "auto";
		this.container.style.position = "relative";

		const spacer = document.createElement("div");
		spacer.style.height = `${this.totalItems * this.itemHeight}px`;
		this.container.appendChild(spacer);

		this.itemsContainer = document.createElement("div");
		this.itemsContainer.style.position = "absolute";
		this.itemsContainer.style.top = "0";
		this.itemsContainer.style.left = "0";
		this.itemsContainer.style.right = "0";
		this.container.appendChild(this.itemsContainer);

		this.container.addEventListener("scroll", () => this.onScroll());
		this.render();
	}

	onScroll() {
		const scrollTop = this.container.scrollTop;
		this.startIndex = Math.floor(scrollTop / this.itemHeight);
		this.render();
	}

	render() {
		this.itemsContainer.innerHTML = "";
		const endIndex = Math.min(
			this.startIndex + this.visibleCount,
			this.totalItems
		);

		for (let i = this.startIndex; i < endIndex; i++) {
			const item = this.renderFn(i);
			item.style.position = "absolute";
			item.style.top = `${i * this.itemHeight}px`;
			item.style.height = `${this.itemHeight}px`;
			this.itemsContainer.appendChild(item);
		}
	}
}

// 25. Custom Promise (Polyfill)
class MyPromise {
	constructor(executor) {
		this.state = "pending";
		this.value = undefined;
		this.reason = undefined;
		this.onFulfilledCallbacks = [];
		this.onRejectedCallbacks = [];

		const resolve = (value) => {
			if (this.state === "pending") {
				this.state = "fulfilled";
				this.value = value;
				this.onFulfilledCallbacks.forEach((fn) => fn());
			}
		};

		const reject = (reason) => {
			if (this.state === "pending") {
				this.state = "rejected";
				this.reason = reason;
				this.onRejectedCallbacks.forEach((fn) => fn());
			}
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	then(onFulfilled, onRejected) {
		onFulfilled =
			typeof onFulfilled === "function" ? onFulfilled : (value) => value;
		onRejected =
			typeof onRejected === "function" ? onRejected : (
				(err) => {
					throw err;
				}
			);

		const promise2 = new MyPromise((resolve, reject) => {
			if (this.state === "fulfilled") {
				setTimeout(() => {
					try {
						const x = onFulfilled(this.value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (err) {
						reject(err);
					}
				}, 0);
			} else if (this.state === "rejected") {
				setTimeout(() => {
					try {
						const x = onRejected(this.reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (err) {
						reject(err);
					}
				}, 0);
			} else {
				this.onFulfilledCallbacks.push(() => {
					setTimeout(() => {
						try {
							const x = onFulfilled(this.value);
							resolvePromise(promise2, x, resolve, reject);
						} catch (err) {
							reject(err);
						}
					}, 0);
				});
				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							const x = onRejected(this.reason);
							resolvePromise(promise2, x, resolve, reject);
						} catch (err) {
							reject(err);
						}
					}, 0);
				});
			}
		});
		return promise2;
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	static resolve(value) {
		return new MyPromise((resolve) => resolve(value));
	}

	static reject(reason) {
		return new MyPromise((_, reject) => reject(reason));
	}
}

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return reject(new TypeError("Chaining cycle detected"));
	}
	if (x && (typeof x === "object" || typeof x === "function")) {
		let called = false;
		try {
			const then = x.then;
			if (typeof then === "function") {
				then.call(
					x,
					(y) => {
						if (called) return;
						called = true;
						resolvePromise(promise2, y, resolve, reject);
					},
					(r) => {
						if (called) return;
						called = true;
						reject(r);
					}
				);
			} else {
				resolve(x);
			}
		} catch (err) {
			if (called) return;
			reject(err);
		}
	} else {
		resolve(x);
	}
}

// Variables, Data Types & Operators

// 1. Swap two variables without using a third variable
function swap(a, b) {
	[a, b] = [b, a];
	return [a, b];
}
// Usage: swap(5, 10) → [10, 5]

// 2. Check if a number is even or odd
const isEven = (num) => num % 2 === 0;

// 3. Convert Celsius to Fahrenheit
const celsiusToFahrenheit = (c) => (c * 9) / 5 + 32;

// 4. Generate a random number between min and max (inclusive)
const randomRange = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

// 5. Check if a value is a number
const isNumber = (value) => typeof value === "number" && !isNaN(value);

// Strings;

// 6. Reverse a string
const reverseString = (str) => str.split("").reverse().join("");

// 7. Check if a string is a palindrome
const isPalindrome = (str) => {
	const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
	return clean === clean.split("").reverse().join("");
};

// 8. Count vowels in a string
const countVowels = (str) => (str.match(/[aeiou]/gi) || []).length;

// 9. Capitalize first letter of each word
const capitalizeWords = (str) =>
	str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

// 10. Find the longest word in a sentence
const longestWord = (str) => {
	return str
		.split(" ")
		.reduce((longest, current) =>
			current.length > longest.length ? current : longest
		);
};

// 11. Remove duplicates from a string
const removeDuplicateChars = (str) => [...new Set(str)].join("");

// 12. Check if two strings are anagrams
const areAnagrams = (str1, str2) => {
	const format = (str) => str.toLowerCase().split("").sort().join("");
	return format(str1) === format(str2);
};

// 13. Truncate string with ellipsis
const truncate = (str, maxLength) =>
	str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

// 14. Repeat a string n times
const repeatString = (str, n) => str.repeat(n);

// 15. Check if string contains only digits
const isOnlyDigits = (str) => /^\d+$/.test(str);

// Arrays - Basics;

// 16. Find maximum element in array
const findMax = (arr) => Math.max(...arr);

// 17. Find minimum element in array
const findMin = (arr) => Math.min(...arr);

// 18. Calculate sum of array elements
const sumArray = (arr) => arr.reduce((sum, num) => sum + num, 0);

// 19. Calculate average of array elements
const average = (arr) => sumArray(arr) / arr.length;

// 20. Remove falsy values from array
const removeFalsy = (arr) => arr.filter(Boolean);

// 21. Flatten a nested array (one level)
const flatten = (arr) => arr.flat();

// 22. Find unique elements in array
const unique = (arr) => [...new Set(arr)];

// 23. Check if array contains a value
const contains = (arr, value) => arr.includes(value);

// 24. Get last element of array
const lastElement = (arr) => arr[arr.length - 1];

// 25. Chunk array into smaller arrays of size n
const chunk = (arr, size) => {
	const result = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}
	return result;
};

// Array Manipulation

// 26. Deep flatten a nested array
const deepFlatten = (arr) =>
	arr.reduce(
		(acc, val) =>
			Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val),
		[]
	);

// 27. Find intersection of two arrays
const intersection = (arr1, arr2) => arr1.filter((item) => arr2.includes(item));

// 28. Find difference between two arrays
const difference = (arr1, arr2) => arr1.filter((item) => !arr2.includes(item));

// 29. Group array elements by property
const groupBy = (arr, key) => {
	return arr.reduce(
		(result, item) => ({
			...result,
			[item[key]]: [...(result[item[key]] || []), item],
		}),
		{}
	);
};

// 30. Sort array of objects by multiple properties
const sortBy = (arr, ...keys) => {
	return arr.sort((a, b) => {
		for (let key of keys) {
			if (a[key] < b[key]) return -1;
			if (a[key] > b[key]) return 1;
		}
		return 0;
	});
};

// 31. Rotate array to the right by k steps
const rotate = (arr, k) => {
	k = k % arr.length;
	return [...arr.slice(-k), ...arr.slice(0, -k)];
};

// 32. Find missing number in sequence 1 to n
const findMissing = (arr) => {
	const n = arr.length + 1;
	const expectedSum = (n * (n + 1)) / 2;
	const actualSum = arr.reduce((a, b) => a + b, 0);
	return expectedSum - actualSum;
};

// 33. Find duplicates in array
const findDuplicates = (arr) => {
	const seen = new Set();
	const duplicates = new Set();
	arr.forEach((item) => {
		if (seen.has(item)) duplicates.add(item);
		else seen.add(item);
	});
	return [...duplicates];
};

// 34. Move all zeros to end of array
const moveZeros = (arr) => {
	let nonZeros = arr.filter((x) => x !== 0);
	let zeros = arr.filter((x) => x === 0);
	return [...nonZeros, ...zeros];
};

// 35. Find pair with given sum
const twoSum = (arr, target) => {
	const seen = new Map();
	for (let i = 0; i < arr.length; i++) {
		const complement = target - arr[i];
		if (seen.has(complement)) {
			return [seen.get(complement), i];
		}
		seen.set(arr[i], i);
	}
	return null;
};

// Objects & Functions;

// 36. Deep clone an object
const deepClone = (obj) => {
	if (obj === null || typeof obj !== "object") return obj;
	if (obj instanceof Date) return new Date(obj);
	if (obj instanceof Array) return obj.map((item) => deepClone(item));
	if (obj instanceof Object) {
		return Object.fromEntries(
			Object.entries(obj).map(([key, val]) => [key, deepClone(val)])
		);
	}
};

// 37. Merge two objects deeply
const deepMerge = (obj1, obj2) => {
	const result = { ...obj1 };
	for (let key in obj2) {
		if (obj2[key] instanceof Object && key in obj1) {
			result[key] = deepMerge(obj1[key], obj2[key]);
		} else {
			result[key] = obj2[key];
		}
	}
	return result;
};

// 38. Get nested object value by path string
const get = (obj, path, defaultValue = undefined) => {
	const travel = (regexp) =>
		String.prototype.split
			.call(path, regexp)
			.filter(Boolean)
			.reduce(
				(res, key) => (res !== null && res !== undefined ? res[key] : res),
				obj
			);
	const result = travel(/[,[\]]+?/) || travel(/[.[\]]+?/);
	return result === undefined || result === obj ? defaultValue : result;
};

// 39. Pick specific properties from object
const pick = (obj, keys) =>
	Object.fromEntries(keys.map((key) => [key, obj[key]]));

// 40. Omit specific properties from object
const omit = (obj, keys) =>
	Object.fromEntries(
		Object.entries(obj).filter(([key]) => !keys.includes(key))
	);

// 41. Debounce function
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

// 42. Throttle function
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

// 43. Memoize function
const memoize = (fn) => {
	const cache = new Map();
	return (...args) => {
		const key = JSON.stringify(args);
		if (cache.has(key)) return cache.get(key);
		const result = fn.apply(this, args);
		cache.set(key, result);
		return result;
	};
};

// 44. Curry function
const curry = (fn) =>
	function curried(...args) {
		return args.length >= fn.length ?
				fn.apply(this, args)
			:	(...args2) => curried.apply(this, args.concat(args2));
	};

// 45. Compose multiple functions
const compose =
	(...functions) =>
	(args) =>
		functions.reduceRight((arg, fn) => fn(arg), args);

// 46. Pipe multiple functions
const pipe =
	(...functions) =>
	(args) =>
		functions.reduce((arg, fn) => fn(arg), args);

// 47. Partial application
const partial =
	(fn, ...args) =>
	(...moreArgs) =>
		fn(...args, ...moreArgs);

// 48. Bind polyfill
Function.prototype.myBind = function (context, ...args) {
	const fn = this;
	return function (...newArgs) {
		return fn.apply(context, [...args, ...newArgs]);
	};
};

// 49. Call polyfill
Function.prototype.myCall = function (context, ...args) {
	context = context || window;
	const uniqueId = "fn_" + Date.now();
	context[uniqueId] = this;
	const result = context[uniqueId](...args);
	delete context[uniqueId];
	return result;
};

// 50. Apply polyfill
Function.prototype.myApply = function (context, argsArray) {
	context = context || window;
	const uniqueId = "fn_" + Date.now();
	context[uniqueId] = this;
	const result = context[uniqueId](...argsArray);
	delete context[uniqueId];
	return result;
};

// Algorithms & Logic;

// 51. Binary Search
const binarySearch = (arr, target) => {
	let left = 0,
		right = arr.length - 1;
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] === target) return mid;
		if (arr[mid] < target) left = mid + 1;
		else right = mid - 1;
	}
	return -1;
};

// 52. Linear Search
const linearSearch = (arr, target) => arr.indexOf(target);

// 53. Bubble Sort
const bubbleSort = (arr) => {
	const result = [...arr];
	for (let i = 0; i < result.length; i++) {
		for (let j = 0; j < result.length - i - 1; j++) {
			if (result[j] > result[j + 1]) {
				[result[j], result[j + 1]] = [result[j + 1], result[j]];
			}
		}
	}
	return result;
};

// 54. Quick Sort
const quickSort = (arr) => {
	if (arr.length <= 1) return arr;
	const pivot = arr[Math.floor(arr.length / 2)];
	const left = arr.filter((x) => x < pivot);
	const middle = arr.filter((x) => x === pivot);
	const right = arr.filter((x) => x > pivot);
	return [...quickSort(left), ...middle, ...quickSort(right)];
};

// 55. Merge Sort
const mergeSort = (arr) => {
	if (arr.length <= 1) return arr;
	const mid = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));
	return merge(left, right);
};

const merge = (left, right) => {
	const result = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) result.push(left.shift());
		else result.push(right.shift());
	}
	return [...result, ...left, ...right];
};

// 56. Factorial (iterative)
const factorial = (n) => {
	let result = 1;
	for (let i = 2; i <= n; i++) result *= i;
	return result;
};

// 57. Factorial (recursive)
const factorialRecursive = (n) => (n <= 1 ? 1 : n * factorialRecursive(n - 1));

// 58. Fibonacci (iterative)
const fibonacci = (n) => {
	if (n <= 1) return n;
	let a = 0,
		b = 1;
	for (let i = 2; i <= n; i++) {
		[a, b] = [b, a + b];
	}
	return b;
};

// 59. Fibonacci (recursive with memoization)
const fibMemo = (n, memo = {}) => {
	if (n in memo) return memo[n];
	if (n <= 1) return n;
	memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
	return memo[n];
};

// 60. Check if number is prime
const isPrime = (num) => {
	if (num <= 1) return false;
	if (num <= 3) return true;
	if (num % 2 === 0 || num % 3 === 0) return false;
	for (let i = 5; i * i <= num; i += 6) {
		if (num % i === 0 || num % (i + 2) === 0) return false;
	}
	return true;
};

// Data Structures

// 61. Implement Stack
class Stack {
	constructor() {
		this.items = [];
	}
	push(element) {
		this.items.push(element);
	}
	pop() {
		return this.items.pop();
	}
	peek() {
		return this.items[this.items.length - 1];
	}
	isEmpty() {
		return this.items.length === 0;
	}
	size() {
		return this.items.length;
	}
}

// 62. Implement Queue
class Queue {
	constructor() {
		this.items = [];
	}
	enqueue(element) {
		this.items.push(element);
	}
	dequeue() {
		return this.items.shift();
	}
	front() {
		return this.items[0];
	}
	isEmpty() {
		return this.items.length === 0;
	}
	size() {
		return this.items.length;
	}
}

// 63. Implement Linked List
class ListNode {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.length = 0;
	}

	append(data) {
		const newNode = new ListNode(data);
		if (!this.head) {
			this.head = newNode;
		} else {
			let current = this.head;
			while (current.next) current = current.next;
			current.next = newNode;
		}
		this.length++;
	}

	prepend(data) {
		const newNode = new ListNode(data);
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
	}

	delete(data) {
		if (!this.head) return;
		if (this.head.data === data) {
			this.head = this.head.next;
			this.length--;
			return;
		}
		let current = this.head;
		while (current.next && current.next.data !== data) {
			current = current.next;
		}
		if (current.next) {
			current.next = current.next.next;
			this.length--;
		}
	}
}

// 64. Implement Hash Table
class HashTable {
	constructor(size = 53) {
		this.keyMap = new Array(size);
	}

	_hash(key) {
		let total = 0;
		const WEIRD_PRIME = 31;
		for (let i = 0; i < Math.min(key.length, 100); i++) {
			const char = key[i];
			const value = char.charCodeAt(0) - 96;
			total = (total * WEIRD_PRIME + value) % this.keyMap.length;
		}
		return total;
	}

	set(key, value) {
		const index = this._hash(key);
		if (!this.keyMap[index]) this.keyMap[index] = [];
		this.keyMap[index].push([key, value]);
	}

	get(key) {
		const index = this._hash(key);
		if (this.keyMap[index]) {
			for (let pair of this.keyMap[index]) {
				if (pair[0] === key) return pair[1];
			}
		}
		return undefined;
	}
}

// 65. Implement Binary Search Tree
class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
	}

	insert(value) {
		const newNode = new TreeNode(value);
		if (!this.root) {
			this.root = newNode;
			return this;
		}
		let current = this.root;
		while (true) {
			if (value === current.value) return undefined;
			if (value < current.value) {
				if (!current.left) {
					current.left = newNode;
					return this;
				}
				current = current.left;
			} else {
				if (!current.right) {
					current.right = newNode;
					return this;
				}
				current = current.right;
			}
		}
	}

	find(value) {
		if (!this.root) return false;
		let current = this.root;
		while (current) {
			if (value === current.value) return true;
			if (value < current.value) current = current.left;
			else current = current.right;
		}
		return false;
	}

	// 66. BFS Traversal
	BFS() {
		const data = [],
			queue = [];
		if (this.root) queue.push(this.root);
		while (queue.length) {
			const node = queue.shift();
			data.push(node.value);
			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}
		return data;
	}

	// 67. DFS - PreOrder
	DFSPreOrder() {
		const data = [];
		const traverse = (node) => {
			data.push(node.value);
			if (node.left) traverse(node.left);
			if (node.right) traverse(node.right);
		};
		if (this.root) traverse(this.root);
		return data;
	}
}

// 68. Implement LRU Cache
class LRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.cache = new Map();
	}

	get(key) {
		if (!this.cache.has(key)) return -1;
		const value = this.cache.get(key);
		this.cache.delete(key);
		this.cache.set(key, value);
		return value;
	}

	put(key, value) {
		if (this.cache.has(key)) this.cache.delete(key);
		else if (this.cache.size >= this.capacity) {
			const firstKey = this.cache.keys().next().value;
			this.cache.delete(firstKey);
		}
		this.cache.set(key, value);
	}
}

// 69. Implement Promise.all
const promiseAll = (promises) => {
	return new Promise((resolve, reject) => {
		const results = [];
		let completed = 0;
		if (promises.length === 0) resolve(results);

		promises.forEach((promise, index) => {
			Promise.resolve(promise)
				.then((result) => {
					results[index] = result;
					completed++;
					if (completed === promises.length) resolve(results);
				})
				.catch(reject);
		});
	});
};

// 70. Implement Promise.race
const promiseRace = (promises) => {
	return new Promise((resolve, reject) => {
		promises.forEach((promise) => {
			Promise.resolve(promise).then(resolve).catch(reject);
		});
	});
};

// Advanced Algorithms

// 71. Implement Event Emitter (Pub-Sub)
class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(event, listener) {
		if (!this.events[event]) this.events[event] = [];
		this.events[event].push(listener);
		return () => this.off(event, listener);
	}

	off(event, listenerToRemove) {
		if (!this.events[event]) return;
		this.events[event] = this.events[event].filter(
			(listener) => listener !== listenerToRemove
		);
	}

	emit(event, data) {
		if (!this.events[event]) return;
		this.events[event].forEach((listener) => listener(data));
	}

	once(event, listener) {
		const onceWrapper = (data) => {
			listener(data);
			this.off(event, onceWrapper);
		};
		this.on(event, onceWrapper);
	}
}

// 72. Implement Async Queue
class AsyncQueue {
	constructor() {
		this.queue = [];
		this.processing = false;
	}

	async add(task) {
		return new Promise((resolve, reject) => {
			this.queue.push({ task, resolve, reject });
			this.process();
		});
	}

	async process() {
		if (this.processing || this.queue.length === 0) return;
		this.processing = true;
		const { task, resolve, reject } = this.queue.shift();
		try {
			const result = await task();
			resolve(result);
		} catch (error) {
			reject(error);
		}
		this.processing = false;
		this.process();
	}
}

// 73. Deep equality check
const deepEqual = (obj1, obj2) => {
	if (obj1 === obj2) return true;
	if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
	if (obj1 === null || obj2 === null) return false;

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;

	for (let key of keys1) {
		if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
	}
	return true;
};

// 74. Generate all permutations of array
const permutations = (arr) => {
	if (arr.length <= 1) return [arr];
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		const current = arr[i];
		const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
		const perms = permutations(remaining);
		for (let perm of perms) {
			result.push([current, ...perm]);
		}
	}
	return result;
};

// 75. Generate all combinations of size k
const combinations = (arr, k) => {
	if (k === 0) return [[]];
	if (arr.length < k) return [];
	const [first, ...rest] = arr;
	const withFirst = combinations(rest, k - 1).map((comb) => [first, ...comb]);
	const withoutFirst = combinations(rest, k);
	return [...withFirst, ...withoutFirst];
};

// 76. Flatten object with dot notation keys
const flattenObject = (obj, prefix = "") =>
	Object.keys(obj).reduce((acc, k) => {
		const pre = prefix.length ? prefix + "." : "";
		if (
			typeof obj[k] === "object" &&
			obj[k] !== null &&
			!Array.isArray(obj[k])
		) {
			Object.assign(acc, flattenObject(obj[k], pre + k));
		} else {
			acc[pre + k] = obj[k];
		}
		return acc;
	}, {});

// 77. Unflatten object with dot notation keys
const unflattenObject = (obj) => {
	const result = {};
	for (let key in obj) {
		const keys = key.split(".");
		keys.reduce((acc, k, i) => {
			if (i === keys.length - 1) acc[k] = obj[key];
			else acc[k] = acc[k] || {};
			return acc[k];
		}, result);
	}
	return result;
};

// 78. Implement JSON.stringify (simplified)
const jsonStringify = (obj) => {
	if (obj === null) return "null";
	if (typeof obj === "string") return `"${obj}"`;
	if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
	if (Array.isArray(obj)) {
		return "[" + obj.map((item) => jsonStringify(item)).join(",") + "]";
	}
	if (typeof obj === "object") {
		const pairs = Object.entries(obj).map(
			([key, value]) => `"${key}":${jsonStringify(value)}`
		);
		return "{" + pairs.join(",") + "}";
	}
};

// 79. Implement JSON.parse (simplified)
const jsonParse = (str) => eval("(" + str + ")"); // Simplified - not for production

// 80. Throttle with leading and trailing options
const advancedThrottle = (func, limit, options = {}) => {
	let timeout, context, args, result;
	let previous = 0;
	const { leading = true, trailing = true } = options;

	const later = () => {
		previous = leading ? Date.now() : 0;
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};

	return function (...params) {
		const now = Date.now();
		if (!previous && !leading) previous = now;
		const remaining = limit - (now - previous);
		context = this;
		args = params;

		if (remaining <= 0 || remaining > limit) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && trailing) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};

// DOM & Browser APIs (Vanilla JS)

// 81. Query Selector (simplified implementation)
const myQuerySelector = (selector, context = document) => {
	const parts = selector.split(" ");
	let elements = [context];

	for (let part of parts) {
		const newElements = [];
		for (let el of elements) {
			if (part.startsWith("#")) {
				const found = document.getElementById(part.slice(1));
				if (found) newElements.push(found);
			} else if (part.startsWith(".")) {
				newElements.push(...el.getElementsByClassName(part.slice(1)));
			} else {
				newElements.push(...el.getElementsByTagName(part));
			}
		}
		elements = newElements;
	}
	return elements[0] || null;
};

// 82. Event Delegation implementation
const delegate = (parent, eventType, selector, handler) => {
	parent.addEventListener(eventType, (event) => {
		const target = event.target.closest(selector);
		if (target && parent.contains(target)) {
			handler.call(target, event);
		}
	});
};

// 83. Serialize form data to object
const serializeForm = (form) => {
	const formData = new FormData(form);
	const data = {};
	for (let [key, value] of formData.entries()) {
		if (data[key]) {
			if (!Array.isArray(data[key])) data[key] = [data[key]];
			data[key].push(value);
		} else {
			data[key] = value;
		}
	}
	return data;
};

// 84. Smooth scroll to element
const smoothScrollTo = (element, duration = 500) => {
	const targetPosition =
		element.getBoundingClientRect().top + window.pageYOffset;
	const startPosition = window.pageYOffset;
	const distance = targetPosition - startPosition;
	let startTime = null;

	const animation = (currentTime) => {
		if (!startTime) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const progress = Math.min(timeElapsed / duration, 1);
		const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
		window.scrollTo(0, startPosition + distance * ease(progress));
		if (timeElapsed < duration) requestAnimationFrame(animation);
	};

	requestAnimationFrame(animation);
};

// 85. Intersection Observer polyfill (simplified)
const createIntersectionObserver = (callback, options = {}) => {
	const { root = null, rootMargin = "0px", threshold = 0 } = options;
	const elements = new Map();

	const checkIntersection = () => {
		const rootRect =
			root ?
				root.getBoundingClientRect()
			:	{
					top: 0,
					left: 0,
					bottom: window.innerHeight,
					right: window.innerWidth,
				};

		elements.forEach((data, element) => {
			const rect = element.getBoundingClientRect();
			const intersecting = !(
				rect.bottom < rootRect.top ||
				rect.top > rootRect.bottom ||
				rect.right < rootRect.left ||
				rect.left > rootRect.right
			);

			if (intersecting !== data.isIntersecting) {
				data.isIntersecting = intersecting;
				callback([
					{
						target: element,
						isIntersecting: intersecting,
						intersectionRatio: intersecting ? 1 : 0,
					},
				]);
			}
		});
	};

	window.addEventListener("scroll", checkIntersection);
	window.addEventListener("resize", checkIntersection);

	return {
		observe: (element) => {
			elements.set(element, { isIntersecting: false });
			checkIntersection();
		},
		unobserve: (element) => elements.delete(element),
		disconnect: () => {
			elements.clear();
			window.removeEventListener("scroll", checkIntersection);
			window.removeEventListener("resize", checkIntersection);
		},
	};
};

/* EXPERT LEVEL (86-100) */

// 86. Implement Virtual DOM diffing (simplified)
const createVNode = (type, props = {}, children = []) => ({
	type,
	props,
	children,
});

const diff = (oldVNode, newVNode) => {
	const patches = [];

	if (!oldVNode) {
		patches.push({ type: "CREATE", newVNode });
	} else if (!newVNode) {
		patches.push({ type: "REMOVE" });
	} else if (oldVNode.type !== newVNode.type) {
		patches.push({ type: "REPLACE", newVNode });
	} else if (typeof newVNode === "string") {
		if (oldVNode !== newVNode) {
			patches.push({ type: "TEXT", content: newVNode });
		}
	} else {
		// Diff props
		const propsPatches = diffProps(oldVNode.props, newVNode.props);
		if (Object.keys(propsPatches).length) {
			patches.push({ type: "PROPS", props: propsPatches });
		}
		// Diff children
		const childPatches = diffChildren(oldVNode.children, newVNode.children);
		patches.push(...childPatches);
	}

	return patches;
};

// 87. Implement Simple Router
class Router {
	constructor() {
		this.routes = {};
		this.currentRoute = "";
		window.addEventListener("popstate", () => this.handleRoute());
	}

	on(path, handler) {
		this.routes[path] = handler;
		return this;
	}

	navigate(path) {
		history.pushState(null, "", path);
		this.handleRoute();
	}

	handleRoute() {
		const path = window.location.pathname;
		this.currentRoute = path;
		const handler = this.routes[path] || this.routes["*"];
		if (handler) handler(path);
	}

	start() {
		this.handleRoute();
	}
}

// 88. Implement State Management (Redux-like)
const createStore = (reducer, initialState) => {
	let state = initialState;
	const listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener());
		return action;
	};

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			const index = listeners.indexOf(listener);
			listeners.splice(index, 1);
		};
	};

	dispatch({ type: "@@INIT" });

	return { getState, dispatch, subscribe };
};

const combineReducers =
	(reducers) =>
	(state = {}, action) =>
		Object.keys(reducers).reduce((nextState, key) => {
			nextState[key] = reducers[key](state[key], action);
			return nextState;
		}, {});

// 89. Implement Middleware system
const applyMiddleware =
	(...middlewares) =>
	(createStore) =>
	(reducer, initialState) => {
		const store = createStore(reducer, initialState);
		let dispatch = store.dispatch;

		const middlewareAPI = {
			getState: store.getState,
			dispatch: (action) => dispatch(action),
		};

		const chain = middlewares.map((middleware) => middleware(middlewareAPI));
		dispatch = chain.reduceRight((next, middleware) => middleware(next))(
			store.dispatch
		);

		return { ...store, dispatch };
	};

// 90. Implement Observable (RxJS-like basic)
class Observable {
	constructor(subscribe) {
		this._subscribe = subscribe;
	}

	subscribe(observer) {
		if (typeof observer === "function") {
			observer = { next: observer };
		}
		return this._subscribe(observer);
	}

	static from(array) {
		return new Observable((observer) => {
			array.forEach((item) => observer.next(item));
			observer.complete && observer.complete();
		});
	}

	map(transform) {
		return new Observable((observer) =>
			this.subscribe({
				next: (value) => observer.next(transform(value)),
				error: (err) => observer.error && observer.error(err),
				complete: () => observer.complete && observer.complete(),
			})
		);
	}

	filter(predicate) {
		return new Observable((observer) =>
			this.subscribe({
				next: (value) => predicate(value) && observer.next(value),
				error: (err) => observer.error && observer.error(err),
				complete: () => observer.complete && observer.complete(),
			})
		);
	}
}

// 91. Implement Web Worker pool
class WorkerPool {
	constructor(workerScript, poolSize = 4) {
		this.workerScript = workerScript;
		this.poolSize = poolSize;
		this.workers = [];
		this.queue = [];
		this.init();
	}

	init() {
		for (let i = 0; i < this.poolSize; i++) {
			const worker = new Worker(this.workerScript);
			worker.busy = false;
			worker.onmessage = (e) => {
				if (worker.resolve) worker.resolve(e.data);
				worker.busy = false;
				this.processQueue();
			};
			this.workers.push(worker);
		}
	}

	execute(data) {
		return new Promise((resolve) => {
			this.queue.push({ data, resolve });
			this.processQueue();
		});
	}

	processQueue() {
		if (this.queue.length === 0) return;
		const availableWorker = this.workers.find((w) => !w.busy);
		if (!availableWorker) return;

		const { data, resolve } = this.queue.shift();
		availableWorker.busy = true;
		availableWorker.resolve = resolve;
		availableWorker.postMessage(data);
	}

	terminate() {
		this.workers.forEach((w) => w.terminate());
	}
}

// 92. Implement Lazy evaluation
class Lazy {
	constructor() {
		this.operations = [];
	}

	add(fn, ...args) {
		this.operations.push({ fn, args });
		return this;
	}

	evaluate(target) {
		return this.operations.reduce(
			(result, { fn, args }) => fn(result, ...args),
			target
		);
	}

	static range(start, end) {
		const lazy = new Lazy();
		let current = start;
		return {
			map: (fn) => {
				const result = [];
				for (let i = start; i < end; i++) {
					result.push(fn(i));
				}
				return result;
			},
			filter: (predicate) => {
				const result = [];
				for (let i = start; i < end; i++) {
					if (predicate(i)) result.push(i);
				}
				return result;
			},
			take: (n) => {
				const result = [];
				for (let i = start; i < end && result.length < n; i++) {
					result.push(i);
				}
				return result;
			},
		};
	}
}

// 93. Implement Memoization with LRU eviction
const lruMemoize = (fn, maxSize = 100) => {
	const cache = new Map();

	return (...args) => {
		const key = JSON.stringify(args);

		if (cache.has(key)) {
			const value = cache.get(key);
			cache.delete(key);
			cache.set(key, value);
			return value;
		}

		const result = fn(...args);

		if (cache.size >= maxSize) {
			const firstKey = cache.keys().next().value;
			cache.delete(firstKey);
		}

		cache.set(key, result);
		return result;
	};
};

// 94. Implement Function.prototype.bind with partial application
const advancedBind = (fn, thisArg, ...boundArgs) => {
	return function (...args) {
		const finalArgs = [];
		let boundIndex = 0;
		let argsIndex = 0;

		for (let i = 0; i < fn.length; i++) {
			if (
				boundIndex < boundArgs.length &&
				boundArgs[boundIndex] !== undefined
			) {
				finalArgs.push(boundArgs[boundIndex++]);
			} else {
				finalArgs.push(args[argsIndex++]);
			}
		}

		return fn.apply(thisArg, finalArgs.concat(args.slice(argsIndex)));
	};
};

// 95. Implement Async Iterator
const asyncRange = {
	from: 1,
	to: 5,
	[Symbol.asyncIterator]() {
		return {
			current: this.from,
			last: this.to,
			async next() {
				await new Promise((resolve) => setTimeout(resolve, 100));
				if (this.current <= this.last) {
					return { done: false, value: this.current++ };
				}
				return { done: true };
			},
		};
	},
};

// Usage: for await (let num of asyncRange) console.log(num);

// 96. Implement Generator-based coroutine
function runGenerator(genFn) {
	return new Promise((resolve, reject) => {
		const gen = genFn();

		function step(value) {
			try {
				const { value: result, done } = gen.next(value);
				if (done) {
					resolve(result);
				} else {
					Promise.resolve(result).then(step, reject);
				}
			} catch (error) {
				reject(error);
			}
		}

		step();
	});
}

// 97. Implement Proxy for validation
const createValidatingProxy = (target, schema) => {
	return new Proxy(target, {
		set(obj, prop, value) {
			if (schema[prop]) {
				const valid = schema[prop](value);
				if (!valid) throw new Error(`Invalid value for ${prop}: ${value}`);
			}
			obj[prop] = value;
			return true;
		},
	});
};

// 98. Implement Module pattern with dependency injection
const moduleSystem = (() => {
	const modules = {};
	const definitions = {};

	const define = (name, dependencies, factory) => {
		definitions[name] = { dependencies, factory };
	};

	const require = (name) => {
		if (modules[name]) return modules[name];

		const { dependencies, factory } = definitions[name];
		const deps = dependencies.map((dep) => require(dep));
		const module = factory(...deps);
		modules[name] = module;
		return module;
	};

	return { define, require };
})();

// 99. Implement Reactive system (Vue-like reactivity)
const reactive = (obj) => {
	const deps = new Map();

	const observe = (key) => {
		if (!deps.has(key)) deps.set(key, new Set());
		if (activeEffect) deps.get(key).add(activeEffect);
	};

	const notify = (key) => {
		if (deps.has(key)) {
			deps.get(key).forEach((effect) => effect());
		}
	};

	return new Proxy(obj, {
		get(target, key) {
			observe(key);
			return target[key];
		},
		set(target, key, value) {
			target[key] = value;
			notify(key);
			return true;
		},
	});
};

let activeEffect = null;

const watchEffect = (fn) => {
	activeEffect = fn;
	fn();
	activeEffect = null;
};

// 100. Implement Complete Task Scheduler with priorities
class TaskScheduler {
	constructor(concurrency = 2) {
		this.concurrency = concurrency;
		this.running = 0;
		this.queue = [];
	}

	add(task, priority = 0) {
		return new Promise((resolve, reject) => {
			this.queue.push({ task, priority, resolve, reject });
			this.queue.sort((a, b) => b.priority - a.priority);
			this.run();
		});
	}

	async run() {
		if (this.running >= this.concurrency || this.queue.length === 0) return;

		this.running++;
		const { task, resolve, reject } = this.queue.shift();

		try {
			const result = await task();
			resolve(result);
		} catch (error) {
			reject(error);
		} finally {
			this.running--;
			this.run();
		}
	}

	pause() {
		this.paused = true;
	}

	resume() {
		this.paused = false;
		this.run();
	}

	clear() {
		this.queue = [];
	}
}

/* স্ট্রিং ম্যানিপুলেশন (১০১-১২০) */

// ১০১. স্ট্রিং থেকে সব সংখ্যা বের করা
const extractNumbers = (str) => str.match(/\d+/g)?.map(Number) || [];

// ১০২. স্ট্রিং থেকে সব vowel বাদ দেওয়া
const removeVowels = (str) => str.replace(/[aeiou]/gi, "");

// ১০৩. স্ট্রিং kebab-case থেকে camelCase এ রূপান্তর
const toCamelCase = (str) =>
	str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

// ১০৪. camelCase থেকে snake_case এ রূপান্তর
const toSnakeCase = (str) =>
	str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

// ১০৫. স্ট্রিং থেকে সব special character বাদ দেওয়া
const removeSpecialChars = (str) => str.replace(/[^a-zA-Z0-9\s]/g, "");

// ১০৬. স্ট্রিং reverse করা শুধুমাত্র loop দিয়ে (built-in method ছাড়া)
const reverseStringLoop = (str) => {
	let result = "";
	for (let i = str.length - 1; i >= 0; i--) {
		result += str[i];
	}
	return result;
};

// ১০৭. স্ট্রিং palindrome check করা case-insensitive এবং space বাদ দিয়ে
const isPalindromeAdvanced = (str) => {
	const clean = str.toLowerCase().replace(/\s/g, "");
	let left = 0,
		right = clean.length - 1;
	while (left < right) {
		if (clean[left] !== clean[right]) return false;
		left++;
		right--;
	}
	return true;
};

// ১০৮. স্ট্রিং এর মধ্যে সব word এর first letter capital করা
const capitalizeFirstLetter = (str) =>
	str.replace(/\b\w/g, (char) => char.toUpperCase());

// ১০৯. স্ট্রিং থেকে duplicate word বাদ দেওয়া
const removeDuplicateWords = (str) => [...new Set(str.split(" "))].join(" ");

// ১১০. স্ট্রিং এর মধ্যে word গুলোর frequency count করা
const wordFrequency = (str) => {
	const words = str.toLowerCase().match(/\b\w+\b/g) || [];
	return words.reduce((acc, word) => {
		acc[word] = (acc[word] || 0) + 1;
		return acc;
	}, {});
};

// ১১১. স্ট্রিং থেকে HTML tags বাদ দেওয়া
const stripHtml = (str) => str.replace(/<[^>]*>/g, "");

// ১১২. স্ট্রিং এ URL validation
const isValidUrl = (str) => {
	try {
		new URL(str);
		return true;
	} catch {
		return false;
	}
};

// ১১৩. স্ট্রিং থেকে email extract করা
const extractEmails = (str) =>
	str.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];

// ১১৪. স্ট্রিং slugify করা (URL friendly করা)
const slugify = (str) =>
	str
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");

// ১১৫. স্ট্রিং থেকে সব consonant বাদ দেওয়া
const removeConsonants = (str) => str.replace(/[^aeiou\s]/gi, "");

// ১১৬. স্ট্রিং এর মধ্যে character গুলো sort করা
const sortString = (str) => str.split("").sort().join("");

// ১১৭. স্ট্রিং থেকে repeated character গুলো বের করা
const repeatedChars = (str) => {
	const charMap = {};
	const result = [];
	for (let char of str) {
		charMap[char] = (charMap[char] || 0) + 1;
		if (charMap[char] === 2) result.push(char);
	}
	return result;
};

// ১১৮. স্ট্রিং এর মধ্যে substring search করা (custom implementation)
const substringSearch = (str, sub) => {
	for (let i = 0; i <= str.length - sub.length; i++) {
		let found = true;
		for (let j = 0; j < sub.length; j++) {
			if (str[i + j] !== sub[j]) {
				found = false;
				break;
			}
		}
		if (found) return i;
	}
	return -1;
};

// ১১৯. স্ট্রিং থেকে সব whitespace বাদ দেওয়া
const removeWhitespace = (str) => str.replace(/\s/g, "");

// ১২০. স্ট্রিং এর মধ্যে word গুলো reverse করা কিন্তু word এর position same রাখা
const reverseWords = (str) =>
	str
		.split(" ")
		.map((word) => word.split("").reverse().join(""))
		.join(" ");

/* অ্যারে অ্যাডভান্সড (১২১-১৫০) */

// ১২১. অ্যারে থেকে সব falsy value বাদ দেওয়া (0, false, '', null, undefined, NaN)
const compact = (arr) => arr.filter(Boolean);

// ১২২. অ্যারে থেকে n সংখ্যক element বাদ দিয়ে বাকি গুলো নেওয়া
const drop = (arr, n = 1) => arr.slice(n);

// ১২৩. অ্যারে থেকে শেষের n সংখ্যক element বাদ দেওয়া
const dropRight = (arr, n = 1) => arr.slice(0, -n || arr.length);

// ১২৪. অ্যারে থেকে predicate অনুযায়ী element বাদ দেওয়া
const dropWhile = (arr, predicate) => {
	let index = arr.findIndex((x) => !predicate(x));
	return index === -1 ? [] : arr.slice(index);
};

// ১২৫. অ্যারে এর মধ্যে specific index এ element insert করা
const insertAt = (arr, index, ...elements) => [
	...arr.slice(0, index),
	...elements,
	...arr.slice(index),
];

// ১২৬. অ্যারে থেকে specific index এর element remove করা
const removeAt = (arr, index) => [
	...arr.slice(0, index),
	...arr.slice(index + 1),
];

// ১২৭. অ্যারে এর মধ্যে element move করা (from index to to index)
const moveElement = (arr, from, to) => {
	const result = [...arr];
	const [removed] = result.splice(from, 1);
	result.splice(to, 0, removed);
	return result;
};

// ১২৮. অ্যারে partition করা (predicate অনুযায়ী দুই ভাগে ভাগ করা)
const partition = (arr, predicate) => [
	arr.filter(predicate),
	arr.filter((x) => !predicate(x)),
];

// ১২৯. অ্যারে থেকে n সংখ্যক smallest element বের করা
const smallestN = (arr, n) => [...arr].sort((a, b) => a - b).slice(0, n);

// ১৩০. অ্যারে থেকে n সংখ্যক largest element বের করা
const largestN = (arr, n) => [...arr].sort((a, b) => b - a).slice(0, n);

// ১৩১. অ্যারে এর মধ্যে running sum বের করা
const runningSum = (arr) => {
	let sum = 0;
	return arr.map((x) => (sum += x));
};

// ১৩২. অ্যারে এর মধ্যে running average বের করা
const runningAverage = (arr) => {
	let sum = 0;
	return arr.map((x, i) => (sum += x) / (i + 1));
};

// ১৩৩. অ্যারে এর মধ্যে consecutive duplicate গুলো বাদ দেওয়া
const uniqueConsecutive = (arr) =>
	arr.filter((x, i) => i === 0 || x !== arr[i - 1]);

// ১৩৪. অ্যারে এর মধ্যে element গুলোর rank বের করা
const ranks = (arr) => {
	const sorted = [...new Set(arr)].sort((a, b) => b - a);
	return arr.map((x) => sorted.indexOf(x) + 1);
};

// ১৩৫. অ্যারে shuffle করা (Fisher-Yates algorithm)
const shuffle = (arr) => {
	const result = [...arr];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
};

// ১৩৬. অ্যারে এর মধ্যে subarray বের করা যার sum target এর সমান
const subarraySum = (arr, target) => {
	const map = new Map([[0, -1]]);
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
		if (map.has(sum - target)) {
			return arr.slice(map.get(sum - target) + 1, i + 1);
		}
		map.set(sum, i);
	}
	return null;
};

// ১৩৭. অ্যারে এর মধ্যে maximum subarray sum বের করা (Kadane's algorithm)
const maxSubarraySum = (arr) => {
	let maxSoFar = arr[0],
		maxEndingHere = arr[0];
	for (let i = 1; i < arr.length; i++) {
		maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
		maxSoFar = Math.max(maxSoFar, maxEndingHere);
	}
	return maxSoFar;
};

// ১৩৮. অ্যারে এর মধ্যে product of all other elements (without division)
const productExceptSelf = (arr) => {
	const result = new Array(arr.length).fill(1);
	let left = 1,
		right = 1;

	for (let i = 0; i < arr.length; i++) {
		result[i] *= left;
		left *= arr[i];
	}

	for (let i = arr.length - 1; i >= 0; i--) {
		result[i] *= right;
		right *= arr[i];
	}

	return result;
};

// ১৩৯. অ্যারে এর মধ্যে next greater element বের করা
const nextGreaterElement = (arr) => {
	const result = new Array(arr.length).fill(-1);
	const stack = [];
	for (let i = 0; i < arr.length; i++) {
		while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
			result[stack.pop()] = arr[i];
		}
		stack.push(i);
	}
	return result;
};

// ১৪০. অ্যারে এর মধ্যে trapping rain water বের করা
const trapRainWater = (height) => {
	let left = 0,
		right = height.length - 1;
	let leftMax = 0,
		rightMax = 0,
		water = 0;

	while (left < right) {
		if (height[left] < height[right]) {
			height[left] >= leftMax ?
				(leftMax = height[left])
			:	(water += leftMax - height[left]);
			left++;
		} else {
			height[right] >= rightMax ?
				(rightMax = height[right])
			:	(water += rightMax - height[right]);
			right--;
		}
	}
	return water;
};

// ১৪১. অ্যারে rotate করা k বার (in-place)
const rotateInPlace = (arr, k) => {
	k = k % arr.length;
	const reverse = (start, end) => {
		while (start < end) {
			[arr[start], arr[end]] = [arr[end], arr[start]];
			start++;
			end--;
		}
	};
	reverse(0, arr.length - 1);
	reverse(0, k - 1);
	reverse(k, arr.length - 1);
	return arr;
};

// ১৪২. অ্যারে এর মধ্যে majority element বের করা (Boyer-Moore Voting)
const majorityElement = (arr) => {
	let candidate = null,
		count = 0;
	for (let num of arr) {
		if (count === 0) candidate = num;
		count += num === candidate ? 1 : -1;
	}
	return candidate;
};

// ১৪৩. অ্যারে এর মধ্যে peak element বের করা (binary search)
const findPeakElement = (arr) => {
	let left = 0,
		right = arr.length - 1;
	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] > arr[mid + 1]) right = mid;
		else left = mid + 1;
	}
	return left;
};

// ১৪৪. অ্যারে এর মধ্যে first and last position of target বের করা
const searchRange = (arr, target) => {
	const findBound = (isFirst) => {
		let left = 0,
			right = arr.length - 1,
			bound = -1;
		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			if (arr[mid] === target) {
				bound = mid;
				isFirst ? (right = mid - 1) : (left = mid + 1);
			} else if (arr[mid] < target) left = mid + 1;
			else right = mid - 1;
		}
		return bound;
	};
	return [findBound(true), findBound(false)];
};

// ১৪৫. অ্যারে এর মধ্যে k closest elements to x বের করা
const findClosestElements = (arr, k, x) => {
	let left = 0,
		right = arr.length - k;
	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (x - arr[mid] > arr[mid + k] - x) left = mid + 1;
		else right = mid;
	}
	return arr.slice(left, left + k);
};

// ১৪৬. অ্যারে এর মধ্যে median of two sorted arrays বের করা
const findMedianSortedArrays = (nums1, nums2) => {
	if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
	const m = nums1.length,
		n = nums2.length;
	let left = 0,
		right = m;

	while (left <= right) {
		const partitionX = Math.floor((left + right) / 2);
		const partitionY = Math.floor((m + n + 1) / 2) - partitionX;

		const maxX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
		const minX = partitionX === m ? Infinity : nums1[partitionX];
		const maxY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
		const minY = partitionY === n ? Infinity : nums2[partitionY];

		if (maxX <= minY && maxY <= minX) {
			if ((m + n) % 2 === 0)
				return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
			return Math.max(maxX, maxY);
		} else if (maxX > minY) right = partitionX - 1;
		else left = partitionX + 1;
	}
};

// ১৪৭. অ্যারে এর মধ্যে longest increasing subsequence বের করা
const lengthOfLIS = (arr) => {
	const tails = [];
	for (let num of arr) {
		let left = 0,
			right = tails.length;
		while (left < right) {
			const mid = Math.floor((left + right) / 2);
			if (tails[mid] < num) left = mid + 1;
			else right = mid;
		}
		tails[left] = num;
	}
	return tails.length;
};

// ১৪৮. অ্যারে এর মধ্যে maximum product subarray বের করা
const maxProductSubarray = (arr) => {
	let maxSoFar = arr[0],
		minSoFar = arr[0],
		result = arr[0];
	for (let i = 1; i < arr.length; i++) {
		const temp = maxSoFar;
		maxSoFar = Math.max(arr[i], maxSoFar * arr[i], minSoFar * arr[i]);
		minSoFar = Math.min(arr[i], temp * arr[i], minSoFar * arr[i]);
		result = Math.max(result, maxSoFar);
	}
	return result;
};

// ১৪৯. অ্যারে এর মধ্যে container with most water বের করা
const maxArea = (height) => {
	let left = 0,
		right = height.length - 1,
		maxWater = 0;
	while (left < right) {
		const width = right - left;
		const h = Math.min(height[left], height[right]);
		maxWater = Math.max(maxWater, width * h);
		height[left] < height[right] ? left++ : right--;
	}
	return maxWater;
};

// ১৫০. অ্যারে এর মধ্যে 3sum problem solve করা
const threeSum = (arr) => {
	const result = [];
	arr.sort((a, b) => a - b);
	for (let i = 0; i < arr.length - 2; i++) {
		if (i > 0 && arr[i] === arr[i - 1]) continue;
		let left = i + 1,
			right = arr.length - 1;
		while (left < right) {
			const sum = arr[i] + arr[left] + arr[right];
			if (sum === 0) {
				result.push([arr[i], arr[left], arr[right]]);
				while (left < right && arr[left] === arr[left + 1]) left++;
				while (left < right && arr[right] === arr[right - 1]) right--;
				left++;
				right--;
			} else if (sum < 0) left++;
			else right--;
		}
	}
	return result;
};

/* অবজেক্ট অ্যাডভান্সড (১৫১-১৭০) */

// ১৫১. অবজেক্ট থেকে সব null/undefined value বাদ দেওয়া
const removeNullValues = (obj) =>
	Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

// ১৫২. অবজেক্ট এর সব keys camelCase এ রূপান্তর করা
const keysToCamelCase = (obj) => {
	const toCamel = (str) =>
		str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
	return Object.fromEntries(
		Object.entries(obj).map(([k, v]) => [toCamel(k), v])
	);
};

// ১৫৩. অবজেক্ট এর সব values uppercase করা
const valuesToUpperCase = (obj) =>
	Object.fromEntries(
		Object.entries(obj).map(([k, v]) => [
			k,
			typeof v === "string" ? v.toUpperCase() : v,
		])
	);

// ১৫৪. অবজেক্ট এর মধ্যে nested object কে flatten করা (dot notation)
const flattenObjectDeep = (obj, prefix = "") =>
	Object.entries(obj).reduce((acc, [k, v]) => {
		const newKey = prefix ? `${prefix}.${k}` : k;
		if (typeof v === "object" && v !== null && !Array.isArray(v)) {
			Object.assign(acc, flattenObjectDeep(v, newKey));
		} else {
			acc[newKey] = v;
		}
		return acc;
	}, {});

// ১৫৫. flattened object কে nested object এ রূপান্তর করা
const unflattenObjectDeep = (obj) =>
	Object.entries(obj).reduce((acc, [k, v]) => {
		const keys = k.split(".");
		keys.reduce((a, key, i) => {
			if (i === keys.length - 1) a[key] = v;
			else a[key] = a[key] || {};
			return a[key];
		}, acc);
		return acc;
	}, {});

// ১৫৬. অবজেক্ট এর মধ্যে সব date string কে Date object এ রূপান্তর করা
const parseDates = (obj) => {
	const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
	return Object.fromEntries(
		Object.entries(obj).map(([k, v]) => [
			k,
			typeof v === "string" && dateRegex.test(v) ? new Date(v) : v,
		])
	);
};

// ১৫৭. অবজেক্ট এর মধ্যে specific path এ value set করা
const setByPath = (obj, path, value) => {
	const keys = path.split(".");
	let current = obj;
	for (let i = 0; i < keys.length - 1; i++) {
		if (!current[keys[i]]) current[keys[i]] = {};
		current = current[keys[i]];
	}
	current[keys[keys.length - 1]] = value;
	return obj;
};

// ১৫৮. অবজেক্ট এর মধ্যে specific path এ value delete করা
const deleteByPath = (obj, path) => {
	const keys = path.split(".");
	let current = obj;
	for (let i = 0; i < keys.length - 1; i++) {
		if (!current[keys[i]]) return false;
		current = current[keys[i]];
	}
	delete current[keys[keys.length - 1]];
	return true;
};

// ১৫৯. অবজেক্ট এর মধ্যে সব keys sort করা recursively
const sortKeys = (obj) => {
	if (Array.isArray(obj)) return obj.map(sortKeys);
	if (typeof obj !== "object" || obj === null) return obj;
	return Object.keys(obj)
		.sort()
		.reduce((acc, key) => {
			acc[key] = sortKeys(obj[key]);
			return acc;
		}, {});
};

// ১৬০. অবজেক্ট এর মধ্যে reference check করা (circular reference detection)
const hasCircularReference = (obj) => {
	const seen = new WeakSet();
	const detect = (o) => {
		if (o === null || typeof o !== "object") return false;
		if (seen.has(o)) return true;
		seen.add(o);
		return Object.values(o).some(detect);
	};
	return detect(obj);
};

// ১৬১. অবজেক্ট clone করা (handling circular references)
const deepCloneWithCycles = (obj) => {
	const cache = new WeakMap();
	const clone = (o) => {
		if (o === null || typeof o !== "object") return o;
		if (cache.has(o)) return cache.get(o);
		const result = Array.isArray(o) ? [] : {};
		cache.set(o, result);
		Object.entries(o).forEach(([k, v]) => (result[k] = clone(v)));
		return result;
	};
	return clone(obj);
};

// ১৬২. অবজেক্ট এর মধ্যে function গুলোর list বের করা
const getAllMethods = (obj) =>
	Object.getOwnPropertyNames(obj).filter(
		(key) => typeof obj[key] === "function"
	);

// ১৬৩. অবজেক্ট এর prototype chain বের করা
const getPrototypeChain = (obj) => {
	const chain = [];
	let current = obj;
	while (current) {
		chain.push(current.constructor?.name || "null");
		current = Object.getPrototypeOf(current);
	}
	return chain;
};

// ১৬৪. অবজেক্ট এর মধ্যে read-only property set করা
const freezeProperty = (obj, prop) => {
	Object.defineProperty(obj, prop, { writable: false });
	return obj;
};

// ১৬৫. অবজেক্ট এর মধ্যে private property simulation (closure)
const createPrivateObject = () => {
	const privateData = {};
	return {
		set: (key, value) => {
			privateData[key] = value;
		},
		get: (key) => privateData[key],
		has: (key) => key in privateData,
	};
};

// ১৬৬. অবজেক্ট এর মধ্যে computed property name দিয়ে dynamic key creation
const createDynamicObject = (keys, values) =>
	Object.fromEntries(keys.map((k, i) => [k, values[i]]));

// ১৬৭. অবজেক্ট এর মধ্যে getter/setter দিয়ে validation
const createValidatedObject = (schema) => {
	const data = {};
	return new Proxy(data, {
		set(target, prop, value) {
			if (schema[prop] && !schema[prop](value)) {
				throw new Error(`Invalid value for ${prop}: ${value}`);
			}
			target[prop] = value;
			return true;
		},
	});
};

// ১৬৮. অবজেক্ট এর মধ্যে method chaining support করা
class Chainable {
	constructor() {
		this.value = 0;
	}
	add(n) {
		this.value += n;
		return this;
	}
	subtract(n) {
		this.value -= n;
		return this;
	}
	multiply(n) {
		this.value *= n;
		return this;
	}
	getValue() {
		return this.value;
	}
}

// ১৬৯. অবজেক্ট এর মধ্যে event emitter pattern
const createEventEmitter = () => ({
	events: {},
	on(event, handler) {
		(this.events[event] = this.events[event] || []).push(handler);
		return () => this.off(event, handler);
	},
	off(event, handler) {
		this.events[event] = (this.events[event] || []).filter(
			(h) => h !== handler
		);
	},
	emit(event, data) {
		(this.events[event] || []).forEach((h) => h(data));
	},
});

// ১৭০. অবজেক্ট এর মধ্যে observer pattern (reactive)
const createReactiveObject = (obj, onChange) =>
	new Proxy(obj, {
		set(target, prop, value) {
			const oldValue = target[prop];
			target[prop] = value;
			onChange(prop, value, oldValue);
			return true;
		},
	});

/* ফাংশন অ্যাডভান্সড (১৭১-১৯০) */

// ১৭১. Function composition (right to left)
const composeRight =
	(...fns) =>
	(x) =>
		fns.reduceRight((v, f) => f(v), x);

// ১৭২. Function composition with arity check
const composeSafe =
	(...fns) =>
	(x) =>
		fns.reduceRight((v, f, i) => {
			if (i === 0) return f(v);
			if (typeof v !== "number") throw new Error("Type mismatch");
			return f(v);
		}, x);

// ১৭৩. Partial application with placeholder support
const partialWithPlaceholder = (fn, ...args) => {
	const placeholder = Symbol("placeholder");
	return (...newArgs) => {
		let argIndex = 0;
		const finalArgs = args.map((arg) =>
			arg === placeholder ? newArgs[argIndex++] : arg
		);
		return fn(...finalArgs, ...newArgs.slice(argIndex));
	};
};

// ১৭৪. Currying with variadic functions
const curryVariadic = (fn) => {
	const curried = (...args) =>
		args.length >= fn.length ?
			fn(...args)
		:	(...next) => curried(...args, ...next);
	return curried;
};

// ১৭৫. Function memoization with custom key generator
const memoizeWith = (fn, keyGen) => {
	const cache = new Map();
	return (...args) => {
		const key = keyGen(...args);
		if (cache.has(key)) return cache.get(key);
		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
};

// ১৭৬. Function retry with exponential backoff
const retryWithBackoff =
	(fn, maxRetries = 3, baseDelay = 1000) =>
	async (...args) => {
		for (let i = 0; i < maxRetries; i++) {
			try {
				return await fn(...args);
			} catch (e) {
				if (i === maxRetries - 1) throw e;
				await new Promise((r) => setTimeout(r, baseDelay * Math.pow(2, i)));
			}
		}
	};

// ১৭৭. Function timeout wrapper
const withTimeout =
	(fn, ms) =>
	(...args) =>
		Promise.race([
			fn(...args),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error("Timeout")), ms)
			),
		]);

// ১৭৮. Function rate limiting (token bucket)
const createRateLimiter = (maxRequests, windowMs) => {
	let tokens = maxRequests;
	let lastRefill = Date.now();

	return (fn) =>
		(...args) => {
			const now = Date.now();
			const timePassed = now - lastRefill;
			tokens = Math.min(
				maxRequests,
				tokens + timePassed * (maxRequests / windowMs)
			);
			lastRefill = now;

			if (tokens < 1) throw new Error("Rate limit exceeded");
			tokens--;
			return fn(...args);
		};
};

// ১৭৯. Function debounce with immediate option
const debounceAdvanced = (fn, wait, immediate = false) => {
	let timeout;
	return function (...args) {
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			if (!immediate) fn.apply(this, args);
		}, wait);
		if (callNow) fn.apply(this, args);
	};
};

// ১৮০. Function throttle with cancel option
const throttleWithCancel = (fn, limit) => {
	let inThrottle, timeout;
	const throttled = function (...args) {
		if (!inThrottle) {
			fn.apply(this, args);
			inThrottle = true;
			timeout = setTimeout(() => (inThrottle = false), limit);
		}
	};
	throttled.cancel = () => clearTimeout(timeout);
	return throttled;
};

// ১৮১. Function once with reset capability
const onceWithReset = (fn) => {
	let called = false,
		result;
	const onceFn = function (...args) {
		if (!called) {
			called = true;
			result = fn.apply(this, args);
		}
		return result;
	};
	onceFn.reset = () => {
		called = false;
	};
	return onceFn;
};

// ১৮২. Function memoization with LRU cache
const memoizeLRU = (fn, maxSize = 100) => {
	const cache = new Map();
	return (...args) => {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			const value = cache.get(key);
			cache.delete(key);
			cache.set(key, value);
			return value;
		}
		const result = fn(...args);
		if (cache.size >= maxSize) {
			cache.delete(cache.keys().next().value);
		}
		cache.set(key, result);
		return result;
	};
};

// ১৮৩. Function instrumentation (performance monitoring)
const withPerformance = (fn, name) => {
	return function (...args) {
		const start = performance.now();
		const result = fn.apply(this, args);
		const duration = performance.now() - start;
		console.log(`${name} took ${duration.toFixed(2)}ms`);
		return result;
	};
};

// ১৮৪. Function error recovery (fallback)
const withFallback =
	(fn, fallback) =>
	(...args) => {
		try {
			return fn(...args);
		} catch (e) {
			return typeof fallback === "function" ? fallback(e) : fallback;
		}
	};

// ১৮৫. Function validation (input/output)
const withValidation =
	(fn, inputSchema, outputSchema) =>
	(...args) => {
		if (inputSchema && !inputSchema(args)) throw new Error("Invalid input");
		const result = fn(...args);
		if (outputSchema && !outputSchema(result))
			throw new Error("Invalid output");
		return result;
	};

// ১৮৬. Function batching (collect calls and execute together)
const createBatcher = (fn, delay = 100) => {
	let batch = [];
	let timeout;
	return (item) => {
		batch.push(item);
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn([...batch]);
			batch = [];
		}, delay);
		return batch.length;
	};
};

// ১৮৭. Function caching with TTL (time to live)
const memoizeWithTTL = (fn, ttlMs = 60000) => {
	const cache = new Map();
	return (...args) => {
		const key = JSON.stringify(args);
		const cached = cache.get(key);
		if (cached && Date.now() - cached.time < ttlMs) return cached.value;
		const result = fn(...args);
		cache.set(key, { value: result, time: Date.now() });
		return result;
	};
};

// ১৮৮. Function pipeline with error handling
const createPipeline =
	(...fns) =>
	(input) => {
		return fns.reduce((result, fn) => {
			if (result instanceof Error) return result;
			try {
				return fn(result);
			} catch (e) {
				return e;
			}
		}, input);
	};

// ১৮৯. Function memoization with WeakMap (for object arguments)
const memoizeWeak = (fn) => {
	const cache = new WeakMap();
	return (arg) => {
		if (!cache.has(arg)) cache.set(arg, fn(arg));
		return cache.get(arg);
	};
};

// ১৯০. Function async retry with jitter
const retryWithJitter =
	(fn, maxRetries = 3, baseDelay = 1000) =>
	async (...args) => {
		for (let i = 0; i < maxRetries; i++) {
			try {
				return await fn(...args);
			} catch (e) {
				if (i === maxRetries - 1) throw e;
				const jitter = Math.random() * baseDelay;
				await new Promise((r) =>
					setTimeout(r, baseDelay * Math.pow(2, i) + jitter)
				);
			}
		}
	};

/* অ্যাসিঙ্ক্রোনাস অপারেশনস (১৯১-২০০) */

// ১৯১. Custom Promise implementation (simplified)
class MyPromise {
	constructor(executor) {
		this.state = "pending";
		this.value = undefined;
		this.handlers = [];

		const resolve = (value) => {
			if (this.state === "pending") {
				this.state = "fulfilled";
				this.value = value;
				this.handlers.forEach((h) => h.onFulfilled(value));
			}
		};

		const reject = (reason) => {
			if (this.state === "pending") {
				this.state = "rejected";
				this.value = reason;
				this.handlers.forEach((h) => h.onRejected(reason));
			}
		};

		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}

	then(onFulfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			if (this.state === "fulfilled") {
				try {
					resolve(onFulfilled(this.value));
				} catch (e) {
					reject(e);
				}
			} else if (this.state === "rejected") {
				if (onRejected) {
					try {
						resolve(onRejected(this.value));
					} catch (e) {
						reject(e);
					}
				} else {
					reject(this.value);
				}
			} else {
				this.handlers.push({
					onFulfilled: (v) => {
						try {
							resolve(onFulfilled(v));
						} catch (e) {
							reject(e);
						}
					},
					onRejected: (r) => {
						if (onRejected) {
							try {
								resolve(onRejected(r));
							} catch (e) {
								reject(e);
							}
						} else {
							reject(r);
						}
					},
				});
			}
		});
	}
}

// ১৯২. Promise.allSettled polyfill
const promiseAllSettled = (promises) =>
	Promise.all(
		promises.map((p) =>
			Promise.resolve(p).then(
				(value) => ({ status: "fulfilled", value }),
				(reason) => ({ status: "rejected", reason })
			)
		)
	);

// ১৯৩. Promise.any polyfill
const promiseAny = (promises) =>
	new Promise((resolve, reject) => {
		const errors = [];
		let remaining = promises.length;
		promises.forEach((p, i) =>
			Promise.resolve(p).then(resolve, (err) => {
				errors[i] = err;
				if (--remaining === 0)
					reject(new AggregateError(errors, "All rejected"));
			})
		);
	});

// ১৯৪. Async generator for paginated API
async function* paginatedAPI(url, limit = 10) {
	let page = 1,
		hasMore = true;
	while (hasMore) {
		const response = await fetch(`${url}?page=${page}&limit=${limit}`);
		const data = await response.json();
		yield data.items;
		hasMore = data.hasMore;
		page++;
	}
}

// ১৯৫. Concurrent task limiter (semaphore pattern)
const createSemaphore = (maxConcurrent) => {
	let running = 0;
	const queue = [];
	return (fn) =>
		async (...args) => {
			if (running >= maxConcurrent) {
				await new Promise((resolve) => queue.push(resolve));
			}
			running++;
			try {
				return await fn(...args);
			} finally {
				running--;
				if (queue.length) queue.shift()();
			}
		};
};

// ১৯৬. Async queue with priority
class AsyncPriorityQueue {
	constructor() {
		this.queue = [];
	}

	add(task, priority = 0) {
		return new Promise((resolve, reject) => {
			this.queue.push({ task, priority, resolve, reject });
			this.queue.sort((a, b) => b.priority - a.priority);
			this.process();
		});
	}

	async process() {
		if (this.processing || !this.queue.length) return;
		this.processing = true;
		const { task, resolve, reject } = this.queue.shift();
		try {
			resolve(await task());
		} catch (e) {
			reject(e);
		}
		this.processing = false;
		this.process();
	}
}

// ১৯৭. Debounce for async functions
const asyncDebounce = (fn, wait) => {
	let timeout;
	return async (...args) => {
		clearTimeout(timeout);
		return new Promise((resolve) => {
			timeout = setTimeout(async () => {
				resolve(await fn(...args));
			}, wait);
		});
	};
};

// ১৯৮. Timeout for promises
const promiseTimeout = (promise, ms) =>
	Promise.race([
		promise,
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error("Timeout")), ms)
		),
	]);

// ১৯৯. Retry with exponential backoff and max delay cap
const retryWithCap =
	(fn, maxRetries = 5, baseDelay = 1000, maxDelay = 30000) =>
	async (...args) => {
		for (let i = 0; i < maxRetries; i++) {
			try {
				return await fn(...args);
			} catch (e) {
				if (i === maxRetries - 1) throw e;
				const delay = Math.min(baseDelay * Math.pow(2, i), maxDelay);
				await new Promise((r) => setTimeout(r, delay));
			}
		}
	};

// ২০০. Async waterfall (sequential execution with result passing)
const asyncWaterfall = (tasks, initialValue) =>
	tasks.reduce(
		(promise, task) => promise.then(task),
		Promise.resolve(initialValue)
	);

/* ডিজাইন প্যাটার্নস (২০১-২২০) */

// ২০১. Singleton Pattern
const Singleton = (function () {
	let instance;
	function createInstance() {
		return { data: Math.random() };
	}
	return {
		getInstance: () => {
			if (!instance) instance = createInstance();
			return instance;
		},
	};
})();

// ২০২. Factory Pattern
class AnimalFactory {
	create(type) {
		const animals = {
			dog: () => ({ speak: () => "Woof!" }),
			cat: () => ({ speak: () => "Meow!" }),
			cow: () => ({ speak: () => "Moo!" }),
		};
		return animals[type]?.() || null;
	}
}

// ২০৩. Abstract Factory Pattern
class UIFactory {
	createButton() {
		throw new Error("Abstract method");
	}
	createCheckbox() {
		throw new Error("Abstract method");
	}
}
class WindowsFactory extends UIFactory {
	createButton() {
		return { render: () => "Windows Button" };
	}
	createCheckbox() {
		return { render: () => "Windows Checkbox" };
	}
}
class MacFactory extends UIFactory {
	createButton() {
		return { render: () => "Mac Button" };
	}
	createCheckbox() {
		return { render: () => "Mac Checkbox" };
	}
}

// ২০৪. Builder Pattern
class PizzaBuilder {
	constructor() {
		this.pizza = {};
	}
	setSize(size) {
		this.pizza.size = size;
		return this;
	}
	setCrust(crust) {
		this.pizza.crust = crust;
		return this;
	}
	addTopping(topping) {
		this.pizza.toppings = this.pizza.toppings || [];
		this.pizza.toppings.push(topping);
		return this;
	}
	build() {
		return this.pizza;
	}
}

// ২০৫. Prototype Pattern
const carPrototype = {
	init(make) {
		this.make = make;
		return this;
	},
	drive() {
		return `${this.make} is driving`;
	},
};
const createCar = (make) => Object.create(carPrototype).init(make);

// ২০৬. Adapter Pattern
class OldAPI {
	specificRequest() {
		return "Old data format";
	}
}
class Adapter {
	constructor(oldAPI) {
		this.oldAPI = oldAPI;
	}
	request() {
		const data = this.oldAPI.specificRequest();
		return { converted: data, timestamp: Date.now() };
	}
}

// ২০৭. Decorator Pattern
const withLogging =
	(fn) =>
	(...args) => {
		console.log(`Calling with ${args}`);
		const result = fn(...args);
		console.log(`Result: ${result}`);
		return result;
	};

// ২০৮. Facade Pattern
class ComputerFacade {
	constructor() {
		this.cpu = new CPU();
		this.memory = new Memory();
		this.hardDrive = new HardDrive();
	}
	start() {
		this.cpu.freeze();
		this.memory.load(0, this.hardDrive.read(0, 1024));
		this.cpu.jump(0);
		this.cpu.execute();
	}
}

// ২০৯. Proxy Pattern (access control)
const createSecurityProxy = (obj, allowedKeys) =>
	new Proxy(obj, {
		get(target, key) {
			if (!allowedKeys.includes(key)) throw new Error("Access denied");
			return target[key];
		},
	});

// ২১০. Command Pattern
class Command {
	constructor(execute, undo) {
		this.execute = execute;
		this.undo = undo;
	}
}
const createAddCommand = (receiver, value) =>
	new Command(
		() => receiver.add(value),
		() => receiver.remove(value)
	);

// ২১১. Iterator Pattern
class RangeIterator {
	constructor(start, end) {
		this.current = start;
		this.end = end;
	}
	next() {
		if (this.current < this.end) {
			return { value: this.current++, done: false };
		}
		return { done: true };
	}
	[Symbol.iterator]() {
		return this;
	}
}

// ২১২. Observer Pattern (Pub-Sub)
class Subject {
	constructor() {
		this.observers = [];
	}
	subscribe(observer) {
		this.observers.push(observer);
	}
	unsubscribe(observer) {
		this.observers = this.observers.filter((o) => o !== observer);
	}
	notify(data) {
		this.observers.forEach((o) => o.update(data));
	}
}

// ২১৩. Strategy Pattern
const strategies = {
	bubble: (arr) => {
		/* bubble sort */ return arr;
	},
	quick: (arr) => {
		/* quick sort */ return arr;
	},
	merge: (arr) => {
		/* merge sort */ return arr;
	},
};
const sortContext = (strategy) => ({
	execute: (data) => strategies[strategy]([...data]),
});

// ২১৪. Template Method Pattern
class DataParser {
	parse(data) {
		const cleaned = this.clean(data);
		const validated = this.validate(cleaned);
		return this.transform(validated);
	}
	clean(data) {
		return data.trim();
	}
	validate(data) {
		return data.length > 0;
	}
	transform(data) {
		throw new Error("Must implement");
	}
}

// ২১৫. Chain of Responsibility Pattern
class Handler {
	setNext(handler) {
		this.next = handler;
		return handler;
	}
	handle(request) {
		if (this.next) return this.next.handle(request);
		return null;
	}
}
class AuthHandler extends Handler {
	handle(request) {
		if (!request.authenticated) throw new Error("Not authenticated");
		return super.handle(request);
	}
}

// ২১৬. State Pattern
class TrafficLight {
	constructor() {
		this.states = {
			red: { next: "green", duration: 30000 },
			yellow: { next: "red", duration: 5000 },
			green: { next: "yellow", duration: 30000 },
		};
		this.current = "red";
	}
	change() {
		this.current = this.states[this.current].next;
		return this.current;
	}
}

// ২১৭. Bridge Pattern
class Renderer {
	renderCircle(radius) {
		throw new Error("Abstract");
	}
}
class SVGRenderer extends Renderer {
	renderCircle(radius) {
		return `<circle r="${radius}"/>`;
	}
}
class CanvasRenderer extends Renderer {
	renderCircle(radius) {
		return `Canvas circle with r=${radius}`;
	}
}
class Shape {
	constructor(renderer) {
		this.renderer = renderer;
	}
	draw() {
		throw new Error("Abstract");
	}
}

// ২১৮. Composite Pattern
class Component {
	getPrice() {
		throw new Error("Abstract");
	}
}
class Product extends Component {
	constructor(price) {
		super();
		this.price = price;
	}
	getPrice() {
		return this.price;
	}
}
class Box extends Component {
	constructor() {
		super();
		this.children = [];
	}
	add(component) {
		this.children.push(component);
	}
	getPrice() {
		return this.children.reduce((sum, c) => sum + c.getPrice(), 0);
	}
}

// ২১৯. Flyweight Pattern
class FlyweightFactory {
	constructor() {
		this.cache = new Map();
	}
	get(key) {
		if (!this.cache.has(key)) {
			this.cache.set(key, { heavyData: `Data for ${key}` });
		}
		return this.cache.get(key);
	}
}

// ২২০. Mediator Pattern
class ChatRoom {
	constructor() {
		this.users = [];
	}
	register(user) {
		user.room = this;
		this.users.push(user);
	}
	send(message, from, to) {
		if (to) to.receive(message, from);
		else this.users.forEach((u) => u !== from && u.receive(message, from));
	}
}

/* ডেটা স্ট্রাকচার অ্যাডভান্সড (২২১-২৫০) */

// ২২১. Trie (Prefix Tree)
class TrieNode {
	constructor() {
		this.children = new Map();
		this.isEnd = false;
	}
}
class Trie {
	constructor() {
		this.root = new TrieNode();
	}

	insert(word) {
		let node = this.root;
		for (let char of word) {
			if (!node.children.has(char)) {
				node.children.set(char, new TrieNode());
			}
			node = node.children.get(char);
		}
		node.isEnd = true;
	}

	search(word) {
		let node = this.root;
		for (let char of word) {
			if (!node.children.has(char)) return false;
			node = node.children.get(char);
		}
		return node.isEnd;
	}

	startsWith(prefix) {
		let node = this.root;
		for (let char of prefix) {
			if (!node.children.has(char)) return false;
			node = node.children.get(char);
		}
		return true;
	}

	// ২২২. Auto-complete suggestions
	getSuggestions(prefix) {
		let node = this.root;
		for (let char of prefix) {
			if (!node.children.has(char)) return [];
			node = node.children.get(char);
		}
		return this._collectWords(node, prefix);
	}

	_collectWords(node, prefix) {
		const words = [];
		if (node.isEnd) words.push(prefix);
		for (let [char, child] of node.children) {
			words.push(...this._collectWords(child, prefix + char));
		}
		return words;
	}
}

// ২২৩. Segment Tree
class SegmentTree {
	constructor(arr) {
		this.n = arr.length;
		this.tree = new Array(4 * this.n).fill(0);
		this.build(arr, 0, 0, this.n - 1);
	}

	build(arr, node, start, end) {
		if (start === end) {
			this.tree[node] = arr[start];
		} else {
			const mid = Math.floor((start + end) / 2);
			this.build(arr, 2 * node + 1, start, mid);
			this.build(arr, 2 * node + 2, mid + 1, end);
			this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
		}
	}

	query(node, start, end, left, right) {
		if (right < start || left > end) return 0;
		if (left <= start && end <= right) return this.tree[node];
		const mid = Math.floor((start + end) / 2);
		return (
			this.query(2 * node + 1, start, mid, left, right) +
			this.query(2 * node + 2, mid + 1, end, left, right)
		);
	}

	update(node, start, end, idx, val) {
		if (start === end) {
			this.tree[node] = val;
		} else {
			const mid = Math.floor((start + end) / 2);
			if (idx <= mid) this.update(2 * node + 1, start, mid, idx, val);
			else this.update(2 * node + 2, mid + 1, end, idx, val);
			this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
		}
	}
}

// ২২৪. Fenwick Tree (Binary Indexed Tree)
class FenwickTree {
	constructor(n) {
		this.n = n;
		this.tree = new Array(n + 1).fill(0);
	}

	update(i, delta) {
		while (i <= this.n) {
			this.tree[i] += delta;
			i += i & -i;
		}
	}

	query(i) {
		let sum = 0;
		while (i > 0) {
			sum += this.tree[i];
			i -= i & -i;
		}
		return sum;
	}

	rangeQuery(left, right) {
		return this.query(right) - this.query(left - 1);
	}
}

// ২২৫. Disjoint Set Union (Union-Find)
class DSU {
	constructor(n) {
		this.parent = Array.from({ length: n }, (_, i) => i);
		this.rank = new Array(n).fill(0);
		this.size = new Array(n).fill(1);
	}

	find(x) {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x]); // Path compression
		}
		return this.parent[x];
	}

	union(x, y) {
		const px = this.find(x),
			py = this.find(y);
		if (px === py) return false;

		// Union by rank
		if (this.rank[px] < this.rank[py]) {
			this.parent[px] = py;
			this.size[py] += this.size[px];
		} else if (this.rank[px] > this.rank[py]) {
			this.parent[py] = px;
			this.size[px] += this.size[py];
		} else {
			this.parent[py] = px;
			this.rank[px]++;
			this.size[px] += this.size[py];
		}
		return true;
	}

	connected(x, y) {
		return this.find(x) === this.find(y);
	}
	getSize(x) {
		return this.size[this.find(x)];
	}
}

// ২২৬. Min Heap
class MinHeap {
	constructor() {
		this.heap = [];
	}

	parent(i) {
		return Math.floor((i - 1) / 2);
	}
	left(i) {
		return 2 * i + 1;
	}
	right(i) {
		return 2 * i + 2;
	}

	insert(val) {
		this.heap.push(val);
		this._heapifyUp(this.heap.length - 1);
	}

	extractMin() {
		if (this.heap.length === 0) return null;
		if (this.heap.length === 1) return this.heap.pop();

		const min = this.heap[0];
		this.heap[0] = this.heap.pop();
		this._heapifyDown(0);
		return min;
	}

	_heapifyUp(i) {
		while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
			[this.heap[i], this.heap[this.parent(i)]] = [
				this.heap[this.parent(i)],
				this.heap[i],
			];
			i = this.parent(i);
		}
	}

	_heapifyDown(i) {
		let minIdx = i;
		const l = this.left(i),
			r = this.right(i);

		if (l < this.heap.length && this.heap[l] < this.heap[minIdx]) minIdx = l;
		if (r < this.heap.length && this.heap[r] < this.heap[minIdx]) minIdx = r;

		if (minIdx !== i) {
			[this.heap[i], this.heap[minIdx]] = [this.heap[minIdx], this.heap[i]];
			this._heapifyDown(minIdx);
		}
	}

	peek() {
		return this.heap[0];
	}
	size() {
		return this.heap.length;
	}
}

// ২২৭. Graph (Adjacency List)
class Graph {
	constructor() {
		this.adj = new Map();
	}

	addVertex(v) {
		if (!this.adj.has(v)) this.adj.set(v, []);
	}

	addEdge(u, v, weight = 1) {
		this.addVertex(u);
		this.addVertex(v);
		this.adj.get(u).push({ node: v, weight });
		this.adj.get(v).push({ node: u, weight }); // Undirected
	}

	// ২২৮. BFS
	bfs(start) {
		const visited = new Set();
		const queue = [start];
		const result = [];

		while (queue.length) {
			const v = queue.shift();
			if (!visited.has(v)) {
				visited.add(v);
				result.push(v);
				for (let neighbor of this.adj.get(v) || []) {
					if (!visited.has(neighbor.node)) queue.push(neighbor.node);
				}
			}
		}
		return result;
	}

	// ২২৯. DFS
	dfs(start) {
		const visited = new Set();
		const result = [];

		const dfsHelper = (v) => {
			visited.add(v);
			result.push(v);
			for (let neighbor of this.adj.get(v) || []) {
				if (!visited.has(neighbor.node)) dfsHelper(neighbor.node);
			}
		};

		dfsHelper(start);
		return result;
	}

	// ২৩০. Dijkstra's Algorithm
	dijkstra(start) {
		const dist = new Map();
		const pq = new MinHeap();

		for (let v of this.adj.keys()) dist.set(v, Infinity);
		dist.set(start, 0);
		pq.insert({ node: start, dist: 0 });

		while (pq.size() > 0) {
			const { node: u, dist: d } = pq.extractMin();
			if (d > dist.get(u)) continue;

			for (let { node: v, weight } of this.adj.get(u)) {
				const newDist = d + weight;
				if (newDist < dist.get(v)) {
					dist.set(v, newDist);
					pq.insert({ node: v, dist: newDist });
				}
			}
		}
		return dist;
	}
}

// ২৩১. AVL Tree
class AVLNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
		this.height = 1;
	}
}

class AVLTree {
	getHeight(node) {
		return node ? node.height : 0;
	}
	getBalance(node) {
		return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
	}

	updateHeight(node) {
		node.height =
			1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
	}

	rightRotate(y) {
		const x = y.left;
		const T2 = x.right;
		x.right = y;
		y.left = T2;
		this.updateHeight(y);
		this.updateHeight(x);
		return x;
	}

	leftRotate(x) {
		const y = x.right;
		const T2 = y.left;
		y.left = x;
		x.right = T2;
		this.updateHeight(x);
		this.updateHeight(y);
		return y;
	}

	insert(node, val) {
		if (!node) return new AVLNode(val);

		if (val < node.val) node.left = this.insert(node.left, val);
		else if (val > node.val) node.right = this.insert(node.right, val);
		else return node;

		this.updateHeight(node);
		const balance = this.getBalance(node);

		if (balance > 1 && val < node.left.val) return this.rightRotate(node);
		if (balance < -1 && val > node.right.val) return this.leftRotate(node);
		if (balance > 1 && val > node.left.val) {
			node.left = this.leftRotate(node.left);
			return this.rightRotate(node);
		}
		if (balance < -1 && val < node.right.val) {
			node.right = this.rightRotate(node.right);
			return this.leftRotate(node);
		}

		return node;
	}
}

// ২৩২. Red-Black Tree (simplified)
class RedBlackNode {
	constructor(val, color = "red") {
		this.val = val;
		this.color = color;
		this.left = null;
		this.right = null;
		this.parent = null;
	}
}

// ২৩৩. B-Tree Node
class BTreeNode {
	constructor(leaf = true) {
		this.keys = [];
		this.children = [];
		this.leaf = leaf;
	}
}

// ২৩৪. Skip List
class SkipListNode {
	constructor(val, level) {
		this.val = val;
		this.forward = new Array(level).fill(null);
	}
}

class SkipList {
	constructor(maxLevel = 16, p = 0.5) {
		this.maxLevel = maxLevel;
		this.p = p;
		this.header = new SkipListNode(-1, maxLevel);
		this.level = 0;
	}

	randomLevel() {
		let lvl = 0;
		while (Math.random() < this.p && lvl < this.maxLevel) lvl++;
		return lvl;
	}

	search(target) {
		let current = this.header;
		for (let i = this.level; i >= 0; i--) {
			while (current.forward[i] && current.forward[i].val < target) {
				current = current.forward[i];
			}
		}
		current = current.forward[0];
		return current && current.val === target;
	}
}

// ২৩৫. LRU Cache with Doubly Linked List
class LRUCacheAdvanced {
	constructor(capacity) {
		this.capacity = capacity;
		this.cache = new Map();
		this.head = { next: null, prev: null };
		this.tail = { next: null, prev: null };
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	_remove(node) {
		node.prev.next = node.next;
		node.next.prev = node.prev;
	}

	_addToFront(node) {
		node.next = this.head.next;
		node.prev = this.head;
		this.head.next.prev = node;
		this.head.next = node;
	}

	get(key) {
		if (!this.cache.has(key)) return -1;
		const node = this.cache.get(key);
		this._remove(node);
		this._addToFront(node);
		return node.val;
	}

	put(key, val) {
		if (this.cache.has(key)) {
			this._remove(this.cache.get(key));
		} else if (this.cache.size >= this.capacity) {
			const lru = this.tail.prev;
			this._remove(lru);
			this.cache.delete(lru.key);
		}
		const node = { key, val };
		this._addToFront(node);
		this.cache.set(key, node);
	}
}

// ২৩৬. Circular Buffer
class CircularBuffer {
	constructor(size) {
		this.buffer = new Array(size);
		this.size = size;
		this.writeIndex = 0;
		this.readIndex = 0;
		this.count = 0;
	}

	write(item) {
		if (this.count === this.size) return false;
		this.buffer[this.writeIndex] = item;
		this.writeIndex = (this.writeIndex + 1) % this.size;
		this.count++;
		return true;
	}

	read() {
		if (this.count === 0) return null;
		const item = this.buffer[this.readIndex];
		this.readIndex = (this.readIndex + 1) % this.size;
		this.count--;
		return item;
	}
}

// ২৩৭. Bloom Filter
class BloomFilter {
	constructor(size = 100, hashCount = 3) {
		this.size = size;
		this.hashCount = hashCount;
		this.bitArray = new Array(size).fill(0);
	}

	_hash(str, seed) {
		let hash = seed;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) + hash + str.charCodeAt(i);
			hash = hash & hash;
		}
		return Math.abs(hash % this.size);
	}

	add(item) {
		for (let i = 0; i < this.hashCount; i++) {
			this.bitArray[this._hash(item, i)] = 1;
		}
	}

	contains(item) {
		for (let i = 0; i < this.hashCount; i++) {
			if (this.bitArray[this._hash(item, i)] === 0) return false;
		}
		return true; // Might be false positive
	}
}

// ২৩৮. Consistent Hashing
class ConsistentHash {
	constructor(replicas = 150) {
		this.replicas = replicas;
		this.ring = new Map();
		this.keys = [];
	}

	_hash(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash = hash & hash;
		}
		return hash;
	}

	addNode(node) {
		for (let i = 0; i < this.replicas; i++) {
			const key = this._hash(`${node}:${i}`);
			this.ring.set(key, node);
			this.keys.push(key);
		}
		this.keys.sort((a, b) => a - b);
	}

	removeNode(node) {
		for (let i = 0; i < this.replicas; i++) {
			const key = this._hash(`${node}:${i}`);
			this.ring.delete(key);
			const idx = this.keys.indexOf(key);
			if (idx > -1) this.keys.splice(idx, 1);
		}
	}

	getNode(key) {
		if (this.keys.length === 0) return null;
		const hash = this._hash(key);
		let idx = this.keys.findIndex((k) => k >= hash);
		if (idx === -1) idx = 0;
		return this.ring.get(this.keys[idx]);
	}
}

// ২৩৯. Rate Limiter (Token Bucket)
class TokenBucket {
	constructor(capacity, refillRate) {
		this.capacity = capacity;
		this.tokens = capacity;
		this.refillRate = refillRate;
		this.lastRefill = Date.now();
	}

	allowRequest(tokens = 1) {
		this._refill();
		if (this.tokens >= tokens) {
			this.tokens -= tokens;
			return true;
		}
		return false;
	}

	_refill() {
		const now = Date.now();
		const delta = (now - this.lastRefill) / 1000;
		this.tokens = Math.min(
			this.capacity,
			this.tokens + delta * this.refillRate
		);
		this.lastRefill = now;
	}
}

// ২৪০. Sliding Window Log
class SlidingWindowLog {
	constructor(windowSize, maxRequests) {
		this.windowSize = windowSize;
		this.maxRequests = maxRequests;
		this.requests = [];
	}

	allowRequest() {
		const now = Date.now();
		this.requests = this.requests.filter(
			(time) => now - time < this.windowSize
		);
		if (this.requests.length < this.maxRequests) {
			this.requests.push(now);
			return true;
		}
		return false;
	}
}

// ২৪১-২৫০: Additional Graph Algorithms
// ২৪১. Topological Sort (Kahn's Algorithm)
const topologicalSort = (graph) => {
	const inDegree = new Map();
	const result = [];
	const queue = [];

	for (let [node, edges] of graph) {
		if (!inDegree.has(node)) inDegree.set(node, 0);
		for (let edge of edges) {
			inDegree.set(edge, (inDegree.get(edge) || 0) + 1);
		}
	}

	for (let [node, degree] of inDegree) {
		if (degree === 0) queue.push(node);
	}

	while (queue.length) {
		const node = queue.shift();
		result.push(node);
		for (let neighbor of graph.get(node) || []) {
			inDegree.set(neighbor, inDegree.get(neighbor) - 1);
			if (inDegree.get(neighbor) === 0) queue.push(neighbor);
		}
	}

	return result.length === inDegree.size ? result : [];
};

// ২৪২. Bellman-Ford Algorithm
const bellmanFord = (edges, vertices, start) => {
	const dist = new Array(vertices).fill(Infinity);
	dist[start] = 0;

	for (let i = 0; i < vertices - 1; i++) {
		for (let [u, v, w] of edges) {
			if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
				dist[v] = dist[u] + w;
			}
		}
	}

	// Check for negative cycles
	for (let [u, v, w] of edges) {
		if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
			throw new Error("Negative cycle detected");
		}
	}

	return dist;
};

// ২৪৩. Floyd-Warshall Algorithm
const floydWarshall = (graph) => {
	const n = graph.length;
	const dist = graph.map((row) => [...row]);

	for (let k = 0; k < n; k++) {
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				if (dist[i][k] + dist[k][j] < dist[i][j]) {
					dist[i][j] = dist[i][k] + dist[k][j];
				}
			}
		}
	}
	return dist;
};

// ২৪৪. Prim's Algorithm (MST)
const primsMST = (graph) => {
	const visited = new Set();
	const mst = [];
	const pq = new MinHeap();

	pq.insert({ node: 0, weight: 0, parent: null });

	while (pq.size() > 0 && visited.size < graph.length) {
		const { node, weight, parent } = pq.extractMin();
		if (visited.has(node)) continue;

		visited.add(node);
		if (parent !== null) mst.push({ from: parent, to: node, weight });

		for (let neighbor of graph[node]) {
			if (!visited.has(neighbor.node)) {
				pq.insert({
					node: neighbor.node,
					weight: neighbor.weight,
					parent: node,
				});
			}
		}
	}
	return mst;
};

// ২৪৫. Kruskal's Algorithm (MST)
const kruskalsMST = (edges, vertices) => {
	edges.sort((a, b) => a.weight - b.weight);
	const dsu = new DSU(vertices);
	const mst = [];

	for (let edge of edges) {
		if (dsu.union(edge.u, edge.v)) {
			mst.push(edge);
		}
		if (mst.length === vertices - 1) break;
	}
	return mst;
};

// ২৪৬. A* Search Algorithm
const aStar = (grid, start, end, heuristic) => {
	const openSet = new MinHeap();
	const cameFrom = new Map();
	const gScore = new Map();
	const fScore = new Map();

	gScore.set(start, 0);
	fScore.set(start, heuristic(start, end));
	openSet.insert({ node: start, f: fScore.get(start) });

	while (openSet.size() > 0) {
		const current = openSet.extractMin().node;
		if (current === end) return reconstructPath(cameFrom, current);

		for (let neighbor of getNeighbors(grid, current)) {
			const tentativeG = gScore.get(current) + 1;
			if (tentativeG < (gScore.get(neighbor) || Infinity)) {
				cameFrom.set(neighbor, current);
				gScore.set(neighbor, tentativeG);
				fScore.set(neighbor, tentativeG + heuristic(neighbor, end));
				openSet.insert({ node: neighbor, f: fScore.get(neighbor) });
			}
		}
	}
	return null;
};

// ২৪৭. Strongly Connected Components (Kosaraju's Algorithm)
const kosarajuSCC = (graph) => {
	const visited = new Set();
	const stack = [];
	const sccs = [];

	const fillOrder = (v) => {
		visited.add(v);
		for (let neighbor of graph.get(v) || []) {
			if (!visited.has(neighbor)) fillOrder(neighbor);
		}
		stack.push(v);
	};

	for (let v of graph.keys()) {
		if (!visited.has(v)) fillOrder(v);
	}

	const transposed = transposeGraph(graph);
	visited.clear();

	while (stack.length) {
		const v = stack.pop();
		if (!visited.has(v)) {
			const scc = [];
			dfsTranspose(v, visited, transposed, scc);
			sccs.push(scc);
		}
	}
	return sccs;
};

// ২৪৮. Articulation Points (Tarjan's Algorithm)
const findArticulationPoints = (graph, n) => {
	const disc = new Array(n).fill(-1);
	const low = new Array(n).fill(-1);
	const parent = new Array(n).fill(-1);
	const ap = new Array(n).fill(false);
	let time = 0;

	const dfs = (u) => {
		let children = 0;
		disc[u] = low[u] = ++time;

		for (let v of graph[u]) {
			if (disc[v] === -1) {
				children++;
				parent[v] = u;
				dfs(v);
				low[u] = Math.min(low[u], low[v]);

				if (parent[u] === -1 && children > 1) ap[u] = true;
				if (parent[u] !== -1 && low[v] >= disc[u]) ap[u] = true;
			} else if (v !== parent[u]) {
				low[u] = Math.min(low[u], disc[v]);
			}
		}
	};

	for (let i = 0; i < n; i++) {
		if (disc[i] === -1) dfs(i);
	}
	return ap.map((v, i) => (v ? i : -1)).filter((v) => v !== -1);
};

// ২৪৯. Bridge Edges in Graph
const findBridges = (graph, n) => {
	const disc = new Array(n).fill(-1);
	const low = new Array(n).fill(-1);
	const bridges = [];
	let time = 0;

	const dfs = (u, parent) => {
		disc[u] = low[u] = ++time;
		for (let v of graph[u]) {
			if (disc[v] === -1) {
				dfs(v, u);
				low[u] = Math.min(low[u], low[v]);
				if (low[v] > disc[u]) bridges.push([u, v]);
			} else if (v !== parent) {
				low[u] = Math.min(low[u], disc[v]);
			}
		}
	};

	for (let i = 0; i < n; i++) {
		if (disc[i] === -1) dfs(i, -1);
	}
	return bridges;
};

// ২৫০. Network Flow (Ford-Fulkerson)
const fordFulkerson = (graph, source, sink) => {
	const residual = graph.map((row) => [...row]);
	const parent = new Array(graph.length);
	let maxFlow = 0;

	const bfs = () => {
		const visited = new Array(graph.length).fill(false);
		const queue = [source];
		visited[source] = true;
		parent[source] = -1;

		while (queue.length) {
			const u = queue.shift();
			for (let v = 0; v < graph.length; v++) {
				if (!visited[v] && residual[u][v] > 0) {
					queue.push(v);
					parent[v] = u;
					visited[v] = true;
				}
			}
		}
		return visited[sink];
	};

	while (bfs()) {
		let pathFlow = Infinity;
		for (let v = sink; v !== source; v = parent[v]) {
			const u = parent[v];
			pathFlow = Math.min(pathFlow, residual[u][v]);
		}

		for (let v = sink; v !== source; v = parent[v]) {
			const u = parent[v];
			residual[u][v] -= pathFlow;
			residual[v][u] += pathFlow;
		}
		maxFlow += pathFlow;
	}
	return maxFlow;
};

/* ফাংশাল প্রোগ্রামিং (২৫১-২৭০) */

// ২৫১. Immutable List
class ImmutableList {
	constructor(arr = []) {
		this._data = [...arr];
	}
	push(item) {
		return new ImmutableList([...this._data, item]);
	}
	pop() {
		return new ImmutableList(this._data.slice(0, -1));
	}
	get(index) {
		return this._data[index];
	}
	set(index, value) {
		const newData = [...this._data];
		newData[index] = value;
		return new ImmutableList(newData);
	}
	toArray() {
		return [...this._data];
	}
}

// ২৫২. Persistent Vector (HAMT based simplified)
class PersistentVector {
	constructor(data = []) {
		this.data = data;
	}

	assoc(index, value) {
		const newData = [...this.data];
		newData[index] = value;
		return new PersistentVector(newData);
	}

	conj(value) {
		return new PersistentVector([...this.data, value]);
	}
}

// ২৫৩. Lazy Sequence
function* lazyRange(start, end) {
	for (let i = start; i < end; i++) {
		console.log(`Generating ${i}`);
		yield i;
	}
}

// ২৫৪. Memoized Fibonacci with lazy evaluation
const lazyFib = (() => {
	const cache = [0, 1];
	return function* () {
		let i = 0;
		while (true) {
			if (i >= cache.length) {
				cache[i] = cache[i - 1] + cache[i - 2];
			}
			yield cache[i++];
		}
	};
})();

// ২৫৫. Function Composition Pipeline
const pipeAsync =
	(...fns) =>
	(x) =>
		fns.reduce((p, f) => p.then(f), Promise.resolve(x));

// ২৫৬. Transducers
const mapTransducer = (fn) => (reducer) => (acc, val) => reducer(acc, fn(val));
const filterTransducer = (pred) => (reducer) => (acc, val) =>
	pred(val) ? reducer(acc, val) : acc;

// ২৫৭. Lens (Functional getter/setter)
const lens = (getter, setter) => ({
	get: getter,
	set: setter,
	modify: (fn, obj) => setter(fn(getter(obj)), obj),
});

const propLens = (key) =>
	lens(
		(obj) => obj[key],
		(val, obj) => ({ ...obj, [key]: val })
	);

// ২৫৮. Maybe Monad
class Maybe {
	constructor(value) {
		this.value = value;
	}
	static of(value) {
		return new Maybe(value);
	}
	isNothing() {
		return this.value === null || this.value === undefined;
	}
	map(fn) {
		return this.isNothing() ? this : Maybe.of(fn(this.value));
	}
	flatMap(fn) {
		return this.map(fn).join();
	}
	join() {
		return this.isNothing() ? Maybe.of(null) : this.value;
	}
	getOrElse(defaultValue) {
		return this.isNothing() ? defaultValue : this.value;
	}
}

// ২৫৯. Either Monad
class Either {
	constructor(value) {
		this.value = value;
	}
	static left(value) {
		return new Left(value);
	}
	static right(value) {
		return new Right(value);
	}
}

class Left extends Either {
	map(_) {
		return this;
	}
	flatMap(_) {
		return this;
	}
	getOrElse(defaultValue) {
		return defaultValue;
	}
}

class Right extends Either {
	map(fn) {
		return Either.right(fn(this.value));
	}
	flatMap(fn) {
		return fn(this.value);
	}
	getOrElse(_) {
		return this.value;
	}
}

// ২৬০. IO Monad
class IO {
	constructor(fn) {
		this.fn = fn;
	}
	static of(value) {
		return new IO(() => value);
	}
	map(fn) {
		return new IO(() => fn(this.fn()));
	}
	flatMap(fn) {
		return new IO(() => fn(this.fn()).fn());
	}
	run() {
		return this.fn();
	}
}

// ২৬১. State Monad
class State {
	constructor(run) {
		this.run = run;
	}
	static of(value) {
		return new State((s) => [value, s]);
	}
	map(fn) {
		return new State((s) => {
			const [a, s1] = this.run(s);
			return [fn(a), s1];
		});
	}
	flatMap(fn) {
		return new State((s) => {
			const [a, s1] = this.run(s);
			return fn(a).run(s1);
		});
	}
}

// ২৬২. Reader Monad
class Reader {
	constructor(run) {
		this.run = run;
	}
	static of(value) {
		return new Reader(() => value);
	}
	map(fn) {
		return new Reader((e) => fn(this.run(e)));
	}
	flatMap(fn) {
		return new Reader((e) => fn(this.run(e)).run(e));
	}
	ask() {
		return new Reader((e) => e);
	}
}

// ২৬৩. Functor Laws Verification
const verifyFunctorLaws = (F, f, g, x) => {
	// Identity: F.map(id) === id(F)
	const identity =
		F.of(x)
			.map((y) => y)
			.run() === F.of(x).run();

	// Composition: F.map(f).map(g) === F.map(compose(g, f))
	const composition =
		F.of(x).map(f).map(g).run() ===
		F.of(x)
			.map((y) => g(f(y)))
			.run();

	return { identity, composition };
};

// ২৬৪. Monoid
const Sum = {
	empty: () => 0,
	concat: (a, b) => a + b,
};

const Product = {
	empty: () => 1,
	concat: (a, b) => a * b,
};

const All = {
	empty: () => true,
	concat: (a, b) => a && b,
};

const Any = {
	empty: () => false,
	concat: (a, b) => a || b,
};

// ২৬৫. Foldable
const reduce = (monoid, list) => list.reduce(monoid.concat, monoid.empty());

// ২৬৬. Traversable
const sequence = (of, list) =>
	list.reduce((acc, x) => acc.map((xs) => (y) => [...xs, y]).ap(x), of([]));

// ২৬৭. Zipper (Functional data structure)
class Zipper {
	constructor(left, focus, right) {
		this.left = left;
		this.focus = focus;
		this.right = right;
	}

	goLeft() {
		if (this.left.length === 0) return null;
		return new Zipper(this.left.slice(0, -1), this.left[this.left.length - 1], [
			this.focus,
			...this.right,
		]);
	}

	goRight() {
		if (this.right.length === 0) return null;
		return new Zipper(
			[...this.left, this.focus],
			this.right[0],
			this.right.slice(1)
		);
	}

	set(value) {
		return new Zipper(this.left, value, this.right);
	}
}

// ২৬৮. Church Encoding (Numbers)
const zero = (f) => (x) => x;
const succ = (n) => (f) => (x) => f(n(f)(x));
const one = succ(zero);
const two = succ(one);

const add = (m) => (n) => (f) => (x) => m(f)(n(f)(x));
const mult = (m) => (n) => (f) => m(n(f));

// ২৬৯. Y Combinator
const Y = (f) => ((x) => f((v) => x(x)(v)))((x) => f((v) => x(x)(v)));

// Factorial using Y Combinator
const factorialY = Y((fac) => (n) => (n <= 1 ? 1 : n * fac(n - 1)));

// ২৭০. Fixed Point Combinator for Memoization
const memoY = (f, cache = new Map()) =>
	Y((g) => (n) => {
		if (cache.has(n)) return cache.get(n);
		const result = f(g)(n);
		cache.set(n, result);
		return result;
	});

/* মেটাপ্রোগ্রামিং (২৭১-২৯০) */

// ২৭১. Property Descriptor Manipulation
const readonly = (obj, prop) => {
	const desc = Object.getOwnPropertyDescriptor(obj, prop);
	Object.defineProperty(obj, prop, { ...desc, writable: false });
	return obj;
};

// ২৭২. Getter/Setter with Validation
const withValidation = (obj, prop, validator) => {
	let value = obj[prop];
	Object.defineProperty(obj, prop, {
		get: () => value,
		set: (newVal) => {
			if (!validator(newVal)) throw new Error(`Invalid value for ${prop}`);
			value = newVal;
		},
	});
};

// ২৭৩. Method Interception (Before/After)
const intercept = (obj, method, before, after) => {
	const original = obj[method];
	obj[method] = function (...args) {
		before?.apply(this, args);
		const result = original.apply(this, args);
		after?.call(this, result);
		return result;
	};
};

// ২৭৪. Class Decorator
const singleton = (Class) => {
	let instance;
	return new Proxy(Class, {
		construct(target, args) {
			if (!instance) instance = new target(...args);
			return instance;
		},
	});
};

// ২৭৫. Method Decorator
const measureTime = (target, name, descriptor) => {
	const original = descriptor.value;
	descriptor.value = function (...args) {
		const start = performance.now();
		const result = original.apply(this, args);
		console.log(`${name} took ${performance.now() - start}ms`);
		return result;
	};
};

// ২৭৬. Property Decorator
const required = (target, name) => {
	let value;
	Object.defineProperty(target, name, {
		get() {
			if (value === undefined) throw new Error(`${name} is required`);
			return value;
		},
		set(v) {
			value = v;
		},
	});
};

// ২৭৭. Proxy for Automatic Binding
const autoBind = (obj) =>
	new Proxy(obj, {
		get(target, prop) {
			const value = target[prop];
			return typeof value === "function" ? value.bind(target) : value;
		},
	});

// ২৭৮. Proxy for Negative Array Indices
const negativeArray = (arr) =>
	new Proxy(arr, {
		get(target, prop) {
			const index = Number(prop);
			if (index < 0) return target[target.length + index];
			return target[prop];
		},
		set(target, prop, value) {
			const index = Number(prop);
			if (index < 0) target[target.length + index] = value;
			else target[prop] = value;
			return true;
		},
	});

// ২৭৯. Proxy for Private Properties
const withPrivate = (obj, prefix = "_") =>
	new Proxy(obj, {
		get(target, prop) {
			if (typeof prop === "string" && prop.startsWith(prefix)) {
				throw new Error(`Access to private property ${prop} denied`);
			}
			return target[prop];
		},
		set(target, prop, value) {
			if (typeof prop === "string" && prop.startsWith(prefix)) {
				throw new Error(`Cannot modify private property ${prop}`);
			}
			target[prop] = value;
			return true;
		},
	});

// ২৮০. Proxy for Immutable Objects
const immutable = (obj) =>
	new Proxy(obj, {
		set() {
			throw new Error("Object is immutable");
		},
		deleteProperty() {
			throw new Error("Object is immutable");
		},
	});

// ২৮১. Proxy for Observable Arrays
const observableArray = (arr, onChange) =>
	new Proxy(arr, {
		set(target, prop, value) {
			const oldValue = target[prop];
			target[prop] = value;
			if (prop !== "length") onChange("set", prop, value, oldValue);
			return true;
		},
		deleteProperty(target, prop) {
			const oldValue = target[prop];
			delete target[prop];
			onChange("delete", prop, undefined, oldValue);
			return true;
		},
	});

// ২৮২. Proxy for Schema Validation
const withSchema = (obj, schema) =>
	new Proxy(obj, {
		set(target, prop, value) {
			if (schema[prop] && !schema[prop](value)) {
				throw new Error(`Invalid value for ${prop}`);
			}
			target[prop] = value;
			return true;
		},
	});

// ২৮৩. Proxy for Lazy Initialization
const lazy = (factory) => {
	let instance;
	return new Proxy(
		{},
		{
			get(target, prop) {
				if (!instance) instance = factory();
				return instance[prop];
			},
		}
	);
};

// ২৮৪. Proxy for Method Chaining with Logging
const chainableWithLog = (obj) =>
	new Proxy(obj, {
		get(target, prop) {
			const value = target[prop];
			if (typeof value === "function") {
				return (...args) => {
					console.log(`Calling ${prop} with`, args);
					const result = value.apply(target, args);
					return result === target ? chainableWithLog(target) : result;
				};
			}
			return value;
		},
	});

// ২৮৫. Reflect API Usage
const defineMetadata = (key, value, target) => {
	if (!target.__metadata) target.__metadata = {};
	target.__metadata[key] = value;
};

const getMetadata = (key, target) => target.__metadata?.[key];

// ২৮৬. Symbol.for and Symbol.keyFor
const createGlobalSymbol = (name) => Symbol.for(name);
const getGlobalSymbolName = (sym) => Symbol.keyFor(sym);

// ২৮৭. Well-known Symbols
const iterable = {
	[Symbol.iterator]: function* () {
		yield 1;
		yield 2;
		yield 3;
	},
};

const asyncIterable = {
	[Symbol.asyncIterator]: async function* () {
		yield await Promise.resolve(1);
		yield await Promise.resolve(2);
	},
};

// ২৮৮. Custom Iterator with Symbol.iterator
class Range {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
	[Symbol.iterator]() {
		let current = this.start;
		return {
			next: () => ({
				value: current,
				done: current++ > this.end,
			}),
		};
	}
}

// ২৮৯. Generator Delegation
function* generatorA() {
	yield 1;
	yield 2;
}
function* generatorB() {
	yield* generatorA();
	yield 3;
}

// ২৯০. Generator for Async Control Flow
function* asyncFlow() {
	const a = yield Promise.resolve(1);
	const b = yield Promise.resolve(a + 1);
	return b + 1;
}

const runGenerator = (gen) => {
	const iterator = gen();
	const handle = (result) => {
		if (result.done) return Promise.resolve(result.value);
		return Promise.resolve(result.value)
			.then((res) => handle(iterator.next(res)))
			.catch((err) => iterator.throw(err));
	};
	return handle(iterator.next());
};

/* পারফরম্যান্স অপ্টিমাইজেশন (২৯১-৩০০)
 */

// ২৯১. Memoization with WeakRef (Memory efficient)
const memoizeWeakRef = (fn) => {
	const cache = new Map();
	const registry = new FinalizationRegistry((key) => cache.delete(key));

	return (...args) => {
		const key = JSON.stringify(args);
		const ref = cache.get(key);
		if (ref) {
			const cached = ref.deref();
			if (cached !== undefined) return cached;
		}

		const result = fn(...args);
		cache.set(key, new WeakRef(result));
		registry.register(result, key);
		return result;
	};
};

// ২৯২. Request Idle Callback Polyfill
const requestIdleCallbackPolyfill = (callback) => {
	const start = performance.now();
	return setTimeout(() => {
		callback({
			didTimeout: false,
			timeRemaining() {
				return Math.max(0, 50 - (performance.now() - start));
			},
		});
	}, 1);
};

// ২৯৩. Virtual Scrolling Calculator
const calculateVisibleRange = (
	scrollTop,
	itemHeight,
	containerHeight,
	totalItems
) => {
	const startIndex = Math.floor(scrollTop / itemHeight);
	const visibleCount = Math.ceil(containerHeight / itemHeight);
	const endIndex = Math.min(startIndex + visibleCount + 1, totalItems);
	return { startIndex, endIndex, offsetY: startIndex * itemHeight };
};

// ২৯৪. Image Lazy Loading Intersection Observer
const lazyLoadImages = () => {
	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.classList.remove("lazy");
				observer.unobserve(img);
			}
		});
	});
	document
		.querySelectorAll("img.lazy")
		.forEach((img) => imageObserver.observe(img));
};

// ২৯৫. Debounced Resize Handler
const optimizedResize = (callback) => {
	let ticking = false;
	window.addEventListener("resize", () => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				callback();
				ticking = false;
			});
			ticking = true;
		}
	});
};

// ২৯৬. Throttled Scroll Handler with RAF
const throttledScroll = (callback, limit) => {
	let lastTime = 0;
	let rafId;
	return () => {
		const now = performance.now();
		if (now - lastTime >= limit) {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				callback();
				lastTime = now;
			});
		}
	};
};

// ২৯৭. Object Pool Pattern
class ObjectPool {
	constructor(factory, reset, size = 10) {
		this.factory = factory;
		this.reset = reset;
		this.available = Array.from({ length: size }, factory);
		this.inUse = new Set();
	}

	acquire() {
		let obj = this.available.pop();
		if (!obj) obj = this.factory();
		this.inUse.add(obj);
		return obj;
	}

	release(obj) {
		if (this.inUse.has(obj)) {
			this.inUse.delete(obj);
			this.reset(obj);
			this.available.push(obj);
		}
	}
}

// ২৯৮. Memory Leak Detection
const detectMemoryLeak = (fn, iterations = 1000) => {
	const before = performance.memory?.usedJSHeapSize;
	for (let i = 0; i < iterations; i++) fn();
	const after = performance.memory?.usedJSHeapSize;
	return after - before;
};

// ২৯৯. Web Worker Pool for CPU Intensive Tasks
class WorkerPool {
	constructor(workerScript, poolSize = navigator.hardwareConcurrency || 4) {
		this.workers = Array.from({ length: poolSize }, () => ({
			worker: new Worker(workerScript),
			busy: false,
			queue: [],
		}));
	}

	execute(data) {
		const available = this.workers.find((w) => !w.busy);
		if (available) {
			available.busy = true;
			return new Promise((resolve) => {
				available.worker.onmessage = (e) => {
					available.busy = false;
					resolve(e.data);
				};
				available.worker.postMessage(data);
			});
		}
		return Promise.reject(new Error("No available workers"));
	}

	terminate() {
		this.workers.forEach((w) => w.worker.terminate());
	}
}

// ৩০০. Comprehensive Performance Monitoring
class PerformanceMonitor {
	constructor() {
		this.metrics = new Map();
		this.observers = new Map();
	}

	measure(name, fn) {
		const start = performance.now();
		const result = fn();
		const duration = performance.now() - start;
		this.record(name, duration);
		return result;
	}

	async measureAsync(name, fn) {
		const start = performance.now();
		const result = await fn();
		const duration = performance.now() - start;
		this.record(name, duration);
		return result;
	}

	record(name, value) {
		if (!this.metrics.has(name)) this.metrics.set(name, []);
		this.metrics.get(name).push(value);
	}

	getStats(name) {
		const values = this.metrics.get(name) || [];
		const sum = values.reduce((a, b) => a + b, 0);
		const avg = sum / values.length;
		const min = Math.min(...values);
		const max = Math.max(...values);
		return { count: values.length, avg, min, max };
	}

	observeLongTasks() {
		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				this.record("longTask", entry.duration);
			}
		});
		observer.observe({ entryTypes: ["longtask"] });
		this.observers.set("longtask", observer);
	}

	observeLayoutShifts() {
		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (!entry.hadRecentInput) {
					this.record("layoutShift", entry.value);
				}
			}
		});
		observer.observe({ type: "layout-shift", buffered: true });
		this.observers.set("layoutShift", observer);
	}

	disconnect() {
		this.observers.forEach((obs) => obs.disconnect());
	}
}

/* এলগরিদম অ্যাডভান্সড (৩০১-৩৫০) */

// ৩০১. Dynamic Programming - Fibonacci with Tabulation
const fibTabulation = (n) => {
	if (n <= 1) return n;
	const dp = new Array(n + 1);
	dp[0] = 0;
	dp[1] = 1;
	for (let i = 2; i <= n; i++) {
		dp[i] = dp[i - 1] + dp[i - 2];
	}
	return dp[n];
};

// ৩০২. DP - Climbing Stairs
const climbStairs = (n) => {
	if (n <= 2) return n;
	let a = 1,
		b = 2;
	for (let i = 3; i <= n; i++) {
		[a, b] = [b, a + b];
	}
	return b;
};

// ৩০৩. DP - House Robber
const rob = (nums) => {
	let prev = 0,
		curr = 0;
	for (let num of nums) {
		[prev, curr] = [curr, Math.max(curr, prev + num)];
	}
	return curr;
};

// ৩০৪. DP - Maximum Subarray (Kadane's)
const maxSubArray = (nums) => {
	let maxSoFar = nums[0],
		maxEndingHere = nums[0];
	for (let i = 1; i < nums.length; i++) {
		maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
		maxSoFar = Math.max(maxSoFar, maxEndingHere);
	}
	return maxSoFar;
};

// ৩০৫. DP - Coin Change
const coinChange = (coins, amount) => {
	const dp = new Array(amount + 1).fill(Infinity);
	dp[0] = 0;
	for (let coin of coins) {
		for (let i = coin; i <= amount; i++) {
			dp[i] = Math.min(dp[i], dp[i - coin] + 1);
		}
	}
	return dp[amount] === Infinity ? -1 : dp[amount];
};

// ৩০৬. DP - Longest Common Subsequence
const longestCommonSubsequence = (text1, text2) => {
	const m = text1.length,
		n = text2.length;
	const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (text1[i - 1] === text2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}
	return dp[m][n];
};

// ৩০৭. DP - Edit Distance (Levenshtein)
const minDistance = (word1, word2) => {
	const m = word1.length,
		n = word2.length;
	const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

	for (let i = 0; i <= m; i++) dp[i][0] = i;
	for (let j = 0; j <= n; j++) dp[0][j] = j;

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (word1[i - 1] === word2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
			}
		}
	}
	return dp[m][n];
};

// ৩০৮. DP - 0/1 Knapsack
const knapsack01 = (weights, values, capacity) => {
	const n = weights.length;
	const dp = Array.from({ length: n + 1 }, () =>
		new Array(capacity + 1).fill(0)
	);

	for (let i = 1; i <= n; i++) {
		for (let w = 0; w <= capacity; w++) {
			if (weights[i - 1] <= w) {
				dp[i][w] = Math.max(
					dp[i - 1][w],
					values[i - 1] + dp[i - 1][w - weights[i - 1]]
				);
			} else {
				dp[i][w] = dp[i - 1][w];
			}
		}
	}
	return dp[n][capacity];
};

// ৩০৯. DP - Unbounded Knapsack
const unboundedKnapsack = (weights, values, capacity) => {
	const dp = new Array(capacity + 1).fill(0);
	for (let w = 0; w <= capacity; w++) {
		for (let i = 0; i < weights.length; i++) {
			if (weights[i] <= w) {
				dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
			}
		}
	}
	return dp[capacity];
};

// ৩১০. DP - Longest Increasing Subsequence (Binary Search)
const lengthOfLIS = (nums) => {
	const tails = [];
	for (let num of nums) {
		let left = 0,
			right = tails.length;
		while (left < right) {
			const mid = Math.floor((left + right) / 2);
			if (tails[mid] < num) left = mid + 1;
			else right = mid;
		}
		tails[left] = num;
	}
	return tails.length;
};

// ৩১১. DP - Matrix Chain Multiplication
const matrixChainOrder = (dims) => {
	const n = dims.length - 1;
	const dp = Array.from({ length: n }, () => new Array(n).fill(0));

	for (let len = 2; len <= n; len++) {
		for (let i = 0; i < n - len + 1; i++) {
			const j = i + len - 1;
			dp[i][j] = Infinity;
			for (let k = i; k < j; k++) {
				const cost =
					dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
				dp[i][j] = Math.min(dp[i][j], cost);
			}
		}
	}
	return dp[0][n - 1];
};

// ৩১২. DP - Palindrome Partitioning (Min cuts)
const minCut = (s) => {
	const n = s.length;
	const cut = new Array(n).fill(0).map((_, i) => i);
	const isPal = Array.from({ length: n }, () => new Array(n).fill(false));

	for (let i = 0; i < n; i++) {
		for (let j = 0; j <= i; j++) {
			if (s[i] === s[j] && (i - j <= 1 || isPal[j + 1][i - 1])) {
				isPal[j][i] = true;
				cut[i] = j === 0 ? 0 : Math.min(cut[i], cut[j - 1] + 1);
			}
		}
	}
	return cut[n - 1];
};

// ৩১৩. DP - Word Break
const wordBreak = (s, wordDict) => {
	const set = new Set(wordDict);
	const dp = new Array(s.length + 1).fill(false);
	dp[0] = true;

	for (let i = 1; i <= s.length; i++) {
		for (let j = 0; j < i; j++) {
			if (dp[j] && set.has(s.substring(j, i))) {
				dp[i] = true;
				break;
			}
		}
	}
	return dp[s.length];
};

// ৩১৪. DP - Regular Expression Matching
const isMatch = (s, p) => {
	const dp = Array.from({ length: s.length + 1 }, () =>
		new Array(p.length + 1).fill(false)
	);
	dp[0][0] = true;

	for (let j = 1; j <= p.length; j++) {
		if (p[j - 1] === "*") dp[0][j] = dp[0][j - 2];
	}

	for (let i = 1; i <= s.length; i++) {
		for (let j = 1; j <= p.length; j++) {
			if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else if (p[j - 1] === "*") {
				dp[i][j] = dp[i][j - 2];
				if (p[j - 2] === "." || p[j - 2] === s[i - 1]) {
					dp[i][j] = dp[i][j] || dp[i - 1][j];
				}
			}
		}
	}
	return dp[s.length][p.length];
};

// ৩১৫. DP - Wildcard Matching
const isWildcardMatch = (s, p) => {
	const dp = Array.from({ length: s.length + 1 }, () =>
		new Array(p.length + 1).fill(false)
	);
	dp[0][0] = true;

	for (let j = 1; j <= p.length; j++) {
		if (p[j - 1] === "*") dp[0][j] = dp[0][j - 1];
	}

	for (let i = 1; i <= s.length; i++) {
		for (let j = 1; j <= p.length; j++) {
			if (p[j - 1] === "*") {
				dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
			} else if (p[j - 1] === "?" || p[j - 1] === s[i - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			}
		}
	}
	return dp[s.length][p.length];
};

// ৩১৬. DP - Burst Balloons
const maxCoins = (nums) => {
	const n = nums.length;
	const arr = [1, ...nums, 1];
	const dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(0));

	for (let len = 1; len <= n; len++) {
		for (let i = 1; i <= n - len + 1; i++) {
			const j = i + len - 1;
			for (let k = i; k <= j; k++) {
				dp[i][j] = Math.max(
					dp[i][j],
					dp[i][k - 1] + arr[i - 1] * arr[k] * arr[j + 1] + dp[k + 1][j]
				);
			}
		}
	}
	return dp[1][n];
};

// ৩১৭. DP - Best Time to Buy/Sell Stock IV
const maxProfitIV = (k, prices) => {
	if (k >= prices.length / 2) {
		let profit = 0;
		for (let i = 1; i < prices.length; i++) {
			if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
		}
		return profit;
	}

	const dp = Array.from({ length: k + 1 }, () =>
		new Array(prices.length).fill(0)
	);

	for (let i = 1; i <= k; i++) {
		let maxDiff = -prices[0];
		for (let j = 1; j < prices.length; j++) {
			dp[i][j] = Math.max(dp[i][j - 1], prices[j] + maxDiff);
			maxDiff = Math.max(maxDiff, dp[i - 1][j] - prices[j]);
		}
	}
	return dp[k][prices.length - 1];
};

// ৩১৮. DP - Distinct Subsequences
const numDistinct = (s, t) => {
	const m = s.length,
		n = t.length;
	const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

	for (let i = 0; i <= m; i++) dp[i][0] = 1;

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (s[i - 1] === t[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
			} else {
				dp[i][j] = dp[i - 1][j];
			}
		}
	}
	return dp[m][n];
};

// ৩১৯. DP - Interleaving String
const isInterleave = (s1, s2, s3) => {
	if (s1.length + s2.length !== s3.length) return false;
	const dp = Array.from({ length: s1.length + 1 }, () =>
		new Array(s2.length + 1).fill(false)
	);
	dp[0][0] = true;

	for (let i = 0; i <= s1.length; i++) {
		for (let j = 0; j <= s2.length; j++) {
			if (i > 0)
				dp[i][j] = dp[i][j] || (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]);
			if (j > 0)
				dp[i][j] = dp[i][j] || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
		}
	}
	return dp[s1.length][s2.length];
};

// ৩২০. DP - Scramble String
const isScramble = (s1, s2) => {
	if (s1 === s2) return true;
	if (s1.length !== s2.length) return false;

	const n = s1.length;
	const dp = Array.from({ length: n }, () =>
		Array.from({ length: n }, () => new Array(n + 1).fill(false))
	);

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			dp[i][j][1] = s1[i] === s2[j];
		}
	}

	for (let len = 2; len <= n; len++) {
		for (let i = 0; i <= n - len; i++) {
			for (let j = 0; j <= n - len; j++) {
				for (let k = 1; k < len; k++) {
					if (
						(dp[i][j][k] && dp[i + k][j + k][len - k]) ||
						(dp[i][j + len - k][k] && dp[i + k][j][len - k])
					) {
						dp[i][j][len] = true;
						break;
					}
				}
			}
		}
	}
	return dp[0][0][n];
};

// ৩২১. Backtracking - N-Queens
const solveNQueens = (n) => {
	const result = [];
	const board = Array.from({ length: n }, () => new Array(n).fill("."));

	const isSafe = (row, col) => {
		for (let i = 0; i < row; i++) {
			if (board[i][col] === "Q") return false;
			if (col - (row - i) >= 0 && board[i][col - (row - i)] === "Q")
				return false;
			if (col + (row - i) < n && board[i][col + (row - i)] === "Q")
				return false;
		}
		return true;
	};

	const backtrack = (row) => {
		if (row === n) {
			result.push(board.map((r) => r.join("")));
			return;
		}
		for (let col = 0; col < n; col++) {
			if (isSafe(row, col)) {
				board[row][col] = "Q";
				backtrack(row + 1);
				board[row][col] = ".";
			}
		}
	};

	backtrack(0);
	return result;
};

// ৩২২. Backtracking - Sudoku Solver
const solveSudoku = (board) => {
	const isValid = (row, col, num) => {
		for (let i = 0; i < 9; i++) {
			if (board[row][i] === num) return false;
			if (board[i][col] === num) return false;
			if (
				board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
					3 * Math.floor(col / 3) + (i % 3)
				] === num
			)
				return false;
		}
		return true;
	};

	const solve = () => {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (board[i][j] === ".") {
					for (let num = 1; num <= 9; num++) {
						if (isValid(i, j, String(num))) {
							board[i][j] = String(num);
							if (solve()) return true;
							board[i][j] = ".";
						}
					}
					return false;
				}
			}
		}
		return true;
	};

	solve();
};

// ৩২৩. Backtracking - Combination Sum
const combinationSum = (candidates, target) => {
	const result = [];

	const backtrack = (remain, combo, start) => {
		if (remain === 0) {
			result.push([...combo]);
			return;
		}
		if (remain < 0) return;

		for (let i = start; i < candidates.length; i++) {
			combo.push(candidates[i]);
			backtrack(remain - candidates[i], combo, i);
			combo.pop();
		}
	};

	backtrack(target, [], 0);
	return result;
};

// ৩২৪. Backtracking - Permutations
const permute = (nums) => {
	const result = [];
	const used = new Array(nums.length).fill(false);

	const backtrack = (path) => {
		if (path.length === nums.length) {
			result.push([...path]);
			return;
		}
		for (let i = 0; i < nums.length; i++) {
			if (used[i]) continue;
			used[i] = true;
			path.push(nums[i]);
			backtrack(path);
			path.pop();
			used[i] = false;
		}
	};

	backtrack([]);
	return result;
};

// ৩২৫. Backtracking - Subsets
const subsets = (nums) => {
	const result = [];

	const backtrack = (start, path) => {
		result.push([...path]);
		for (let i = start; i < nums.length; i++) {
			path.push(nums[i]);
			backtrack(i + 1, path);
			path.pop();
		}
	};

	backtrack(0, []);
	return result;
};

// ৩২৬. Sliding Window - Maximum in Window
const maxSlidingWindow = (nums, k) => {
	const result = [];
	const deque = [];

	for (let i = 0; i < nums.length; i++) {
		while (deque.length && deque[0] < i - k + 1) deque.shift();
		while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
		deque.push(i);
		if (i >= k - 1) result.push(nums[deque[0]]);
	}
	return result;
};

// ৩২৭. Sliding Window - Minimum Window Substring
const minWindow = (s, t) => {
	const need = new Map();
	for (let c of t) need.set(c, (need.get(c) || 0) + 1);

	let missing = t.length;
	let start = 0,
		end = 0;
	let minStart = 0,
		minLen = Infinity;

	while (end < s.length) {
		if (need.has(s[end])) {
			if (need.get(s[end]) > 0) missing--;
			need.set(s[end], need.get(s[end]) - 1);
		}
		end++;

		while (missing === 0) {
			if (end - start < minLen) {
				minLen = end - start;
				minStart = start;
			}
			if (need.has(s[start])) {
				need.set(s[start], need.get(s[start]) + 1);
				if (need.get(s[start]) > 0) missing++;
			}
			start++;
		}
	}
	return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
};

// ৩২৮. Two Pointers - 3Sum Closest
const threeSumClosest = (nums, target) => {
	nums.sort((a, b) => a - b);
	let closest = nums[0] + nums[1] + nums[2];

	for (let i = 0; i < nums.length - 2; i++) {
		let left = i + 1,
			right = nums.length - 1;
		while (left < right) {
			const sum = nums[i] + nums[left] + nums[right];
			if (Math.abs(sum - target) < Math.abs(closest - target)) closest = sum;
			if (sum < target) left++;
			else if (sum > target) right--;
			else return sum;
		}
	}
	return closest;
};

// ৩২৯. Two Pointers - Trapping Rain Water
const trap = (height) => {
	let left = 0,
		right = height.length - 1;
	let leftMax = 0,
		rightMax = 0;
	let water = 0;

	while (left < right) {
		if (height[left] < height[right]) {
			height[left] >= leftMax ?
				(leftMax = height[left])
			:	(water += leftMax - height[left]);
			left++;
		} else {
			height[right] >= rightMax ?
				(rightMax = height[right])
			:	(water += rightMax - height[right]);
			right--;
		}
	}
	return water;
};

// ৩৩০. Binary Search - Search in Rotated Array
const searchRotated = (nums, target) => {
	let left = 0,
		right = nums.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (nums[mid] === target) return mid;

		if (nums[left] <= nums[mid]) {
			if (target >= nums[left] && target < nums[mid]) right = mid - 1;
			else left = mid + 1;
		} else {
			if (target > nums[mid] && target <= nums[right]) left = mid + 1;
			else right = mid - 1;
		}
	}
	return -1;
};

// ৩৩১. Binary Search - Find Minimum in Rotated Array
const findMin = (nums) => {
	let left = 0,
		right = nums.length - 1;

	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (nums[mid] > nums[right]) left = mid + 1;
		else right = mid;
	}
	return nums[left];
};

// ৩৩২. Binary Search - Kth Smallest Element in Matrix
const kthSmallest = (matrix, k) => {
	let n = matrix.length;
	let left = matrix[0][0],
		right = matrix[n - 1][n - 1];

	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		let count = 0;
		let j = n - 1;

		for (let i = 0; i < n; i++) {
			while (j >= 0 && matrix[i][j] > mid) j--;
			count += j + 1;
		}

		if (count < k) left = mid + 1;
		else right = mid;
	}
	return left;
};

// ৩৩৩. Greedy - Activity Selection
const activitySelection = (activities) => {
	activities.sort((a, b) => a.end - b.end);
	const selected = [activities[0]];
	let lastEnd = activities[0].end;

	for (let i = 1; i < activities.length; i++) {
		if (activities[i].start >= lastEnd) {
			selected.push(activities[i]);
			lastEnd = activities[i].end;
		}
	}
	return selected;
};

// ৩৩৪. Greedy - Huffman Coding
class HuffmanNode {
	constructor(char, freq, left = null, right = null) {
		this.char = char;
		this.freq = freq;
		this.left = left;
		this.right = right;
	}
}

const huffmanCoding = (freqMap) => {
	const pq = new MinHeap();
	for (let [char, freq] of freqMap) {
		pq.insert(new HuffmanNode(char, freq));
	}

	while (pq.size() > 1) {
		const left = pq.extractMin();
		const right = pq.extractMin();
		pq.insert(new HuffmanNode(null, left.freq + right.freq, left, right));
	}

	const codes = new Map();
	const generateCodes = (node, code = "") => {
		if (!node) return;
		if (node.char) codes.set(node.char, code);
		generateCodes(node.left, code + "0");
		generateCodes(node.right, code + "1");
	};

	generateCodes(pq.extractMin());
	return codes;
};

// ৩৩৫. Greedy - Fractional Knapsack
const fractionalKnapsack = (items, capacity) => {
	items.sort((a, b) => b.value / b.weight - a.value / a.weight);
	let totalValue = 0;

	for (let item of items) {
		if (capacity >= item.weight) {
			totalValue += item.value;
			capacity -= item.weight;
		} else {
			totalValue += item.value * (capacity / item.weight);
			break;
		}
	}
	return totalValue;
};

// ৩৩৬. Bit Manipulation - Single Number
const singleNumber = (nums) => nums.reduce((a, b) => a ^ b, 0);

// ৩৩৭. Bit Manipulation - Counting Bits
const countBits = (n) => {
	const dp = new Array(n + 1).fill(0);
	for (let i = 1; i <= n; i++) {
		dp[i] = dp[i >> 1] + (i & 1);
	}
	return dp;
};

// ৩৩৮. Bit Manipulation - Power of Two
const isPowerOfTwo = (n) => n > 0 && (n & (n - 1)) === 0;

// ৩৩৯. Bit Manipulation - Reverse Bits
const reverseBits = (n) => {
	let result = 0;
	for (let i = 0; i < 32; i++) {
		result = (result << 1) | (n & 1);
		n >>>= 1;
	}
	return result >>> 0;
};

// ৩৪০. Bit Manipulation - Hamming Distance
const hammingDistance = (x, y) => {
	let xor = x ^ y;
	let count = 0;
	while (xor) {
		count += xor & 1;
		xor >>>= 1;
	}
	return count;
};

// ৩৪১. Math - Sieve of Eratosthenes
const sieveOfEratosthenes = (n) => {
	const isPrime = new Array(n + 1).fill(true);
	isPrime[0] = isPrime[1] = false;

	for (let i = 2; i * i <= n; i++) {
		if (isPrime[i]) {
			for (let j = i * i; j <= n; j += i) {
				isPrime[j] = false;
			}
		}
	}
	return isPrime.map((v, i) => (v ? i : null)).filter((v) => v !== null);
};

// ৩৪২. Math - GCD and LCM
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

// ৩৪৩. Math - Fast Exponentiation
const fastPow = (base, exp, mod) => {
	let result = 1;
	base = base % mod;
	while (exp > 0) {
		if (exp & 1) result = (result * base) % mod;
		base = (base * base) % mod;
		exp >>= 1;
	}
	return result;
};

// ৩৪৪. Math - Modular Inverse
const modInverse = (a, m) => {
	const extendedGcd = (a, b) => {
		if (b === 0) return [a, 1, 0];
		const [g, x1, y1] = extendedGcd(b, a % b);
		return [g, y1, x1 - Math.floor(a / b) * y1];
	};

	const [g, x] = extendedGcd(a, m);
	if (g !== 1) return null;
	return ((x % m) + m) % m;
};

// ৩৪৫. String Algorithms - KMP Pattern Matching
const KMPSearch = (text, pattern) => {
	const computeLPS = (pat) => {
		const lps = new Array(pat.length).fill(0);
		let len = 0,
			i = 1;
		while (i < pat.length) {
			if (pat[i] === pat[len]) {
				len++;
				lps[i] = len;
				i++;
			} else {
				if (len !== 0) len = lps[len - 1];
				else {
					lps[i] = 0;
					i++;
				}
			}
		}
		return lps;
	};

	const lps = computeLPS(pattern);
	const indices = [];
	let i = 0,
		j = 0;

	while (i < text.length) {
		if (pattern[j] === text[i]) {
			i++;
			j++;
		}
		if (j === pattern.length) {
			indices.push(i - j);
			j = lps[j - 1];
		} else if (i < text.length && pattern[j] !== text[i]) {
			if (j !== 0) j = lps[j - 1];
			else i++;
		}
	}
	return indices;
};

// ৩৪৬. String Algorithms - Rabin-Karp
const rabinKarp = (text, pattern, prime = 101) => {
	const d = 256;
	const n = text.length,
		m = pattern.length;
	let h = 1,
		pHash = 0,
		tHash = 0;
	const indices = [];

	for (let i = 0; i < m - 1; i++) h = (h * d) % prime;

	for (let i = 0; i < m; i++) {
		pHash = (d * pHash + pattern.charCodeAt(i)) % prime;
		tHash = (d * tHash + text.charCodeAt(i)) % prime;
	}

	for (let i = 0; i <= n - m; i++) {
		if (pHash === tHash) {
			let match = true;
			for (let j = 0; j < m; j++) {
				if (text[i + j] !== pattern[j]) {
					match = false;
					break;
				}
			}
			if (match) indices.push(i);
		}

		if (i < n - m) {
			tHash =
				(d * (tHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
			if (tHash < 0) tHash += prime;
		}
	}
	return indices;
};

// ৩৪৭. String Algorithms - Z-Algorithm
const zAlgorithm = (text) => {
	const n = text.length;
	const Z = new Array(n).fill(0);
	let l = 0,
		r = 0;

	for (let i = 1; i < n; i++) {
		if (i <= r) Z[i] = Math.min(r - i + 1, Z[i - l]);
		while (i + Z[i] < n && text[Z[i]] === text[i + Z[i]]) Z[i]++;
		if (i + Z[i] - 1 > r) {
			l = i;
			r = i + Z[i] - 1;
		}
	}
	return Z;
};

// ৩৪৮. String Algorithms - Manacher's Algorithm (Longest Palindromic Substring)
const longestPalindromeManacher = (s) => {
	let t = "^#";
	for (let c of s) t += c + "#";
	t += "$";

	const n = t.length;
	const p = new Array(n).fill(0);
	let center = 0,
		right = 0;
	let maxLen = 0,
		start = 0;

	for (let i = 1; i < n - 1; i++) {
		const mirror = 2 * center - i;
		if (i < right) p[i] = Math.min(right - i, p[mirror]);

		while (t[i + p[i] + 1] === t[i - p[i] - 1]) p[i]++;

		if (i + p[i] > right) {
			center = i;
			right = i + p[i];
		}

		if (p[i] > maxLen) {
			maxLen = p[i];
			start = (i - p[i]) / 2;
		}
	}
	return s.substring(start, start + maxLen);
};

// ৩৪৯. Union Find with Path Compression and Union by Rank
class UnionFind {
	constructor(n) {
		this.parent = Array.from({ length: n }, (_, i) => i);
		this.rank = new Array(n).fill(0);
		this.components = n;
	}

	find(x) {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x]);
		}
		return this.parent[x];
	}

	union(x, y) {
		const px = this.find(x),
			py = this.find(y);
		if (px === py) return false;

		if (this.rank[px] < this.rank[py]) {
			this.parent[px] = py;
		} else if (this.rank[px] > this.rank[py]) {
			this.parent[py] = px;
		} else {
			this.parent[py] = px;
			this.rank[px]++;
		}
		this.components--;
		return true;
	}

	connected(x, y) {
		return this.find(x) === this.find(y);
	}
}

// ৩৫০. Segment Tree with Lazy Propagation
class LazySegmentTree {
	constructor(arr) {
		this.n = arr.length;
		this.tree = new Array(4 * this.n).fill(0);
		this.lazy = new Array(4 * this.n).fill(0);
		this.build(arr, 0, 0, this.n - 1);
	}

	build(arr, node, start, end) {
		if (start === end) {
			this.tree[node] = arr[start];
		} else {
			const mid = Math.floor((start + end) / 2);
			this.build(arr, 2 * node + 1, start, mid);
			this.build(arr, 2 * node + 2, mid + 1, end);
			this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
		}
	}

	push(node, start, end) {
		if (this.lazy[node] !== 0) {
			this.tree[node] += (end - start + 1) * this.lazy[node];
			if (start !== end) {
				this.lazy[2 * node + 1] += this.lazy[node];
				this.lazy[2 * node + 2] += this.lazy[node];
			}
			this.lazy[node] = 0;
		}
	}

	updateRange(node, start, end, left, right, val) {
		this.push(node, start, end);
		if (start > right || end < left) return;
		if (left <= start && end <= right) {
			this.lazy[node] += val;
			this.push(node, start, end);
			return;
		}
		const mid = Math.floor((start + end) / 2);
		this.updateRange(2 * node + 1, start, mid, left, right, val);
		this.updateRange(2 * node + 2, mid + 1, end, left, right, val);
		this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
	}

	queryRange(node, start, end, left, right) {
		this.push(node, start, end);
		if (start > right || end < left) return 0;
		if (left <= start && end <= right) return this.tree[node];
		const mid = Math.floor((start + end) / 2);
		return (
			this.queryRange(2 * node + 1, start, mid, left, right) +
			this.queryRange(2 * node + 2, mid + 1, end, left, right)
		);
	}
}

/* সিস্টেম ডিজাইন & আর্কিটেকচার (৩৫১-৪০০) */

// ৩৫১. Event Sourcing Pattern
class EventStore {
	constructor() {
		this.events = [];
		this.subscribers = new Map();
	}

	append(event) {
		event.timestamp = Date.now();
		event.version = this.events.length + 1;
		this.events.push(event);
		this.notify(event);
	}

	subscribe(eventType, handler) {
		if (!this.subscribers.has(eventType)) {
			this.subscribers.set(eventType, []);
		}
		this.subscribers.get(eventType).push(handler);
	}

	notify(event) {
		const handlers = this.subscribers.get(event.type) || [];
		handlers.forEach((h) => h(event));
	}

	getEvents(aggregateId) {
		return this.events.filter((e) => e.aggregateId === aggregateId);
	}

	replay(aggregateId, projector) {
		return this.getEvents(aggregateId).reduce(projector, null);
	}
}

// ৩৫২. CQRS (Command Query Responsibility Segregation)
class CQRS {
	constructor() {
		this.commandHandlers = new Map();
		this.queryHandlers = new Map();
		this.eventBus = new EventEmitter();
	}

	registerCommand(commandType, handler) {
		this.commandHandlers.set(commandType, handler);
	}

	registerQuery(queryType, handler) {
		this.queryHandlers.set(queryType, handler);
	}

	async execute(command) {
		const handler = this.commandHandlers.get(command.type);
		if (!handler) throw new Error(`No handler for ${command.type}`);
		const events = await handler(command);
		events.forEach((e) => this.eventBus.emit(e.type, e));
		return events;
	}

	async query(query) {
		const handler = this.queryHandlers.get(query.type);
		if (!handler) throw new Error(`No handler for ${query.type}`);
		return handler(query);
	}
}

// ৩৫৩. Circuit Breaker Pattern
class CircuitBreaker {
	constructor(fn, options = {}) {
		this.fn = fn;
		this.failureThreshold = options.failureThreshold || 5;
		this.timeout = options.timeout || 60000;
		this.resetTimeout = options.resetTimeout || 30000;

		this.state = "CLOSED"; // CLOSED, OPEN, HALF_OPEN
		this.failures = 0;
		this.nextAttempt = Date.now();
	}

	async execute(...args) {
		if (this.state === "OPEN") {
			if (Date.now() < this.nextAttempt) {
				throw new Error("Circuit breaker is OPEN");
			}
			this.state = "HALF_OPEN";
		}

		try {
			const result = await this.fn(...args);
			this.onSuccess();
			return result;
		} catch (error) {
			this.onFailure();
			throw error;
		}
	}

	onSuccess() {
		this.failures = 0;
		this.state = "CLOSED";
	}

	onFailure() {
		this.failures++;
		if (this.failures >= this.failureThreshold) {
			this.state = "OPEN";
			this.nextAttempt = Date.now() + this.resetTimeout;
		}
	}
}

// ৩৫৪. Bulkhead Pattern
class Bulkhead {
	constructor(options = {}) {
		this.maxConcurrent = options.maxConcurrent || 10;
		this.maxQueue = options.maxQueue || 100;
		this.running = 0;
		this.queue = [];
	}

	async execute(fn) {
		if (this.running >= this.maxConcurrent) {
			if (this.queue.length >= this.maxQueue) {
				throw new Error("Bulkhead queue full");
			}
			await new Promise((resolve, reject) => {
				this.queue.push({ resolve, reject, fn });
			});
		}

		this.running++;
		try {
			return await fn();
		} finally {
			this.running--;
			this.processQueue();
		}
	}

	processQueue() {
		if (this.queue.length === 0 || this.running >= this.maxConcurrent) return;
		const { resolve, fn } = this.queue.shift();
		resolve(this.execute(fn));
	}
}

// ৩৫৫. Retry Pattern with Exponential Backoff and Jitter
class RetryPolicy {
	constructor(options = {}) {
		this.maxRetries = options.maxRetries || 3;
		this.baseDelay = options.baseDelay || 1000;
		this.maxDelay = options.maxDelay || 30000;
		this.retryableErrors = options.retryableErrors || [];
	}

	async execute(fn) {
		let lastError;
		for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
			try {
				return await fn();
			} catch (error) {
				lastError = error;
				if (attempt === this.maxRetries || !this.isRetryable(error)) {
					throw error;
				}
				await this.delay(attempt);
			}
		}
		throw lastError;
	}

	isRetryable(error) {
		if (this.retryableErrors.length === 0) return true;
		return this.retryableErrors.some((e) => error instanceof e);
	}

	async delay(attempt) {
		const exponentialDelay = Math.min(
			this.baseDelay * Math.pow(2, attempt),
			this.maxDelay
		);
		const jitter = Math.random() * exponentialDelay;
		await new Promise((r) => setTimeout(r, jitter));
	}
}

// ৩৫৬. Saga Pattern for Distributed Transactions
class Saga {
	constructor() {
		this.steps = [];
		this.compensations = [];
	}

	step(action, compensation) {
		this.steps.push(action);
		this.compensations.unshift(compensation);
		return this;
	}

	async execute() {
		const executed = [];
		try {
			for (let i = 0; i < this.steps.length; i++) {
				const result = await this.steps[i]();
				executed.push(i);
			}
			return { success: true };
		} catch (error) {
			for (let i of executed.reverse()) {
				try {
					await this.compensations[i]();
				} catch (compError) {
					console.error("Compensation failed:", compError);
				}
			}
			return { success: false, error };
		}
	}
}

// ৩৫৭. Outbox Pattern
class OutboxPattern {
	constructor(db, messageBroker) {
		this.db = db;
		this.messageBroker = messageBroker;
	}

	async executeTransaction(operations) {
		const transaction = await this.db.beginTransaction();
		try {
			const result = await operations(transaction);
			const outboxMessages = this.extractMessages(result);

			for (let msg of outboxMessages) {
				await transaction.insert("outbox", {
					...msg,
					created_at: new Date(),
					processed: false,
				});
			}

			await transaction.commit();
			return result;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	async processOutbox() {
		const messages = await this.db.query(
			"SELECT * FROM outbox WHERE processed = false LIMIT 100"
		);

		for (let msg of messages) {
			try {
				await this.messageBroker.publish(msg.topic, msg.payload);
				await this.db.update("outbox", msg.id, { processed: true });
			} catch (error) {
				console.error("Failed to process outbox message:", error);
			}
		}
	}
}

// ৩৫৮. Idempotency Key Pattern
class IdempotencyKeyStore {
	constructor(cache, ttl = 86400000) {
		this.cache = cache;
		this.ttl = ttl;
	}

	async execute(key, operation) {
		const existing = await this.cache.get(`idempotency:${key}`);
		if (existing) {
			return JSON.parse(existing);
		}

		const result = await operation();
		await this.cache.setex(
			`idempotency:${key}`,
			this.ttl,
			JSON.stringify(result)
		);
		return result;
	}
}

// ৩৫৯. API Gateway Pattern
class ApiGateway {
	constructor() {
		this.routes = new Map();
		this.middlewares = [];
		this.rateLimiters = new Map();
	}

	route(path, service) {
		this.routes.set(path, service);
		return this;
	}

	use(middleware) {
		this.middlewares.push(middleware);
		return this;
	}

	rateLimit(path, limiter) {
		this.rateLimiters.set(path, limiter);
		return this;
	}

	async handle(request) {
		for (let middleware of this.middlewares) {
			request = await middleware(request);
		}

		const service = this.routes.get(request.path);
		if (!service) throw new Error("Route not found");

		const limiter = this.rateLimiters.get(request.path);
		if (limiter && !limiter.allow()) {
			throw new Error("Rate limit exceeded");
		}

		return service(request);
	}
}

// ৩৬০. BFF (Backend for Frontend) Pattern
class BFF {
	constructor() {
		this.clients = new Map();
		this.transformers = new Map();
	}

	registerClient(name, client) {
		this.clients.set(name, client);
	}

	registerTransformer(clientType, transformer) {
		this.transformers.set(clientType, transformer);
	}

	async fetchData(clientType, query) {
		const client = this.clients.get(clientType);
		const transformer = this.transformers.get(clientType);

		const rawData = await client.fetch(query);
		return transformer(rawData);
	}
}

// ৩৬১. Strangler Fig Pattern
class StranglerFig {
	constructor() {
		this.legacySystem = null;
		this.newSystem = null;
		this.features = new Map();
	}

	registerLegacy(system) {
		this.legacySystem = system;
	}

	registerNew(system) {
		this.newSystem = system;
	}

	migrateFeature(feature, newImplementation) {
		this.features.set(feature, {
			useNew: false,
			newImpl: newImplementation,
		});
	}

	async execute(feature, ...args) {
		const config = this.features.get(feature);
		if (!config || !config.useNew) {
			return this.legacySystem[feature](...args);
		}
		return config.newImpl(...args);
	}

	enableFeature(feature) {
		if (this.features.has(feature)) {
			this.features.get(feature).useNew = true;
		}
	}
}

// ৩৬২. Sidecar Pattern
class Sidecar {
	constructor(mainContainer, sidecarContainer) {
		this.main = mainContainer;
		this.sidecar = sidecarContainer;
		this.sharedVolume = new Map();
	}

	async start() {
		await this.sidecar.start();
		await this.main.start();
		this.startHealthCheck();
	}

	startHealthCheck() {
		setInterval(async () => {
			const mainHealthy = await this.main.healthCheck();
			const sidecarHealthy = await this.sidecar.healthCheck();

			if (!mainHealthy || !sidecarHealthy) {
				console.error("Health check failed");
			}
		}, 5000);
	}

	getMetrics() {
		return this.sidecar.getMetrics();
	}
}

// ৩৬৩. Ambassador Pattern
class Ambassador {
	constructor(service, options = {}) {
		this.service = service;
		this.retryPolicy = options.retryPolicy;
		this.circuitBreaker = options.circuitBreaker;
		this.loadBalancer = options.loadBalancer;
	}

	async request(req) {
		const target = this.loadBalancer?.next() || this.service;

		const operation = async () => {
			if (this.circuitBreaker) {
				return this.circuitBreaker.execute(() => target.call(req));
			}
			return target.call(req);
		};

		if (this.retryPolicy) {
			return this.retryPolicy.execute(operation);
		}
		return operation();
	}
}

// ৩৬৪. Sharding Pattern
class ConsistentHashShard {
	constructor(nodes = [], virtualNodes = 150) {
		this.ring = new Map();
		this.sortedKeys = [];
		this.virtualNodes = virtualNodes;
		nodes.forEach((n) => this.addNode(n));
	}

	addNode(node) {
		for (let i = 0; i < this.virtualNodes; i++) {
			const key = this.hash(`${node.id}:${i}`);
			this.ring.set(key, node);
			this.sortedKeys.push(key);
		}
		this.sortedKeys.sort((a, b) => a - b);
	}

	removeNode(node) {
		for (let i = 0; i < this.virtualNodes; i++) {
			const key = this.hash(`${node.id}:${i}`);
			this.ring.delete(key);
			const idx = this.sortedKeys.indexOf(key);
			if (idx > -1) this.sortedKeys.splice(idx, 1);
		}
	}

	getNode(key) {
		if (this.sortedKeys.length === 0) return null;
		const hash = this.hash(key);
		const idx = this.sortedKeys.findIndex((k) => k >= hash);
		const targetKey = idx === -1 ? this.sortedKeys[0] : this.sortedKeys[idx];
		return this.ring.get(targetKey);
	}

	hash(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash;
		}
		return hash;
	}
}

// ৩৬৫. Materialized View Pattern
class MaterializedView {
	constructor(source, projector, options = {}) {
		this.source = source;
		this.projector = projector;
		this.view = null;
		this.lastUpdate = null;
		this.ttl = options.ttl || 60000;
		this.subscribers = [];
	}

	async get(refresh = false) {
		if (!refresh && this.view && Date.now() - this.lastUpdate < this.ttl) {
			return this.view;
		}

		const data = await this.source.getAll();
		this.view = data.reduce(this.projector, {});
		this.lastUpdate = Date.now();

		this.notifySubscribers();
		return this.view;
	}

	subscribe(callback) {
		this.subscribers.push(callback);
	}

	notifySubscribers() {
		this.subscribers.forEach((cb) => cb(this.view));
	}

	async invalidate() {
		this.view = null;
		await this.get(true);
	}
}

// ৩৬৬. Event-Driven Architecture
class EventBus {
	constructor() {
		this.subscribers = new Map();
		this.eventStore = [];
		this.snapshotInterval = 1000;
	}

	subscribe(eventType, handler, options = {}) {
		if (!this.subscribers.has(eventType)) {
			this.subscribers.set(eventType, []);
		}
		this.subscribers.get(eventType).push({
			handler,
			filter: options.filter,
			priority: options.priority || 0,
		});

		// Sort by priority
		this.subscribers.get(eventType).sort((a, b) => b.priority - a.priority);
	}

	async publish(event) {
		this.eventStore.push({
			...event,
			timestamp: Date.now(),
			id: this.generateId(),
		});

		const handlers = this.subscribers.get(event.type) || [];
		for (let { handler, filter } of handlers) {
			if (filter && !filter(event)) continue;
			try {
				await handler(event);
			} catch (error) {
				console.error("Event handler failed:", error);
			}
		}
	}

	generateId() {
		return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	replay(fromTimestamp) {
		return this.eventStore.filter((e) => e.timestamp >= fromTimestamp);
	}
}

// ৩৬৭. Saga Orchestration Pattern
class SagaOrchestrator {
	constructor() {
		this.sagas = new Map();
		this.compensations = new Map();
	}

	defineSaga(name, steps) {
		this.sagas.set(name, steps);
		this.compensations.set(name, []);
	}

	async execute(sagaName, context) {
		const steps = this.sagas.get(sagaName);
		const executed = [];

		try {
			for (let step of steps) {
				const result = await step.action(context);
				executed.push(step);
				context = { ...context, ...result };
			}
			return { success: true, context };
		} catch (error) {
			for (let step of executed.reverse()) {
				if (step.compensate) {
					try {
						await step.compensate(context);
					} catch (compError) {
						console.error("Compensation failed:", compError);
					}
				}
			}
			return { success: false, error, context };
		}
	}
}

// ৩৬৮. Multi-Tenancy Pattern
class MultiTenantDatabase {
	constructor() {
		this.tenants = new Map();
		this.isolationStrategy = "schema"; // schema, row, or database
	}

	async createTenant(tenantId, config) {
		switch (this.isolationStrategy) {
			case "schema":
				await this.createSchema(tenantId);
				break;
			case "database":
				await this.createDatabase(tenantId);
				break;
			case "row":
				await this.setupRowLevelSecurity(tenantId);
				break;
		}
		this.tenants.set(tenantId, config);
	}

	async query(tenantId, sql, params) {
		const tenant = this.tenants.get(tenantId);
		if (!tenant) throw new Error("Tenant not found");

		if (this.isolationStrategy === "row") {
			sql = this.addTenantFilter(sql, tenantId);
		} else if (this.isolationStrategy === "schema") {
			sql = this.addSchemaPrefix(sql, tenantId);
		}

		return this.executeQuery(sql, params);
	}

	addTenantFilter(sql, tenantId) {
		// Add WHERE tenant_id = ? to queries
		return sql; // Simplified
	}
}

// ৩৬৯. Feature Flag Pattern
class FeatureFlagManager {
	constructor() {
		this.flags = new Map();
		this.strategies = new Map();
		this.userOverrides = new Map();
	}

	registerStrategy(name, strategy) {
		this.strategies.set(name, strategy);
	}

	isEnabled(flagName, context = {}) {
		const flag = this.flags.get(flagName);
		if (!flag) return false;

		if (!flag.enabled) return false;

		// Check user override
		if (this.userOverrides.has(`${flagName}:${context.userId}`)) {
			return this.userOverrides.get(`${flagName}:${context.userId}`);
		}

		// Apply strategy
		const strategy = this.strategies.get(flag.strategy);
		if (strategy) {
			return strategy.evaluate(flag, context);
		}

		// Percentage rollout
		if (flag.percentage) {
			const hash = this.hash(`${flagName}:${context.userId}`);
			return hash % 100 < flag.percentage;
		}

		return true;
	}

	hash(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash = hash & hash;
		}
		return Math.abs(hash);
	}
}

// ৩৭০. Health Check Pattern
class HealthCheck {
	constructor() {
		this.checks = new Map();
		this.cache = null;
		this.cacheTime = 0;
		this.cacheTTL = 30000;
	}

	register(name, checkFn, critical = false) {
		this.checks.set(name, { fn: checkFn, critical });
	}

	async check() {
		const now = Date.now();
		if (this.cache && now - this.cacheTime < this.cacheTTL) {
			return this.cache;
		}

		const results = await Promise.all(
			Array.from(this.checks.entries()).map(
				async ([name, { fn, critical }]) => {
					try {
						const result = await fn();
						return { name, status: "UP", critical, ...result };
					} catch (error) {
						return { name, status: "DOWN", critical, error: error.message };
					}
				}
			)
		);

		const criticalFailed = results.some(
			(r) => r.critical && r.status === "DOWN"
		);
		const status =
			criticalFailed ? "DOWN"
			: results.some((r) => r.status === "DOWN") ? "DEGRADED"
			: "UP";

		this.cache = { status, checks: results, timestamp: new Date() };
		this.cacheTime = now;
		return this.cache;
	}
}

// ৩৭১. Distributed Lock Pattern
class DistributedLock {
	constructor(redis, options = {}) {
		this.redis = redis;
		this.ttl = options.ttl || 30000;
		this.retryDelay = options.retryDelay || 100;
		this.retryCount = options.retryCount || 10;
	}

	async acquire(lockName, identifier) {
		const key = `lock:${lockName}`;
		for (let i = 0; i < this.retryCount; i++) {
			const acquired = await this.redis.set(
				key,
				identifier,
				"PX",
				this.ttl,
				"NX"
			);
			if (acquired) return true;
			await this.delay(this.retryDelay);
		}
		return false;
	}

	async release(lockName, identifier) {
		const key = `lock:${lockName}`;
		const current = await this.redis.get(key);
		if (current === identifier) {
			return this.redis.del(key);
		}
		return false;
	}

	async withLock(lockName, fn) {
		const identifier = `${Date.now()}-${Math.random()}`;
		const acquired = await this.acquire(lockName, identifier);
		if (!acquired) throw new Error("Could not acquire lock");

		try {
			return await fn();
		} finally {
			await this.release(lockName, identifier);
		}
	}

	delay(ms) {
		return new Promise((r) => setTimeout(r, ms));
	}
}

// ৩৭২. Cache-Aside Pattern
class CacheAside {
	constructor(cache, db, options = {}) {
		this.cache = cache;
		this.db = db;
		this.ttl = options.ttl || 3600;
	}

	async get(key) {
		let value = await this.cache.get(key);
		if (value) return JSON.parse(value);

		value = await this.db.get(key);
		if (value) {
			await this.cache.setex(key, this.ttl, JSON.stringify(value));
		}
		return value;
	}

	async set(key, value) {
		await this.db.set(key, value);
		await this.cache.setex(key, this.ttl, JSON.stringify(value));
	}

	async delete(key) {
		await this.db.delete(key);
		await this.cache.del(key);
	}

	async refresh(key) {
		await this.cache.del(key);
		return this.get(key);
	}
}

// ৩৭৩. Write-Through Cache Pattern
class WriteThroughCache {
	constructor(cache, db) {
		this.cache = cache;
		this.db = db;
		this.pendingWrites = new Map();
	}

	async set(key, value) {
		// Write to cache first
		await this.cache.set(key, JSON.stringify(value));

		// Then write to DB asynchronously
		this.pendingWrites.set(key, value);
		this.flushToDb();

		return value;
	}

	async flushToDb() {
		if (this.flushing) return;
		this.flushing = true;

		const batch = new Map(this.pendingWrites);
		this.pendingWrites.clear();

		try {
			for (let [key, value] of batch) {
				await this.db.set(key, value);
			}
		} finally {
			this.flushing = false;
			if (this.pendingWrites.size > 0) {
				this.flushToDb();
			}
		}
	}
}

// ৩৭৪. Read-Through Cache Pattern
class ReadThroughCache {
	constructor(cache, db, options = {}) {
		this.cache = cache;
		this.db = db;
		this.loader = options.loader;
		this.ttl = options.ttl || 3600;
	}

	async get(key) {
		const cached = await this.cache.get(key);
		if (cached) return JSON.parse(cached);

		// Cache miss - load through
		const value = this.loader ? await this.loader(key) : await this.db.get(key);

		if (value) {
			await this.cache.setex(key, this.ttl, JSON.stringify(value));
		}
		return value;
	}

	async getBatch(keys) {
		const cached = await this.cache.mget(keys);
		const missing = [];
		const results = new Map();

		keys.forEach((key, i) => {
			if (cached[i]) {
				results.set(key, JSON.parse(cached[i]));
			} else {
				missing.push(key);
			}
		});

		if (missing.length > 0) {
			const loaded = await this.db.getBatch(missing);
			const toCache = [];

			for (let [key, value] of loaded) {
				results.set(key, value);
				toCache.push(key, JSON.stringify(value));
			}

			if (toCache.length > 0) {
				await this.cache.mset(toCache);
				await Promise.all(missing.map((k) => this.cache.expire(k, this.ttl)));
			}
		}

		return results;
	}
}

// ৩৭৫. Write-Behind Cache Pattern
class WriteBehindCache {
	constructor(cache, db, options = {}) {
		this.cache = cache;
		this.db = db;
		this.batchSize = options.batchSize || 100;
		this.flushInterval = options.flushInterval || 5000;
		this.writeQueue = [];
		this.startFlushTimer();
	}

	async set(key, value) {
		await this.cache.set(key, JSON.stringify(value));
		this.writeQueue.push({ key, value, operation: "SET" });
		this.checkFlush();
	}

	async delete(key) {
		await this.cache.del(key);
		this.writeQueue.push({ key, operation: "DELETE" });
		this.checkFlush();
	}

	checkFlush() {
		if (this.writeQueue.length >= this.batchSize) {
			this.flush();
		}
	}

	startFlushTimer() {
		setInterval(() => this.flush(), this.flushInterval);
	}

	async flush() {
		if (this.writeQueue.length === 0 || this.flushing) return;
		this.flushing = true;

		const batch = this.writeQueue.splice(0, this.batchSize);

		try {
			await this.db.transaction(async (trx) => {
				for (let op of batch) {
					if (op.operation === "SET") {
						await trx.set(op.key, op.value);
					} else {
						await trx.delete(op.key);
					}
				}
			});
		} catch (error) {
			// Put back in queue for retry
			this.writeQueue.unshift(...batch);
			console.error("Flush failed:", error);
		} finally {
			this.flushing = false;
		}
	}
}

// ৩৭৬. Asynchronous Request-Reply Pattern
class AsyncRequestReply {
	constructor(messageBroker, options = {}) {
		this.broker = messageBroker;
		this.pending = new Map();
		this.timeout = options.timeout || 30000;
		this.replyQueue = `reply-${Date.now()}`;
	}

	async request(queue, message) {
		const correlationId = this.generateId();
		const replyPromise = new Promise((resolve, reject) => {
			this.pending.set(correlationId, { resolve, reject });
			setTimeout(() => {
				this.pending.delete(correlationId);
				reject(new Error("Request timeout"));
			}, this.timeout);
		});

		await this.broker.send(queue, {
			...message,
			correlationId,
			replyTo: this.replyQueue,
		});

		return replyPromise;
	}

	async startListening() {
		await this.broker.subscribe(this.replyQueue, (message) => {
			const pending = this.pending.get(message.correlationId);
			if (pending) {
				this.pending.delete(message.correlationId);
				if (message.error) {
					pending.reject(new Error(message.error));
				} else {
					pending.resolve(message.payload);
				}
			}
		});
	}

	generateId() {
		return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}
}

// ৩৭৭. Priority Queue Pattern
class PriorityMessageQueue {
	constructor() {
		this.queues = new Map();
		this.priorities = ["critical", "high", "normal", "low"];
		this.processing = false;
	}

	enqueue(message, priority = "normal") {
		if (!this.queues.has(priority)) {
			this.queues.set(priority, []);
		}
		this.queues.get(priority).push({
			...message,
			enqueuedAt: Date.now(),
		});
		this.process();
	}

	async process() {
		if (this.processing) return;
		this.processing = true;

		while (this.hasMessages()) {
			const message = this.dequeue();
			if (message) {
				try {
					await this.handle(message);
				} catch (error) {
					console.error("Message processing failed:", error);
					this.handleError(message, error);
				}
			}
		}

		this.processing = false;
	}

	dequeue() {
		for (let priority of this.priorities) {
			const queue = this.queues.get(priority);
			if (queue && queue.length > 0) {
				return queue.shift();
			}
		}
		return null;
	}

	hasMessages() {
		return this.priorities.some((p) => this.queues.get(p)?.length > 0);
	}
}

// ৩৭৮. Competing Consumers Pattern
class CompetingConsumers {
	constructor(queue, options = {}) {
		this.queue = queue;
		this.consumers = [];
		this.maxConsumers = options.maxConsumers || 5;
		this.prefetchCount = options.prefetchCount || 1;
	}

	addConsumer(handler) {
		if (this.consumers.length >= this.maxConsumers) {
			throw new Error("Max consumers reached");
		}

		const consumer = {
			id: this.consumers.length,
			handler,
			active: false,
			messages: [],
		};

		this.consumers.push(consumer);
		this.startConsumer(consumer);
	}

	async startConsumer(consumer) {
		while (true) {
			if (consumer.messages.length >= this.prefetchCount) {
				await this.delay(100);
				continue;
			}

			const message = await this.queue.dequeue();
			if (!message) {
				await this.delay(1000);
				continue;
			}

			consumer.messages.push(message);
			consumer.active = true;

			try {
				await consumer.handler(message);
				await this.queue.ack(message);
			} catch (error) {
				await this.queue.nack(message, error);
			} finally {
				consumer.messages = consumer.messages.filter(
					(m) => m.id !== message.id
				);
				consumer.active = consumer.messages.length > 0;
			}
		}
	}

	getStats() {
		return this.consumers.map((c) => ({
			id: c.id,
			active: c.active,
			pendingMessages: c.messages.length,
		}));
	}

	delay(ms) {
		return new Promise((r) => setTimeout(r, ms));
	}
}

// ৩৭৯. Scheduler Agent Supervisor Pattern
class SchedulerAgentSupervisor {
	constructor() {
		this.schedulers = new Map();
		this.agents = new Map();
		this.supervisor = null;
	}

	createScheduler(id, schedule) {
		const scheduler = {
			id,
			schedule,
			nextRun: this.calculateNextRun(schedule),
			agent: null,
		};
		this.schedulers.set(id, scheduler);
		return scheduler;
	}

	assignAgent(schedulerId, agent) {
		const scheduler = this.schedulers.get(schedulerId);
		if (!scheduler) throw new Error("Scheduler not found");

		agent.scheduler = scheduler;
		this.agents.set(agent.id, agent);
		scheduler.agent = agent;

		this.startAgent(agent);
	}

	async startAgent(agent) {
		while (true) {
			const now = Date.now();
			if (now >= agent.scheduler.nextRun) {
				try {
					await this.executeTask(agent);
					agent.scheduler.nextRun = this.calculateNextRun(
						agent.scheduler.schedule
					);
				} catch (error) {
					this.supervisor?.handleError(agent, error);
				}
			}
			await this.delay(Math.max(0, agent.scheduler.nextRun - now));
		}
	}

	calculateNextRun(schedule) {
		// Parse cron-like schedule
		return Date.now() + (schedule.interval || 60000);
	}

	setSupervisor(supervisor) {
		this.supervisor = supervisor;
	}
}

/**
 * =====================================================
 * 100+ VANILLA JAVASCRIPT INTERVIEW PROBLEMS
 * =====================================================
 *
 * Author: Interview Preparation Guide
 * Total Problems: 105+
 * Categories: String, Array, Number, Object, Recursion, Functional Programming, Advanced
 *
 * Usage: Node.js এ রান করতে: node interview_problems.js
 * বা Browser Console এ কপি-পেস্ট করে টেস্ট করুন
 */

console.log("🚀 Loading 100+ JavaScript Interview Problems...\n");

// =====================================================
// SECTION 1: STRING MANIPULATION (1-15)
// =====================================================

// 1. Reverse a String
function reverseString(str) {
	return str.split("").reverse().join("");
}

function reverseStringManual(str) {
	let result = "";
	for (let i = str.length - 1; i >= 0; i--) {
		result += str[i];
	}
	return result;
}

// 2. Check Palindrome
function isPalindrome(str) {
	const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
	return cleaned === cleaned.split("").reverse().join("");
}

// 3. Count Vowels
function countVowels(str) {
	const vowels = "aeiouAEIOU";
	let count = 0;
	for (let char of str) {
		if (vowels.includes(char)) count++;
	}
	return count;
}

// 4. Find First Non-Repeating Character
function firstNonRepeatingChar(str) {
	const charCount = {};
	for (let char of str) {
		charCount[char] = (charCount[char] || 0) + 1;
	}
	for (let char of str) {
		if (charCount[char] === 1) return char;
	}
	return null;
}

// 5. Anagram Check
function isAnagram(str1, str2) {
	const clean1 = str1
		.toLowerCase()
		.replace(/\s/g, "")
		.split("")
		.sort()
		.join("");
	const clean2 = str2
		.toLowerCase()
		.replace(/\s/g, "")
		.split("")
		.sort()
		.join("");
	return clean1 === clean2;
}

// 6. Longest Word in Sentence
function longestWord(sentence) {
	const words = sentence.split(" ");
	let longest = "";
	for (let word of words) {
		const cleanWord = word.replace(/[^a-zA-Z]/g, "");
		if (cleanWord.length > longest.length) {
			longest = cleanWord;
		}
	}
	return longest;
}

// 7. Capitalize First Letter of Each Word
function capitalizeWords(str) {
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
}

// 8. Remove Duplicates from String
function removeDuplicates(str) {
	let result = "";
	const seen = new Set();
	for (let char of str) {
		if (!seen.has(char)) {
			seen.add(char);
			result += char;
		}
	}
	return result;
}

// 9. String Compression
function compressString(str) {
	if (!str) return "";
	let result = "";
	let count = 1;
	for (let i = 1; i <= str.length; i++) {
		if (str[i] === str[i - 1]) {
			count++;
		} else {
			result += str[i - 1] + count;
			count = 1;
		}
	}
	return result.length < str.length ? result : str;
}

// 10. Check if String Contains All Unique Characters
function hasAllUniqueChars(str) {
	const charSet = new Set();
	for (let char of str) {
		if (charSet.has(char)) return false;
		charSet.add(char);
	}
	return true;
}

// 11. Find All Permutations of a String
function getPermutations(str) {
	if (str.length <= 1) return [str];
	const permutations = [];
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		const remainingChars = str.slice(0, i) + str.slice(i + 1);
		const remainingPermutations = getPermutations(remainingChars);
		for (let perm of remainingPermutations) {
			permutations.push(char + perm);
		}
	}
	return permutations;
}

// 12. Validate Email Format
function isValidEmail(email) {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern.test(email);
}

// 13. Truncate String with Ellipsis
function truncateString(str, maxLength) {
	if (str.length <= maxLength) return str;
	return str.slice(0, maxLength - 3) + "...";
}

// 14. Count Character Frequency
function charFrequency(str) {
	const freq = {};
	for (let char of str) {
		freq[char] = (freq[char] || 0) + 1;
	}
	return freq;
}

// 15. Replace Spaces with %20 (URL Encoding)
function urlEncode(str) {
	let result = "";
	for (let char of str) {
		result += char === " " ? "%20" : char;
	}
	return result;
}

// =====================================================
// SECTION 2: ARRAY OPERATIONS (16-35)
// =====================================================

// 16. Find Maximum Element
function findMax(arr) {
	if (arr.length === 0) return undefined;
	let max = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > max) max = arr[i];
	}
	return max;
}

// 17. Find Second Largest Element
function secondLargest(arr) {
	if (arr.length < 2) return undefined;
	let first = -Infinity,
		second = -Infinity;
	for (let num of arr) {
		if (num > first) {
			second = first;
			first = num;
		} else if (num > second && num !== first) {
			second = num;
		}
	}
	return second === -Infinity ? undefined : second;
}

// 18. Remove Duplicates from Array
function removeDuplicates(arr) {
	const seen = new Set();
	const result = [];
	for (let item of arr) {
		if (!seen.has(item)) {
			seen.add(item);
			result.push(item);
		}
	}
	return result;
}

// 19. Flatten Nested Array
function flattenArray(arr) {
	const result = [];
	function flatten(item) {
		if (Array.isArray(item)) {
			for (let element of item) {
				flatten(element);
			}
		} else {
			result.push(item);
		}
	}
	flatten(arr);
	return result;
}

// 20. Array Rotation (Left)
function rotateLeft(arr, k) {
	if (arr.length === 0) return arr;
	k = k % arr.length;
	const rotated = [];
	for (let i = k; i < arr.length; i++) {
		rotated.push(arr[i]);
	}
	for (let i = 0; i < k; i++) {
		rotated.push(arr[i]);
	}
	return rotated;
}

// 21. Find Missing Number in Sequence
function findMissingNumber(arr, n) {
	const expectedSum = (n * (n + 1)) / 2;
	let actualSum = 0;
	for (let num of arr) {
		actualSum += num;
	}
	return expectedSum - actualSum;
}

// 22. Two Sum Problem
function twoSum(arr, target) {
	const numMap = {};
	for (let i = 0; i < arr.length; i++) {
		const complement = target - arr[i];
		if (numMap[complement] !== undefined) {
			return [numMap[complement], i];
		}
		numMap[arr[i]] = i;
	}
	return null;
}

// 23. Merge Two Sorted Arrays
function mergeSortedArrays(arr1, arr2) {
	const merged = [];
	let i = 0,
		j = 0;
	while (i < arr1.length && j < arr2.length) {
		if (arr1[i] < arr2[j]) {
			merged.push(arr1[i++]);
		} else {
			merged.push(arr2[j++]);
		}
	}
	while (i < arr1.length) merged.push(arr1[i++]);
	while (j < arr2.length) merged.push(arr2[j++]);
	return merged;
}

// 24. Find Intersection of Two Arrays
function findIntersection(arr1, arr2) {
	const set2 = new Set(arr2);
	const intersection = [];
	for (let num of arr1) {
		if (set2.has(num) && !intersection.includes(num)) {
			intersection.push(num);
		}
	}
	return intersection;
}

// 25. Move Zeros to End
function moveZerosToEnd(arr) {
	const nonZeros = [];
	let zeroCount = 0;
	for (let num of arr) {
		if (num === 0) {
			zeroCount++;
		} else {
			nonZeros.push(num);
		}
	}
	return [...nonZeros, ...Array(zeroCount).fill(0)];
}

// 26. Find Majority Element
function majorityElement(arr) {
	const countMap = {};
	const majorityCount = Math.floor(arr.length / 2);
	for (let num of arr) {
		countMap[num] = (countMap[num] || 0) + 1;
		if (countMap[num] > majorityCount) {
			return num;
		}
	}
	return null;
}

// 27. Product of Array Except Self
function productExceptSelf(arr) {
	const n = arr.length;
	const result = new Array(n).fill(1);
	let leftProduct = 1;
	for (let i = 0; i < n; i++) {
		result[i] = leftProduct;
		leftProduct *= arr[i];
	}
	let rightProduct = 1;
	for (let i = n - 1; i >= 0; i--) {
		result[i] *= rightProduct;
		rightProduct *= arr[i];
	}
	return result;
}

// 28. Find Subarray with Given Sum
function subarrayWithSum(arr, target) {
	let start = 0;
	let currentSum = 0;
	for (let end = 0; end < arr.length; end++) {
		currentSum += arr[end];
		while (currentSum > target && start <= end) {
			currentSum -= arr[start++];
		}
		if (currentSum === target) {
			return arr.slice(start, end + 1);
		}
	}
	return null;
}

// 29. Container With Most Water
function maxArea(heights) {
	let left = 0,
		right = heights.length - 1;
	let maxArea = 0;
	while (left < right) {
		const width = right - left;
		const height = Math.min(heights[left], heights[right]);
		maxArea = Math.max(maxArea, width * height);
		if (heights[left] < heights[right]) {
			left++;
		} else {
			right--;
		}
	}
	return maxArea;
}

// 30. Find Pairs with Given Difference
function findPairsWithDiff(arr, diff) {
	const numSet = new Set(arr);
	const pairs = [];
	for (let num of arr) {
		if (numSet.has(num + diff)) {
			pairs.push([num, num + diff]);
		}
	}
	return pairs;
}

// 31. Check if Array is Sorted
function isSorted(arr) {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[i - 1]) return false;
	}
	return true;
}

// 32. Find Leaders in Array
function findLeaders(arr) {
	const leaders = [];
	let maxFromRight = -Infinity;
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] > maxFromRight) {
			leaders.unshift(arr[i]);
			maxFromRight = arr[i];
		}
	}
	return leaders;
}

// 33. Rearrange Array Alternating High-Low
function rearrangeAlternate(arr) {
	const sorted = [...arr].sort((a, b) => a - b);
	const result = [];
	let left = 0,
		right = sorted.length - 1;
	let toggle = true;
	while (left <= right) {
		if (toggle) {
			result.push(sorted[right--]);
		} else {
			result.push(sorted[left++]);
		}
		toggle = !toggle;
	}
	return result;
}

// 34. Find Maximum Subarray Sum (Kadane's Algorithm)
function maxSubarraySum(arr) {
	let maxSoFar = arr[0];
	let currentMax = arr[0];
	for (let i = 1; i < arr.length; i++) {
		currentMax = Math.max(arr[i], currentMax + arr[i]);
		maxSoFar = Math.max(maxSoFar, currentMax);
	}
	return maxSoFar;
}

// 35. Find All Subsets/Power Set
function getAllSubsets(arr) {
	const subsets = [[]];
	for (let num of arr) {
		const currentLength = subsets.length;
		for (let i = 0; i < currentLength; i++) {
			subsets.push([...subsets[i], num]);
		}
	}
	return subsets;
}

// =====================================================
// SECTION 3: NUMBER & MATH (36-50)
// =====================================================

// 36. Check Prime Number
function isPrime(num) {
	if (num <= 1) return false;
	if (num <= 3) return true;
	if (num % 2 === 0 || num % 3 === 0) return false;
	for (let i = 5; i * i <= num; i += 6) {
		if (num % i === 0 || num % (i + 2) === 0) return false;
	}
	return true;
}

// 37. Find GCD
function gcd(a, b) {
	while (b !== 0) {
		const temp = b;
		b = a % b;
		a = temp;
	}
	return a;
}

// 38. Find LCM
function lcm(a, b) {
	return (a * b) / gcd(a, b);
}

// 39. Check Armstrong Number
function isArmstrong(num) {
	const digits = String(num).split("");
	const power = digits.length;
	let sum = 0;
	for (let digit of digits) {
		sum += Math.pow(Number(digit), power);
	}
	return sum === num;
}

// 40. Generate Fibonacci Sequence
function fibonacci(n) {
	if (n <= 0) return [];
	if (n === 1) return [0];
	const fib = [0, 1];
	for (let i = 2; i < n; i++) {
		fib.push(fib[i - 1] + fib[i - 2]);
	}
	return fib;
}

// 41. Factorial Calculation
function factorial(n) {
	if (n < 0) return undefined;
	if (n === 0 || n === 1) return 1;
	let result = 1;
	for (let i = 2; i <= n; i++) {
		result *= i;
	}
	return result;
}

// 42. Check Perfect Number
function isPerfectNumber(num) {
	if (num <= 1) return false;
	let sum = 1;
	for (let i = 2; i * i <= num; i++) {
		if (num % i === 0) {
			sum += i;
			if (i !== num / i) sum += num / i;
		}
	}
	return sum === num;
}

// 43. Integer to Roman Numerals
function intToRoman(num) {
	const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	const symbols = [
		"M",
		"CM",
		"D",
		"CD",
		"C",
		"XC",
		"L",
		"XL",
		"X",
		"IX",
		"V",
		"IV",
		"I",
	];
	let result = "";
	for (let i = 0; i < values.length; i++) {
		while (num >= values[i]) {
			result += symbols[i];
			num -= values[i];
		}
	}
	return result;
}

// 44. Roman to Integer
function romanToInt(s) {
	const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
	let result = 0;
	for (let i = 0; i < s.length; i++) {
		const current = romanMap[s[i]];
		const next = romanMap[s[i + 1]];
		if (next && current < next) {
			result -= current;
		} else {
			result += current;
		}
	}
	return result;
}

// 45. Power Function
function power(x, n) {
	if (n === 0) return 1;
	if (n < 0) return 1 / power(x, -n);
	const half = power(x, Math.floor(n / 2));
	if (n % 2 === 0) {
		return half * half;
	} else {
		return x * half * half;
	}
}

// 46. Sqrt without built-in function
function sqrt(num) {
	if (num < 0) return NaN;
	if (num === 0 || num === 1) return num;
	let guess = num / 2;
	for (let i = 0; i < 100; i++) {
		guess = (guess + num / guess) / 2;
	}
	return Math.floor(guess);
}

// 47. Count Digits in Number
function countDigits(num) {
	if (num === 0) return 1;
	num = Math.abs(num);
	let count = 0;
	while (num > 0) {
		count++;
		num = Math.floor(num / 10);
	}
	return count;
}

// 48. Reverse Integer
function reverseInteger(num) {
	const isNegative = num < 0;
	num = Math.abs(num);
	let reversed = 0;
	while (num > 0) {
		reversed = reversed * 10 + (num % 10);
		num = Math.floor(num / 10);
	}
	return isNegative ? -reversed : reversed;
}

// 49. Check if Power of Two
function isPowerOfTwo(n) {
	return n > 0 && (n & (n - 1)) === 0;
}

// 50. Generate Prime Numbers up to N
function sieveOfEratosthenes(n) {
	const isPrime = new Array(n + 1).fill(true);
	isPrime[0] = isPrime[1] = false;
	for (let i = 2; i * i <= n; i++) {
		if (isPrime[i]) {
			for (let j = i * i; j <= n; j += i) {
				isPrime[j] = false;
			}
		}
	}
	const primes = [];
	for (let i = 2; i <= n; i++) {
		if (isPrime[i]) primes.push(i);
	}
	return primes;
}

// =====================================================
// SECTION 4: OBJECT & DATA STRUCTURE (51-65)
// =====================================================

// 51. Deep Clone Object
function deepClone(obj) {
	if (obj === null || typeof obj !== "object") return obj;
	if (obj instanceof Date) return new Date(obj);
	if (obj instanceof Array) return obj.map((item) => deepClone(item));
	const cloned = {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			cloned[key] = deepClone(obj[key]);
		}
	}
	return cloned;
}

// 52. Flatten Object
function flattenObject(obj, prefix = "", result = {}) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			const newKey = prefix ? `${prefix}.${key}` : key;
			if (
				typeof obj[key] === "object" &&
				obj[key] !== null &&
				!Array.isArray(obj[key])
			) {
				flattenObject(obj[key], newKey, result);
			} else {
				result[newKey] = obj[key];
			}
		}
	}
	return result;
}

// 53. Merge Two Objects Deeply
function deepMerge(target, source) {
	const result = { ...target };
	for (let key in source) {
		if (source.hasOwnProperty(key)) {
			if (
				typeof source[key] === "object" &&
				source[key] !== null &&
				!Array.isArray(source[key])
			) {
				result[key] = deepMerge(result[key] || {}, source[key]);
			} else {
				result[key] = source[key];
			}
		}
	}
	return result;
}

// 54. Get Object Values by Path
function getByPath(obj, path) {
	const keys = path.split(".");
	let current = obj;
	for (let key of keys) {
		if (current === null || current === undefined) return undefined;
		current = current[key];
	}
	return current;
}

// 55. Group Array of Objects by Key
function groupBy(arr, key) {
	const grouped = {};
	for (let item of arr) {
		const groupKey = item[key];
		if (!grouped[groupKey]) {
			grouped[groupKey] = [];
		}
		grouped[groupKey].push(item);
	}
	return grouped;
}

// 56. Count Occurrences in Array
function countOccurrences(arr) {
	const count = {};
	for (let item of arr) {
		count[item] = (count[item] || 0) + 1;
	}
	return count;
}

// 57. Find Key by Value in Object
function findKeyByValue(obj, value) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			return key;
		}
	}
	return undefined;
}

// 58. Invert Object
function invertObject(obj) {
	const inverted = {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			inverted[obj[key]] = key;
		}
	}
	return inverted;
}

// 59. Pick Specific Keys from Object
function pick(obj, keys) {
	const result = {};
	for (let key of keys) {
		if (key in obj) {
			result[key] = obj[key];
		}
	}
	return result;
}

// 60. Omit Keys from Object
function omit(obj, keysToOmit) {
	const result = {};
	const omitSet = new Set(keysToOmit);
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && !omitSet.has(key)) {
			result[key] = obj[key];
		}
	}
	return result;
}

// 61. Check if Two Objects are Equal
function isEqual(obj1, obj2) {
	if (obj1 === obj2) return true;
	if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
	if (obj1 === null || obj2 === null) return false;
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (let key of keys1) {
		if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
			return false;
		}
	}
	return true;
}

// 62. Create Counter Object
function createCounter() {
	let count = 0;
	return {
		increment: function () {
			return ++count;
		},
		decrement: function () {
			return --count;
		},
		getCount: function () {
			return count;
		},
		reset: function () {
			count = 0;
			return count;
		},
	};
}

// 63. LRU Cache Implementation
function createLRUCache(capacity) {
	const cache = new Map();
	return {
		get: function (key) {
			if (!cache.has(key)) return -1;
			const value = cache.get(key);
			cache.delete(key);
			cache.set(key, value);
			return value;
		},
		put: function (key, value) {
			if (cache.has(key)) {
				cache.delete(key);
			} else if (cache.size >= capacity) {
				const firstKey = cache.keys().next().value;
				cache.delete(firstKey);
			}
			cache.set(key, value);
		},
		getCache: function () {
			return Array.from(cache.entries());
		},
	};
}

// 64. Implement Stack using Object
function createStack() {
	const items = {};
	let count = 0;
	return {
		push: function (item) {
			items[count++] = item;
			return count;
		},
		pop: function () {
			if (count === 0) return undefined;
			const item = items[--count];
			delete items[count];
			return item;
		},
		peek: function () {
			return count > 0 ? items[count - 1] : undefined;
		},
		isEmpty: function () {
			return count === 0;
		},
		size: function () {
			return count;
		},
	};
}

// 65. Implement Queue using Two Stacks
function createQueue() {
	const stack1 = [];
	const stack2 = [];
	return {
		enqueue: function (item) {
			stack1.push(item);
		},
		dequeue: function () {
			if (stack2.length === 0) {
				while (stack1.length > 0) {
					stack2.push(stack1.pop());
				}
			}
			return stack2.pop();
		},
		isEmpty: function () {
			return stack1.length === 0 && stack2.length === 0;
		},
		size: function () {
			return stack1.length + stack2.length;
		},
	};
}

// =====================================================
// SECTION 5: RECURSION PROBLEMS (66-75)
// =====================================================

// 66. Sum of Array using Recursion
function recursiveSum(arr, index = 0) {
	if (index >= arr.length) return 0;
	return arr[index] + recursiveSum(arr, index + 1);
}

// 67. Find Max in Array using Recursion
function recursiveMax(arr, index = 0) {
	if (index === arr.length - 1) return arr[index];
	return Math.max(arr[index], recursiveMax(arr, index + 1));
}

// 68. Binary Search using Recursion
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
	if (left > right) return -1;
	const mid = Math.floor((left + right) / 2);
	if (arr[mid] === target) return mid;
	if (arr[mid] > target) {
		return binarySearch(arr, target, left, mid - 1);
	}
	return binarySearch(arr, target, mid + 1, right);
}

// 69. Tower of Hanoi
function towerOfHanoi(n, from, to, aux, moves = []) {
	if (n === 0) return moves;
	towerOfHanoi(n - 1, from, aux, to, moves);
	moves.push(`Move disk ${n} from ${from} to ${to}`);
	towerOfHanoi(n - 1, aux, to, from, moves);
	return moves;
}

// 70. Generate All Balanced Parentheses
function generateParentheses(n) {
	const result = [];
	function backtrack(current, open, close) {
		if (current.length === n * 2) {
			result.push(current);
			return;
		}
		if (open < n) {
			backtrack(current + "(", open + 1, close);
		}
		if (close < open) {
			backtrack(current + ")", open, close + 1);
		}
	}
	backtrack("", 0, 0);
	return result;
}

// 71. Subset Sum Problem
function hasSubsetSum(arr, target, index = 0) {
	if (target === 0) return true;
	if (index >= arr.length || target < 0) return false;
	return (
		hasSubsetSum(arr, target - arr[index], index + 1) ||
		hasSubsetSum(arr, target, index + 1)
	);
}

// 72. N-Queens Problem
function solveNQueens(n) {
	const result = [];
	const board = Array(n)
		.fill()
		.map(() => Array(n).fill("."));

	function isSafe(row, col) {
		for (let i = 0; i < row; i++) {
			if (board[i][col] === "Q") return false;
			if (col - (row - i) >= 0 && board[i][col - (row - i)] === "Q")
				return false;
			if (col + (row - i) < n && board[i][col + (row - i)] === "Q")
				return false;
		}
		return true;
	}

	function solve(row) {
		if (row === n) {
			result.push(board.map((r) => r.join("")));
			return;
		}
		for (let col = 0; col < n; col++) {
			if (isSafe(row, col)) {
				board[row][col] = "Q";
				solve(row + 1);
				board[row][col] = ".";
			}
		}
	}

	solve(0);
	return result;
}

// 73. Climbing Stairs
function climbStairs(n, memo = {}) {
	if (n <= 2) return n;
	if (memo[n]) return memo[n];
	memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
	return memo[n];
}

// 74. Generate All Permutations of Array
function permuteArray(arr) {
	const result = [];
	function backtrack(current, remaining) {
		if (remaining.length === 0) {
			result.push([...current]);
			return;
		}
		for (let i = 0; i < remaining.length; i++) {
			current.push(remaining[i]);
			const newRemaining = [
				...remaining.slice(0, i),
				...remaining.slice(i + 1),
			];
			backtrack(current, newRemaining);
			current.pop();
		}
	}
	backtrack([], arr);
	return result;
}

// 75. Word Break Problem
function wordBreak(s, wordDict) {
	const wordSet = new Set(wordDict);
	const memo = {};
	function canBreak(start) {
		if (start === s.length) return true;
		if (memo[start] !== undefined) return memo[start];
		for (let end = start + 1; end <= s.length; end++) {
			const word = s.slice(start, end);
			if (wordSet.has(word) && canBreak(end)) {
				memo[start] = true;
				return true;
			}
		}
		memo[start] = false;
		return false;
	}
	return canBreak(0);
}

// =====================================================
// SECTION 6: FUNCTIONAL PROGRAMMING (76-90)
// =====================================================

// 76. Custom Map Implementation
function customMap(arr, callback) {
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		result.push(callback(arr[i], i, arr));
	}
	return result;
}

// 77. Custom Filter Implementation
function customFilter(arr, callback) {
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		if (callback(arr[i], i, arr)) {
			result.push(arr[i]);
		}
	}
	return result;
}

// 78. Custom Reduce Implementation
function customReduce(arr, callback, initialValue) {
	let accumulator = initialValue !== undefined ? initialValue : arr[0];
	let startIndex = initialValue !== undefined ? 0 : 1;
	for (let i = startIndex; i < arr.length; i++) {
		accumulator = callback(accumulator, arr[i], i, arr);
	}
	return accumulator;
}

// 79. Function Composition
function compose(...functions) {
	return function (initialValue) {
		return functions.reduceRight((value, fn) => fn(value), initialValue);
	};
}

// 80. Function Pipe
function pipe(...functions) {
	return function (initialValue) {
		return functions.reduce((value, fn) => fn(value), initialValue);
	};
}

// 81. Curry Function
function curry(fn) {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function (...nextArgs) {
				return curried.apply(this, args.concat(nextArgs));
			};
		}
	};
}

// 82. Memoization Function
function memoize(fn) {
	const cache = new Map();
	return function (...args) {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key);
		}
		const result = fn.apply(this, args);
		cache.set(key, result);
		return result;
	};
}

// 83. Debounce Function
function debounce(fn, delay) {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}

// 84. Throttle Function
function throttle(fn, limit) {
	let inThrottle;
	return function (...args) {
		if (!inThrottle) {
			fn.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

// 85. Once Function
function once(fn) {
	let called = false;
	let result;
	return function (...args) {
		if (!called) {
			called = true;
			result = fn.apply(this, args);
		}
		return result;
	};
}

// 86. Partial Application
function partial(fn, ...presetArgs) {
	return function (...laterArgs) {
		return fn(...presetArgs, ...laterArgs);
	};
}

// 87. Sleep Function
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// 88. Retry with Exponential Backoff
function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
	return async function (...args) {
		for (let i = 0; i < maxRetries; i++) {
			try {
				return await fn(...args);
			} catch (error) {
				if (i === maxRetries - 1) throw error;
				const delay = baseDelay * Math.pow(2, i);
				await sleep(delay);
			}
		}
	};
}

// 89. Async Parallel Execution
function parallel(tasks) {
	return Promise.all(
		tasks.map((task) => (typeof task === "function" ? task() : task))
	);
}

// 90. Async Sequential Execution
async function sequence(tasks) {
	const results = [];
	for (let task of tasks) {
		const result = await (typeof task === "function" ? task() : task);
		results.push(result);
	}
	return results;
}

// =====================================================
// SECTION 7: ADVANCED/TRICKY (91-105)
// =====================================================

// 91. Implement Promise.all
function promiseAll(promises) {
	return new Promise((resolve, reject) => {
		if (promises.length === 0) {
			resolve([]);
			return;
		}
		const results = new Array(promises.length);
		let completedCount = 0;
		promises.forEach((promise, index) => {
			Promise.resolve(promise)
				.then((result) => {
					results[index] = result;
					completedCount++;
					if (completedCount === promises.length) {
						resolve(results);
					}
				})
				.catch(reject);
		});
	});
}

// 92. Implement Promise.race
function promiseRace(promises) {
	return new Promise((resolve, reject) => {
		promises.forEach((promise) => {
			Promise.resolve(promise).then(resolve).catch(reject);
		});
	});
}

// 93. Deep Freeze Object
function deepFreeze(obj) {
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === "object" && obj[key] !== null) {
			deepFreeze(obj[key]);
		}
	});
	return Object.freeze(obj);
}

// 94. Event Emitter Implementation
function EventEmitter() {
	const events = {};
	return {
		on: function (event, listener) {
			if (!events[event]) events[event] = [];
			events[event].push(listener);
			return () => this.off(event, listener);
		},
		off: function (event, listener) {
			if (!events[event]) return;
			events[event] = events[event].filter((l) => l !== listener);
		},
		emit: function (event, ...args) {
			if (!events[event]) return;
			events[event].forEach((listener) => listener(...args));
		},
		once: function (event, listener) {
			const onceWrapper = (...args) => {
				listener(...args);
				this.off(event, onceWrapper);
			};
			this.on(event, onceWrapper);
		},
	};
}

// 95. Observable Pattern
function createObservable(initialValue) {
	let value = initialValue;
	const subscribers = new Set();
	return {
		subscribe: function (callback) {
			subscribers.add(callback);
			callback(value);
			return () => subscribers.delete(callback);
		},
		set: function (newValue) {
			value = newValue;
			subscribers.forEach((cb) => cb(value));
		},
		get: function () {
			return value;
		},
	};
}

// 96. Simple Virtual DOM Diff
function createElement(type, props = {}, ...children) {
	return { type, props, children: children.flat() };
}

function diff(oldVNode, newVNode) {
	if (!oldVNode) return { type: "CREATE", newVNode };
	if (!newVNode) return { type: "REMOVE" };
	if (oldVNode.type !== newVNode.type) {
		return { type: "REPLACE", newVNode };
	}
	const patches = [];
	const propsDiff = diffProps(oldVNode.props, newVNode.props);
	if (Object.keys(propsDiff).length > 0) {
		patches.push({ type: "PROPS", props: propsDiff });
	}
	const maxLength = Math.max(
		oldVNode.children.length,
		newVNode.children.length
	);
	for (let i = 0; i < maxLength; i++) {
		const childPatch = diff(oldVNode.children[i], newVNode.children[i]);
		if (childPatch) {
			patches.push({ type: "CHILD", index: i, patch: childPatch });
		}
	}
	return patches.length > 0 ? patches : null;
}

function diffProps(oldProps, newProps) {
	const patches = {};
	for (let key in newProps) {
		if (oldProps[key] !== newProps[key]) {
			patches[key] = newProps[key];
		}
	}
	for (let key in oldProps) {
		if (!(key in newProps)) {
			patches[key] = null;
		}
	}
	return patches;
}

// 97. Simple Pub-Sub with Topics
function PubSub() {
	const topics = {};
	return {
		subscribe: function (topic, callback) {
			if (!topics[topic]) topics[topic] = [];
			const token = Symbol();
			topics[topic].push({ token, callback });
			return token;
		},
		unsubscribe: function (topic, token) {
			if (!topics[topic]) return;
			topics[topic] = topics[topic].filter((sub) => sub.token !== token);
		},
		publish: function (topic, data) {
			if (!topics[topic]) return;
			topics[topic].forEach((sub) => sub.callback(data));
		},
	};
}

// 98. Rate Limiter (Token Bucket)
function createRateLimiter(capacity, refillRate) {
	let tokens = capacity;
	let lastRefill = Date.now();
	return function () {
		const now = Date.now();
		const elapsed = now - lastRefill;
		tokens = Math.min(capacity, tokens + elapsed * refillRate);
		lastRefill = now;
		if (tokens >= 1) {
			tokens--;
			return true;
		}
		return false;
	};
}

// 99. Simple Dependency Injection Container
function createContainer() {
	const registrations = {};
	const singletons = {};
	return {
		register: function (name, factory, singleton = false) {
			registrations[name] = { factory, singleton };
		},
		resolve: function (name) {
			const reg = registrations[name];
			if (!reg) throw new Error(`Unknown dependency: ${name}`);
			if (reg.singleton) {
				if (!singletons[name]) {
					singletons[name] = reg.factory(this);
				}
				return singletons[name];
			}
			return reg.factory(this);
		},
	};
}

// 100. Middleware Pattern
function createApp() {
	const middlewares = [];
	return {
		use: function (middleware) {
			middlewares.push(middleware);
		},
		handle: function (req, res) {
			let index = 0;
			function next(err) {
				if (err) {
					console.error(err);
					return;
				}
				const middleware = middlewares[index++];
				if (middleware) {
					middleware(req, res, next);
				}
			}
			next();
		},
	};
}

// 101. Simple State Management (Redux-like)
function createStore(reducer, initialState) {
	let state = initialState;
	const listeners = new Set();
	return {
		getState: () => state,
		dispatch: (action) => {
			state = reducer(state, action);
			listeners.forEach((listener) => listener());
		},
		subscribe: (listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
	};
}

// 102. Lazy Evaluation / Generator Functions
function* range(start, end) {
	for (let i = start; i <= end; i++) {
		yield i;
	}
}

function* filter(iterable, predicate) {
	for (let item of iterable) {
		if (predicate(item)) yield item;
	}
}

function* map(iterable, transform) {
	for (let item of iterable) {
		yield transform(item);
	}
}

// 103. Custom Bind
function customBind(fn, context, ...presetArgs) {
	return function (...laterArgs) {
		return fn.apply(context, [...presetArgs, ...laterArgs]);
	};
}

// 104. JSON Stringifier (Simplified)
function jsonStringify(value) {
	if (value === null) return "null";
	if (typeof value === "string") return `"${value}"`;
	if (typeof value === "number" || typeof value === "boolean")
		return String(value);
	if (Array.isArray(value)) {
		const items = value.map((item) => jsonStringify(item)).join(",");
		return `[${items}]`;
	}
	if (typeof value === "object") {
		const pairs = Object.entries(value)
			.map(([k, v]) => `"${k}":${jsonStringify(v)}`)
			.join(",");
		return `{${pairs}}`;
	}
}

// 105. Simple Router Implementation
function createRouter() {
	const routes = [];
	return {
		add: function (path, handler) {
			const params = [];
			const regex = new RegExp(
				"^" +
					path.replace(/:([^/]+)/g, (_, param) => {
						params.push(param);
						return "([^/]+)";
					}) +
					"$"
			);
			routes.push({ regex, params, handler });
		},
		match: function (path) {
			for (let route of routes) {
				const match = path.match(route.regex);
				if (match) {
					const params = {};
					route.params.forEach((param, i) => {
						params[param] = match[i + 1];
					});
					return { handler: route.handler, params };
				}
			}
			return null;
		},
	};
}

// =====================================================
// TEST RUNNER
// =====================================================

function runTests() {
	console.log("\n🧪 Running Basic Tests...\n");

	// String Tests
	console.log(
		"1. Reverse String:",
		reverseString("hello") === "olleh" ? "✅" : "❌"
	);
	console.log(
		"2. Palindrome:",
		isPalindrome("A man a plan a canal Panama") === true ? "✅" : "❌"
	);
	console.log(
		"3. Count Vowels:",
		countVowels("Hello World") === 3 ? "✅" : "❌"
	);

	// Array Tests
	console.log("4. Find Max:", findMax([3, 1, 4, 1, 5, 9]) === 9 ? "✅" : "❌");
	console.log(
		"5. Two Sum:",
		JSON.stringify(twoSum([2, 7, 11, 15], 9)) === "[0,1]" ? "✅" : "❌"
	);
	console.log(
		"6. Flatten Array:",
		JSON.stringify(flattenArray([1, [2, [3, 4], 5], 6])) === "[1,2,3,4,5,6]" ?
			"✅"
		:	"❌"
	);

	// Number Tests
	console.log("7. Is Prime:", isPrime(17) === true ? "✅" : "❌");
	console.log("8. Factorial:", factorial(5) === 120 ? "✅" : "❌");
	console.log(
		"9. Fibonacci:",
		JSON.stringify(fibonacci(5)) === "[0,1,1,2,3]" ? "✅" : "❌"
	);

	// Object Tests
	console.log(
		"10. Deep Clone:",
		(
			(() => {
				const obj = { a: 1, b: { c: 2 } };
				const cloned = deepClone(obj);
				cloned.b.c = 3;
				return obj.b.c === 2;
			})()
		) ?
			"✅"
		:	"❌"
	);

	// Recursion Tests
	console.log(
		"11. Recursive Sum:",
		recursiveSum([1, 2, 3, 4, 5]) === 15 ? "✅" : "❌"
	);
	console.log(
		"12. Binary Search:",
		binarySearch([1, 3, 5, 7, 9], 5) === 2 ? "✅" : "❌"
	);

	// Functional Tests
	console.log(
		"13. Custom Map:",
		JSON.stringify(customMap([1, 2, 3], (x) => x * 2)) === "[2,4,6]" ?
			"✅"
		:	"❌"
	);
	console.log(
		"14. Curry:",
		curry((a, b, c) => a + b + c)(1)(2)(3) === 6 ? "✅" : "❌"
	);

	console.log("\n✨ All basic tests completed!");
	console.log("\n📚 Total Functions Available:", 105);
	console.log(
		"🎯 Categories: String(15), Array(20), Number(15), Object(15), Recursion(10), Functional(15), Advanced(15)"
	);
}

// Run tests if this file is executed directly
if (typeof window === "undefined") {
	runTests();
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
	module.exports = {
		// Strings
		reverseString,
		reverseStringManual,
		isPalindrome,
		countVowels,
		firstNonRepeatingChar,
		isAnagram,
		longestWord,
		capitalizeWords,
		removeDuplicates,
		compressString,
		hasAllUniqueChars,
		getPermutations,
		isValidEmail,
		truncateString,
		charFrequency,
		urlEncode,

		// Arrays
		findMax,
		secondLargest,
		removeDuplicates,
		flattenArray,
		rotateLeft,
		findMissingNumber,
		twoSum,
		mergeSortedArrays,
		findIntersection,
		moveZerosToEnd,
		majorityElement,
		productExceptSelf,
		subarrayWithSum,
		maxArea,
		findPairsWithDiff,
		isSorted,
		findLeaders,
		rearrangeAlternate,
		maxSubarraySum,
		getAllSubsets,

		// Numbers
		isPrime,
		gcd,
		lcm,
		isArmstrong,
		fibonacci,
		factorial,
		isPerfectNumber,
		intToRoman,
		romanToInt,
		power,
		sqrt,
		countDigits,
		reverseInteger,
		isPowerOfTwo,
		sieveOfEratosthenes,

		// Objects
		deepClone,
		flattenObject,
		deepMerge,
		getByPath,
		groupBy,
		countOccurrences,
		findKeyByValue,
		invertObject,
		pick,
		omit,
		isEqual,
		createCounter,
		createLRUCache,
		createStack,
		createQueue,

		// Recursion
		recursiveSum,
		recursiveMax,
		binarySearch,
		towerOfHanoi,
		generateParentheses,
		hasSubsetSum,
		solveNQueens,
		climbStairs,
		permuteArray,
		wordBreak,

		// Functional
		customMap,
		customFilter,
		customReduce,
		compose,
		pipe,
		curry,
		memoize,
		debounce,
		throttle,
		once,
		partial,
		sleep,
		retryWithBackoff,
		parallel,
		sequence,

		// Advanced
		promiseAll,
		promiseRace,
		deepFreeze,
		EventEmitter,
		createObservable,
		createElement,
		diff,
		PubSub,
		createRateLimiter,
		createContainer,
		createApp,
		createStore,
		range,
		filter,
		map,
		customBind,
		jsonStringify,
		createRouter,
	};
}
