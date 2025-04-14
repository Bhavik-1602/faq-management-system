import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Logout icon

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-2xl tracking-wide">FAQ Manager</h1>

      <div className="flex items-center space-x-6">
        <Link
          to="/home"
          className="text-white text-sm font-medium hover:underline hover:text-gray-100 transition"
        >
          Home
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm transition duration-200"
        >
          <FiLogOut className="text-md" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
