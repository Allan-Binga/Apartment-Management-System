import { Link } from "react-router-dom";
import { Search } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white">
      {/* Left side: Title */}
      <h1 className="text-xl font-semibold text-gray-700">
        Available Apartments
      </h1>

      {/* Center: Navigation links styled as buttons */}
      <div className="flex gap-6 justify-center items-center flex-1">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full transition-colors duration-200"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full transition-colors duration-200"
        >
          Contact
        </Link>
      </div>

      {/* Right side: Search bar */}
      <div className="w-full max-w-sm min-w-[200px]">
        <div className="relative flex items-center">
          {/* Search icon */}
          <Search className="absolute w-5 h-5 top-2.5 left-2.5 text-gray-400" />

          {/* Input field */}
          <input
            type="text"
            placeholder="Studio, One Bedroom"
            className="w-full max-w-lg bg-transparent text-gray-700 text-sm border border-gray-200 rounded-full pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300 shadow-sm focus:shadow"
          />

          {/* Search button */}
          <button
            className="rounded-full bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
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
