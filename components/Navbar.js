"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { useEffect } from "react";

export default function CustomNavbar() {
  const { isAuthenticated, logout, checkAuth } = useStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="w-full flex justify-between items-center py-6 px-8 bg-[#FDFBF7] border-b border-[#EAE7DC]/50">
      <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
        VORTEX<span className="font-light text-gray-400"></span>
      </Link>

      <div className="flex items-center space-x-6">
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link href="/signup" className="bg-[#2D2926] text-white text-sm px-5 py-2 rounded-md">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Studio
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 border border-red-100 text-sm px-5 py-2 rounded-md hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}