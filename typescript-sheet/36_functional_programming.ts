// ═══════════════════════════════════════════════════════════════
// 36_functional_programming.ts — Functional Programming in TS
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// 1. Immutable Types
// ═══════════════════════════════════════

type Immutable<T> = {
	readonly [K in keyof T]: T[K] extends object ? Immutable<T[K]> : T[K];
};

interface User {
	id: number;
	name: string;
	address: {
		city: string;
		country: string;
	};
}

type ImmutableUser = Immutable<User>;

const immutableUser: ImmutableUser = {
	id: 1,
	name: "Rahim",
	address: {
		city: "Dhaka",
		country: "Bangladesh",
	},
};

// immutableUser.name = "Karim";           // ❌ Error
// immutableUser.address.city = "Sylhet";  // ❌ Error

// ═══════════════════════════════════════
// 2. Deep Readonly Helper
// ═══════════════════════════════════════

type DeepReadonly<T> = {
	readonly [K in keyof T]: T[K] extends (infer U)[] ?
		ReadonlyArray<DeepReadonly<U>>
	: T[K] extends object ? DeepReadonly<T[K]>
	: T[K];
};

// ═══════════════════════════════════════
// 3. Lens Pattern
// ═══════════════════════════════════════

interface Lens<S, A> {
	get: (s: S) => A;
	set: (a: A) => (s: S) => S;
}

function createLens<S, A>(
	getter: (s: S) => A,
	setter: (a: A) => (s: S) => S
): Lens<S, A> {
	return { get: getter, set: setter };
}

function composeLens<S, A, B>(
	outer: Lens<S, A>,
	inner: Lens<A, B>
): Lens<S, B> {
	return {
		get: (s) => inner.get(outer.get(s)),
		set: (b) => (s) => outer.set(inner.set(b)(outer.get(s)))(s),
	};
}

// Usage
interface Person {
	name: string;
	address: {
		city: string;
	};
}

const personNameLens = createLens<Person, string>(
	(p) => p.name,
	(name) => (p) => ({ ...p, name })
);

const personCityLens = composeLens(
	createLens<Person, { city: string }>(
		(p) => p.address,
		(address) => (p) => ({ ...p, address })
	),
	createLens<{ city: string }, string>(
		(a) => a.city,
		(city) => (a) => ({ ...a, city })
	)
);

const person: Person = { name: "Rahim", address: { city: "Dhaka" } };

console.log("Name:", personNameLens.get(person));
const updatedPerson = personCityLens.set("Chittagong")(person);
console.log("Updated:", updatedPerson);

// ═══════════════════════════════════════
// 4. Pipe & Compose
// ═══════════════════════════════════════

type UnaryFn<A, B> = (a: A) => B;

function pipe<A>(a: A): A;
function pipe<A, B>(a: A, f1: UnaryFn<A, B>): B;
function pipe<A, B, C>(a: A, f1: UnaryFn<A, B>, f2: UnaryFn<B, C>): C;
function pipe<A, B, C, D>(
	a: A,
	f1: UnaryFn<A, B>,
	f2: UnaryFn<B, C>,
	f3: UnaryFn<C, D>
): D;
function pipe<A, B, C, D, E>(
	a: A,
	f1: UnaryFn<A, B>,
	f2: UnaryFn<B, C>,
	f3: UnaryFn<C, D>,
	f4: UnaryFn<D, E>
): E;
function pipe(value: any, ...fns: UnaryFn<any, any>[]): any {
	return fns.reduce((acc, fn) => fn(acc), value);
}

function compose<A, B, C>(f: UnaryFn<B, C>, g: UnaryFn<A, B>): UnaryFn<A, C> {
	return (a) => f(g(a));
}

// Usage
const double = (x: number): number => x * 2;
const addOne = (x: number): number => x + 1;
const toString = (x: number): string => x.toString();

const result = pipe(5, addOne, double, toString);
console.log("Pipe result:", result); // "12"

const composed = compose(toString, compose(double, addOne));
console.log("Compose result:", composed(5)); // "12"

// ═══════════════════════════════════════
// 5. Currying
// ═══════════════════════════════════════

function curry<T extends any[], R>(fn: (...args: T) => R): Curried<T, R> {
	return function curried(...args: any[]): any {
		if (args.length >= fn.length) {
			return fn(...(args as T));
		}
		return (...nextArgs: any[]) => curried(...args, ...nextArgs);
	} as Curried<T, R>;
}

type Curried<T extends any[], R> =
	T extends [infer A, ...infer Rest] ?
		Rest extends [] ?
			(a: A) => R
		:	(a: A) => Curried<Rest, R>
	:	() => R;

// Usage
const add = curry((a: number, b: number, c: number): number => a + b + c);
const add5 = add(5);
const add5And3 = add5(3);
console.log("Curried:", add5And3(2)); // 10

// ═══════════════════════════════════════
// 6. Maybe/Option Type
// ═══════════════════════════════════════

interface Some<T> {
	readonly _tag: "Some";
	readonly value: T;
}

interface None {
	readonly _tag: "None";
}

type Option<T> = Some<T> | None;

const some = <T>(value: T): Some<T> => ({ _tag: "Some", value });
const none: None = { _tag: "None" };

function isSome<T>(option: Option<T>): option is Some<T> {
	return option._tag === "Some";
}

function isNone<T>(option: Option<T>): option is None {
	return option._tag === "None";
}

function mapOption<T, U>(option: Option<T>, fn: (value: T) => U): Option<U> {
	return isSome(option) ? some(fn(option.value)) : none;
}

function flatMapOption<T, U>(
	option: Option<T>,
	fn: (value: T) => Option<U>
): Option<U> {
	return isSome(option) ? fn(option.value) : none;
}

function getOrElse<T>(option: Option<T>, defaultValue: T): T {
	return isSome(option) ? option.value : defaultValue;
}

function fromNullable<T>(value: T | null | undefined): Option<T> {
	return value != null ? some(value) : none;
}

// Usage
function findUserById(id: number): Option<{ name: string }> {
	const users = [{ id: 1, name: "Rahim" }];
	const user = users.find((u) => u.id === id);
	return fromNullable(user);
}

const userOption = findUserById(1);
const nameOption = mapOption(userOption, (u) => u.name.toUpperCase());
const name = getOrElse(nameOption, "UNKNOWN");
console.log("User name:", name);

// ═══════════════════════════════════════
// 7. Either Type
// ═══════════════════════════════════════

interface Left<E> {
	readonly _tag: "Left";
	readonly error: E;
}

interface Right<A> {
	readonly _tag: "Right";
	readonly value: A;
}

type Either<E, A> = Left<E> | Right<A>;

const left = <E>(error: E): Left<E> => ({ _tag: "Left", error });
const right = <A>(value: A): Right<A> => ({ _tag: "Right", value });

function isRight<E, A>(either: Either<E, A>): either is Right<A> {
	return either._tag === "Right";
}

function isLeft<E, A>(either: Either<E, A>): either is Left<E> {
	return either._tag === "Left";
}

function mapEither<E, A, B>(
	either: Either<E, A>,
	fn: (a: A) => B
): Either<E, B> {
	return isRight(either) ? right(fn(either.value)) : either;
}

function flatMapEither<E, A, B>(
	either: Either<E, A>,
	fn: (a: A) => Either<E, B>
): Either<E, B> {
	return isRight(either) ? fn(either.value) : either;
}

function getOrElseEither<E, A>(either: Either<E, A>, defaultValue: A): A {
	return isRight(either) ? either.value : defaultValue;
}

// Usage
function divide(a: number, b: number): Either<string, number> {
	return b === 0 ? left("Division by zero") : right(a / b);
}

function sqrt(n: number): Either<string, number> {
	return n < 0 ?
			left("Cannot square root negative number")
		:	right(Math.sqrt(n));
}

const result2 = flatMapEither(divide(10, 2), (x) => sqrt(x));
console.log("Either result:", isRight(result2) ? result2.value : result2.error);

// ═══════════════════════════════════════
// 8. Functor, Applicative, Monad (Type Classes)
// ═══════════════════════════════════════

interface Functor<F> {
	map<A, B>(fa: F, f: (a: A) => B): F;
}

interface Monad<M> extends Functor<M> {
	of<A>(a: A): M;
	flatMap<A, B>(ma: M, f: (a: A) => M): M;
}

// Array Monad
const ArrayMonad: Monad<any[]> = {
	of: <A>(a: A): A[] => [a],
	map: <A, B>(fa: A[], f: (a: A) => B): B[] => fa.map(f),
	flatMap: <A, B>(ma: A[], f: (a: A) => B[]): B[] => ma.flatMap(f),
};

// Usage
const numbers = [1, 2, 3];
const doubled = ArrayMonad.map(numbers, (x) => x * 2);
const nested = ArrayMonad.flatMap(numbers, (x) => [x, x * 2]);

console.log("Doubled:", doubled);
console.log("Nested:", nested);

// ═══════════════════════════════════════
// 9. Memoization
// ═══════════════════════════════════════

function memoize<T extends (...args: any[]) => any>(fn: T): T {
	const cache = new Map<string, ReturnType<T>>();

	return function (...args: Parameters<T>): ReturnType<T> {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key)!;
		}
		const result = fn(...args);
		cache.set(key, result);
		return result;
	} as T;
}

const fibonacci = memoize((n: number): number => {
	if (n <= 1) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log("Fib(40):", fibonacci(40));

// ═══════════════════════════════════════
// 10. Partial Application
// ═══════════════════════════════════════

function partial<T extends any[], R>(
	fn: (...args: T) => R,
	...presetArgs: Partial<T>
): (...args: any[]) => R {
	return (...laterArgs: any[]) => fn(...presetArgs, ...laterArgs);
}

function greet(greeting: string, name: string): string {
	return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, "Hello");
console.log(sayHello("Rahim")); // "Hello, Rahim!"

export { curry, left, memoize, none, pipe, right, some };
