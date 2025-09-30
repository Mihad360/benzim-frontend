import { Search } from "lucide-react";
import BZForm from "../forms/BZForm";
import BZInput from "../forms/BZInput";
import BZSelect from "../forms/BZSelect";
import BZTable from "../forms/BZTable";
import { dummyUsers } from "../utils/users";

const AllUsers = () => {
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
                label="" // no label
                type="text"
                placeholder="Search Name or ID"
                className="rounded-r-none " // remove margin
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
                className="bg-[#d49256] h-[40px] w-12 rounded-full flex items-center justify-center text-white absolute right-0 mt-1.5 z-10 cursor-pointer"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </BZForm>

      {/* Table */}
      <BZTable columns={columns} data={dummyUsers} />
    </div>
  );
};

export default AllUsers;
