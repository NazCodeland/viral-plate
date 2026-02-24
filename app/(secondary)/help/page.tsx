"use client";
// app/(secondary)/help/page.tsx

import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const faqs = [
  {
    section: "Orders",
    items: [
      "How do I track my order?",
      "Can I cancel or modify my order?",
      "What if my order is late?",
      "What if an item is missing?",
    ],
  },
  {
    section: "Payment",
    items: [
      "What payment methods are accepted?",
      "Why was my card declined?",
      "How do refunds work?",
    ],
  },
  {
    section: "Account",
    items: [
      "How do I change my delivery address?",
      "How do I delete my account?",
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <PageHeader title="Help" />

      <div className="p-4 space-y-4">
        {faqs.map((group) => (
          <div
            key={group.section}
            className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
              {group.section}
            </p>
            {group.items.map((item, i) => (
              <button
                key={item}
                className={`flex items-center justify-between w-full px-4 py-3.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors text-left ${i < group.items.length - 1 ? "border-b border-gray-50" : ""}`}
              >
                {item}
                <ChevronRight className="size-4 text-gray-300 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        ))}

        <p className="text-xs text-center text-gray-300 pt-2">
          Still need help? Email us at support@yourapp.com
        </p>
      </div>
    </>
  );
}
