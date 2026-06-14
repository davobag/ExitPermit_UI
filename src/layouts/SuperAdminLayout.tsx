import { useState, ReactNode } from "react";
import { Menu } from "lucide-react";
import SuperAdminSidebar from "../components/superadmin/SuperAdminSidebar";

interface SuperAdminLayoutProps {
  children: ReactNode;
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <SuperAdminSidebar isOpen={sidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="باز/بسته کردن منو"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">سوپرادمین</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-xs font-medium flex items-center justify-center">
              SA
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
