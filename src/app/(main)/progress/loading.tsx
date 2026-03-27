import { Skeleton } from "@/components/ui/skeleton"

export default function ProgressLoading() {
  return (
    <div className="max-w-lg mx-auto px-5 py-6 pb-24">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-4 w-44" />
      </div>

      {/* Level badge */}
      <Skeleton className="h-24 w-full rounded-2xl mt-8" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
      </div>

      {/* Track */}
      <Skeleton className="h-5 w-24 mt-8" />
      <Skeleton className="h-32 w-full rounded-2xl mt-3" />
    </div>
  )
}
