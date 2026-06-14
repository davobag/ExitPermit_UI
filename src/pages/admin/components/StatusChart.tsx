import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import type { PermitStatusBreakdown } from "../../../types/dashboard";

ChartJS.register(ArcElement, Tooltip);

interface StatusChartProps {
  data: PermitStatusBreakdown;
}

export default function StatusChart({ data }: StatusChartProps) {
  const items = [
    { label: "تایید شده",   value: data.confirmed,          color: "#378ADD" },
    { label: "در انتظار",    value: data.pending,            color: "#BA7517" },
    { label: "لغو/منقضی",   value: data.cancelledOrExpired, color: "#E24B4A" },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <p className="text-sm font-medium text-gray-900 mb-4">وضعیت برگه‌ها (این ماه)</p>

      <div className="flex flex-wrap gap-3.5 mb-2 text-xs text-gray-500">
        {items.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
            {item.label} {item.value}٪
          </span>
        ))}
      </div>

      <div className="relative h-44">
        <Doughnut
          aria-label={`نمودار دایره‌ای وضعیت برگه‌ها: تایید شده ${items[0].value} درصد، در انتظار ${items[1].value} درصد، لغو یا منقضی ${items[2].value} درصد`}
          role="img"
          data={{
            labels: items.map((i) => i.label),
            datasets: [
              {
                data: items.map((i) => i.value),
                backgroundColor: items.map((i) => i.color),
                borderWidth: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "68%",
            plugins: { legend: { display: false } },
          }}
        />
      </div>
    </div>
  );
}
