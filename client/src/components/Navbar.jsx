import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search, Bell } from "lucide-react";
import { endpoint } from "../apiEndpoint";

function Navbar() {
  const [user, setUser] = useState(undefined); // better to default to null or undefined

  useEffect(() => {
    axios
      .get(`${endpoint}/users/me`, { withCredentials: true })
      .then((res) => {
        console.log("User found:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("User not logged in:", err.response?.status); // should log 401
        setUser(null);
      });
  }, []);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white">
      <h1 className="text-xl font-semibold text-gray-700">🏠 RentConnect</h1>

      <div className="flex gap-6 justify-center items-center flex-1">
        <Link
          to="/"
          className="text-lg cursor-pointer font-bold hover:border-b-2 hover:border-black text-blue-400"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-lg cursor-pointer font-bold hover:border-b-2 hover:border-black text-blue-400"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-lg cursor-pointer font-bold hover:border-b-2 hover:border-black text-blue-400"
        >
          Contact
        </Link>

        {user === null && (
          <Link
            to="/login/tenant"
            className="text-lg font-bold hover:border-b-2 text-blue-400"
          >
            Login
          </Link>
        )}
      </div>

      <div className="w-full max-w-sm min-w-[200px] flex items-center space-x-3">
        <Bell className="w-6 h-6 text-gray-600" />

        <div className="relative flex items-center w-full">
          <Search className="absolute w-5 h-5 top-2.5 left-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Studio, One Bedroom"
            className="w-full bg-transparent text-gray-700 text-sm border border-gray-200 rounded-full pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300 shadow-sm focus:shadow"
          />
          <button
            className="ml-2 rounded-full bg-blue-600 py-2 px-4 text-sm text-white shadow-md hover:shadow-lg focus:bg-blue-700"
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
