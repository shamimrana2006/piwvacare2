import type { Metadata } from "next";
import { Hind_Siliguri, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BabyProvider } from "@/context/BabyContext";
import { Header } from "@/components/common/Header";
import { MobileNav } from "@/components/common/MobileNav";
import { Footer } from "@/components/common/Footer";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "Piwva — Modern Parenting & Baby Care Platform",
  description:
    "বাংলাদেশের বাবা-মায়েদের জন্য বিশ্বস্ত প্যারেন্টিং প্ল্যাটফর্ম। নিরাপদ পণ্য, নলেজ হাব, প্যারেন্ট কমিউনিটি এবং শিশুর গ্রোথ জার্নি এক ঠিকানায়।",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${jakartaSans.variable} ${hindSiliguri.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF9F6] text-[#1E293B]">
        <BabyProvider>
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {children}
          </main>
          <Footer />
          <MobileNav />
        </BabyProvider>
      </body>
    </html>
  );
}
