"use client";
// components/AppMenu.tsx

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ShoppingBag,
  Clock,
  Heart,
  MapPin,
  CreditCard,
  Settings2,
  Briefcase,
  LifeBuoy,
  Send,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface AppMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AppMenu({ open, onOpenChange }: AppMenuProps) {
  const router = useRouter();

  const navigate = (path: string) => {
    onOpenChange(false);
    router.push(path);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-72 p-0 data-[state=open]:duration-300 data-[state=closed]:duration-200"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 px-3 pt-3 pb-4 border-b">
            <Avatar className="size-8">
              <AvatarImage
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop"
                alt="Profile"
              />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium">Alex Carter</span>
              <span className="text-xs text-muted-foreground">
                alex.carter@gmail.com
              </span>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95 shrink-0"
            >
              <Menu size={20} className="text-gray-700" strokeWidth={2.8} />
            </button>
          </div>

          {/* Nav */}
          <div className="flex-1 overflow-y-auto py-2">
            <p className="px-4 py-2 text-xs text-muted-foreground font-medium">
              My Orders
            </p>
            {[
              {
                icon: ShoppingBag,
                label: "Current Orders",
                path: "/current-orders",
              },
              { icon: Clock, label: "Order History", path: "/order-history" },
              { icon: Heart, label: "Liked Videos", path: "/liked-videos" },
            ].map(({ icon: Icon, label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}

            <p className="px-4 py-2 mt-2 text-xs text-muted-foreground font-medium">
              Account
            </p>
            {[
              {
                icon: MapPin,
                label: "Delivery Addresses",
                path: "/delivery-addresses",
              },
              {
                icon: CreditCard,
                label: "Payment Methods",
                path: "/payment-methods",
              },
              { icon: Settings2, label: "Settings", path: "/settings" },
            ].map(({ icon: Icon, label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}

            <p className="px-4 py-2 mt-2 text-xs text-muted-foreground font-medium">
              Partnership
            </p>
            <button
              onClick={() => navigate("/partner")}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              <Briefcase className="size-4" />
              Join as Partner
            </button>
          </div>

          {/* Footer */}
          <div className="border-t py-2">
            {[
              { icon: LifeBuoy, label: "Help & FAQ", path: "/help" },
              { icon: Send, label: "Feedback", path: "/feedback" },
            ].map(({ icon: Icon, label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
