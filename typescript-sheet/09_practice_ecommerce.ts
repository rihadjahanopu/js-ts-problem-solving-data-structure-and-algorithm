// ═══════════════════════════════════════════════════════════════
// 09_practice_ecommerce.ts — E-commerce Product & Cart System
// ═══════════════════════════════════════════════════════════════

// Enum for categories
enum ProductCategory {
	Electronics = "ELECTRONICS",
	Clothing = "CLOTHING",
	Food = "FOOD",
	Books = "BOOKS",
}

// Interface for Product
interface Product {
	readonly id: number;
	name: string;
	price: number;
	category: ProductCategory;
	inStock: boolean;
	tags?: string[];
}

// Type for Cart Item
type CartItem = {
	product: Product;
	quantity: number;
};

// Shopping Cart Interface
interface ShoppingCart {
	items: CartItem[];
	addItem(product: Product, quantity: number): void;
	removeItem(productId: number): void;
	getTotal(): number;
	getItemCount(): number;
	displayCart(): void;
}

// Implementation
const cart: ShoppingCart = {
	items: [],

	addItem(product, quantity) {
		if (quantity <= 0) {
			console.log("❌ Quantity must be positive!");
			return;
		}
		if (!product.inStock) {
			console.log(`❌ ${product.name} is out of stock!`);
			return;
		}
		this.items.push({ product, quantity });
		console.log(`✅ Added ${quantity}x ${product.name} to cart`);
	},

	removeItem(productId) {
		const beforeCount = this.items.length;
		this.items = this.items.filter((item) => item.product.id !== productId);
		if (this.items.length < beforeCount) {
			console.log(`✅ Removed product #${productId}`);
		} else {
			console.log(`⚠️ Product #${productId} not found in cart`);
		}
	},

	getTotal() {
		return this.items.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0
		);
	},

	getItemCount() {
		return this.items.reduce((count, item) => count + item.quantity, 0);
	},

	displayCart() {
		console.log("🛒 Shopping Cart");
		console.log("─────────────────────");
		if (this.items.length === 0) {
			console.log("Cart is empty!");
			return;
		}
		this.items.forEach((item) => {
			const subtotal = item.product.price * item.quantity;
			console.log(
				`${item.product.name} x${item.quantity} — $${subtotal.toFixed(2)}`
			);
		});
		console.log("─────────────────────");
		console.log(`Total Items: ${this.getItemCount()}`);
		console.log(`Total Price: $${this.getTotal().toFixed(2)}`);
	},
};

// ═══════════════════════════════════════
// Create Products
// ═══════════════════════════════════════

let laptop: Product = {
	id: 1,
	name: "MacBook Pro",
	price: 1299.99,
	category: ProductCategory.Electronics,
	inStock: true,
	tags: ["laptop", "apple"],
};

let tshirt: Product = {
	id: 2,
	name: "Cotton T-Shirt",
	price: 19.99,
	category: ProductCategory.Clothing,
	inStock: true,
};

let book: Product = {
	id: 3,
	name: "TypeScript Handbook",
	price: 29.99,
	category: ProductCategory.Books,
	inStock: true,
};

let outOfStockItem: Product = {
	id: 4,
	name: "iPhone 15",
	price: 999.99,
	category: ProductCategory.Electronics,
	inStock: false,
};

// ═══════════════════════════════════════
// Use Cart
// ═══════════════════════════════════════

cart.addItem(laptop, 1);
cart.addItem(tshirt, 3);
cart.addItem(book, 2);
cart.addItem(outOfStockItem, 1); // Should fail
cart.addItem(tshirt, 0); // Should fail

cart.displayCart();

cart.removeItem(2); // Remove tshirt
cart.displayCart();

export {};
