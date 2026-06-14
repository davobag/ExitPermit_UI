import  { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  sub: string;
  subPositive?: boolean;
}

export default function MetricCard({ icon, label, value, sub, subPositive }: MetricCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-1.5">
        {icon}
        {label}
      </div>
      <div className="text-2xl font-medium text-gray-900">{value}</div>
      <div className={`text-xs mt-1 ${subPositive ? "text-emerald-600" : "text-gray-400"}`}>
        {sub}
      </div>
    </div>
  );
}
