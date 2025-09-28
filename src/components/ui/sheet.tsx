/**
 * === FILE: src/components/ui/sheet.tsx ===
 * Short File Summary: Headless, accessible "sheet" (drawer/side panel) primitives built on top of @radix-ui/react-dialog. Provides composable pieces (Root, Trigger, Content, Overlay, etc.) with Tailwind-driven animations and a side variant API.
 * Main exports: 
 * - Sheet: Dialog root controller (open/close state provider) for the sheet.
 * - SheetTrigger: Button/element that toggles the sheet open state.
 * - SheetClose: Button/element that closes the sheet when pressed.
 * - SheetPortal: Portal container that mounts dialog parts outside normal DOM flow.
 * - SheetOverlay: Full-screen overlay behind the sheet with fade animations.
 * - SheetContent: The actual panel; supports side variants (top/bottom/left/right).
 * - SheetHeader: Optional layout wrapper for header area inside the sheet.
 * - SheetFooter: Optional layout wrapper for footer/actions inside the sheet.
 * - SheetTitle: Accessible title element of the sheet.
 * - SheetDescription: Accessible description element of the sheet.
 * External deps: @radix-ui/react-dialog (focus trap, a11y), class-variance-authority (variants), lucide-react (icons), react (forwardRef), internal cn() utility for class merging.
 * Assumptions: Client-side React usage. TailwindCSS is configured with the required animations and tokens. Consumers provide appropriate aria labeling via Title/Description for accessibility.
 */

import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Root provider that manages the open/close state of the sheet.
 * - Purpose: Context provider for all Sheet sub-components.
 * - Props: Inherits all Radix Dialog.Root props (e.g., open, onOpenChange).
 * - Returns: No DOM by itself; provides context.
 * - Side effects: Focus trapping and aria-hidden management are handled by Radix.
 * - Lifecycle: Rerenders when open state or context props change.
 */
const Sheet = SheetPrimitive.Root

/** Toggle element that opens the sheet when interacted with. */
const SheetTrigger = SheetPrimitive.Trigger

/** Control element that closes the sheet when interacted with. */
const SheetClose = SheetPrimitive.Close

/**
 * Portal that mounts overlay/content at the document body level.
 * - Side effects: Moves children out of normal DOM tree for layering.
 */
const SheetPortal = SheetPrimitive.Portal

/**
 * Full-screen overlay that dims the background behind the sheet.
 * - Props: Inherits Radix Overlay props; accepts className for styling.
 * - Returns: <div role="presentation"> styled by Radix + Tailwind classes.
 * - Side effects: Blocks background pointer events and participates in focus trap.
 * - Accessibility: Radix manages aria-hidden on the rest of the page.
 */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  // Overlay covers the entire viewport; animated in/out via data-state attributes
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

// Variants describe which edge the sheet slides from and corresponding animations.
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        // Slide from top or bottom and add border at the attached edge
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        // Left/right slide-in panels; responsive max width on sm+
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

/** Props for SheetContent including the side variant. */
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> { }

/**
 * The visible sliding panel of the sheet.
 * - Props:
 *   - side: "top" | "bottom" | "left" | "right" (default "right"). Controls slide origin and size.
 *   - className: Optional additional classes.
 *   - ...props: All Radix Dialog.Content props.
 * - Returns: Portaled content with overlay and a focus-trapped content area.
 * - Side effects: Renders into a portal, traps focus while open.
 * - Accessibility: Includes a visually-hidden "Close" label for the close button. Provide <SheetTitle> and <SheetDescription> for screen readers.
 * - Lifecycle: Rerenders when open state, side variant, or props change.
 */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    {/* Dim the background and block interactions while the sheet is open */}
    <SheetOverlay />
    {/* Position and animate the content based on the chosen side variant */}
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      {/* Close affordance placed in the corner; includes screen-reader text */}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

/** Header layout wrapper to group title/description area at the top of the sheet. */
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

/** Footer layout wrapper to align actions and secondary info. */
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

/** Accessible title of the sheet; maps to aria-labelledby on the dialog. */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

/** Accessible description of the sheet; maps to aria-describedby. */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet, SheetClose,
  SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger
}

