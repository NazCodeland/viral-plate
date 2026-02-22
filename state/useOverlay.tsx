"use client";
// state/useOverlay.tsx
//
// Each FoodCard creates its own OverlayProvider so cards are fully independent.
//
// effectivelyVisible: single source of truth for all consumers.
// False whenever the overlay hasn't revealed yet OR the user is force-hiding.
//
// useHoldToHide: returns pointer event props to spread onto the FoodCard root.
// Uses event delegation — filters interactive elements via e.target.closest().
// Swipe detection via onPointerMove cancels hold if finger moves > 10px.
// holdTimerRef is nulled inside the callback so onPointerMove correctly
// distinguishes "timer still pending" from "timer already fired".

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, [role="button"], [data-interactive]';

const HOLD_THRESHOLD_MS = 250;
const SWIPE_THRESHOLD_PX = 10;

interface OverlayState {
  effectivelyVisible: boolean;
  triggerReveal: () => void;
  hide: () => void;
  forceHide: () => void;
  cancelForceHide: () => void;
}

const OverlayContext = createContext<OverlayState | null>(null);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [forceHidden, setForceHidden] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerReveal = useCallback(() => {
    // Reset forceHidden when a card comes back into view — clears any
    // stuck forceHidden state from a previous gesture.
    setForceHidden(false);
    setVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(true);
      timerRef.current = null;
    }, 1200);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    setForceHidden(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const forceHide = useCallback(() => setForceHidden(true), []);
  const cancelForceHide = useCallback(() => setForceHidden(false), []);

  const effectivelyVisible = visible && !forceHidden;

  return (
    <OverlayContext
      value={{
        effectivelyVisible,
        triggerReveal,
        hide,
        forceHide,
        cancelForceHide,
      }}
    >
      {children}
    </OverlayContext>
  );
}

export function useOverlay(): OverlayState {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must be used inside OverlayProvider");
  return ctx;
}

interface UseHoldToHideOptions {
  onTap?: () => void;
}

export function useHoldToHide({ onTap }: UseHoldToHideOptions = {}) {
  const { forceHide, cancelForceHide } = useOverlay();

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didHoldRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const clearTimer = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as Element).closest(INTERACTIVE_SELECTOR)) return;

      didHoldRef.current = false;
      startPosRef.current = { x: e.clientX, y: e.clientY };

      holdTimerRef.current = setTimeout(() => {
        // Null the ref immediately so onPointerMove can correctly detect
        // that the timer has already fired vs still pending.
        holdTimerRef.current = null;
        didHoldRef.current = true;
        forceHide();
      }, HOLD_THRESHOLD_MS);
    },
    [forceHide],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      // Timer already fired (ref is null) — hold is committed, didHoldRef
      // is true. onPointerUp/onPointerCancel will call cancelForceHide().
      if (!holdTimerRef.current) return;

      const dx = Math.abs(e.clientX - startPosRef.current.x);
      const dy = Math.abs(e.clientY - startPosRef.current.y);

      // Timer still pending and user moved > 10px — swiping, not holding.
      // Cancel before the timer fires so UI never hides mid-scroll.
      if (dx > SWIPE_THRESHOLD_PX || dy > SWIPE_THRESHOLD_PX) {
        clearTimer();
        didHoldRef.current = false;
      }
    },
    [clearTimer],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as Element).closest(INTERACTIVE_SELECTOR)) return;

      clearTimer();

      if (didHoldRef.current) {
        cancelForceHide();
      } else {
        onTap?.();
      }

      didHoldRef.current = false;
    },
    [clearTimer, cancelForceHide, onTap],
  );

  const onPointerCancel = useCallback(() => {
    // Browser took over the gesture (e.g. native scroll). Clean up.
    clearTimer();
    if (didHoldRef.current) {
      cancelForceHide();
      didHoldRef.current = false;
    }
  }, [clearTimer, cancelForceHide]);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
