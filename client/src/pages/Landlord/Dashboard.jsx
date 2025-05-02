import LandlordSidebar from "./Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  Users,
  Wallet,
  Wrench,
  Building2,
  Hammer,
  FileText,
  CalendarClock,
  AlertCircle,
  Mail,
  CheckCircle,
  BarChart2,
  Home,
} from "lucide-react"; // Icons for dashboard cards
import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../../apiEndpoint";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [listings, setListings] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [vacantUnits, setVacantUnits] = useState(0);
  const [occupiedUnits, setOccupiedUnits] = useState(0);
  const [rentCollected, setRentCollected] = useState(0);
  const [completedRequests, setCompletedRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  // API Call to fetch tenants
  const getTenants = async () => {
    try {
      const response = await axios.get(`${endpoint}/users/tenants`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch tenants";
    }
  };

  // API Call To Fetch payments
  const getPayments = async () => {
    try {
      const response = await axios.get(`${endpoint}/payments/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch payments";
    }
  };

  //API Call to Fetch maintenance_requests
  const getRequests = async () => {
    try {
      const response = await axios.get(`${endpoint}/maintenance/requests/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch requests.";
    }
  };

  //API Call to Fetch units
  const getUnits = async () => {
    try {
      const response = await axios.get(`${endpoint}/listings/all-listings`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch units.";
    }
  };

  //API Call to Fetch technicians
  const getTechnicians = async () => {
    try {
      const response = await axios.get(`${endpoint}/users/technicians`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch technicians.";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          tenantData,
          paymentData,
          requestData,
          unitsData,
          techniciansData,
        ] = await Promise.all([
          getTenants(),
          getPayments(),
          getRequests(),
          getUnits(),
          getTechnicians(),
        ]);

        setTenants(tenantData);
        setPayments(paymentData);
        setRequests(requestData);

        // Count requests with status "Completed"
        const completed = requestData.filter(
          (req) => req.status === "Completed"
        ).length;

        setCompletedRequests(completed);

        setListings(unitsData);
        setTechnicians(techniciansData);

        const vacant = unitsData.filter(
          (unit) => unit.leasingstatus === "Unleased"
        ).length;
        const occupied = unitsData.filter(
          (unit) => unit.leasingstatus === "Leased"
        ).length;

        setVacantUnits(vacant);
        setOccupiedUnits(occupied);

        // Calculate total rent collected
        const total = paymentData.reduce(
          (sum, payment) => sum + (parseFloat(payment.amountpaid) || 0),
          0
        );
        setRentCollected(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        className="z-10"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-1">
        <LandlordSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:ml-[18rem]">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Dashboard
          </h1>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {/* 1. Total Tenants */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <Users className="w-8 h-8 text-blue-600 font-bold" />
              <div>
                <p className="text-md text-gray-500">Total Tenants</p>
                <p className="text-lg font-semibold text-gray-800">
                  {tenants.length}
                </p>
              </div>
            </div>

            {/* 2. Rent Collected */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <Wallet className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-md text-gray-500">Rent Collected</p>
                <p className="text-lg font-semibold text-gray-800">
                  KES. {rentCollected.toLocaleString()}{" "}
                  {/* Format as currency */}
                </p>
              </div>
            </div>

            {/* 3. Maintenance Requests */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <Wrench className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-md text-gray-500">Maintenance Requests</p>
                <p className="text-lg font-semibold text-gray-800">
                  {requests.length} {/* Set default to 0 */}
                </p>
              </div>
            </div>

            {/* 4. Vacant Units */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <Building2 className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-md text-gray-500">Vacant Units</p>
                <p className="text-lg font-semibold text-gray-800">
                  {vacantUnits}
                </p>
              </div>
            </div>

            {/* 5. Occupied Units */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <Home className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-md text-gray-500">Occupied Units</p>
                <p className="text-lg font-semibold text-gray-800">
                  {occupiedUnits}
                </p>
              </div>
            </div>

            {/* 6. Total Units */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <Building2 className="w-8 h-8 text-pink-600" />
              <div>
                <p className="text-md text-gray-500">Total Units</p>
                <p className="text-lg font-semibold text-gray-800">
                  {listings.length}
                </p>
              </div>
            </div>

            {/* 7. Total Technicians */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <Hammer className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-md text-gray-500">Total Technicians</p>
                <p className="text-lg font-semibold text-gray-800">
                  {technicians.length}
                </p>
              </div>
            </div>

            {/* 8. Receipts */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <FileText className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-md text-gray-500">Receipts</p>
                <p className="text-lg font-semibold text-gray-800">
                  {0} {/* Set default to 0 */}
                </p>
              </div>
            </div>

            {/* 9. Upcoming Lease Expirations */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <CalendarClock className="w-8 h-8 text-cyan-600" />
              <div>
                <p className="text-md text-gray-500">Lease Expiring Soon</p>
                <p className="text-lg font-semibold text-gray-800">
                  {0} {/* Set default to 0 */}
                </p>
              </div>
            </div>

            {/* 10. Late Payments */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-md text-gray-500">Late Payments</p>
                <p className="text-lg font-semibold text-gray-800">
                  {0} {/* Set default to 0 */}
                </p>
              </div>
            </div>

            {/* 11. Messages / Inquiries */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <Mail className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-md text-gray-500">New Messages</p>
                <p className="text-lg font-semibold text-gray-800">
                  {0} {/* Set default to 0 */}
                </p>
              </div>
            </div>

            {/* 12. Completed Requests */}
            <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex items-start sm:items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-md text-gray-500">Requests Completed</p>
                <p className="text-lg font-semibold text-gray-800">
                  {completedRequests}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
