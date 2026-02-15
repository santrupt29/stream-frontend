"use client"

import CustomNavbar from "@/components/Navbar";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2926] font-sans">
      <CustomNavbar />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6">
        <span className="bg-[#F3EFE0] px-3 py-1 rounded-full text-sm font-medium mb-6">
          v1.0 Now Live
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-semibold tracking-tight mb-8">
          Stream with <br /> <span className="italic text-[#8B7E66]">Elegance.</span>
        </h1>
        <p className="max-w-xl text-lg text-gray-600 mb-10 leading-relaxed">
          A minimalist video experience. Upload your content and enjoy seamless playback on our warm, distraction-free interface.
        </p>
        
        <div className="flex gap-4">
          <Link href="/signup" className="bg-[#2D2926] text-white px-8 py-3 rounded-lg hover:bg-black transition-colors">
            Get Started
          </Link>
          <Link href="#features" className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-[#F3EFE0] transition-colors">
            Explore
          </Link>
        </div>
      </section>

      {/* Grid Section */}
      <section id="features" className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold font-serif">Pure Performance</h3>
          <p className="text-gray-500 text-sm">Adaptive HLS streaming that works on any device, anywhere.</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold font-serif">Secure by Design</h3>
          <p className="text-gray-500 text-sm">JWT-protected routes ensure your creator studio stays private.</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold font-serif">Clean Code</h3>
          <p className="text-gray-500 text-sm">Built with Next.js 14 and Spring Boot for industrial-grade stability.</p>
        </div>
      </section>
    </div>
  );
}