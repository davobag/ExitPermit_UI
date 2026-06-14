import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
import type { GateTraffic } from "../../../types/dashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface GateTrafficChartProps {
  data: GateTraffic[];
}

const COLORS = ["#378ADD", "#1D9E75", "#BA7517", "#7F77DD"];

export default function GateTrafficChart({ data }: GateTrafficChartProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <p className="text-sm font-medium text-gray-900 mb-4">ترافیک درب‌های خروج (امروز)</p>
      <div className="relative h-52">
        <Bar
          aria-label="نمودار میله‌ای تعداد خروج از هر درب امروز"
          role="img"
          data={{
            labels: data.map((g) => g.gateName),
            datasets: [
              {
                label: "تعداد خروج",
                data: data.map((g) => g.count),
                backgroundColor: data.map((_, i) => COLORS[i % COLORS.length]),
                borderRadius: 6,
                maxBarThickness: 50,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } },
          }}
        />
      </div>
    </div>
  );
}
