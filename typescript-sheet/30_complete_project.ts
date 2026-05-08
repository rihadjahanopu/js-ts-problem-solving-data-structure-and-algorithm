// ═══════════════════════════════════════════════════════════════
// 30_complete_project.ts — Complete TypeScript Project Example
// E-Commerce API with all TypeScript features
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// 1. Domain Types
// ═══════════════════════════════════════

type UUID = string;
type Timestamp = number;
type Currency = "USD" | "EUR" | "BDT" | "GBP";
type OrderStatus =
	| "pending"
	| "confirmed"
	| "shipped"
	| "delivered"
	| "cancelled";
type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

interface Entity {
	id: UUID;
	createdAt: Date;
	updatedAt: Date;
}

interface Product extends Entity {
	name: string;
	description: string;
	price: number;
	currency: Currency;
	category: ProductCategory;
	stock: number;
	tags: string[];
	isActive: boolean;
}

enum ProductCategory {
	Electronics = "ELECTRONICS",
	Clothing = "CLOTHING",
	Food = "FOOD",
	Books = "BOOKS",
	Home = "HOME",
}

interface Customer extends Entity {
	name: string;
	email: string;
	phone?: string;
	address: Address;
	orders: UUID[];
}

interface Address {
	street: string;
	city: string;
	country: string;
	zipCode: string;
}

interface OrderItem {
	productId: UUID;
	productName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
}

interface Order extends Entity {
	customerId: UUID;
	items: OrderItem[];
	subtotal: number;
	tax: number;
	shipping: number;
	total: number;
	status: OrderStatus;
	shippingAddress: Address;
	paymentStatus: PaymentStatus;
}

// ═══════════════════════════════════════
// 2. Custom Errors
// ═══════════════════════════════════════

class DomainError extends Error {
	constructor(
		message: string,
		public code: string,
		public statusCode: number = 400
	) {
		super(message);
		this.name = this.constructor.name;
	}
}

class ProductNotFoundError extends DomainError {
	constructor(productId: UUID) {
		super(`Product ${productId} not found`, "PRODUCT_NOT_FOUND", 404);
	}
}

class InsufficientStockError extends DomainError {
	constructor(productId: UUID, requested: number, available: number) {
		super(
			`Product ${productId}: requested ${requested}, available ${available}`,
			"INSUFFICIENT_STOCK",
			400
		);
	}
}

class InvalidOrderError extends DomainError {
	constructor(message: string) {
		super(message, "INVALID_ORDER", 400);
	}
}

// ═══════════════════════════════════════
// 3. Result Type
// ═══════════════════════════════════════

type Result<T, E = DomainError> =
	| { ok: true; value: T }
	| { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
	return { ok: true, value };
}

function err<E extends DomainError>(error: E): Result<never, E> {
	return { ok: false, error };
}

// ═══════════════════════════════════════
// 4. Repository Interface (Generic)
// ═══════════════════════════════════════

interface Repository<T extends Entity> {
	findById(id: UUID): Promise<Result<T>>;
	findAll(): Promise<T[]>;
	create(entity: Omit<T, keyof Entity>): Promise<T>;
	update(id: UUID, updates: Partial<T>): Promise<Result<T>>;
	delete(id: UUID): Promise<boolean>;
}

// ═══════════════════════════════════════
// 5. In-Memory Repository Implementation
// ═══════════════════════════════════════

class InMemoryRepository<T extends Entity> implements Repository<T> {
	protected items: Map<UUID, T> = new Map();

	async findById(id: UUID): Promise<Result<T>> {
		const item = this.items.get(id);
		if (!item) {
			return err(new DomainError(`Item ${id} not found`, "NOT_FOUND", 404));
		}
		return ok(item);
	}

	async findAll(): Promise<T[]> {
		return Array.from(this.items.values());
	}

	async create(entity: Omit<T, keyof Entity>): Promise<T> {
		const newEntity = {
			...entity,
			id: this.generateId(),
			createdAt: new Date(),
			updatedAt: new Date(),
		} as T;

		this.items.set(newEntity.id, newEntity);
		return newEntity;
	}

	async update(id: UUID, updates: Partial<T>): Promise<Result<T>> {
		const item = this.items.get(id);
		if (!item) {
			return err(new DomainError(`Item ${id} not found`, "NOT_FOUND", 404));
		}

		const updated = { ...item, ...updates, updatedAt: new Date() };
		this.items.set(id, updated);
		return ok(updated);
	}

	async delete(id: UUID): Promise<boolean> {
		return this.items.delete(id);
	}

	private generateId(): UUID {
		return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}
}

// ═══════════════════════════════════════
// 6. Product Repository with Business Logic
// ═══════════════════════════════════════

class ProductRepository extends InMemoryRepository<Product> {
	async findByCategory(category: ProductCategory): Promise<Product[]> {
		const all = await this.findAll();
		return all.filter((p) => p.category === category);
	}

	async findByTag(tag: string): Promise<Product[]> {
		const all = await this.findAll();
		return all.filter((p) => p.tags.includes(tag));
	}

	async search(query: string): Promise<Product[]> {
		const all = await this.findAll();
		const lowerQuery = query.toLowerCase();
		return all.filter(
			(p) =>
				p.name.toLowerCase().includes(lowerQuery) ||
				p.description.toLowerCase().includes(lowerQuery)
		);
	}

	async updateStock(id: UUID, quantity: number): Promise<Result<Product>> {
		const productResult = await this.findById(id);
		if (!productResult.ok) return productResult;

		const product = productResult.value;
		const newStock = product.stock + quantity;

		if (newStock < 0) {
			return err(
				new InsufficientStockError(id, Math.abs(quantity), product.stock)
			);
		}

		return this.update(id, { stock: newStock } as Partial<Product>);
	}
}

// ═══════════════════════════════════════
// 7. Order Service
// ═══════════════════════════════════════

interface CreateOrderRequest {
	customerId: UUID;
	items: Array<{ productId: UUID; quantity: number }>;
	shippingAddress: Address;
}

class OrderService {
	constructor(
		private productRepo: ProductRepository,
		private orderRepo: InMemoryRepository<Order>
	) {}

	async createOrder(request: CreateOrderRequest): Promise<Result<Order>> {
		// Validate items
		if (request.items.length === 0) {
			return err(new InvalidOrderError("Order must contain at least one item"));
		}

		// Build order items and validate stock
		const orderItems: OrderItem[] = [];
		let subtotal = 0;

		for (const item of request.items) {
			const productResult = await this.productRepo.findById(item.productId);
			if (!productResult.ok) {
				return err(new ProductNotFoundError(item.productId));
			}

			const product = productResult.value;

			if (!product.isActive) {
				return err(
					new InvalidOrderError(`Product ${product.name} is not available`)
				);
			}

			if (product.stock < item.quantity) {
				return err(
					new InsufficientStockError(product.id, item.quantity, product.stock)
				);
			}

			const totalPrice = product.price * item.quantity;
			orderItems.push({
				productId: product.id,
				productName: product.name,
				quantity: item.quantity,
				unitPrice: product.price,
				totalPrice,
			});

			subtotal += totalPrice;

			// Deduct stock
			const stockResult = await this.productRepo.updateStock(
				product.id,
				-item.quantity
			);
			if (!stockResult.ok) return stockResult as Result<never>;
		}

		const tax = subtotal * 0.1; // 10% tax
		const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
		const total = subtotal + tax + shipping;

		const order = await this.orderRepo.create({
			customerId: request.customerId,
			items: orderItems,
			subtotal,
			tax,
			shipping,
			total,
			status: "pending",
			shippingAddress: request.shippingAddress,
			paymentStatus: "pending",
		} as Omit<Order, keyof Entity>);

		return ok(order);
	}

	async confirmOrder(orderId: UUID): Promise<Result<Order>> {
		const orderResult = await this.orderRepo.findById(orderId);
		if (!orderResult.ok) return orderResult;

		const order = orderResult.value;
		if (order.status !== "pending") {
			return err(new InvalidOrderError(`Order is already ${order.status}`));
		}

		return this.orderRepo.update(orderId, {
			status: "confirmed",
			paymentStatus: "completed",
		} as Partial<Order>);
	}

	async getOrderSummary(orderId: UUID): Promise<
		Result<{
			order: Order;
			itemCount: number;
			savings: number;
		}>
	> {
		const orderResult = await this.orderRepo.findById(orderId);
		if (!orderResult.ok) return orderResult;

		const order = orderResult.value;
		const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
		const savings = order.shipping === 0 ? 10 : 0;

		return ok({ order, itemCount, savings });
	}
}

// ═══════════════════════════════════════
// 8. Event System
// ═══════════════════════════════════════

type EventPayload =
	| { type: "order_created"; orderId: UUID; customerId: UUID; total: number }
	| { type: "order_confirmed"; orderId: UUID }
	| { type: "stock_low"; productId: UUID; stock: number }
	| { type: "payment_received"; orderId: UUID; amount: number };

type EventHandler<T extends EventPayload["type"]> = (
	payload: Extract<EventPayload, { type: T }>
) => void;

class EventBus {
	private handlers: Map<string, Array<(payload: any) => void>> = new Map();

	on<T extends EventPayload["type"]>(
		type: T,
		handler: EventHandler<T>
	): () => void {
		if (!this.handlers.has(type)) {
			this.handlers.set(type, []);
		}
		this.handlers.get(type)!.push(handler);

		return () => this.off(type, handler);
	}

	off<T extends EventPayload["type"]>(type: T, handler: EventHandler<T>): void {
		const handlers = this.handlers.get(type);
		if (handlers) {
			this.handlers.set(
				type,
				handlers.filter((h) => h !== handler)
			);
		}
	}

	emit<T extends EventPayload["type"]>(
		type: T,
		payload: Extract<EventPayload, { type: T }>
	): void {
		const handlers = this.handlers.get(type);
		if (handlers) {
			handlers.forEach((handler) => handler(payload));
		}
	}
}

// ═══════════════════════════════════════
// 9. Logger Service
// ═══════════════════════════════════════

type LogLevel = "debug" | "info" | "warn" | "error";

interface Logger {
	debug(message: string, meta?: Record<string, any>): void;
	info(message: string, meta?: Record<string, any>): void;
	warn(message: string, meta?: Record<string, any>): void;
	error(message: string, meta?: Record<string, any>): void;
}

class ConsoleLogger implements Logger {
	constructor(private context: string) {}

	private log(
		level: LogLevel,
		message: string,
		meta?: Record<string, any>
	): void {
		const timestamp = new Date().toISOString();
		const metaStr = meta ? ` ${JSON.stringify(meta)}` : "";
		console.log(
			`[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}${metaStr}`
		);
	}

	debug(message: string, meta?: Record<string, any>): void {
		this.log("debug", message, meta);
	}

	info(message: string, meta?: Record<string, any>): void {
		this.log("info", message, meta);
	}

	warn(message: string, meta?: Record<string, any>): void {
		this.log("warn", message, meta);
	}

	error(message: string, meta?: Record<string, any>): void {
		this.log("error", message, meta);
	}
}

// ═══════════════════════════════════════
// 10. Demo / Test
// ═══════════════════════════════════════

async function runDemo(): Promise<void> {
	const logger = new ConsoleLogger("ECommerce");
	const events = new EventBus();

	// Setup event listeners
	events.on("order_created", (payload) => {
		logger.info("Order created", {
			orderId: payload.orderId,
			total: payload.total,
		});
	});

	events.on("stock_low", (payload) => {
		logger.warn("Low stock alert", {
			productId: payload.productId,
			stock: payload.stock,
		});
	});

	// Initialize repositories
	const productRepo = new ProductRepository();
	const orderRepo = new InMemoryRepository<Order>();
	const orderService = new OrderService(productRepo, orderRepo);

	// Seed products
	const laptop = await productRepo.create({
		name: "MacBook Pro",
		description: "14-inch M3 Pro",
		price: 1999,
		currency: "USD",
		category: ProductCategory.Electronics,
		stock: 10,
		tags: ["laptop", "apple"],
		isActive: true,
	});

	const phone = await productRepo.create({
		name: "iPhone 15 Pro",
		description: "256GB Titanium",
		price: 1199,
		currency: "USD",
		category: ProductCategory.Electronics,
		stock: 20,
		tags: ["phone", "apple"],
		isActive: true,
	});

	const tshirt = await productRepo.create({
		name: "Cotton T-Shirt",
		description: "Premium cotton",
		price: 29,
		currency: "USD",
		category: ProductCategory.Clothing,
		stock: 100,
		tags: ["clothing", "cotton"],
		isActive: true,
	});

	logger.info("Products seeded", { count: 3 });

	// Create order
	const orderResult = await orderService.createOrder({
		customerId: "cust-001",
		items: [
			{ productId: laptop.id, quantity: 1 },
			{ productId: tshirt.id, quantity: 3 },
		],
		shippingAddress: {
			street: "123 Main St",
			city: "Dhaka",
			country: "Bangladesh",
			zipCode: "1200",
		},
	});

	if (orderResult.ok) {
		const order = orderResult.value;
		events.emit("order_created", {
			type: "order_created",
			orderId: order.id,
			customerId: order.customerId,
			total: order.total,
		});

		logger.info("Order created successfully", {
			orderId: order.id,
			items: order.items.length,
			subtotal: order.subtotal,
			tax: order.tax,
			shipping: order.shipping,
			total: order.total,
		});

		// Confirm order
		const confirmResult = await orderService.confirmOrder(order.id);
		if (confirmResult.ok) {
			logger.info("Order confirmed", { orderId: order.id });
		}

		// Get summary
		const summaryResult = await orderService.getOrderSummary(order.id);
		if (summaryResult.ok) {
			logger.info("Order summary", summaryResult.value);
		}
	} else {
		logger.error("Order creation failed", { error: orderResult.error.message });
	}

	// Try to order more than stock
	const failResult = await orderService.createOrder({
		customerId: "cust-002",
		items: [{ productId: laptop.id, quantity: 100 }],
		shippingAddress: {
			street: "456 Oak St",
			city: "Chittagong",
			country: "Bangladesh",
			zipCode: "4000",
		},
	});

	if (!failResult.ok) {
		logger.error("Expected failure", {
			error: failResult.error.message,
			code: failResult.error.code,
		});
	}

	// Search products
	const searchResults = await productRepo.search("apple");
	logger.info("Search results", {
		count: searchResults.length,
		products: searchResults.map((p) => p.name),
	});

	// Find by category
	const electronics = await productRepo.findByCategory(
		ProductCategory.Electronics
	);
	logger.info("Electronics", { count: electronics.length });
}

runDemo().catch(console.error);

export {
	ConsoleLogger,
	Customer,
	DomainError,
	EventBus,
	InMemoryRepository,
	InsufficientStockError,
	Order,
	OrderItem,
	OrderService,
	OrderStatus,
	PaymentStatus,
	Product,
	ProductCategory,
	ProductNotFoundError,
	ProductRepository,
	Repository,
	Result,
	err,
	ok,
};
