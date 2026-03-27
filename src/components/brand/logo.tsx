import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold tracking-tight text-foreground", className)}>
      Amelia
    </span>
  )
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl bg-foreground text-background font-bold",
        className
      )}
    >
      A
    </div>
  )
}
