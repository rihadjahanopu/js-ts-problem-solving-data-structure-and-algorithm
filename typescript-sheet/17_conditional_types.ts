// ═══════════════════════════════════════════════════════════════
// 17_conditional_types.ts — Conditional Types (কন্ডিশনাল টাইপ)
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Basic Conditional Type
// ═══════════════════════════════════════

type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
type C = IsString<"hello">; // true

// ═══════════════════════════════════════
// Conditional Type with Union (Distributive)
// ═══════════════════════════════════════

type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>;
// string[] | number[] (distributive)

// Non-distributive (wrap in tuple)
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type MixedArray = ToArrayNonDist<string | number>;
// (string | number)[]

// ═══════════════════════════════════════
// infer Keyword — Type Extraction
// ═══════════════════════════════════════

// Extract return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet() {
	return "hello";
}

function getUser() {
	return { id: 1, name: "Rahim" };
}

type GreetReturn = ReturnType<typeof greet>; // string
type UserReturn = ReturnType<typeof getUser>; // { id: number; name: string }

// Extract parameter types
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function logUser(name: string, age: number, isActive: boolean) {
	console.log(name, age, isActive);
}

type LogUserParams = Parameters<typeof logUser>;
// [name: string, age: number, isActive: boolean]

// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;

type NumArray = number[];
type NumElement = ElementType<NumArray>; // number

// Extract Promise resolved type
type Awaited<T> = T extends Promise<infer R> ? R : T;

type PromiseString = Promise<string>;
type ResolvedString = Awaited<PromiseString>; // string

// ═══════════════════════════════════════
// infer with Nested Structures
// ═══════════════════════════════════════

// Extract first element of tuple
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type FirstElement = First<[string, number, boolean]>; // string

// Extract last element of tuple
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;
type LastElement = Last<[string, number, boolean]>; // boolean

// Extract all but first
type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;
type RestElements = Tail<[string, number, boolean]>; // [number, boolean]

// ═══════════════════════════════════════
// Flatten Array (Recursive)
// ═══════════════════════════════════════

type Flatten<T> = T extends (infer E)[] ? Flatten<E> : T;

type DeepArray = number[][][][];
type Flattened = Flatten<DeepArray>; // number

// ═══════════════════════════════════════
// String Manipulation with infer
// ═══════════════════════════════════════

// Extract path parameters
type ExtractParams<T> =
	T extends `${string}:${infer Param}/${infer Rest}` ?
		Param | ExtractParams<`/${Rest}`>
	: T extends `${string}:${infer Param}` ? Param
	: never;

type RouteParams = ExtractParams<"/users/:id/posts/:postId">;
// "id" | "postId"

// ═══════════════════════════════════════
// Practical: API Response Type
// ═══════════════════════════════════════

type ApiResponse<T> = {
	data: T;
	status: number;
	message: string;
};

// Extract data type from response
type ExtractData<T> = T extends ApiResponse<infer D> ? D : never;

type UserResponse = ApiResponse<{ id: number; name: string }>;
type UserDataType = ExtractData<UserResponse>;
// { id: number; name: string }

// ═══════════════════════════════════════
// Filter Types
// ═══════════════════════════════════════

type RemoveNever<T> = {
	[K in keyof T]: T[K] extends never ? never : K;
}[keyof T];

interface Mixed {
	a: string;
	b: never;
	c: number;
	d: never;
}

type ValidKeys = RemoveNever<Mixed>; // "a" | "c"

console.log("Conditional types defined successfully");

export {};
