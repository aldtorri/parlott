import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        // CEFR levels
        A1: "border-transparent bg-blue-100 text-blue-700",
        A2: "border-transparent bg-green-100 text-green-700",
        B1: "border-transparent bg-yellow-100 text-yellow-800",
        B2: "border-transparent bg-red-100 text-red-700",
        C1: "border-transparent bg-purple-100 text-purple-700",
        C2: "border-transparent bg-neutral-200 text-neutral-800",
        // Languages
        english: "border-transparent bg-blue-100 text-blue-700",
        spanish: "border-transparent bg-red-100 text-red-700",
        portuguese: "border-transparent bg-green-100 text-green-700",
        french: "border-transparent bg-purple-100 text-purple-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
