// ═══════════════════════════════════════════════════════════════
// 21_namespaces_modules.ts — Namespaces & Modules
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Namespaces (Internal Modules)
// ═══════════════════════════════════════

namespace Validation {
	export interface StringValidator {
		isValid(s: string): boolean;
	}

	const lettersRegexp = /^[A-Za-z]+$/;
	const numberRegexp = /^[0-9]+$/;

	export class LettersOnlyValidator implements StringValidator {
		isValid(s: string): boolean {
			return lettersRegexp.test(s);
		}
	}

	export class ZipCodeValidator implements StringValidator {
		isValid(s: string): boolean {
			return s.length === 5 && numberRegexp.test(s);
		}
	}
}

// Use namespace
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

console.log("12345 valid?", validators["ZIP code"].isValid("12345"));
console.log("Hello valid?", validators["Letters only"].isValid("Hello"));

// ═══════════════════════════════════════
// Nested Namespaces
// ═══════════════════════════════════════

namespace App {
	export namespace Models {
		export interface User {
			id: number;
			name: string;
		}
	}

	export namespace Services {
		export class UserService {
			getUser(id: number): App.Models.User {
				return { id, name: "User " + id };
			}
		}
	}
}

let userService = new App.Services.UserService();
console.log(userService.getUser(1));

// ═══════════════════════════════════════
// ES Modules (export/import)
// ═══════════════════════════════════════

// math.ts (hypothetical separate file)
/*
export const PI = 3.14159;

export function add(a: number, b: number): number {
    return a + b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

export default class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
}
*/

// main.ts (hypothetical separate file)
/*
import { PI, add, multiply } from "./math";
import Calculator from "./math";

console.log(PI);
console.log(add(2, 3));

let calc = new Calculator();
console.log(calc.add(5, 3));
*/

// ═══════════════════════════════════════
// Re-exports
// ═══════════════════════════════════════

// utils/index.ts
/*
export * from "./math";
export * from "./string";
export { default as Calculator } from "./calculator";
*/

// ═══════════════════════════════════════
// Module Augmentation
// ═══════════════════════════════════════

// Original module
/*
// user.ts
export interface User {
    name: string;
}
*/

// Augmenting module
/*
// user-augmentation.ts
import "./user";

declare module "./user" {
    interface User {
        age: number;
        email: string;
    }
}
*/

// ═══════════════════════════════════════
// Ambient Modules
// ═══════════════════════════════════════

// For third-party libraries without types
/*
declare module "some-library" {
    export function doSomething(): void;
    export const version: string;
}
*/

// ═══════════════════════════════════════
// Global Augmentation
// ═══════════════════════════════════════

declare global {
	interface Window {
		myCustomProperty: string;
	}
}

// Now you can use window.myCustomProperty
// window.myCustomProperty = "hello";

// ═══════════════════════════════════════
// Module Resolution Example
// ═══════════════════════════════════════

// tsconfig.json paths mapping example
/*
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@models/*": ["src/models/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
*/

// Usage with paths
/*
import { User } from "@models/user";
import { UserService } from "@services/userService";
import { formatDate } from "@utils/date";
*/

export { Validation };
