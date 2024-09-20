// Filename: app/page.js
"use client"; // Ensure this is a client-side component
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for client-side routing in Next.js 13+
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WithWithout from "@/components/WithWithout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const code = searchParams.get("code");
    if (code) {
      localStorage.setItem("referralCode", code);
    }
  }, [router]);

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Problem />
        {/* <WithWithout /> */}
        <Pricing />
        <FAQ />
        {/* <CTA /> */}
      </main>
      <Footer />
    </>
  );
}
