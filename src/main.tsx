/**
 * File: src/main.tsx
 *
 * Purpose:
 * - Entry point for client-side rendering. Finds the DOM root element and mounts the React App.
 *
 * Main exports:
 * - None (side-effecting module that bootstraps the app).
 *
 * External dependencies:
 * - react-dom/client: createRoot for concurrent rendering.
 * - App component from './App.tsx'
 * - Local CSS import `./index.css` to include global styles.
 *
 * Assumptions:
 * - This file runs only in a browser environment where `document.getElementById("root")` exists.
 * - TypeScript non-null assertion (`!`) is used because the author assumes `#root` is present.
 * - If `#root` is missing, this will throw at runtime.
 */

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * Mount React App to the DOM.
 *
 * Important notes:
 * - `document.getElementById("root")!` uses the non-null assertion operator to bypass TypeScript's null checks.
 *   This assumes `#root` exists in `index.html`. If it doesn't, a runtime error will occur.
 * - Using `createRoot` enables the new React concurrent renderer (React 18+).
 *
 * Side effects:
 * - Mounts the entire React tree into the DOM.
 */
createRoot(document.getElementById("root")!).render(<App />);