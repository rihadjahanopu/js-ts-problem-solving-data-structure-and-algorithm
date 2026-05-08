// ═══════════════════════════════════════════════════════════════
// 14_utility_types.ts — Utility Types (বিল্ট-ইন ইউটিলিটি টাইপ)
// ═══════════════════════════════════════════════════════════════

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    address: {
        city: string;
        country: string;
    };
}

let fullUser: User = {
    id: 1,
    name: "Rahim",
    email: "rahim@test.com",
    age: 25,
    isActive: true,
    address: { city: "Dhaka", country: "Bangladesh" }
};

// ═══════════════════════════════════════
// Partial<T> — সব properties optional
// ═══════════════════════════════════════

function updateUser(user: User, updates: Partial<User>): User {
    return { ...user, ...updates };
}

let updated = updateUser(fullUser, { name: "Karim", age: 30 });
console.log("Updated:", updated);

// ═══════════════════════════════════════
// Required<T> — সব properties required
// ═══════════════════════════════════════

interface Config {
    host?: string;
    port?: number;
    ssl?: boolean;
}

let fullConfig: Required<Config> = {
    host: "localhost",
    port: 3000,
    ssl: true
};

// ═══════════════════════════════════════
// Readonly<T> — সব properties readonly
// ═══════════════════════════════════════

let readonlyUser: Readonly<User> = { ...fullUser };
// readonlyUser.name = "New"; // ❌ Error

// Readonly array
let readonlyNumbers: ReadonlyArray<number> = [1, 2, 3];
// readonlyNumbers.push(4); // ❌ Error
// readonlyNumbers[0] = 10; // ❌ Error

// ═══════════════════════════════════════
// Pick<T, K> — নির্দিষ্ট properties নির্বাচন
// ═══════════════════════════════════════

type UserPreview = Pick<User, "id" | "name" | "email">;

let preview: UserPreview = {
    id: 1,
    name: "Rahim",
    email: "rahim@test.com"
};
console.log("Preview:", preview);

// ═══════════════════════════════════════
// Omit<T, K> — নির্দিষ্ট properties বাদ দেওয়া
// ═══════════════════════════════════════

type UserWithoutAddress = Omit<User, "address">;

type PublicUser = Omit<User, "id" | "email">;

let publicUser: PublicUser = {
    name: "Rahim",
    age: 25,
    isActive: true,
    address: { city: "Dhaka", country: "Bangladesh" }
};

// ═══════════════════════════════════════
// Record<K, T> — Key-Value map তৈরি
// ═══════════════════════════════════════

type PageNames = "home" | "about" | "contact";

let pageInfo: Record<PageNames, { title: string; path: string }> = {
    home: { title: "Home", path: "/" },
    about: { title: "About Us", path: "/about" },
    contact: { title: "Contact", path: "/contact" }
};

let userRoles: Record<number, string> = {
    1: "Admin",
    2: "Editor",
    3: "Viewer"
};

// ═══════════════════════════════════════
// Exclude<T, U> — T থেকে U বাদ
// ═══════════════════════════════════════

type AllTypes = string | number | boolean | null;
type WithoutNull = Exclude<AllTypes, null>;
// WithoutNull = string | number | boolean

// ═══════════════════════════════════════
// Extract<T, U> — T এবং U এর common
// ═══════════════════════════════════════

type CommonTypes = Extract<AllTypes, string | boolean | undefined>;
// CommonTypes = string | boolean

// ═══════════════════════════════════════
// NonNullable<T> — null এবং undefined বাদ
// ═══════════════════════════════════════

type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
// DefinitelyString = string

// ═══════════════════════════════════════
// ReturnType<T> — Function এর return type
// ═══════════════════════════════════════

function createUserFn(name: string, age: number) {
    return { name, age, createdAt: new Date() };
}

type NewUser = ReturnType<typeof createUserFn>;
// NewUser = { name: string; age: number; createdAt: Date }

let newUser: NewUser = {
    name: "Rahim",
    age: 25,
    createdAt: new Date()
};

// ═══════════════════════════════════════
// Parameters<T> — Function এর parameters
// ═══════════════════════════════════════

type CreateUserParams = Parameters<typeof createUserFn>;
// CreateUserParams = [name: string, age: number]

let params: CreateUserParams = ["Karim", 30];

// ═══════════════════════════════════════
// Awaited<T> — Promise এর resolved type
// ═══════════════════════════════════════

type PromiseResult = Awaited<Promise<string>>;
// PromiseResult = string

async function fetchData(): Promise<{ data: string }> {
    return { data: "hello" };
}

type FetchResult = Awaited<ReturnType<typeof fetchData>>;
// FetchResult = { data: string }

// ═══════════════════════════════════════
// DeepPartial (Custom Utility)
// ═══════════════════════════════════════

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

let partialAddress: DeepPartial<User> = {
    name: "Rahim",
    address: {
        city: "Dhaka"
    }
};

console.log("Partial:", partialAddress);

export {};
