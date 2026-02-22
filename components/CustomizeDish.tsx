"use client";
// components/CustomizeDish.tsx

interface Props {
  onClick?: () => void;
}

export default function CustomizeDish({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-transparent border-none text-[13px] font-medium tracking-[0.1px] text-white/60 cursor-pointer hover:text-white transition-colors duration-200"
    >
      Customize
    </button>
  );
}
