import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../src/assets/logo.png";
import { CreditCard, Wrench, User, LogOut } from "lucide-react";
import { endpoint } from "../apiEndpoint";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SideBar() {
  const [firstName, setFirstName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  //Handle Logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${endpoint}/auth/logout/tenant`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Clear manually (optional, helpful fallback)
        document.cookie = "tenantSession=; Max-Age=0; path=/;";

        // Clear local storage
        localStorage.removeItem("tenantId");

        // Show success toast
        toast.success("Successfully logged out.");

        // Redirect to login
        window.location.href = "/login/tenant";
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
    <aside className="fixed left-0 top-0 h-full w-72 bg-white p-4 rounded-tr-2xl rounded-br-2xl shadow-md flex flex-col justify-between">
      <div>
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
          transition={Bounce}
          toastClassName="rounded-lg bg-white shadow-md border-l-4 border-blue-500 p-4 text-sm text-gray-800"
          bodyClassName="flex items-center"
          progressClassName="bg-blue-400 h-1 rounded"
        />

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
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-6 h-6" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
