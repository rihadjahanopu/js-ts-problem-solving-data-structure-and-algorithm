/** @type {import('jest').Config} */
module.exports = {
	// Use ts-jest for TypeScript files
	preset: "ts-jest",

	// Test environment
	testEnvironment: "node",

	// Root directories
	roots: ["<rootDir>/src"],

	// Test file patterns
	testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],

	// Transform configuration
	transform: {
		"^.+\.ts$": "ts-jest",
	},

	// Module file extensions
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

	// Module name mapper for path aliases
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@models/(.*)$": "<rootDir>/src/models/$1",
		"^@services/(.*)$": "<rootDir>/src/services/$1",
		"^@utils/(.*)$": "<rootDir>/src/utils/$1",
	},

	// Setup files
	setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],

	// Coverage configuration
	collectCoverageFrom: [
		"src/**/*.ts",
		"!src/**/*.d.ts",
		"!src/**/index.ts",
		"!src/test-setup.ts",
	],
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov", "html"],

	// Coverage thresholds
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},

	// Verbose output
	verbose: true,

	// Clear mocks between tests
	clearMocks: true,

	// Restore mocks after each test
	restoreMocks: true,

	// Maximum workers
	maxWorkers: "50%",

	// Fail on console errors/warnings
	errorOnDeprecated: true,
};
