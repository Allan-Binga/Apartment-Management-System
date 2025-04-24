import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white">
      {/* Left side: Title */}
      <h1 className="text-xl font-semibold text-gray-700"></h1>

      {/* Center: Navigation links styled as buttons */}
      <div className="flex gap-6 justify-center items-center flex-1">
        <Link
          to="/"
          className="text-lg  cursor-pointer font-bold hover:font-bold hover:border-b-2 hover:border-black text-blue-400"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-lg  cursor-pointer font-bold hover:font-bold hover:border-b-2 hover:border-black text-blue-400"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-lg cursor-pointer font-bold hover:font-bold hover:border-b-2 hover:border-black text-blue-400"
        >
          Contact
        </Link>
        <Link
          to="/login/tenant"
          className="text-lg  cursor-pointer font-bold hover:font-bold hover:border-b-2 hover:border-black text-blue-400"
        >
          Login
        </Link>
      </div>

      {/* Right side: Bell first and Search bar */}
      <div className="w-full max-w-sm min-w-[200px] flex items-center space-x-3">
        {/* Bell icon */}
        <Bell className="w-6 h-6 text-gray-600" />

        {/* Search bar */}
        <div className="relative flex items-center w-full">
          {/* Search icon */}
          <Search className="absolute w-5 h-5 top-2.5 left-2.5 text-gray-400" />

          {/* Input field */}
          <input
            type="text"
            placeholder="Studio, One Bedroom"
            className="w-full bg-transparent text-gray-700 text-sm border border-gray-200 rounded-full pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300 shadow-sm focus:shadow"
          />

          {/* Search button */}
          <button
            className="ml-2 rounded-full bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
