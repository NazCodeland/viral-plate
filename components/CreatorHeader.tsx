"use client";
// components/CreatorHeader.tsx

interface Props {
  handle: string;
  avatarUrl: string;
  onClick?: () => void;
}

export default function CreatorHeader({ handle, avatarUrl, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={`View ${handle} profile`}
      className="relative w-10 h-10 rounded-full bg-cover bg-center shrink-0 cursor-pointer transition-transform active:scale-95"
      style={{ backgroundImage: `url('${avatarUrl}')` }}
    >
      {/* Red "+" follow badge */}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#FF2D55] flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M5 2v6M2 5h6"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
}
