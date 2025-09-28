/**
 * === FILE: src/lib/utils.ts ===
 * Short File Summary: Utility helpers for the codebase. Currently exposes a single Tailwind class name merge function.
 * Main exports:
 * - cn: Merge/normalize className values using clsx + tailwind-merge to avoid conflicting utilities.
 * External deps: clsx (truthy/falsey filtering, arrays/objects), tailwind-merge (dedupe & resolve Tailwind conflicts).
 * Assumptions: TailwindCSS class syntax. Accepts any clsx-supported inputs via ClassValue[].
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Compose a className string from heterogeneous inputs while resolving Tailwind conflicts.
 * @param inputs - Values accepted by clsx (string | number | null | boolean | undefined | object | array)
 * @returns A single string of classes with redundant/conflicting Tailwind utilities merged out.
 * @example
 * cn("p-2", condition && "p-4", ["text-sm", { hidden: isHidden }])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
