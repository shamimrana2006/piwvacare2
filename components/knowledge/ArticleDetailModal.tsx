"use client";

import React, { useState } from "react";
import { KnowledgeArticle } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBaby } from "@/context/BabyContext";
import {
  BookOpen,
  Clock,
  BadgeCheck,
  CheckCircle2,
  XCircle,
  Volume2,
  Heart,
  Share2,
} from "lucide-react";

export function ArticleDetailModal({
  article,
  open,
  onOpenChange,
}: {
  article: KnowledgeArticle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { bookmarkedArticleIds, toggleBookmarkArticle } = useBaby();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!article) return null;

  const isBookmarked = bookmarkedArticleIds.includes(article.id);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-xs">
                {article.categoryLabel}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => toggleBookmarkArticle(article.id)}
                className={`p-2 rounded-xl border transition-all ${
                  isBookmarked
                    ? "bg-rose-50 border-rose-200 text-rose-500"
                    : "border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
                title="সংরক্ষণ করুন"
              >
                <Heart className={`h-4 w-4 ${isBookmarked ? "fill-rose-500" : ""}`} />
              </button>
            </div>
          </div>

          <DialogTitle className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
            {article.banglaTitle}
          </DialogTitle>
          <p className="text-xs text-slate-500 font-medium">{article.title}</p>

          {/* Medical Reviewer Bar */}
          <div className="flex items-center gap-3 p-3 bg-sky-50 border border-sky-100 rounded-xl">
            <div className="h-10 w-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-sky-950">
                  {article.doctorReviewer.name}
                </span>
                <Badge variant="doctor" className="text-[10px] py-0 px-1.5">
                  ভেরিফাইড পেডিয়াট্রিশিয়ান
                </Badge>
              </div>
              <p className="text-[11px] text-sky-800">
                {article.doctorReviewer.designation}
              </p>
            </div>

            {/* Audio Listen Simulator */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAudio}
              className={`text-xs gap-1.5 border-sky-200 ${
                isPlayingAudio ? "bg-sky-600 text-white hover:bg-sky-700" : "text-sky-700"
              }`}
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>{isPlayingAudio ? "অডিও চলছে..." : "অডিও শুনুন"}</span>
            </Button>
          </div>
        </DialogHeader>

        {/* Article Content */}
        <div className="space-y-6 pt-2">
          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            💡 <strong>সারসংক্ষেপ:</strong> {article.summary}
          </div>

          {/* Do's and Don'ts Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Do's */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                কী করবেন (Do's)
              </div>
              <ul className="space-y-2 text-xs text-emerald-950">
                {article.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-3">
                <XCircle className="h-4 w-4 text-rose-600" />
                কী করবেন না (Don'ts)
              </div>
              <ul className="space-y-2 text-xs text-rose-950">
                {article.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-rose-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Content Sections */}
          <div className="space-y-4 pt-2">
            {article.sections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="text-base font-bold text-slate-900">
                  {section.heading}
                </h4>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Medical Notice */}
          <div className="p-4 rounded-xl bg-slate-100 text-[11px] text-slate-500 leading-relaxed">
            * এই তথ্যাবলী আমেরিকান একাডেমি অব পেডিয়াট্রিক্স (AAP) এবং বাংলাদেশ পেডিয়াট্রিক এসোসিয়েশন (BPA)-এর সাধারণ নির্দেশিকার আলোকে সংকলিত। জরুরি প্রয়োজনে নিকটস্থ চিকিৎসকের পরামর্শ নিন।
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
