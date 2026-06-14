import { useMemo, useState } from "react";
import { Eye } from "lucide-react";
import type{ AdminPermit } from "../../types/adminPermit";
import { MOCK_ADMIN_PERMITS } from "../../mocks/adminPermits_mock";
import { PERMIT_STATUS_CONFIG } from "../../constants/permitStatus";
import { toPersianDigits } from "../../utils/numbers";
import PermitsFilters from "./components/PermitsFilters";
import PlateFilterModal from "./components/PlateFilterModal";
import PermitDetailModal from "./components/PermitDetailModal";

const PAGE_SIZE = 8;

function PlateBox({ plate }: { plate: [string, string, string] }) {
  return (
    <div className="flex items-center border-2 border-gray-700 rounded overflow-hidden bg-white h-7 w-fit">
      <div
        className="bg-[#1a3a8f] text-white text-[8px] px-1 h-full flex items-center justify-center"
        style={{ writingMode: "vertical-rl", letterSpacing: 1 }}
      >
        ایران
      </div>
      <div className="flex items-center px-1.5 gap-1 text-xs font-semibold text-gray-900 font-mono">
        <span>{plate[0]}</span>
        <div className="w-px h-4 bg-gray-300" />
        <span>{plate[1]}</span>
        <div className="w-px h-4 bg-gray-300" />
        <span>{plate[2]}</span>
      </div>
    </div>
  );
}

export default function Permits() {
  const [permits] = useState<AdminPermit[]>(MOCK_ADMIN_PERMITS);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [unit, setUnit] = useState("");
  const [guard, setGuard] = useState("");
  const [status, setStatus] = useState("");
  const [plateFilter, setPlateFilter] = useState<[string, string, string] | null>(null);
  const [showPlateModal, setShowPlateModal] = useState(false);
  const [detailTarget, setDetailTarget] = useState<AdminPermit | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const units = useMemo(() => Array.from(new Set(permits.map((p) => p.unit))), [permits]);
  const guards = useMemo(() => Array.from(new Set(permits.map((p) => p.guard))), [permits]);

  const filtered = permits.filter((p) => {
    if (unit && p.unit !== unit) return false;
    if (guard && p.guard !== guard) return false;
    if (status && p.status !== status) return false;
    if (fromDate && p.issuedDate < fromDate) return false;
    if (toDate && p.issuedDate > toDate) return false;
    if (plateFilter && p.plate.join("") !== plateFilter.join("")) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const resetPage = () => setCurrentPage(1);

  return (
    <div dir="rtl">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-800">برگه‌های خروج</h1>
        <p className="text-sm text-gray-400 mt-0.5">مشاهده و فیلتر همه برگه‌های صادر شده</p>
      </div>

      <PermitsFilters
        fromDate={fromDate}
        toDate={toDate}
        unit={unit}
        guard={guard}
        status={status}
        plateActive={!!plateFilter}
        plateLabel={plateFilter ? plateFilter.join("") : "فیلتر پلاک"}
        units={units}
        guards={guards}
        onFromDateChange={(v) => { setFromDate(v); resetPage(); }}
        onToDateChange={(v) => { setToDate(v); resetPage(); }}
        onUnitChange={(v) => { setUnit(v); resetPage(); }}
        onGuardChange={(v) => { setGuard(v); resetPage(); }}
        onStatusChange={(v) => { setStatus(v); resetPage(); }}
        onPlateClick={() => setShowPlateModal(true)}
      />

      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: 560 }}>
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-right">
              <th className="px-4 py-3 font-medium whitespace-nowrap">شماره برگه</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">پلاک</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">واحد</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">نگهبان</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">زمان خروج</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">وضعیت</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-8">
                  برگه‌ای یافت نشد
                </td>
              </tr>
            ) : (
              paginated.map((p) => {
                const st = PERMIT_STATUS_CONFIG[p.status];
                return (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{p.id}</td>
                    <td className="px-4 py-3"><PlateBox plate={p.plate} /></td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.unit}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.guard}</td>
                    <td className="px-4 py-3 font-mono whitespace-nowrap" dir="ltr">
                      {p.exitedAt ? toPersianDigits(p.exitedAt) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
                        style={{ background: st.bg, color: st.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.color }} />
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-left">
                      <button
                        onClick={() => setDetailTarget(p)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"
                        aria-label="جزئیات"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 flex-wrap gap-2">
            <span className="text-xs text-gray-400">
              {toPersianDigits(String(filtered.length))} برگه — صفحه {toPersianDigits(String(safePage))} از {toPersianDigits(String(totalPages))}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                قبلی
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                    page === safePage
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {toPersianDigits(String(page))}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>

      {/* فیلتر پلاک */}
      {showPlateModal && (
        <PlateFilterModal
          initialPlate={plateFilter}
          onApply={(plate) => { setPlateFilter(plate); resetPage(); setShowPlateModal(false); }}
          onClose={() => setShowPlateModal(false)}
        />
      )}

      {/* جزئیات */}
      {detailTarget && (
        <PermitDetailModal permit={detailTarget} onClose={() => setDetailTarget(null)} />
      )}
    </div>
  );
}
