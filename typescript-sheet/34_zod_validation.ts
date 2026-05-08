// ═══════════════════════════════════════════════════════════════
// 34_zod_validation.ts — Schema Validation with Zod
// npm install zod
// ═══════════════════════════════════════════════════════════════

import { z } from "zod";

// ═══════════════════════════════════════
// Basic Schemas
// ═══════════════════════════════════════

const UserSchema = z.object({
	id: z.number().int().positive(),
	name: z.string().min(2).max(100),
	email: z.string().email(),
	age: z.number().int().min(0).max(150).optional(),
	isActive: z.boolean().default(true),
	role: z.enum(["admin", "user", "guest"]).default("user"),
	tags: z.array(z.string()).default([]),
	metadata: z.record(z.string(), z.any()).optional(),
});

// Infer TypeScript type from schema
type User = z.infer<typeof UserSchema>;

// Validate data
const validUser = UserSchema.parse({
	id: 1,
	name: "Rahim",
	email: "rahim@example.com",
	age: 25,
	role: "admin",
	tags: ["typescript", "nodejs"],
});

// Safe parse (doesn't throw)
const result = UserSchema.safeParse({
	id: 2,
	name: "K", // Too short - will fail
	email: "invalid-email", // Invalid - will fail
});

if (!result.success) {
	console.log("Validation errors:", result.error.issues);
}

// ═══════════════════════════════════════
// Advanced Schemas
// ═══════════════════════════════════════

// Coercion
coerceNumber: z.coerce.number();
coerceDate: z.coerce.date();
coerceBoolean: z.coerce.boolean();

// Transformations
const TrimmedString = z.string().transform((val) => val.trim());
const LowercaseEmail = z
	.string()
	.email()
	.transform((val) => val.toLowerCase());

// Custom validation
const PasswordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.regex(/[A-Z]/, "Must contain uppercase letter")
	.regex(/[a-z]/, "Must contain lowercase letter")
	.regex(/[0-9]/, "Must contain number")
	.regex(/[^A-Za-z0-9]/, "Must contain special character");

// Refine (custom validation logic)
const ConfirmPasswordSchema = z
	.object({
		password: PasswordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

// ═══════════════════════════════════════
// Nested Objects
// ═══════════════════════════════════════

const AddressSchema = z.object({
	street: z.string().min(1),
	city: z.string().min(1),
	country: z.string().min(1),
	zipCode: z.string().regex(/^\d{5}$/),
});

const CustomerSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
	address: AddressSchema,
	shippingAddresses: z.array(AddressSchema).min(1),
});

type Customer = z.infer<typeof CustomerSchema>;

// ═══════════════════════════════════════
// Union & Intersection
// ═══════════════════════════════════════

const CatSchema = z.object({
	type: z.literal("cat"),
	meow: z.function().args().returns(z.string()),
});

const DogSchema = z.object({
	type: z.literal("dog"),
	bark: z.function().args().returns(z.string()),
});

const AnimalSchema = z.discriminatedUnion("type", [CatSchema, DogSchema]);

type Animal = z.infer<typeof AnimalSchema>;

// ═══════════════════════════════════════
// API Request/Response Validation
// ═══════════════════════════════════════

// Request schemas
const CreateUserRequestSchema = z.object({
	name: z.string().min(2).max(100),
	email: z.string().email(),
	password: PasswordSchema,
	age: z.number().int().min(13).optional(),
});

const UpdateUserRequestSchema = CreateUserRequestSchema.partial();

// Response schemas
const ApiErrorSchema = z.object({
	success: z.literal(false),
	error: z.string(),
	code: z.string().optional(),
	details: z.record(z.string(), z.array(z.string())).optional(),
});

const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.object({
		success: z.literal(true),
		data: dataSchema,
		message: z.string().optional(),
	});

// Usage
const UserResponseSchema = ApiSuccessSchema(UserSchema);
const UsersResponseSchema = ApiSuccessSchema(z.array(UserSchema));

type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
type UserResponse = z.infer<typeof UserResponseSchema>;

// ═══════════════════════════════════════
// Form Validation Helper
// ═══════════════════════════════════════

class FormValidator<T extends z.ZodTypeAny> {
	constructor(private schema: T) {}

	validate(
		data: unknown
	):
		| { success: true; data: z.infer<T> }
		| { success: false; errors: z.ZodIssue[] } {
		const result = this.schema.safeParse(data);
		if (result.success) {
			return { success: true, data: result.data };
		}
		return { success: false, errors: result.error.issues };
	}

	validateField<K extends keyof z.infer<T>>(
		field: K,
		value: unknown
	): string | null {
		const fieldSchema = this.schema.shape?.[field as string];
		if (!fieldSchema) return null;

		const result = fieldSchema.safeParse(value);
		if (!result.success) {
			return result.error.issues[0]?.message || "Invalid value";
		}
		return null;
	}
}

// Usage
const userValidator = new FormValidator(CreateUserRequestSchema);

const formResult = userValidator.validate({
	name: "Rahim",
	email: "rahim@example.com",
	password: "SecurePass123!",
	age: 25,
});

if (formResult.success) {
	console.log("Valid user:", formResult.data);
} else {
	formResult.errors.forEach((err) => {
		console.log(`${err.path.join(".")}: ${err.message}`);
	});
}

// ═══════════════════════════════════════
// Environment Variables Validation
// ═══════════════════════════════════════

const EnvSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	PORT: z
		.string()
		.transform(Number)
		.pipe(z.number().min(1).max(65535))
		.default("3000"),
	DATABASE_URL: z.string().url(),
	JWT_SECRET: z.string().min(32),
	API_KEY: z.string().min(1),
	ENABLE_LOGGING: z
		.enum(["true", "false"])
		.transform((val) => val === "true")
		.default("true"),
});

// Validate at startup
try {
	const env = EnvSchema.parse(process.env);
	console.log("Environment validated:", env.NODE_ENV);
} catch (error) {
	console.error("Invalid environment variables:", error);
	process.exit(1);
}

// ═══════════════════════════════════════
// Middleware for Express
// ═══════════════════════════════════════

/*
import { Request, Response, NextFunction } from "express";

function validateBody<T extends z.ZodTypeAny>(schema: T) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                error: "Validation failed",
                details: result.error.issues
            });
            return;
        }
        req.body = result.data;
        next();
    };
}

// Usage in route
app.post("/users", validateBody(CreateUserRequestSchema), (req, res) => {
    // req.body is now typed as CreateUserRequest
    const user = req.body;
    // ...
});
*/

// ═══════════════════════════════════════
// Partial & Deep Partial
// ═══════════════════════════════════════

function createPartialSchema<T extends z.ZodObject<any>>(
	schema: T
): z.ZodObject<{
	[K in keyof T["shape"]]: z.ZodOptional<T["shape"][K]>;
}> {
	const shape = schema.shape;
	const partialShape: any = {};

	for (const key of Object.keys(shape)) {
		partialShape[key] = shape[key].optional();
	}

	return z.object(partialShape);
}

const PartialUserSchema = createPartialSchema(UserSchema);
type PartialUser = z.infer<typeof PartialUserSchema>;

export {
	CreateUserRequestSchema,
	CustomerSchema,
	EnvSchema,
	FormValidator,
	PasswordSchema,
	UserSchema,
};
