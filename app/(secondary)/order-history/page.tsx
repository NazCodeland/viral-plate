"use client";
// app/(secondary)/order-history/page.tsx

import { RotateCcw, Star, Receipt } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

const pastOrders = [
  {
    id: "ORD-9815",
    restaurant: "Tony's Kitchen",
    item: "Caesar Salad",
    extras: "+ 3 more items",
    date: "Today, 11:20 AM",
    total: "$24.50",
    status: "Delivered",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop",
  },
  {
    id: "ORD-9802",
    restaurant: "Burrito House",
    item: "Steak Burrito",
    extras: "+ 2 more items",
    date: "Yesterday, 7:40 PM",
    total: "$31.00",
    status: "Delivered",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=80&h=80&fit=crop",
  },
  {
    id: "ORD-9788",
    restaurant: "Sushi Central",
    item: "Dragon Roll",
    extras: "+ 4 more items",
    date: "Feb 9, 8:15 PM",
    total: "$58.75",
    status: "Delivered",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=80&h=80&fit=crop",
  },
  {
    id: "ORD-9771",
    restaurant: "Pasta Palace",
    item: "Spaghetti Carbonara",
    extras: "",
    date: "Feb 7, 1:00 PM",
    total: "$18.90",
    status: "Cancelled",
    rating: null,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=80&h=80&fit=crop",
  },
  {
    id: "ORD-9754",
    restaurant: "The Grill Spot",
    item: "BBQ Ribs Platter",
    extras: "+ 1 more item",
    date: "Feb 5, 6:30 PM",
    total: "$42.00",
    status: "Delivered",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1544025162-d76594e18be2?w=80&h=80&fit=crop",
  },
];

export default function OrderHistoryPage() {
  return (
    <>
      <PageHeader title="Order History" />
      <div className="p-4 space-y-3">
        {pastOrders.map((order) => (
          <OrderHistoryCard key={order.id} order={order} />
        ))}
      </div>
    </>
  );
}

function OrderHistoryCard({ order }: { order: (typeof pastOrders)[0] }) {
  const isDelivered = order.status === "Delivered";

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative size-14 rounded-xl overflow-hidden shrink-0">
            <Image
              src={order.image}
              alt={order.item}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">
                {order.restaurant}
              </p>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDelivered ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate mt-0.5">
              {order.item}
              {order.extras && (
                <span className="text-gray-400"> {order.extras}</span>
              )}
            </p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-400">{order.date}</p>
              <p className="text-sm font-semibold text-gray-800">
                {order.total}
              </p>
            </div>
          </div>
        </div>

        {isDelivered && order.rating && (
          <div className="flex items-center gap-0.5 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3.5 ${i < order.rating! ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">Your rating</span>
          </div>
        )}
      </div>

      <div className="flex border-t border-gray-100">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors border-r border-gray-100">
          <Receipt className="size-3.5" />
          Receipt
        </button>
        {isDelivered && (
          <button className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-green-600 hover:bg-green-50 transition-colors">
            <RotateCcw className="size-3.5" />
            Reorder
          </button>
        )}
      </div>
    </div>
  );
}