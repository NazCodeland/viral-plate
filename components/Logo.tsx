"use client";
// components/Logo.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

export default function Logo() {
  return (
    <div className="fixed top-[max(16px,env(safe-area-inset-top))] left-3 z-50">
      <h1
        className="flex items-center gap-1 font-extrabold text-xl tracking-tight drop-shadow-md text-white"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <FontAwesomeIcon icon={faFire} style={{ color: "#FF4500" }} />
        TrendBites
      </h1>
    </div>
  );
}
