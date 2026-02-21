"use client";
// app/(secondary)/delivery-addresses/page.tsx

import {
  Home,
  Briefcase,
  MapPin,
  Plus,
  MoreVertical,
  Check,
} from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

const initialAddresses = [
  {
    id: 1,
    label: "Home",
    icon: "home",
    line1: "142 Maple Street, Apt 3B",
    line2: "Toronto, ON M5V 2T6",
    isDefault: true,
  },
  {
    id: 2,
    label: "Work",
    icon: "work",
    line1: "250 King Street West",
    line2: "Toronto, ON M5H 1J8",
    isDefault: false,
  },
  {
    id: 3,
    label: "Mom's Place",
    icon: "pin",
    line1: "88 Rosedale Valley Rd",
    line2: "Toronto, ON M4W 1P7",
    isDefault: false,
  },
];

export default function DeliveryAddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const setDefault = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === id })),
    );
    setActiveMenu(null);
  };

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    setActiveMenu(null);
  };

  const iconMap = { home: Home, work: Briefcase, pin: MapPin };

  return (
    <>
      <PageHeader title="Delivery Addresses" />
      <div className="p-4 space-y-3">
        {addresses.map((address) => {
          const Icon = iconMap[address.icon as keyof typeof iconMap];
          return (
            <div
              key={address.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${address.isDefault ? "border-green-400 ring-1 ring-green-100" : "border-gray-100"}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${address.isDefault ? "bg-green-100" : "bg-gray-100"}`}
                >
                  <Icon
                    className={`size-5 ${address.isDefault ? "text-green-600" : "text-gray-500"}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {address.label}
                    </span>
                    {address.isDefault && (
                      <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="size-3" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {address.line1}
                  </p>
                  <p className="text-xs text-gray-400">{address.line2}</p>
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === address.id ? null : address.id,
                      )
                    }
                    className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical className="size-4 text-gray-400" />
                  </button>

                  {activeMenu === address.id && (
                    <div className="absolute right-0 top-9 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10">
                      {!address.isDefault && (
                        <button
                          onClick={() => setDefault(address.id)}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Check className="size-4 text-green-600" />
                          Set as default
                        </button>
                      )}
                      <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <MapPin className="size-4 text-gray-400" />
                        Edit address
                      </button>
                      <button
                        onClick={() => deleteAddress(address.id)}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100"
                      >
                        <svg className="size-4" fill="none" viewBox="0 0 24 24">
                          <path
                            d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <button className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 text-sm font-semibold text-gray-400 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all">
          <Plus className="size-4" />
          Add New Address
        </button>
      </div>

      {activeMenu !== null && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </>
  );
}
