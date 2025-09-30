import { useState } from "react";
import { Bell } from "lucide-react";
import logo from "../../assets/Logo.jpg";

const DashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-end bg-[#e2b482] shadow p-4 relative">
      {/* Notification Button */}
      <button className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer">
        <Bell size={25} />
        {/* Example red dot */}
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
      </button>

      {/* Profile Dropdown */}
      <div className="ml-4 relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <img src={logo} alt="Profile" className="w-12 h-12 rounded-full" />
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
              Profile
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
