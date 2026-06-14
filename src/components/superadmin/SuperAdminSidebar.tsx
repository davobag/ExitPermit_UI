import { NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";

interface SuperAdminSidebarProps {
  isOpen: boolean;
}

export default function SuperAdminSidebar({ isOpen }: SuperAdminSidebarProps) {
  return (
    <aside
      className={`
        bg-white border-l border-gray-100 flex flex-col
        transition-all duration-200
        fixed top-0 right-0 h-full z-30
        md:relative md:z-auto
        ${isOpen ? "w-52" : "w-0 overflow-hidden"}
      `}
    >
      <div className="h-14 flex items-center px-5 border-b border-gray-100">
        <span className="font-medium text-sm text-gray-800">ExitPermit</span>
        <span className="mr-2 text-xs text-gray-400">سوپرادمین</span>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="px-4 py-1 text-xs text-gray-400 font-medium">مدیریت کلی</div>
        <NavLink
          to="/superadmin/zones"
          className={({ isActive }) => `
            flex items-center gap-2.5 px-4 py-2 text-sm transition-colors
            ${isActive
              ? "text-gray-900 font-medium bg-gray-50"
              : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }
          `}
        >
          <MapPin className="w-4 h-4" />
          زون‌ها
        </NavLink>
      </nav>
    </aside>
  );
}
