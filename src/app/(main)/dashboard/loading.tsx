import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="max-w-lg mx-auto px-5 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>

      {/* Track card */}
      <Skeleton className="h-32 w-full rounded-2xl mt-8" />

      {/* Hero card */}
      <Skeleton className="h-36 w-full rounded-2xl mt-8" />

      {/* Lessons */}
      <div className="mt-8 space-y-3">
        <Skeleton className="h-5 w-36" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
