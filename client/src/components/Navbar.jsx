import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search, Bell, Menu, X } from "lucide-react";
import { endpoint } from "../apiEndpoint";

function Navbar({ sidebarOpen = false, setSidebarOpen = () => {} }) {
  const [user, setUser] = useState(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${endpoint}/users/me`, { withCredentials: true })
      .then((res) => {
        console.log("User found:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("User not logged in:", err.response?.status);
        setUser(null);
      });
  }, []);

  const toggleSidebar = () => {
    if (typeof setSidebarOpen === "function") {
      setSidebarOpen(!sidebarOpen);
    } else {
      console.warn("setSidebarOpen is not a function");
    }
  };
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-white shadow-sm">
      {/* Left: Hamburger and Empty Header */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-700"></h1>
        </div>
        {/* Mobile Menu Toggle (for nav links) */}
        <button
          className="sm:hidden p-2 text-gray-600"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
        </button>
      </div>

      {/* Center: Navigation Links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:flex-1 mt-4 sm:mt-0`}
      >
        <Link
          to="/"
          className="text-base sm:text-lg font-bold hover:border-b-2 hover:border-black text-blue-400"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-base sm:text-lg font-bold hover:border-b-2 hover:border-black text-blue-400"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-base sm:text-lg font-bold hover:border-b-2 hover:border-black text-blue-400"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        {user === null && (
          <Link
            to="/login/tenant"
            className="text-base sm:text-lg font-bold hover:border-b-2 text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>

      {/* Right: Search and Bell */}
      <div className="flex items-center space-x-3 w-full sm:w-auto mt-4 sm:mt-0">
        <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        <div className="relative flex items-center w-full max-w-xs sm:max-w-sm">
          <Search className="absolute w-4 h-4 sm:w-5 sm:h-5 top-2.5 left-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Studio, One Bedroom"
            className="w-full bg-transparent text-gray-700 text-sm border border-gray-200 rounded-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300 shadow-sm focus:shadow"
          />
          <button
            className="ml-2 rounded-full bg-blue-600 py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm text-white shadow-md hover:shadow-lg focus:bg-blue-700"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;