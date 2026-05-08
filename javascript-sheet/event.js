//1. Mouse Events (মাউস ইভেন্টস)
// ============================================
// MOUSE EVENTS - Complete List
// ============================================

const element = document.getElementById("box");

// click - একবার ক্লিক
element.addEventListener("click", (e) => {
	console.log("Click:", e.button); // 0=left, 1=middle, 2=right
});

// dblclick - ডবল ক্লিক
element.addEventListener("dblclick", (e) => {
	console.log("Double Click");
});

// mousedown - মাউস বাটন চাপা
element.addEventListener("mousedown", (e) => {
	console.log("Mouse Down:", e.button);
});

// mouseup - মাউস বাটন ছাড়া
element.addEventListener("mouseup", (e) => {
	console.log("Mouse Up");
});

// mousemove - মাউস মুভ
element.addEventListener("mousemove", (e) => {
	console.log("X:", e.clientX, "Y:", e.clientY);
	console.log("Offset X:", e.offsetX, "Offset Y:", e.offsetY);
});

// mouseenter - এলিমেন্টে প্রবেশ (bubble করে না)
element.addEventListener("mouseenter", (e) => {
	console.log("Mouse Enter");
});

// mouseleave - এলিমেন্ট থেকে বের হওয়া (bubble করে না)
element.addEventListener("mouseleave", (e) => {
	console.log("Mouse Leave");
});

// mouseover - এলিমেন্টে প্রবেশ (bubble করে)
element.addEventListener("mouseover", (e) => {
	console.log("Mouse Over:", e.relatedTarget);
});

// mouseout - এলিমেন্ট থেকে বের হওয়া (bubble করে)
element.addEventListener("mouseout", (e) => {
	console.log("Mouse Out");
});

// contextmenu - রাইট ক্লিক মেনু
element.addEventListener("contextmenu", (e) => {
	e.preventDefault(); // ডিফল্ট মেনু বন্ধ
	console.log("Custom Context Menu");
});

// wheel - মাউস হুইল
element.addEventListener("wheel", (e) => {
	console.log("Delta Y:", e.deltaY); // উপরে/নিচে
	console.log("Delta X:", e.deltaX); // বামে/ডানে
});

// ============================================
// MOUSE EVENT PROPERTIES
// ============================================

element.addEventListener("click", (e) => {
	// Position
	console.log(e.clientX, e.clientY); // ভিউপোর্ট অনুযায়ী
	console.log(e.pageX, e.pageY); // পেজ অনুযায়ী
	console.log(e.screenX, e.screenY); // স্ক্রিন অনুযায়ী
	console.log(e.offsetX, e.offsetY); // এলিমেন্ট অনুযায়ী

	// Buttons
	console.log(e.button); // 0=left, 1=middle, 2=right
	console.log(e.buttons); // bitmask of all buttons

	// Modifiers
	console.log(e.ctrlKey); // Ctrl চাপা আছে?
	console.log(e.shiftKey); // Shift চাপা আছে?
	console.log(e.altKey); // Alt চাপা আছে?
	console.log(e.metaKey); // Meta/Command চাপা আছে?

	// Target
	console.log(e.target); // যে এলিমেন্টে ক্লিক
	console.log(e.currentTarget); // যে এলিমেন্টে listener
});

// ============================================
// DRAG AND DROP EVENTS
// ============================================

const draggable = document.getElementById("drag");
const dropZone = document.getElementById("drop");

draggable.draggable = true;

draggable.addEventListener("dragstart", (e) => {
	e.dataTransfer.setData("text/plain", "dragging");
	e.dataTransfer.effectAllowed = "move";
	console.log("Drag Start");
});

draggable.addEventListener("drag", (e) => {
	console.log("Dragging...");
});

draggable.addEventListener("dragend", (e) => {
	console.log("Drag End");
});

dropZone.addEventListener("dragenter", (e) => {
	e.preventDefault();
	console.log("Drag Enter");
});

dropZone.addEventListener("dragover", (e) => {
	e.preventDefault(); // ড্রপ করতে হলে প্রয়োজন
	e.dataTransfer.dropEffect = "move";
	console.log("Drag Over");
});

dropZone.addEventListener("dragleave", (e) => {
	console.log("Drag Leave");
});

dropZone.addEventListener("drop", (e) => {
	e.preventDefault();
	const data = e.dataTransfer.getData("text/plain");
	console.log("Dropped:", data);

	// Files
	const files = e.dataTransfer.files;
	console.log("Files:", files);
});

//2. Keyboard Events (কীবোর্ড ইভেন্টস)

// ============================================
// KEYBOARD EVENTS - Complete List
// ============================================

// ============================================
// KEYBOARD EVENTS - Complete List
// ============================================

const input = document.getElementById("input");

// keydown - কী চাপা (সব কী এর জন্য)
input.addEventListener("keydown", (e) => {
	console.log("Key Down:", e.key, e.code);
});

// keypress - কী চাপা (character keys only) - DEPRECATED
// input.addEventListener('keypress', (e) => {
//     console.log('Key Press:', e.key);
// });

// keyup - কী ছাড়া
input.addEventListener("keyup", (e) => {
	console.log("Key Up:", e.key);
});

// ============================================
// KEYBOARD EVENT PROPERTIES
// ============================================

input.addEventListener("keydown", (e) => {
	// Key Info
	console.log(e.key); // 'Enter', 'a', 'ArrowUp'
	console.log(e.code); // 'KeyA', 'Enter', 'ArrowUp'
	console.log(e.keyCode); // DEPRECATED - 13, 65, 38
	console.log(e.which); // DEPRECATED

	// Location
	console.log(e.location); // 0=standard, 1=left, 2=right, 3=numpad

	// Modifiers
	console.log(e.ctrlKey);
	console.log(e.shiftKey);
	console.log(e.altKey);
	console.log(e.metaKey);
	console.log(e.getModifierState("CapsLock"));

	// Repeat
	console.log(e.repeat); // true if holding key

	// Prevent
	e.preventDefault(); // ডিফল্ট অ্যাকশন বন্ধ
	e.stopPropagation(); // bubbling বন্ধ
});

// ============================================
// COMMON KEY CHECKS
// ============================================

input.addEventListener("keydown", (e) => {
	// Enter key
	if (e.key === "Enter") {
		console.log("Enter pressed");
	}

	// Escape
	if (e.key === "Escape") {
		console.log("Escape pressed");
	}

	// Arrow keys
	if (e.key === "ArrowUp" || e.key === "ArrowDown") {
		console.log("Arrow key");
	}

	// Ctrl + S
	if (e.ctrlKey && e.key === "s") {
		e.preventDefault();
		console.log("Ctrl+S pressed");
	}

	// Ctrl + Shift + A
	if (e.ctrlKey && e.shiftKey && e.key === "A") {
		console.log("Ctrl+Shift+A");
	}
});

// ============================================
// GLOBAL KEYBOARD SHORTCUTS
// ============================================

document.addEventListener("keydown", (e) => {
	// Global shortcuts
	switch (e.key) {
		case "F1":
			e.preventDefault();
			showHelp();
			break;
		case "Escape":
			closeModal();
			break;
		case "Tab":
			if (e.shiftKey) {
				console.log("Shift+Tab");
			}
			break;
	}
});

// ============================================
// INPUT EVENTS (Related to keyboard)
// ============================================

const textInput = document.getElementById("text");

// input - যেকোনো ইনপুট পরিবর্তন
textInput.addEventListener("input", (e) => {
	console.log("Input value:", e.target.value);
	console.log("Input type:", e.inputType); // 'insertText', 'deleteContentBackward'
	console.log("Data:", e.data); // inserted character
});

// change - ফোকাস হারানোর পর পরিবর্তন
textInput.addEventListener("change", (e) => {
	console.log("Changed to:", e.target.value);
});

// focus - ফোকাস পাওয়া
textInput.addEventListener("focus", (e) => {
	console.log("Focused");
});

// blur - ফোকাস হারানো
textInput.addEventListener("blur", (e) => {
	console.log("Blurred");
});

// focusin (bubbles) / focusout (bubbles)
textInput.addEventListener("focusin", (e) => {
	console.log("Focus In (bubbles)");
});

// ============================================
// KEYBOARD EVENTS - Complete List
// ============================================

const inputof = document.getElementById("input");

// keydown - কী চাপা (সব কী এর জন্য)
input.addEventListener("keydown", (e) => {
	console.log("Key Down:", e.key, e.code);
});

// keypress - কী চাপা (character keys only) - DEPRECATED
// input.addEventListener('keypress', (e) => {
//     console.log('Key Press:', e.key);
// });

// keyup - কী ছাড়া
input.addEventListener("keyup", (e) => {
	console.log("Key Up:", e.key);
});

// ============================================
// KEYBOARD EVENT PROPERTIES
// ============================================

input.addEventListener("keydown", (e) => {
	// Key Info
	console.log(e.key); // 'Enter', 'a', 'ArrowUp'
	console.log(e.code); // 'KeyA', 'Enter', 'ArrowUp'
	console.log(e.keyCode); // DEPRECATED - 13, 65, 38
	console.log(e.which); // DEPRECATED

	// Location
	console.log(e.location); // 0=standard, 1=left, 2=right, 3=numpad

	// Modifiers
	console.log(e.ctrlKey);
	console.log(e.shiftKey);
	console.log(e.altKey);
	console.log(e.metaKey);
	console.log(e.getModifierState("CapsLock"));

	// Repeat
	console.log(e.repeat); // true if holding key

	// Prevent
	e.preventDefault(); // ডিফল্ট অ্যাকশন বন্ধ
	e.stopPropagation(); // bubbling বন্ধ
});

// ============================================
// COMMON KEY CHECKS
// ============================================

input.addEventListener("keydown", (e) => {
	// Enter key
	if (e.key === "Enter") {
		console.log("Enter pressed");
	}

	// Escape
	if (e.key === "Escape") {
		console.log("Escape pressed");
	}

	// Arrow keys
	if (e.key === "ArrowUp" || e.key === "ArrowDown") {
		console.log("Arrow key");
	}

	// Ctrl + S
	if (e.ctrlKey && e.key === "s") {
		e.preventDefault();
		console.log("Ctrl+S pressed");
	}

	// Ctrl + Shift + A
	if (e.ctrlKey && e.shiftKey && e.key === "A") {
		console.log("Ctrl+Shift+A");
	}
});

// ============================================
// GLOBAL KEYBOARD SHORTCUTS
// ============================================

document.addEventListener("keydown", (e) => {
	// Global shortcuts
	switch (e.key) {
		case "F1":
			e.preventDefault();
			showHelp();
			break;
		case "Escape":
			closeModal();
			break;
		case "Tab":
			if (e.shiftKey) {
				console.log("Shift+Tab");
			}
			break;
	}
});

// ============================================
// INPUT EVENTS (Related to keyboard)
// ============================================

const textInputof = document.getElementById("text");

// input - যেকোনো ইনপুট পরিবর্তন
textInputof.addEventListener("input", (e) => {
	console.log("Input value:", e.target.value);
	console.log("Input type:", e.inputType); // 'insertText', 'deleteContentBackward'
	console.log("Data:", e.data); // inserted character
});

// change - ফোকাস হারানোর পর পরিবর্তন
textInput.addEventListener("change", (e) => {
	console.log("Changed to:", e.target.value);
});

// focus - ফোকাস পাওয়া
textInput.addEventListener("focus", (e) => {
	console.log("Focused");
});

// blur - ফোকাস হারানো
textInput.addEventListener("blur", (e) => {
	console.log("Blurred");
});

// focusin (bubbles) / focusout (bubbles)
textInput.addEventListener("focusin", (e) => {
	console.log("Focus In (bubbles)");
});

//3. Form Events (ফর্ম ইভেন্টস)

// ============================================
// FORM EVENTS - Complete List
// ============================================

const form = document.getElementById("form");
const field = document.getElementById("field");

// submit - ফর্ম সাবমিট
form.addEventListener("submit", (e) => {
	e.preventDefault(); // পেজ রিলোড বন্ধ

	// FormData
	const formData = new FormData(form);
	console.log(Object.fromEntries(formData));

	// Or
	const data = {
		name: form.name.value,
		email: form.email.value,
	};
	console.log(data);
});

// reset - ফর্ম রিসেট
form.addEventListener("reset", (e) => {
	console.log("Form reset");
});

// ============================================
// INPUT SPECIFIC EVENTS
// ============================================

// input - রিয়েল টাইম পরিবর্তন
field.addEventListener("input", (e) => {
	console.log("Input:", e.target.value);
});

// change - কমিট পরিবর্তন (blur বা select)
field.addEventListener("change", (e) => {
	console.log("Change:", e.target.value);
});

// ============================================
// VALIDATION EVENTS
// ============================================

// invalid - ইনভ্যালিড সাবমিট
field.addEventListener("invalid", (e) => {
	e.preventDefault(); // ডিফল্ট মেসেজ বন্ধ
	console.log("Invalid:", e.target.validationMessage);
	console.log("Validity:", e.target.validity);
});

// ValidityState properties
field.addEventListener("input", (e) => {
	const v = e.target.validity;
	console.log({
		valid: v.valid,
		valueMissing: v.valueMissing,
		typeMismatch: v.typeMismatch,
		patternMismatch: v.patternMismatch,
		tooLong: v.tooLong,
		tooShort: v.tooShort,
		rangeUnderflow: v.rangeUnderflow,
		rangeOverflow: v.rangeOverflow,
		stepMismatch: v.stepMismatch,
		badInput: v.badInput,
		customError: v.customError,
	});
});

// setCustomValidity
field.addEventListener("input", (e) => {
	if (e.target.value.length < 5) {
		e.target.setCustomValidity("Minimum 5 characters");
	} else {
		e.target.setCustomValidity("");
	}
});

// ============================================
// CHECKBOX & RADIO EVENTS
// ============================================

const checkbox = document.getElementById("check");

checkbox.addEventListener("change", (e) => {
	console.log("Checked:", e.target.checked);
	console.log("Indeterminate:", e.target.indeterminate);
});

// Set indeterminate
checkbox.indeterminate = true;

// ============================================
// SELECT EVENTS
// ============================================

const select = document.getElementById("select");

select.addEventListener("change", (e) => {
	console.log("Selected value:", e.target.value);
	console.log("Selected index:", e.target.selectedIndex);
	console.log("Selected text:", e.target.options[e.target.selectedIndex].text);
});

// Multiple select
select.addEventListener("change", (e) => {
	const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
	console.log("Selected:", selected);
});

// ============================================
// FILE INPUT EVENTS
// ============================================

const fileInput = document.getElementById("file");

fileInput.addEventListener("change", (e) => {
	const files = e.target.files;
	console.log("Files:", files);

	Array.from(files).forEach((file) => {
		console.log({
			name: file.name,
			size: file.size,
			type: file.type,
			lastModified: file.lastModified,
		});

		// Read file
		const reader = new FileReader();
		reader.onload = (e) => {
			console.log("Content:", e.target.result);
		};
		reader.readAsText(file);
		// reader.readAsDataURL(file);
		// reader.readAsArrayBuffer(file);
	});
});

// Drag & Drop on file input
fileInput.addEventListener("dragenter", (e) => {
	e.target.classList.add("drag-over");
});

fileInput.addEventListener("dragleave", (e) => {
	e.target.classList.remove("drag-over");
});

//4. Window & Document Events (উইন্ডো এবং ডকুমেন্ট ইভেন্টস)
// ============================================
// WINDOW EVENTS - Complete List
// ============================================

// load - সবকিছু লোড হওয়ার পর
window.addEventListener("load", () => {
	console.log("Window loaded");
});

// DOMContentLoaded - DOM রেডি
document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM ready");
});

// beforeunload - পেজ ছাড়ার আগে
window.addEventListener("beforeunload", (e) => {
	e.preventDefault();
	e.returnValue = ""; // ব্রাউজারে কনফার্মেশন দেখাবে
});

// unload - পেজ ছাড়া
window.addEventListener("unload", () => {
	console.log("Page unloading");
	// Send analytics
	navigator.sendBeacon("/analytics", JSON.stringify(data));
});

// ============================================
// RESIZE EVENTS
// ============================================

// resize - উইন্ডো রিসাইজ
window.addEventListener("resize", (e) => {
	console.log("Width:", window.innerWidth);
	console.log("Height:", window.innerHeight);
	console.log("Outer Width:", window.outerWidth);
});

// Debounced resize
let resizeTimer;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		console.log("Resize ended");
	}, 250);
});

// ============================================
// SCROLL EVENTS
// ============================================

// scroll - স্ক্রল
window.addEventListener("scroll", (e) => {
	console.log("Scroll Y:", window.scrollY);
	console.log("Scroll X:", window.scrollX);
});

// Element scroll
const container = document.getElementById("container");
container.addEventListener("scroll", (e) => {
	console.log("Element scroll:", e.target.scrollTop);

	// Scroll direction
	const st = e.target.scrollTop;
	if (st > this.lastScrollTop) {
		console.log("Scrolling down");
	} else {
		console.log("Scrolling up");
	}
	this.lastScrollTop = st;
});

// scrollend (new)
container.addEventListener("scrollend", () => {
	console.log("Scroll ended");
});

// ============================================
// ERROR EVENTS
// ============================================

// JS Error
window.addEventListener("error", (e) => {
	console.log("Error:", e.message);
	console.log("File:", e.filename);
	console.log("Line:", e.lineno);
	console.log("Column:", e.colno);
	console.log("Error object:", e.error);
});

// Unhandled Promise Rejection
window.addEventListener("unhandledrejection", (e) => {
	console.log("Unhandled rejection:", e.reason);
	e.preventDefault();
});

// Resource Error (image, script, etc)
window.addEventListener(
	"error",
	(e) => {
		if (e.target.tagName) {
			console.log("Resource error:", e.target.src);
		}
	},
	true
); // Capture phase

// ============================================
// ONLINE/OFFLINE EVENTS
// ============================================

window.addEventListener("online", () => {
	console.log("Browser online");
	document.body.classList.remove("offline");
});

window.addEventListener("offline", () => {
	console.log("Browser offline");
	document.body.classList.add("offline");
});

console.log("Current status:", navigator.onLine);

// ============================================
// VISIBILITY EVENTS
// ============================================

document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		console.log("Tab hidden - pause video/game");
	} else {
		console.log("Tab visible - resume");
	}
	console.log("Visibility state:", document.visibilityState);
});

// ============================================
// POPSTATE/HASHCHANGE (Routing)
// ============================================

// Hash change
window.addEventListener("hashchange", (e) => {
	console.log("Old URL:", e.oldURL);
	console.log("New URL:", e.newURL);
	console.log("Hash:", location.hash);
});

// Popstate (back/forward button)
window.addEventListener("popstate", (e) => {
	console.log("State:", e.state);
	console.log("History changed");
});

// Push state
history.pushState({ page: 1 }, "Title", "/page1");
history.replaceState({ page: 2 }, "Title", "/page2");

// ============================================
// PRINT EVENTS
// ============================================

window.addEventListener("beforeprint", () => {
	console.log("Preparing for print");
});

window.addEventListener("afterprint", () => {
	console.log("Print completed");
});

// ============================================
// ORIENTATION EVENTS (Mobile)
// ============================================

window.addEventListener("orientationchange", () => {
	console.log("Orientation:", screen.orientation.angle);
});

// Screen Orientation API
screen.orientation.addEventListener("change", () => {
	console.log("New orientation:", screen.orientation.type);
});

//5. Other Events (অন্যান্য সব ইভেন্টস)

// ============================================
// CLIPBOARD EVENTS
// ============================================

const editable = document.getElementById("editable");

// copy
editable.addEventListener("copy", (e) => {
	console.log("Copy");
	const selection = document.getSelection();
	e.clipboardData.setData("text/plain", selection.toString().toUpperCase());
	e.preventDefault(); // Custom copy
});

// cut
editable.addEventListener("cut", (e) => {
	console.log("Cut");
});

// paste
editable.addEventListener("paste", (e) => {
	e.preventDefault();
	const text = e.clipboardData.getData("text/plain");
	console.log("Pasted:", text);

	// Insert at cursor
	document.execCommand("insertText", false, text);
});

// ============================================
// MEDIA EVENTS (Video/Audio)
// ============================================

const video = document.getElementById("video");

video.addEventListener("play", () => console.log("Play"));
video.addEventListener("pause", () => console.log("Pause"));
video.addEventListener("ended", () => console.log("Ended"));
video.addEventListener("volumechange", () =>
	console.log("Volume:", video.volume)
);
video.addEventListener("timeupdate", () =>
	console.log("Current time:", video.currentTime)
);
video.addEventListener("loadedmetadata", () =>
	console.log("Duration:", video.duration)
);
video.addEventListener("progress", () => console.log("Loading progress"));
video.addEventListener("waiting", () => console.log("Buffering..."));
video.addEventListener("playing", () => console.log("Playing"));
video.addEventListener("seeking", () => console.log("Seeking..."));
video.addEventListener("seeked", () => console.log("Seeked"));
video.addEventListener("ratechange", () =>
	console.log("Playback rate:", video.playbackRate)
);
video.addEventListener("fullscreenchange", () =>
	console.log("Fullscreen:", document.fullscreenElement)
);

// ============================================
// ANIMATION EVENTS
// ============================================

const animated = document.getElementById("animated");

// CSS Animation
animated.addEventListener("animationstart", (e) => {
	console.log("Animation started:", e.animationName);
});

animated.addEventListener("animationend", (e) => {
	console.log("Animation ended:", e.animationName);
});

animated.addEventListener("animationiteration", (e) => {
	console.log("Animation iteration:", e.elapsedTime);
});

// CSS Transition
animated.addEventListener("transitionstart", (e) => {
	console.log("Transition started:", e.propertyName);
});

animated.addEventListener("transitionend", (e) => {
	console.log("Transition ended:", e.propertyName);
});

animated.addEventListener("transitionrun", (e) => {
	console.log("Transition running");
});

// ============================================
// POINTER EVENTS (Unified Mouse/Touch)
// ============================================

const pointer = document.getElementById("pointer");

pointer.addEventListener("pointerdown", (e) => {
	console.log("Pointer down:", e.pointerId, e.pointerType);
});

pointer.addEventListener("pointermove", (e) => {
	console.log("Pointer move:", e.pressure, e.tiltX, e.tiltY);
});

pointer.addEventListener("pointerup", (e) => {
	console.log("Pointer up");
});

pointer.addEventListener("pointercancel", (e) => {
	console.log("Pointer cancelled");
});

pointer.addEventListener("pointerenter", (e) => {
	console.log("Pointer enter");
});

pointer.addEventListener("pointerleave", (e) => {
	console.log("Pointer leave");
});

pointer.addEventListener("pointerover", (e) => {
	console.log("Pointer over");
});

pointer.addEventListener("pointerout", (e) => {
	console.log("Pointer out");
});

// Got/Lost pointer capture
pointer.addEventListener("gotpointercapture", (e) => {
	console.log("Got capture");
});

pointer.addEventListener("lostpointercapture", (e) => {
	console.log("Lost capture");
});

// Set pointer capture
pointer.addEventListener("pointerdown", (e) => {
	pointer.setPointerCapture(e.pointerId);
});

// ============================================
// TOUCH EVENTS (Mobile)
// ============================================

const touch = document.getElementById("touch");

touch.addEventListener(
	"touchstart",
	(e) => {
		console.log("Touch start:", e.touches.length, "fingers");
		console.log("Target touches:", e.targetTouches);
		console.log("Changed touches:", e.changedTouches);

		// First touch
		const t = e.touches[0];
		console.log("Client:", t.clientX, t.clientY);
		console.log("Page:", t.pageX, t.pageY);
		console.log("Identifier:", t.identifier);

		e.preventDefault(); // Prevent mouse emulation
	},
	{ passive: false }
);

touch.addEventListener(
	"touchmove",
	(e) => {
		console.log("Touch moving");
		// e.preventDefault(); // Stop scroll
	},
	{ passive: false }
);

touch.addEventListener("touchend", (e) => {
	console.log("Touch end");
});

touch.addEventListener("touchcancel", (e) => {
	console.log("Touch cancelled (interrupted)");
});

// Multi-touch gestures
let initialDistance = 0;

touch.addEventListener("touchstart", (e) => {
	if (e.touches.length === 2) {
		initialDistance = Math.hypot(
			e.touches[0].pageX - e.touches[1].pageX,
			e.touches[0].pageY - e.touches[1].pageY
		);
	}
});

touch.addEventListener("touchmove", (e) => {
	if (e.touches.length === 2) {
		const currentDistance = Math.hypot(
			e.touches[0].pageX - e.touches[1].pageX,
			e.touches[0].pageY - e.touches[1].pageY
		);
		const scale = currentDistance / initialDistance;
		console.log("Pinch scale:", scale);
	}
});

// ============================================
// GAMEPAD EVENTS
// ============================================

window.addEventListener("gamepadconnected", (e) => {
	console.log("Gamepad connected:", e.gamepad.id);
	console.log("Buttons:", e.gamepad.buttons.length);
	console.log("Axes:", e.gamepad.axes.length);
});

window.addEventListener("gamepaddisconnected", (e) => {
	console.log("Gamepad disconnected");
});

// Poll gamepad state
function pollGamepad() {
	const gamepads = navigator.getGamepads();
	gamepads.forEach((gp, i) => {
		if (gp) {
			console.log(`Gamepad ${i}:`, gp.buttons[0].pressed);
		}
	});
	requestAnimationFrame(pollGamepad);
}

// ============================================
// DEVICE EVENTS
// ============================================

// Device orientation (mobile)
window.addEventListener("deviceorientation", (e) => {
	console.log("Alpha (Z):", e.alpha);
	console.log("Beta (X):", e.beta);
	console.log("Gamma (Y):", e.gamma);
	console.log("Absolute:", e.absolute);
});

// Device motion (accelerometer)
window.addEventListener("devicemotion", (e) => {
	console.log("Acceleration:", e.acceleration);
	console.log("Acceleration with gravity:", e.accelerationIncludingGravity);
	console.log("Rotation rate:", e.rotationRate);
	console.log("Interval:", e.interval);
});

// ============================================
// PAYMENT EVENTS
// ============================================

// Payment request
const paymentRequest = new PaymentRequest(methods, details);
paymentRequest.addEventListener("shippingaddresschange", (e) => {
	console.log("Address changed");
	e.updateWith(newDetails);
});

// ============================================
// WEBSOCKET EVENTS
// ============================================

const ws = new WebSocket("wss://example.com");

ws.addEventListener("open", () => console.log("Connected"));
ws.addEventListener("message", (e) => console.log("Message:", e.data));
ws.addEventListener("error", (e) => console.log("Error"));
ws.addEventListener("close", (e) => {
	console.log("Closed:", e.code, e.reason, e.wasClean);
});

// ============================================
// SERVER-SENT EVENTS
// ============================================

const evtSource = new EventSource("/events");

evtSource.addEventListener("open", () => console.log("SSE Connected"));
evtSource.addEventListener("message", (e) => {
	console.log("SSE Message:", e.data, e.lastEventId);
});
evtSource.addEventListener("error", () => console.log("SSE Error"));
evtSource.addEventListener("custom-event", (e) => {
	console.log("Custom event:", e.data);
});

// ============================================
// WORKER EVENTS
// ============================================

const worker = new Worker("worker.js");

worker.addEventListener("message", (e) => {
	console.log("Worker message:", e.data);
});

worker.addEventListener("error", (e) => {
	console.log("Worker error:", e.message, e.filename, e.lineno);
});

// Service Worker
navigator.serviceWorker.addEventListener("message", (e) => {
	console.log("SW message:", e.data);
});

navigator.serviceWorker.addEventListener("controllerchange", () => {
	console.log("SW controller changed");
});

// ============================================
// STORAGE EVENTS
// ============================================

// LocalStorage/SessionStorage change (other tabs)
window.addEventListener("storage", (e) => {
	console.log("Storage changed:", e.key);
	console.log("Old value:", e.oldValue);
	console.log("New value:", e.newValue);
	console.log("URL:", e.url);
	console.log("Storage area:", e.storageArea);
});

// IndexedDB
const request = indexedDB.open("db", 1);
request.addEventListener("success", () => console.log("DB opened"));
request.addEventListener("error", () => console.log("DB error"));
request.addEventListener("upgradeneeded", () =>
	console.log("DB upgrade needed")
);
request.addEventListener("blocked", () => console.log("DB blocked"));

// ============================================
// BROADCAST CHANNEL
// ============================================

const channel = new BroadcastChannel("app_channel");

channel.addEventListener("message", (e) => {
	console.log("Broadcast:", e.data);
});

// ============================================
// MESSAGE EVENTS (Window/iframe/postMessage)
// ============================================

window.addEventListener("message", (e) => {
	console.log("Message from:", e.origin);
	console.log("Data:", e.data);
	console.log("Source:", e.source);

	// Security check
	if (e.origin !== "https://trusted.com") return;
});

// Send message
window.parent.postMessage("Hello", "*");
iframe.contentWindow.postMessage({ type: "data", value: 123 }, "*");

//6. Event Methods & Properties (সব মেথড)

// ============================================
// EVENT LISTENER METHODS
// ============================================

const elementon = document.getElementById("test");

// addEventListener
element.addEventListener("click", handler);
element.addEventListener("click", handler, false); // useCapture
element.addEventListener("click", handler, {
	capture: false,
	once: true, // একবার চলবে
	passive: true, // preventDefault() call করবে না
	signal: abortController.signal, // abort করার জন্য
});

// removeEventListener
element.removeEventListener("click", handler); // same reference
element.removeEventListener("click", handler, true); // same capture

// dispatchEvent
const customEvent = new Event("custom");
element.dispatchEvent(customEvent);

// ============================================
// EVENT CONSTRUCTORS
// ============================================

// Basic Event
const event = new Event("build", {
	bubbles: true,
	cancelable: true,
	composed: false, // cross shadow DOM
});

// CustomEvent (with data)
const customEventin = new CustomEvent("user-action", {
	detail: { userId: 123, action: "click" },
	bubbles: true,
	cancelable: true,
});

// MouseEvent
const mouseEvent = new MouseEvent("click", {
	clientX: 100,
	clientY: 100,
	button: 0,
	bubbles: true,
});

// KeyboardEvent
const keyEvent = new KeyboardEvent("keydown", {
	key: "Enter",
	code: "Enter",
	ctrlKey: true,
	bubbles: true,
});

// FocusEvent
const focusEvent = new FocusEvent("focus", {
	relatedTarget: previousElement,
});

// InputEvent
const inputEvent = new InputEvent("input", {
	inputType: "insertText",
	data: "a",
});

// CompositionEvent (IME)
const compositionEvent = new CompositionEvent("compositionstart", {
	data: "",
});

// ============================================
// EVENT OBJECT METHODS & PROPERTIES
// ============================================

element.addEventListener("click", (e) => {
	// Basic Properties
	console.log(e.type); // 'click'
	console.log(e.target); // যে এলিমেন্টে ইভেন্ট ঘটেছে
	console.log(e.currentTarget); // যে এলিমেন্টে listener আছে
	console.log(e.eventPhase); // 1=capture, 2=target, 3=bubble

	// Timestamp
	console.log(e.timeStamp); // ইভেন্ট তৈরির সময়

	// Booleans
	console.log(e.bubbles); // bubble করে কিনা
	console.log(e.cancelable); // preventDefault করা যায় কিনা
	console.log(e.defaultPrevented); // preventDefault হয়েছে কিনা
	console.log(e.composed); // shadow DOM পার হয় কিনা

	// Methods
	e.preventDefault(); // ডিফল্ট অ্যাকশন বন্ধ
	e.stopPropagation(); // bubbling/capture বন্ধ
	e.stopImmediatePropagation(); // অন্য listener ও বন্ধ

	// ComposedPath
	console.log(e.composedPath()); // ইভেন্ট পাথ array

	// Target methods
	console.log(e.target.matches(".class"));
	console.log(e.target.closest(".parent"));
});

// ============================================
// EVENT DELEGATION UTILITY
// ============================================

function delegate(parent, eventType, selector, handler) {
	parent.addEventListener(eventType, (e) => {
		const target = e.target.closest(selector);
		if (target && parent.contains(target)) {
			handler.call(target, e, target);
		}
	});
}

// Usage
delegate(document.body, "click", ".btn", function (e, btn) {
	console.log("Button clicked:", btn);
});

// ============================================
// EVENT EMITTER PATTERN (Custom)
// ============================================

class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(event, listener) {
		if (!this.events[event]) this.events[event] = [];
		this.events[event].push(listener);
		return () => this.off(event, listener); // unsubscribe
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

// Usage
const emitter = new EventEmitter();

const unsubscribe = emitter.on("data", (data) => {
	console.log("Received:", data);
});

emitter.emit("data", { message: "Hello" });
unsubscribe(); // Stop listening

emitter.once("init", () => console.log("Initialized once"));

// ============================================
// ABORT CONTROLLER (Modern cancellation)
// ============================================

const controller = new AbortController();
const { signal } = controller;

element.addEventListener("click", handler, { signal });
window.addEventListener("scroll", handler, { signal });

// Remove all listeners at once
controller.abort();

// ============================================
// EVENT LISTENER OPTIONS TEST
// ============================================

// Check if passive is supported
let passiveSupported = false;
try {
	const options = {
		get passive() {
			passiveSupported = true;
			return false;
		},
	};
	window.addEventListener("test", null, options);
	window.removeEventListener("test", null, options);
} catch (err) {
	passiveSupported = false;
}

// ============================================
// PERFORMANCE MARKS (with events)
// ============================================

// Mark and measure
performance.mark("start");
element.addEventListener("click", () => {
	performance.mark("end");
	performance.measure("click-duration", "start", "end");

	const entries = performance.getEntriesByType("measure");
	console.log("Duration:", entries[0].duration);
});

/*

// MOUSE EVENTS
'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove',
'mouseenter', 'mouseleave', 'mouseover', 'mouseout',
'contextmenu', 'wheel', 'dragstart', 'drag', 'dragend',
'dragenter', 'dragover', 'dragleave', 'drop'

// KEYBOARD EVENTS
'keydown', 'keyup', 'keypress' (deprecated)

// FORM EVENTS
'submit', 'reset', 'input', 'change', 'focus', 'blur',
'focusin', 'focusout', 'invalid', 'select'

// WINDOW/DOCUMENT EVENTS
'load', 'DOMContentLoaded', 'beforeunload', 'unload',
'resize', 'scroll', 'scrollend', 'error', 'online', 'offline',
'visibilitychange', 'hashchange', 'popstate', 'beforeprint', 'afterprint',
'orientationchange', 'pagehide', 'pageshow'

// CLIPBOARD EVENTS
'copy', 'cut', 'paste'

// MEDIA EVENTS
'play', 'pause', 'ended', 'volumechange', 'timeupdate',
'loadedmetadata', 'progress', 'waiting', 'playing',
'seeking', 'seeked', 'ratechange', 'fullscreenchange'

// ANIMATION EVENTS
'animationstart', 'animationend', 'animationiteration',
'animationcancel', 'transitionstart', 'transitionend',
'transitionrun', 'transitioncancel'

// POINTER EVENTS (Mouse + Touch unified)
'pointerdown', 'pointermove', 'pointerup', 'pointercancel',
'pointerenter', 'pointerleave', 'pointerover', 'pointerout',
'gotpointercapture', 'lostpointercapture'

// TOUCH EVENTS
'touchstart', 'touchmove', 'touchend', 'touchcancel'

// DEVICE EVENTS
'deviceorientation', 'devicemotion', 'gamepadconnected', 'gamepaddisconnected'

// WEBSOCKET EVENTS
'open', 'message', 'error', 'close'

// WORKER EVENTS
'message', 'error', 'messageerror'

// STORAGE EVENTS
'storage', 'success', 'upgradeneeded', 'blocked'

// MISC
'message', 'beforeinstallprompt', 'appinstalled',
'canplay', 'canplaythrough', 'durationchange', 'emptied',
'loadeddata', 'loadstart', 'progress', 'stalled', 'suspend'

*/
