import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import logo from "../../assets/Logo.jpg";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference for the dropdown menu
  const profileRef = useRef<HTMLDivElement>(null); // Reference for the profile button

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click happened outside the profile or dropdown elements
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false); // Close dropdown when clicked outside
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-end bg-[#e2b482] shadow p-4 relative">
      {/* Notification Button */}
      <Link
        to="/dashboard/notifications"
        className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer"
      >
        <Bell size={25} />
        {/* Example red dot */}
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
      </Link>

      {/* Profile Dropdown */}
      <div className="ml-4 relative" ref={profileRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <img src={logo} alt="Profile" className="w-12 h-12 rounded-full" />
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50"
          >
            <div className="flex justify-between items-center p-2">
              <span>Profile</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-lg text-gray-500"
              >
                &times; {/* Cross icon */}
              </button>
            </div>
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
