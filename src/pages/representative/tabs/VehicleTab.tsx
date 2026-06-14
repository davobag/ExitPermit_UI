import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import type { Vehicle } from "../../../types/representative";
import { VEHICLE_TYPES } from "../../../types/vehicleType";
import ConfirmModal from "../../../components/shared/ConfirmModal";

interface VehicleTabProps {
  vehicles: Vehicle[];
  onChange: (vehicles: Vehicle[]) => void;
}

interface VehicleForm {
  name: string;
  vehicleTypeId: number;
  plate: [string, string, string];
}

const EMPTY_FORM: VehicleForm = { name: "", vehicleTypeId: 1, plate: ["", "", ""] };

export default function VehicleTab({ vehicles, onChange }: VehicleTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<VehicleForm>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);

  const openAdd = () => { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit = (v: Vehicle) => {
    setEditId(v.id);
    setForm({ name: v.name, vehicleTypeId: v.vehicleTypeId, plate: [...v.plate] as [string,string,string] });
    setShowForm(true);
  };

  const isFormValid = form.name.trim() && form.plate.every((p) => p.trim());

  const onSave = () => {
    if (!isFormValid) return;
    if (editId) {
      onChange(vehicles.map((v) => v.id === editId ? { ...v, ...form } : v));
    } else {
      onChange([...vehicles, { id: `v${Date.now()}`, ...form }]);
    }
    setShowForm(false);
  };

  const onDelete = (id: string) => onChange(vehicles.filter((v) => v.id !== id));

  const confirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      <button
        onClick={openAdd}
        className="flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        <Plus className="w-4 h-4" />
        افزودن خودرو جدید
      </button>

      {showForm && (
        <div className="border border-blue-200 bg-blue-50 rounded-xl p-3 flex flex-col gap-2.5">
          <p className="text-xs font-medium text-blue-800">{editId ? "ویرایش خودرو" : "خودرو جدید"}</p>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="نام خودرو (مثلاً پژو ۴۰۵)"
            className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
            autoFocus
          />
          <select
            value={form.vehicleTypeId}
            onChange={(e) => setForm((f) => ({ ...f, vehicleTypeId: Number(e.target.value) }))}
            className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
          >
            {Object.values(VEHICLE_TYPES).map((vt) => (
              <option key={vt.id} value={vt.id}>{vt.label}</option>
            ))}
          </select>
          {/* پلاک */}
          <div className="flex gap-1.5">
            {[
              { idx: 0, placeholder: "۱۲", maxLen: 2 },
              { idx: 1, placeholder: "ب",  maxLen: 2 },
              { idx: 2, placeholder: "۳۴۵۶۷", maxLen: 5 },
            ].map(({ idx, placeholder, maxLen }) => (
              <input
                key={idx}
                type="text"
                maxLength={maxLen}
                value={form.plate[idx as 0|1|2]}
                onChange={(e) => {
                  const p: [string,string,string] = [...form.plate] as [string,string,string];
                  p[idx as 0|1|2] = e.target.value;
                  setForm((f) => ({ ...f, plate: p }));
                }}
                placeholder={placeholder}
                className="flex-1 py-2 px-2 border border-gray-200 rounded-lg text-sm font-semibold text-center outline-none focus:border-blue-400 bg-white"
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-500 bg-white"
            >
              <X className="w-3.5 h-3.5" /> انصراف
            </button>
            <button
              onClick={onSave}
              disabled={!isFormValid}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium disabled:opacity-40"
            >
              <Check className="w-3.5 h-3.5" /> ذخیره
            </button>
          </div>
        </div>
      )}

      {vehicles.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-400">خودرویی ثبت نشده</div>
      ) : (
        vehicles.map((v) => {
          const vt = VEHICLE_TYPES[v.vehicleTypeId];
          return (
            <div key={v.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-white">
              <div>
                <p className="text-sm font-medium text-gray-900">{v.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {v.plate.join("")} — {vt?.label}
                </p>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => openEdit(v)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-300"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(v)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })
      )}
      {deleteTarget && (
        <ConfirmModal
          title="حذف خودرو"
          message={`آیا از حذف «${deleteTarget.name}» مطمئن هستید؟`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
