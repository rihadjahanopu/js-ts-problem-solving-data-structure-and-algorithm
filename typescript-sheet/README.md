# 🔰 TypeScript Complete Learning Guide

> Beginner থেকে Advanced পর্যন্ত সব কিছু Example সহ — ৩৩+ টি `.ts` ফাইল

---

## 📁 ফাইল তালিকা

### Phase 1: Foundation (মৌলিক)

| # | ফাইল | বিষয়বস্তু |
|---|------|-----------|
| 01 | `01_basics.ts` | string, number, boolean, null, undefined, bigint, symbol |
| 02 | `02_arrays_tuples_enums.ts` | Array, Tuple, Enum (numeric, string, const) |
| 03 | `03_special_types.ts` | any, unknown, never, void |
| 04 | `04_type_inference.ts` | Type Inference, কখন Explicit type লাগে |
| 05 | `05_type_aliases.ts` | type alias, nested types, function types |
| 06 | `06_interfaces.ts` | interface, methods, index signature, extension, merging |
| 07 | `07_type_vs_interface.ts` | type vs interface — কখন কোনটি |

### Phase 2: Intermediate (মধ্যম)

| # | ফাইল | বিষয়বস্তু |
|---|------|-----------|
| 08 | `08_practice_student_system.ts` | Student Management System (Complete Project) |
| 09 | `09_practice_ecommerce.ts` | E-commerce Cart System with Enum & Interface |
| 10 | `10_practice_api_handler.ts` | Generic API Response Handler |
| 11 | `11_union_intersection.ts` | Union Types, Intersection Types, Discriminated Unions |
| 12 | `12_functions.ts` | Functions, Optional/Default/Rest params, Overloading, Callbacks |
| 13 | `13_generics.ts` | Generic Functions, Constraints, Classes, Interfaces |
| 14 | `14_utility_types.ts` | Partial, Required, Readonly, Pick, Omit, Record, ReturnType |

### Phase 3: Advanced (উন্নত)

| # | ফাইল | বিষয়বস্তু |
|---|------|-----------|
| 15 | `15_type_guards.ts` | typeof, instanceof, in, custom type guards, discriminated unions |
| 16 | `16_mapped_types.ts` | Mapped Types, Key Remapping, Template Literal Keys |
| 17 | `17_conditional_types.ts` | Conditional Types, infer keyword, Type Extraction |
| 18 | `18_template_literal_types.ts` | Template Literal Types, String Manipulation |
| 19 | `19_decorators.ts` | Class, Method, Property Decorators, Decorator Factory |
| 20 | `20_classes_oop.ts` | OOP — Classes, Access Modifiers, Inheritance, Abstract, Static |
| 21 | `21_namespaces_modules.ts` | Namespaces, ES Modules, Module Augmentation |
| 22 | `22_advanced_generics.ts` | Advanced Generics, Repository Pattern, Event Emitter, Builder |

### Phase 4: Framework Integration

| # | ফাইল | বিষয়বস্তু |
|---|------|-----------|
| 23 | `23_react_typescript.tsx` | React + TS — Components, Hooks, forwardRef, Context, Generic Components |
| 24 | `24_nodejs_express.ts` | Node.js + Express — Routes, Middleware, Validation, Error Handling |
| 33 | `33_nextjs_typescript.ts` | Next.js — Pages, API Routes, App Router, getServerSideProps |

### Phase 5: Real-World Patterns

| # | ফাইল | বিষয়বস্তু |
|---|------|-----------|
| 25 | `25_tsconfig_guide.md` | Complete tsconfig.json Guide |
| 26 | `26_declaration_files.d.ts` | .d.ts files, Module Declaration, Global Augmentation |
| 27 | `27_design_patterns.ts` | Singleton, Factory, Builder, Observer, Strategy, Decorator, Repository |
| 28 | `28_async_await.ts` | Async/Await, Promise.all, Promise Pool, Retry, Async Queue |
| 29 | `29_error_handling.ts` | Custom Errors, Result Type, Circuit Breaker, Assertion Functions |
| 30 | `30_complete_project.ts` | Complete E-Commerce API — All features combined |
| 31 | `31_type_narrowing.ts` | Advanced Type Narrowing, Branded Types, Assertion Functions |
| 32 | `32_testing_jest.ts` | Testing with Jest + TypeScript |

### Configuration Files

| ফাইল | বিষয়বস্তু |
|------|-----------|
| `package.json` | Project dependencies & scripts |
| `tsconfig.json` | TypeScript compiler configuration |

---

## 🚀 শুরু করার নিয়ম

### 1. Project Setup

```bash
# Folder তৈরি
mkdir typescript-learning
cd typescript-learning

# Initialize
npm init -y

# TypeScript install
npm install -D typescript ts-node nodemon @types/node

# tsconfig তৈরি
tsc --init
```

### 2. tsconfig.json Settings

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

### 3. Run a File

```bash
# Direct run with ts-node
ts-node src/01_basics.ts

# Compile
tsc

# Watch mode
tsc --watch

# Run compiled JS
node dist/01_basics.js
```

---

## 📚 শেখার ক্রম (Recommended Order)

```
01_basics.ts
    ↓
02_arrays_tuples_enums.ts
    ↓
03_special_types.ts
    ↓
04_type_inference.ts
    ↓
05_type_aliases.ts
    ↓
06_interfaces.ts
    ↓
07_type_vs_interface.ts
    ↓
08_practice_student_system.ts  ← Practice!
    ↓
09_practice_ecommerce.ts       ← Practice!
    ↓
10_practice_api_handler.ts     ← Practice!
    ↓
11_union_intersection.ts
    ↓
12_functions.ts
    ↓
13_generics.ts
    ↓
14_utility_types.ts
    ↓
15_type_guards.ts
    ↓
16_mapped_types.ts
    ↓
17_conditional_types.ts
    ↓
18_template_literal_types.ts
    ↓
19_decorators.ts
    ↓
20_classes_oop.ts
    ↓
21_namespaces_modules.ts
    ↓
22_advanced_generics.ts
    ↓
23_react_typescript.tsx        ← If React
    ↓
24_nodejs_express.ts           ← If Backend
    ↓
25_tsconfig_guide.md
    ↓
26_declaration_files.d.ts
    ↓
27_design_patterns.ts
    ↓
28_async_await.ts
    ↓
29_error_handling.ts
    ↓
30_complete_project.ts         ← Final Project!
    ↓
31_type_narrowing.ts
    ↓
32_testing_jest.ts
    ↓
33_nextjs_typescript.ts        ← If Next.js
```

---

## 🎯 Practice Tasks

### Task 1: Book Library System
`Book` interface তৈরি করুন যার properties: `id` (readonly), `title`, `author`, `price`, `genre` (enum), `isAvailable` (optional), `tags` (string array, optional)

### Task 2: Generic API Client
Generic `ApiClient<T>` class লিখুন যা GET, POST, PUT, DELETE methods support করবে

### Task 3: Type-Safe Event Bus
Generic `EventBus<Events>` তৈরি করুন যা type-safe event emit/subscribe করতে পারবে

### Task 4: Form Validation
Generic `FormValidator<T>` তৈরি করুন যা object এর প্রতিটি field validate করতে পারবে

### Task 5: Repository Pattern
Generic `Repository<T>` interface implement করুন In-memory এবং Database version এ

---

## 🔗 Useful Resources

| Resource | Link |
|----------|------|
| TypeScript Handbook | https://www.typescriptlang.org/docs/handbook/intro.html |
| Type Challenges | https://github.com/type-challenges/type-challenges |
| Total TypeScript | https://www.totaltypescript.com/ |
| TypeScript Deep Dive | https://basarat.gitbook.io/typescript/ |

---

## 📝 Tips

1. **Always use `strict: true`** in tsconfig.json
2. **Avoid `any`** — use `unknown` instead
3. **Use explicit return types** for functions
4. **Prefer `interface`** for object shapes
5. **Use `type`** for unions, tuples, and complex types
6. **Enable `noUnusedLocals`** and `noUnusedParameters`
7. **Use branded types** for nominal typing
8. **Write tests** with Jest + ts-jest

---

> **Next Step:** কোনো specific topic নিয়ে বিস্তারিত জানতে চাইলে বলুন! 🚀
