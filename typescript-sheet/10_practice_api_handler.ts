// ═══════════════════════════════════════════════════════════════
// 10_practice_api_handler.ts — API Response Handler with Generics
// ═══════════════════════════════════════════════════════════════

// Generic API Response Type
type ApiResponse<T> = {
	success: boolean;
	data: T;
	message?: string;
	timestamp: number;
};

// User Data Type
type UserData = {
	id: number;
	username: string;
	email: string;
	role: "admin" | "user" | "guest";
};

// Product Data Type
type ProductData = {
	id: number;
	title: string;
	price: number;
	category: string;
};

// Order Data Type
type OrderData = {
	orderId: string;
	items: ProductData[];
	total: number;
	status: "pending" | "shipped" | "delivered";
};

// ═══════════════════════════════════════
// Simulated API Functions
// ═══════════════════════════════════════

function fetchUser(id: number): ApiResponse<UserData> {
	return {
		success: true,
		data: {
			id: id,
			username: "rahim123",
			email: "rahim@example.com",
			role: "user",
		},
		timestamp: Date.now(),
	};
}

function fetchProducts(): ApiResponse<ProductData[]> {
	return {
		success: true,
		data: [
			{ id: 1, title: "Laptop", price: 999, category: "Electronics" },
			{ id: 2, title: "Phone", price: 699, category: "Electronics" },
			{ id: 3, title: "Headphones", price: 199, category: "Audio" },
		],
		timestamp: Date.now(),
	};
}

function fetchOrder(orderId: string): ApiResponse<OrderData> {
	return {
		success: true,
		data: {
			orderId: orderId,
			items: [{ id: 1, title: "Laptop", price: 999, category: "Electronics" }],
			total: 999,
			status: "shipped",
		},
		timestamp: Date.now(),
	};
}

// Error Response Generator
function createErrorResponse(message: string): ApiResponse<null> {
	return {
		success: false,
		data: null,
		message: message,
		timestamp: Date.now(),
	};
}

// ═══════════════════════════════════════
// Generic Response Handler
// ═══════════════════════════════════════

function handleResponse<T>(response: ApiResponse<T>): void {
	console.log("📡 API Response");
	console.log("─────────────────────");
	console.log(`Success: ${response.success}`);
	console.log(`Timestamp: ${new Date(response.timestamp).toLocaleString()}`);

	if (response.message) {
		console.log(`Message: ${response.message}`);
	}

	if (response.success && response.data) {
		console.log("Data:", JSON.stringify(response.data, null, 2));
	} else {
		console.log("Data: null");
	}
}

// ═══════════════════════════════════════
// Usage
// ═══════════════════════════════════════

let userResponse = fetchUser(1);
handleResponse(userResponse);
// TypeScript knows: userResponse.data.username is string

let productResponse = fetchProducts();
handleResponse(productResponse);
// TypeScript knows: productResponse.data[0].price is number

let orderResponse = fetchOrder("ORD-12345");
handleResponse(orderResponse);

let errorResponse = createErrorResponse("User not found");
handleResponse(errorResponse);

export {};
