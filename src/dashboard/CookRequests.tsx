/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import { useState } from "react";
import BZTable from "../forms/BZTable";
import Loading from "../components/loading/Loading";
import {
  useApproveCookMutation,
  useCookApprovalsQuery,
} from "../services/redux/api/cookApi";
import QuizCookResultDetailsModal from "../components/modal/QuizCookResultDetailsModal";
import Swal from "sweetalert2";
import { Input, Spin } from "antd";
import { useDebounce } from "../hooks/debounce.hook";

const CookRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCookResult, setSelectedCookResult] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");

  // ✅ Debounce search term
  const debouncedSearch = useDebounce(searchValue, 500);

  // ✅ Build filters object
  const filters = {
    ...(debouncedSearch.trim() && { searchTerm: debouncedSearch.trim() }),
  };

  // 🔹 This data comes from QuizCookResultModel
  const {
    data: cookQuizResults,
    isLoading,
    isFetching,
  } = useCookApprovalsQuery(filters);
  const [approveCook] = useApproveCookMutation();

  const cookData = cookQuizResults?.data || [];

  // ✅ Check if filters are active
  const hasActiveFilters = debouncedSearch.trim();

  const handleViewDetails = (quizResult: any) => {
    setSelectedCookResult(quizResult);
    setIsModalOpen(true);
  };

  const handleApproveCook = async (data: any) => {
    const result = await Swal.fire({
      title: "Approve Cook?",
      text: "This action will approve the cook permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve",
    });

    if (!result.isConfirmed) return;

    const res = await approveCook(data.cookId);
    console.log(res);
    if (res.data.success) {
      Swal.fire("Approved!", "Cook has been approved.", "success");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCookResult(null);
  };

  // ✅ Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // 📊 Table Columns (Model-driven)
  const columns = [
    {
      key: "ownerName",
      title: "Owner Name",
      render: (record: any) => record.verifyCookInfo?.ownerName || "N/A",
    },
    {
      key: "businessNumber",
      title: "Business Number",
      render: (record: any) => record.verifyCookInfo?.businessNumber || "—",
    },
    {
      key: "validIdType",
      title: "ID Type",
      render: (record: any) =>
        record.verifyCookInfo?.validIdType === "passport"
          ? "Passport"
          : "National ID",
    },
    {
      key: "quizScore",
      title: "Quiz Score",
      render: (record: any) => (
        <span className="font-medium">
          {record.correctAnswers} / {record.totalQuestions}
        </span>
      ),
    },
    {
      key: "quizResult",
      title: "Result",
      render: (record: any) => {
        const passPercentage = record.correctAnswers / record.totalQuestions;
        const isPassed = passPercentage >= 0.6;

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isPassed
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isPassed ? "Passed" : "Failed"}
          </span>
        );
      },
    },
    {
      key: "submittedAt",
      title: "Submitted At",
      render: (record: any) => new Date(record.createdAt).toLocaleDateString(),
    },
    {
      key: "status",
      title: "Status",
      render: (record: any) => {
        const status = record.verifyCookInfo?.status || "pending";

        const statusStyles: Record<string, string> = {
          pending: "bg-yellow-100 text-yellow-700",
          approved: "bg-green-100 text-green-700",
          rejected: "bg-red-100 text-red-700",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusStyles[status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (record: any) => (
        <button
          className="bg-[#d49256] hover:bg-[#c07d45] text-white px-4 py-2 rounded-md transition duration-200 cursor-pointer"
          onClick={() => handleViewDetails(record)}
        >
          View Details
        </button>
      ),
    },
    {
      key: "approve",
      title: "Action",
      render: (record: any) => {
        const isApproved = record.verifyCookInfo?.status === "approved";

        return (
          <button
            disabled={isApproved}
            onClick={() => handleApproveCook(record)}
            className={`px-4 py-2 rounded-md transition duration-200 text-white ${
              isApproved
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            {isApproved ? "Approved" : "Approve Cook"}
          </button>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold">Cook Quiz Approvals</h2>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          Total Requests{" "}
          <span className="text-gray-600">({cookData.length})</span>
        </h3>

        <div className="flex items-center gap-3">
          {/* Search Input with Loading Indicator */}
          <div className="flex items-center relative">
            <Input
              placeholder="Search by business number"
              value={searchValue}
              onChange={handleSearchChange}
              style={{
                width: 500,
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
        ) : cookData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-gray-100 rounded-full p-6">
                <Search size={48} className="text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-700">
                  No Cook Requests Found
                </h3>
                <p className="text-gray-500">
                  {hasActiveFilters
                    ? "No cook requests match your search criteria. Try adjusting your search."
                    : "No cook requests available at the moment."}
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={() => setSearchValue("")}
                  className="mt-4 px-6 py-2 bg-[#d49256] hover:bg-[#c07d45] text-white rounded-md transition duration-200 cursor-pointer"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          <BZTable columns={columns} data={cookData} />
        )}
      </div>

      {/* Details Modal */}
      <QuizCookResultDetailsModal
        open={isModalOpen}
        onCancel={handleModalClose}
        quizResult={selectedCookResult}
      />
    </div>
  );
};

export default CookRequests;
