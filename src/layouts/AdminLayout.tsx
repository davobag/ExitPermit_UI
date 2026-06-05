// این کامپوننت "قالب" کلی صفحات ادمین رو تعریف می‌کنه
// هر صفحه‌ای که داخلش بذاریم، sidebar رو داره

import { useState } from "react";
import Sidebar from "../components/Sidebar";

// این interface میگه این کامپوننت چه props ای قبول می‌کنه
interface AdminLayoutProps {
  children: React.ReactNode; // children = هر چیزی که داخل تگ بذاریم
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // useState یه متغیر "واکنشی" می‌سازه
  // وقتی تغییر کنه، React صفحه رو دوباره رندر می‌کنه
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* محتوای اصلی */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {/* آیکون همبرگر */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">احمد رضایی</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-xs font-medium flex items-center justify-center">
              AR
            </div>
          </div>
        </header>

        {/* اینجاست که محتوای هر صفحه رندر میشه */}
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>

      </div>
    </div>
  );
}