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
            <div>
              <img
                className="w-16 h-16 rounded-full"
                src={user.profileImage}
                alt={user.name}
              />
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
              <span className="text-gray-900">{user?.id}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === "cook"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Phone Number:</span>
              <span className="text-gray-900 text-right">
                {user.phoneNumber}
              </span>
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
              <p>• Registered as {user.role.toLowerCase()}</p>
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
