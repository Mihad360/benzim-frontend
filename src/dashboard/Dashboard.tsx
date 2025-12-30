/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Loading from "../components/loading/Loading";
import BZTable from "../forms/BZTable";
import { useAllUsersQuery } from "../services/redux/api/usersApi";
import EarningsChart from "./EarningsChart";
import UserDetailsModal from "../components/modal/UserDetailsModal";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { data: usersData, isLoading } = useAllUsersQuery(undefined);
  const users = usersData?.data || [];
  console.log(users);
  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    // { key: "id", title: "ID" },
    { key: "name", title: "User Name" },
    { key: "email", title: "Email" },
    { key: "phoneNumber", title: "Phone Number" },
    { key: "role", title: "Role" },
    {
      key: "action",
      title: "Action",
      render: (record: any) => {
        return (
          <button
            className="bg-[#d49256] hover:bg-[#c07d45] text-white px-4 py-2 rounded-md cursor-pointer transition duration-200"
            onClick={() => {
              console.log("Clicked record:", record);
              handleViewProfile(record);
            }}
          >
            View Profile
          </button>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold">Overview</h2>
      </div>
      {/* Cards Section */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#ebe7e4] shadow text-black p-6 rounded-md border border-gray-500">
          <h3 className="text-2xl font-semibold">Total Earnings</h3>
          <p className="text-xl">$12030</p>
        </div>
        <div className="bg-[#ebe7e4] shadow text-black p-6 rounded-md border border-gray-500">
          <h3 className="text-2xl font-semibold">Total Customers</h3>
          <p className="text-xl">50</p>
        </div>
        <div className="bg-[#ebe7e4] shadow text-black p-6 rounded-md border border-gray-500">
          <h3 className="text-2xl font-semibold">Total Cooks</h3>
          <p className="text-xl">35</p>
        </div>
      </div>
      <div>
        <EarningsChart />
      </div>
      {/* Table */}
      <div className="py-3">
        <h2 className="text-xl font-semibold">Recent Users</h2>
      </div>
      <BZTable columns={columns} data={users} />
      <UserDetailsModal
        open={modalOpen}
        onCancel={handleModalClose}
        user={selectedUser}
      />
    </div>
  );
};

export default Dashboard;
