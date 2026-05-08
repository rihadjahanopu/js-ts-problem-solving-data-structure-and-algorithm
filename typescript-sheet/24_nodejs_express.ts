// ═══════════════════════════════════════════════════════════════
// 24_nodejs_express.ts — Node.js & Express with TypeScript
// ═══════════════════════════════════════════════════════════════

// Required packages:
// npm install express @types/express cors @types/cors dotenv
// npm install -D @types/node ts-node nodemon

import cors from "cors";
import dotenv from "dotenv";
import express, {
	Application,
	NextFunction,
	Request,
	RequestHandler,
	Response,
	Router,
} from "express";

dotenv.config();

// ═══════════════════════════════════════
// Type Definitions
// ═══════════════════════════════════════

interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	role: "admin" | "user" | "guest";
	createdAt: Date;
}

interface CreateUserRequest {
	name: string;
	email: string;
	age: number;
	role?: "admin" | "user" | "guest";
}

interface UpdateUserRequest {
	name?: string;
	email?: string;
	age?: number;
	role?: "admin" | "user" | "guest";
}

interface ApiResponse<T> {
	success: boolean;
	data: T | null;
	message: string;
	timestamp: string;
}

interface ApiError {
	success: false;
	data: null;
	message: string;
	errors?: string[];
	timestamp: string;
}

// ═══════════════════════════════════════
// Custom Request Types
// ═══════════════════════════════════════

interface AuthenticatedRequest extends Request {
	user?: User;
	token?: string;
}

interface PaginatedRequest extends Request {
	query: {
		page?: string;
		limit?: string;
		sort?: string;
		order?: "asc" | "desc";
	} & Request["query"];
}

// ═══════════════════════════════════════
// Mock Database
// ═══════════════════════════════════════

let users: User[] = [
	{
		id: 1,
		name: "Rahim",
		email: "rahim@test.com",
		age: 25,
		role: "admin",
		createdAt: new Date(),
	},
	{
		id: 2,
		name: "Karim",
		email: "karim@test.com",
		age: 30,
		role: "user",
		createdAt: new Date(),
	},
	{
		id: 3,
		name: "Jamal",
		email: "jamal@test.com",
		age: 22,
		role: "user",
		createdAt: new Date(),
	},
];

// ═══════════════════════════════════════
// Response Helper Functions
// ═══════════════════════════════════════

function successResponse<T>(
	res: Response,
	data: T,
	message: string = "Success",
	statusCode: number = 200
): Response {
	const response: ApiResponse<T> = {
		success: true,
		data,
		message,
		timestamp: new Date().toISOString(),
	};
	return res.status(statusCode).json(response);
}

function errorResponse(
	res: Response,
	message: string,
	statusCode: number = 400,
	errors?: string[]
): Response {
	const response: ApiError = {
		success: false,
		data: null,
		message,
		errors,
		timestamp: new Date().toISOString(),
	};
	return res.status(statusCode).json(response);
}

// ═══════════════════════════════════════
// Middleware
// ═══════════════════════════════════════

// Error handling middleware
type ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => void;

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	console.error("Error:", err.stack);
	return errorResponse(res, err.message || "Internal Server Error", 500);
};

// Authentication middleware
const authenticate: RequestHandler = (req: AuthenticatedRequest, res, next) => {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) {
		return errorResponse(res, "Authentication required", 401);
	}

	// Mock authentication
	const user = users.find((u) => u.id === 1);
	if (!user) {
		return errorResponse(res, "Invalid token", 401);
	}

	req.user = user;
	req.token = token;
	next();
};

// Authorization middleware
const authorize = (...roles: User["role"][]) => {
	return (
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction
	): void => {
		if (!req.user) {
			errorResponse(res, "Authentication required", 401);
			return;
		}

		if (!roles.includes(req.user.role)) {
			errorResponse(res, "Insufficient permissions", 403);
			return;
		}

		next();
	};
};

// Validation middleware
const validateUser = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const { name, email, age } = req.body as CreateUserRequest;
	const errors: string[] = [];

	if (!name || name.length < 2) {
		errors.push("Name must be at least 2 characters");
	}

	if (!email || !email.includes("@")) {
		errors.push("Valid email is required");
	}

	if (age === undefined || age < 0 || age > 150) {
		errors.push("Age must be between 0 and 150");
	}

	if (errors.length > 0) {
		errorResponse(res, "Validation failed", 400, errors);
		return;
	}

	next();
};

// Logging middleware
const requestLogger: RequestHandler = (req, _res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
	next();
};

// ═══════════════════════════════════════
// Route Handlers
// ═══════════════════════════════════════

// GET all users with pagination
const getUsers = (req: PaginatedRequest, res: Response): Response => {
	const page = parseInt(req.query.page || "1");
	const limit = parseInt(req.query.limit || "10");
	const sort = req.query.sort || "id";
	const order = req.query.order || "asc";

	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;

	let sortedUsers = [...users];
	sortedUsers.sort((a, b) => {
		const aVal = a[sort as keyof User];
		const bVal = b[sort as keyof User];
		if (order === "asc") {
			return aVal > bVal ? 1 : -1;
		}
		return aVal < bVal ? 1 : -1;
	});

	const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

	return successResponse(res, {
		users: paginatedUsers,
		pagination: {
			page,
			limit,
			total: users.length,
			totalPages: Math.ceil(users.length / limit),
		},
	});
};

// GET user by ID
const getUserById = (req: Request, res: Response): Response => {
	const id = parseInt(req.params.id);
	const user = users.find((u) => u.id === id);

	if (!user) {
		return errorResponse(res, "User not found", 404);
	}

	return successResponse(res, user);
};

// POST create user
const createUser = (req: Request, res: Response): Response => {
	const body = req.body as CreateUserRequest;

	const newUser: User = {
		id: users.length + 1,
		name: body.name,
		email: body.email,
		age: body.age,
		role: body.role || "user",
		createdAt: new Date(),
	};

	users.push(newUser);
	return successResponse(res, newUser, "User created", 201);
};

// PUT update user
const updateUser = (req: Request, res: Response): Response => {
	const id = parseInt(req.params.id);
	const body = req.body as UpdateUserRequest;
	const userIndex = users.findIndex((u) => u.id === id);

	if (userIndex === -1) {
		return errorResponse(res, "User not found", 404);
	}

	users[userIndex] = { ...users[userIndex], ...body };
	return successResponse(res, users[userIndex], "User updated");
};

// DELETE user
const deleteUser = (req: Request, res: Response): Response => {
	const id = parseInt(req.params.id);
	const userIndex = users.findIndex((u) => u.id === id);

	if (userIndex === -1) {
		return errorResponse(res, "User not found", 404);
	}

	const deletedUser = users.splice(userIndex, 1)[0];
	return successResponse(res, deletedUser, "User deleted");
};

// GET current user (authenticated)
const getCurrentUser = (req: AuthenticatedRequest, res: Response): Response => {
	return successResponse(res, req.user!);
};

// ═══════════════════════════════════════
// Router Setup
// ═══════════════════════════════════════

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", authenticate, getCurrentUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", validateUser, createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", authenticate, authorize("admin"), deleteUser);

// ═══════════════════════════════════════
// App Setup
// ═══════════════════════════════════════

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use("/api/users", userRouter);

// Health check
app.get("/health", (_req: Request, res: Response) => {
	return successResponse(res, { status: "OK", uptime: process.uptime() });
});

// 404 handler
app.use((_req: Request, res: Response) => {
	return errorResponse(res, "Route not found", 404);
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});

export { app, errorResponse, successResponse };
