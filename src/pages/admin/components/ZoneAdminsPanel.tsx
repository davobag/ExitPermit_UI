import { Plus, Phone, Pencil, Trash2 } from "lucide-react";
import type { ZoneAdmin } from "../../../types/zone";

interface ZoneAdminsPanelProps {
  admins: ZoneAdmin[];
  onAdd: () => void;
  onEdit: (admin: ZoneAdmin) => void;
  onDelete: (admin: ZoneAdmin) => void;
  onContact: (admin: ZoneAdmin) => void;
  onToggle: (id: string) => void;
}

function initials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`;
}

export default function ZoneAdminsPanel({
  admins,
  onAdd,
  onEdit,
  onDelete,
  onContact,
  onToggle,
}: ZoneAdminsPanelProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-900">مدیران زون (ZoneAdmin)</p>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          افزودن مدیر زون
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-gray-400 text-right">
            <th className="px-3 py-2.5 font-medium">نام</th>
            <th className="px-3 py-2.5 font-medium">وضعیت</th>
            <th className="px-3 py-2.5 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center text-gray-400 py-8">
                مدیر زونی ثبت نشده
              </td>
            </tr>
          ) : (
            admins.map((a) => (
              <tr key={a.id} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-xs font-medium flex items-center justify-center flex-shrink-0">
                      {initials(a.firstName, a.lastName)}
                    </div>
                    <span className="font-medium text-gray-800">{a.firstName} {a.lastName}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      a.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {a.isActive ? "فعال" : "غیرفعال"}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-left">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onContact(a)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"
                      aria-label="اطلاعات تماس"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onEdit(a)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"
                      aria-label="ویرایش"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onToggle(a.id)}
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        a.isActive ? "bg-green-500" : "bg-gray-200"
                      }`}
                      aria-label={a.isActive ? "غیرفعال کردن" : "فعال کردن"}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                          a.isActive ? "right-0.5" : "right-4"
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => onDelete(a)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
