import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/logo.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint } from "../../apiEndpoint";
import {
  UserRoundCog,
  House,
  Wallet2,
  Newspaper,
  LogOut,
  LayoutDashboard,
  Users2,
  X,
  Menu,
} from "lucide-react";

function LandlordSidebar({ sidebarOpen, setSidebarOpen }) {
  const [firstName, setFirstName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${endpoint}/auth/logout/landlord`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        document.cookie = "landlordSession=; Max-Age=0; path=/;";
        toast.success("Successfully logged out");
        navigate("/login/landlord");
      } else {
        toast.error("You are not logged in");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("You are not logged in");
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
      {" "}
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
        toastClassName="rounded-lg bg-white shadow-md border-l-4 border-blue-500 p-4 text-sm text-gray-800"
        bodyClassName="flex items-center"
        progressClassName="bg-blue-400 h-1 rounded"
      />
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="block lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white p-4 rounded-tr-2xl rounded-br-2xl shadow-sm flex flex-col justify-between transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
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
              <UserRoundCog />
            </div>
            <p className="font-medium text-gray-700 text-lg">
              Hello {firstName || "Landlord"}
            </p>
          </div>

          {/* Navigation */}
          <ul className="space-y-2 text-gray-700 text-sm">
            {[
              {
                href: "/landlord/dashboard",
                label: "Dashboard",
                icon: (
                  <LayoutDashboard
                    className={`w-6 h-6 ${
                      location.pathname === "/landlord/dashboard"
                        ? "text-blue-500"
                        : ""
                    }`}
                  />
                ),
              },
              {
                href: "/landlord/payments",
                label: "Payments",
                icon: (
                  <Wallet2
                    className={`w-6 h-6 ${
                      location.pathname === "/landlord/payments"
                        ? "text-blue-500"
                        : ""
                    }`}
                  />
                ),
              },
              {
                href: "/tenants",
                label: "Tenants",
                icon: (
                  <Users2
                    className={`w-6 h-6 ${
                      location.pathname === "/tenants" ? "text-blue-500" : ""
                    }`}
                  />
                ),
              },
              {
                href: "/listings",
                label: "Listings",
                icon: (
                  <House
                    className={`w-6 h-6 ${
                      location.pathname === "/listings" ? "text-blue-500" : ""
                    }`}
                  />
                ),
              },
              {
                href: "/landlord/reports",
                label: "Reports",
                icon: (
                  <Newspaper
                    className={`w-6 h-6 ${
                      location.pathname === "/landlord/reports"
                        ? "text-blue-500"
                        : ""
                    }`}
                  />
                ),
              },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? "text-blue-500 bg-blue-100"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}

            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-200 transition-colors text-left"
              >
                <LogOut className="w-6 h-6" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default LandlordSidebar;
