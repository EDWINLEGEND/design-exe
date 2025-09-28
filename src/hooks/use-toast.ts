/**
 * === FILE: src/hooks/use-toast.ts ===
 *
 * Short File Summary (3–6 lines):
 * - Local toast state manager with reducer, in-memory store, and subscription pattern.
 * - Exposes `useToast()` hook to read toasts and dispatch dismiss actions.
 * - Exposes `toast({...})` function to create/update/dismiss individual toasts.
 * - Applies a TOAST_LIMIT and delayed removal for exit animations.
 *
 * Main exports:
 * - reducer: pure reducer for toast state transitions (useful for tests).
 * - useToast(): React hook returning { toasts, toast, dismiss }.
 * - toast(): imperative API to add/update/dismiss toasts.
 *
 * External deps & important imports:
 * - React: state/effect/hooks; relies on browser environment (setTimeout, matchMedia).
 * - Toast types from components/ui/toast for type alignment.
 *
 * Assumptions:
 * - Client-side only. Uses timers and global memory; not SSR-safe by default.
 * - UI layer (Toaster) consumes `toasts` array and respects `open` prop transitions.
 */
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000 // Delay long enough for animation completion

/**
 * Type that represents a toast instance tracked by this store.
 */
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

/** Action type constants for reducer; frozen via `as const`. */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

/** Generate stable, incremental string ids. */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

/**
 * Discriminated union for all reducer actions.
 */
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

/**
 * Map of toast id -> timeout id to coordinate delayed removal after dismiss.
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Enqueue removal so the UI can animate out before being purged from state.
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Pure reducer that manages toast state transitions.
 * - ADD_TOAST: Prepend and enforce TOAST_LIMIT.
 * - UPDATE_TOAST: Shallow merge into matching toast.
 * - DISMISS_TOAST: Set open=false and schedule removal.
 * - REMOVE_TOAST: Remove by id, or clear all if id undefined.
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // Side effect: schedule removal so exit animations can play
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Simple pub/sub store feeding the hook below
const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/** Public toast payload without id (assigned internally). */
type Toast = Omit<ToasterToast, "id">

/**
 * Imperative API to add a toast and get control handles.
 *
 * Returns: { id, update(next), dismiss() }
 * Side effects: schedules timers and triggers subscribers.
 * Errors: none thrown; relies on consumer handling UI.
 */
function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return { id: id, dismiss, update }
}

/**
 * useToast
 *
 * Purpose: Subscribe to the global in-memory toast state in React components.
 * Lifecycle: client-only; sets up subscription on mount and cleans up on unmount.
 * Returns: { toasts, toast, dismiss }
 * Rerender causes: any state change in memoryState triggers listener update.
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
