import {
  User,
  Home,
  Calendar,
  DollarSign,
  FileText,
  Wrench,
} from "lucide-react";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Profile() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />

      <div className="flex flex-1 bg-gray-50">
        <div className="hidden md:block">
          <SideBar />
        </div>

        <main className="flex-1 p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-semibold">Tenant Profile</h1>
          </div>

          {/* Info Cards */}
          <div className="flex-1 p-4 md:ml-[calc(18rem+2rem)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Personal Info */}
            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 flex items-start space-x-4">
              <User className="text-blue-500" />
              <div>
                <h2 className="text-lg font-medium">Personal Info</h2>
                <p className="text-md text-gray-600">Name: John Doe</p>
                <p className="text-md text-gray-600">Phone: +1 234 567 890</p>
                <p className="text-md text-gray-600">Email: john@example.com</p>
              </div>
            </div>

            {/* Lease Info */}
            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 flex items-start space-x-4">
              <Home className="text-green-500" />
              <div>
                <h2 className="text-lg font-medium">Lease Details</h2>
                <p className="text-md text-gray-600">Unit: A-204</p>
                <p className="text-md text-gray-600">
                  Lease: Jan 2024 - Dec 2024
                </p>
                <p className="text-md text-gray-600">Roommates: None</p>
              </div>
            </div>

            {/* Rent Info */}
            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 flex items-start space-x-4">
              <DollarSign className="text-yellow-500" />
              <div>
                <h2 className="text-lg font-medium">Rent & Payments</h2>
                <p className="text-md text-gray-600">Monthly Rent: $1,200</p>
                <p className="text-md text-gray-600">Status: Paid</p>
                <p className="text-md text-gray-600">Next Due: May 1, 2025</p>
              </div>
            </div>

            {/* Maintenance */}
            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 flex items-start space-x-4">
              <Wrench className="text-red-500" />
              <div>
                <h2 className="text-lg font-medium">Maintenance</h2>
                <p className="text-md text-gray-600">
                  Last Request: Apr 10, 2025
                </p>
                <p className="text-md text-gray-600">Status: Resolved</p>
              </div>
            </div>

            {/* Lease Documents */}
            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 flex items-start space-x-4">
              <FileText className="text-purple-500" />
              <div>
                <h2 className="text-lg font-medium">Documents</h2>
                <p className="text-md text-gray-600">Lease.pdf</p>
                <p className="text-md text-gray-600">Move-in Checklist.pdf</p>
              </div>
            </div>

            {/* Calendar Placeholder (optional) */}
            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 flex items-start space-x-4">
              <Calendar className="text-indigo-500" />
              <div>
                <h2 className="text-lg font-medium">Upcoming</h2>
                <p className="text-md text-gray-600">
                  Inspection: May 15, 2025
                </p>
                <p className="text-md text-gray-600">
                  Lease renewal: Dec 1, 2025
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

export default Profile;
