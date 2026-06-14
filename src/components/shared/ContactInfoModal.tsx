import { X, User, Phone } from "lucide-react";
import type { Guard } from "../../types/guard";

interface ContactInfoModalProps {
  guard: Guard;
  onClose: () => void;
}

export default function ContactInfoModal({ guard, onClose }: ContactInfoModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg" dir="rtl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">اطلاعات تماس</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600"
            aria-label="بستن"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3 py-2.5 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">نام کامل</span>
              <span className="text-sm text-gray-800">{guard.firstName} {guard.lastName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 flex-shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">شماره موبایل</span>
              <span className="text-sm text-gray-800 font-mono">{guard.phoneNumber}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm py-2 rounded-lg transition-colors"
        >
          بستن
        </button>
      </div>
    </div>
  );
}
