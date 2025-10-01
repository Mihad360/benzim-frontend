import { BellDot } from "lucide-react";

const Notifications = () => {
  const data = [
    { id: 1, message: "A host are registrar Now", time: "Fri, 12:30pm" },
    { id: 2, message: "An user joined in app.", time: "Fri, 12:30pm" },
    { id: 3, message: "An user joined in app.", time: "Fri, 12:30pm" },
    { id: 4, message: "An user joined in app.", time: "Fri, 12:30pm" },
  ];

  return (
    <div>
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold">All Notifications</h2>
      </div>

      <div className="space-y-4 mt-4">
        {data.map((notification) => (
          <div key={notification.id} className="flex items-center space-x-3">
            <div className="bg-gray-300 p-2 rounded-full">
              <BellDot className="" />{" "}
              {/* Replace with your actual bell icon */}
            </div>
            <div>
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
