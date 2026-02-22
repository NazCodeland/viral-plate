// components\VideoCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function VideoCardSkeleton() {
  return (
    <div className="relative w-full bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-16 bg-gray-700" />
            <Skeleton className="h-4 w-36 bg-gray-700" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded bg-gray-700" />
      </div>

      {/* Bottom Content Panel */}
      <div className="absolute left-4 right-4 bottom-4 z-20 flex flex-col gap-4">
        {/* Fulfillment Badge */}
        <Skeleton className="h-4 w-72 rounded-full bg-gray-700" />

        {/* Dish Title */}
        <Skeleton className="h-16 w-80 bg-gray-700" />

        {/* Time and Price Row */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 bg-gray-700" />
          <Skeleton className="h-6 w-24 bg-gray-700" />
        </div>

        {/* Place Order Button */}
        <Skeleton className="h-16 w-full rounded-full bg-gray-700" />

        {/* Customize Link */}
        <Skeleton className="h-4 w-24 mx-auto bg-gray-700" />
      </div>
    </div>
  );
}
