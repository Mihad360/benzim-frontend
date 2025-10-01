import { NavLink } from "react-router-dom";
import { sidebarNavigation } from "../../router/routes";
import logo from "../../assets/Logo.jpg";

const Sidebar = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors 
     ${isActive ? "bg-white text-black" : "text-black/80 hover:bg-black/10"}`;

  return (
    <div className="h-full w-64 bg-[#e2b482] p-4 space-y-4">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src={logo}
          alt="App Logo"
          className="w-40 h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Routes */}
      <div className="space-y-2">
        {sidebarNavigation.map(({ path, name, icon }) => (
          <NavLink
            style={{ fontWeight: "bold" }}
            key={path}
            to={path}
            className={linkClasses}
            end={path === "/dashboard"}
          >
            {icon} {name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
