import { useState, useRef } from "react";
import { Send, CheckCircle, ChevronRight } from "lucide-react";
import type { Vehicle, Cargo, Gate, NewPermitForm } from "../../../types/representative";
import { VEHICLE_TYPES } from "../../../types/vehicleType";
import PlateInput from "../../../components/PlateInput";
import VehicleModal from "../../../components/VehicleModal";


interface NewPermitTabProps {
  vehicles: Vehicle[];
  cargos: Cargo[];
  gates: Gate[];
  onIssued: () => void;
}

type Step = "form" | "otp" | "success";

const EMPTY_PLATE: [string, string, string] = ["", "", ""];
const EMPTY_FORM: NewPermitForm = {
  vehicleId: null,
  plate: EMPTY_PLATE,
  cargoId: "",
  gateId: "",
  description: "",
};

export default function NewPermitTab({ vehicles, cargos, gates, onIssued }: NewPermitTabProps) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<NewPermitForm>(EMPTY_FORM);
  const [foundVehicle, setFoundVehicle] = useState<Vehicle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [timerActive, setTimerActive] = useState(false);
  const [issuedId, setIssuedId] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const startTimer = () => {
    setTimer(120);
    setTimerActive(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setTimerActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const onPlateChange = (plate: [string, string, string]) => {
    setForm((f) => ({ ...f, plate, vehicleId: null }));
    const key = plate.join("");
    if (plate[0].length === 2 && plate[1].length >= 1 && plate[2].length === 5) {
      const v = vehicles.find((v) => v.plate.join("") === key);
      setFoundVehicle(v ?? null);
      setForm((f) => ({ ...f, vehicleId: v?.id ?? null }));
    } else {
      setFoundVehicle(null);
    }
  };

  const onVehicleSelect = (v: Vehicle) => {
    setForm((f) => ({ ...f, plate: v.plate, vehicleId: v.id }));
    setFoundVehicle(v);
    setShowModal(false);
  };

  const onSubmitForm = () => {
    if (!form.cargoId || !form.gateId || form.plate.some((p) => !p)) return;
    setStep("otp");
    setOtp(["", "", "", ""]);
    startTimer();
    setTimeout(() => otpRefs[0].current?.focus(), 100);
  };

  const onOtpInput = (idx: number, val: string) => {
    const clean = val.replace(/[^0-9۰-۹]/g, "").slice(-1);
    const next = [...otp];
    next[idx] = clean;
    setOtp(next);
    if (clean && idx < 3) otpRefs[idx + 1].current?.focus();
  };

  const onOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    }
  };

  const onVerify = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIssuedId(`P-۱۴۰۵-۰${Math.floor(Math.random() * 90 + 10)}`);
    setStep("success");
    onIssued();
  };

  const reset = () => {
    setStep("form");
    setForm(EMPTY_FORM);
    setFoundVehicle(null);
    setOtp(["", "", "", ""]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const timerLabel = `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`;
  const otpFull = otp.every((d) => d !== "");
  const isFormValid = form.plate.every((p) => p) && form.cargoId && form.gateId;

  const stepNum = step === "form" ? 1 : step === "otp" ? 2 : 3;

  return (
    <div className="pb-4" dir="rtl">

      {/* step bar */}
      <div className="flex items-center px-4 py-3 border-b border-gray-100">
        {[
          { n: 1, label: "اطلاعات" },
          { n: 2, label: "تایید OTP" },
          { n: 3, label: "صدور" },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                stepNum > s.n ? "bg-emerald-500 text-white" :
                stepNum === s.n ? "bg-blue-500 text-white" :
                "bg-gray-100 text-gray-400"
              }`}>
                {stepNum > s.n ? <CheckCircle className="w-3.5 h-3.5" /> : s.n}
              </div>
              <span className={`text-xs ${
                stepNum === s.n ? "text-gray-900 font-medium" :
                stepNum > s.n ? "text-emerald-600" : "text-gray-400"
              }`}>{s.label}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-px mx-2 ${stepNum > s.n ? "bg-emerald-400" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* ── فرم ── */}
      {step === "form" && (
        <div className="flex flex-col gap-4 p-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">پلاک خودرو</label>
            <PlateInput
              value={form.plate}
              onChange={onPlateChange}
              onSearchClick={() => setShowModal(true)}
            />
          </div>

          {/* خودرو شناسایی شد */}
          {foundVehicle && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5 flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-700">خودرو شناسایی شد</p>
                <p className="text-sm font-medium text-emerald-900 mt-0.5">{foundVehicle.name}</p>
                <p className="text-xs text-emerald-600">{VEHICLE_TYPES[foundVehicle.vehicleTypeId]?.label}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
          )}

          {/* پلاک وارد شد ولی ثبت نشده */}
          {!foundVehicle && form.plate.every((p) => p) && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
              <p className="text-xs text-gray-500 mb-2">این پلاک ثبت نشده — نوع خودرو را انتخاب کنید:</p>
              <select className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white">
                <option value="">نوع خودرو...</option>
                {Object.values(VEHICLE_TYPES).map((vt) => (
                  <option key={vt.id} value={vt.id}>{vt.label}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">کالا</label>
            <select
              value={form.cargoId}
              onChange={(e) => setForm((f) => ({ ...f, cargoId: e.target.value }))}
              className="w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
            >
              <option value="">انتخاب کالا...</option>
              {cargos.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">درب خروج</label>
            <select
              value={form.gateId}
              onChange={(e) => setForm((f) => ({ ...f, gateId: e.target.value }))}
              className="w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white"
            >
              <option value="">انتخاب درب خروج...</option>
              {gates.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">توضیحات (اختیاری)</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="توضیح بار یا مقصد..."
              className="w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
            />
          </div>

          <button
            onClick={onSubmitForm}
            disabled={!isFormValid}
            className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors mt-1"
          >
            <Send className="w-4 h-4" />
            درخواست کد تایید
          </button>
        </div>
      )}

      {/* ── OTP ── */}
      {step === "otp" && (
        <div className="flex flex-col items-center p-4 pt-6">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-2">کد تایید ارسال شد</h3>
          <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
            کد ۴ رقمی ارسال شده به موبایل شما را وارد کنید
          </p>

          {/* ۴ خانه OTP */}
          <div className="flex gap-3 mb-5 direction-ltr" style={{ direction: "ltr" }}>
            {otp.map((d, idx) => (
              <input
                key={idx}
                ref={otpRefs[idx]}
                type="tel"
                maxLength={1}
                value={d}
                onChange={(e) => onOtpInput(idx, e.target.value)}
                onKeyDown={(e) => onOtpKey(idx, e)}
                className={`w-12 h-14 border rounded-xl text-xl font-semibold text-center outline-none transition-colors ${
                  d ? "border-blue-400 bg-blue-50" : "border-gray-200 focus:border-blue-400"
                }`}
              />
            ))}
          </div>

          {/* تایمر و ارسال مجدد */}
          <div className="mb-5 text-center">
            {timerActive ? (
              <p className="text-xs text-gray-400">ارسال مجدد کد ({timerLabel})</p>
            ) : (
              <button
                onClick={() => { startTimer(); setOtp(["", "", "", ""]); }}
                className="text-xs text-blue-500"
              >
                ارسال مجدد کد
              </button>
            )}
          </div>

          <div className="flex gap-2 w-full">
            <button
              onClick={() => setStep("form")}
              className="flex items-center justify-center gap-1 px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-600"
            >
              <ChevronRight className="w-4 h-4" />
              بازگشت
            </button>
            <button
              onClick={onVerify}
              disabled={!otpFull}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              تایید و صدور برگه
            </button>
          </div>
        </div>
      )}

      {/* ── موفق ── */}
      {step === "success" && (
        <div className="flex flex-col items-center p-4 pt-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">برگه خروج صادر شد</h3>
          <p className="text-sm text-gray-400 mb-5">شماره برگه: {issuedId}</p>

          <div className="w-full border border-gray-100 rounded-xl p-4 mb-5 flex flex-col gap-3">
            {[
              { label: "کالا",       value: cargos.find(c => c.id === form.cargoId)?.name ?? "—" },
              { label: "درب خروج",  value: gates.find(g => g.id === form.gateId)?.name ?? "—" },
              { label: "پلاک",      value: form.plate.join(" ") },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{row.label}</span>
                <span className="font-medium text-gray-900">{row.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={reset}
            className="w-full py-3 rounded-lg bg-gray-100 text-sm font-medium text-gray-700"
          >
            بازگشت به لیست برگه‌ها
          </button>
        </div>
      )}

      {showModal && (
        <VehicleModal
          vehicles={vehicles}
          onSelect={onVehicleSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
