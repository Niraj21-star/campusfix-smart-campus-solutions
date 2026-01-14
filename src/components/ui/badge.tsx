import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        submitted: "border-transparent bg-primary text-white",
        assigned: "border-transparent bg-blue-500 text-white",
        "in-progress": "border-transparent bg-warning text-foreground",
        resolved: "border-transparent bg-success text-white",
        critical: "border-transparent bg-destructive text-white",
        high: "border-transparent bg-orange-500 text-white",
        medium: "border-transparent bg-warning text-foreground",
        low: "border-transparent bg-success text-white",
        cleanliness: "border-transparent bg-green-500/15 text-green-600",
        electrical: "border-transparent bg-yellow-500/15 text-yellow-600",
        plumbing: "border-transparent bg-blue-500/15 text-blue-600",
        safety: "border-transparent bg-red-500/15 text-red-600",
        connectivity: "border-transparent bg-blue-500/15 text-blue-600",
        infrastructure: "border-transparent bg-orange-500/15 text-orange-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
