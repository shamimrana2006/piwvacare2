"use client";

import React, { useState } from "react";
import { useBaby } from "@/context/BabyContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Baby, Plus, Check, Calendar, Heart } from "lucide-react";
import { AgeGroup } from "@/lib/types";

export function BabySwitcherModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { profiles, activeProfile, switchProfile, addBabyProfile } = useBaby();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"boy" | "girl" | "expecting">("boy");

  const handleSelect = (id: string) => {
    switchProfile(id);
    onOpenChange(false);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Calculate approximate age group
    let ageFormatted = "০-১ মাস (নবজাতক)";
    let ageGroup: AgeGroup = "0-1m";

    if (birthDate) {
      const birth = new Date(birthDate);
      const now = new Date();
      const diffMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
      
      if (diffMonths <= 1) {
        ageFormatted = "১ মাস";
        ageGroup = "0-1m";
      } else if (diffMonths <= 3) {
        ageFormatted = `${diffMonths} মাস`;
        ageGroup = "1-3m";
      } else if (diffMonths <= 6) {
        ageFormatted = `${diffMonths} মাস`;
        ageGroup = "3-6m";
      } else if (diffMonths <= 12) {
        ageFormatted = `${diffMonths} মাস`;
        ageGroup = "6-12m";
      } else if (diffMonths <= 24) {
        ageFormatted = "১+ বছর";
        ageGroup = "1-2y";
      } else {
        ageFormatted = "২+ বছর";
        ageGroup = "2y+";
      }
    }

    addBabyProfile({
      name,
      birthDate: birthDate || new Date().toISOString().split("T")[0],
      gender,
      ageFormatted,
      ageGroup,
    });

    setName("");
    setBirthDate("");
    setIsAddingNew(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-[#2D7A68]">
            <Baby className="h-6 w-6" />
            <DialogTitle>শিশুর প্রোফাইল নির্বাচন ও তৈরি</DialogTitle>
          </div>
          <DialogDescription>
            শিশুর বয়স অনুযায়ী সঠিক তথ্য, পণ্য এবং পরামর্শ পেতে প্রোফাইল নির্বাচন করুন।
          </DialogDescription>
        </DialogHeader>

        {!isAddingNew ? (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              {profiles.map((p) => {
                const isSelected = p.id === activeProfile.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#2D7A68] bg-[#EBF5F1]/60 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-11 w-11 rounded-full flex items-center justify-center ${
                          p.gender === "girl"
                            ? "bg-pink-100 text-pink-600"
                            : p.gender === "boy"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        <Baby className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm md:text-base">
                          {p.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          বর্তমান বয়স: <span className="font-medium text-slate-700">{p.ageFormatted}</span>
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="h-6 w-6 rounded-full bg-[#2D7A68] text-white flex items-center justify-center">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setIsAddingNew(true)}
              className="w-full gap-2 border-dashed border-slate-300 hover:border-[#2D7A68] hover:text-[#2D7A68] py-5"
            >
              <Plus className="h-4 w-4" />
              নতুন শিশুর প্রোফাইল যুক্ত করুন
            </Button>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                শিশুর নাম বা ডাকনাম
              </label>
              <Input
                placeholder="যেমন: আরিয়ান, মায়শা"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                জন্ম তারিখ (বা সম্ভাব্য প্রসবের তারিখ)
              </label>
              <div className="relative">
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="pl-10"
                  required
                />
                <Calendar className="h-4 w-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                লিঙ্গ (Gender)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "boy", label: "পুত্র সন্তান" },
                  { id: "girl", label: "কন্যা সন্তান" },
                  { id: "expecting", label: "গর্ভকালীন" },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGender(g.id as any)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                      gender === g.id
                        ? "border-[#2D7A68] bg-[#EBF5F1] text-[#246354] font-semibold"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsAddingNew(false)}
                className="flex-1"
              >
                বাতিল
              </Button>
              <Button type="submit" variant="default" className="flex-1">
                সংরক্ষণ করুন
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
