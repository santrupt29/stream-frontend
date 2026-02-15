"use client";

import { useState } from "react";
import Link from "next/link";
import CustomNavbar from "@/components/Navbar";
import { authService } from "@/service/authService";

export default function SignupPage() {
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData)
    try {
      await authService.register(formData.email, formData.password);
      toast.success("Signup successful! Please log in.", {
        duration: 4000,
        style: {
          background: "#2D2926",
          color: "#FDFBF7",
          borderRadius: "10px",
          fontFamily: "serif",
        },
      });
      router.push("/login")
    } catch (error) {
      console.log("Error logging in, Try again", error);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2926]">
      <CustomNavbar />
      <div className="flex flex-col items-center justify-center pt-20 px-6">
        <div className="w-full max-w-md bg-white border border-[#EAE7DC] p-10 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-serif font-bold mb-2">Create Account</h1>
          <p className="text-gray-500 mb-8 text-sm">Join the community of minimalist creators.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-[#FDFBF7] border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                placeholder="name@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">Password</label>
              <input 
                type="password" 
                className="w-full bg-[#FDFBF7] border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button type="submit" className="w-full bg-[#2D2926] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors">
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account? <Link href="/login" className="text-[#2D2926] font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}