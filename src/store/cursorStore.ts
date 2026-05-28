// =============================================================================
// 🖱️ NIRVANA TECH — Custom Cursor Store (Zustand)
// =============================================================================
// Global state for the custom cursor's appearance.
// Components anywhere can change the cursor's "mood" by calling setVariant().
//
// Usage in any component:
//   import { useCursorStore } from "@/store/cursorStore";
//
//   const { setVariant, reset } = useCursorStore();
//
//   <button
//     onMouseEnter={() => setVariant('button')}
//     onMouseLeave={reset}
//   >
//     Click me
//   </button>
// =============================================================================

import { create } from "zustand";

// =============================================================================
// 🎨 CURSOR VARIANTS — Different visual states
// =============================================================================
// 'default' → small dot + outer ring (idle state)
// 'hover'   → enlarged ring, blue glow (links, interactive elements)
// 'text'    → tall I-beam shape (over text fields, inputs)
// 'button'  → big circle filled with gold (CTAs, primary actions)
// 'image'   → expanded with "View" or custom text inside (images, projects)
// 'hidden'  → fades out completely (used during transitions/modals)
// =============================================================================

export type CursorVariant =
  | "default"
  | "hover"
  | "text"
  | "button"
  | "image"
  | "hidden";

// =============================================================================
// 📦 STORE INTERFACE
// =============================================================================
interface CursorState {
  // State
  variant: CursorVariant;
  text?: string;

  // Actions
  setVariant: (variant: CursorVariant, text?: string) => void;
  reset: () => void;
}

// =============================================================================
// 🏪 ZUSTAND STORE
// =============================================================================
export const useCursorStore = create<CursorState>((set) => ({
  // ----- Initial State -----
  variant: "default",
  text: undefined,

  // ----- Actions -----

  /**
   * Change the cursor variant.
   * Optionally pass text to display inside the cursor (e.g., "View Project").
   *
   * @example
   *   setVariant('button')              // Just change shape
   *   setVariant('image', 'View')       // With text inside
   */
  setVariant: (variant, text) =>
    set({ variant, text }),

  /**
   * Reset cursor to default state.
   * Call this on mouseLeave to remove hover effects.
   */
  reset: () =>
    set({ variant: "default", text: undefined }),
}));