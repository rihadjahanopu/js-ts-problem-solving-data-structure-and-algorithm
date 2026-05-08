// ═══════════════════════════════════════════════════════════════
// 35_branded_types.ts — Branded Types (Nominal Typing in TS)
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Problem: Structural Typing
// ═══════════════════════════════════════

// TypeScript uses structural typing — same shape = same type
type UserId = string;
type OrderId = string;

function getUser(id: UserId): void {
	console.log("Getting user:", id);
}

function getOrder(id: OrderId): void {
	console.log("Getting order:", id);
}

const userId: UserId = "user-123";
const orderId: OrderId = "order-456";

getUser(userId); // ✅ OK
getUser(orderId); // ❌ Should be error, but compiles!

// ═══════════════════════════════════════
// Solution: Branded Types
// ═══════════════════════════════════════

type Brand<K, T> = K & { __brand: T };

// Create branded types
type BrandedUserId = Brand<string, "UserId">;
type BrandedOrderId = Brand<string, "OrderId">;
type BrandedProductId = Brand<string, "ProductId">;
type BrandedEmail = Brand<string, "Email">;
type BrandedUUID = Brand<string, "UUID">;

// Factory functions
function createUserId(id: string): BrandedUserId {
	if (!id.startsWith("user-")) {
		throw new Error("Invalid user ID format");
	}
	return id as BrandedUserId;
}

function createOrderId(id: string): BrandedOrderId {
	if (!id.startsWith("order-")) {
		throw new Error("Invalid order ID format");
	}
	return id as BrandedOrderId;
}

function createEmail(email: string): BrandedEmail {
	if (!email.includes("@")) {
		throw new Error("Invalid email");
	}
	return email.toLowerCase() as BrandedEmail;
}

function createUUID(uuid: string): BrandedUUID {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	if (!uuidRegex.test(uuid)) {
		throw new Error("Invalid UUID format");
	}
	return uuid as BrandedUUID;
}

// Now these are type-safe
const brandedUserId = createUserId("user-123");
const brandedOrderId = createOrderId("order-456");

function getBrandedUser(id: BrandedUserId): void {
	console.log("Getting user:", id);
}

function getBrandedOrder(id: BrandedOrderId): void {
	console.log("Getting order:", id);
}

getBrandedUser(brandedUserId); // ✅ OK
// getBrandedUser(brandedOrderId); // ❌ Error!
// getBrandedUser("user-123");     // ❌ Error!

// ═══════════════════════════════════════
// Branded Types for Validation
// ═══════════════════════════════════════

type Validated<T> = T & { __validated: true };
type Sanitized<T> = T & { __sanitized: true };

function validateString(value: string, minLength: number): Validated<string> {
	if (value.length < minLength) {
		throw new Error(`String must be at least ${minLength} characters`);
	}
	return value as Validated<string>;
}

function sanitizeHtml(html: string): Sanitized<string> {
	const sanitized = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	return sanitized as Sanitized<string>;
}

function renderHtml(html: Sanitized<string>): void {
	console.log("Rendering:", html);
}

const validated = validateString("Hello World", 5);
const sanitized = sanitizeHtml("<script>alert('xss')</script>");

renderHtml(sanitized); // ✅ OK
// renderHtml("<script>"); // ❌ Error!

// ═══════════════════════════════════════
// Branded Types for Units
// ═══════════════════════════════════════

type Meters = Brand<number, "Meters">;
type Kilometers = Brand<number, "Kilometers">;
type Seconds = Brand<number, "Seconds">;
type Minutes = Brand<number, "Minutes">;

function meters(value: number): Meters {
	return value as Meters;
}

function kilometers(value: number): Kilometers {
	return value as Kilometers;
}

function seconds(value: number): Seconds {
	return value as Seconds;
}

function minutes(value: number): Minutes {
	return value as Minutes;
}

function toKilometers(m: Meters): Kilometers {
	return (m / 1000) as Kilometers;
}

function toMinutes(s: Seconds): Minutes {
	return (s / 60) as Minutes;
}

const distance = meters(5000);
const time = seconds(120);

const km = toKilometers(distance); // ✅ OK
const min = toMinutes(time); // ✅ OK
// toKilometers(time);               // ❌ Error!
// toMinutes(distance);              // ❌ Error!

// ═══════════════════════════════════════
// Branded Types for State Machine
// ═══════════════════════════════════════

type UnverifiedEmail = Brand<string, "UnverifiedEmail">;
type VerifiedEmail = Brand<string, "VerifiedEmail">;
type UnverifiedUser = Brand<{ email: UnverifiedEmail }, "UnverifiedUser">;
type VerifiedUser = Brand<
	{ email: VerifiedEmail; verifiedAt: Date },
	"VerifiedUser"
>;

function createUnverifiedUser(email: string): UnverifiedUser {
	return { email: email as UnverifiedEmail } as UnverifiedUser;
}

function verifyEmail(user: UnverifiedUser): VerifiedUser {
	return {
		email: user.email as VerifiedEmail,
		verifiedAt: new Date(),
	} as VerifiedUser;
}

function sendVerificationEmail(user: UnverifiedUser): void {
	console.log("Sending verification to:", user.email);
}

function sendNewsletter(user: VerifiedUser): void {
	console.log("Sending newsletter to:", user.email);
}

const newUser = createUnverifiedUser("user@example.com");
const verifiedUser = verifyEmail(newUser);

sendVerificationEmail(newUser); // ✅ OK
// sendNewsletter(newUser);         // ❌ Error!
sendNewsletter(verifiedUser); // ✅ OK

// ═══════════════════════════════════════
// Branded Types with Flavor (lighter alternative)
// ═══════════════════════════════════════

type Flavor<T, FlavorT> = T & { __flavor?: FlavorT };

// Flavor doesn't require explicit casting
type FlavoredUserId = Flavor<string, "UserId">;
type FlavoredOrderId = Flavor<string, "OrderId">;

function getFlavorUser(id: FlavoredUserId): void {
	console.log("User:", id);
}

// Can pass plain string (less strict)
getFlavorUser("user-123" as FlavoredUserId);

// ═══════════════════════════════════════
// Practical: Database IDs
// ═══════════════════════════════════════

type TableId<T extends string> = Brand<number, `${T}Id`>;

type UserTableId = TableId<"User">;
type ProductTableId = TableId<"Product">;
type OrderTableId = TableId<"Order">;

function createTableId<T extends string>(table: T, id: number): TableId<T> {
	return id as TableId<T>;
}

const userTableId = createTableId("User", 1);
const productTableId = createTableId("Product", 1);

function findUserById(id: UserTableId): void {
	console.log("Finding user:", id);
}

findUserById(userTableId); // ✅ OK
// findUserById(productTableId); // ❌ Error!

export { createEmail, createOrderId, createUUID, createUserId };
