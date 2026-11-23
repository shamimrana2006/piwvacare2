"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBaby } from "@/context/BabyContext";
import { BabySwitcherModal } from "@/components/common/BabySwitcherModal";
import {
  Baby,
  Search,
  Sparkles,
  ShoppingBag,
  MessageSquareHeart,
  BookOpen,
  Milestone,
  ChevronDown,
  Bell,
  Bookmark,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const { activeProfile, bookmarkedProductIds, bookmarkedArticleIds } = useBaby();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalBookmarks = bookmarkedProductIds.length + bookmarkedArticleIds.length;

  const navLinks = [
    { href: "/", label: "হোম ও ফিড", icon: Sparkles },
    { href: "/products", label: "স্মার্ট প্রোডাক্টস", icon: ShoppingBag },
    { href: "/community", label: "প্যারেন্টিং কমিউনিটি", icon: MessageSquareHeart },
    { href: "/knowledge", label: "নলেজ হাব", icon: BookOpen },
    { href: "/journey", label: "আমার শিশুর জার্নি", icon: Milestone },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Top Emergency & Trust Alert Bar */}
        <div className="bg-[#2D7A68] text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-200" />
          <span>
            বাংলাদেশের বাবা-মায়েদের জন্য বিশ্বস্ত প্ল্যাটফর্ম • জরুরি সরকারি স্বাস্থ্য হেল্পলাইন: <strong>১৬২৬৩</strong>
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18 gap-3 md:gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#2D7A68] to-[#3B9B85] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Baby className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl md:text-2xl font-black tracking-tight text-[#2D7A68]">
                    Piwva
                  </span>
                  <span className="text-[10px] bg-[#FFF2ED] text-[#E87A5D] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    Care
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
                  স্মার্ট প্যারেন্টিং সঙ্গী
                </p>
              </div>
            </Link>

            {/* Universal Search Bar (Desktop & Tablet) */}
            <div className="hidden md:flex flex-1 max-w-md relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="প্রোডাক্ট, স্বাস্থ্য পরামর্শ বা সমস্যা সার্চ করুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10.5 pl-10 pr-4 text-xs md:text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-full border border-slate-200/90 focus:border-[#2D7A68] focus:ring-2 focus:ring-[#2D7A68]/20 focus:outline-none transition-all placeholder:text-slate-400"
                />
                <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Right Action Items: Baby Age Switcher Pill & Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Baby Profile Selector Pill */}
              <button
                type="button"
                onClick={() => setSwitcherOpen(true)}
                className="flex items-center gap-2 bg-[#EBF5F1] hover:bg-[#DDF0E8] text-[#246354] px-3 py-1.5 md:py-2 rounded-full border border-[#C5E5D8] text-xs md:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
                title="শিশুর বয়স পরিবর্তন বা প্রোফাইল সুইচ করুন"
              >
                <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[#2D7A68] shadow-2xs">
                  <Baby className="h-3.5 w-3.5" />
                </div>
                <div className="text-left hidden xs:block">
                  <span className="text-xs font-bold block leading-tight text-slate-800">
                    {activeProfile.name}
                  </span>
                  <span className="text-[10px] text-[#2D7A68] font-medium block leading-tight">
                    {activeProfile.ageFormatted}
                  </span>
                </div>
                <div className="text-left xs:hidden text-xs font-bold text-slate-800">
                  {activeProfile.ageFormatted}
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-0.5" />
              </button>

              {/* Bookmarks Icon */}
              <Link
                href="/journey#saved"
                className="relative p-2 rounded-xl text-slate-600 hover:text-[#2D7A68] hover:bg-slate-100 transition-colors"
                title="সংরক্ষিত আইটেম"
              >
                <Bookmark className="h-5 w-5" />
                {totalBookmarks > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-[#E87A5D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalBookmarks}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <button
                type="button"
                className="p-2 rounded-xl text-slate-600 hover:text-[#2D7A68] hover:bg-slate-100 transition-colors hidden sm:block"
                title="নোটিফিকেশন"
                onClick={() => alert("আপনার জন্য ৩টি নতুন পেডিয়াট্রিশিয়ান টিপস রয়েছে!")}
              >
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation Link Row */}
          <nav className="hidden md:flex items-center gap-1 border-t border-slate-100 py-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                    isActive
                      ? "text-[#2D7A68] bg-[#EBF5F1] shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#2D7A68]" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Baby Profile Switcher Modal */}
      <BabySwitcherModal open={switcherOpen} onOpenChange={setSwitcherOpen} />
    </>
  );
}
