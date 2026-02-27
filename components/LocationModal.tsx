"use client";
// components/LocationModal.tsx
//
// Shown when the user taps the "Delivery time" pill without having shared location.
// User can type their address directly, or tap the location icon to autofill via
// browser geolocation. Confirm closes the modal and grants location.

import { useState } from "react";
import { LocateFixed, X } from "lucide-react";

interface Props {
  open: boolean;
  onRequestLocation: () => void;
  onSaveAddress: (address: string) => void;
  onDismiss: () => void;
}

export default function LocationModal({
  open,
  onRequestLocation,
  onSaveAddress,
  onDismiss,
}: Props) {
  const [address, setAddress] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  if (!open) return null;

  async function handleGeolocate() {
    if (isLocating) return;
    setIsLocating(true);
    try {
      await onRequestLocation();
    } finally {
      setIsLocating(false);
    }
  }

  function handleSave() {
    if (!address.trim()) return;
    onSaveAddress(address.trim());
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onDismiss}
    >
      {/* Sheet */}
      <div
        className="w-full max-w-sm rounded-3xl p-6 flex flex-col gap-5"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
          color: "var(--card-foreground)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2
              className="font-bold text-lg leading-snug"
              style={{ color: "var(--foreground)" }}
            >
              Delivery Address
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Enter your address to see your delivery time.
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            style={{ background: "var(--muted)" }}
            aria-label="Dismiss"
          >
            <X
              className="w-4 h-4"
              style={{ color: "var(--muted-foreground)" }}
            />
          </button>
        </div>

        {/* Address input with geolocation icon */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="Enter delivery address"
            className="w-full rounded-2xl px-4 py-3.5 pr-12 text-sm outline-none"
            style={{
              background: "var(--muted)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            }}
          />
          <button
            onClick={handleGeolocate}
            disabled={isLocating}
            aria-label="Use my location"
            className="absolute right-3 flex items-center justify-center w-7 h-7 rounded-full transition-opacity cursor-pointer disabled:opacity-50"
            style={{ background: "var(--border)" }}
          >
            <LocateFixed
              className={`w-4 h-4 ${isLocating ? "animate-pulse" : ""}`}
              style={{ color: "var(--muted-foreground)" }}
            />
          </button>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!address.trim()}
          className="w-full rounded-full font-bold text-base tracking-[0.1px] transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-default"
          style={{
            height: "44px",
            background: "#fff",
            color: "#000",
          }}
        >
          Save Address
        </button>
      </div>
    </div>
  );
}
