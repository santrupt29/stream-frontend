"use client";
import { useState } from "react";
import Link from "next/link";
import CustomNavbar from "@/components/Navbar";
import { authService } from "@/service/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const { login } = useStore();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await authService.login(credentials.email, credentials.password);
      login(userData);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid Credentials");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2926]">
      <CustomNavbar />
      <div className="flex flex-col items-center justify-center pt-24 px-6">
        <div className="w-full max-w-sm bg-white border border-[#EAE7DC] p-10 rounded-2xl shadow-sm">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif font-bold">Welcome Back</h1>
            <p className="text-gray-400 text-sm mt-2">Enter your details to access your studio.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-[#FDFBF7] border border-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:border-gray-400 transition-all"
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] text-gray-400 hover:text-black uppercase tracking-tighter">Forgot?</Link>
              </div>
              <input
                type="password"
                className="w-full bg-[#FDFBF7] border border-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:border-gray-400 transition-all"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>

            <button className="w-full bg-[#2D2926] text-white py-3 rounded-lg font-medium shadow-lg shadow-black/5 hover:shadow-black/10 transition-all">
              Sign In
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-50 text-center">
            <p className="text-sm text-gray-400">
              New to StreamApp? <Link href="/signup" className="text-[#2D2926] font-bold hover:underline">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}