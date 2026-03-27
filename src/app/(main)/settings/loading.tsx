import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="max-w-lg mx-auto px-5 py-6 pb-24">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Profile card */}
      <Skeleton className="h-40 w-full rounded-2xl mt-8" />

      {/* Learning config */}
      <Skeleton className="h-48 w-full rounded-2xl mt-8" />

      {/* Sign out */}
      <Skeleton className="h-11 w-full rounded-xl mt-8" />
    </div>
  )
}
