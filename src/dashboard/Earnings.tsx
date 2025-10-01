import { Info, Search } from "lucide-react";
import BZForm from "../forms/BZForm";
import BZInput from "../forms/BZInput";
import BZTable from "../forms/BZTable";
import { dummyUsers } from "../utils/users";
import BZTimePicker from "../forms/BZTimePicker";

const Earnings = () => {
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
        <button className="bg-[#d49256] text-white px-3 py-2 rounded-md cursor-pointer">
          <Info size={20} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Orange Header Bar */}
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold">Earnings</h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#d49256] text-white p-6 rounded-md">
          <h3 className="text-2xl font-semibold">Total Earnings</h3>
          <p className="text-xl">$12030</p>
        </div>
        <div className="bg-[#f6a04d] text-white p-6 rounded-md">
          <h3 className="text-2xl font-semibold">Total Customers</h3>
          <p className="text-xl">376</p>
        </div>
        <div className="bg-[#4c9f7d] text-white p-6 rounded-md">
          <h3 className="text-2xl font-semibold">Total Cooks</h3>
          <p className="text-xl">98</p>
        </div>
      </div>

      {/* Filter + Count Row */}
      <BZForm onSubmit={() => {}}>
        <div className="flex justify-end items-center">
          {/* Right: Filters */}
          <div className="flex items-center gap-3">
            {/* Date Filter */}
            <BZTimePicker
              style={{
                width: "200px",
                height: "40px",
                borderRadius: "17px",
                borderColor: "#d49256",
                marginTop: "28px",
              }}
              name="date"
            />
            <div className="flex items-center relative">
              <BZInput
                name="search"
                label="" // no label
                type="text"
                placeholder="Search Name"
                className="rounded-r-none " // remove margin
                style={{
                  width: "300px",
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

            <div className="flex items-center relative">
              <BZInput
                name="search"
                label="" // no label
                type="text"
                placeholder="Search ID"
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

export default Earnings;
