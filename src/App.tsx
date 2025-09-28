/**
 * File: src/App.tsx
 *
 * Purpose:
 * - Top-level React component that composes global providers and routes for the app.
 * - Mounts QueryClientProvider (react-query), CartProvider, TooltipProvider and app routes.
 *
 * Main exports:
 * - default App: The root React component for the SPA.
 *
 * External dependencies:
 * - @tanstack/react-query: QueryClient, QueryClientProvider for server-state management (caching, background updates).
 * - react-router-dom: BrowserRouter, Routes, Route for client-side routing.
 * - Local components: `CartProvider` from `./lib/cart-context`, `Index` and `NotFound` pages.
 * - UI utilities: `Toaster` components for notifications.
 *
 * Key assumptions:
 * - Runs client-side only (uses BrowserRouter and window APIs).
 * - `Index` and `NotFound` are React components exporting default pages.
 * - QueryClient is created here and shared globally.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./lib/cart-context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/**
 * Create a single QueryClient instance for the application.
 * - react-query's QueryClient manages caching, retries, background refetching.
 * - Creating it here ensures all components share the same cache and config.
 */
const queryClient = new QueryClient();

/**
 * App
 *
 * Purpose:
 * - Root component that configures global providers and routes.
 *
 * Notes on behavior / lifecycle:
 * - Pure functional component that returns provider-wrapped JSX.
 * - No props.
 * - Client-side only: uses BrowserRouter (not for SSR).
 *
 * Side effects:
 * - None directly here (providers may create side-effects internally).
 *
 * Returns:
 * - JSX.Element: the app root tree.
 *
 * Error conditions:
 * - If `Index` or `NotFound` imports fail, the app will error during module load.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* CartProvider - provides cart state and actions to children via context */}
    <CartProvider>
      {/* TooltipProvider - supplies tooltip context for UI components */}
      <TooltipProvider>
        {/* Two toaster implementations are mounted for different toast systems */}
        <Toaster />
        <Sonner />
        {/* BrowserRouter - client-side navigation */}
        <BrowserRouter>
          <Routes>
            {/* Route definitions: index and fallback */}
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;