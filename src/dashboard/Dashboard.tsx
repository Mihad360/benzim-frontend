import BZTable from "../forms/BZTable";
import { dummyUsers } from "../utils/users";
import EarningsChart from "./EarningsChart";

const Dashboard = () => {
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "User Name" },
    { key: "email", title: "Email" },
    { key: "address", title: "Address" },
    { key: "status", title: "Status" },
    {
      key: "action",
      title: "Action",
      render: () => (
        <button className="bg-[#d49256] text-white px-3 py-1 rounded-md cursor-pointer">
          View Profile
        </button>
      ),
    },
  ];

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
          <p className="text-xl">376</p>
        </div>
        <div className="bg-[#ebe7e4] shadow text-black p-6 rounded-md border border-gray-500">
          <h3 className="text-2xl font-semibold">Total Cooks</h3>
          <p className="text-xl">98</p>
        </div>
      </div>
      <div>
        <EarningsChart />
      </div>
      {/* Table */}
      <div className="py-3">
        <h2 className="text-xl font-semibold">Recent Users</h2>
      </div>
      <BZTable columns={columns} data={dummyUsers} />
    </div>
  );
};

export default Dashboard;
