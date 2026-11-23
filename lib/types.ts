export type AgeGroup = "0-1m" | "1-3m" | "3-6m" | "6-12m" | "1-2y" | "2y+" | "all";

export interface BabyProfile {
  id: string;
  name: string;
  birthDate: string; // ISO date string
  gender: "boy" | "girl" | "expecting";
  ageFormatted: string; // e.g., "৩ মাস ১২ দিন"
  ageGroup: AgeGroup;
  currentWeightKg?: number;
  currentHeightCm?: number;
}

export interface Product {
  id: string;
  name: string;
  banglaName?: string;
  slug: string;
  brand: string;
  category: "skincare" | "feeding" | "diapering" | "health" | "gear" | "clothing";
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  ageRangeLabel: string;
  ageGroups: AgeGroup[];
  concernTags: string[]; // e.g. ["কোলিক", "সেনসিটিভ স্কিন", "র‍্যাশ"]
  isDoctorApproved: boolean;
  pediatricianNote?: string;
  benefits: string[];
  usageGuide: string[];
  safetyWarnings: string[];
  inStock: boolean;
  shortDesc: string;
}

export interface DoctorAnswer {
  doctorName: string;
  doctorTitle: string;
  institution: string;
  answeredAt: string;
  content: string;
  isVerified: boolean;
  redFlags?: string[];
}

export interface Comment {
  id: string;
  authorName: string;
  authorRole: "parent" | "doctor";
  babyAgeInfo?: string;
  createdAt: string;
  content: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  authorName: string;
  isAnonymous: boolean;
  babyAgeLabel: string;
  ageGroup: AgeGroup;
  topicTag: string;
  createdAt: string;
  likes: number;
  commentCount: number;
  doctorAnswer?: DoctorAnswer;
  comments: Comment[];
}

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  banglaTitle: string;
  category: "newborn" | "nutrition" | "sleep" | "health" | "milestone";
  categoryLabel: string;
  readingTime: string;
  ageGroup: AgeGroup;
  doctorReviewer: {
    name: string;
    designation: string;
    verified: boolean;
  };
  summary: string;
  dos: string[];
  donts: string[];
  sections: {
    heading: string;
    body: string;
  }[];
  relatedProductSlugs?: string[];
}

export interface MilestoneItem {
  id: string;
  ageGroup: AgeGroup;
  ageLabel: string;
  title: string;
  category: "physical" | "cognitive" | "social" | "speech";
  description: string;
  isCompleted: boolean;
  expertTip: string;
}

export interface VaccineItem {
  id: string;
  ageLabel: string;
  vaccineName: string;
  preventedDisease: string;
  doses: string;
  notes: string;
  isCompleted: boolean;
  epiRecommended: boolean;
}
