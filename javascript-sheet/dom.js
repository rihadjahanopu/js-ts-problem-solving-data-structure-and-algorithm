// DOM হলো আপনার HTML এর লাইভ রিপ্রেজেন্টেশন
console.log(document); // পুরো HTML ডকুমেন্ট
console.log(document.documentElement); // <html> এলিমেন্ট
console.log(document.head); // <head> এলিমেন্ট
console.log(document.body); // <body> এলিমেন্ট

// Node চেক করুন
const element = document.querySelector("div");
console.log(element.nodeType); // 1 (Element)
console.log(element.nodeName); // "DIV"
console.log(element.nodeValue); // null (elements এর জন্য)

//Element Selection Methods (A থেকে সব পদ্ধতি)

//🔍 Single Element Selection

// 1. getElementById - সবচেয়ে দ্রুত
const header = document.getElementById("main-header");

// 2. querySelector - CSS সিলেক্টর ব্যবহার করে
const firstItem = document.querySelector(".item"); // প্রথম ম্যাচ
const navLink = document.querySelector("#nav a"); // nested সিলেক্টর

// 3. CSS Pseudo-classes
const lastChild = document.querySelector("li:last-child");
const oddRows = document.querySelector("tr:nth-child(odd)");

//🔍 Multiple Element Selection

// // 1. getElementsByClassName - Live HTMLCollection
const buttons = document.getElementsByClassName("btn");
// ⚠️ Live collection - DOM পরিবর্তন হলে অটো আপডেট হয়

// 2. getElementsByTagName - Live HTMLCollection
const paragraphs = document.getElementsByTagName("p");

// 3. querySelectorAll - Static NodeList
const allItems = document.querySelectorAll(".item");
// ✅ Static - DOM পরিবর্তন হলে আপডেট হয় না

// 4. Modern methods
const formElements = document.querySelectorAll('input[type="text"]');
const checkedBoxes = document.querySelectorAll("input:checked");

// closest() - ancestor খোঁজা
const card = document.querySelector(".card");
const container = card.closest(".container"); // নিকটতম ancestor

// matches() - সিলেক্টর ম্যাচ চেক
if (card.matches(".active")) {
	console.log("Card is active");
}

// contains() - child আছে কিনা চেক
const parent = document.getElementById("parent");
const child = document.getElementById("child");
console.log(parent.contains(child)); // true/false

// 1. createElement - নতুন এলিমেন্ট
const newDiv = document.createElement("div");
newDiv.id = "unique-id";
newDiv.className = "box container";
newDiv.setAttribute("data-id", "123");

// 2. Text Node তৈরি
const textNode = document.createTextNode("Hello World");

// 3. Document Fragment (Performance optimization)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
	const li = document.createElement("li");
	li.textContent = `Item ${i}`;
	fragment.appendChild(li);
}
document.getElementById("list").appendChild(fragment); // একবারে DOM এ যোগ

const elementok = document.getElementById("content");

// HTML Content (Security Risk - XSS)
elementok.innerHTML = "<strong>Bold</strong> Text";
elementok.innerHTML += "<p>Append</p>"; // ❌ Slow, re-parses everything
// Text Content (Safe, faster)
element.textContent = "Safe Text"; // HTML tags as text
element.innerText = "Text with CSS consideration"; // respects CSS

// outerHTML - element সহ replace
element.outerHTML = "<section>New Element</section>"; // পুরো element বদলে যায়

//🔗 Insertion Methods (Modern)

const parentin = document.getElementById("parent");
const newElement = document.createElement("div");

// 1. append() - শেষে যোগ (multiple accepted)
parent.append(newElement, "Text", anotherElement);

// 2. prepend() - শুরুতে যোগ
parent.prepend(newElement);

// 3. before() - element এর আগে
referenceElement.before(newElement);

// 4. after() - element এর পরে
referenceElement.after(newElement);

// 5. replaceWith() - replace করুন
oldElement.replaceWith(newElement);

// 6. remove() - সরিয়ে ফেলুন
element.remove(); // Modern way, no parent needed

// Old methods (এখনো কাজ করে)
parent.appendChild(newElement); // শেষে যোগ, একটা node
parent.insertBefore(newElement, referenceNode);
parent.removeChild(childNode);
parent.replaceChild(newNode, oldNode);

//📋 Attributes & Properties

const input = document.querySelector("input");

// Attributes (HTML)
input.setAttribute("type", "email");
input.setAttribute("data-user", "123");
input.getAttribute("placeholder");
input.hasAttribute("required");
input.removeAttribute("disabled");

// Properties (JS Object)
input.type = "password";
input.value = "secret";
input.checked = true;
input.disabled = false;

// Custom Data Attributes
console.log(input.dataset.user); // data-user="123" থেকে
input.dataset.role = "admin"; // data-role="admin" সেট করে

// Class manipulation
element.className = "class1 class2"; // পুরো class string
element.classList.add("new-class");
element.classList.remove("old-class");
element.classList.toggle("active");
element.classList.toggle("hidden", condition); // condition true হলে add, নাহয় remove
element.classList.contains("active"); // true/false
element.classList.replace("old", "new");

//🎨 Inline Styles

const box = document.getElementById("box");

// Direct style manipulation
box.style.backgroundColor = "red"; // camelCase
box.style.width = "100px";
box.style.height = "100px";
box.style.cssText = `
    background: blue;
    border-radius: 10px;
    transform: translateX(50px);
`;

// Computed Styles (read-only)
const styles = getComputedStyle(box);
console.log(styles.backgroundColor);
console.log(styles.getPropertyValue("font-size"));

//🎭 CSS Custom Properties (Variables)

// Root থেকে পড়ুন
const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue("--primary-color");

// Set করুন
document.documentElement.style.setProperty("--primary-color", "#ff0000");
element.style.setProperty("--local-var", "20px");

//Event Handling (Advanced)

const button = document.getElementById("btn");

// addEventListener (Recommended)
button.addEventListener("click", function (event) {
	console.log("Clicked!");
	console.log(event.target); // যে element এ ক্লিক হয়েছে
	console.log(event.currentTarget); // যে element এ listener আছে
});

// Arrow function
button.addEventListener("click", (e) => {
	e.preventDefault(); // Default behavior বন্ধ
	e.stopPropagation(); // Bubbling বন্ধ
});

// Multiple events
["click", "touchstart"].forEach((event) => {
	button.addEventListener(event, handler);
});

// ❌ Bad - প্রতিটি item এ আলাদা listener
document.querySelectorAll(".item").forEach((item) => {
	item.addEventListener("click", handleClick); // Memory intensive
});

// ✅ Good - Parent এ একটা listener
document.getElementById("list").addEventListener("click", function (e) {
	if (e.target.matches(".item")) {
		console.log("Item clicked:", e.target.textContent);
	}

	// closest ব্যবহার করুন nested elements এর জন্য
	const item = e.target.closest(".item");
	if (item) {
		item.classList.toggle("selected");
	}
});

// once: true - একবারই চলবে
button.addEventListener("click", handleClick, { once: true });

// capture: true - capturing phase এ চলবে
document.body.addEventListener("click", handler, { capture: true });

// passive: true - scroll performance এর জন্য
window.addEventListener("scroll", handler, { passive: true });

// removeEventListener
const handler = () => console.log("Click");
button.addEventListener("click", handler);
button.removeEventListener("click", handler); // Same reference দিতে হবে

// Custom event তৈরি
const customEvent = new CustomEvent("userLogin", {
	detail: {
		username: "john",
		timestamp: Date.now(),
	},
	bubbles: true,
	cancelable: true,
});

// Dispatch করুন
document.dispatchEvent(customEvent);

// Listen করুন
document.addEventListener("userLogin", (e) => {
	console.log("User logged in:", e.detail.username);
});

const input = document.querySelector("input");

input.addEventListener("keydown", (e) => {
	console.log(e.key); // 'Enter', 'Escape', 'a'
	console.log(e.code); // 'KeyA', 'Enter'
	console.log(e.ctrlKey, e.shiftKey, e.altKey); // Modifier keys

	if (e.key === "Enter" && !e.shiftKey) {
		e.preventDefault();
		submitForm();
	}
});

// Debounce for input
input.addEventListener(
	"input",
	debounce((e) => {
		console.log("Search:", e.target.value);
	}, 500)
);

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

const element = document.getElementById("start");

// Parent
element.parentNode; // যেকোনো node
element.parentElement; // শুধু element node
element.closest(".ancestor"); // নিকটতম ম্যাচিং ancestor

// Children
element.childNodes; // সব node (text, comment, element)
element.children; // শুধু element children
element.firstChild; // প্রথম node
element.firstElementChild; // প্রথম element
element.lastElementChild;
element.childElementCount;

// Siblings
element.nextSibling; // পরবর্তী node
element.nextElementSibling; // পরবর্তী element
element.previousElementSibling;

// Traversal Example
function getSiblings(element) {
	return Array.from(element.parentNode.children).filter(
		(child) => child !== element
	);
}

// Tree Walker (Advanced)
const treeWalker = document.createTreeWalker(
	document.body,
	NodeFilter.SHOW_ELEMENT,
	{
		acceptNode: (node) => {
			return node.classList.contains("special")
				? NodeFilter.FILTER_ACCEPT
				: NodeFilter.FILTER_SKIP;
		},
	}
);

let currentNode = treeWalker.currentNode;
while (currentNode) {
	console.log(currentNode);
	currentNode = treeWalker.nextNode();
}

// DOM পরিবর্তন observe করুন
const observerin = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (mutation.type === "childList") {
			console.log(
				"Children changed:",
				mutation.addedNodes,
				mutation.removedNodes
			);
		}
		if (mutation.type === "attributes") {
			console.log("Attribute changed:", mutation.attributeName);
		}
	});
});

observer.observe(targetNode, {
	childList: true, // children পরিবর্তন
	attributes: true, // attribute পরিবর্তন
	characterData: true, // text পরিবর্তন
	subtree: true, // সম্পূর্ণ subtree
	attributeOldValue: true,
	characterDataOldValue: true,
});

// Stop observing
observer.disconnect();

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				// Lazy loading
				if (entry.target.tagName === "IMG") {
					entry.target.src = entry.target.dataset.src;
				}
			}
		});
	},
	{
		threshold: 0.5, // 50% visible হলে
		rootMargin: "0px 0px -100px 0px",
	}
);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
	observer.observe(el);
});

const resizeObserver = new ResizeObserver((entries) => {
	for (let entry of entries) {
		const { width, height } = entry.contentRect;
		console.log("Element resized:", width, height);
	}
});

resizeObserver.observe(document.querySelector(".responsive-element"));

// ❌ Bad - Multiple reflows
const list = document.getElementById("list");
for (let i = 0; i < 100; i++) {
	list.innerHTML += `<li>Item ${i}</li>`; // 100 reflows!
}

// ✅ Good - DocumentFragment
const fragmentin = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
	const li = document.createElement("li");
	li.textContent = `Item ${i}`;
	fragment.appendChild(li);
}
list.appendChild(fragment); // 1 reflow

// ✅ Good - Template
const template = document.createElement("template");
template.innerHTML = `
    <li class="item">
        <span class="title"></span>
    </li>
`;
const clone = template.content.cloneNode(true);
clone.querySelector(".title").textContent = "New Item";
list.appendChild(clone);

// Batch DOM reads/writes
// ❌ Bad - interleaving
const heightof = element.offsetHeight; // Read
element.style.height = heightof * 2 + "px"; // Write
const newHeight = element.offsetHeight; // Read (forced reflow!)

// ✅ Good - batch
const height = element.offsetHeight;
const width = element.offsetWidth;
// All reads first
element.style.height = height * 2 + "px"; // Then writes
element.style.width = width * 2 + "px";

// requestAnimationFrame for animations
function animate() {
	// DOM changes
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

class DataTable {
	constructor(tableId, data) {
		this.table = document.getElementById(tableId);
		this.data = data;
		this.sortDirection = {};
		this.init();
	}

	init() {
		this.render();
		this.attachEvents();
	}

	render() {
		const thead = this.table.querySelector("thead");
		const tbody = this.table.querySelector("tbody");

		// Headers
		thead.innerHTML = `
            <tr>
                ${Object.keys(this.data[0])
									.map(
										(key) => `
                    <th data-key="${key}">
                        ${key}
                        <span class="sort-icon">↕</span>
                    </th>
                `
									)
									.join("")}
            </tr>
        `;

		this.renderBody();
	}

	renderBody() {
		const tbody = this.table.querySelector("tbody");
		tbody.innerHTML = this.data
			.map(
				(row) => `
            <tr>
                ${Object.values(row)
									.map((val) => `<td>${val}</td>`)
									.join("")}
            </tr>
        `
			)
			.join("");
	}

	attachEvents() {
		this.table.querySelectorAll("th").forEach((th) => {
			th.addEventListener("click", () => {
				const key = th.dataset.key;
				this.sort(key);
			});
		});
	}

	sort(key) {
		this.sortDirection[key] = !this.sortDirection[key];
		const dir = this.sortDirection[key] ? 1 : -1;

		this.data.sort((a, b) => {
			if (a[key] < b[key]) return -1 * dir;
			if (a[key] > b[key]) return 1 * dir;
			return 0;
		});

		this.renderBody();
		this.updateSortIcons(key);
	}
}

// Usage
const table = new DataTable("myTable", [
	{ name: "John", age: 30, city: "New York" },
	{ name: "Jane", age: 25, city: "London" },
]);

class LazyImageLoader {
	constructor(selector) {
		this.images = document.querySelectorAll(selector);
		this.init();
	}

	init() {
		if ("IntersectionObserver" in window) {
			this.observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							this.loadImage(entry.target);
							this.observer.unobserve(entry.target);
						}
					});
				},
				{
					rootMargin: "50px 0px",
				}
			);

			this.images.forEach((img) => this.observer.observe(img));
		} else {
			// Fallback
			this.images.forEach((img) => this.loadImage(img));
		}
	}

	loadImage(img) {
		const src = img.dataset.src;
		if (!src) return;

		img.classList.add("loading");

		const tempImage = new Image();
		tempImage.onload = () => {
			img.src = src;
			img.classList.remove("loading");
			img.classList.add("loaded");
		};
		tempImage.src = src;
	}
}

// HTML: <img data-src="high-res.jpg" src="placeholder.jpg" class="lazy">
// CSS: .lazy { filter: blur(10px); transition: filter 0.3s; }
//      .loaded { filter: blur(0); }

class VirtualList {
	constructor(container, items, itemHeight) {
		this.container = container;
		this.items = items;
		this.itemHeight = itemHeight;
		this.visibleCount = Math.ceil(container.clientHeight / itemHeight);
		this.buffer = 5;

		this.init();
	}
}
