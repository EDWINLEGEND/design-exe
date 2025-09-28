/**
 * Path: src/vite-env.d.ts
 * Summary:
 * - TypeScript ambient declaration file to include Vite's client type definitions across the app.
 * - Ensures `import.meta.env` and other Vite-specific globals are typed in TS/TSX files.
 *
 * Main exports:
 * - None (triple-slash directive only; provides types via side effect at compile-time).
 *
 * External deps & important imports:
 * - vite/client: ambient type declarations for Vite runtime injected globals.
 *
 * Assumptions:
 * - Loaded via tsconfig include (tsconfig.app.json includes "src").
 * - Strictly a type-level file; has no runtime impact in the browser or Node.
 */

/// <reference types="vite/client" />