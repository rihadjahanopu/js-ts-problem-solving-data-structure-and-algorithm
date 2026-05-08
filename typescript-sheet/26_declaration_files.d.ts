// ═══════════════════════════════════════════════════════════════
// 26_declaration_files.d.ts — Type Declaration Files
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// What are .d.ts files?
// ═══════════════════════════════════════
// .d.ts files contain ONLY type declarations, no implementation.
// They tell TypeScript about types for:
// 1. JavaScript libraries without built-in types
// 2. Your own JavaScript code
// 3. Global variables
// 4. Module augmentations

// ═══════════════════════════════════════
// Declaring a JavaScript Module
// ═══════════════════════════════════════

// For a JS library: some-library.js
/*
// some-library.js
export function greet(name) {
    return `Hello, ${name}!`;
}

export const version = "1.0.0";

export default class Person {
    constructor(name) {
        this.name = name;
    }
}
*/

// Create: some-library.d.ts
declare module "some-library" {
    export function greet(name: string): string;
    export const version: string;

    export default class Person {
        constructor(name: string);
        name: string;
        greet(): string;
    }
}

// ═══════════════════════════════════════
// Declaring Global Variables
// ═══════════════════════════════════════

// For variables added by scripts
declare const API_BASE_URL: string;
declare const APP_VERSION: string;
declare const DEBUG_MODE: boolean;

// Usage:
// console.log(API_BASE_URL);

// ═══════════════════════════════════════
// Extending Window/Process
// ═══════════════════════════════════════

declare global {
    interface Window {
        myCustomLib: {
            init(config: { apiKey: string }): void;
            track(event: string, data?: Record<string, any>): void;
        };
        dataLayer: any[];
    }

    interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        PORT: string;
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}

// ═══════════════════════════════════════
// Declaring Functions
// ═══════════════════════════════════════

// Global function
declare function logMessage(message: string, level?: "info" | "warn" | "error"): void;

// Overloaded function
declare function formatDate(date: Date): string;
declare function formatDate(date: Date, format: string): string;
declare function formatDate(date: Date, format?: string): string;

// ═══════════════════════════════════════
// Declaring Classes
// ═══════════════════════════════════════

declare class EventEmitter {
    constructor();
    on(event: string, listener: (...args: any[]) => void): this;
    off(event: string, listener: (...args: any[]) => void): this;
    emit(event: string, ...args: any[]): boolean;
    once(event: string, listener: (...args: any[]) => void): this;
}

// ═══════════════════════════════════════
// Declaring Interfaces
// ═══════════════════════════════════════

declare interface JQuery {
    html(): string;
    html(content: string): JQuery;
    addClass(className: string): JQuery;
    removeClass(className: string): JQuery;
    on(event: string, handler: (event: any) => void): JQuery;
}

declare interface JQueryStatic {
    (selector: string): JQuery;
    ajax(options: { url: string; method?: string }): Promise<any>;
}

declare const $: JQueryStatic;

// ═══════════════════════════════════════
// Ambient Modules (No import needed)
// ═══════════════════════════════════════

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export { ReactComponent };
    export default src;
}

declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

// ═══════════════════════════════════════
// Module Augmentation
// ═══════════════════════════════════════

// Extending existing module
declare module "express" {
    export interface Request {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
        requestId?: string;
    }
}

// ═══════════════════════════════════════
// Third-Party Library Types
// ═══════════════════════════════════════

// When @types package doesn't exist
declare module "legacy-utils" {
    export function parseCSV(data: string): Array<Record<string, string>>;
    export function formatNumber(num: number, locale?: string): string;
    export const CONSTANTS: {
        PI: number;
        E: number;
        MAX_SIZE: number;
    };
}

// ═══════════════════════════════════════
// Namespace Declaration
// ═══════════════════════════════════════

declare namespace MyApp {
    interface Config {
        apiUrl: string;
        timeout: number;
        retries: number;
    }

    interface User {
        id: number;
        username: string;
        profile: UserProfile;
    }

    interface UserProfile {
        displayName: string;
        avatar?: string;
        bio?: string;
    }

    function initialize(config: Config): void;
    function getCurrentUser(): User | null;
}

// Usage:
// MyApp.initialize({ apiUrl: "...", timeout: 5000, retries: 3 });

// ═══════════════════════════════════════
// Type-Only Declaration
// ═══════════════════════════════════════

// For types that exist at compile time but not runtime
declare type UUID = string;
declare type Timestamp = number;
declare type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
declare interface JSONObject {
    [key: string]: JSONValue;
}
declare interface JSONArray extends Array<JSONValue> {}

// ═══════════════════════════════════════
// Exporting from .d.ts
// ═══════════════════════════════════════

// types/index.d.ts
export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// ═══════════════════════════════════════
// Triple-Slash Directives
// ═══════════════════════════════════════

/// <reference types="node" />
/// <reference path="./custom-types.d.ts" />
/// <reference lib="es2020" />

// ═══════════════════════════════════════
// Practical: Creating Types for Untyped Library
// ═══════════════════════════════════════

// my-library.d.ts
declare module "my-library" {
    export interface ClientOptions {
        baseURL: string;
        headers?: Record<string, string>;
        timeout?: number;
    }

    export interface RequestConfig {
        url: string;
        method?: "GET" | "POST" | "PUT" | "DELETE";
        data?: any;
        params?: Record<string, string | number>;
    }

    export interface Response<T = any> {
        data: T;
        status: number;
        headers: Record<string, string>;
    }

    export class Client {
        constructor(options: ClientOptions);
        request<T>(config: RequestConfig): Promise<Response<T>>;
        get<T>(url: string, params?: Record<string, string | number>): Promise<Response<T>>;
        post<T>(url: string, data?: any): Promise<Response<T>>;
    }

    export function createClient(options: ClientOptions): Client;
    export const version: string;
}
