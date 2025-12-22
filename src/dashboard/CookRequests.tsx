/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import { useState } from "react";
import BZForm from "../forms/BZForm";
import BZSelect from "../forms/BZSelect";
import BZInput from "../forms/BZInput";
import BZTable from "../forms/BZTable";
import Loading from "../components/loading/Loading";
import { useCookApprovalsQuery } from "../services/redux/api/cookApi";
import QuizCookResultDetailsModal from "../components/modal/QuizCookResultDetailsModal";

const CookRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCookResult, setSelectedCookResult] = useState<any>(null);

  // 🔹 This data comes from QuizCookResultModel
  const { data: cookQuizResults = [], isLoading } =
    useCookApprovalsQuery(undefined);
  const cookData = cookQuizResults?.data || [];

  const handleViewDetails = (quizResult: any) => {
    setSelectedCookResult(quizResult);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCookResult(null);
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
      <BZForm onSubmit={() => {}}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            Total Requests{" "}
            <span className="text-gray-600">({cookData.length})</span>
          </h3>

          <div className="flex items-center gap-3">
            <BZSelect
              name="quizResult"
              placeholder="All Results"
              options={[
                { label: "All", value: "" },
                { label: "Passed", value: "passed" },
                { label: "Failed", value: "failed" },
              ]}
              style={{ width: "300px" }}
            />

            <div className="relative">
              <BZInput
                name="search"
                placeholder="Search by business number"
                style={{
                  width: "500px",
                  height: "40px",
                  borderRadius: "17px",
                  borderColor: "#d49256",
                }}
              />
              <button
                type="submit"
                className="bg-[#d49256] h-[40px] w-12 rounded-full absolute right-0 top-0 flex items-center justify-center text-white hover:bg-[#c07d45]"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </BZForm>

      {/* Table */}
      <BZTable columns={columns} data={cookData} />

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
