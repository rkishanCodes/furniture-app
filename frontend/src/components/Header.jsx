import React from "react";
import logo from "../../public/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCouch,
  FaUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserShield,
  FaPlus,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice.js";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Authenticated links
  const authLinks = user
    ? [
        ...(user.role === "ADMIN"
          ? [
              {
                label: "Admin Dashboard",
                path: "/admin-dashboard",
                icon: <FaUserShield />,
              },
              {
                label: "Add Product",
                path: "/add-product",
                icon: <FaPlus />,
              },
            ]
          : [
              { label: "Home", path: "/", icon: <FaHome /> },
              {
                label: "Shop",
                path: "/shop",
                icon: <FaCouch />,
              },
              {
                label: "My Dashboard",
                path: "/user-dashboard",
                icon: <FaUserCircle />,
              },
            ]),
        {
          label: "Logout",
          path: "#",
          icon: <FaSignOutAlt />,
          onClick: handleLogout,
        },
      ]
    : [
        { label: "Login", path: "/login", icon: <FaSignInAlt /> },
        { label: "Register", path: "/register", icon: <FaUserCircle /> },
      ];

  return (
    <header className="bg-white shadow-md py-3 px-6 flex flex-col md:flex-row items-center justify-between">
      <Link className="flex items-center gap-2" to="/">
        <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
        <span className="text-xl font-semibold text-gray-800">FurniPlace</span>
      </Link>
      <nav className="mt-3 md:mt-0">
        <ul className="flex flex-col md:flex-row items-center gap-4 text-gray-600">
          {authLinks.map((item) =>
            item.onClick ? (
              <li key={item.label}>
                <button
                  onClick={item.onClick}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ) : (
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
            )
          )}

          {user && (
            <li className="text-sm text-gray-500 ml-2">Hi, {user.name}</li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
