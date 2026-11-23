"use client";

import React from "react";
import Link from "next/link";
import { Baby, ShieldCheck, HeartHandshake, PhoneCall, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 pb-20 md:pb-8">
      {/* Trust Badges Banner */}
      <div className="border-b border-slate-100 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-[#EBF5F1] text-[#2D7A68] flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">১০০% অথেনটিক প্রোডাক্ট</h4>
                <p className="text-xs text-slate-500">প্রতিটি উপাদান শিশুর ত্বকের জন্য পরীক্ষিত</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">চিকিৎসক অনুমোদিত পরামর্শ</h4>
                <p className="text-xs text-slate-500">বিশেষজ্ঞ পেডিয়াট্রিশিয়ানদের নিয়মিত রিভিউ</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">সহমর্মী প্যারেন্টিং নেটওয়ার্ক</h4>
                <p className="text-xs text-slate-500">অন্যান্য অভিভাবকদের সাথে অভিজ্ঞতা বিনিময়</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">জাতীয় স্বাস্থ্য হেল্পলাইন</h4>
                <p className="text-xs text-slate-500">জরুরি পরামর্শে কল করুন: ১৬২৬৩</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-[#2D7A68] text-white flex items-center justify-center">
                <Baby className="h-5 w-5" />
              </div>
              <span className="text-xl font-black text-[#2D7A68]">Piwva</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Piwva হলো বাংলাদেশের বাবা-মায়েদের প্রথম সমন্বিত আধুনিক প্যারেন্টিং প্ল্যাটফর্ম। সঠিক তথ্য, বিশ্বস্ত শিশু যত্ন সামগ্রী এবং সহমর্মী কমিউনিটির মাধ্যমে আমরা আছি আপনার শিশুর প্রতিটি পদক্ষেপে।
            </p>
            <p className="text-[11px] text-slate-400">
              © 2026 Piwva Technologies Ltd. সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              মূল ফিচারসমূহ
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/products" className="hover:text-[#2D7A68]">স্মার্ট বেবি স্টোর</Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-[#2D7A68]">অভিভাবক কমিউনিটি ফোরাম</Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-[#2D7A68]">মেডিকেল নলেজ হাব</Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-[#2D7A68]">মাইলস্টোন ও টিকা ট্র্যাকার</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              গুরুত্বপূর্ণ টপিক
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/knowledge?cat=newborn" className="hover:text-[#2D7A68]">নবজাতকের প্রথম মাস</Link>
              </li>
              <li>
                <Link href="/knowledge?cat=sleep" className="hover:text-[#2D7A68]">শিশুর নিরাপদ ঘুম</Link>
              </li>
              <li>
                <Link href="/knowledge?cat=nutrition" className="hover:text-[#2D7A68]">৬ মাসের পর প্রথম খাবার</Link>
              </li>
              <li>
                <Link href="/products?concern=rash" className="hover:text-[#2D7A68]">ডায়াপার র‍্যাশ সমাধান</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              মেডিকেল ডিসক্লেইমার
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Piwva-এর সকল কনটেন্ট ও আলোচনা সাধারণ সচেতনতা ও শিক্ষামূলক উদ্দেশ্যে প্রস্তুত। এটি কোনো জরুরি চিকিৎসা পরামর্শের বিকল্প নয়। শিশুর কোনো গুরুতর অসুস্থতায় সরাসরি নিকটস্থ রেজিস্টার্ড চিকিৎসকের শরণাপন্ন হন।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

