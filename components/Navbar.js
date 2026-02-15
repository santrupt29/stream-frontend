"use client"

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CustomNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setIsLoggedIn(false);
    router.push("/login");
  };
  return (
    <nav className="w-full flex justify-between items-center py-6 px-8 bg-[#FDFBF7] border-b border-[#EAE7DC]/50">
      <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
        STREAM<span className="font-light text-gray-400">APP</span>
      </Link>

      <div className="flex items-center space-x-6">
        {!isLoggedIn ? (
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