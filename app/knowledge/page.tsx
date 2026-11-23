"use client";

import React, { useState } from "react";
import { useBaby } from "@/context/BabyContext";
import { KnowledgeArticle } from "@/lib/types";
import { ArticleDetailModal } from "@/components/knowledge/ArticleDetailModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Search,
  Clock,
  BadgeCheck,
  ArrowRight,
  Heart,
  Volume2,
  AlertTriangle,
  Baby,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

export default function KnowledgePage() {
  const {
    articles,
    selectedAgeFilter,
    setSelectedAgeFilter,
    bookmarkedArticleIds,
    toggleBookmarkArticle,
    activeProfile,
  } = useBaby();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    { id: "all", label: "সকল গাইড" },
    { id: "health", label: "শিশুর স্বাস্থ্য ও রোগ" },
    { id: "sleep", label: "নিরাপদ ঘুম" },
    { id: "nutrition", label: "পুষ্টি ও প্রথম খাবার" },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === "all" || art.category === selectedCategory;
    const matchesAge = selectedAgeFilter === "all" || art.ageGroup === selectedAgeFilter || art.ageGroup === "all";
    const matchesQuery =
      !searchQuery.trim() ||
      art.banglaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesAge && matchesQuery;
  });

  const openArticle = (art: KnowledgeArticle) => {
    setSelectedArticle(art);
    setModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Knowledge Hub Header Banner */}
      <div className="bg-gradient-to-r from-[#246354] via-[#2D7A68] to-[#1E4E42] rounded-3xl p-6 sm:p-10 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-white/20">
            <BadgeCheck className="h-4 w-4 text-[#FDE047]" />
            <span>১০০% রেজিস্টার্ড পেডিয়াট্রিশিয়ান দ্বারা যাচাইকৃত</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
            নির্ভরযোগ্য প্যারেন্টিং ও শিশু স্বাস্থ্য নলেজ হাব
          </h1>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            শিশুর বয়স অনুযায়ী বিজ্ঞানসম্মত পরামর্শ, পুষ্টিকর খাবার তৈরির নিয়ম, ঘুমের রুটিন এবং সাধারণ অসুখ-বিসুখের সহজ বাংলা গাইডলাইন।
          </p>
        </div>

        {/* Baby Context Widget */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shrink-0 w-full sm:w-auto">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white text-[#2D7A68] flex items-center justify-center font-bold">
              <Baby className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] text-emerald-200 block">বর্তমান সক্রিয় শিশু:</span>
              <span className="text-sm font-bold text-white">
                {activeProfile.name} ({activeProfile.ageFormatted})
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedAgeFilter(activeProfile.ageGroup)}
            className="mt-3 w-full text-xs font-bold bg-white text-[#2D7A68] hover:bg-slate-100 py-1.5 px-3 rounded-xl transition-all"
          >
            এই বয়সের গাইডগুলো দেখুন
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="গাইড খুঁজুন (যেমন: কোলিক, ঘুম, খিচুড়ি)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 text-xs bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:border-[#2D7A68] focus:outline-none transition-all placeholder:text-slate-400"
          />
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`text-xs px-3.5 py-2 rounded-xl whitespace-nowrap font-medium transition-all ${
                selectedCategory === c.id
                  ? "bg-[#2D7A68] text-white font-bold shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Guide Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900">
              জরুরি পেডিয়াট্রিক সতর্কতা (কখন সাথে সাথে হাসপাতালে যাবেন?)
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
              শিশুর তাপমাত্রা ১০০.৪°F এর বেশি, টানা শ্বাসকষ্ট, ঠোঁট নীলচে হওয়া বা ২৪ ঘণ্টায় ৩ বারের কম প্রস্রাব হলে ঘরে চিকিৎসা না করে নিকটস্থ হাসপাতালে যান।
            </p>
          </div>
        </div>

        <a
          href="tel:16263"
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 transition-all shadow-xs"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          স্বাস্থ্য বাতায়ন: ১৬২৬৩
        </a>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => {
          const isBookmarked = bookmarkedArticleIds.includes(art.id);
          return (
            <Card
              key={art.id}
              className="border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between bg-white overflow-hidden group"
            >
              <CardContent className="p-6 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="text-xs">
                      {art.categoryLabel}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        {art.readingTime}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleBookmarkArticle(art.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isBookmarked
                            ? "bg-rose-50 text-rose-500 border-rose-200"
                            : "border-slate-200 text-slate-400 hover:text-slate-600"
                        }`}
                        title="সংরক্ষণ করুন"
                      >
                        <Heart className={`h-3.5 w-3.5 ${isBookmarked ? "fill-rose-500" : ""}`} />
                      </button>
                    </div>
                  </div>

                  <h3
                    onClick={() => openArticle(art)}
                    className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#2D7A68] cursor-pointer transition-colors"
                  >
                    {art.banglaTitle}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                {/* Medical Reviewer Footer */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-sky-900">
                    <div className="h-7 w-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                      <BadgeCheck className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs truncate">
                        {art.doctorReviewer.name}
                      </div>
                      <div className="text-[10px] text-sky-700 truncate">
                        {art.doctorReviewer.designation}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openArticle(art)}
                    className="w-full text-xs font-bold gap-1.5"
                  >
                    সম্পূর্ণ গাইড পড়ুন
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <ArticleDetailModal
        article={selectedArticle}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
