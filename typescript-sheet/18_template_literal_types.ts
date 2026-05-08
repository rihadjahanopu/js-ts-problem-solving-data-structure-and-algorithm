// ═══════════════════════════════════════════════════════════════
// 18_template_literal_types.ts — Template Literal Types
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Basic Template Literal Types
// ═══════════════════════════════════════

type Greeting = "hello" | "hi";
type Name = "Rahim" | "Karim";

type GreetingMessage = `${Greeting} ${Name}`;
// "hello Rahim" | "hello Karim" | "hi Rahim" | "hi Karim"

let msg: GreetingMessage = "hello Rahim";
// let msg2: GreetingMessage = "hey Rahim"; // ❌ Error

// ═══════════════════════════════════════
// CSS Property Types
// ═══════════════════════════════════════

type Color = "red" | "green" | "blue";
type Size = "sm" | "md" | "lg";

type BackgroundColor = `bg-${Color}`;
// "bg-red" | "bg-green" | "bg-blue"

type TextSize = `text-${Size}`;
// "text-sm" | "text-md" | "text-lg"

type UtilityClass = BackgroundColor | TextSize;

let className: UtilityClass = "bg-red";
// let className2: UtilityClass = "bg-yellow"; // ❌ Error

// ═══════════════════════════════════════
// Event Handler Types
// ═══════════════════════════════════════

type EventName = "click" | "hover" | "scroll" | "focus";

type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onHover" | "onScroll" | "onFocus"

let handler: EventHandler = "onClick";
// let handler2: EventHandler = "onclick"; // ❌ Error

// ═══════════════════════════════════════
// HTTP Method Types
// ═══════════════════════════════════════

type HttpMethod = "get" | "post" | "put" | "delete";
type Resource = "user" | "post" | "comment";

type Endpoint = `${Uppercase<HttpMethod>}_${Capitalize<Resource>}`;
// "GET_User" | "GET_Post" | ... | "DELETE_Comment"

let endpoint: Endpoint = "GET_User";

// ═══════════════════════════════════════
// Path Manipulation
// ═══════════════════════════════════════

type Route = "/" | "/about" | "/contact" | "/users/:id";

type AbsoluteRoute = `https://example.com${Route}`;
// "https://example.com/" | "https://example.com/about" | ...

// ═══════════════════════════════════════
// String Manipulation Types
// ═══════════════════════════════════════

type MyUppercase = Uppercase<"hello">; // "HELLO"
type MyLowercase = Lowercase<"HELLO">; // "hello"
type MyCapitalize = Capitalize<"hello">; // "Hello"
type MyUncapitalize = Uncapitalize<"Hello">; // "hello"

// ═══════════════════════════════════════
// Extract Route Parameters
// ═══════════════════════════════════════

type ExtractParam<T> = T extends `${string}:${infer Param}` ? Param : never;

type UserRoute = "/users/:id";
type UserParam = ExtractParam<UserRoute>; // "id"

// Multiple params
type ExtractParams<T> =
	T extends `${infer Start}:${infer Param}/${infer Rest}` ?
		Param | ExtractParams<`/${Rest}`>
	: T extends `${string}:${infer Param}` ? Param
	: never;

type PostRoute = "/users/:userId/posts/:postId/comments/:commentId";
type PostParams = ExtractParams<PostRoute>;
// "userId" | "postId" | "commentId"

// ═══════════════════════════════════════
// Object Key Transformation
// ═══════════════════════════════════════

interface User {
	name: string;
	email: string;
	age: number;
}

type GetterMethods<T> = {
	[K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type SetterMethods<T> = {
	[K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserGetters = GetterMethods<User>;
type UserSetters = SetterMethods<User>;

let userGetters: UserGetters = {
	getName: () => "Rahim",
	getEmail: () => "rahim@test.com",
	getAge: () => 25,
};

let userSetters: UserSetters = {
	setName: (value) => console.log("Set name:", value),
	setEmail: (value) => console.log("Set email:", value),
	setAge: (value) => console.log("Set age:", value),
};

// ═══════════════════════════════════════
// CSS-in-JS Type Safety
// ═══════════════════════════════════════

type Spacing = 0 | 1 | 2 | 3 | 4 | 5;
type Direction = "t" | "r" | "b" | "l" | "x" | "y";

type MarginClass = `m${Direction}-${Spacing}`;
// "mt-0" | "mt-1" | ... | "my-5"

type PaddingClass = `p${Direction}-${Spacing}`;
// "pt-0" | "pt-1" | ... | "py-5"

type SpacingClass = MarginClass | PaddingClass;

let spacing: SpacingClass = "mx-3";
// let spacing2: SpacingClass = "mz-3"; // ❌ Error

console.log("Template literal types defined");

export {};
