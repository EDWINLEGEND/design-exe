/**
 * === FILE: vite.config.ts ===
 *
 * Short File Summary:
 * - Vite configuration for React + SWC setup with a component tagging plugin in development.
 * - Configures dev server host/port and path aliases for clean imports.
 * - Exports a function-based config to access the current mode (development/production).
 *
 * Main exports:
 * - default defineConfig((ctx) => ViteUserConfig): returns Vite config driven by mode.
 *
 * External deps & important imports:
 * - vite: defineConfig to type and export the configuration.
 * - @vitejs/plugin-react-swc: React plugin using SWC for fast transforms.
 * - path: Node.js path to resolve alias.
 * - lovable-tagger: optional dev-only plugin to tag components (DX aid).
 *
 * Assumptions:
 * - Runs in Node (Vite config context). Not executed in browser.
 * - Alias "@" resolves to ./src for cleaner absolute imports.
 * - Dev server binds to host "::" (IPv6 any) on port 8080.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Dev server settings: reachable on all interfaces via IPv6 any-address
  server: {
    host: "::",
    port: 8080, // Magic number: commonly free port; change via env if conflicting
  },
  plugins: [
    // React with SWC (fast TS/JSX transforms)
    react(),
    // Only enable componentTagger in development for DX; filtered by .filter(Boolean)
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      // Support imports like import x from "@/lib/utils"
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
