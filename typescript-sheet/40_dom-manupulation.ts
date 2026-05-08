// ============================================
// SECTION 1: ELEMENT SELECTION
// ============================================

// --- Single Element Selection ---
const btn = document.querySelector<HTMLButtonElement>("#myBtn");
const input = document.getElementById("myInput") as HTMLInputElement;
const div = document.querySelector(".myClass") as HTMLDivElement;
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!; // Non-null assertion

// --- Multiple Element Selection ---
const items = document.querySelectorAll<HTMLLIElement>("li");
const links = document.getElementsByTagName("a");
const byClass = document.getElementsByClassName("item");

// --- Safe Selection with Null Check ---
const el = document.querySelector<HTMLElement>("#app");
if (el) {
	el.style.color = "red";
}

// --- Helper: Safe Query Function ---
function $<T extends HTMLElement>(
	selector: string,
	parent: Document | HTMLElement = document
): T {
	const el = parent.querySelector<T>(selector);
	if (!el) throw new Error(`Element not found: ${selector}`);
	return el;
}

// Usage of helper
// const app = $<HTMLDivElement>('#app');
// const btn2 = $<HTMLButtonElement>('.btn', app);

// ============================================
// SECTION 2: CREATING & MODIFYING ELEMENTS
// ============================================

// --- Create Element ---
const newDiv = document.createElement("div");
newDiv.className = "container";
newDiv.id = "main-container";
newDiv.textContent = "Hello World";
newDiv.innerHTML = "<span>Safe HTML</span>";

// --- Set/Remove Attributes ---
newDiv.setAttribute("data-id", "123");
newDiv.setAttribute("role", "button");
newDiv.removeAttribute("disabled");
const hasAttr = newDiv.hasAttribute("data-id"); // boolean

// --- ClassList Operations ---
newDiv.classList.add("active", "visible");
newDiv.classList.remove("hidden");
newDiv.classList.toggle("visible");
newDiv.classList.toggle("dark-mode", true); // force add
const hasClass = newDiv.classList.contains("active"); // boolean

// --- Inline Styles ---
newDiv.style.backgroundColor = "#ffffff";
newDiv.style.display = "flex";
newDiv.style.cssText = "color: red; font-size: 16px; padding: 10px;";

// --- Dataset (data-* attributes) ---
newDiv.dataset.userId = "42";
newDiv.dataset.role = "admin";
newDiv.dataset.maxCount = "100";
const userId = newDiv.dataset.userId; // string | undefined
const role = newDiv.dataset.role; // string | undefined

// ============================================
// SECTION 3: TRAVERSING DOM
// ============================================

const child = document.querySelector<HTMLElement>(".child")!;

// --- Parent ---
const parent = child.parentElement; // HTMLElement | null
const closestDiv = child.closest<HTMLDivElement>("div"); // HTMLDivElement | null

// --- Siblings ---
const nextSibling = child.nextElementSibling; // Element | null
const prevSibling = child.previousElementSibling; // Element | null

// --- Children ---
const children = parent?.children; // HTMLCollection
const firstChild = parent?.firstElementChild; // Element | null
const lastChild = parent?.lastElementChild; // Element | null
const childCount = parent?.childElementCount; // number

// ============================================
// SECTION 4: INSERTING & REMOVING ELEMENTS
// ============================================

const parentEl = document.querySelector<HTMLElement>("#parent")!;
const newElement = document.createElement("span");
const referenceNode = document.querySelector<HTMLElement>(".ref")!;

// --- Insert ---
parentEl.appendChild(newElement);
parentEl.insertBefore(newElement, referenceNode);
parentEl.append("text node", newElement); // append multiple
parentEl.prepend(newElement); // insert at beginning
referenceNode.before(newElement); // insert before
referenceNode.after(newElement); // insert after
referenceNode.insertAdjacentHTML("beforebegin", "<div>HTML</div>");
referenceNode.insertAdjacentElement("afterend", newElement);

// --- Remove ---
parentEl.removeChild(newElement); // old way
newElement.remove(); // modern way

// --- Replace ---
parentEl.replaceChild(newElement, referenceNode);
referenceNode.replaceWith(newElement);

// --- Clone ---
const clone = newElement.cloneNode(true) as HTMLElement; // deep clone
const shallowClone = newElement.cloneNode(false) as HTMLElement;

// ============================================
// SECTION 5: READING & WRITING INPUT VALUES
// ============================================

const textInput = document.querySelector<HTMLInputElement>("#name")!;
const textarea = document.querySelector<HTMLTextAreaElement>("#msg")!;
const select = document.querySelector<HTMLSelectElement>("#country")!;
const checkbox = document.querySelector<HTMLInputElement>("#agree")!;
const radio = document.querySelector<HTMLInputElement>(
	'input[name="gender"]:checked'
);
const fileInput = document.querySelector<HTMLInputElement>("#file")!;
const range = document.querySelector<HTMLInputElement>("#volume")!;

// --- Get Values ---
const nameValue: string = textInput.value;
const msgValue: string = textarea.value;
const selectedValue: string = select.value;
const selectedIndex: number = select.selectedIndex;
const isChecked: boolean = checkbox.checked;
const isDisabled: boolean = textInput.disabled;
const fileList: FileList | null = fileInput.files;
const rangeValue: string = range.value;

// --- Set Values ---
textInput.value = "John Doe";
textarea.value = "Hello World...";
select.value = "bd";
checkbox.checked = true;
textInput.disabled = false;
textInput.readOnly = true;
textInput.placeholder = "Enter name";

// --- Focus & Selection ---
textInput.focus();
textInput.blur();
textInput.select(); // select all text
const selectionStart = textInput.selectionStart; // number | null
const selectionEnd = textInput.selectionEnd; // number | null

// ============================================
// SECTION 6: EVENT LISTENERS (ALL TYPES)
// ============================================

const button = document.querySelector<HTMLButtonElement>("#btn")!;

// --- Click Event ---
button.addEventListener("click", (e: MouseEvent) => {
	console.log("Button clicked!");
	console.log("Target:", e.target);
	console.log("Current Target:", e.currentTarget);
	console.log("Client X/Y:", e.clientX, e.clientY);
	console.log("Button:", e.button); // 0=left, 1=middle, 2=right
});

// --- Double Click ---
button.addEventListener("dblclick", (e: MouseEvent) => {
	console.log("Double clicked!");
});

// --- Submit Event ---
const form = document.querySelector<HTMLFormElement>("#form")!;
form.addEventListener("submit", (e: SubmitEvent) => {
	e.preventDefault();
	const formData = new FormData(e.currentTarget as HTMLFormElement);
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	console.log({ name, email });
});

// --- Input / Change Events ---
textInput.addEventListener("input", (e: Event) => {
	const target = e.target as HTMLInputElement;
	console.log("Current value:", target.value);
});

textInput.addEventListener("change", (e: Event) => {
	const target = e.target as HTMLInputElement;
	console.log("Final value:", target.value);
});

// --- Keyboard Events ---
document.addEventListener("keydown", (e: KeyboardEvent) => {
	console.log("Key:", e.key);
	console.log("Code:", e.code);
	console.log("Alt:", e.altKey);
	console.log("Ctrl:", e.ctrlKey);
	console.log("Shift:", e.shiftKey);
	console.log("Meta:", e.metaKey);

	if (e.key === "Enter") {
		console.log("Enter pressed!");
	}
	if (e.ctrlKey && e.key === "s") {
		e.preventDefault();
		console.log("Ctrl+S detected!");
	}
	if (e.key === "Escape") {
		closeModal();
	}
});

document.addEventListener("keyup", (e: KeyboardEvent) => {
	console.log("Key released:", e.key);
});

// --- Mouse Events ---
const hoverEl = document.querySelector<HTMLElement>(".hover")!;
hoverEl.addEventListener("mouseenter", (e: MouseEvent) => {
	hoverEl.classList.add("hovered");
});
hoverEl.addEventListener("mouseleave", (e: MouseEvent) => {
	hoverEl.classList.remove("hovered");
});
hoverEl.addEventListener("mousemove", (e: MouseEvent) => {
	console.log("Position:", e.offsetX, e.offsetY);
});
hoverEl.addEventListener("contextmenu", (e: MouseEvent) => {
	e.preventDefault(); // disable right-click menu
});

// --- Scroll Event ---
window.addEventListener("scroll", (e: Event) => {
	console.log("Scroll Y:", window.scrollY);
	console.log("Scroll X:", window.scrollX);
});

const scrollable = document.querySelector<HTMLElement>(".scrollable")!;
scrollable.addEventListener("scroll", (e: Event) => {
	const target = e.target as HTMLElement;
	console.log("Element scrollTop:", target.scrollTop);
});

// --- Resize Event ---
window.addEventListener("resize", (e: UIEvent) => {
	console.log("Window width:", window.innerWidth);
	console.log("Window height:", window.innerHeight);
});

// --- Load / DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM fully loaded!");
});

window.addEventListener("load", (e: Event) => {
	console.log("Page fully loaded (images, etc.)!");
});

// --- Remove Event Listener ---
const clickHandler = (e: MouseEvent) => console.log("click");
button.addEventListener("click", clickHandler);
button.removeEventListener("click", clickHandler);

// --- Event Delegation ---
document
	.querySelector<HTMLElement>("#list")!
	.addEventListener("click", (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.matches(".delete-btn")) {
			const item = target.closest<HTMLLIElement>("li");
			item?.remove();
		}
	});

// ============================================
// SECTION 7: FORM HANDLING COMPLETE
// ============================================

interface UserForm {
	username: string;
	email: string;
	age: number;
	country: string;
	subscribe: boolean;
	gender: string;
	skills: string[];
}

const userForm = document.querySelector<HTMLFormElement>("#userForm")!;

userForm.addEventListener("submit", (e: SubmitEvent) => {
	e.preventDefault();

	const formData = new FormData(userForm);

	// Get single values
	const username = formData.get("username") as string;
	const email = formData.get("email") as string;
	const age = parseInt(formData.get("age") as string, 10);
	const country = formData.get("country") as string;
	const subscribe = formData.get("subscribe") === "on";
	const gender = formData.get("gender") as string;

	// Get multiple values (checkboxes with same name)
	const skills = formData.getAll("skills") as string[];

	const data: UserForm = {
		username,
		email,
		age,
		country,
		subscribe,
		gender,
		skills,
	};
	console.log("Form Data:", data);

	// Validation
	if (!username.trim()) {
		showError("Username is required");
		return;
	}
	if (!email.includes("@")) {
		showError("Invalid email");
		return;
	}

	// Submit to API
	// fetch('/api/users', { method: 'POST', body: formData });
});

function showError(msg: string): void {
	const errorEl = document.querySelector<HTMLElement>(".error-msg");
	if (errorEl) {
		errorEl.textContent = msg;
		errorEl.style.display = "block";
	}
}

// --- Reset Form ---
// userForm.reset();

// ============================================
// SECTION 8: DYNAMIC LIST RENDERING
// ============================================

interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

let todos: Todo[] = [
	{ id: 1, text: "Learn TypeScript", completed: false },
	{ id: 2, text: "Build an App", completed: true },
	{ id: 3, text: "Deploy to Production", completed: false },
];

const todoList = document.querySelector<HTMLUListElement>("#todoList")!;
const todoInput = document.querySelector<HTMLInputElement>("#todoInput")!;
const addTodoBtn = document.querySelector<HTMLButtonElement>("#addTodo")!;

function renderTodos(items: Todo[]): void {
	todoList.innerHTML = ""; // Clear list

	items.forEach((todo) => {
		const li = document.createElement("li");
		li.className = `todo-item ${todo.completed ? "completed" : ""}`;
		li.dataset.id = String(todo.id);

		li.innerHTML = `
      <input type="checkbox" class="toggle" ${todo.completed ? "checked" : ""}>
      <span class="text">${escapeHtml(todo.text)}</span>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;

		// Toggle complete
		const toggle = li.querySelector<HTMLInputElement>(".toggle")!;
		toggle.addEventListener("change", () => toggleTodo(todo.id));

		// Delete
		const deleteBtn = li.querySelector<HTMLButtonElement>(".delete")!;
		deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

		// Edit
		const editBtn = li.querySelector<HTMLButtonElement>(".edit")!;
		editBtn.addEventListener("click", () => editTodo(todo.id));

		todoList.appendChild(li);
	});

	updateStats();
}

function addTodo(text: string): void {
	const newTodo: Todo = {
		id: Date.now(),
		text,
		completed: false,
	};
	todos.push(newTodo);
	renderTodos(todos);
}

function deleteTodo(id: number): void {
	todos = todos.filter((t) => t.id !== id);
	renderTodos(todos);
}

function toggleTodo(id: number): void {
	const todo = todos.find((t) => t.id === id);
	if (todo) {
		todo.completed = !todo.completed;
		renderTodos(todos);
	}
}

function editTodo(id: number): void {
	const todo = todos.find((t) => t.id === id);
	if (!todo) return;

	const newText = prompt("Edit todo:", todo.text);
	if (newText !== null && newText.trim() !== "") {
		todo.text = newText.trim();
		renderTodos(todos);
	}
}

function updateStats(): void {
	const total = todos.length;
	const completed = todos.filter((t) => t.completed).length;
	const remaining = total - completed;

	const statsEl = document.querySelector<HTMLElement>(".stats");
	if (statsEl) {
		statsEl.textContent = `${remaining} of ${total} remaining`;
	}
}

function escapeHtml(text: string): string {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}

addTodoBtn?.addEventListener("click", () => {
	const text = todoInput.value.trim();
	if (text) {
		addTodo(text);
		todoInput.value = "";
		todoInput.focus();
	}
});

todoInput?.addEventListener("keydown", (e: KeyboardEvent) => {
	if (e.key === "Enter") {
		addTodoBtn?.click();
	}
});

// Initial render
renderTodos(todos);

// ============================================
// SECTION 9: MODAL / POPUP
// ============================================

const modal = document.querySelector<HTMLDivElement>(".modal")!;
const modalOverlay = document.querySelector<HTMLDivElement>(".modal-overlay")!;
const openModalBtn = document.querySelector<HTMLButtonElement>("#openModal")!;
const closeModalBtn =
	document.querySelector<HTMLButtonElement>(".modal-close")!;

function openModal(): void {
	modal.classList.add("active");
	modalOverlay.classList.add("active");
	document.body.style.overflow = "hidden";
	closeModalBtn.focus();
}

function closeModal(): void {
	modal.classList.remove("active");
	modalOverlay.classList.remove("active");
	document.body.style.overflow = "";
	openModalBtn.focus();
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e: KeyboardEvent) => {
	if (e.key === "Escape" && modal.classList.contains("active")) {
		closeModal();
	}
});

// Trap focus inside modal
modal.addEventListener("keydown", (e: KeyboardEvent) => {
	if (e.key !== "Tab") return;

	const focusable = modal.querySelectorAll<HTMLElement>(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	);
	const first = focusable[0];
	const last = focusable[focusable.length - 1];

	if (e.shiftKey && document.activeElement === first) {
		e.preventDefault();
		last.focus();
	} else if (!e.shiftKey && document.activeElement === last) {
		e.preventDefault();
		first.focus();
	}
});

// ============================================
// SECTION 10: FETCH + DOM UPDATE
// ============================================

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

interface User {
	id: number;
	name: string;
	email: string;
}

async function loadPosts(): Promise<void> {
	const container = document.querySelector<HTMLDivElement>("#posts")!;
	container.innerHTML = '<p class="loading">Loading posts...</p>';

	try {
		const res = await fetch("https://jsonplaceholder.typicode.com/posts");
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const posts: Post[] = await res.json();

		container.innerHTML = "";
		posts.slice(0, 10).forEach((post) => {
			const article = document.createElement("article");
			article.className = "post-card";
			article.innerHTML = `
        <h2>${escapeHtml(post.title)}</h2>
        <p>${escapeHtml(post.body)}</p>
        <button class="read-more" data-id="${post.id}">Read More</button>
      `;
			container.appendChild(article);
		});

		// Event delegation for dynamic buttons
		container.addEventListener("click", (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.matches(".read-more")) {
				const id = target.dataset.id;
				console.log("Read more clicked for post:", id);
			}
		});
	} catch (error) {
		container.innerHTML = `<p class="error">Failed to load: ${error instanceof Error ? error.message : "Unknown error"}</p>`;
	}
}

async function loadUser(userId: number): Promise<void> {
	try {
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/users/${userId}`
		);
		const user: User = await res.json();

		const userCard = document.querySelector<HTMLElement>(".user-card")!;
		userCard.innerHTML = `
      <h3>${escapeHtml(user.name)}</h3>
      <p>Email: ${escapeHtml(user.email)}</p>
    `;
	} catch (error) {
		console.error("Failed to load user:", error);
	}
}

document
	.querySelector<HTMLButtonElement>("#loadPostsBtn")
	?.addEventListener("click", loadPosts);

// ============================================
// SECTION 11: LOCAL STORAGE
// ============================================

function saveToStorage<T>(key: string, data: T): void {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (e) {
		console.error("Storage save failed:", e);
	}
}

function loadFromStorage<T>(key: string, defaultValue: T): T {
	try {
		const item = localStorage.getItem(key);
		return item ? (JSON.parse(item) as T) : defaultValue;
	} catch (e) {
		console.error("Storage load failed:", e);
		return defaultValue;
	}
}

function removeFromStorage(key: string): void {
	localStorage.removeItem(key);
}

function clearStorage(): void {
	localStorage.clear();
}

// Usage
// saveToStorage('todos', todos);
// todos = loadFromStorage<Todo[]>('todos', []);

// ============================================
// SECTION 12: DEBOUNCE & THROTTLE
// ============================================

function debounce<T extends (...args: any[]) => void>(
	fn: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
}

function throttle<T extends (...args: any[]) => void>(
	fn: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle = false;
	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			fn(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

// Usage
const searchInput = document.querySelector<HTMLInputElement>("#search")!;
searchInput?.addEventListener(
	"input",
	debounce((e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		console.log("Search:", value);
		// fetch search results...
	}, 300)
);

window.addEventListener(
	"scroll",
	throttle(() => {
		console.log("Scroll position:", window.scrollY);
	}, 200)
);

// ============================================
// SECTION 13: INTERSECTION OBSERVER (Lazy Load)
// ============================================

const lazyImages = document.querySelectorAll<HTMLImageElement>("img[data-src]");

const imageObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const img = entry.target as HTMLImageElement;
			img.src = img.dataset.src!;
			img.removeAttribute("data-src");
			imageObserver.unobserve(img);
		}
	});
});

lazyImages.forEach((img) => imageObserver.observe(img));

// ============================================
// SECTION 14: DRAG AND DROP
// ============================================

const draggables = document.querySelectorAll<HTMLElement>(".draggable");
const dropZone = document.querySelector<HTMLElement>(".drop-zone")!;

draggables.forEach((el) => {
	el.draggable = true;

	el.addEventListener("dragstart", (e: DragEvent) => {
		e.dataTransfer?.setData("text/plain", el.dataset.id || "");
		el.classList.add("dragging");
	});

	el.addEventListener("dragend", () => {
		el.classList.remove("dragging");
	});
});

dropZone.addEventListener("dragover", (e: DragEvent) => {
	e.preventDefault();
	dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
	dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e: DragEvent) => {
	e.preventDefault();
	dropZone.classList.remove("drag-over");
	const id = e.dataTransfer?.getData("text/plain");
	console.log("Dropped item ID:", id);
});

// ============================================
// SECTION 15: HELPER FUNCTIONS
// ============================================

// Create element with props
function createEl<K extends keyof HTMLElementTagNameMap>(
	tag: K,
	props?: Partial<HTMLElementTagNameMap[K]>,
	children?: (Node | string)[]
): HTMLElementTagNameMap[K] {
	const el = document.createElement(tag);
	if (props) Object.assign(el, props);
	if (children) children.forEach((child) => el.append(child));
	return el;
}

// Usage:
// const link = createEl('a', { href: 'https://example.com', textContent: 'Click', className: 'link' });

// Wait for DOM ready
function ready(fn: () => void): void {
	if (document.readyState !== "loading") {
		fn();
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

// Copy to clipboard
async function copyToClipboard(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
		console.log("Copied!");
	} catch (err) {
		console.error("Copy failed:", err);
	}
}

// Scroll to element smoothly
function scrollToElement(selector: string): void {
	const el = document.querySelector<HTMLElement>(selector);
	el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Get URL params
function getUrlParam(name: string): string | null {
	const params = new URLSearchParams(window.location.search);
	return params.get(name);
}

// Check if element in viewport
function isInViewport(el: HTMLElement): boolean {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= window.innerHeight &&
		rect.right <= window.innerWidth
	);
}

// ============================================
// SECTION 16: TABS COMPONENT
// ============================================

const tabButtons = document.querySelectorAll<HTMLButtonElement>(".tab-btn");
const tabPanels = document.querySelectorAll<HTMLElement>(".tab-panel");

tabButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		const target = btn.dataset.target;

		// Deactivate all
		tabButtons.forEach((b) => b.classList.remove("active"));
		tabPanels.forEach((p) => p.classList.remove("active"));

		// Activate current
		btn.classList.add("active");
		document.querySelector<HTMLElement>(`#${target}`)?.classList.add("active");
	});
});

// ============================================
// SECTION 17: ACCORDION / COLLAPSIBLE
// ============================================

const accordionHeaders =
	document.querySelectorAll<HTMLButtonElement>(".accordion-header");

accordionHeaders.forEach((header) => {
	header.addEventListener("click", () => {
		const content = header.nextElementSibling as HTMLElement;
		const isOpen = header.classList.contains("open");

		// Close all (optional - remove for multi-open)
		accordionHeaders.forEach((h) => {
			h.classList.remove("open");
			(h.nextElementSibling as HTMLElement).style.maxHeight = "0";
		});

		if (!isOpen) {
			header.classList.add("open");
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
});

// ============================================
// SECTION 18: DARK MODE TOGGLE
// ============================================

const themeToggle = document.querySelector<HTMLButtonElement>("#themeToggle")!;
const html = document.documentElement;

function setTheme(theme: "light" | "dark"): void {
	html.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);
}

themeToggle?.addEventListener("click", () => {
	const current = html.getAttribute("data-theme") || "light";
	const next = current === "light" ? "dark" : "light";
	setTheme(next);
});

// Load saved theme
const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
if (savedTheme) setTheme(savedTheme);

// ============================================
// SECTION 19: INFINITE SCROLL
// ============================================

let page = 1;
let loading = false;

async function loadMoreItems(): Promise<void> {
	if (loading) return;
	loading = true;

	const loader = document.querySelector<HTMLElement>(".loader");
	loader?.classList.add("show");

	try {
		const res = await fetch(`https://api.example.com/items?page=${page}`);
		const items = await res.json();

		const container = document.querySelector<HTMLElement>("#infinite-list")!;
		items.forEach((item: any) => {
			const div = document.createElement("div");
			div.className = "item";
			div.textContent = item.name;
			container.appendChild(div);
		});

		page++;
	} catch (error) {
		console.error("Load failed:", error);
	} finally {
		loading = false;
		loader?.classList.remove("show");
	}
}

// Trigger on scroll
window.addEventListener("scroll", () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
		loadMoreItems();
	}
});

// ============================================
// SECTION 20: FILE UPLOAD WITH PREVIEW
// ============================================

const uploadInput = document.querySelector<HTMLInputElement>("#fileUpload")!;
const previewContainer = document.querySelector<HTMLElement>("#preview")!;

uploadInput?.addEventListener("change", () => {
	const files = uploadInput.files;
	if (!files) return;

	Array.from(files).forEach((file) => {
		if (!file.type.startsWith("image/")) return;

		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const img = document.createElement("img");
			img.src = e.target?.result as string;
			img.className = "preview-img";
			previewContainer.appendChild(img);
		};
		reader.readAsDataURL(file);
	});
});

// ============================================
// END OF FILE
// ============================================
