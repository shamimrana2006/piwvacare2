"use client";

import React, { useState } from "react";
import { useBaby } from "@/context/BabyContext";
import { BabySwitcherModal } from "@/components/common/BabySwitcherModal";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { ArticleDetailModal } from "@/components/knowledge/ArticleDetailModal";
import { Product, KnowledgeArticle } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Milestone,
  Baby,
  Calendar,
  Syringe,
  CheckCircle2,
  Clock,
  Sparkles,
  Heart,
  Scale,
  Ruler,
  AlertCircle,
  Bookmark,
  ChevronRight,
  Plus,
  Check,
} from "lucide-react";

export default function JourneyPage() {
  const {
    activeProfile,
    milestones,
    toggleMilestone,
    vaccines,
    toggleVaccine,
    products,
    articles,
    bookmarkedProductIds,
    bookmarkedArticleIds,
  } = useBaby();

  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"milestones" | "vaccines" | "bookmarks">("milestones");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  const completedMilestones = milestones.filter((m) => m.isCompleted).length;
  const totalMilestones = milestones.length;
  const milestonePercent = Math.round((completedMilestones / totalMilestones) * 100);

  const completedVaccines = vaccines.filter((v) => v.isCompleted).length;
  const totalVaccines = vaccines.length;
  const vaccinePercent = Math.round((completedVaccines / totalVaccines) * 100);

  const savedProducts = products.filter((p) => bookmarkedProductIds.includes(p.id));
  const savedArticles = articles.filter((a) => bookmarkedArticleIds.includes(a.id));

  return (
    <div className="space-y-8">
      {/* 1. Baby Profile Banner Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            className={`h-18 w-18 sm:h-20 sm:w-20 rounded-3xl flex items-center justify-center shrink-0 shadow-sm ${
              activeProfile.gender === "girl"
                ? "bg-gradient-to-tr from-pink-400 to-rose-300 text-white"
                : "bg-gradient-to-tr from-[#2D7A68] to-[#43B89E] text-white"
            }`}
          >
            <Baby className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeProfile.name}
              </h1>
              <Badge variant="default" className="text-xs">
                {activeProfile.ageFormatted}
              </Badge>
            </div>

            <p className="text-xs text-slate-500">
              জন্ম তারিখ: <span className="font-semibold text-slate-700">{activeProfile.birthDate}</span>
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs text-slate-600">
              {activeProfile.currentWeightKg && (
                <span className="flex items-center gap-1 font-medium">
                  <Scale className="h-3.5 w-3.5 text-slate-400" />
                  ওজন: <strong>{activeProfile.currentWeightKg} কেজি</strong>
                </span>
              )}
              {activeProfile.currentHeightCm && (
                <span className="flex items-center gap-1 font-medium">
                  <Ruler className="h-3.5 w-3.5 text-slate-400" />
                  উচ্চতা: <strong>{activeProfile.currentHeightCm} সেমি</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setSwitcherOpen(true)}
          className="gap-2 font-bold text-xs sm:text-sm border-slate-200 hover:border-[#2D7A68] hover:text-[#2D7A68]"
        >
          <Baby className="h-4 w-4" />
          প্রোফাইল পরিবর্তন / নতুন শিশু যুক্ত করুন
        </Button>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto self-start">
        <button
          type="button"
          onClick={() => setActiveTab("milestones")}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "milestones"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Milestone className="h-4 w-4 text-[#2D7A68]" />
          <span>মাইলস্টোন ট্র্যাকার ({completedMilestones}/{totalMilestones})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("vaccines")}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "vaccines"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Syringe className="h-4 w-4 text-sky-600" />
          <span>EPI টিকাদান কার্ড ({completedVaccines}/{totalVaccines})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bookmarks")}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "bookmarks"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Bookmark className="h-4 w-4 text-[#E87A5D]" />
          <span>সংরক্ষিত আইটেম ({savedProducts.length + savedArticles.length})</span>
        </button>
      </div>

      {/* Tab 1: Milestones */}
      {activeTab === "milestones" && (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="bg-[#EBF5F1]/70 border border-[#C5E5D8] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#246354]">
                বিকাশমূলক মাইলস্টোন অগ্রগতি
              </h3>
              <p className="text-xs text-[#2D7A68]">
                শিশুর শারীরিক ও মানসিক অর্জনগুলো পর্যবেক্ষণ করুন এবং টিকচিহ্ন দিন।
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:w-48 bg-white h-3 rounded-full overflow-hidden border border-[#C5E5D8]">
                <div
                  className="bg-[#2D7A68] h-full rounded-full transition-all duration-500"
                  style={{ width: `${milestonePercent}%` }}
                />
              </div>
              <span className="text-sm font-black text-[#246354] whitespace-nowrap">
                {milestonePercent}% সম্পন্ন
              </span>
            </div>
          </div>

          {/* Milestone Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((item) => (
              <Card
                key={item.id}
                onClick={() => toggleMilestone(item.id)}
                className={`transition-all cursor-pointer border ${
                  item.isCompleted
                    ? "border-emerald-200 bg-emerald-50/40"
                    : "border-slate-200/90 hover:border-slate-300 bg-white"
                }`}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div
                    className={`h-6 w-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      item.isCompleted
                        ? "bg-[#2D7A68] border-[#2D7A68] text-white"
                        : "border-slate-300 bg-white text-transparent"
                    }`}
                  >
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {item.ageLabel} • {item.category}
                      </span>
                      {item.isCompleted && (
                        <Badge variant="default" className="text-[10px]">
                          অর্জিত হয়েছে
                        </Badge>
                      )}
                    </div>

                    <h4
                      className={`text-sm sm:text-base font-bold ${
                        item.isCompleted ? "text-emerald-950 line-through" : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 text-xs text-[#2D7A68] font-semibold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span>টিপস: {item.expertTip}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Vaccines (EPI Schedule Bangladesh) */}
      {activeTab === "vaccines" && (
        <div className="space-y-6">
          {/* Upcoming vaccine reminder */}
          <div className="bg-sky-50 border border-sky-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                <Syringe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-sky-950">
                  বাংলাদেশ জাতীয় ইপিআই টিকাদান সূচি
                </h3>
                <p className="text-xs text-sky-800 leading-relaxed mt-0.5">
                  নির্ধারিত সময়ে সরকারি স্বাস্থ্য কমপ্লেক্স বা যেকোনো ইপিআই কেন্দ্র থেকে বিনামূল্যে টিকা গ্রহণ নিশ্চিত করুন।
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-sky-900 block">
                সম্পূর্ণ হয়েছে: {completedVaccines} / {totalVaccines}
              </span>
              <span className="text-[11px] text-sky-700">পরবর্তী টিকা: ১৪ সপ্তাহ</span>
            </div>
          </div>

          {/* Vaccine Cards */}
          <div className="space-y-3">
            {vaccines.map((v) => (
              <div
                key={v.id}
                onClick={() => toggleVaccine(v.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  v.isCompleted
                    ? "bg-slate-50/80 border-slate-200 opacity-90"
                    : "bg-white border-sky-200 shadow-xs"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`h-6 w-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                      v.isCompleted
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 bg-white text-transparent"
                    }`}
                  >
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md">
                        {v.ageLabel}
                      </span>
                      <h4
                        className={`text-sm sm:text-base font-bold ${
                          v.isCompleted ? "line-through text-slate-500" : "text-slate-900"
                        }`}
                      >
                        {v.vaccineName}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      <strong>প্রতিরোধক রোগ:</strong> {v.preventedDisease}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-0.5">
                      ডোজ: {v.doses} • {v.notes}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={v.isCompleted ? "secondary" : "doctor"}
                  className="text-xs shrink-0"
                >
                  {v.isCompleted ? "টিকা দেওয়া সম্পন্ন" : "আসন্ন নির্ধারিত ডোজ"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Saved / Bookmarks */}
      {activeTab === "bookmarks" && (
        <div className="space-y-6">
          {/* Saved Products */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
              সংরক্ষিত প্রোডাক্টস ({savedProducts.length})
            </h3>
            {savedProducts.length === 0 ? (
              <p className="text-xs text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center">
                কোনো প্রোডাক্ট সংরক্ষিত নেই। পছন্দের প্রোডাক্টে হার্ট আইকনে ক্লিক করে সংরক্ষণ করুন।
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedProducts.map((p) => (
                  <Card key={p.id} className="p-4 flex items-center gap-4 bg-white">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-16 w-16 rounded-xl object-cover border border-slate-100"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {p.banglaName || p.name}
                      </h4>
                      <p className="text-xs font-bold text-[#2D7A68]">৳ {p.price}</p>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setSelectedProduct(p);
                          setProductModalOpen(true);
                        }}
                        className="text-[10px] h-7 px-2 font-bold"
                      >
                        বিস্তারিত দেখুন
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Saved Articles */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-[#2D7A68]" />
              সংরক্ষিত নলেজ গাইডসমূহ ({savedArticles.length})
            </h3>
            {savedArticles.length === 0 ? (
              <p className="text-xs text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center">
                কোনো গাইড সংরক্ষিত নেই। নলেজ হাব থেকে প্রয়োজনীয় গাইড সেভ করুন।
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedArticles.map((a) => (
                  <Card key={a.id} className="p-4 space-y-2 bg-white">
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="default" className="text-[10px]">
                        {a.categoryLabel}
                      </Badge>
                      <span className="text-slate-400">{a.readingTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {a.banglaTitle}
                    </h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedArticle(a);
                        setArticleModalOpen(true);
                      }}
                      className="text-xs text-[#2D7A68] p-0 font-bold hover:bg-transparent"
                    >
                      গাইডটি পড়ুন <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <BabySwitcherModal open={switcherOpen} onOpenChange={setSwitcherOpen} />
      <ProductDetailModal
        product={selectedProduct}
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
      />
      <ArticleDetailModal
        article={selectedArticle}
        open={articleModalOpen}
        onOpenChange={setArticleModalOpen}
      />
    </div>
  );
}
