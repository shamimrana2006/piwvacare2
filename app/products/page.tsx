"use client";

import React, { useState } from "react";
import { useBaby } from "@/context/BabyContext";
import { ageGroupPills } from "@/lib/mock-data";
import { AgeGroup, Product } from "@/lib/types";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Search,
  Filter,
  ShieldCheck,
  Star,
  Heart,
  Baby,
  Sparkles,
  SlidersHorizontal,
  X,
  Stethoscope,
  Info,
} from "lucide-react";

export default function ProductsPage() {
  const {
    products,
    selectedAgeFilter,
    setSelectedAgeFilter,
    bookmarkedProductIds,
    toggleBookmarkProduct,
    activeProfile,
  } = useBaby();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedConcern, setSelectedConcern] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const categories = [
    { id: "all", label: "সকল ক্যাটাগরি" },
    { id: "skincare", label: "স্কিনকেয়ার ও গোসল" },
    { id: "diapering", label: "ডায়াপারিং ও যত্ন" },
    { id: "feeding", label: "পুষ্টি ও ফিডিং" },
    { id: "health", label: "শিশুর স্বাস্থ্য" },
    { id: "clothing", label: "পোশাক ও গিয়ার" },
  ];

  const commonConcerns = [
    { id: "all", label: "সকল সমস্যা" },
    { id: "ডায়াপার র‍্যাশ", label: "ডায়াপার র‍্যাশ" },
    { id: "কোলিক", label: "কোলিক / পেটে গ্যাস" },
    { id: "শুষ্ক ত্বক", label: "শুষ্ক ত্বক / চুলকানি" },
    { id: "বন্ধ নাক", label: "বন্ধ নাক ও সর্দি" },
    { id: "দাঁত ওঠার ব্যথা", label: "দাঁত ওঠার অস্বস্তি" },
    { id: "ঘুমের সমস্যা", label: "ঘুমের সমস্যা" },
  ];

  // Filtering logic
  const filteredProducts = products.filter((p) => {
    // Age filter
    const matchesAge =
      selectedAgeFilter === "all" || p.ageGroups.includes(selectedAgeFilter);

    // Category filter
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;

    // Concern filter
    const matchesConcern =
      selectedConcern === "all" ||
      p.concernTags.some((tag) => tag.includes(selectedConcern));

    // Keyword search
    const matchesKeyword =
      !searchKeyword.trim() ||
      p.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (p.banglaName && p.banglaName.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      p.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      p.concernTags.some((t) => t.toLowerCase().includes(searchKeyword.toLowerCase()));

    return matchesAge && matchesCategory && matchesConcern && matchesKeyword;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // popular
  });

  const openDetails = (p: Product) => {
    setSelectedProduct(p);
    setDetailModalOpen(true);
  };

  const resetFilters = () => {
    setSelectedAgeFilter("all");
    setSelectedCategory("all");
    setSelectedConcern("all");
    setSearchKeyword("");
  };

  const hasActiveFilters =
    selectedAgeFilter !== "all" ||
    selectedCategory !== "all" ||
    selectedConcern !== "all" ||
    Boolean(searchKeyword.trim());

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-[#EBF5F1] text-[#246354] px-3 py-1 rounded-full text-xs font-bold">
            <ShieldCheck className="h-4 w-4" />
            <span>১০০% খাঁটি ও চিকিৎসকের সেফটি গাইডলাইন সমৃদ্ধ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            স্মার্ট বেবি কেয়ার প্রোডাক্টস
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            আপনার শিশুর বয়স ও সমস্যা অনুযায়ী বিজ্ঞানসম্মত উপায়ে নিরাপদ শিশু যত্ন পণ্য নির্বাচন করুন।
          </p>
        </div>

        {/* Baby Profile Age Match Pill */}
        <div className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#2D7A68] text-white flex items-center justify-center">
            <Baby className="h-5 w-5" />
          </div>
          <div className="text-xs">
            <span className="text-slate-500 block">বর্তমান সক্রিয় শিশু:</span>
            <span className="font-bold text-slate-800">
              {activeProfile.name} ({activeProfile.ageFormatted})
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedAgeFilter(activeProfile.ageGroup)}
            className="text-xs font-semibold text-[#2D7A68] border-[#2D7A68]/30 ml-2"
          >
            এই বয়সের ফিল্টার
          </Button>
        </div>
      </div>

      {/* Main Content: Sidebar Filter (Desktop) + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 bg-white border border-slate-200/90 rounded-3xl p-5 space-y-6 shadow-xs sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <SlidersHorizontal className="h-4 w-4 text-[#2D7A68]" />
              <span>ফিল্টারিং অপশন</span>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#E87A5D] font-bold hover:underline"
              >
                রিসেট
              </button>
            )}
          </div>

          {/* Age Filter Section */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              শিশুর বয়সসীমা
            </label>
            <div className="space-y-1">
              {ageGroupPills.map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedAgeFilter(pill.id as AgeGroup)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedAgeFilter === pill.id
                      ? "bg-[#2D7A68] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`text-[10px] ${
                      selectedAgeFilter === pill.id ? "text-emerald-100" : "text-slate-400"
                    }`}
                  >
                    {pill.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Section */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ক্যাটাগরি
            </label>
            <div className="space-y-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === c.id
                      ? "bg-[#EBF5F1] text-[#246354] border border-[#C5E5D8]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Problem / Concern Filter Section */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              সমস্যা বা কনসার্ন
            </label>
            <div className="flex flex-wrap gap-1.5">
              {commonConcerns.map((con) => (
                <button
                  key={con.id}
                  type="button"
                  onClick={() => setSelectedConcern(con.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                    selectedConcern === con.id
                      ? "bg-[#E87A5D] text-white border-[#E87A5D]"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {con.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Catalog Listing Area */}
        <div className="lg:col-span-9 space-y-4">
          {/* Search, Mobile Filter Trigger & Sort Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="প্রোডাক্ট বা ব্র্যান্ড খুঁজুন..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-xs bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:border-[#2D7A68] focus:outline-none transition-all placeholder:text-slate-400"
              />
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden text-xs gap-1.5"
              >
                <Filter className="h-3.5 w-3.5" />
                ফিল্টার {hasActiveFilters && "•"}
              </Button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium hidden sm:inline">সাজান:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#2D7A68]"
                >
                  <option value="popular">সর্বাধিক জনপ্রিয়</option>
                  <option value="rating">চিকিৎসক রেটিং</option>
                  <option value="price-asc">দাম: কম থেকে বেশি</option>
                  <option value="price-desc">দাম: বেশি থেকে কম</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Dropdown (Conditional) */}
          {mobileFilterOpen && (
            <div className="lg:hidden bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800">ফিল্টার নির্ধারণ করুন</h4>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">বয়স</label>
                <div className="flex flex-wrap gap-1.5">
                  {ageGroupPills.map((pill) => (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => setSelectedAgeFilter(pill.id as AgeGroup)}
                      className={`text-xs px-2.5 py-1 rounded-lg border ${
                        selectedAgeFilter === pill.id
                          ? "bg-[#2D7A68] text-white border-[#2D7A68]"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 mb-1.5 block">ক্যাটাগরি</label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCategory(c.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg border ${
                        selectedCategory === c.id
                          ? "bg-[#EBF5F1] text-[#246354] border-[#C5E5D8]"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400 font-medium">সক্রিয় ফিল্টার:</span>
              {selectedAgeFilter !== "all" && (
                <span className="bg-[#EBF5F1] text-[#246354] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                  বয়স: {selectedAgeFilter}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedAgeFilter("all")}
                  />
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                  ক্যাটাগরি: {categories.find((c) => c.id === selectedCategory)?.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedCategory("all")}
                  />
                </span>
              )}
              {selectedConcern !== "all" && (
                <span className="bg-[#FFF2ED] text-[#E87A5D] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                  সমস্যা: {selectedConcern}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedConcern("all")}
                  />
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:underline"
              >
                সব মুছুন
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                কোনো প্রোডাক্ট খুঁজে পাওয়া যায়নি
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                অন্য কোনো বয়স বা ফিল্টার নির্বাচন করে চেষ্টা করুন।
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters} className="text-xs">
                সকল ফিল্টার রিসেট করুন
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedProducts.map((product) => {
                const isBookmarked = bookmarkedProductIds.includes(product.id);
                return (
                  <Card
                    key={product.id}
                    className="group border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden bg-white"
                  >
                    <div className="p-4 sm:p-5 space-y-3.5">
                      {/* Image container */}
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => toggleBookmarkProduct(product.id)}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all ${
                            isBookmarked
                              ? "bg-rose-50 text-rose-500"
                              : "bg-white/90 text-slate-400 hover:text-slate-600"
                          }`}
                          title="সংরক্ষণ করুন"
                        >
                          <Heart
                            className={`h-4 w-4 ${isBookmarked ? "fill-rose-500" : ""}`}
                          />
                        </button>
                        {product.isDoctorApproved && (
                          <div className="absolute bottom-2.5 left-2.5 bg-sky-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                            <ShieldCheck className="h-3 w-3 text-sky-400" />
                            চিকিৎসক পরীক্ষিত
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                          <span>{product.brand}</span>
                          <span className="text-slate-600 font-semibold lowercase">
                            {product.categoryLabel}
                          </span>
                        </div>

                        <h3
                          onClick={() => openDetails(product)}
                          className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 hover:text-[#2D7A68] cursor-pointer transition-colors"
                        >
                          {product.banglaName || product.name}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {product.shortDesc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        <span className="text-[10px] bg-[#EBF5F1] text-[#246354] px-2 py-0.5 rounded-md font-semibold">
                          বয়স: {product.ageRangeLabel}
                        </span>
                        {product.concernTags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-baseline gap-2 pt-2 border-t border-slate-100">
                        <span className="text-lg sm:text-xl font-black text-[#2D7A68]">
                          ৳ {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ৳ {product.originalPrice}
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="text-[10px] font-bold text-[#E87A5D] bg-[#FFF2ED] px-2 py-0.5 rounded-full ml-auto">
                            ৳ {product.originalPrice - product.price} ছাড়
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => openDetails(product)}
                        className="w-full text-xs font-bold gap-1.5 py-4.5"
                      >
                        <Info className="h-3.5 w-3.5" />
                        উপকারিতা ও ব্যবহারবিধি
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
      />
    </div>
  );
}
