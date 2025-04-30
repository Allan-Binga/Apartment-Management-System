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

function Dashboard() {
  const [landlordData, setLandlordData] = useState({
    totalTenants: 0,
    rentCollected: 0,
    pendingRequests: 0,
    vacantUnits: 0,
    occupiedUnits: 0,
    totalUnits: 0,
    totalTechnicians: 0,
    totalReceipts: 0,
    leaseExpiringSoon: 0,
    latePayments: 0,
    newMessages: 0,
    completedRequests: 0,
  });

  useEffect(() => {
    // Placeholder: Replace with actual API call
    const fetchDashboardData = async () => {
      // Sample static data
      setLandlordData({
        totalTenants: 12,
        rentCollected: 120000,
        pendingRequests: 3,
        vacantUnits: 2,
        occupiedUnits: 1,
        totalUnits: 15,
        totalTechnicians: 20,
        totalReceipts: 1,
        leaseExpiringSoon: 0,
        latePayments: 0,
        newMessages: 0,
        completedRequests: 0,
      });
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar className="z-10" />
      <div className="flex flex-1">
        <LandlordSidebar />

        {/* Dashboard Content */}
        <main className="flex-1 ml-[calc(18rem+2rem)] p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Dashboard
          </h1>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* 1. Total Tenants */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <Users className="w-8 h-8 text-blue-600 font-bold" />
              <div>
                <p className="text-md text-gray-500">Total Tenants</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.totalTenants}
                </p>
              </div>
            </div>

            {/* 2. Rent Collected */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <Wallet className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-md text-gray-500">Rent Collected</p>
                <p className="text-lg font-semibold text-gray-800">
                  ${landlordData.rentCollected.toLocaleString()}
                </p>
              </div>
            </div>

            {/* 3. Maintenance Requests */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <Wrench className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-md text-gray-500">Maintenance Requests</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.pendingRequests}
                </p>
              </div>
            </div>

            {/* 4. Vacant Units */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <Building2 className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-md text-gray-500">Vacant Units</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.vacantUnits}
                </p>
              </div>
            </div>

            {/* 5. Occupied Units */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <Home className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-md text-gray-500">Occupied Units</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.occupiedUnits}
                </p>
              </div>
            </div>

            {/* 6. Total Units */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <Building2 className="w-8 h-8 text-pink-600" />
              <div>
                <p className="text-md text-gray-500">Total Units</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.totalUnits}
                </p>
              </div>
            </div>

            {/* 7. Total Technicians */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <Hammer className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-md text-gray-500">Total Technicians</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.totalTechnicians}
                </p>
              </div>
            </div>

            {/* 8. Receipts */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <FileText className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-md text-gray-500">Receipts</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.totalReceipts}
                </p>
              </div>
            </div>

            {/* 9. Upcoming Lease Expirations */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <CalendarClock className="w-8 h-8 text-cyan-600" />
              <div>
                <p className="text-md text-gray-500">Lease Expiring Soon</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.leaseExpiringSoon}
                </p>
              </div>
            </div>

            {/* 10. Late Payments */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-md text-gray-500">Late Payments</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.latePayments}
                </p>
              </div>
            </div>

            {/* 11. Messages / Inquiries */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <Mail className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-md text-gray-500">New Messages</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.newMessages}
                </p>
              </div>
            </div>

            {/* 12. Completed Requests */}
            <div className="bg-white rounded-xl shadow p-10 flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-md text-gray-500">Requests Completed</p>
                <p className="text-lg font-semibold text-gray-800">
                  {landlordData.completedRequests}
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
