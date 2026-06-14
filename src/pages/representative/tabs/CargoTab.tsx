import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import  type { Cargo } from "../../../types/representative";
import ConfirmModal from "../../../components/shared/ConfirmModal";

interface CargoTabProps {
  cargos: Cargo[];
  onChange: (cargos: Cargo[]) => void;
}

interface CargoForm {
  name: string;
  code: string;
}

export default function CargoTab({ cargos, onChange }: CargoTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<CargoForm>({ name: "", code: "" });
  const [deleteTarget, setDeleteTarget] = useState<Cargo | null>(null);

  const openAdd = () => {
    setEditId(null);
    setForm({ name: "", code: "" });
    setShowForm(true);
  };

  const openEdit = (c: Cargo) => {
    setEditId(c.id);
    setForm({ name: c.name, code: c.code });
    setShowForm(true);
  };

  const onSave = () => {
    if (!form.name.trim()) return;
    if (editId) {
      onChange(cargos.map((c) => c.id === editId ? { ...c, ...form } : c));
    } else {
      const newCargo: Cargo = { id: `c${Date.now()}`, name: form.name, code: form.code };
      onChange([...cargos, newCargo]);
    }
    setShowForm(false);
  };

  const onDelete = (id: string) => {
    onChange(cargos.filter((c) => c.id !== id));
  };

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
        افزودن کالای جدید
      </button>

      {/* فرم افزودن/ویرایش */}
      {showForm && (
        <div className="border border-blue-200 bg-blue-50 rounded-xl p-3 flex flex-col gap-2.5">
          <p className="text-xs font-medium text-blue-800">{editId ? "ویرایش کالا" : "کالای جدید"}</p>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="نام کالا"
            className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
            autoFocus
          />
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
            placeholder="کد کالا (اختیاری)"
            className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-500 bg-white"
            >
              <X className="w-3.5 h-3.5" /> انصراف
            </button>
            <button
              onClick={onSave}
              disabled={!form.name.trim()}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium disabled:opacity-40"
            >
              <Check className="w-3.5 h-3.5" /> ذخیره
            </button>
          </div>
        </div>
      )}

      {cargos.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-400">کالایی ثبت نشده</div>
      ) : (
        cargos.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-white">
            <div>
              <p className="text-sm font-medium text-gray-900">{c.name}</p>
              {c.code && <p className="text-xs text-gray-400 mt-0.5">کد: {c.code}</p>}
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => openEdit(c)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-300"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteTarget(c)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))
      )}
      {deleteTarget && (
        <ConfirmModal
          title="حذف کالا"
          message={`آیا از حذف «${deleteTarget.name}» مطمئن هستید؟`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
