/* eslint-disable @typescript-eslint/no-explicit-any */
import { Info, Search } from "lucide-react";
import { useState } from "react";
import BZForm from "../forms/BZForm";
import BZInput from "../forms/BZInput";
import BZTable from "../forms/BZTable";
import BZTimePicker from "../forms/BZTimePicker";
import { salesData } from "../utils/earnings";
import EarningsDetailsModal from "../components/modal/EarningsDetailsModal";

const Earnings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEarning, setSelectedEarning] = useState<any>(null);

  const handleViewDetails = (earning: any) => {
    setSelectedEarning(earning);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEarning(null);
  };

  const columns = [
    { key: "OrderID", title: "Order ID" },
    { key: "SaleAmount", title: "Sale Amount" },
    { key: "CustomerEndCommission7.5%", title: "Customer Commission" },
    { key: "CookEndCommission7.5%", title: "Cook Commission" },
    { key: "CommissionAmount", title: "Platform Commission" },
    { key: "Date", title: "Date" },
    {
      key: "Status",
      title: "Status",
      render: (record: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            record.Status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : record.Status === "Completed"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {record.Status}
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
          <p className="text-xl">$12030</p>
        </div>
        <div className="bg-[#f6a04d] text-white p-6 rounded-md">
          <h3 className="text-2xl font-semibold">Total Customers</h3>
          <p className="text-xl">376</p>
        </div>
        <div className="bg-[#4c9f7d] text-white p-6 rounded-md">
          <h3 className="text-2xl font-semibold">Total Cooks</h3>
          <p className="text-xl">98</p>
        </div>
      </div>

      {/* Filter + Count Row */}
      <BZForm onSubmit={() => {}}>
        <div className="flex justify-between items-center">
          {/* Left: Count */}
          <h3 className="text-lg font-medium">
            All Transactions{" "}
            <span className="text-gray-600">({salesData.length})</span>
          </h3>

          {/* Right: Filters */}
          <div className="flex items-center gap-3">
            {/* Date Filter */}
            <BZTimePicker
              style={{
                width: "200px",
                height: "40px",
                borderRadius: "17px",
                borderColor: "#d49256",
                marginTop: "28px",
              }}
              name="date"
            />

            <div className="flex items-center relative">
              <BZInput
                name="searchName"
                label=""
                type="text"
                placeholder="Search Order ID"
                className="rounded-r-none"
                style={{
                  width: "300px",
                  height: "40px",
                  borderRadius: "17px",
                  borderColor: "#d49256",
                  marginTop: "6px",
                }}
              />
              <button
                type="submit"
                className="bg-[#d49256] h-[40px] w-12 rounded-full flex items-center justify-center text-white absolute right-0 mt-1.5 z-10 cursor-pointer hover:bg-[#c07d45] transition duration-200"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </BZForm>

      {/* Table */}
      <BZTable columns={columns} data={salesData} />

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
