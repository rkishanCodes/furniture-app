import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Virtual Furniture Placement</h1>
      <nav>
        <ul className="flex flex-col md:flex-row gap-4 text-gray-600">
          <li>
            <a href="#" className="hover:text-gray-900">Home</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900">My Designs</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900">Furniture Shop</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900">Account</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
