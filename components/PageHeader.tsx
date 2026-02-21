"use client";
// components/PageHeader.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Menu } from "lucide-react";
import AppMenu from "@/components/AppMenu";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-2 h-14">
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
        >
          <ChevronLeft className="size-5 text-gray-700" />
        </button>

        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-semibold text-gray-900 pointer-events-none">
          {title}
        </h1>

        <button
          onClick={() => setMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
        >
          <Menu size={20} className="text-gray-700" strokeWidth={2.8} />
        </button>
      </div>

      <AppMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
