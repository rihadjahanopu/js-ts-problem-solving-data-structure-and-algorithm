// ═══════════════════════════════════════════════════════════════
// 29_error_handling.ts — Error Handling in TypeScript
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Custom Error Classes
// ═══════════════════════════════════════

class AppError extends Error {
	constructor(
		message: string,
		public code: string,
		public statusCode: number = 500,
		public details?: Record<string, any>
	) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}

	toJSON(): object {
		return {
			name: this.name,
			message: this.message,
			code: this.code,
			statusCode: this.statusCode,
			details: this.details,
			stack: this.stack,
		};
	}
}

class ValidationError extends AppError {
	constructor(message: string, details?: Record<string, string[]>) {
		super(message, "VALIDATION_ERROR", 400, details);
	}
}

class NotFoundError extends AppError {
	constructor(resource: string, id: string | number) {
		super(`${resource} with id '${id}' not found`, "NOT_FOUND", 404);
	}
}

class AuthenticationError extends AppError {
	constructor(message: string = "Authentication required") {
		super(message, "UNAUTHORIZED", 401);
	}
}

class AuthorizationError extends AppError {
	constructor(message: string = "Insufficient permissions") {
		super(message, "FORBIDDEN", 403);
	}
}

class ConflictError extends AppError {
	constructor(message: string) {
		super(message, "CONFLICT", 409);
	}
}

// ═══════════════════════════════════════
// Result Type (Railway-Oriented Programming)
// ═══════════════════════════════════════

type Result<T, E = Error> =
	| { success: true; data: T; error: null }
	| { success: false; data: null; error: E };

function success<T>(data: T): Result<T, never> {
	return { success: true, data, error: null };
}

function failure<E extends Error>(error: E): Result<never, E> {
	return { success: false, data: null, error };
}

// ═══════════════════════════════════════
// Safe Wrapper Function
// ═══════════════════════════════════════

function tryCatch<T>(fn: () => T): Result<T, Error> {
	try {
		return success(fn());
	} catch (error) {
		return failure(error instanceof Error ? error : new Error(String(error)));
	}
}

async function tryCatchAsync<T>(
	fn: () => Promise<T>
): Promise<Result<T, Error>> {
	try {
		const data = await fn();
		return success(data);
	} catch (error) {
		return failure(error instanceof Error ? error : new Error(String(error)));
	}
}

// ═══════════════════════════════════════
// Usage Examples
// ═══════════════════════════════════════

interface User {
	id: number;
	name: string;
	email: string;
	age: number;
}

function validateUser(data: unknown): Result<User, ValidationError> {
	if (typeof data !== "object" || data === null) {
		return failure(new ValidationError("Invalid user data"));
	}

	const user = data as Record<string, unknown>;
	const errors: Record<string, string[]> = {};

	if (typeof user.name !== "string" || user.name.length < 2) {
		errors.name = ["Name must be at least 2 characters"];
	}

	if (typeof user.email !== "string" || !user.email.includes("@")) {
		errors.email = ["Valid email is required"];
	}

	if (typeof user.age !== "number" || user.age < 0 || user.age > 150) {
		errors.age = ["Age must be between 0 and 150"];
	}

	if (Object.keys(errors).length > 0) {
		return failure(new ValidationError("Validation failed", errors));
	}

	return success(user as User);
}

// ═══════════════════════════════════════
// Error Boundary Pattern
// ═══════════════════════════════════════

interface ErrorHandler {
	canHandle(error: Error): boolean;
	handle(error: Error): void;
}

class ValidationErrorHandler implements ErrorHandler {
	canHandle(error: Error): boolean {
		return error instanceof ValidationError;
	}

	handle(error: ValidationError): void {
		console.error("Validation Error:", error.message);
		console.error("Details:", error.details);
	}
}

class NotFoundErrorHandler implements ErrorHandler {
	canHandle(error: Error): boolean {
		return error instanceof NotFoundError;
	}

	handle(error: NotFoundError): void {
		console.error("Not Found:", error.message);
	}
}

class DefaultErrorHandler implements ErrorHandler {
	canHandle(_error: Error): boolean {
		return true;
	}

	handle(error: Error): void {
		console.error("Unexpected Error:", error.message);
	}
}

class ErrorBoundary {
	private handlers: ErrorHandler[] = [];

	register(handler: ErrorHandler): this {
		this.handlers.push(handler);
		return this;
	}

	handle(error: Error): void {
		const handler = this.handlers.find((h) => h.canHandle(error));
		if (handler) {
			handler.handle(error);
		} else {
			throw error;
		}
	}
}

// Setup
const errorBoundary = new ErrorBoundary()
	.register(new ValidationErrorHandler())
	.register(new NotFoundErrorHandler())
	.register(new DefaultErrorHandler());

// ═══════════════════════════════════════
// Safe API Call Pattern
// ═══════════════════════════════════════

interface ApiClient {
	get<T>(url: string): Promise<T>;
	post<T>(url: string, data: unknown): Promise<T>;
	put<T>(url: string, data: unknown): Promise<T>;
	delete<T>(url: string): Promise<T>;
}

class SafeApiClient {
	constructor(private client: ApiClient) {}

	async get<T>(url: string): Promise<Result<T, AppError>> {
		try {
			const data = await this.client.get<T>(url);
			return success(data);
		} catch (error) {
			return failure(this.normalizeError(error));
		}
	}

	async post<T>(url: string, data: unknown): Promise<Result<T, AppError>> {
		try {
			const result = await this.client.post<T>(url, data);
			return success(result);
		} catch (error) {
			return failure(this.normalizeError(error));
		}
	}

	private normalizeError(error: unknown): AppError {
		if (error instanceof AppError) {
			return error;
		}

		if (error instanceof Error) {
			return new AppError(error.message, "UNKNOWN_ERROR", 500);
		}

		return new AppError("An unknown error occurred", "UNKNOWN_ERROR", 500);
	}
}

// ═══════════════════════════════════════
// Assertion Functions
// ═══════════════════════════════════════

function assertDefined<T>(
	value: T | undefined | null,
	message: string
): asserts value is T {
	if (value === undefined || value === null) {
		throw new NotFoundError("Value", message);
	}
}

function assertString(
	value: unknown,
	fieldName: string
): asserts value is string {
	if (typeof value !== "string") {
		throw new ValidationError(`${fieldName} must be a string`);
	}
}

function assertNumber(
	value: unknown,
	fieldName: string
): asserts value is number {
	if (typeof value !== "number" || isNaN(value)) {
		throw new ValidationError(`${fieldName} must be a valid number`);
	}
}

function assertArray<T>(
	value: unknown,
	itemCheck: (item: unknown) => item is T,
	fieldName: string
): asserts value is T[] {
	if (!Array.isArray(value) || !value.every(itemCheck)) {
		throw new ValidationError(`${fieldName} must be a valid array`);
	}
}

// ═══════════════════════════════════════
// Usage with Assertions
// ═══════════════════════════════════════

function processUserData(data: unknown): User {
	assertDefined(data, "User data");
	assertString((data as any).name, "name");
	assertString((data as any).email, "email");
	assertNumber((data as any).age, "age");

	return data as User;
}

// ═══════════════════════════════════════
// Retry with Exponential Backoff
// ═══════════════════════════════════════

async function retryWithBackoff<T>(
	operation: () => Promise<T>,
	options: {
		maxRetries?: number;
		baseDelay?: number;
		maxDelay?: number;
		retryableErrors?: string[];
	} = {}
): Promise<T> {
	const {
		maxRetries = 3,
		baseDelay = 1000,
		maxDelay = 30000,
		retryableErrors = ["ETIMEDOUT", "ECONNRESET", "ENOTFOUND"],
	} = options;

	let lastError: Error;

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		try {
			return await operation();
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error));

			if (attempt === maxRetries) {
				break;
			}

			const isRetryable = retryableErrors.some((code) =>
				lastError.message.includes(code)
			);

			if (!isRetryable) {
				throw lastError;
			}

			const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);

			console.log(`Retry ${attempt + 1}/${maxRetries} after ${delay}ms`);
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	throw lastError!;
}

// ═══════════════════════════════════════
// Circuit Breaker Pattern
// ═══════════════════════════════════════

type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

class CircuitBreaker {
	private state: CircuitState = "CLOSED";
	private failureCount = 0;
	private lastFailureTime: number | null = null;

	constructor(
		private operation: <T>() => Promise<T>,
		private options: {
			failureThreshold?: number;
			resetTimeout?: number;
		} = {}
	) {}

	async execute<T>(): Promise<T> {
		const { failureThreshold = 5, resetTimeout = 30000 } = this.options;

		if (this.state === "OPEN") {
			if (
				this.lastFailureTime &&
				Date.now() - this.lastFailureTime > resetTimeout
			) {
				this.state = "HALF_OPEN";
			} else {
				throw new AppError("Circuit breaker is OPEN", "CIRCUIT_OPEN", 503);
			}
		}

		try {
			const result = await this.operation<T>();
			this.onSuccess();
			return result;
		} catch (error) {
			this.onFailure();
			throw error;
		}
	}

	private onSuccess(): void {
		this.failureCount = 0;
		this.state = "CLOSED";
	}

	private onFailure(): void {
		this.failureCount++;
		this.lastFailureTime = Date.now();

		const { failureThreshold = 5 } = this.options;
		if (this.failureCount >= failureThreshold) {
			this.state = "OPEN";
		}
	}
}

// ═══════════════════════════════════════
// Run Examples
// ═══════════════════════════════════════

function runExamples(): void {
	console.log("=== Error Handling Examples ===\n");

	// 1. Validation
	const result1 = validateUser({ name: "R", email: "invalid", age: 200 });
	if (!result1.success) {
		console.log("Validation failed:", result1.error.message);
		console.log("Details:", result1.error.details);
	}

	const result2 = validateUser({
		name: "Rahim",
		email: "rahim@test.com",
		age: 25,
	});
	if (result2.success) {
		console.log("Valid user:", result2.data);
	}

	// 2. Error Boundary
	try {
		throw new ValidationError("Invalid input");
	} catch (error) {
		if (error instanceof Error) {
			errorBoundary.handle(error);
		}
	}

	// 3. Custom errors
	try {
		throw new NotFoundError("User", 999);
	} catch (error) {
		if (error instanceof AppError) {
			console.log("\nAppError:", error.toJSON());
		}
	}
}

runExamples();

export {
	AppError,
	AuthenticationError,
	NotFoundError,
	ValidationError,
	failure,
	success,
	tryCatch,
	tryCatchAsync,
};
export type { Result };
