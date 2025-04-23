import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../src/assets/logo.png";
import { CreditCard, Wrench, User, LogOut } from "lucide-react";
import { endpoint } from "../apiEndpoint";

function SideBar() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${endpoint}/users/tenant/me`, {
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
        <ul className="space-y-4 text-gray-700 text-sm">
          <li>
            <a
              href="payments"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <CreditCard className="w-6 h-6" />
              <span>Rent Payments</span>
            </a>
          </li>
          <li>
            <a
              href="maintenance-requests"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Wrench className="w-6 h-6" />
              <span>Maintenance Requests</span>
            </a>
          </li>
          <li>
            <a
              href="profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <User className="w-6 h-6" />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors">
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
