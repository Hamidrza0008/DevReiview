"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Sidebar from "@/Components/DevReviewLayout/Sidebar";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading]);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="md:pl-64 min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}