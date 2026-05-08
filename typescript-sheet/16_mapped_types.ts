// ═══════════════════════════════════════════════════════════════
// 16_mapped_types.ts — Mapped Types (ম্যাপড টাইপ)
// ═══════════════════════════════════════════════════════════════

interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	isActive: boolean;
}

// ═══════════════════════════════════════
// Basic Mapped Type
// ═══════════════════════════════════════

type ReadonlyUser = {
	readonly [K in keyof User]: User[K];
};

let readonlyUser: ReadonlyUser = {
	id: 1,
	name: "Rahim",
	email: "rahim@test.com",
	age: 25,
	isActive: true,
};
// readonlyUser.name = "Karim"; // ❌ Error

// ═══════════════════════════════════════
// Generic Mapped Type
// ═══════════════════════════════════════

type MyReadonly<T> = {
	readonly [K in keyof T]: T[K];
};

type MyPartial<T> = {
	[K in keyof T]?: T[K];
};

type MyRequired<T> = {
	[K in keyof T]-?: T[K]; // -? removes optionality
};

type MyNullable<T> = {
	[K in keyof T]: T[K] | null;
};

let partialUser: MyPartial<User> = { name: "Rahim" };
let nullableUser: MyNullable<User> = {
	id: null,
	name: "Rahim",
	email: null,
	age: null,
	isActive: null,
};

// ═══════════════════════════════════════
// Key Remapping (as)
// ═══════════════════════════════════════

type Getters<T> = {
	[K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
/*
UserGetters = {
    getId: () => number;
    getName: () => string;
    getEmail: () => string;
    getAge: () => number;
    getIsActive: () => boolean;
}
*/

let userGetters: UserGetters = {
	getId: () => 1,
	getName: () => "Rahim",
	getEmail: () => "rahim@test.com",
	getAge: () => 25,
	getIsActive: () => true,
};

console.log(userGetters.getName());

// ═══════════════════════════════════════
// Filter Keys with as
// ═══════════════════════════════════════

type RemoveKindField<T> = {
	[K in keyof T as Exclude<K, "kind">]: T[K];
};

interface Circle {
	kind: "circle";
	radius: number;
}

type CircleWithoutKind = RemoveKindField<Circle>;
// { radius: number }

// ═══════════════════════════════════════
// Pick by Value Type
// ═══════════════════════════════════════

type PickByType<T, U> = {
	[K in keyof T as T[K] extends U ? K : never]: T[K];
};

type StringProperties = PickByType<User, string>;
// { name: string; email: string }

type NumberProperties = PickByType<User, number>;
// { id: number; age: number }

let stringProps: StringProperties = {
	name: "Rahim",
	email: "rahim@test.com",
};

console.log("String props:", stringProps);

// ═══════════════════════════════════════
// Event Handler Mapping
// ═══════════════════════════════════════

interface Events {
	click: { x: number; y: number };
	hover: { element: string };
	scroll: { position: number };
}

type EventHandlers<T> = {
	[K in keyof T as `on${Capitalize<string & K>}`]: (payload: T[K]) => void;
};

type Handlers = EventHandlers<Events>;
/*
Handlers = {
    onClick: (payload: { x: number; y: number }) => void;
    onHover: (payload: { element: string }) => void;
    onScroll: (payload: { position: number }) => void;
}
*/

let handlers: Handlers = {
	onClick: (payload) => console.log(`Clicked at ${payload.x}, ${payload.y}`),
	onHover: (payload) => console.log(`Hovering over ${payload.element}`),
	onScroll: (payload) => console.log(`Scrolled to ${payload.position}`),
};

handlers.onClick({ x: 100, y: 200 });

// ═══════════════════════════════════════
// Deep Partial
// ═══════════════════════════════════════

type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Company {
	name: string;
	address: {
		city: string;
		country: string;
	};
	employees: {
		name: string;
		role: string;
	}[];
}

let partialCompany: DeepPartial<Company> = {
	name: "Tech Corp",
	address: {
		city: "Dhaka",
	},
};

console.log("Partial company:", partialCompany);

export {};
