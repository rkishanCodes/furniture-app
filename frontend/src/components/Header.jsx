import React from "react";
import logo from "../../public/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCouch, FaUserCircle, FaSignInAlt } from "react-icons/fa";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "Furniture Shop", path: "/shop", icon: <FaCouch /> },
    { label: "Account", path: "/user-dashboard", icon: <FaUserCircle /> },
    { label: "Login", path: "/login", icon: <FaSignInAlt /> },
  ];

  return (
    <header className="bg-white shadow-md py-3 px-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
        <span className="text-xl font-semibold text-gray-800">FurniPlace</span>
      </div>
      <nav className="mt-3 md:mt-0">
        <ul className="flex flex-col md:flex-row items-center gap-4 text-gray-600">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-white bg-gray-800"
                    : "hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
