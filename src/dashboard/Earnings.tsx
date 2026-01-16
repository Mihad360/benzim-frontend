/* eslint-disable @typescript-eslint/no-explicit-any */
import { Info, Search } from "lucide-react";
import { useState } from "react";
import BZTable from "../forms/BZTable";
import EarningsDetailsModal from "../components/modal/EarningsDetailsModal";
import {
  useAdminEarningsQuery,
  useDashboardStatsQuery,
} from "../services/redux/api/earningApi";
import Loading from "../components/loading/Loading";
import { Input, DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import { useDebounce } from "../hooks/debounce.hook";

const Earnings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEarning, setSelectedEarning] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  // ✅ Debounce search term
  const debouncedSearch = useDebounce(searchValue, 500);

  // ✅ Build filters object
  const filters = {
    ...(selectedDate && { date: selectedDate }),
    ...(debouncedSearch.trim() && { searchTerm: debouncedSearch.trim() }),
  };

  const { data: dashboardStats, isLoading: dashboardLoading } =
    useDashboardStatsQuery(undefined);
  const {
    data: adminEarnings,
    isLoading,
    isFetching,
  } = useAdminEarningsQuery(filters);

  const dashboard = dashboardStats?.data;
  const earnings = adminEarnings?.data || [];

  // ✅ Check if filters are active
  const hasActiveFilters = selectedDate || debouncedSearch.trim();

  const handleViewDetails = (earning: any) => {
    setSelectedEarning(earning);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEarning(null);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date ? dayjs(date).format("YYYY-MM-DD") : undefined);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const columns = [
    { key: "orderNo", title: "Order NO" },
    { key: "totalPaidByCustomer", title: "Sale Amount" },
    { key: "cookEarnings", title: "Cook Commission" },
    { key: "adminEarn", title: "Platform Commission" },
    { key: "date", title: "Date" },
    {
      key: "status",
      title: "Status",
      render: (record: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            record.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : record.status === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {record.status}
        </span>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (record: any) => (
        <button
          className="bg-[#d49256] hover:bg-[#c07d45] text-white p-2 rounded-md cursor-pointer transition duration-200 flex items-center justify-center"
          onClick={() => handleViewDetails(record)}
        >
          <Info size={16} />
        </button>
      ),
    },
  ];

  // ✅ Initial page load
  if (dashboardLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Orange Header Bar */}
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold">Earnings</h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#d49256] text-white p-6 rounded-md">
          <h3 className="text-2xl font-semibold">Total Earnings</h3>
          <p className="text-xl">${dashboard?.totalEarnings}</p>
        </div>
        <div className="bg-[#f6a04d] text-white p-6 rounded-md">
          <h3 className="text-2xl font-semibold">Total Customers</h3>
          <p className="text-xl">{dashboard?.totalUsers}</p>
        </div>
        <div className="bg-[#4c9f7d] text-white p-6 rounded-md">
          <h3 className="text-2xl font-semibold">Total Cooks</h3>
          <p className="text-xl">{dashboard?.totalCooks}</p>
        </div>
      </div>

      {/* Filter + Count Row */}
      <div className="flex justify-between items-center">
        {/* Left: Count */}
        <h3 className="text-lg font-medium">
          All Transactions{" "}
          <span className="text-gray-600">({earnings.length})</span>
        </h3>

        {/* Right: Filters */}
        <div className="flex items-center gap-3">
          {/* Date Filter */}
          <DatePicker
            onChange={handleDateChange}
            placeholder="Select Date"
            format="YYYY-MM-DD"
            style={{
              width: 200,
              height: 40,
              borderRadius: 17,
              borderColor: "#d49256",
            }}
            className="[&_.ant-picker-input]:!h-[40px]"
          />

          {/* Search Input with Loading Indicator */}
          <div className="flex items-center relative">
            <Input
              placeholder="Search Order ID"
              value={searchValue}
              onChange={handleSearchChange}
              style={{
                width: 300,
                height: 40,
                borderRadius: 17,
                borderColor: "#d49256",
                paddingRight: 48,
              }}
            />
            <div className="bg-[#d49256] h-[40px] w-12 rounded-full flex items-center justify-center text-white absolute right-0 pointer-events-none">
              {isFetching ? (
                <Spin
                  size="small"
                  className="[&_.ant-spin-dot-item]:bg-white"
                />
              ) : (
                <Search size={18} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table with Loading State & No Data Message */}
      <div className="relative min-h-[300px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spin size="large" />
          </div>
        ) : earnings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-gray-100 rounded-full p-6">
                <Search size={48} className="text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-700">
                  No Transactions Found
                </h3>
                <p className="text-gray-500">
                  {hasActiveFilters
                    ? "No transactions match your search criteria. Try adjusting your filters."
                    : "No transactions available at the moment."}
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchValue("");
                    setSelectedDate(undefined);
                  }}
                  className="mt-4 px-6 py-2 bg-[#d49256] hover:bg-[#c07d45] text-white rounded-md transition duration-200 cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <BZTable columns={columns} data={earnings} />
        )}
      </div>

      {/* Earnings Details Modal */}
      <EarningsDetailsModal
        open={modalOpen}
        onCancel={handleModalClose}
        earningsData={selectedEarning}
      />
    </div>
  );
};

export default Earnings;
