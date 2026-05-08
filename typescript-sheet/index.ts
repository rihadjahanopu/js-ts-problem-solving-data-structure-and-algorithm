// ═══════════════════════════════════════════════════════════════
// index.ts — TypeScript Complete Learning Guide
// Main Entry Point
// ═══════════════════════════════════════════════════════════════

console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║     TypeScript Complete Learning Guide — ৩৯+ ফাইল          ║");
console.log("║     Beginner থেকে Advanced পর্যন্ত সব কিছু                 ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
console.log();

const modules = [
	{
		phase: "Phase 1: Foundation",
		files: [
			"01_basics.ts — মৌলিক টাইপসমূহ (string, number, boolean, etc.)",
			"02_arrays_tuples_enums.ts — Array, Tuple, Enum",
			"03_special_types.ts — any, unknown, never, void",
			"04_type_inference.ts — Type Inference",
			"05_type_aliases.ts — Type Aliases",
			"06_interfaces.ts — Interfaces",
			"07_type_vs_interface.ts — type vs interface",
		],
	},
	{
		phase: "Phase 2: Intermediate",
		files: [
			"08_practice_student_system.ts — Student Management System",
			"09_practice_ecommerce.ts — E-commerce Cart System",
			"10_practice_api_handler.ts — Generic API Response Handler",
			"11_union_intersection.ts — Union & Intersection Types",
			"12_functions.ts — Functions (Optional, Default, Rest, Overloads)",
			"13_generics.ts — Generics",
			"14_utility_types.ts — Utility Types (Partial, Pick, Omit, etc.)",
		],
	},
	{
		phase: "Phase 3: Advanced",
		files: [
			"15_type_guards.ts — Type Guards",
			"16_mapped_types.ts — Mapped Types",
			"17_conditional_types.ts — Conditional Types & infer",
			"18_template_literal_types.ts — Template Literal Types",
			"19_decorators.ts — Decorators",
			"20_classes_oop.ts — OOP (Classes, Inheritance, Abstract)",
			"21_namespaces_modules.ts — Namespaces & Modules",
			"22_advanced_generics.ts — Advanced Generics",
		],
	},
	{
		phase: "Phase 4: Frameworks",
		files: [
			"23_react_typescript.tsx — React + TypeScript",
			"24_nodejs_express.ts — Node.js + Express",
			"33_nextjs_typescript.ts — Next.js + TypeScript",
		],
	},
	{
		phase: "Phase 5: Real-World Patterns",
		files: [
			"25_tsconfig_guide.md — tsconfig.json Complete Guide",
			"26_declaration_files.d.ts — .d.ts Declaration Files",
			"27_design_patterns.ts — Design Patterns",
			"28_async_await.ts — Async/Await & Promises",
			"29_error_handling.ts — Error Handling",
			"30_complete_project.ts — Complete E-Commerce Project",
			"31_type_narrowing.ts — Advanced Type Narrowing",
			"32_testing_jest.ts — Testing with Jest",
			"34_zod_validation.ts — Schema Validation with Zod",
			"35_branded_types.ts — Branded Types (Nominal Typing)",
			"36_functional_programming.ts — Functional Programming",
			"37_state_management.ts — State Management (Redux-like, FSM)",
			"38_performance_optimization.ts — Performance Optimization",
			"39_cheat_sheet.ts — Complete Cheat Sheet",
		],
	},
];

modules.forEach(({ phase, files }) => {
	console.log(`\n📚 ${phase}`);
	console.log("─".repeat(50));
	files.forEach((file) => console.log(`   • ${file}`));
});

console.log("\n" + "═".repeat(60));
console.log("🚀 শেখার ক্রম: 01 → 02 → 03 → ... → 39");
console.log("📖 প্রতিটি ফাইল ts-node দিয়ে রান করতে পারবেন");
console.log("💡 Cheat Sheet (39_cheat_sheet.ts) দ্রুত রেফারেন্স এর জন্য");
console.log("═".repeat(60));

// Quick demo
import { createOrderId, createUserId } from "./35_branded_types";

const userId = createUserId("user-123");
const orderId = createOrderId("order-456");

console.log("\n✅ TypeScript Complete Guide Loaded Successfully!");
console.log(`   Sample UserId: ${userId}`);
console.log(`   Sample OrderId: ${orderId}`);
