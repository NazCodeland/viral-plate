"use client";
// app/(secondary)/current-orders/page.tsx

import { MapPin, Clock, ChevronRight, Package } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

const currentOrders = [
  {
    id: "ORD-9821",
    restaurant: "Tony's Kitchen",
    item: "Green Salad",
    extras: "+ 2 more items",
    status: "On the way",
    statusColor: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    eta: "Arrives by 1:45 PM · 25 min",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop",
    progress: 70,
  },
  {
    id: "ORD-9820",
    restaurant: "Burrito House",
    item: "Chicken Burrito Bowl",
    extras: "+ 1 more item",
    status: "Preparing",
    statusColor: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    eta: "Arrives by 2:10 PM · 50 min",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=80&h=80&fit=crop",
    progress: 30,
  },
];

export default function CurrentOrdersPage() {
  return (
    <>
      <PageHeader title="Current Orders" />
      <div className="p-4 space-y-4">
        {currentOrders.length === 0 ? (
          <EmptyState />
        ) : (
          currentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </>
  );
}

function OrderCard({ order }: { order: (typeof currentOrders)[0] }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative size-16 rounded-xl overflow-hidden shrink-0">
            <Image
              src={order.image}
              alt={order.item}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400 font-medium">{order.id}</p>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${order.statusColor}`}
              >
                <span className={`size-1.5 rounded-full ${order.dot}`} />
                {order.status}
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">
              {order.restaurant}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {order.item} {order.extras}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">{order.eta}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${order.progress}%` }}
            />
          </div>
        </div>
      </div>

      <button className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 border-t border-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-green-600" />
          Track Order
        </div>
        <ChevronRight className="size-4 text-gray-400" />
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Package className="size-8 text-gray-400" />
      </div>
      <p className="text-base font-semibold text-gray-800">No active orders</p>
      <p className="text-sm text-gray-400 mt-1">
        Your current orders will appear here
      </p>
    </div>
  );
}