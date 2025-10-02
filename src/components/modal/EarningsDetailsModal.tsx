import { Modal, Button } from "antd";

type EarningsData = {
  OrderID: string;
  SaleAmount: string;
  "CustomerEndCommission7.5%": string;
  "CookEndCommission7.5%": string;
  CommissionAmount: string;
  Date: string;
  Status: string;
};

type EarningsModalProps = {
  open: boolean;
  onCancel: () => void;
  earningsData: EarningsData | null;
};

const EarningsDetailsModal = ({
  open,
  onCancel,
  earningsData,
}: EarningsModalProps) => {
  if (!earningsData) return null;

  return (
    <Modal
      title="Earnings Details"
      open={open}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>Close</Button>}
      width={600}
      centered
    >
      <div className="space-y-4 p-2">
        {/* Header with Order ID */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">
            Order ID: {earningsData.OrderID}
          </h3>
          <p className="text-gray-600">Date: {earningsData.Date}</p>
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-700">Sale Amount:</span>
            <span className="text-lg font-semibold text-green-600">
              {earningsData.SaleAmount}
            </span>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-700">
              Commission Amount:
            </span>
            <span className="text-lg font-semibold text-orange-600">
              {earningsData.CommissionAmount}
            </span>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-700">
              Customer Commission (7.5%):
            </span>
            <span className="text-gray-900">
              {earningsData["CustomerEndCommission7.5%"]}
            </span>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-700">
              Cook Commission (7.5%):
            </span>
            <span className="text-gray-900">
              {earningsData["CookEndCommission7.5%"]}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                earningsData.Status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : earningsData.Status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {earningsData.Status}
            </span>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">
            Transaction Summary
          </h4>
          <div className="space-y-1 text-sm text-blue-700">
            <p>• Total transaction processed successfully</p>
            <p>• Commission distributed between customer and cook</p>
            <p>• Platform commission: {earningsData.CommissionAmount}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EarningsDetailsModal;
