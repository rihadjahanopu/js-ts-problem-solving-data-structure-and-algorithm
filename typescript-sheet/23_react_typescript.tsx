// ═══════════════════════════════════════════════════════════════
// 23_react_typescript.tsx — React with TypeScript
// File extension: .tsx
// ═══════════════════════════════════════════════════════════════

import React, {
	ComponentPropsWithoutRef,
	FC,
	ReactNode,
	createContext,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

// ═══════════════════════════════════════
// Basic Functional Component
// ═══════════════════════════════════════

interface GreetingProps {
	name: string;
	age?: number;
}

// FC (FunctionComponent) — older approach
const GreetingFC: FC<GreetingProps> = ({ name, age = 18 }) => {
	return (
		<div>
			<h1>Hello, {name}!</h1>
			{age && <p>Age: {age}</p>}
		</div>
	);
};

// Recommended approach — explicit return type
function Greeting({ name, age = 18 }: GreetingProps): JSX.Element {
	return (
		<div>
			<h1>Hello, {name}!</h1>
			{age && <p>Age: {age}</p>}
		</div>
	);
}

// ═══════════════════════════════════════
// Children Prop
// ═══════════════════════════════════════

interface CardProps {
	title: string;
	children: ReactNode; // string | number | JSX.Element | etc.
	footer?: ReactNode;
}

function Card({ title, children, footer }: CardProps): JSX.Element {
	return (
		<div className="card">
			<h2>{title}</h2>
			<div className="content">{children}</div>
			{footer && <div className="footer">{footer}</div>}
		</div>
	);
}

// Usage
/*
<Card title="Welcome" footer={<button>Close</button>}>
    <p>This is the card content</p>
</Card>
*/

// ═══════════════════════════════════════
// Event Types
// ═══════════════════════════════════════

function EventExample(): JSX.Element {
	// Mouse events
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		console.log("Clicked:", event.currentTarget.textContent);
	};

	// Change events
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		console.log("Value:", event.target.value);
	};

	// Form events
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		console.log("Form submitted");
	};

	// Keyboard events
	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	): void => {
		if (event.key === "Enter") {
			console.log("Enter pressed");
		}
	};

	// Focus events
	const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
		console.log("Focused:", event.target.name);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="username"
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
			/>
			<button
				type="submit"
				onClick={handleClick}>
				Submit
			</button>
		</form>
	);
}

// ═══════════════════════════════════════
// useState with TypeScript
// ═══════════════════════════════════════

interface User {
	id: number;
	name: string;
	email: string;
}

function UserProfile(): JSX.Element {
	// Type inference
	const [count, setCount] = useState(0);

	// Explicit type
	const [user, setUser] = useState<User | null>(null);

	// Complex state
	const [users, setUsers] = useState<User[]>([]);

	// Loading state
	const [loading, setLoading] = useState<boolean>(false);

	// Form state
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		age: 0,
	});

	const updateField = (
		field: keyof typeof formData,
		value: string | number
	): void => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return <div>User Profile</div>;
}

// ═══════════════════════════════════════
// useEffect with TypeScript
// ═══════════════════════════════════════

function DataFetcher(): JSX.Element {
	const [data, setData] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async (): Promise<void> => {
			try {
				const response = await fetch("/api/data");
				const result: string[] = await response.json();
				if (isMounted) {
					setData(result);
				}
			} catch (err) {
				if (isMounted) {
					setError(err instanceof Error ? err.message : "Unknown error");
				}
			}
		};

		fetchData();

		// Cleanup
		return () => {
			isMounted = false;
		};
	}, []);

	return <div>{data.length} items loaded</div>;
}

// ═══════════════════════════════════════
// useRef with TypeScript
// ═══════════════════════════════════════

function RefExample(): JSX.Element {
	// DOM element ref
	const inputRef = useRef<HTMLInputElement>(null);

	// Mutable value ref
	const countRef = useRef<number>(0);

	// Previous value ref
	const prevValueRef = useRef<string>("");

	const focusInput = (): void => {
		inputRef.current?.focus();
	};

	const increment = (): void => {
		countRef.current += 1;
		console.log("Count:", countRef.current);
	};

	return (
		<div>
			<input
				ref={inputRef}
				type="text"
			/>
			<button onClick={focusInput}>Focus</button>
			<button onClick={increment}>Increment</button>
		</div>
	);
}

// ═══════════════════════════════════════
// forwardRef
// ═══════════════════════════════════════

interface InputProps {
	label: string;
	error?: string;
}

const FancyInput = forwardRef<HTMLInputElement, InputProps>(
	({ label, error }, ref): JSX.Element => {
		return (
			<div>
				<label>{label}</label>
				<input
					ref={ref}
					type="text"
				/>
				{error && <span className="error">{error}</span>}
			</div>
		);
	}
);

FancyInput.displayName = "FancyInput";

// Usage
/*
const inputRef = useRef<HTMLInputElement>(null);
<FancyInput ref={inputRef} label="Username" error="Required" />
*/

// ═══════════════════════════════════════
// Generic Component
// ═══════════════════════════════════════

interface ListProps<T> {
	items: T[];
	renderItem: (item: T, index: number) => ReactNode;
	keyExtractor: (item: T, index: number) => string | number;
}

function List<T>({
	items,
	renderItem,
	keyExtractor,
}: ListProps<T>): JSX.Element {
	return (
		<ul>
			{items.map((item, index) => (
				<li key={keyExtractor(item, index)}>{renderItem(item, index)}</li>
			))}
		</ul>
	);
}

// Usage
/*
<List
    items={users}
    renderItem={(user) => <span>{user.name}</span>}
    keyExtractor={(user) => user.id}
/>
*/

// ═══════════════════════════════════════
// Context with TypeScript
// ═══════════════════════════════════════

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const login = async (email: string, password: string): Promise<void> => {
		setIsLoading(true);
		// API call
		setIsLoading(false);
	};

	const logout = (): void => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

// Custom hook for context
function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

// ═══════════════════════════════════════
// useCallback & useMemo
// ═══════════════════════════════════════

function OptimizationExample(): JSX.Element {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("");

	// Memoized value
	const expensiveCalculation = useMemo(() => {
		console.log("Calculating...");
		return count * 2;
	}, [count]);

	// Memoized callback
	const handleClick = useCallback((): void => {
		setCount((prev) => prev + 1);
	}, []);

	return (
		<div>
			<p>Result: {expensiveCalculation}</p>
			<button onClick={handleClick}>Increment</button>
		</div>
	);
}

// ═══════════════════════════════════════
// Polymorphic Component (as prop)
// ═══════════════════════════════════════

type PolymorphicProps<T extends React.ElementType> = {
	as?: T;
	children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

function Polymorphic<T extends React.ElementType = "div">({
	as,
	children,
	...props
}: PolymorphicProps<T>): JSX.Element {
	const Component = as || "div";
	return <Component {...props}>{children}</Component>;
}

// Usage
/*
<Polymorphic as="button" onClick={() => console.log("clicked")}>
    Click me
</Polymorphic>
<Polymorphic as="a" href="https://example.com">
    Link
</Polymorphic>
*/

// ═══════════════════════════════════════
// Common Type Patterns
// ═══════════════════════════════════════

// Props with HTML attributes
type ButtonProps = {
	variant?: "primary" | "secondary" | "danger";
	size?: "sm" | "md" | "lg";
} & ComponentPropsWithoutRef<"button">;

function Button({
	variant = "primary",
	size = "md",
	children,
	...props
}: ButtonProps): JSX.Element {
	return (
		<button
			className={`btn btn-${variant} btn-${size}`}
			{...props}>
			{children}
		</button>
	);
}

// Props with ref
type InputProps2 = ComponentPropsWithoutRef<"input"> & {
	label: string;
	helperText?: string;
};

// Discriminated union for component variants
type AlertProps =
	| { variant: "success"; message: string }
	| { variant: "error"; message: string; onRetry?: () => void }
	| { variant: "warning"; message: string; onDismiss?: () => void };

function Alert(props: AlertProps): JSX.Element {
	switch (props.variant) {
		case "success":
			return <div className="alert-success">{props.message}</div>;
		case "error":
			return (
				<div className="alert-error">
					{props.message}
					{props.onRetry && <button onClick={props.onRetry}>Retry</button>}
				</div>
			);
		case "warning":
			return (
				<div className="alert-warning">
					{props.message}
					{props.onDismiss && (
						<button onClick={props.onDismiss}>Dismiss</button>
					)}
				</div>
			);
	}
}

export {
	Alert,
	AuthProvider,
	Button,
	Card,
	EventExample,
	Greeting,
	List,
	UserProfile,
	useAuth,
};
