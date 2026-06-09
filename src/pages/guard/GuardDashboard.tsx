import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { ExitPermit } from "../../types/exitPermit";
import { VEHICLE_TYPES } from "../../types/vehicleType";
import { MOCK_PERMITS } from "../../mocks/permits"; // TODO: با API جایگزین کن
import { LogOut, CheckCircle } from "lucide-react";

// ── کمکی: نرمال‌سازی اعداد فارسی/عربی به انگلیسی ───────────────────────────
function normalizeDigits(str: string): string {
  return str
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}

// ── کامپوننت پلاک ────────────────────────────────────────────────────────────
function PlateBox({ plate }: { plate: [string, string, string] }) {
  return (
    <div className="flex items-center border-2 border-gray-700 rounded overflow-hidden bg-white h-8 w-fit">
      <div
        className="bg-[#1a3a8f] text-white text-[9px] px-1.5 h-full flex items-center justify-center"
        style={{ writingMode: "vertical-rl", letterSpacing: 1 }}
      >
        ایران
      </div>
      <div className="flex items-center px-2 gap-1">
        <span className="text-sm font-semibold text-gray-900 tracking-wide">
          {plate[0]}
        </span>
        <div className="w-px h-5 bg-gray-300" />
        <span className="text-sm font-semibold text-gray-900">{plate[1]}</span>
        <div className="w-px h-5 bg-gray-300" />
        <span className="text-sm font-semibold text-gray-900 tracking-wide">
          {plate[2]}
        </span>
      </div>
    </div>
  );
}

// ── کامپوننت کارت برگه ──────────────────────────────────────────────────────
function PermitCard({
  permit,
  onConfirm,
}: {
  permit: ExitPermit;
  onConfirm: (id: string) => void;
}) {
  const vt = VEHICLE_TYPES[permit.vehicleTypeId];

  return (
    <div
      className="rounded-xl border border-gray-100 p-4 bg-white"
      style={{ borderRight: `3px solid ${vt.dot}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
          style={{ background: vt.bg, color: vt.color }}
        >
          {vt.label}
        </span>
        <span className="text-xs text-gray-400">{permit.id}</span>
      </div>

      <div className="mb-3">
        <PlateBox plate={permit.plate} />
      </div>

      <p className="text-sm text-gray-500 mb-3">{permit.workshopName}</p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{permit.issuedAt}</span>
        <button
          onClick={() => onConfirm(permit.id)}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── کامپوننت اصلی ────────────────────────────────────────────────────────────
export default function GuardDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [permits, setPermits] = useState<ExitPermit[]>(MOCK_PERMITS);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [rawSearch, setRawSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [activeType, setActiveType] = useState<number | null>(null);
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "green" | "red";
  } | null>(null);

  const showToast = useCallback(
    (msg: string, type: "green" | "red" = "green") => {
      setToast({ msg, type });
      setTimeout(() => setToast(null), 2500);
    },
    [],
  );

  const handleSearch = (val: string) => {
    setRawSearch(val);
    setActiveSearch(val.trim().length >= 3 ? val.trim() : "");
  };

  const searchHint = () => {
    const len = rawSearch.trim().length;
    if (len === 0)
      return {
        text: "از کاراکتر سوم جستجو آغاز می‌شود",
        color: "text-gray-400",
      };
    if (len < 3)
      return {
        text: `${3 - len} کاراکتر دیگر وارد کنید...`,
        color: "text-amber-600",
      };
    return {
      text: `در حال جستجو برای «${activeSearch}»`,
      color: "text-blue-500",
    };
  };

  const filtered = permits.filter((p) => {
    const matchType = activeType === null || p.vehicleTypeId === activeType;
    if (!activeSearch) return matchType;
    const q = normalizeDigits(activeSearch);
    const plateStr = normalizeDigits(p.plate.join(""));
    return (
      matchType &&
      (plateStr.startsWith(q) || p.workshopName.includes(activeSearch))
    );
  });

  const handleConfirm = (id: string) => {
    setPermits((prev) => prev.filter((p) => p.id !== id));
    setConfirmedCount((c) => c + 1);
    showToast(`برگه ${id} تایید شد`);
  };

  const handleLogout = () => {
    setShowLogoutSheet(false);
    showToast("در حال خروج...", "red");
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 800);
  };

  const hint = searchHint();
  const initials = user ? user.firstName[0] + user.lastName[0] : "؟";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <div className="p-4 max-w-lg mx-auto" dir="rtl">
      {/* هدر */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-800 text-sm font-medium flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{fullName}</p>
            <p className="text-xs text-gray-400">نگهبان</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-800 leading-none">
                {user?.gateName ?? "دروازه"}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">آنلاین</p>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutSheet(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-colors"
            aria-label="خروج از حساب"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* سرچ */}
      <div className="mb-2.5">
        <div className="relative">
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            value={rawSearch}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="جستجو پلاک یا نام کارگاه..."
            className={`w-full py-2.5 pr-9 pl-3 border rounded-lg text-sm bg-white text-gray-900 placeholder-gray-400 outline-none transition-colors ${
              activeSearch
                ? "border-blue-400"
                : "border-gray-200 focus:border-gray-400"
            }`}
          />
        </div>
        <p className={`text-xs mt-1.5 h-4 ${hint.color}`}>{hint.text}</p>
      </div>

      {/* فیلتر نوع خودرو */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveType(null)}
          className={`flex-shrink-0 px-3 py-1 rounded-full text-xs border transition-colors ${
            activeType === null
              ? "border-gray-700 text-gray-900 font-medium"
              : "border-gray-200 text-gray-500"
          }`}
        >
          همه
        </button>
        {Object.values(VEHICLE_TYPES).map((vt) => (
          <button
            key={vt.id}
            onClick={() => setActiveType(activeType === vt.id ? null : vt.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs border transition-colors ${
              activeType === vt.id
                ? "border-gray-700 text-gray-900 font-medium"
                : "border-gray-200 text-gray-500"
            }`}
          >
            {vt.label}
          </button>
        ))}
      </div>

      {/* آمار */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { num: permits.length, label: "در انتظار" },
          { num: confirmedCount, label: "تایید امروز" },
          { num: permits.length + confirmedCount, label: "کل امروز" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-gray-50 rounded-lg p-2.5 text-center"
          >
            <p className="text-xl font-medium text-gray-900">{s.num}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* لیست */}
      <p className="text-xs text-gray-400 mb-2">
        {filtered.length} برگه در انتظار تایید
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          {permits.length === 0
            ? "✓ همه برگه‌ها تایید شدند"
            : "برگه‌ای با این فیلتر یافت نشد"}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((p) => (
            <PermitCard key={p.id} permit={p} onConfirm={handleConfirm} />
          ))}
        </div>
      )}

      {/* Logout Bottom Sheet */}
      {showLogoutSheet && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center"
          onClick={() => setShowLogoutSheet(false)}
        >
          <div
            className="bg-white rounded-t-2xl p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-9 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <h3 className="text-base font-medium text-gray-900 text-center mb-2">
              خروج از حساب
            </h3>
            <p className="text-sm text-gray-500 text-center mb-5">
              آیا مطمئن هستید؟ برگه‌های تایید نشده همچنان در سیستم باقی
              می‌مانند.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutSheet(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 bg-gray-50"
              >
                انصراف
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                بله، خروج
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-lg text-white text-sm z-50 ${
            toast.type === "green" ? "bg-emerald-600" : "bg-red-500"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
