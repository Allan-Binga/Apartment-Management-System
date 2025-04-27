import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/logo.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import { endpoint } from "../../apiEndpoint";
import { UserRoundCog, House, Wrench, Wallet2, ScrollText, Newspaper } from "lucide-react";

function LandlordSidebar() {
  const [firstName, setFirstName] = useState("");
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Successfully logged out.");
      navigate("/");
    } catch (error) {
      toast.error("User not logged in.");
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
          autoClose={5000}
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
            <UserRoundCog />
          </div>
          <p className="font-medium text-gray-700 text-lg">
            Hello {firstName || "Guest"}
          </p>
        </div>

        {/*Navigation*/}
        <ul className="space-y text-gray-700 text-sm">
          <li>
            <a
              href="/listings"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/payments"
                  ? "bg-blue-100"
                  : "hover:bg-blue-100"
              }`}
            >
              <House className="w-6 h-6" />
              <span>Listings</span>
            </a>
          </li>
          {/*Maintenance Requests*/}
          <li>
            <a
              href="/maintenance-requests"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/maintenance-requests"
                  ? "bg-blue-100"
                  : "hover:bg-blue-100"
              }`}
            >
              <Wrench className="w-6 h-6" />
              <span>Maintenance Requests</span>
            </a>
          </li>

          {/*Payments*/}
          <li>
            <a
              href="/maintenance-requests"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/maintenance-requests"
                  ? "bg-blue-100"
                  : "hover:bg-blue-100"
              }`}
            >
              <Wallet2 className="w-6 h-6" />
              <span>Payments</span>
            </a>
          </li>

          {/*Reports*/}
          <li>
            <a
              href="/reports"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/maintenance-requests"
                  ? "bg-blue-100"
                  : "hover:bg-blue-100"
              }`}
            >
              <Newspaper className="w-6 h-6" />
              <span>Reports</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default LandlordSidebar;
