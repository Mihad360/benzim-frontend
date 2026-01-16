/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import { useState } from "react";
import BZTable from "../forms/BZTable";
import UserDetailsModal from "../components/modal/UserDetailsModal";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../services/redux/api/usersApi";
import Loading from "../components/loading/Loading";
import Swal from "sweetalert2";
import { Input, Select, Spin } from "antd";
import { useDebounce } from "../hooks/debounce.hook";

const AllUsers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | undefined>();

  // ✅ Debounce search term
  const debouncedSearch = useDebounce(searchValue, 500);

  // ✅ Build filters object
  const filters = {
    ...(selectedRole && { role: selectedRole }),
    ...(debouncedSearch.trim() && { searchTerm: debouncedSearch.trim() }),
  };

  const [deleteUser] = useDeleteUserMutation();
  // Pass filters as query params to Redux
  const { data: usersData, isLoading, isFetching } = useAllUsersQuery(filters);
  const users = usersData?.data || [];

  // ✅ Check if filters are active
  const hasActiveFilters = selectedRole || debouncedSearch.trim();

  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserDelete = async (data: any) => {
    console.log("User to delete:", data);

    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action will delete the user permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      // ✅ Pass ID directly, not as object
      const res = await deleteUser(data._id).unwrap();
      console.log(res);
      if (res.success) {
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully.",
          icon: "success",
        });
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to delete user.",
        icon: "error",
      });
    }
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role || undefined);
  };

  // ✅ Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const columns = [
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
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md cursor-pointer transition duration-200"
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
    return <Loading />;
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
          {/* Role Filter */}
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

          {/* Search Input with Loading Indicator */}
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
        ) : users.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-gray-100 rounded-full p-6">
                <Search size={48} className="text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-700">
                  No Users Found
                </h3>
                <p className="text-gray-500">
                  {hasActiveFilters
                    ? "No users match your search criteria. Try adjusting your filters."
                    : "No users available at the moment."}
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchValue("");
                    setSelectedRole(undefined);
                  }}
                  className="mt-4 px-6 py-2 bg-[#d49256] hover:bg-[#c07d45] text-white rounded-md transition duration-200 cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <BZTable columns={columns} data={users} />
        )}
      </div>

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
