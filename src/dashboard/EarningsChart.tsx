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

// Register Chart.js components for Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EarningsChart = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const chartRef = useRef<ChartJS<"bar">>(null);

  const monthlyEarnings = [
    { month: "Jan", earnings: 15000, year: 2025 },
    { month: "Feb", earnings: 12000, year: 2025 },
    { month: "Mar", earnings: 20000, year: 2025 },
    { month: "Apr", earnings: 14000, year: 2025 },
    { month: "May", earnings: 17000, year: 2025 },
    { month: "Jun", earnings: 22000, year: 2025 },
    { month: "Jul", earnings: 13000, year: 2025 },
    { month: "Aug", earnings: 18000, year: 2025 },
    { month: "Sept", earnings: 11000, year: 2025 },
    { month: "Oct", earnings: 15000, year: 2025 },
    { month: "Nov", earnings: 19000, year: 2025 },
    { month: "Dec", earnings: 25000, year: 2025 },
  ];

  // Filter data based on the selected year
  const filteredData = monthlyEarnings.filter((data) => {
    return selectedYear ? data.year === selectedYear : true;
  });

  const chartData = {
    labels: filteredData.map((data) => data.month),
    datasets: [
      {
        label: "Earnings",
        data: filteredData.map((data) => data.earnings),
        backgroundColor: "#d49256",
        borderColor: "#d49256",
        borderWidth: 1,
        borderRadius: 4, // Optional: rounded corners for bars
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Earnings: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
        title: {
          display: true,
          text: "Earnings ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between pt-3">
        <h3 className="text-xl font-medium">Earnings</h3>
        <Space direction="vertical" size={12}>
          <DatePicker
            picker="year"
            value={selectedYear ? dayjs(`${selectedYear}-01-01`) : null}
            onChange={(date) => setSelectedYear(date ? date.year() : null)}
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
          <Bar
            ref={chartRef}
            data={chartData}
            options={options}
            key={selectedYear} // Add key to force re-render
          />
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;
