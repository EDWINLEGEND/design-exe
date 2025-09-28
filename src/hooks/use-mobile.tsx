/**
 * === FILE: src/hooks/use-mobile.tsx ===
 *
 * Short File Summary (3–6 lines):
 * - Hook to detect if viewport is below a mobile breakpoint.
 * - Leverages window.matchMedia and updates on media query changes.
 * - Returns a boolean indicating "is mobile" (defaults to false until computed).
 *
 * Main exports:
 * - useIsMobile(): boolean flag for responsive rendering.
 *
 * External deps & important imports:
 * - React: useState/useEffect for client-side media query subscription.
 *
 * Assumptions:
 * - Client-only (uses window and matchMedia); not suitable for SSR without guards.
 * - MOBILE_BREAKPOINT is 768px (tailwind md breakpoint alignment).
 */
import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * useIsMobile
 *
 * Params: none
 * Returns: boolean — true when viewport width < MOBILE_BREAKPOINT
 * Side effects: subscribes to media query changes; cleans up on unmount.
 * Rerender causes: window width changes crossing breakpoint.
 * Errors: none thrown; `window` must exist (browser only).
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`) // -1 to avoid overlap with >= breakpoint
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
