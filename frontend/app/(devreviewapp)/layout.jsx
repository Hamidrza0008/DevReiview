import Sidebar from "@/Components/DevReviewLayout/Sidebar"; // Aapka sidebar component path

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Sidebar apni jagah fixed rahega */}
      <Sidebar />

      {/* 2. Content Wrapper: Isme 'md:pl-64' lagaya hai taaki content sidebar ke aage se shuru ho */}
      <div className="md:pl-64 min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}