import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Unit {
  id: string;
  name: string;
  monthlyQuota: number | null;
  representativeCount: number;
  isActive: boolean;
}

const mockUnits: Unit[] = [
  {
    id: "1",
    name: "شرکت آلفا تجارت",
    monthlyQuota: 20,
    representativeCount: 3,
    isActive: true,
  },
  {
    id: "2",
    name: "کارخانه بتا صنعت",
    monthlyQuota: null,
    representativeCount: 1,
    isActive: true,
  },
  {
    id: "3",
    name: "شرکت گاما لجستیک",
    monthlyQuota: 15,
    representativeCount: 2,
    isActive: false,
  },
  {
    id: "4",
    name: "شرکت سولار صنعت",
    monthlyQuota: 15,
    representativeCount: 2,
    isActive: false,
  },
  {
    id: "5",
    name: "شرکت رباط مخزن",
    monthlyQuota: 15,
    representativeCount: 2,
    isActive: false,
  },
  {
    id: "6",
    name: "شرکت نورد گرم فلز",
    monthlyQuota: 15,
    representativeCount: 2,
    isActive: false,
  },
];

export default function Units() {
  const [units, setUnits] = useState<Unit[]>(mockUnits);
  const [showModal, setShowModal] = useState(false);
  const [newUnit, setNewUnit] = useState({ name: "", monthlyQuota: "" });
  const [search, setSearch] = useState("");
  const filteredUnits = units.filter((unit) => unit.name.includes(search));
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUnits.length / pageSize);

  const paginatedUnits = filteredUnits.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const navigate = useNavigate();

  function handleAdd() {
    if (!newUnit.name) return;
    const unit: Unit = {
      id: Date.now().toString(),
      name: newUnit.name,
      monthlyQuota: newUnit.monthlyQuota ? Number(newUnit.monthlyQuota) : null,
      representativeCount: 0,
      isActive: true,
    };
    setUnits([...units, unit]);
    setNewUnit({ name: "", monthlyQuota: "" });
    setShowModal(false);
  }

  return (
    <div dir="rtl">
      {/* هدر صفحه */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">واحدها</h1>
          <p className="text-sm text-gray-400 mt-0.5">مدیریت واحدهای سازمانی</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="جستجو..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 w-48"
          />
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            <span>+</span>
            افزودن واحد
          </button>
        </div>
      </div>

      {/* جدول */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 text-right">
              <th className="px-5 py-3 font-medium">نام واحد</th>
              <th className="px-5 py-3 font-medium">سقف ماهانه</th>
              <th className="px-5 py-3 font-medium">نمایندگان</th>
              <th className="px-5 py-3 font-medium">وضعیت</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedUnits.map((unit) => (
              <tr
                key={unit.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-3 font-medium text-gray-800">
                  {unit.name}
                </td>

                <td className="px-5 py-3 text-gray-500">
                  {unit.monthlyQuota ?? (
                    <span className="text-gray-300">پیش‌فرض Zone</span>
                  )}
                </td>

                <td className="px-5 py-3 text-gray-500">
                  {unit.representativeCount} نفر
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      unit.isActive
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {unit.isActive ? "فعال" : "غیرفعال"}
                  </span>
                </td>
                <td className="px-5 py-3 text-left">
                  <button
                    onClick={() => navigate(`/admin/units/${unit.id}`)}
                    className="text-xs text-blue-500 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-2 py-1 rounded-lg transition-colors"
                  >
                    مدیریت
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {filteredUnits.length} واحد — صفحه {currentPage} از {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                قبلی
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                      page === currentPage
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal افزودن واحد */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg" dir="rtl">
            <h2 className="text-base font-semibold text-gray-800 mb-5">
              افزودن واحد جدید
            </h2>

            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-1.5">
                نام واحد
              </label>
              <input
                type="text"
                value={newUnit.name}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, name: e.target.value })
                }
                placeholder="مثلاً: شرکت آلفا تجارت"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600 block mb-1.5">
                سقف ماهانه
                <span className="text-gray-400 mr-1">
                  (اختیاری — خالی = پیش‌فرض Zone)
                </span>
              </label>
              <input
                type="number"
                value={newUnit.monthlyQuota}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, monthlyQuota: e.target.value })
                }
                placeholder="مثلاً: 20"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors"
              >
                ثبت واحد
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm py-2 rounded-lg transition-colors"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
