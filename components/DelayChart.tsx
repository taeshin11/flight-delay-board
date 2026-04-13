"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

interface MonthlyData {
  month: string;
  onTimeRate: number;
}

interface Props {
  data: MonthlyData[];
  title?: string;
}

export default function DelayChart({ data, title = "Monthly On-Time Performance" }: Props) {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "On-Time Rate (%)",
        data: data.map((d) => Math.round(d.onTimeRate * 10) / 10),
        backgroundColor: data.map((d) =>
          d.onTimeRate >= 85
            ? "rgba(16, 185, 129, 0.7)"
            : d.onTimeRate >= 75
            ? "rgba(245, 158, 11, 0.7)"
            : "rgba(239, 68, 68, 0.7)"
        ),
        borderColor: data.map((d) =>
          d.onTimeRate >= 85
            ? "rgb(16, 185, 129)"
            : d.onTimeRate >= 75
            ? "rgb(245, 158, 11)"
            : "rgb(239, 68, 68)"
        ),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: !!title,
        text: title,
        color: "#0c2340",
        font: { size: 14, weight: "bold" as const },
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (ctx: any) => `${ctx.parsed.y}% on-time`,
        },
      },
    },
    scales: {
      y: {
        min: 60,
        max: 100,
        ticks: {
          callback: (value: string | number) => `${value}%`,
          color: "#64748b",
        },
        grid: { color: "rgba(14,165,233,0.1)" },
      },
      x: {
        ticks: { color: "#64748b" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl border border-sky-100 shadow-sm p-5">
      <Bar data={chartData} options={options} />
    </div>
  );
}
