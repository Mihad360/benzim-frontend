/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";

const UserDetailsModal = ({
  open,
  onCancel,
  user,
}: {
  open: boolean;
  onCancel: () => void;
  user: any;
}) => {
  if (!user) return null;
  return (
    <Modal
      title="User Details"
      open={open}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>Close</Button>}
      width={500}
      centered
    >
      {user && (
        <div className="space-y-4 p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-[#d49256] rounded-full flex items-center justify-center text-white text-lg font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">User ID:</span>
              <span className="text-gray-900">{user.id}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === "Customer"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.status}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Address:</span>
              <span className="text-gray-900 text-right">{user.address}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-900">{user.email}</span>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">
              Account Information
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Registered as {user.status.toLowerCase()}</p>
              <p>• Active account</p>
              <p>• Can place and receive orders</p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UserDetailsModal;
