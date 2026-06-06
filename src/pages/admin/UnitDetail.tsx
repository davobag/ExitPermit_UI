import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
}

interface Representative {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
}
interface UnitDetail {
  id: string;
  name: string;
  monthlyQuota: number | null;
  isActive: boolean;
  owner: Owner | null;
  representatives: Representative[];
}

// mock data — بعداً از API میگیریم
const mockUnitDetails: Record<string, UnitDetail> = {
  "1": {
    id: "1",
    name: "شرکت آلفا تجارت",
    monthlyQuota: 20,
    isActive: true,
    owner: {
      id: "u1",
      firstName: "علی",
      lastName: "محمدی",
      mobile: "09121234567",
      nationalCode: "0012345678",
    },
    representatives: [
      {
        id: "r1",
        firstName: "رضا",
        lastName: "کریمی",
        mobile: "09351234567",
        nationalCode: "0087654321",
      },
      {
        id: "r2",
        firstName: "سارا ",
        lastName: "احمدی",
        mobile: "09181234567",
        nationalCode: "0045678901",
      },
    ],
  },
  "2": {
    id: "2",
    name: "کارخانه بتا صنعت",
    monthlyQuota: null,
    isActive: true,
    owner: null,
    representatives: [],
  },
  "3": {
    id: "3",
    name: "شرکت گاما لجستیک",
    monthlyQuota: 15,
    isActive: false,
    owner: null,
    representatives: [],
  },
};

export default function UnitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [unit, setUnit] = useState<UnitDetail | null>(
    id ? (mockUnitDetails[id] ?? null) : null,
  );

  // state های modal
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showRepModal, setShowRepModal] = useState(false);
  const [newOwner, setNewOwner] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    nationalCode: "",
  });
  const [newRep, setNewRep] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    nationalCode: "",
  });

  if (!unit)
    return <div className="text-center py-20 text-gray-400">واحد پیدا نشد</div>;

  function handleAddOwner() {
    if (
      !newOwner.firstName ||
      !newOwner.lastName ||
      !newOwner.mobile ||
      !newOwner.nationalCode ||
      !unit
    )
      return;

    setUnit({
      ...unit,
      owner: { id: unit.owner?.id ?? Date.now().toString(), ...newOwner },
    });
    setNewOwner({ firstName: "", lastName: "", mobile: "", nationalCode: "" });
    setShowOwnerModal(false);
  }

  function handleAddRep() {
    if (
      !newRep.firstName ||
      !newRep.lastName ||
      !newRep.nationalCode ||
      !newRep.mobile ||
      !unit
    )
      return;
    const rep: Representative = { id: Date.now().toString(), ...newRep };
    setUnit({ ...unit, representatives: [...unit.representatives, rep] });
    setNewRep({
      firstName: "",
      lastName: "",
      mobile: "",
      nationalCode: "",
    });
    setShowRepModal(false);
  }

  function handleRemoveRep(repId: string) {
    if (!unit) return;
    setUnit({
      ...unit,
      representatives: unit.representatives.filter((r) => r.id !== repId),
    });
  }

  return (
    <div dir="rtl">
      {/* هدر */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin/units")}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← بازگشت
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{unit.name}</h1>
          <p className="text-sm text-gray-400 mt-0.5">مدیریت واحد</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {/* اطلاعات واحد */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            اطلاعات واحد
          </h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">نام واحد</span>
              <p className="text-gray-800 mt-1 font-medium">{unit.name}</p>
            </div>
            <div>
              <span className="text-gray-400">سقف ماهانه</span>
              <p className="text-gray-800 mt-1 font-medium">
                {unit.monthlyQuota ?? "پیش‌فرض Zone"}
              </p>
            </div>
            <div>
              <span className="text-gray-400">وضعیت</span>
              <p className="mt-1">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    unit.isActive
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {unit.isActive ? "فعال" : "غیرفعال"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* مالک */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">مالک واحد</h2>
            {!unit.owner && (
              <button
                onClick={() => setShowOwnerModal(true)}
                className="text-xs text-blue-500 hover:text-blue-700 border border-blue-200 px-3 py-1 rounded-lg transition-colors"
              >
                + افزودن مالک
              </button>
            )}
          </div>
          {unit.owner ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 text-sm font-medium flex items-center justify-center">
                {unit.owner.lastName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {unit.owner.lastName}
                </p>
                <p className="text-xs text-gray-400">{unit.owner.mobile}</p>
              </div>
              <span className="mr-auto text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                Owner
              </span>
              <button
                onClick={() => {
                  setNewOwner({
                    firstName: unit.owner!.firstName,
                    lastName: unit.owner!.lastName,
                    mobile: unit.owner!.mobile,
                    nationalCode: unit.owner!.nationalCode,
                  });
                  setShowOwnerModal(true);
                }}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                ویرایش
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400">مالکی ثبت نشده</p>
          )}
        </div>

        {/* نمایندگان */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">
              نمایندگان
              <span className="text-gray-400 font-normal mr-2">
                ({unit.representatives.length} نفر)
              </span>
            </h2>
            <button
              onClick={() => setShowRepModal(true)}
              className="text-xs text-blue-500 hover:text-blue-700 border border-blue-200 px-3 py-1 rounded-lg transition-colors"
            >
              + افزودن نماینده
            </button>
          </div>

          {unit.representatives.length === 0 ? (
            <p className="text-sm text-gray-400">نماینده‌ای ثبت نشده</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {unit.representatives.map((rep) => (
                <div key={rep.id} className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex items-center justify-center">
                    {unit.owner?.lastName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-800">
                        {rep.lastName}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">{rep.mobile}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveRep(rep.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal مالک */}
      {showOwnerModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg" dir="rtl">
            <h2 className="text-base font-semibold text-gray-800 mb-5">
              افزودن مالک
            </h2>
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-1.5">نام</label>
              <input
                type="text"
                value={newOwner.firstName}
                onChange={(e) =>
                  setNewOwner({ ...newOwner, firstName: e.target.value })
                }
                placeholder="مثلاً: علی"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-1.5">
                نام خانوادگی
              </label>
              <input
                type="text"
                value={newOwner.lastName}
                onChange={(e) =>
                  setNewOwner({ ...newOwner, lastName: e.target.value })
                }
                placeholder="مثلاً: محمدی"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm text-gray-600 block mb-1.5">
                شماره موبایل
              </label>
              <input
                type="text"
                value={newOwner.mobile}
                onChange={(e) =>
                  setNewOwner({ ...newOwner, mobile: e.target.value })
                }
                placeholder="مثلاً: 09121234567"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm text-gray-600 block mb-1.5">
                کد ملی
              </label>
              <input
                type="text"
                value={newOwner.nationalCode}
                onChange={(e) =>
                  setNewOwner({ ...newOwner, nationalCode: e.target.value })
                }
                placeholder="مثلاً: 0012345678"
                maxLength={10}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddOwner}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors"
              >
                ثبت مالک
              </button>
              <button
                onClick={() => setShowOwnerModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm py-2 rounded-lg transition-colors"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal نماینده */}
      {showRepModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg" dir="rtl">
            <h2 className="text-base font-semibold text-gray-800 mb-5">
              افزودن نماینده
            </h2>
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-1.5">نام</label>
              <input
                type="text"
                value={newRep.firstName}
                onChange={(e) =>
                  setNewRep({ ...newRep, firstName: e.target.value })
                }
                placeholder="مثلاً: رضا"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-1.5">
                نام خانوادگی
              </label>
              <input
                type="text"
                value={newRep.lastName}
                onChange={(e) =>
                  setNewRep({ ...newRep, lastName: e.target.value })
                }
                placeholder="مثلاً: کریمی"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-1.5">
                کد ملی
              </label>
              <input
                type="text"
                value={newRep.nationalCode}
                onChange={(e) =>
                  setNewRep({ ...newRep, nationalCode: e.target.value })
                }
                placeholder="مثلاً: 0012345678"
                maxLength={10}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-1.5">
                شماره موبایل
              </label>
              <input
                type="text"
                value={newRep.mobile}
                onChange={(e) =>
                  setNewRep({ ...newRep, mobile: e.target.value })
                }
                placeholder="مثلاً: 09351234567"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-4 flex items-center gap-3">
              <label htmlFor="isPrimary" className="text-sm text-gray-600">
                نماینده اصلی
              </label>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddRep}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors"
              >
                ثبت نماینده
              </button>
              <button
                onClick={() => setShowRepModal(false)}
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
