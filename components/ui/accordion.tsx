"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

export function Accordion({
  children,
  className,
  type = "single",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
}) {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const toggleItem = (val: string) => {
    if (type === "single") {
      setOpenItems((prev) => (prev.includes(val) ? [] : [val]));
    } else {
      setOpenItems((prev) =>
        prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("divide-y divide-slate-100", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("py-2", className)} data-value={value}>
      {children}
    </div>
  );
}

export function AccordionTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");
  const isOpen = context.openItems.includes(value);

  return (
    <button
      type="button"
      onClick={() => context.toggleItem(value)}
      className={cn(
        "flex w-full items-center justify-between py-2 text-left text-sm md:text-base font-semibold text-slate-800 transition-all hover:text-[#2D7A68] cursor-pointer",
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200",
          isOpen && "rotate-180 text-[#2D7A68]"
        )}
      />
    </button>
  );
}

export function AccordionContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within Accordion");
  const isOpen = context.openItems.includes(value);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "pt-1 pb-3 text-sm text-slate-600 leading-relaxed animate-in fade-in-50 duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
