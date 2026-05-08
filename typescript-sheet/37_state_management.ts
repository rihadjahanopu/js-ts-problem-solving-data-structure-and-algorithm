// ═══════════════════════════════════════════════════════════════
// 37_state_management.ts — Type-Safe State Management
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// 1. Redux-like Store with TypeScript
// ═══════════════════════════════════════

type Action<T extends string = string, P = any> = {
	type: T;
	payload?: P;
};

type Reducer<S, A extends Action> = (state: S, action: A) => S;

type Listener<S> = (state: S, prevState: S) => void;

class Store<S, A extends Action> {
	private state: S;
	private reducer: Reducer<S, A>;
	private listeners: Set<Listener<S>> = new Set();

	constructor(reducer: Reducer<S, A>, initialState: S) {
		this.reducer = reducer;
		this.state = initialState;
	}

	getState(): S {
		return this.state;
	}

	dispatch(action: A): void {
		const prevState = this.state;
		this.state = this.reducer(this.state, action);
		this.listeners.forEach((listener) => listener(this.state, prevState));
	}

	subscribe(listener: Listener<S>): () => void {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	select<T>(selector: (state: S) => T): T {
		return selector(this.state);
	}
}

// ═══════════════════════════════════════
// 2. Typed Actions
// ═══════════════════════════════════════

interface CounterState {
	count: number;
	history: number[];
}

type CounterAction =
	| { type: "INCREMENT"; payload: number }
	| { type: "DECREMENT"; payload: number }
	| { type: "RESET" }
	| { type: "SET"; payload: number };

const counterReducer: Reducer<CounterState, CounterAction> = (
	state,
	action
) => {
	switch (action.type) {
		case "INCREMENT":
			return {
				count: state.count + action.payload,
				history: [...state.history, state.count],
			};
		case "DECREMENT":
			return {
				count: state.count - action.payload,
				history: [...state.history, state.count],
			};
		case "RESET":
			return { count: 0, history: [...state.history, state.count] };
		case "SET":
			return {
				count: action.payload,
				history: [...state.history, state.count],
			};
		default:
			return state;
	}
};

// Action creators
const increment = (amount: number): CounterAction => ({
	type: "INCREMENT",
	payload: amount,
});

const decrement = (amount: number): CounterAction => ({
	type: "DECREMENT",
	payload: amount,
});

const reset = (): CounterAction => ({ type: "RESET" });
const set = (value: number): CounterAction => ({ type: "SET", payload: value });

// Usage
const counterStore = new Store(counterReducer, {
	count: 0,
	history: [],
});

counterStore.subscribe((state, prev) => {
	console.log(`Count: ${prev.count} → ${state.count}`);
});

counterStore.dispatch(increment(5));
counterStore.dispatch(increment(3));
counterStore.dispatch(decrement(2));
console.log("Final count:", counterStore.getState().count);

// ═══════════════════════════════════════
// 3. Zustand-like Store
// ═══════════════════════════════════════

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
type GetState<T> = () => T;

type StoreCreator<T> = (set: SetState<T>, get: GetState<T>) => T;

function createStore<T>(creator: StoreCreator<T>): {
	getState: GetState<T>;
	setState: SetState<T>;
	subscribe: (listener: (state: T) => void) => () => void;
} {
	let state: T;
	const listeners = new Set<(state: T) => void>();

	const getState: GetState<T> = () => state;

	const setState: SetState<T> = (partial) => {
		const nextState =
			typeof partial === "function" ?
				{ ...state, ...(partial as (state: T) => Partial<T>)(state) }
			:	{ ...state, ...partial };
		state = nextState;
		listeners.forEach((listener) => listener(state));
	};

	const subscribe = (listener: (state: T) => void): (() => void) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};

	state = creator(setState, getState);

	return { getState, setState, subscribe };
}

// Usage
interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

interface TodoStore {
	todos: Todo[];
	filter: "all" | "active" | "completed";
	addTodo: (text: string) => void;
	toggleTodo: (id: number) => void;
	removeTodo: (id: number) => void;
	setFilter: (filter: "all" | "active" | "completed") => void;
	getFilteredTodos: () => Todo[];
}

const useTodoStore = createStore<TodoStore>((set, get) => ({
	todos: [],
	filter: "all",

	addTodo: (text) => {
		set({
			todos: [
				...get().todos,
				{
					id: Date.now(),
					text,
					completed: false,
				},
			],
		});
	},

	toggleTodo: (id) => {
		set({
			todos: get().todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			),
		});
	},

	removeTodo: (id) => {
		set({
			todos: get().todos.filter((todo) => todo.id !== id),
		});
	},

	setFilter: (filter) => set({ filter }),

	getFilteredTodos: () => {
		const { todos, filter } = get();
		switch (filter) {
			case "active":
				return todos.filter((t) => !t.completed);
			case "completed":
				return todos.filter((t) => t.completed);
			default:
				return todos;
		}
	},
}));

// Usage
useTodoStore.subscribe((state) => {
	console.log("Todos:", state.todos.length);
});

useTodoStore.getState().addTodo("Learn TypeScript");
useTodoStore.getState().addTodo("Build a project");
useTodoStore.getState().toggleTodo(useTodoStore.getState().todos[0].id);

console.log("Active:", useTodoStore.getState().getFilteredTodos());

// ═══════════════════════════════════════
// 4. Finite State Machine
// ═══════════════════════════════════════

type StateMachineConfig<S extends string, E extends string> = {
	initial: S;
	states: {
		[K in S]: {
			on?: {
				[Event in E]?: S;
			};
			entry?: () => void;
			exit?: () => void;
		};
	};
};

class StateMachine<S extends string, E extends string> {
	private currentState: S;
	private config: StateMachineConfig<S, E>;

	constructor(config: StateMachineConfig<S, E>) {
		this.config = config;
		this.currentState = config.initial;
		this.executeEntry(config.initial);
	}

	getState(): S {
		return this.currentState;
	}

	can(event: E): boolean {
		const stateConfig = this.config.states[this.currentState];
		return event in (stateConfig.on || {});
	}

	transition(event: E): boolean {
		const stateConfig = this.config.states[this.currentState];
		const nextState = stateConfig.on?.[event];

		if (!nextState) {
			console.warn(`Cannot transition from ${this.currentState} via ${event}`);
			return false;
		}

		this.executeExit(this.currentState);
		this.currentState = nextState;
		this.executeEntry(nextState);
		return true;
	}

	private executeEntry(state: S): void {
		this.config.states[state].entry?.();
	}

	private executeExit(state: S): void {
		this.config.states[state].exit?.();
	}
}

// Usage: Traffic Light
type TrafficLightState = "red" | "yellow" | "green";
type TrafficLightEvent = "TIMER" | "EMERGENCY";

const trafficLight = new StateMachine<TrafficLightState, TrafficLightEvent>({
	initial: "red",
	states: {
		red: {
			on: { TIMER: "green" },
			entry: () => console.log("🔴 STOP"),
		},
		yellow: {
			on: { TIMER: "red" },
			entry: () => console.log("🟡 CAUTION"),
		},
		green: {
			on: { TIMER: "yellow" },
			entry: () => console.log("🟢 GO"),
		},
	},
});

trafficLight.transition("TIMER"); // green
trafficLight.transition("TIMER"); // yellow
trafficLight.transition("TIMER"); // red

// ═══════════════════════════════════════
// 5. Observable Pattern
// ═══════════════════════════════════════

type Observer<T> = (value: T) => void;
type Unsubscribe = () => void;

class Observable<T> {
	private observers: Observer<T>[] = [];
	private currentValue?: T;

	constructor(initialValue?: T) {
		if (initialValue !== undefined) {
			this.currentValue = initialValue;
		}
	}

	subscribe(observer: Observer<T>): Unsubscribe {
		this.observers.push(observer);
		if (this.currentValue !== undefined) {
			observer(this.currentValue);
		}
		return () => {
			this.observers = this.observers.filter((obs) => obs !== observer);
		};
	}

	next(value: T): void {
		this.currentValue = value;
		this.observers.forEach((observer) => observer(value));
	}

	getValue(): T | undefined {
		return this.currentValue;
	}

	map<U>(fn: (value: T) => U): Observable<U> {
		const mapped = new Observable<U>();
		this.subscribe((value) => mapped.next(fn(value)));
		return mapped;
	}

	filter(predicate: (value: T) => boolean): Observable<T> {
		const filtered = new Observable<T>();
		this.subscribe((value) => {
			if (predicate(value)) {
				filtered.next(value);
			}
		});
		return filtered;
	}
}

// Usage
const temperature = new Observable<number>(20);

const unsubscribe = temperature.subscribe((temp) => {
	console.log(`Temperature: ${temp}°C`);
});

temperature.next(25);
temperature.next(30);

// Mapped observable
const fahrenheit = temperature.map((c) => (c * 9) / 5 + 32);
fahrenheit.subscribe((f) => console.log(`Fahrenheit: ${f}°F`));

temperature.next(35);

// ═══════════════════════════════════════
// 6. Computed Values
// ═══════════════════════════════════════

class Computed<T> {
	private value: T;
	private dirty = true;
	private computeFn: () => T;
	private dependencies: Observable<any>[] = [];

	constructor(computeFn: () => T) {
		this.computeFn = computeFn;
		this.value = computeFn();
	}

	addDependency<U>(observable: Observable<U>): this {
		this.dependencies.push(observable);
		observable.subscribe(() => {
			this.dirty = true;
		});
		return this;
	}

	get(): T {
		if (this.dirty) {
			this.value = this.computeFn();
			this.dirty = false;
		}
		return this.value;
	}
}

// Usage
const price = new Observable<number>(100);
const quantity = new Observable<number>(2);

const total = new Computed(() => {
	const p = price.getValue() || 0;
	const q = quantity.getValue() || 0;
	return p * q;
})
	.addDependency(price)
	.addDependency(quantity);

console.log("Total:", total.get()); // 200
price.next(150);
console.log("Total:", total.get()); // 300

export { Computed, Observable, StateMachine, Store, createStore };
