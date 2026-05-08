// ═══════════════════════════════════════════════════════════════
// 32_testing_jest.ts — Testing with TypeScript & Jest
// npm install --save-dev jest @types/jest ts-jest
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Jest Configuration (jest.config.js)
// ═══════════════════════════════════════
/*
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
*/

// ═══════════════════════════════════════
// Code to Test
// ═══════════════════════════════════════

export interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
}

export class BasicCalculator implements Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        return a / b;
    }
}

export interface Validator<T> {
    validate(value: T): boolean;
    getErrors(): string[];
}

export class StringValidator implements Validator<string> {
    private errors: string[] = [];
    private minLength?: number;
    private maxLength?: number;
    private pattern?: RegExp;

    min(length: number): this {
        this.minLength = length;
        return this;
    }

    max(length: number): this {
        this.maxLength = length;
        return this;
    }

    regex(pattern: RegExp): this {
        this.pattern = pattern;
        return this;
    }

    validate(value: string): boolean {
        this.errors = [];

        if (this.minLength !== undefined && value.length < this.minLength) {
            this.errors.push(`Must be at least ${this.minLength} characters`);
        }

        if (this.maxLength !== undefined && value.length > this.maxLength) {
            this.errors.push(`Must be at most ${this.maxLength} characters`);
        }

        if (this.pattern !== undefined && !this.pattern.test(value)) {
            this.errors.push("Does not match required pattern");
        }

        return this.errors.length === 0;
    }

    getErrors(): string[] {
        return [...this.errors];
    }
}

export interface Repository<T> {
    findById(id: string): Promise<T | null>;
    save(item: T): Promise<T>;
    delete(id: string): Promise<boolean>;
}

export class UserService {
    constructor(private repository: Repository<{ id: string; name: string; email: string }>) {}

    async getUser(id: string): Promise<{ id: string; name: string; email: string } | null> {
        return this.repository.findById(id);
    }

    async createUser(name: string, email: string): Promise<{ id: string; name: string; email: string }> {
        if (!name || name.length < 2) {
            throw new Error("Name must be at least 2 characters");
        }
        if (!email || !email.includes("@")) {
            throw new Error("Invalid email");
        }

        const user = { id: `user-${Date.now()}`, name, email };
        return this.repository.save(user);
    }
}

// ═══════════════════════════════════════
// Test Examples (would be in .test.ts files)
// ═══════════════════════════════════════

/*
// calculator.test.ts
import { BasicCalculator } from './32_testing_jest';

describe('BasicCalculator', () => {
  let calculator: BasicCalculator;

  beforeEach(() => {
    calculator = new BasicCalculator();
  });

  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it('should handle zero', () => {
      expect(calculator.add(0, 5)).toBe(5);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should throw on division by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
    });
  });
});

// validator.test.ts
import { StringValidator } from './32_testing_jest';

describe('StringValidator', () => {
  let validator: StringValidator;

  beforeEach(() => {
    validator = new StringValidator();
  });

  it('should validate minimum length', () => {
    validator.min(3);
    expect(validator.validate('ab')).toBe(false);
    expect(validator.validate('abc')).toBe(true);
  });

  it('should validate maximum length', () => {
    validator.max(5);
    expect(validator.validate('abcdef')).toBe(false);
    expect(validator.validate('abc')).toBe(true);
  });

  it('should validate regex pattern', () => {
    validator.regex(/^[a-z]+$/);
    expect(validator.validate('ABC')).toBe(false);
    expect(validator.validate('abc')).toBe(true);
  });

  it('should chain validators', () => {
    validator.min(3).max(10).regex(/^[a-z]+$/);
    expect(validator.validate('abc')).toBe(true);
    expect(validator.validate('ab')).toBe(false);
    expect(validator.validate('ABCDEF')).toBe(false);
  });
});

// userService.test.ts
import { UserService } from './32_testing_jest';

// Mock repository
const mockRepository = {
  findById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn()
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UserService(mockRepository);
  });

  describe('getUser', () => {
    it('should return user when found', async () => {
      const user = { id: '1', name: 'Rahim', email: 'rahim@test.com' };
      mockRepository.findById.mockResolvedValue(user);

      const result = await service.getUser('1');

      expect(result).toEqual(user);
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should return null when not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = await service.getUser('999');

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create valid user', async () => {
      mockRepository.save.mockImplementation(user => Promise.resolve(user));

      const result = await service.createUser('Rahim', 'rahim@test.com');

      expect(result.name).toBe('Rahim');
      expect(result.email).toBe('rahim@test.com');
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw on invalid name', async () => {
      await expect(service.createUser('A', 'test@test.com'))
        .rejects.toThrow('Name must be at least 2 characters');
    });

    it('should throw on invalid email', async () => {
      await expect(service.createUser('Rahim', 'invalid'))
        .rejects.toThrow('Invalid email');
    });
  });
});
*/

// ═══════════════════════════════════════
// Type-Safe Mock Helpers
// ═══════════════════════════════════════

export function createMock<T>(overrides: Partial<T> = {}): T {
    return overrides as T;
}

export type Mocked<T> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R
        ? jest.Mock<R, A>
        : T[K];
};

// ═══════════════════════════════════════
// Test Utilities
// ═══════════════════════════════════════

export async function expectThrowsAsync(
    fn: () => Promise<any>,
    expectedMessage?: string
): Promise<void> {
    try {
        await fn();
        throw new Error("Expected function to throw");
    } catch (error) {
        if (expectedMessage && error instanceof Error) {
            expect(error.message).toContain(expectedMessage);
        }
    }
}

export function createSpy<T extends (...args: any[]) => any>(): jest.Mock<ReturnType<T>, Parameters<T>> {
    return jest.fn();
}

// ═══════════════════════════════════════
// Snapshot Testing Types
// ═══════════════════════════════════════

export interface SnapshotData {
    id: string;
    createdAt: string;
    items: Array<{
        name: string;
        price: number;
    }>;
}

/*
// snapshot.test.ts
import { SnapshotData } from './32_testing_jest';

describe('Snapshot tests', () => {
  it('should match snapshot', () => {
    const data: SnapshotData = {
      id: '123',
      createdAt: new Date().toISOString(),
      items: [
        { name: 'Item 1', price: 10 },
        { name: 'Item 2', price: 20 }
      ]
    };

    expect(data).toMatchSnapshot();
  });
});
*/

export { BasicCalculator, StringValidator, UserService }
