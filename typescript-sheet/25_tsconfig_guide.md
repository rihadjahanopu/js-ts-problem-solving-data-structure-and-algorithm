# tsconfig.json — Complete Guide

## Basic Structure

```json
{
  "compilerOptions": {
    // Target & Module
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020", "DOM"],

    // Output
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationDir": "./dist/types",
    "sourceMap": true,

    // Strictness
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    // Module Resolution
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@models/*": ["src/models/*"],
      "@services/*": ["src/services/*"]
    },
    "resolveJsonModule": true,

    // Interop
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,

    // Linting
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    // Experimental
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,

    // Advanced
    "skipLibCheck": true,
    "incremental": true,
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"],
  "references": [
    { "path": "./packages/shared" }
  ]
}
```

## Key Options Explained

### target
- `"ES5"` — Browser compatibility
- `"ES2015"` — Modern browsers
- `"ES2020"` — Node.js 14+
- `"ESNext"` — Latest features

### module
- `"commonjs"` — Node.js
- `"ESNext"` — Modern bundlers
- `"AMD"` — RequireJS
- `"UMD"` — Universal

### strict Mode (Enable All)
```json
"strict": true
```
Enables: noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis, alwaysStrict

### Path Mapping
```json
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"],
  "@components/*": ["src/components/*"]
}
```
Usage: `import { Button } from "@components/Button"`

### Multiple tsconfig Files

**tsconfig.json** (main)
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

**tsconfig.base.json** (shared)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true
  }
}
```

**tsconfig.test.json** (tests)
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

## Project References (Monorepo)

```json
// tsconfig.json (root)
{
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" },
    { "path": "./packages/api" }
  ]
}
```

```json
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist",
    "composite": true,
    "declaration": true
  },
  "include": ["src/**/*"]
}
```

## Common Configurations

### React Project
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": false,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

### Node.js Project
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Library Project
```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

## Compiler Flags Quick Reference

| Flag | Description |
|------|-------------|
| `--noEmit` | Only type check, no output |
| `--watch` | Watch mode |
| `--incremental` | Incremental compilation |
| `--build` | Build project references |
| `--showConfig` | Show effective config |
| `--traceResolution` | Debug module resolution |

## Useful Commands

```bash
# Initialize tsconfig
tsc --init

# Compile
tsc

# Watch mode
tsc --watch

# Check types only
tsc --noEmit

# Build with project references
tsc --build

# Clean build
tsc --build --clean
```
