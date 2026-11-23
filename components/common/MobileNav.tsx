"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ShoppingBag, MessageSquareHeart, BookOpen, Milestone } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "হোম", icon: Sparkles },
    { href: "/products", label: "শপ", icon: ShoppingBag },
    { href: "/community", label: "কমিউনিটি", icon: MessageSquareHeart },
    { href: "/knowledge", label: "গাইড", icon: BookOpen },
    { href: "/journey", label: "জার্নি", icon: Milestone },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-lg px-2 py-1.5">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? "text-[#2D7A68] font-bold"
                  : "text-slate-500 hover:text-slate-700 font-medium"
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? "bg-[#EBF5F1]" : "bg-transparent"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-[#2D7A68]" : "text-slate-400"}`} />
              </div>
              <span className="text-[11px] tracking-tight mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
