"use client";
// components/SocialRail.tsx

import { useState } from "react";

interface Props {
  likes: number;
  saves: number;
  comments: number;
}

function formatCount(n: number): string {
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function SocialRail({ likes, saves }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeDelta, setLikeDelta] = useState(0);
  const [saveDelta, setSaveDelta] = useState(0);

  function toggleLike() {
    const next = !isLiked;
    setIsLiked(next);
    setLikeDelta((d) => d + (next ? 1 : -1));
  }

  function toggleBookmark() {
    const next = !isBookmarked;
    setIsBookmarked(next);
    setSaveDelta((d) => d + (next ? 1 : -1));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Like */}
      <button
        onClick={toggleLike}
        aria-label="Like"
        aria-pressed={isLiked}
        className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer transition-transform active:scale-[0.85]"
      >
        {isLiked ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="#FF2E63"
            stroke="#FF2E63"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )}
        <span className="text-[11px] font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
          {formatCount(likes + likeDelta)}
        </span>
      </button>

      {/* Bookmark */}
      <button
        onClick={toggleBookmark}
        aria-label="Save"
        aria-pressed={isBookmarked}
        className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer transition-transform active:scale-[0.85]"
      >
        {isBookmarked ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="#FFD700"
            stroke="#FFD700"
            strokeWidth="1.5"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        )}
        <span className="text-[11px] font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
          {formatCount(saves + saveDelta)}
        </span>
      </button>

      {/* Share — viewBox scaled from 20x20 to 24x24 to match heart and bookmark */}
      <button
        onClick={() => {}}
        aria-label="Share"
        className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer transition-transform active:scale-[0.85] text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          width="22"
          height="22"
        >
          {/* Original 20x20 path scaled by 24/20 = 1.2 */}
          <path d="M13.126 3.81a.808.808 0 0 1 1.366-.586l7.831 7.458c.689.656.665 1.764-.052 2.39l-7.806 6.811a.809.809 0 0 1-1.338-.61V16.19s-8.382-1.51-11.07 3.424c-.251.46-1.228.621-1.028-1.674.83-4.224 2.527-10.82 12.097-10.82z" />
        </svg>
        <span className="text-[11px] font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
          Share
        </span>
      </button>
    </div>
  );
}
