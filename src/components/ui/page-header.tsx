import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backHref?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, backHref, className, children }: PageHeaderProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-body-sm text-text-secondary hover:text-foreground transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver
        </Link>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-title-lg text-foreground">{title}</h1>
          {subtitle && <p className="text-body-sm text-text-secondary mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
