"use client";

import React, { useState } from "react";
import { useBaby } from "@/context/BabyContext";
import { CommunityPost } from "@/lib/types";
import { AskQuestionModal } from "@/components/community/AskQuestionModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageSquareHeart,
  Plus,
  BadgeCheck,
  Shield,
  Heart,
  MessageCircle,
  Stethoscope,
  AlertCircle,
  Send,
  User,
  Share2,
  Sparkles,
} from "lucide-react";

export default function CommunityPage() {
  const { communityPosts, addCommentToPost, activeProfile } = useBaby();
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | "doctor" | "trending">("all");
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const topics = [
    { id: "all", label: "সকল আলোচনা" },
    { id: "কোলিক ও কান্না", label: "কোলিক ও কান্না" },
    { id: "প্রথম সলিড খাবার", label: "প্রথম সলিড খাবার" },
    { id: "নবজাতকের শীতকালীন যত্ন", label: "শীতকালীন যত্ন" },
    { id: "শিশুর ঘুম", label: "ঘুমের সমস্যা" },
  ];

  const filteredPosts = communityPosts.filter((post) => {
    if (selectedTopic !== "all" && post.topicTag !== selectedTopic) return false;
    if (activeTab === "doctor" && !post.doctorAnswer) return false;
    return true;
  });

  const handleCommentChange = (postId: string, text: string) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: text }));
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    addCommentToPost(postId, text, activeProfile.name + "-এর আম্মু/আব্বু");
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Community Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-[#E87A5D] to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            <MessageSquareHeart className="h-4 w-4" />
            <span>অভিভাবকদের নিরাপদ সহমর্মী নেটওয়ার্ক</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            প্যারেন্টিং কমিউনিটি ও বিশেষজ্ঞ পরামর্শ
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            শিশুর বিকাশ ও স্বাস্থ্য নিয়ে আপনার যেকোনো প্রশ্ন নির্দ্বিধায় করুন। অভিজ্ঞ মা-বাবাদের পাশাপাশি ভেরিফাইড শিশু বিশেষজ্ঞরা নিয়মিত উত্তর দিয়ে থাকেন।
          </p>
        </div>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => setAskModalOpen(true)}
          className="bg-white text-orange-900 hover:bg-white/90 font-bold gap-2 shrink-0 shadow-md py-6 px-6 text-sm"
        >
          <Plus className="h-5 w-5" />
          নতুন প্রশ্ন করুন
        </Button>
      </div>

      {/* Filter Tabs & Topic Pills */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
          {/* Main Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "all"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              সকল আলোচনা
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("doctor")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "doctor"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              ডাক্তারের উত্তর সহ
            </button>
          </div>

          {/* Topic Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {topics.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTopic(t.id)}
                className={`text-xs px-3 py-1.5 rounded-xl border whitespace-nowrap font-medium transition-all ${
                  selectedTopic === t.id
                    ? "bg-[#2D7A68] text-white border-[#2D7A68] font-bold"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts.includes(post.id);
          const likeCount = post.likes + (isLiked ? 1 : 0);

          return (
            <Card
              key={post.id}
              className="border-slate-200/90 hover:border-slate-300 transition-all shadow-xs overflow-hidden"
            >
              <CardContent className="p-5 sm:p-7 space-y-5">
                {/* Author Info & Topic */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-11 w-11 rounded-2xl flex items-center justify-center font-bold text-sm ${
                        post.isAnonymous
                          ? "bg-slate-100 text-slate-500"
                          : "bg-[#EBF5F1] text-[#2D7A68]"
                      }`}
                    >
                      {post.isAnonymous ? (
                        <Shield className="h-5 w-5 text-slate-500" />
                      ) : (
                        <User className="h-5 w-5 text-[#2D7A68]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {post.authorName}
                        </span>
                        {post.isAnonymous && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                            বেনামী অভিভাবক
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          বয়স: {post.babyAgeLabel}
                        </span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <Badge variant="secondary" className="text-xs">
                    #{post.topicTag}
                  </Badge>
                </div>

                {/* Question Title & Content */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Verified Pediatrician Answer Box */}
                {post.doctorAnswer && (
                  <div className="bg-gradient-to-br from-sky-50 via-sky-50/70 to-blue-50 border border-sky-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
                    <div className="flex items-start justify-between gap-3 border-b border-sky-200/60 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Stethoscope className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-sky-950">
                              {post.doctorAnswer.doctorName}
                            </h3>
                            <BadgeCheck className="h-4 w-4 text-sky-600" />
                          </div>
                          <p className="text-xs text-sky-800">
                            {post.doctorAnswer.doctorTitle} • {post.doctorAnswer.institution}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-sky-700 font-medium">
                        {post.doctorAnswer.answeredAt}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-sky-950 leading-relaxed whitespace-pre-line font-medium">
                      {post.doctorAnswer.content}
                    </div>

                    {/* Red Flags Alert if any */}
                    {post.doctorAnswer.redFlags && (
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-1.5 mt-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                          <AlertCircle className="h-4 w-4 text-rose-600" />
                          জরুরি বিপদচিহ্ন (Red Flags) - ডাক্তার দেখাবেন:
                        </div>
                        <ul className="space-y-1 text-xs text-rose-950">
                          {post.doctorAnswer.redFlags.map((flag, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="font-bold">•</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Post Footer Reaction Counts */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isLiked
                          ? "bg-rose-50 border-rose-200 text-rose-600 font-bold"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-rose-600" : ""}`} />
                      <span>উপকৃত ({likeCount})</span>
                    </button>

                    <div className="flex items-center gap-1 text-slate-500 font-medium px-2 py-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments.length} টি উত্তর</span>
                    </div>
                  </div>
                </div>

                {/* Comment Section (Parents responses) */}
                <div className="space-y-3 pt-2">
                  {post.comments.length > 0 && (
                    <div className="space-y-2.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-700 block">
                        অন্যান্য মা-বাবার বাস্তব অভিজ্ঞতা:
                      </span>
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800">
                              {comment.authorName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {comment.babyAgeInfo && `${comment.babyAgeInfo} • `}
                              {comment.createdAt}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Reply Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="আপনার অভিজ্ঞতা বা পরামর্শ লিখুন..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCommentSubmit(post.id);
                      }}
                      className="text-xs"
                    />
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleCommentSubmit(post.id)}
                      className="gap-1.5 px-4 font-bold"
                    >
                      <Send className="h-3.5 w-3.5" />
                      উত্তর দিন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AskQuestionModal open={askModalOpen} onOpenChange={setAskModalOpen} />
    </div>
  );
}
