import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import type { TrendPoint } from "../../../types/dashboard";
import { toPersianDigits } from "../../../utils/numbers";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

interface TrendChartProps {
  data7d: TrendPoint[];
  data30d: TrendPoint[];
}

export default function TrendChart({ data7d, data30d }: TrendChartProps) {
  const [range, setRange] = useState<7 | 30>(7);
  const data = range === 7 ? data7d : data30d;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-900">روند صدور برگه</p>
        <div className="flex gap-1 bg-gray-50 rounded-lg p-0.5">
          <button
            onClick={() => setRange(7)}
            className={`text-xs px-3 py-1 rounded-md transition-colors ${
              range === 7 ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            ۷ روز
          </button>
          <button
            onClick={() => setRange(30)}
            className={`text-xs px-3 py-1 rounded-md transition-colors ${
              range === 30 ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            ۳۰ روز
          </button>
        </div>
      </div>

      <div className="relative h-56">
        <Line
          aria-label="نمودار خطی تعداد برگه‌های صادره در بازه زمانی انتخاب‌شده"
          role="img"
          data={{
            labels: data.map((d) => toPersianDigits(d.label)),
            datasets: [
              {
                label: "تعداد برگه",
                data: data.map((d) => d.count),
                borderColor: "#378ADD",
                backgroundColor: "rgba(55,138,221,0.08)",
                fill: true,
                tension: 0.35,
                pointRadius: range === 7 ? 3 : 0,
                pointBackgroundColor: "#378ADD",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 10 } },
              x: { ticks: { autoSkip: true, maxRotation: 0 } },
            },
          }}
        />
      </div>
    </div>
  );
}
