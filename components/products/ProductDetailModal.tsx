"use client";

import React, { useState } from "react";
import { Product } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBaby } from "@/context/BabyContext";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  AlertTriangle,
  Info,
  Stethoscope,
  Heart,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

export function ProductDetailModal({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { bookmarkedProductIds, toggleBookmarkProduct } = useBaby();
  const [activeTab, setActiveTab] = useState("benefits");
  const [addedAlert, setAddedAlert] = useState(false);

  if (!product) return null;

  const isBookmarked = bookmarkedProductIds.includes(product.id);

  const handleAddToCart = () => {
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Product Image & Badges */}
          <div className="md:col-span-5 bg-slate-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="default" className="text-[11px]">
                  {product.categoryLabel}
                </Badge>
                {product.isDoctorApproved && (
                  <Badge variant="doctor" className="text-[11px]">
                    <ShieldCheck className="h-3 w-3 mr-1 text-sky-600" />
                    চিকিৎসক পরীক্ষিত
                  </Badge>
                )}
              </div>

              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-200/60 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 fill-current ${
                        i < Math.floor(product.rating)
                          ? "text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-700">{product.rating}</span>
                <span>({product.reviewCount} অভিভাবকের রিভিউ)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 mt-4">
              <div className="text-xs text-slate-500 mb-1">উপযুক্ত বয়সসীমা:</div>
              <div className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg inline-block">
                {product.ageRangeLabel}
              </div>
            </div>
          </div>

          {/* Details & Information Tabs */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {product.brand}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mt-0.5">
                    {product.banglaName || product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{product.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleBookmarkProduct(product.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    isBookmarked
                      ? "bg-rose-50 border-rose-200 text-rose-500"
                      : "border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                  title={isBookmarked ? "সংরক্ষণ থেকে সরান" : "সংরক্ষণ করুন"}
                >
                  <Heart className={`h-4 w-4 ${isBookmarked ? "fill-rose-500" : ""}`} />
                </button>
              </div>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-2.5 mt-3">
                <span className="text-2xl font-black text-[#2D7A68]">
                  ৳ {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ৳ {product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold text-[#E87A5D] bg-[#FFF2ED] px-2 py-0.5 rounded-full">
                    ৳ {product.originalPrice - product.price} সাশ্রয়
                  </span>
                )}
              </div>

              {/* Concern Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {product.concernTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Information Tabs */}
              <div className="mt-5">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-3 h-9 p-0.5">
                    <TabsTrigger value="benefits" className="text-xs py-1">
                      উপকারিতা
                    </TabsTrigger>
                    <TabsTrigger value="usage" className="text-xs py-1">
                      ব্যবহারবিধি
                    </TabsTrigger>
                    <TabsTrigger value="safety" className="text-xs py-1">
                      সতর্কতা
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="benefits" className="space-y-2 mt-3">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {product.shortDesc}
                    </p>
                    <ul className="space-y-1.5 pt-1">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#2D7A68] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="usage" className="space-y-2 mt-3">
                    <div className="bg-[#EBF5F1]/50 border border-[#C5E5D8] rounded-xl p-3">
                      <h4 className="text-xs font-bold text-[#246354] mb-1.5 flex items-center gap-1.5">
                        <Info className="h-3.5 w-3.5" />
                        ধাপে ধাপে ব্যবহারের সঠিক নিয়ম
                      </h4>
                      <ol className="space-y-1.5 text-xs text-slate-700">
                        {product.usageGuide.map((step, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-bold text-[#2D7A68]">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </TabsContent>

                  <TabsContent value="safety" className="space-y-2 mt-3">
                    {product.pediatricianNote && (
                      <div className="bg-sky-50 border border-sky-200 rounded-xl p-3">
                        <h4 className="text-xs font-bold text-sky-800 mb-1 flex items-center gap-1.5">
                          <Stethoscope className="h-3.5 w-3.5 text-sky-600" />
                          শিশুরোগ বিশেষজ্ঞের মতামত
                        </h4>
                        <p className="text-xs text-sky-900 leading-relaxed">
                          {product.pediatricianNote}
                        </p>
                      </div>
                    )}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <h4 className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                        প্রয়োজনীয় সতর্কতা
                      </h4>
                      <ul className="space-y-1 text-xs text-amber-900">
                        {product.safetyWarnings.map((w, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span>•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-slate-100 mt-5 space-y-2">
              {addedAlert && (
                <div className="text-xs text-center font-bold text-emerald-700 bg-emerald-50 py-1.5 rounded-lg border border-emerald-200 animate-in fade-in">
                  প্রোডাক্টটি সফলভাবে অর্ডারের জন্য প্রস্তুত করা হয়েছে!
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  variant="default"
                  onClick={handleAddToCart}
                  className="flex-1 gap-2 font-bold py-5"
                >
                  <ShoppingBag className="h-4 w-4" />
                  অর্ডার করুন (৳ {product.price})
                </Button>
              </div>
              <p className="text-[11px] text-center text-slate-400">
                ঢাকা সিটিতে ২৪ ঘণ্টায় ও সারা বাংলাদেশে ৪৮ ঘণ্টায় নিরাপদ ডেলিভারি
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
