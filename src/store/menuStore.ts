// =============================================================================
// 🍔 NIRVANA TECH — Mobile Menu Store (Zustand)
// =============================================================================
// Global state for the mobile navigation menu (hamburger menu).
// Lets the Navbar's hamburger button and the full-screen menu overlay
// communicate without prop-drilling.
//
// Usage:
//   const { isOpen, toggle, close } = useMenuStore();
//
//   <button onClick={toggle}>☰</button>
//   {isOpen && <MobileMenu onClose={close} />}
// =============================================================================

import { create } from "zustand";

// =============================================================================
// 📦 STORE INTERFACE
// =============================================================================
interface MenuState {
  // State
  isOpen: boolean;

  // Actions
  toggle: () => void;
  open: () => void;
  close: () => void;
}

// =============================================================================
// 🏪 ZUSTAND STORE
// =============================================================================
export const useMenuStore = create<MenuState>((set) => ({
  // ----- Initial State -----
  isOpen: false,

  // ----- Actions -----

  /**
   * Flip the menu state (open if closed, close if open).
   * Used by the hamburger button.
   */
  toggle: () =>
    set((state) => ({ isOpen: !state.isOpen })),

  /**
   * Force-open the menu.
   * Useful when triggered by something other than the hamburger.
   */
  open: () =>
    set({ isOpen: true }),

  /**
   * Force-close the menu.
   * Called when a link is clicked or user navigates away.
   */
  close: () =>
    set({ isOpen: false }),
}));