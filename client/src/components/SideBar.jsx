import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../src/assets/logo.png";
import {
  CreditCard,
  Wrench,
  User,
  LogOut,
  X,
  Menu,
  Home,
  Info,
  MessageCircle,
} from "lucide-react";
import { endpoint } from "../apiEndpoint";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SideBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [firstName, setFirstName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${endpoint}/auth/logout/tenant`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        document.cookie = "tenantSession=; Max-Age=0; path=/;";
        localStorage.removeItem("tenantId");

        toast.success("Successfully logged out.");

        // Delay navigation by 2 seconds (long enough for toast to show)
        setTimeout(() => {
          navigate("/login/tenant");
        }, 2000);
      } else {
        toast.error("You are not logged in.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("You are not logged in.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${endpoint}/users/me`, {
          withCredentials: true,
        });
        setFirstName(response.data.firstName);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="block lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        {showSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        progressClassName="bg-blue-400 h-1 rounded"
      />
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white p-4 rounded-tr-2xl rounded-br-2xl shadow-sm flex flex-col justify-between transition-transform duration-300 z-40
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:w-72 
          lg:translate-x-0
        `}
      >
        <div>
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img src={Logo} alt="Apartment Logo" className="h-45 w-45" />
          </div>

          {/* Profile & Greeting */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-xl text-xl">
              <User />
            </div>
            <p className="font-medium text-gray-700 text-lg">
              Hello {firstName || "Guest"}
            </p>
          </div>

          {/* Navigation */}
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <a
                href="/home"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/home"
                    ? "text-blue-500 bg-blue-100"
                    : "hover:bg-blue-100"
                }`}
              >
                <Home
                  className={`w-6 h-6 ${
                    location.pathname === "/home"
                      ? "text-blue-500 bg-blue-100"
                      : ""
                  }`}
                />
                <span>Home</span>
              </a>
            </li>

            <li>
              <a
                href="/payments"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/payments"
                    ? "text-blue-500 bg-blue-100"
                    : "hover:bg-blue-100"
                }`}
              >
                <CreditCard
                  className={`w-6 h-6 ${
                    location.pathname === "/payments"
                      ? "text-blue-500 bg-blue-100"
                      : ""
                  }`}
                />
                <span>Rent Payments</span>
              </a>
            </li>

            <li>
              <a
                href="/maintenance-requests"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/maintenance-requests"
                    ? "text-blue-500 bg-blue-100"
                    : "hover:bg-blue-100"
                }`}
              >
                <Wrench
                  className={`w-6 h-6 ${
                    location.pathname === "/maintenance-requests"
                      ? "text-blue-500"
                      : ""
                  }`}
                />
                <span>Maintenance Requests</span>
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/profile"
                    ? "text-blue-500 bg-blue-100"
                    : "hover:bg-blue-100"
                }`}
              >
                <User
                  className={`w-6 h-6 ${
                    location.pathname === "/profile" ? "text-blue-500" : ""
                  }`}
                />
                <span>Profile</span>
              </a>
            </li>

            <li>
              <a
                href="/messages"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/messages"
                    ? "text-blue-500 bg-blue-100"
                    : "hover:bg-blue-100"
                }`}
              >
                <MessageCircle
                  className={`w-6 h-6 ${
                    location.pathname === "/messages" ? "text-blue-500" : ""
                  }`}
                />
                <span>Messages</span>
              </a>
            </li>

            <li>
              <a
                href="/about"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/about"
                    ? "text-blue-500 bg-blue-100"
                    : "hover:bg-blue-100"
                }`}
              >
                <Info
                  className={`w-6 h-6 ${
                    location.pathname === "/about" ? "text-blue-500" : ""
                  }`}
                />
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-200 transition-colors cursor-pointer"
              >
                <LogOut className="w-6 h-6" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
