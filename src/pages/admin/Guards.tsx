import { useState } from "react";
import { Plus, Phone, Pencil, Trash2 } from "lucide-react";
import type { Guard, NewGuardForm } from "../../types/guard";
import { MOCK_GUARDS } from "../../mocks/guards";
import ContactInfoModal from "../../components/shared/ContactInfoModal";
import ConfirmModal from "../../components/shared/ConfirmModal";
import GuardFormModal from "./components/GuardFormModal";


const PAGE_SIZE = 5;

function initials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`;
}

export default function Guards() {
  const [guards, setGuards] = useState<Guard[]>(MOCK_GUARDS);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [contactTarget, setContactTarget] = useState<Guard | null>(null);
  const [editTarget, setEditTarget] = useState<Guard | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Guard | null>(null);

  const filtered = guards.filter((g) =>
    `${g.firstName} ${g.lastName}`.includes(search)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const toggleActive = (id: string) => {
    setGuards((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isActive: !g.isActive } : g))
    );
  };

  const handleAdd = (form: NewGuardForm) => {
    const guard: Guard = {
      id: Date.now().toString(),
      ...form,
      isActive: true,
    };
    setGuards((prev) => [...prev, guard]);
    setShowAddModal(false);
    setCurrentPage(Math.ceil((guards.length + 1) / PAGE_SIZE));
  };

  const handleEditSave = (form: NewGuardForm) => {
    if (!editTarget) return;
    setGuards((prev) =>
      prev.map((g) => (g.id === editTarget.id ? { ...g, ...form } : g))
    );
    setEditTarget(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setGuards((prev) => prev.filter((g) => g.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div dir="rtl">
      {/* هدر صفحه */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">نگهبانان</h1>
          <p className="text-sm text-gray-400 mt-0.5">مدیریت نگهبانان و دسترسی سیستم</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="جستجوی نام..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 w-48"
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            افزودن نگهبان
          </button>
        </div>
      </div>

      {/* جدول */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-right">
              <th className="px-5 py-3 font-medium">نام نگهبان</th>
              <th className="px-5 py-3 font-medium">وضعیت</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 py-8">
                  نگهبانی یافت نشد
                </td>
              </tr>
            ) : (
              paginated.map((g) => (
                <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-xs font-medium flex items-center justify-center flex-shrink-0">
                        {initials(g.firstName, g.lastName)}
                      </div>
                      <span className="font-medium text-gray-800">{g.firstName} {g.lastName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        g.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {g.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-left">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setContactTarget(g)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"
                        aria-label="اطلاعات تماس"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditTarget(g)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"
                        aria-label="ویرایش"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {/* toggle فعال/غیرفعال */}
                      <button
                        onClick={() => toggleActive(g.id)}
                        className={`relative w-9 h-5 rounded-full transition-colors ${
                          g.isActive ? "bg-green-500" : "bg-gray-200"
                        }`}
                        aria-label={g.isActive ? "غیرفعال کردن" : "فعال کردن"}
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                            g.isActive ? "right-0.5" : "right-4"
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => setDeleteTarget(g)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {filtered.length} نگهبان — صفحه {safePage} از {totalPages}
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
                  {page}
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

      {/* اطلاعات تماس */}
      {contactTarget && (
        <ContactInfoModal guard={contactTarget} onClose={() => setContactTarget(null)} />
      )}

      {/* افزودن */}
      {showAddModal && (
        <GuardFormModal onSave={handleAdd} onClose={() => setShowAddModal(false)} />
      )}

      {/* ویرایش */}
      {editTarget && (
        <GuardFormModal
          guard={editTarget}
          onSave={handleEditSave}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* حذف */}
      {deleteTarget && (
        <ConfirmModal
          title="حذف نگهبان"
          message={`آیا از حذف «${deleteTarget.firstName} ${deleteTarget.lastName}» مطمئن هستید؟`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
