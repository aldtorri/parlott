import { cn } from "@/lib/utils"
import { Button } from "./button"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-5 text-center", className)}>
      <div className="w-12 h-12 rounded-2xl bg-surface-elevated flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-text-tertiary" />
      </div>
      <h3 className="text-title-sm text-foreground mb-1">{title}</h3>
      <p className="text-body-sm text-text-secondary max-w-xs">{description}</p>
      {actionLabel && (
        <div className="mt-4">
          {actionHref ? (
            <Button asChild size="sm">
              <a href={actionHref}>{actionLabel}</a>
            </Button>
          ) : (
            <Button size="sm" onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  )
}
