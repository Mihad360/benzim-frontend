/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { useDashboardStatsQuery } from "../services/redux/api/earningApi";
import Loading from "../components/loading/Loading";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EarningsChart = () => {
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const chartRef = useRef<ChartJS<"bar">>(null);

  // ✅ Send year as query param
  const { data: dashboardStats, isLoading } =
    useDashboardStatsQuery(selectedYear);

  const dashboard = dashboardStats?.data;
  const monthlyData = dashboard?.yearlyEarnings?.monthlyData;
  console.log(monthlyData);
  const chartData = {
    labels: monthlyData?.map((item: any) => item.month),
    datasets: [
      {
        label: "Earnings",
        data: monthlyData?.map((item: any) => Number(item.earnings)), // ✅ FIX
        backgroundColor: "#d49256",
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) =>
            `Earnings: $${Number(context.parsed.y).toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
        title: {
          display: true,
          text: "Earnings ($)",
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!monthlyData?.length) {
    return <p className="text-center">No data available</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between pt-3">
        <h3 className="text-xl font-medium">Earnings</h3>

        <Space>
          <DatePicker
            picker="year"
            value={dayjs(`${selectedYear}-01-01`)}
            onChange={(date) =>
              setSelectedYear(date ? date.year() : dayjs().year())
            }
            format="YYYY"
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "17px",
              borderColor: "gray",
            }}
          />
        </Space>
      </div>

      <div className="bg-white p-4 rounded-md shadow-sm">
        <div className="h-72">
          <Bar ref={chartRef} data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;
