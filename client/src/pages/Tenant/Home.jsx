import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import { endpoint } from "../../apiEndpoint";
import { Bath, Maximize, Wallet, Wrench, Bell, User2 } from "lucide-react";

const id = localStorage.getItem("tenantId");

function Home() {
  const [tenant, setTenant] = useState(null);
  const [listings, setListings] = useState([]);

  //Get tenant's details
  const getTenantDetails = async () => {
    try {
      const response = await axios.get(`${endpoint}/users/tenants/${id}`);
      return response.data;
    } catch (error) {
      throw error.message.data.message;
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getTenantDetails();
        setTenant(data);
      } catch (error) {
        console.error("Failed to fetch tenant:", error);
      }
    };

    fetchDetails();
  }, []);

  const getListings = async () => {
    try {
      const response = await axios.get(`${endpoint}/listings/all-listings`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      const data = await getListings();
      setListings(data);
    };
    fetchListings();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header stays in its own flex row */}
      <Navbar className="z-10" />

      {/* Main content area with sidebar and main */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Main content (dashboard + listings) */}
        <main className="flex-1 ml-[calc(18rem+2rem)] p-6">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <Wallet className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Next Rent Due</p>
                <p className="text-lg font-semibold text-gray-800">
                  {tenant?.nextPaymentDate
                    ? new Date(tenant.nextPaymentDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : "Not Available"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <Wrench className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-500">Pending Requests</p>
                <p className="text-lg font-semibold text-gray-800">
                  {tenant?.pendingRequestStatusCount ?? 0} Open
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <Bell className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-sm text-gray-500">New Notifications</p>
                <p className="text-lg font-semibold text-gray-800">3 Alerts</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <User2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Welcome,</p>
                <p className="text-lg font-semibold text-gray-800">
                  {tenant ? `${tenant.firstname} ${tenant.lastname}` : "Tenant"}
                </p>
              </div>
            </div>
          </div>

          {/* Apartment Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((apt) => (
              <div
                key={apt.id}
                className={`group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 
                  border border-gray-200 ${
                    apt.leased ? "ring-2 ring-green-400" : ""
                  }`}
              >
                {/* Image Section */}
                <div className="relative h-64">
                  <img
                    src={apt.image}
                    alt={apt.title}
                    className="w-full h-full object-cover rounded-t-xl rounded-b-none"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {/*Bedroom Tag*/}
                    <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {apt.beds === "studio"
                        ? "Studio"
                        : `${apt.beds || 2} Bedroom`}
                    </span>

                    {/*Leased Tag*/}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow-lg ${
                        apt.leased
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {apt.leasingstatus ? "Leased" : "Available"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {apt.title}
                  </h2>
                  <p className="text-sm text-gray-600">{apt.description}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="text-2xl font-bold text-blue-600">
                      Kes. {apt.price}
                    </span>
                  </div>

                  {/* Beds and Baths*/}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="flex flex-col items-center gap-1 bg-blue-50 p-2 rounded-lg">
                      <Bath className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">
                        {apt.baths || 1} Baths
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 bg-blue-50 p-2 rounded-lg">
                      <Maximize className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">
                        {apt.square_feet || 1200} sqft
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
