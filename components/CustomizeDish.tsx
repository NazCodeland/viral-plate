"use client";
// components/CustomizeDish.tsx

interface Props {
  onClick?: () => void;
}

export default function CustomizeDish({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/10 rounded-full px-1.5 py-1 text-white text-xs font-bold transition-colors active:bg-white/20"
    >
      🍽️ Customize
    </button>
  );
}
