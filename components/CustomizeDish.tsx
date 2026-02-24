"use client";
// components/CustomizeDish.tsx

interface Props {
  onClick?: () => void;
}

export default function CustomizeDish({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text-sm font-medium text-white/70 border border-white/30 rounded-full px-3 py-0.5 hover:border-white/60 hover:text-white transition-colors duration-200"
    >
      Customize
    </button>
  );
}
