import { X, Car, Building2, Package, DoorOpen, Shield, ArrowUpCircle, ArrowDownCircle, Info } from "lucide-react";
import type { AdminPermit } from "../../../types/adminPermit";
import { VEHICLE_TYPES } from "../../../types/vehicleType";
import { PERMIT_STATUS_CONFIG } from "../../../constants/permitStatus";
import { toPersianDigits } from "../../../utils/numbers";

interface PermitDetailModalProps {
  permit: AdminPermit;
  onClose: () => void;
}

export default function PermitDetailModal({ permit, onClose }: PermitDetailModalProps) {
  const vt = VEHICLE_TYPES[permit.vehicleTypeId];
  const st = PERMIT_STATUS_CONFIG[permit.status];

  const rows = [
    { icon: <Car className="w-4 h-4" />, label: "نوع خودرو", value: vt?.label, valueColor: vt?.color },
    { icon: <Building2 className="w-4 h-4" />, label: "واحد", value: permit.unit },
    { icon: <Package className="w-4 h-4" />, label: "کالا", value: permit.cargo },
    { icon: <DoorOpen className="w-4 h-4" />, label: "درب خروج", value: permit.gate },
    { icon: <Shield className="w-4 h-4" />, label: "نگهبان", value: permit.guard },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg" dir="rtl">
        {/* هدر */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">جزئیات برگه {permit.id}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600"
            aria-label="بستن"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* پلاک */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center border-2 border-gray-700 rounded overflow-hidden bg-white h-9">
            <div
              className="bg-[#1a3a8f] text-white text-[9px] px-1.5 h-full flex items-center justify-center"
              style={{ writingMode: "vertical-rl", letterSpacing: 1 }}
            >
              ایران
            </div>
            <div className="flex items-center px-2 gap-1.5 text-sm font-semibold text-gray-900">
              <span>{permit.plate[0]}</span>
              <div className="w-px h-5 bg-gray-300" />
              <span>{permit.plate[1]}</span>
              <div className="w-px h-5 bg-gray-300" />
              <span>{permit.plate[2]}</span>
            </div>
          </div>
        </div>

        {/* ردیف‌های اطلاعات */}
        <div className="flex flex-col gap-2.5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm pb-2.5 border-b border-gray-100 last:border-b-0 last:pb-0">
              <span className="flex items-center gap-1.5 text-gray-500">
                {row.icon}
                {row.label}
              </span>
              <span className="font-medium" style={{ color: row.valueColor ?? "#111827" }}>
                {row.value}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between text-sm pb-2.5 border-b border-gray-100">
            <span className="flex items-center gap-1.5 text-gray-500">
              <ArrowUpCircle className="w-4 h-4" />
              زمان صدور
            </span>
            <span className="font-medium font-mono" dir="ltr">{toPersianDigits(permit.issuedAt)}</span>
          </div>

          <div className="flex items-center justify-between text-sm pb-2.5 border-b border-gray-100">
            <span className="flex items-center gap-1.5 text-gray-500">
              <ArrowDownCircle className="w-4 h-4" />
              زمان خروج
            </span>
            <span className="font-medium font-mono" dir="ltr">
              {permit.exitedAt ? toPersianDigits(permit.exitedAt) : "—"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-gray-500">
              <Info className="w-4 h-4" />
              وضعیت
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: st.bg, color: st.color }}
            >
              {st.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
