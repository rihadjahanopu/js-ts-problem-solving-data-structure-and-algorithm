// ═══════════════════════════════════════════════════════════════
// 39_cheat_sheet.ts — TypeScript Complete Cheat Sheet
// Quick reference for all common patterns
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// VARIABLES & TYPES
// ═══════════════════════════════════════

let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let nul: null = null;
let undef: undefined = undefined;
let sym: symbol = Symbol("id");
let big: bigint = 100n;

// Arrays
let arr1: number[] = [1, 2, 3];
let arr2: Array<string> = ["a", "b"];
let arr3: readonly number[] = [1, 2, 3]; // immutable

// Tuple
let tuple: [string, number] = ["age", 25];
let optionalTuple: [string, number?] = ["name"];

// Enum
enum Color { Red, Green, Blue }
enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }
const enum Permission { Read = 1, Write = 2 } // inlined

// Any & Unknown
let anyVal: any = "anything"; // Avoid!
let unknownVal: unknown = "safe";
if (typeof unknownVal === "string") unknownVal.toUpperCase(); // Narrow first

// Never & Void
function throwError(msg: string): never { throw new Error(msg); }
function log(msg: string): void { console.log(msg); }

// ═══════════════════════════════════════
// TYPE ALIASES
// ═══════════════════════════════════════

type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

// Union & Intersection
type AorB = string | number;
type AandB = { a: string } & { b: number };

// ═══════════════════════════════════════
// INTERFACES
// ═══════════════════════════════════════

interface Person {
    name: string;
    age: number;
    email?: string;        // Optional
    readonly id: number;   // Readonly
}

interface Employee extends Person {
    salary: number;
}

interface Counter {
    count: number;
    increment(): void;     // Method
}

// Interface merging
declare interface Window {
    myApp: any;
}

// ═══════════════════════════════════════
// FUNCTIONS
// ═══════════════════════════════════════

// Basic
function add(a: number, b: number): number { return a + b; }
const multiply = (a: number, b: number): number => a * b;

// Optional & Default
function greet(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}`;
}
function createUser(name: string, age: number = 18) { }

// Rest
function sum(...nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0);
}

// Overloads
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number { return x; }

// ═══════════════════════════════════════
// GENERICS
// ═══════════════════════════════════════

function identity<T>(value: T): T { return value; }
function pair<T, U>(a: T, b: U): [T, U] { return [a, b]; }

// Constraints
function logLength<T extends { length: number }>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// Generic Interface
interface Container<T> {
    value: T;
    getValue(): T;
}

// Generic Class
class Stack<T> {
    private items: T[] = [];
    push(item: T): void { this.items.push(item); }
    pop(): T | undefined { return this.items.pop(); }
}

// Generic with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// ═══════════════════════════════════════
// UTILITY TYPES
// ═══════════════════════════════════════

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type PartialUser = Partial<User>;           // All optional
type RequiredUser = Required<User>;         // All required
type ReadonlyUser = Readonly<User>;         // All readonly
type UserPreview = Pick<User, "id" | "name">; // Select keys
type UserWithoutId = Omit<User, "id">;      // Remove keys
type UserRecord = Record<string, User>;     // Key-value map
type UserKeys = keyof User;                 // "id" | "name" | "email" | "age"
type UserValues = User[keyof User];         // number | string

// Conditional
type IsString<T> = T extends string ? true : false;
type ExtractString = Extract<string | number, string>; // string
type ExcludeNumber = Exclude<string | number, number>; // string
type NonNullableType = NonNullable<string | null>;     // string

// Return & Parameters
type Fn = () => { id: number };
type FnReturn = ReturnType<Fn>;     // { id: number }
type FnParams = Parameters<(a: string, b: number) => void>; // [string, number]

// ═══════════════════════════════════════
// TYPE GUARDS
// ═══════════════════════════════════════

// typeof
function isString(value: unknown): value is string {
    return typeof value === "string";
}

// instanceof
function isDate(value: unknown): value is Date {
    return value instanceof Date;
}

// in operator
function hasName(value: object): value is { name: string } {
    return "name" in value;
}

// Discriminated union
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius ** 2;
        case "square": return shape.side ** 2;
        default: const _exhaustive: never = shape; return _exhaustive;
    }
}

// ═══════════════════════════════════════
// CLASSES
// ═══════════════════════════════════════

class Animal {
    // Access modifiers
    public name: string;
    private _age: number;
    protected species: string;
    readonly id: string;

    constructor(name: string, age: number) {
        this.name = name;
        this._age = age;
        this.species = "unknown";
        this.id = Math.random().toString();
    }

    // Getter/Setter
    get age(): number { return this._age; }
    set age(value: number) { this._age = value; }

    // Method
    move(): void { console.log("Moving"); }

    // Static
    static isAnimal(obj: unknown): obj is Animal {
        return obj instanceof Animal;
    }
}

// Abstract
abstract class Shape2 {
    abstract getArea(): number;
    describe(): string { return `Area: ${this.getArea()}`; }
}

// Interface implementation
interface Drawable {
    draw(): void;
}

class Circle implements Drawable {
    draw(): void { console.log("Drawing circle"); }
}

// ═══════════════════════════════════════
// MAPPED TYPES
// ═══════════════════════════════════════

type Readonly2<T> = { readonly [K in keyof T]: T[K] };
type Optional2<T> = { [K in keyof T]?: T[K] };
type Nullable2<T> = { [K in keyof T]: T[K] | null };

// Key remapping
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// ═══════════════════════════════════════
// TEMPLATE LITERAL TYPES
// ═══════════════════════════════════════

type EventName = "click" | "hover";
type EventHandler = `on${Capitalize<EventName>}`; // "onClick" | "onHover"

type HttpMethod = "get" | "post";
type Endpoint = `/${HttpMethod}`; // "/get" | "/post"

// ═══════════════════════════════════════
// DECORATORS
// ═══════════════════════════════════════

function Logger(constructor: Function) {
    console.log("Creating:", constructor.name);
}

function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    return {
        configurable: true,
        get() { return method.bind(this); }
    };
}

@Logger
class Example {
    @Autobind
    handleClick() {
        console.log(this);
    }
}

// ═══════════════════════════════════════
// ASYNC
// ═══════════════════════════════════════

async function fetchData(): Promise<string> {
    return "data";
}

async function main(): Promise<void> {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// Promise.all
const [a, b] = await Promise.all([
    Promise.resolve(1),
    Promise.resolve("two")
]);

// ═══════════════════════════════════════
// MODULES
// ═══════════════════════════════════════

// Export
export const PI = 3.14;
export function calc() { }
export default class Main { }

// Import
// import { PI, calc } from "./math";
// import Main from "./main";
// import * as Math from "./math";

// Re-export
// export * from "./math";
// export { PI as MathPI } from "./math";

// ═══════════════════════════════════════
// ASSERTION FUNCTIONS
// ═══════════════════════════════════════

function assertDefined<T>(value: T | undefined | null): asserts value is T {
    if (value == null) throw new Error("Value is null/undefined");
}

function assertString(value: unknown): asserts value is string {
    if (typeof value !== "string") throw new TypeError("Expected string");
}

// ═══════════════════════════════════════
// BRANDED TYPES
// ═══════════════════════════════════════

type Brand<K, T> = K & { __brand: T };
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function createUserId(id: string): UserId {
    return id as UserId;
}

// ═══════════════════════════════════════
// COMMON PATTERNS
// ═══════════════════════════════════════

// Builder
class QueryBuilder<T> {
    private conditions: string[] = [];
    where<K extends keyof T>(field: K, value: T[K]): this {
        this.conditions.push(`${String(field)} = ${value}`);
        return this;
    }
    build(): string { return `SELECT * WHERE ${this.conditions.join(" AND ")}`; }
}

// Repository
interface Repository<T extends { id: string | number }> {
    findById(id: T["id"]): Promise<T | null>;
    save(entity: T): Promise<T>;
}

// Result Type
type Result<T, E = Error> =
    | { ok: true; value: T }
    | { ok: false; error: E };

// Event Emitter
type EventMap = { [event: string]: any };
class TypedEmitter<E extends EventMap> {
    private listeners: { [K in keyof E]?: Array<(payload: E[K]) => void> } = {};
    on<K extends keyof E>(event: K, listener: (payload: E[K]) => void): void {
        (this.listeners[event] ??= []).push(listener);
    }
    emit<K extends keyof E>(event: K, payload: E[K]): void {
        this.listeners[event]?.forEach(l => l(payload));
    }
}

// ═══════════════════════════════════════
// REACT TYPES (Quick Reference)
// ═══════════════════════════════════════

/*
import { FC, ReactNode, useState, useEffect, useRef, forwardRef } from "react";

// Props
interface Props {
    title: string;
    children: ReactNode;
    onClick?: () => void;
}

// Component
const MyComponent: FC<Props> = ({ title, children }) => <div>{title}{children}</div>;

// forwardRef
const Input = forwardRef<HTMLInputElement, { label: string }>(({ label }, ref) => (
    <label>{label}<input ref={ref} /></label>
));

// Generic Component
function List<T>({ items, render }: { items: T[]; render: (item: T) => ReactNode }) {
    return <ul>{items.map(render)}</ul>;
}

// useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// useEffect
useEffect(() => { /* effect */ }, [dependency]);

// useRef
const inputRef = useRef<HTMLInputElement>(null);
*/

// ═══════════════════════════════════════
// EXPRESS TYPES (Quick Reference)
// ═══════════════════════════════════════

/*
import { Request, Response, NextFunction, Router } from "express";

interface CustomRequest extends Request {
    user?: { id: number; name: string };
}

type Handler = (req: Request, res: Response, next: NextFunction) => void;

const router = Router();
router.get("/", (req: Request, res: Response) => {
    res.json({ success: true });
});
*/

export { };
