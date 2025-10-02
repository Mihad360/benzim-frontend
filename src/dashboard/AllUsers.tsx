/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import { useState } from "react";
import BZForm from "../forms/BZForm";
import { dummyUsers } from "../utils/users";
import BZSelect from "../forms/BZSelect";
import BZInput from "../forms/BZInput";
import BZTable from "../forms/BZTable";
import UserDetailsModal from "../components/modal/UserDetailsModal";

const AllUsers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "User Name" },
    { key: "email", title: "Email" },
    { key: "address", title: "Address" },
    { key: "status", title: "Status" },
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

  return (
    <div className="space-y-6">
      {/* Orange Header Bar */}
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold">All Users</h2>
      </div>

      {/* Filter + Count Row */}
      <BZForm onSubmit={() => {}}>
        <div className="flex justify-between items-center">
          {/* Left: Count */}
          <h3 className="text-lg font-medium">
            All users{" "}
            <span className="text-gray-600">({dummyUsers.length})</span>
          </h3>

          {/* Right: Filters */}
          <div className="flex items-center gap-3">
            <BZSelect
              name="role"
              placeholder="All Users"
              options={[
                { label: "All Users", value: "" },
                { label: "Customer", value: "Customer" },
                { label: "Cook", value: "Cook" },
              ]}
              style={{ width: "300px" }}
              className="[&_.ant-select-selector]:!h-[40px] [&_.ant-select-selector]:!rounded-[17px] [&_.ant-select-selector]:!border-[#d49256]"
            />

            <div className="flex items-center relative">
              <BZInput
                name="search"
                label=""
                type="text"
                placeholder="Search Name or ID"
                className="rounded-r-none"
                style={{
                  width: "500px",
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
      <BZTable columns={columns} data={dummyUsers} />

      {/* User Details Modal */}
      <UserDetailsModal
        open={modalOpen}
        onCancel={handleModalClose}
        user={selectedUser}
      />
    </div>
  );
};

export default AllUsers;
