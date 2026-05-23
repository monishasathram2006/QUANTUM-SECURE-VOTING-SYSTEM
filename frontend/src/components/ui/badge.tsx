import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/5 text-white",
        info: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
        warning: "border-neon-purple/40 bg-neon-purple/15 text-neon-purple",
        success: "border-neon-blue/40 bg-neon-blue/10 text-neon-blue",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
