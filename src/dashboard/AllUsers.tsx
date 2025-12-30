/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import { useState } from "react";
import BZTable from "../forms/BZTable";
import UserDetailsModal from "../components/modal/UserDetailsModal";
import { useAllUsersQuery } from "../services/redux/api/usersApi";
import Loading from "../components/loading/Loading";
import Swal from "sweetalert2";
import { Input, Select } from "antd";

const AllUsers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filters, setFilters] = useState<{
    role?: string;
    searchTerm?: string;
  }>({});
  const [searchValue, setSearchValue] = useState("");
  // Pass filters as query params to Redux
  const { data: usersData, isLoading } = useAllUsersQuery(filters);
  const users = usersData?.data || [];
  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserDelete = async (data: any) => {
    console.log(data);
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
  };

  const handleRoleChange = (role: string) => {
    setFilters((prev) => ({
      ...prev,
      role: role || undefined,
    }));
  };

  // ✅ Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // Update filter as user types
    setFilters((prev) => ({
      ...prev,
      searchTerm: value.trim() || undefined,
    }));
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
    {
      key: "action2",
      title: "Action",
      render: (record: any) => {
        return (
          <button
            className="bg-rose-500 text-white px-4 py-2 rounded-md cursor-pointer transition duration-200"
            onClick={() => {
              console.log("Clicked record:", record);
              handleUserDelete(record);
            }}
          >
            Delete user
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
    <div className="space-y-6">
      {/* Orange Header Bar */}
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold">All Users</h2>
      </div>

      {/* Filter + Count Row */}
      <div className="flex justify-between items-center">
        {/* Left: Count */}
        <h3 className="text-lg font-medium">
          All users <span className="text-gray-600">({users?.length})</span>
        </h3>

        {/* Right: Filters */}
        <div className="flex items-center gap-3">
          {/* ✅ Direct Ant Design Select with same styling */}
          <Select
            placeholder="All Users"
            onChange={handleRoleChange}
            defaultValue=""
            options={[
              { label: "All Users", value: "" },
              { label: "Cook", value: "cook" },
              { label: "Users", value: "user" },
            ]}
            style={{ width: 300 }}
            className="[&_.ant-select-selector]:!h-[40px] [&_.ant-select-selector]:!rounded-[17px] [&_.ant-select-selector]:!border-[#d49256]"
          />

          {/* ✅ Direct Ant Design Input with same styling */}
          <div className="flex items-center relative">
            <Input
              placeholder="Search Name or ID"
              value={searchValue}
              onChange={handleSearchChange}
              style={{
                width: 500,
                height: 40,
                borderRadius: 17,
                borderColor: "#d49256",
                paddingRight: 48, // Make space for the search icon
              }}
            />
            <div className="bg-[#d49256] h-[40px] w-12 rounded-full flex items-center justify-center text-white absolute right-0 pointer-events-none">
              <Search size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <BZTable columns={columns} data={users} />

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
