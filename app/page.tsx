"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBaby } from "@/context/BabyContext";
import { ageGroupPills } from "@/lib/mock-data";
import { AgeGroup, Product, KnowledgeArticle } from "@/lib/types";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { AskQuestionModal } from "@/components/community/AskQuestionModal";
import { ArticleDetailModal } from "@/components/knowledge/ArticleDetailModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Baby,
  ChevronRight,
  BookOpen,
  MessageSquareHeart,
  ShoppingBag,
  Milestone,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Heart,
  ShieldCheck,
  Stethoscope,
  Plus,
  ArrowRight,
  Star,
  Check,
} from "lucide-react";

export default function HomePage() {
  const {
    activeProfile,
    selectedAgeFilter,
    setSelectedAgeFilter,
    products,
    communityPosts,
    articles,
    milestones,
    toggleMilestone,
    bookmarkedProductIds,
    toggleBookmarkProduct,
  } = useBaby();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  const [askModalOpen, setAskModalOpen] = useState(false);

  // Filter items based on selected age filter
  const filteredProducts = products.filter((p) =>
    selectedAgeFilter === "all" ? true : p.ageGroups.includes(selectedAgeFilter)
  );

  const filteredArticles = articles.filter((a) =>
    selectedAgeFilter === "all" ? true : a.ageGroup === selectedAgeFilter || a.ageGroup === "all"
  );

  const filteredPosts = communityPosts.filter((post) =>
    selectedAgeFilter === "all" ? true : post.ageGroup === selectedAgeFilter
  );

  const currentAgeMilestones = milestones.filter(
    (m) => selectedAgeFilter === "all" || m.ageGroup === selectedAgeFilter
  );

  const completedMilestoneCount = currentAgeMilestones.filter((m) => m.isCompleted).length;
  const milestonePercent =
    currentAgeMilestones.length > 0
      ? Math.round((completedMilestoneCount / currentAgeMilestones.length) * 100)
      : 0;

  const openProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setProductModalOpen(true);
  };

  const openArticle = (art: KnowledgeArticle) => {
    setSelectedArticle(art);
    setArticleModalOpen(true);
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* 1. Personalized Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#246354] via-[#2D7A68] to-[#3B9B85] text-white p-6 sm:p-8 md:p-10 shadow-md">
        {/* Subtle decorative background shapes */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-12 -bottom-12 w-48 h-48 bg-[#E87A5D]/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-white/20">
            <Baby className="h-4 w-4 text-[#FDE047]" />
            <span>
              {activeProfile.name}-এর বয়স: <strong>{activeProfile.ageFormatted}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
            স্বাগতম! আজ আপনার শিশুর সুন্দর বিকাশের পাশে আছি আমরা।
          </h1>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#FDE047] text-emerald-950 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-200 block">
                  এই সপ্তাহের প্রধান মাইলস্টোন
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  পরিচিত কণ্ঠ ও মুখ দেখে হাসে এবং শব্দ শুনে মাথা ঘোরায়।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <Button
                variant="accent"
                size="sm"
                onClick={() => openArticle(articles[0])}
                className="text-xs font-bold flex-1 sm:flex-none"
              >
                ৩য় মাসের কেয়ার গাইড
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAskModalOpen(true)}
                className="text-xs font-semibold bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white flex-1 sm:flex-none"
              >
                প্রশ্ন করুন
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Age Filter Pills Bar */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Baby className="h-4 w-4 text-[#2D7A68]" />
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              শিশুর বয়স অনুযায়ী এক্সপ্লোর করুন
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            ১-ক্লিকে বয়স পরিবর্তন করুন
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {ageGroupPills.map((pill) => {
            const isSelected = selectedAgeFilter === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSelectedAgeFilter(pill.id as AgeGroup)}
                className={`shrink-0 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex flex-col items-center justify-center ${
                  isSelected
                    ? "bg-[#2D7A68] text-white border-[#2D7A68] shadow-sm font-bold scale-[1.02]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{pill.label}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? "text-emerald-100" : "text-slate-400"
                  }`}
                >
                  {pill.sub}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Section: Knowledge Hub Highlights */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#2D7A68]" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                নির্ভরযোগ্য নলেজ গাইড (চিকিৎসক দ্বারা পরীক্ষিত)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              নবজাতকের স্বাস্থ্য ও যত্ন বিষয়ক সহজবোধ্য তথ্য
            </p>
          </div>
          <Link
            href="/knowledge"
            className="text-xs sm:text-sm font-bold text-[#2D7A68] hover:underline flex items-center gap-1"
          >
            সবগুলো দেখুন
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {(filteredArticles.length > 0 ? filteredArticles : articles).slice(0, 3).map((art) => (
            <Card
              key={art.id}
              className="hover:shadow-md transition-all duration-200 border-slate-200/90 flex flex-col justify-between"
            >
              <CardContent className="p-5 space-y-3.5 flex flex-col justify-between h-full">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="default" className="text-[11px]">
                      {art.categoryLabel}
                    </Badge>
                    <span className="flex items-center gap-1 text-slate-400 font-medium">
                      <Clock className="h-3 w-3" />
                      {art.readingTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => openArticle(art)}
                    className="text-base font-bold text-slate-900 leading-snug hover:text-[#2D7A68] cursor-pointer transition-colors"
                  >
                    {art.banglaTitle}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-sky-800 font-medium">
                    <BadgeCheck className="h-4 w-4 text-sky-600 shrink-0" />
                    <span className="truncate max-w-[140px]">{art.doctorReviewer.name}</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openArticle(art)}
                    className="text-xs text-[#2D7A68] font-bold p-0 hover:bg-transparent"
                  >
                    পড়ুন <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Section: Parenting Community & Doctor Q&A */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquareHeart className="h-5 w-5 text-[#E87A5D]" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                প্যারেন্টিং কমিউনিটি ও বিশেষজ্ঞ ডাক্তারের পরামর্শ
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              অভিভাবকদের বাস্তব অভিজ্ঞতা এবং চিকিৎসকদের সঠিক উত্তর
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => setAskModalOpen(true)}
              className="text-xs gap-1.5 font-bold shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              প্রশ্ন করুন
            </Button>
            <Link
              href="/community"
              className="hidden sm:flex text-xs font-bold text-[#2D7A68] hover:underline items-center gap-1 ml-2"
            >
              সব আলোচনা
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {(filteredPosts.length > 0 ? filteredPosts : communityPosts).slice(0, 2).map((post) => (
            <Card
              key={post.id}
              className="border-slate-200/90 hover:border-slate-300 transition-all shadow-xs"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {post.isAnonymous ? "M" : post.authorName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {post.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        শিশুর বয়স: {post.babyAgeLabel} • {post.createdAt}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    #{post.topicTag}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Verified Doctor Highlight Box */}
                {post.doctorAnswer && (
                  <div className="bg-sky-50/80 border border-sky-200/80 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-sky-950 font-bold">
                        <BadgeCheck className="h-4 w-4 text-sky-600" />
                        <span>{post.doctorAnswer.doctorName}</span>
                        <span className="text-[10px] bg-sky-200/60 text-sky-800 px-1.5 py-0.2 rounded font-medium">
                          ভেরিফাইড পেডিয়াট্রিশিয়ান
                        </span>
                      </div>
                      <span className="text-[10px] text-sky-700">
                        {post.doctorAnswer.answeredAt}
                      </span>
                    </div>
                    <p className="text-xs text-sky-900 line-clamp-2 leading-relaxed">
                      {post.doctorAnswer.content}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span>❤️ {post.likes} জন উপকৃত হয়েছেন</span>
                    <span>💬 {post.commentCount} উত্তর</span>
                  </div>
                  <Link
                    href={`/community`}
                    className="font-bold text-[#2D7A68] hover:underline flex items-center gap-1"
                  >
                    বিস্তারিত দেখুন <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Section: Curated Safe Baby Products */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#2D7A68]" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                এই বয়সের জন্য নিরাপদ ও উপযোগী পণ্য
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ডাক্তারদের সেফটি গাইডলাইন সহ ১০০% খাঁটি শিশু যত্ন সামগ্রী
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-[#2D7A68] hover:underline flex items-center gap-1"
          >
            পুরো স্টোর দেখুন
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {(filteredProducts.length > 0 ? filteredProducts : products).slice(0, 4).map((product) => {
            const isBookmarked = bookmarkedProductIds.includes(product.id);
            return (
              <Card
                key={product.id}
                className="group border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-3 sm:p-4 space-y-3">
                  {/* Image container */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => toggleBookmarkProduct(product.id)}
                      className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md transition-all ${
                        isBookmarked
                          ? "bg-rose-50 text-rose-500"
                          : "bg-white/80 text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${isBookmarked ? "fill-rose-500" : ""}`} />
                    </button>
                    {product.isDoctorApproved && (
                      <div className="absolute bottom-2 left-2 bg-sky-950/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="h-2.5 w-2.5 text-sky-400" />
                        ডাক্তার অনুমোদিত
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {product.brand}
                    </div>
                    <h3
                      onClick={() => openProduct(product)}
                      className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 hover:text-[#2D7A68] cursor-pointer"
                    >
                      {product.banglaName || product.name}
                    </h3>
                  </div>

                  <div className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded inline-block font-medium">
                    বয়স: {product.ageRangeLabel}
                  </div>

                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-sm sm:text-base font-black text-[#2D7A68]">
                      ৳ {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-slate-400 line-through">
                        ৳ {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 sm:p-4 pt-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openProduct(product)}
                    className="w-full text-xs font-bold"
                  >
                    উপকারিতা ও ব্যবহার
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 6. Section: Mini Milestone Progress & Parenting Journey */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Milestone className="h-5 w-5 text-[#2D7A68]" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {activeProfile.name}-এর মাইলস্টোন ট্র্যাকার ({activeProfile.ageFormatted})
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              এই বয়সে শিশুর কোন কাজগুলো নিজে নিজে করতে পারার কথা?
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:w-48 bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#2D7A68] h-full rounded-full transition-all duration-500"
                style={{ width: `${milestonePercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#2D7A68] whitespace-nowrap">
              {milestonePercent}% অর্জিত
            </span>
            <Link href="/journey">
              <Button variant="outline" size="sm" className="text-xs font-semibold ml-2">
                পূর্ণাঙ্গ জার্নি
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          {currentAgeMilestones.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => toggleMilestone(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                item.isCompleted
                  ? "border-emerald-200 bg-emerald-50/50"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  item.isCompleted
                    ? "bg-[#2D7A68] border-[#2D7A68] text-white"
                    : "border-slate-300 bg-white text-transparent"
                }`}
              >
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h4
                  className={`text-xs sm:text-sm font-bold ${
                    item.isCompleted ? "text-emerald-950 line-through" : "text-slate-800"
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-[11px] text-[#2D7A68] font-medium pt-1">
                  💡 টিপস: {item.expertTip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
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

      <AskQuestionModal open={askModalOpen} onOpenChange={setAskModalOpen} />
    </div>
  );
}
