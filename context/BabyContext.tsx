"use client";

import React, { createContext, useContext, useState } from "react";
import { BabyProfile, AgeGroup, CommunityPost, Product, KnowledgeArticle, MilestoneItem, VaccineItem } from "@/lib/types";
import { initialBabyProfiles, mockProducts, mockCommunityPosts, mockArticles, mockMilestones, mockVaccines } from "@/lib/mock-data";

interface BabyContextType {
  profiles: BabyProfile[];
  activeProfile: BabyProfile;
  selectedAgeFilter: AgeGroup;
  setSelectedAgeFilter: (age: AgeGroup) => void;
  switchProfile: (profileId: string) => void;
  addBabyProfile: (profile: Omit<BabyProfile, "id">) => void;
  
  // Data lists & filters
  products: Product[];
  communityPosts: CommunityPost[];
  articles: KnowledgeArticle[];
  milestones: MilestoneItem[];
  vaccines: VaccineItem[];

  // Interactive actions
  toggleMilestone: (id: string) => void;
  toggleVaccine: (id: string) => void;
  addCommunityQuestion: (post: Omit<CommunityPost, "id" | "createdAt" | "likes" | "commentCount" | "comments">) => void;
  addCommentToPost: (postId: string, text: string, authorName?: string) => void;
  bookmarkedProductIds: string[];
  toggleBookmarkProduct: (id: string) => void;
  bookmarkedArticleIds: string[];
  toggleBookmarkArticle: (id: string) => void;
}

const BabyContext = createContext<BabyContextType | undefined>(undefined);

export function BabyProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<BabyProfile[]>(initialBabyProfiles);
  const [activeProfileId, setActiveProfileId] = useState<string>(initialBabyProfiles[0].id);
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<AgeGroup>("1-3m");

  const [products] = useState<Product[]>(mockProducts);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [articles] = useState<KnowledgeArticle[]>(mockArticles);
  const [milestones, setMilestones] = useState<MilestoneItem[]>(mockMilestones);
  const [vaccines, setVaccines] = useState<VaccineItem[]>(mockVaccines);

  const [bookmarkedProductIds, setBookmarkedProductIds] = useState<string[]>(["prod-1", "prod-3"]);
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<string[]>(["art-1"]);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const switchProfile = (profileId: string) => {
    const target = profiles.find((p) => p.id === profileId);
    if (target) {
      setActiveProfileId(profileId);
      setSelectedAgeFilter(target.ageGroup);
    }
  };

  const addBabyProfile = (newProfileData: Omit<BabyProfile, "id">) => {
    const newId = `baby-${Date.now()}`;
    const newProfile: BabyProfile = {
      ...newProfileData,
      id: newId,
    };
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newId);
    setSelectedAgeFilter(newProfile.ageGroup);
  };

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isCompleted: !m.isCompleted } : m))
    );
  };

  const toggleVaccine = (id: string) => {
    setVaccines((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isCompleted: !v.isCompleted } : v))
    );
  };

  const addCommunityQuestion = (postData: Omit<CommunityPost, "id" | "createdAt" | "likes" | "commentCount" | "comments">) => {
    const newPost: CommunityPost = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: "এইমাত্র",
      likes: 1,
      commentCount: 0,
      comments: [],
    };
    setCommunityPosts((prev) => [newPost, ...prev]);
  };

  const addCommentToPost = (postId: string, text: string, authorName = "অভিভাবক") => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentCount: p.commentCount + 1,
            comments: [
              ...p.comments,
              {
                id: `c-${Date.now()}`,
                authorName,
                authorRole: "parent",
                babyAgeInfo: activeProfile.ageFormatted,
                createdAt: "এইমাত্র",
                content: text,
                likes: 0,
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const toggleBookmarkProduct = (id: string) => {
    setBookmarkedProductIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleBookmarkArticle = (id: string) => {
    setBookmarkedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <BabyContext.Provider
      value={{
        profiles,
        activeProfile,
        selectedAgeFilter,
        setSelectedAgeFilter,
        switchProfile,
        addBabyProfile,
        products,
        communityPosts,
        articles,
        milestones,
        vaccines,
        toggleMilestone,
        toggleVaccine,
        addCommunityQuestion,
        addCommentToPost,
        bookmarkedProductIds,
        toggleBookmarkProduct,
        bookmarkedArticleIds,
        toggleBookmarkArticle,
      }}
    >
      {children}
    </BabyContext.Provider>
  );
}

export function useBaby() {
  const context = useContext(BabyContext);
  if (!context) {
    throw new Error("useBaby must be used within a BabyProvider");
  }
  return context;
}
