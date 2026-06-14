import { useState } from "react";
import type { ZoneSettings, ZoneAdmin, NewZoneAdminForm } from "../../types/zone";
import { MOCK_ZONE_SETTINGS, MOCK_ZONE_ADMINS } from "../../mocks/zone_mocks";
import ContactInfoModal from "../../components/shared/ContactInfoModal";
import ConfirmModal from "../../components/shared/ConfirmModal";
import ZoneSettingsPanel from "./components/ZoneSettingsPanel";
import ZoneAdminsPanel from "./components/ZoneAdminsPanel";
import ZoneAdminFormModal from "./components/ZoneAdminFormModal";

export default function Zone() {
  const [settings, setSettings] = useState<ZoneSettings>(MOCK_ZONE_SETTINGS);
  const [admins, setAdmins] = useState<ZoneAdmin[]>(MOCK_ZONE_ADMINS);

  const [contactTarget, setContactTarget] = useState<ZoneAdmin | null>(null);
  const [editTarget, setEditTarget] = useState<ZoneAdmin | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ZoneAdmin | null>(null);

  const handleSaveSettings = (next: ZoneSettings) => {
    setSettings(next);
    // TODO: ارسال به API
  };

  const toggleActive = (id: string) => {
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)));
  };

  const handleAdd = (form: NewZoneAdminForm) => {
    const admin: ZoneAdmin = { id: Date.now().toString(), ...form, isActive: true };
    setAdmins((prev) => [...prev, admin]);
    setShowAddModal(false);
  };

  const handleEditSave = (form: NewZoneAdminForm) => {
    if (!editTarget) return;
    setAdmins((prev) => prev.map((a) => (a.id === editTarget.id ? { ...a, ...form } : a)));
    setEditTarget(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setAdmins((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div dir="rtl">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-800">زون</h1>
        <p className="text-sm text-gray-400 mt-0.5">تنظیمات کلی و مدیران زون</p>
      </div>

      <div className="flex flex-col gap-4">
        <ZoneSettingsPanel settings={settings} onSave={handleSaveSettings} />

        <ZoneAdminsPanel
          admins={admins}
          onAdd={() => setShowAddModal(true)}
          onEdit={setEditTarget}
          onDelete={setDeleteTarget}
          onContact={setContactTarget}
          onToggle={toggleActive}
        />
      </div>

      {/* اطلاعات تماس */}
      {contactTarget && (
        <ContactInfoModal guard={contactTarget} onClose={() => setContactTarget(null)} />
      )}

      {/* افزودن */}
      {showAddModal && (
        <ZoneAdminFormModal onSave={handleAdd} onClose={() => setShowAddModal(false)} />
      )}

      {/* ویرایش */}
      {editTarget && (
        <ZoneAdminFormModal
          admin={editTarget}
          onSave={handleEditSave}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* حذف */}
      {deleteTarget && (
        <ConfirmModal
          title="حذف مدیر زون"
          message={`آیا از حذف «${deleteTarget.firstName} ${deleteTarget.lastName}» مطمئن هستید؟`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
