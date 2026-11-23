import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#EBF5F1] text-[#246354] border border-[#C5E5D8]",
        doctor:
          "bg-sky-50 text-sky-700 border border-sky-200 font-semibold",
        accent:
          "bg-[#FFF2ED] text-[#E87A5D] border border-[#FCD9CE]",
        warning:
          "bg-amber-50 text-amber-700 border border-amber-200",
        outline:
          "border border-slate-200 text-slate-600 bg-white",
        secondary:
          "bg-slate-100 text-slate-700 border border-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
