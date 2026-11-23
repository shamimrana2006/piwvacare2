"use client";

import React, { useState } from "react";
import { useBaby } from "@/context/BabyContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquareHeart, HelpCircle, Shield, Check } from "lucide-react";
import { AgeGroup } from "@/lib/types";

export function AskQuestionModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { activeProfile, addCommunityQuestion } = useBaby();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topicTag, setTopicTag] = useState("স্বাস্থ্য ও কান্না");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [success, setSuccess] = useState(false);

  const topics = [
    "কোলিক ও কান্না",
    "স্বাস্থ্য ও কান্না",
    "শিশুর ঘুম",
    "পুষ্টি ও প্রথম খাবার",
    "ত্বকের যত্ন ও র‍্যাশ",
    "অন্যান্য সমস্যা",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addCommunityQuestion({
      title,
      content,
      authorName: isAnonymous ? "Anonymous Mom (বেনামী মা)" : activeProfile.name + "-এর মা/বাবা",
      isAnonymous,
      babyAgeLabel: activeProfile.ageFormatted,
      ageGroup: activeProfile.ageGroup,
      topicTag,
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setTitle("");
      setContent("");
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 text-[#2D7A68]">
            <MessageSquareHeart className="h-6 w-6" />
            <DialogTitle>কমিউনিটিতে প্রশ্ন বা অভিজ্ঞতা শেয়ার করুন</DialogTitle>
          </div>
          <DialogDescription>
            অভিজ্ঞ মা-বাবা এবং ভেরিফাইড শিশু বিশেষজ্ঞদের নিকট থেকে নির্ভরযোগ্য পরামর্শ পান।
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="h-14 w-14 rounded-full bg-emerald-100 text-[#2D7A68] mx-auto flex items-center justify-center">
              <Check className="h-7 w-7 stroke-[3]" />
            </div>
            <h4 className="text-base font-bold text-slate-800">
              আপনার প্রশ্নটি সফলভাবে পোস্ট হয়েছে!
            </h4>
            <p className="text-xs text-slate-500">
              কমিউনিটির অন্যান্য অভিভাবক ও বিশেষজ্ঞ ডাক্তারদের মতামত পেলে আপনাকে জানানো হবে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Baby Age Auto-tag notice */}
            <div className="flex items-center justify-between bg-[#EBF5F1]/70 border border-[#C5E5D8] px-3.5 py-2 rounded-xl text-xs text-[#246354]">
              <span>
                শিশুর প্রোফাইল: <strong>{activeProfile.name}</strong> ({activeProfile.ageFormatted})
              </span>
              <span className="font-semibold text-[11px] bg-white px-2 py-0.5 rounded-md border border-[#C5E5D8]">
                বয়স ট্যাগ যুক্ত হবে
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                টপিক বা ক্যাটাগরি বেছে নিন
              </label>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopicTag(t)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      topicTag === t
                        ? "bg-[#2D7A68] text-white border-[#2D7A68]"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                প্রশ্নের মূল শিরোনাম
              </label>
              <Input
                placeholder="যেমন: ৩ মাসের শিশুর রাতে ঘন ঘন কান্না - কী করতে পারি?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                বিস্তারিত বর্ণনা (লক্ষণ, কয়দিন ধরে হচ্ছে, কী খাইয়েছেন ইত্যাদি)
              </label>
              <textarea
                rows={4}
                placeholder="শিশুর সমস্যার বিস্তারিত লিখুন যাতে ডাক্তার ও অভিজ্ঞ মা-বাবারা সঠিক পরামর্শ দিতে পারেন..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="flex w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D7A68] focus-visible:border-transparent transition-all"
              />
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 text-slate-500" />
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    বেনামী (Anonymous) হিসেবে পোস্ট করুন
                  </div>
                  <div className="text-[11px] text-slate-500">
                    আপনার নাম বা প্রোফাইল কারো কাছে প্রদর্শিত হবে না
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 rounded text-[#2D7A68] focus:ring-[#2D7A68] border-slate-300 cursor-pointer"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                বাতিল
              </Button>
              <Button type="submit" variant="default" className="flex-1 font-bold">
                প্রশ্ন সাবমিট করুন
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
