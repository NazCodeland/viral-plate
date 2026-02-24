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
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-2 h-14">
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors active:scale-95"
        >
          <ChevronLeft className="size-5 text-foreground" />
        </button>

        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-semibold text-foreground pointer-events-none">
          {title}
        </h1>

        <button
          onClick={() => setMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors active:scale-95"
        >
          <Menu size={20} className="text-foreground" strokeWidth={2.8} />
        </button>
      </div>

      <AppMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
