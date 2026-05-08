// ═══════════════════════════════════════════════════════════════
// 19_decorators.ts — Decorators (ডেকোরেটর)
// tsconfig.json এ "experimentalDecorators": true দিতে হবে
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Class Decorator
// ═══════════════════════════════════════

function Logger(constructor: Function) {
	console.log("Logging...");
	console.log(constructor);
}

@Logger
class Person {
	name = "Rahim";
	constructor() {
		console.log("Creating person...");
	}
}

let person = new Person();

// ═══════════════════════════════════════
// Decorator Factory
// ═══════════════════════════════════════

function LoggerFactory(logMessage: string) {
	return function (constructor: Function) {
		console.log(logMessage);
		console.log(constructor);
	};
}

@LoggerFactory("Creating User...")
class User {
	name = "Karim";
	constructor() {
		console.log("User created");
	}
}

// ═══════════════════════════════════════
// Property Decorator
// ═══════════════════════════════════════

function MinLength(min: number) {
	return function (target: any, propertyKey: string) {
		let value: string;

		const getter = function () {
			return value;
		};

		const setter = function (newVal: string) {
			if (newVal.length < min) {
				throw new Error(`${propertyKey} must be at least ${min} characters`);
			}
			value = newVal;
		};

		Object.defineProperty(target, propertyKey, {
			get: getter,
			set: setter,
			enumerable: true,
			configurable: true,
		});
	};
}

class Product {
	@MinLength(3)
	name: string = "";

	constructor(name: string) {
		this.name = name;
	}
}

let product = new Product("Laptop");
console.log("Product:", product.name);
// let product2 = new Product("TV"); // ❌ Error at runtime

// ═══════════════════════════════════════
// Method Decorator
// ═══════════════════════════════════════

function LogMethod(
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;

	descriptor.value = function (...args: any[]) {
		console.log(`Calling ${propertyKey} with args:`, args);
		const result = originalMethod.apply(this, args);
		console.log(`${propertyKey} returned:`, result);
		return result;
	};

	return descriptor;
}

class Calculator {
	@LogMethod
	add(a: number, b: number): number {
		return a + b;
	}

	@LogMethod
	multiply(a: number, b: number): number {
		return a * b;
	}
}

let calc = new Calculator();
calc.add(5, 3);
calc.multiply(4, 7);

// ═══════════════════════════════════════
// Parameter Decorator
// ═══════════════════════════════════════

function RequiredParam(
	target: any,
	propertyKey: string,
	parameterIndex: number
) {
	console.log(`Parameter ${parameterIndex} of ${propertyKey} is required`);
}

class Service {
	greet(@RequiredParam name: string, @RequiredParam age: number) {
		console.log(`Hello ${name}, you are ${age}`);
	}
}

// ═══════════════════════════════════════
// Autobind Decorator (this binding)
// ═══════════════════════════════════════

function Autobind(
	_target: any,
	_methodName: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	const adjustedDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjustedDescriptor;
}

class Printer {
	message = "Hello from Printer";

	@Autobind
	showMessage() {
		console.log(this.message);
	}
}

let printer = new Printer();
let btn = { click: printer.showMessage };
btn.click(); // "Hello from Printer" (this preserved)

// ═══════════════════════════════════════
// Validation Decorator (Advanced)
// ═══════════════════════════════════════

interface ValidatorConfig {
	[property: string]: string[];
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
	registeredValidators[propName] = registeredValidators[propName] || [];
	registeredValidators[propName].push("required");
}

function PositiveNumber(target: any, propName: string) {
	registeredValidators[propName] = registeredValidators[propName] || [];
	registeredValidators[propName].push("positive");
}

function validate(obj: any): boolean {
	const objValidatorConfig = registeredValidators;
	let isValid = true;
	for (const prop in objValidatorConfig) {
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case "required":
					isValid = isValid && !!obj[prop];
					break;
				case "positive":
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}
	return isValid;
}

class Course {
	@Required
	title: string;

	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

let course = new Course("TypeScript", 100);
console.log("Course valid:", validate(course));

export {};
