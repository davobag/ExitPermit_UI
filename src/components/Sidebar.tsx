import { NavLink } from "react-router-dom";

// تعریف نوع یه آیتم منو
interface NavItem {
  label: string;
  path: string;
  icon: string; // فعلاً emoji ساده، بعداً با آیکون واقعی جایگزین می‌کنیم
}

// تعریف گروه‌بندی منو
interface NavGroup {
  title: string;
  items: NavItem[];
}

// داده‌های منو — بعداً می‌تونیم از API بگیریم
const navGroups: NavGroup[] = [
  {
    title: "مدیریت",
    items: [
      { label: "داشبورد",       path: "/admin",            icon: "⊞" },
      { label: "واحدها", path: "/admin/units", icon: "🏢" },
      { label: "مجوزهای خروج", path: "/admin/permits",     icon: "📋" },
      { label: "کاربران",       path: "/admin/users",       icon: "👥" },
      { label: "دروازه‌ها",    path: "/admin/gates",       icon: "🚪" },
    ],
  },
  {
    title: "گزارشات",
    items: [
      { label: "آمار و تحلیل", path: "/admin/analytics",  icon: "📊" },
      { label: "لاگ فعالیت",  path: "/admin/logs",        icon: "🕐" },
    ],
  },
];

// props این کامپوننت
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    // وقتی isOpen=false میشه، عرض sidebar کم میشه
    <aside
      className={`
        bg-white border-l border-gray-100 flex flex-col
        transition-all duration-200
        ${isOpen ? "w-52" : "w-0 overflow-hidden"}
      `}
    >
      {/* لوگو */}
      <div className="h-14 flex items-center px-5 border-b border-gray-100">
        <span className="font-medium text-sm text-gray-800">ExitPermit</span>
        <span className="mr-2 text-xs text-gray-400">ادمین</span>
      </div>

      {/* آیتم‌های منو */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            
            {/* عنوان گروه */}
            <div className="px-4 py-1 text-xs text-gray-400 font-medium">
              {group.title}
            </div>

            {/* آیتم‌های گروه */}
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"} // فقط برای داشبورد exact match
                className={({ isActive }) => `
                  flex items-center gap-2.5 px-4 py-2 text-sm transition-colors
                  ${isActive
                    ? "text-gray-900 font-medium bg-gray-50"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}

          </div>
        ))}
      </nav>

      {/* footer — tenant */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-gray-400">مجموعه آلفا</span>
        </div>
      </div>
    </aside>
  );
}